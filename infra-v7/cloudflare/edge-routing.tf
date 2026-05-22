resource "cloudflare_record" "api" {
  zone_id = "ZONE_ID"
  name    = "api"
  value   = "global-load-balancer.example.com"
  type    = "CNAME"
  proxied = true
}
