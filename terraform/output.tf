output "main_db_endpoint" {
  value = aws_db_instance.db_main.endpoint
}

output "ambulance_eip" {
  value = aws_eip.ambulance.public_ip
}

output "hospital_eip" {
  value = aws_eip.hospital.public_ip
}

output "back_eip" {
  value = aws_eip.back.public_ip
}
