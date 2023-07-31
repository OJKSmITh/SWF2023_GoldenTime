# 로드 밸런서 생성
resource "aws_lb" "ambulance_lb" {
  name     = "${var.project}-ambulance-lb"
  subnets  = [aws_subnet.ambulance_public_subnet[0].id, aws_subnet.ambulance_public_subnet[1].id]
  internal = false

  security_groups = [
    aws_security_group.ambulance_lb.id
  ]

  load_balancer_type = "application"

  tags = {
    Name = "${var.project}-ambulance-lb"
  }
}

resource "aws_lb" "hospital_lb" {
  name     = "${var.project}-hospital-lb"
  subnets  = [aws_subnet.hospital_public_subnet[0].id, aws_subnet.hospital_public_subnet[1].id]
  internal = false

  security_groups = [
    aws_security_group.hospital_lb.id
  ]

  load_balancer_type = "application"

  tags = {
    Name = "${var.project}-hospital-lb"
  }
}

resource "aws_lb" "back_lb" {
  name     = "${var.project}-back-lb"
  subnets  = [aws_subnet.back_public_subnet[0].id, aws_subnet.back_public_subnet[1].id]
  internal = false

  security_groups = [
    aws_security_group.back_lb.id
  ]

  load_balancer_type = "application"

  tags = {
    Name = "${var.project}-back-lb"
  }
}

# 대상 그룹 생성
resource "aws_lb_target_group" "ambulance_tg" {
  name     = "${var.project}-ambulance-lb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.web3_vpc.id

  health_check {
    port    = 80
    path    = "/"
    matcher = "200"
  }

  tags = {
    Name = "${var.project}-ambulance-lb-tg"
  }
}

resource "aws_lb_target_group" "hospital_tg" {
  name     = "${var.project}-hospital-lb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.web3_vpc.id

  health_check {
    port    = 80
    path    = "/"
    matcher = "200"
  }

  tags = {
    Name = "${var.project}-hospital-lb-tg"
  }
}

resource "aws_lb_target_group" "back_tg" {
  name     = "${var.project}-back-lb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.web3_vpc.id

  health_check {
    port    = 80
    path    = "/health"
    matcher = "200"
  }

  tags = {
    Name = "${var.project}-back-lb-tg"
  }
}

# 로드 밸런서와 대상 그룹 매칭
resource "aws_lb_listener" "ambulance_listener" {
  load_balancer_arn = aws_lb.ambulance_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "ambulance_listener_443" {
  load_balancer_arn = aws_lb.ambulance_lb.arn
  port              = "443"
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = var.my_acm

  default_action {
    target_group_arn = aws_lb_target_group.ambulance_tg.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "hospital_listener" {
  load_balancer_arn = aws_lb.hospital_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "hospital_listener_443" {
  load_balancer_arn = aws_lb.hospital_lb.arn
  port              = "443"
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = var.my_acm

  default_action {
    target_group_arn = aws_lb_target_group.hospital_tg.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "back_listener" {
  load_balancer_arn = aws_lb.back_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "back_listener_443" {
  load_balancer_arn = aws_lb.back_lb.arn
  port              = "443"
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = var.my_acm

  default_action {
    target_group_arn = aws_lb_target_group.back_tg.arn
    type             = "forward"
  }
}

resource "aws_lb_target_group_attachment" "ambulance" {
  target_group_arn = aws_lb_target_group.ambulance_tg.arn
  target_id        = aws_instance.ambulance.id
  port             = 80
}

resource "aws_lb_target_group_attachment" "hospital" {
  target_group_arn = aws_lb_target_group.hospital_tg.arn
  target_id        = aws_instance.hospital.id
  port             = 80
}

resource "aws_lb_target_group_attachment" "back" {
  target_group_arn = aws_lb_target_group.back_tg.arn
  target_id        = aws_instance.back.id
  port             = 80
}