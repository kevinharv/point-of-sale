

resource "aws_apigatewayv2_api" "http_api" {
  name                         = var.domain_name
  protocol_type                = "HTTP"
  disable_execute_api_endpoint = true
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

/* ========= AUTH0 AUTHORIZER CONFIGURATION ========= */

resource "aws_apigatewayv2_authorizer" "auth0" {
  name            = "Auth0"
  api_id          = aws_apigatewayv2_api.http_api.id
  authorizer_type = "JWT"

  identity_sources = [ "$request.header.Authorization" ]
  jwt_configuration {
    audience = [ var.auth_audience ]
    issuer = var.auth_issuer
  }
}

/* ========= ROUTE53 INTEGRATION ========= */

resource "aws_apigatewayv2_domain_name" "domain_name" {
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.cert_validation.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation_dns_record" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id = var.hosted_zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation_dns_record : record.fqdn]
}

resource "aws_apigatewayv2_api_mapping" "mapping" {
  api_id      = aws_apigatewayv2_api.http_api.id
  domain_name = aws_apigatewayv2_domain_name.domain_name.id
  stage       = aws_apigatewayv2_stage.default.id
}

resource "aws_route53_record" "api" {
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.domain_name.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.domain_name.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
