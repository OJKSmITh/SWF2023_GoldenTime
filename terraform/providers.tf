terraform {
  cloud {
    organization = "cloudcoke"

    workspaces {
      name = "web3_festival"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.1"
    }
  }
}