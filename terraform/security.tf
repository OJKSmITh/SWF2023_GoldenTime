resource "aws_security_group" "ambulance_lb" {
  name        = "${var.project}-ambulance-lb-sg"
  description = "${var.project} ambulance load balancer security group"
  vpc_id      = aws_vpc.web3_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "ambulance load balancer https port"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "ambulance laod balancer http port"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["${var.vpc_cidr}"]
  }

  tags = {
    Name = "${var.project}-ambulance-lb-sg"
  }
}

resource "aws_security_group" "hospital_lb" {
  name        = "${var.project}-hospital-lb-sg"
  description = "${var.project} hospital load balancer security group"
  vpc_id      = aws_vpc.web3_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "hospital load balancer https port"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "hospital load balancer http port"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["${var.vpc_cidr}"]
  }

  tags = {
    Name = "${var.project}-hospital-lb-sg"
  }
}

resource "aws_security_group" "back_lb" {
  name        = "${var.project}-back-lb-sg"
  description = "${var.project} back load balancer security group"
  vpc_id      = aws_vpc.web3_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "back load balancer https port"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "back load balancer http port"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["${var.vpc_cidr}"]
  }

  tags = {
    Name = "${var.project}-back-lb-sg"
  }
}

resource "aws_security_group" "ambulance_ec2" {
  name        = "${var.project}-ambulance-ec2-sg"
  description = "${var.project} ambulance ec2 security group"
  vpc_id      = aws_vpc.web3_vpc.id

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    security_groups = [aws_security_group.ambulance_lb.id]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "ssh"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-ambulance-ec2-sg"
  }
}

resource "aws_security_group" "hospital_ec2" {
  name        = "${var.project}-hospital-ec2-sg"
  description = "${var.project} hospital ec2 security group"
  vpc_id      = aws_vpc.web3_vpc.id

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    security_groups = [aws_security_group.hospital_lb.id]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "ssh"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-hospital-ec2-sg"
  }
}

resource "aws_security_group" "back_ec2" {
  name        = "${var.project}-back-ec2-sg"
  description = "${var.project} back ec2 security group"
  vpc_id      = aws_vpc.web3_vpc.id

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    security_groups = [aws_security_group.back_lb.id]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "ssh"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-back-ec2-sg"
  }
}

resource "aws_security_group" "mysql_sg" {
  name = "${var.project}-mysql-sg"

  vpc_id = aws_vpc.web3_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
    description = "ssh"
  }

  ingress {
    from_port   = var.db_port
    to_port     = var.db_port
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-mysql-sg"
  }
}