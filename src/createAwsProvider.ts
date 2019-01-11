import { promisify } from "util";
import fs from "fs";

interface IProvider {
  version: string;
  region: string;
  profile: string;
  alias?: string;
}

interface ICreateAwsProviderParams {
  outputPath: string;
  awsProviderParams: IProvider[];
}

const createProvider = (provider: IProvider): string => {
  return `provider "aws" {
  version = "${provider.version}"
  region  = "${provider.region}"
  profile = "${provider.profile}"
}`;
};

const createProviderWithAlias = (provider: IProvider): string => {
  return `provider "aws" {
  version = "${provider.version}"
  region  = "${provider.region}"
  profile = "${provider.profile}"
  alias   = "${provider.alias}"
}`;
};

export const createAwsProvider = async (params: ICreateAwsProviderParams) => {
  const writeFile = promisify(fs.writeFile);
  let outputString = "";

  params.awsProviderParams.map((provider: IProvider) => {
    outputString +=
      provider.alias === undefined
        ? `${createProvider(provider)}\n\n`
        : `${createProviderWithAlias(provider)}\n\n`;
  });

  await writeFile(`${params.outputPath}provider.tf`, outputString);
};
