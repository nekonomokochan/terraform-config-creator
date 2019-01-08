export interface ICreateBackendParams {
  requiredVersion: string;
  backendS3?: {
    bucket: string;
    key: string;
    region: string;
    profile: string;
  };
}

export const createBackendTf = (params: ICreateBackendParams): any => {
  const terraform = `
    terraform {
      required_version = "${params.requiredVersion}"

      backend "s3" {
        bucket  = "dev-tfstate"
        key     = "network/terraform.tfstate"
        region  = "ap-northeast-1"
        profile = "nekochans-dev"
      }
    }
  `;

  console.log(terraform);

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
