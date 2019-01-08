import { createBackendTf } from "../../src/index";

describe("createBackendTf.integrationTest", () => {
  it("should be able to create a backend.tf", () => {
    const params = {
      requiredVersion: "0.11.10",
      backendS3: {
        bucket: "dev-tfstate",
        key: "network/terraform.tfstate",
        region: "ap-northeast-1",
        profile: "nekochans-dev"
      }
    };

    const expected = {
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

    expect(createBackendTf(params)).toEqual(expected);
  });
});
