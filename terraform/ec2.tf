data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230517"]
  }
}

resource "aws_instance" "ambulance" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.my_ec2_type
  subnet_id                   = aws_subnet.ambulance_public_subnet[0].id
  key_name                    = var.my_key_pair
  vpc_security_group_ids      = [aws_security_group.ambulance_ec2.id]
  associate_public_ip_address = true

  tags = {
    Name = "${var.project}-ambulance-server"
  }

  user_data = file("${path.module}/scripts/front.sh")
}

resource "aws_instance" "hospital" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.my_ec2_type
  subnet_id                   = aws_subnet.hospital_public_subnet[0].id
  key_name                    = var.my_key_pair
  vpc_security_group_ids      = [aws_security_group.hospital_ec2.id]
  associate_public_ip_address = true

  tags = {
    Name = "${var.project}-hospital-server"
  }

  user_data = file("${path.module}/scripts/front.sh")
}

resource "aws_instance" "back" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.my_ec2_type
  subnet_id                   = aws_subnet.back_public_subnet[0].id
  key_name                    = var.my_key_pair
  vpc_security_group_ids      = [aws_security_group.back_ec2.id]
  associate_public_ip_address = true

  tags = {
    Name = "${var.project}-back-server"
  }

  user_data = file("${path.module}/scripts/back.sh")
}

