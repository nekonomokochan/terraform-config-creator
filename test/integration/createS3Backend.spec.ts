import { createS3Backend } from "../../src/index";
import fs from "fs";

describe("createS3Backend.integrationTest", () => {
  it("should be able to create a backend.tf", async () => {
    const params = {
      outputPath: "./",
      backendParams: {
        requiredVersion: "0.12.2",
        backend: {
          bucket: "dev-tfstate",
          key: "network/terraform.tfstate",
          region: "ap-northeast-1",
          profile: "nekochans-dev"
        }
      }
    };

    const expected = `terraform {
  required_version = "${params.backendParams.requiredVersion}"

  backend "s3" {
    bucket  = "${params.backendParams.backend.bucket}"
    key     = "${params.backendParams.backend.key}"
    region  = "${params.backendParams.backend.region}"
    profile = "${params.backendParams.backend.profile}"
  }
}`;

    await createS3Backend(params);

    const resultString = fs.readFileSync("./backend.tf").toString();

    expect(resultString).toEqual(expected);
  });

  it("should be able to create a backend.tf with remoteStateList", async () => {
    const params = {
      outputPath: "./",
      backendParams: {
        requiredVersion: "0.12.2",
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
          key: "env:/${terraform.workspace}/network/terraform.tfstate",
          region: "ap-northeast-1",
          profile: "nekochans-dev"
        },
        {
          name: "bastion",
          bucket: "dev-tfstate",
          key: "env:/${terraform.workspace}/bastion/terraform.tfstate",
          region: "ap-northeast-1",
          profile: "nekochans-dev"
        }
      ]
    };

    const terraform = {
      workspace: "${terraform.workspace}"
    };

    const expected = `terraform {
  required_version = "0.12.2"

  backend "s3" {
    bucket  = "${params.backendParams.backend.bucket}"
    key     = "${params.backendParams.backend.key}"
    region  = "${params.backendParams.backend.region}"
    profile = "${params.backendParams.backend.profile}"
  }
}

data "terraform_remote_state" "network" {
  backend = "s3"

  config {
    bucket  = "dev-tfstate"
    key     = "env:/${terraform.workspace}/network/terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "nekochans-dev"
  }
}

data "terraform_remote_state" "bastion" {
  backend = "s3"

  config {
    bucket  = "dev-tfstate"
    key     = "env:/${terraform.workspace}/bastion/terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "nekochans-dev"
  }
}\n\n`;

    await createS3Backend(params);

    const resultString = fs.readFileSync("./backend.tf").toString();

    expect(resultString).toEqual(expected);
  });
});
