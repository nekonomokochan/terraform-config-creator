import { promisify } from "util";
import fs from "fs";

export interface ICreateBackendParams {
  requiredVersion: string;
  backend: {
    bucket: string;
    key: string;
    region: string;
    profile: string;
  };
}

export const createS3Backend = async (
  params: ICreateBackendParams
): Promise<any> => {
  const writeFile = promisify(fs.writeFile);

  const terraform = `terraform {
  required_version = "${params.requiredVersion}"

  backend "s3" {
    bucket  = "dev-tfstate"
    key     = "network/terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "nekochans-dev"
  }
}`;

  await writeFile("./backend.tf", terraform);

  return {
    terraform: {
      required_version: `${params.requiredVersion}`,

      backend: {
        bucket: "dev-tfstate",
        key: "network/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      }
    }
  };
};
