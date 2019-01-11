# terraform-config-creator
Create terraform config files

# Getting Started

## Install npm package

### yarn
`yarn add @nekonomokochan/terraform-config-creator`

### npm
`npm install --save @nekonomokochan/terraform-config-creator`

# How To Use

## Use With TypeScript

```typescript
import { createS3Backend } from "@nekonomokochan/terraform-config-creator";

(async () => {
  const params = {
    outputPath: "./",
    backendParams: {
      requiredVersion: "0.11.10",
      backend: {
        bucket: "dev-tfstate",
        key: "network/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      }
    },
    remoteStateList: [
      {
        name: "network",
        bucket: "dev-tfstate",
        key: "env:/${terraform.env}/network/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      },
      {
        name: "bastion",
        bucket: "dev-tfstate",
        key: "env:/${terraform.env}/bastion/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      }
    ]
  };
  
  await createS3Backend(params);
})();
```

`backend.tf` is created in your current directory.

```hcl-terraform
terraform {
  required_version = "0.11.10"

  backend "s3" {
    bucket  = "dev-tfstate"
    key     = "network/terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "nekochans-dev"
  }
}

data "terraform_remote_state" "network" {
  backend = "s3"

  config {
    bucket  = "dev-tfstate"
    key     = "env:/${terraform.env}/network/terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "nekochans-dev"
  }
}

data "terraform_remote_state" "bastion" {
  backend = "s3"

  config {
    bucket  = "dev-tfstate"
    key     = "env:/${terraform.env}/bastion/terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "nekochans-dev"
  }
}
```

## Use With JavaScript

```javascript
(async () => {
  "use strict";

  const terraformConfigCreator = require("@nekonomokochan/terraform-config-creator");

  const params = {
    outputPath: "./",
    backendParams: {
      requiredVersion: "0.11.10",
      backend: {
        bucket: "dev-tfstate",
        key: "network/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      }
    },
    remoteStateList: [
      {
        name: "network",
        bucket: "dev-tfstate",
        key: "env:/${terraform.env}/network/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      },
      {
        name: "bastion",
        bucket: "dev-tfstate",
        key: "env:/${terraform.env}/bastion/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      }
    ]
  };

  await terraformConfigCreator.createS3Backend(params);
})();
```

`backend.tf` is created in your current directory.

# License
MIT
