resource "aws_db_instance" "db_main" {
  identifier             = "${var.project}-db-main"
  allocated_storage      = 20
  db_name                = var.db_name
  engine                 = "mysql"
  instance_class         = "db.t2.micro"
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.db_subnet.id
  vpc_security_group_ids = [aws_security_group.mysql_sg.id]
  skip_final_snapshot    = true
}
