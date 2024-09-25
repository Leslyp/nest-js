terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "bankrate"
    workspaces {
      prefix = "change-me-"
    }
  }
}