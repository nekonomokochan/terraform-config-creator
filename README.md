# terraform-config-creator
[![Build Status](https://travis-ci.org/nekonomokochan/terraform-config-creator.svg?branch=master)](https://travis-ci.org/nekonomokochan/terraform-config-creator)
[![Coverage Status](https://coveralls.io/repos/github/nekonomokochan/terraform-config-creator/badge.svg?branch=master)](https://coveralls.io/github/nekonomokochan/terraform-config-creator?branch=master)

Create terraform config files

# Getting Started

## Install npm package

### yarn
`yarn add @nekonomokochan/terraform-config-creator`

### npm
`npm install --save @nekonomokochan/terraform-config-creator`

# How To Use

## Use With TypeScript

### createS3Backend

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

### createAwsProvider

```typescript
import { createAwsProvider } from "@nekonomokochan/terraform-config-creator";

(async () => {
  const params = {
    outputPath: "./",
    awsProviderParams: [
      {
        version: "=1.54.0",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      },
      {
        version: "=1.54.0",
        region: "us-east-1",
        profile: "nekochans-dev",
        alias: "us_east_1"
      }
    ]
  };

  await createAwsProvider(params);
})();
```

`provider.tf` is created in your current directory.

## Use With JavaScript

### createS3Backend

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

### createAwsProvider

```javascript
(async () => {
  "use strict";

  const terraformConfigCreator = require("@nekonomokochan/terraform-config-creator");

  const params = {
    outputPath: "./",
    awsProviderParams: [
      {
        version: "=1.54.0",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      },
      {
        version: "=1.54.0",
        region: "us-east-1",
        profile: "nekochans-dev",
        alias: "us_east_1"
      }
    ]
  };

  await terraformConfigCreator.createAwsProvider(params);
})();
```

`provider.tf` is created in your current directory.

# License
MIT
