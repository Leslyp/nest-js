# Global variables
module "global" {
  source  = "app.terraform.io/bankrate/variables/global"
  version = "~>1.0.0"
}

provider "aws" { 
  region = "us-east-1"

  default_tags {
    tags = {
      BusinessUnit       = var.business_unit
      FinservTeam        = var.finserv_team
      IsProduction       = var.environment == "prod" ? true : false
      DataClassification = "india"
      ResiliencyTier     = var.environment == "prod" ? "platinum" : "silver"
    }
  }
}

variable "team_name" { default = "change-me" }
variable "tag_owner" { default = "change-me" }
variable "app_name" { default = "change-me" }
variable "project_name" { default = "change-me" }
variable "business_unit" {default = "change-me"}
variable "finserv_team" {default = "change-me"}

variable "environment" { default = "qa" }
variable "container_ingress_port" { default = "3000" }

locals {
  aws_account_id  = module.global.aws_account_id[var.environment]
  aws_environment = module.global.aws_environment[var.environment]
  aws_region      = module.global.aws_region[var.environment]

  environment_variables = [
    {
      name  = "HOST_ENV",
      value = var.environment
    },
    {
      name  = "NEW_RELIC_APP_NAME",
      value = "${var.app_name}-${var.environment}"
    },
    {
      name  = "NEW_RELIC_ENABLED",
      value = "true"
    },
    {
      name  = "AUTH0_AUDIENCE",
      value = var.environment == "prod" ? "prod-change-me-resource" : "qa-change-me-resource"
    },
    {
      name  = "AUTH0_ISSUER",
      value = var.environment == "prod" ? "https://redventures-prod.auth0.com" : "https://redventures-dev.auth0.com/"
    },
  ]

  secrets = {
    NEW_RELIC_LICENSE_KEY = "change me"
  }

  tags = {
    Name               = var.app_name
    Service            = var.app_name
    Environment        = var.environment
    Version            = "1.0"
    Provisioner        = "terraform://bankrate/change-me/terraform"
    Expiration         = "N/A"
    AssetTag           = "N/A"
    Partner            = "Bankrate"
    Project            = var.app_name
    Owner              = var.tag_owner
    DataClassification = "India"
    Backup             = "N/A"
    Shutdown           = var.environment != "prod"
    IsProduction       = var.environment == "prod"
    ResiliencyTier     = "platinum"
    Access             = "public"
  }
}
