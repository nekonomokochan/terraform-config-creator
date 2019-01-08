import { promisify } from "util";
import fs from "fs";

export interface ICreateBackendParams {
  backendParams: IBackendParams;
}

interface IBackendParams {
  requiredVersion: string;
  backend: {
    bucket: string;
    key: string;
    region: string;
    profile: string;
  };
}

const createS3Template = (backendParams: IBackendParams) => {
  return `terraform {
  required_version = "${backendParams.requiredVersion}"

  backend "s3" {
    bucket  = "${backendParams.backend.bucket}"
    key     = "${backendParams.backend.key}"
    region  = "${backendParams.backend.region}"
    profile = "${backendParams.backend.profile}"
  }
}`;
};

export const createS3Backend = async (
  params: ICreateBackendParams
): Promise<any> => {
  const writeFile = promisify(fs.writeFile);

  const terraform = createS3Template(params.backendParams);

  await writeFile("./backend.tf", terraform);

  return {
    terraform: {
      required_version: `${params.backendParams.requiredVersion}`,

      backend: {
        bucket: `${params.backendParams.backend.bucket}`,
        key: `${params.backendParams.backend.key}`,
        region: `${params.backendParams.backend.region}`,
        profile: `${params.backendParams.backend.profile}`
      }
    }
  };
};
