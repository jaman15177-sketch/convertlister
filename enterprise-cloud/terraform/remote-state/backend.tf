terraform {
  backend "s3" {
    bucket = "saas-terraform-state"
    key    = "global/terraform.tfstate"
    region = "us-east-1"
  }
}
