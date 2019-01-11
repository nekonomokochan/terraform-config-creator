import { promisify } from "util";
import fs from "fs";

export interface ICreateBackendParams {
  outputPath: string;
  backendParams: IBackendParams;
  remoteStateList?: IRemoteState[];
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

interface IRemoteState {
  name: string;
  bucket: string;
  key: string;
  region: string;
  profile: string;
}

const createS3Template = (backendParams: IBackendParams): string => {
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

const createRemoteState = (remoteState: IRemoteState): string => {
  return `data "terraform_remote_state" "${remoteState.name}" {
  backend = "s3"

  config {
    bucket  = "${remoteState.bucket}"
    key     = "${remoteState.key}"
    region  = "${remoteState.region}"
    profile = "${remoteState.profile}"
  }
}`;
};

const createS3TemplateWithRemoteStateList = (
  backendParams: IBackendParams,
  remoteStateList: IRemoteState[]
): string => {
  let remoteStateOutput = "";
  remoteStateList.map((remoteState: IRemoteState) => {
    remoteStateOutput += `${createRemoteState(remoteState)}\n\n`;
  });

  return `terraform {
  required_version = "${backendParams.requiredVersion}"

  backend "s3" {
    bucket  = "${backendParams.backend.bucket}"
    key     = "${backendParams.backend.key}"
    region  = "${backendParams.backend.region}"
    profile = "${backendParams.backend.profile}"
  }
}

${remoteStateOutput}`;
};

export const createS3Backend = async (
  params: ICreateBackendParams
): Promise<void> => {
  const writeFile = promisify(fs.writeFile);

  const terraform = params.remoteStateList
    ? createS3TemplateWithRemoteStateList(
        params.backendParams,
        params.remoteStateList
      )
    : createS3Template(params.backendParams);

  await writeFile(`${params.outputPath}backend.tf`, terraform);
};
