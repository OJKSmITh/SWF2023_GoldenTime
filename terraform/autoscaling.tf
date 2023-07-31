data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230517"]
  }
}

# 템플릿 생성
resource "aws_launch_template" "ambulance_template" {
  name = "${var.project}-ambulance-template"

  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.my_ec2_type
  key_name      = var.my_key_pair

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.ambulance_ec2.id]
  }

  user_data = filebase64("${path.module}/scripts/front.sh")
}

resource "aws_launch_template" "hospital_template" {
  name = "${var.project}-hospital-template"

  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.my_ec2_type
  key_name      = var.my_key_pair

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.hospital_ec2.id]
  }

  user_data = filebase64("${path.module}/scripts/front.sh")
}

resource "aws_launch_template" "back_template" {
  name = "${var.project}-back-template"

  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.my_ec2_type
  key_name      = var.my_key_pair

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.back_ec2.id]
  }

  user_data = filebase64("${path.module}/scripts/back.sh")
}

# autoscaling group 생성
resource "aws_autoscaling_group" "ambulance_asg" {
  name             = "${var.project}-ambulance-asg"
  min_size         = 1
  max_size         = 1
  desired_capacity = 1
  force_delete     = true

  launch_template {
    id = aws_launch_template.ambulance_template.id
  }

  vpc_zone_identifier = [aws_subnet.ambulance_public_subnet[0].id, aws_subnet.ambulance_public_subnet[1].id]

  tag {
    key                 = "Name"
    value               = "${var.project}-ambulance-asg"
    propagate_at_launch = true
  }

  tag {
    key                 = "Project"
    value               = "web3-ambulance"
    propagate_at_launch = true
  }

  provisioner "local-exec" {
    command    = file("${path.module}/scripts/delete-asg.sh")
    when       = destroy
    on_failure = continue

    environment = {
      TAG_VALUE = "web3-ambulance"
    }
  }
}

resource "aws_autoscaling_group" "hospital_asg" {
  name             = "${var.project}-hospital-asg"
  min_size         = 1
  max_size         = 1
  desired_capacity = 1
  force_delete     = true

  launch_template {
    id = aws_launch_template.hospital_template.id
  }

  vpc_zone_identifier = [aws_subnet.hospital_public_subnet[0].id, aws_subnet.hospital_public_subnet[1].id]

  tag {
    key                 = "Name"
    value               = "${var.project}-hospital-asg"
    propagate_at_launch = true
  }

  tag {
    key                 = "Project"
    value               = "web3-hospital"
    propagate_at_launch = true
  }

  provisioner "local-exec" {
    command    = file("${path.module}/scripts/delete-asg.sh")
    when       = destroy
    on_failure = continue

    environment = {
      TAG_VALUE = "web3-hospital"
    }
  }
}

resource "aws_autoscaling_group" "back_asg" {
  name             = "${var.project}-back-asg"
  min_size         = 1
  max_size         = 1
  desired_capacity = 1
  force_delete     = true

  launch_template {
    id = aws_launch_template.back_template.id
  }

  vpc_zone_identifier = [aws_subnet.back_public_subnet[0].id, aws_subnet.back_public_subnet[1].id]

  tag {
    key                 = "Name"
    value               = "${var.project}-back-asg"
    propagate_at_launch = true
  }

  tag {
    key                 = "Project"
    value               = "web3-back"
    propagate_at_launch = true
  }

  provisioner "local-exec" {
    command    = file("${path.module}/scripts/delete-asg.sh")
    when       = destroy
    on_failure = continue

    environment = {
      TAG_VALUE = "web3-back"
    }
  }
}

# autoscaling group괴 load balancer 연결
resource "aws_autoscaling_attachment" "ambulance_at" {
  autoscaling_group_name = aws_autoscaling_group.ambulance_asg.id
  lb_target_group_arn    = aws_lb_target_group.ambulance_tg.arn
}

resource "aws_autoscaling_attachment" "hospital_at" {
  autoscaling_group_name = aws_autoscaling_group.hospital_asg.id
  lb_target_group_arn    = aws_lb_target_group.hospital_tg.arn
}

resource "aws_autoscaling_attachment" "back_at" {
  autoscaling_group_name = aws_autoscaling_group.back_asg.id
  lb_target_group_arn    = aws_lb_target_group.back_tg.arn
}