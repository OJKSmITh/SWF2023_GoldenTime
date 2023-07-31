# 사용가능한 가용영역 가져오기
data "aws_ec2_instance_type_offerings" "available" {
  filter {
    name   = "instance-type"
    values = [var.my_ec2_type]
  }

  location_type = "availability-zone"
}

# VPC 생성
resource "aws_vpc" "web3_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project}-vpc-${var.region}"
  }
}

# Internet Gateway 생성
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.web3_vpc.id

  tags = {
    Name = "${var.project}-igw-${var.region}"
  }
}

# Public Subnet 생성
resource "aws_subnet" "ambulance_public_subnet" {
  count             = length(var.ambulance_public_subnet)
  vpc_id            = aws_vpc.web3_vpc.id
  cidr_block        = var.ambulance_public_subnet[count.index]
  availability_zone = count.index % 2 == 0 ? data.aws_ec2_instance_type_offerings.available.locations[0] : data.aws_ec2_instance_type_offerings.available.locations[1]

  tags = {
    Name = "${var.project}-ambulance-public-subnet-${count.index}"
  }
}

resource "aws_subnet" "hospital_public_subnet" {
  count             = length(var.hospital_public_subnet)
  vpc_id            = aws_vpc.web3_vpc.id
  cidr_block        = var.hospital_public_subnet[count.index]
  availability_zone = count.index % 2 == 0 ? data.aws_ec2_instance_type_offerings.available.locations[0] : data.aws_ec2_instance_type_offerings.available.locations[1]

  tags = {
    Name = "${var.project}-hospital-public-subnet-${count.index}"
  }
}

resource "aws_subnet" "back_public_subnet" {
  count             = length(var.back_public_subnet)
  vpc_id            = aws_vpc.web3_vpc.id
  cidr_block        = var.back_public_subnet[count.index]
  availability_zone = count.index % 2 == 0 ? data.aws_ec2_instance_type_offerings.available.locations[0] : data.aws_ec2_instance_type_offerings.available.locations[1]

  tags = {
    Name = "${var.project}-back-public-subnet-${count.index}"
  }
}

resource "aws_subnet" "private_subnet" {
  count             = length(var.private_subnet)
  vpc_id            = aws_vpc.web3_vpc.id
  cidr_block        = var.private_subnet[count.index]
  availability_zone = count.index % 2 == 0 ? data.aws_ec2_instance_type_offerings.available.locations[0] : data.aws_ec2_instance_type_offerings.available.locations[1]
}

# 라우팅 테이블 생성
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.web3_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.project}-public-route-table"
  }
}

# Public Subnet 라우팅 테이블 지정
resource "aws_route_table_association" "ambulance_public_route_table_association" {
  count          = length(var.ambulance_public_subnet)
  subnet_id      = aws_subnet.ambulance_public_subnet[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "hospital_public_route_table_association" {
  count          = length(var.hospital_public_subnet)
  subnet_id      = aws_subnet.hospital_public_subnet[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}


resource "aws_route_table_association" "back_public_route_table_association" {
  count          = length(var.back_public_subnet)
  subnet_id      = aws_subnet.back_public_subnet[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_db_subnet_group" "db_subnet" {
  name        = "${var.project}-db-subnet-group"
  description = "${var.project} db subnet groups"
  subnet_ids  = [aws_subnet.private_subnet[0].id, aws_subnet.private_subnet[1].id]
}