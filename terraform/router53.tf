# 도메인에 해당하는 zone 정보 가져오기
data "aws_route53_zone" "my_site" {
  name = "${var.default_domain}."
}

# 도메인 지정
resource "aws_route53_record" "ambulance_dns" {
  zone_id = data.aws_route53_zone.my_site.zone_id
  name    = "ambulance.${var.default_domain}"
  type    = "A"

  alias {
    name                   = aws_lb.ambulance_lb.dns_name
    zone_id                = aws_lb.ambulance_lb.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "hospital_dns" {
  zone_id = data.aws_route53_zone.my_site.zone_id
  name    = "hospital.${var.default_domain}"
  type    = "A"

  alias {
    name                   = aws_lb.hospital_lb.dns_name
    zone_id                = aws_lb.hospital_lb.zone_id
    evaluate_target_health = true
  }
}

## API 레코드
resource "aws_route53_record" "back_dns" {
  zone_id = data.aws_route53_zone.my_site.zone_id
  name    = "api.${var.default_domain}"
  type    = "A"

  alias {
    name                   = aws_lb.back_lb.dns_name
    zone_id                = aws_lb.back_lb.zone_id
    evaluate_target_health = true
  }
}
