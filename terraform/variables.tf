variable "project" {
  description = "project_name"
  default     = "web3"
}

variable "region" {
  description = "region"
  default     = "ap-northeast-2"
}

variable "vpc_cidr" {
  description = "vpc_cidr"
  default     = "20.20.0.0/16"
}

variable "ambulance_public_subnet" {
  description = "ambulance_public_subnet"
  default = ["20.20.0.0/24",
  "20.20.10.0/24", ]
}

variable "hospital_public_subnet" {
  description = "hospital_public_subnet"
  default = [
    "20.20.20.0/24",
    "20.20.30.0/24"
  ]
}

variable "back_public_subnet" {
  description = "back_public_subnet"
  default = [
    "20.20.40.0/24",
    "20.20.50.0/24"
  ]
}

variable "private_subnet" {
  description = "private_subnet"
  default = [
    "20.20.60.0/24",
    "20.20.70.0/24",
  ]
}


variable "my_ec2_type" {
  description = "my_ec2_type"
  default     = "t2.micro"
}

variable "my_key_pair" {
  description = "my_key_pair"
  default     = "web3-festival-keypair"
}



variable "my_acm" {
  description = "my_acm"
}

variable "default_domain" {
  description = "default_domain"
}

variable "db_port" {
  description = "db_port"
}

variable "db_name" {
  description = "db_name"
}

variable "db_username" {
  description = "db_username"
}

variable "db_password" {
  description = "db_password"
}