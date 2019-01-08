import { createS3Backend } from "../../src/index";

describe("createBackendTf.integrationTest", () => {
  it("should be able to create a backend.tf", async () => {
    const params = {
      backendParams: {
        requiredVersion: "0.11.10",
        backend: {
          bucket: "dev-tfstate",
          key: "network/terraform.tfstate",
          region: "ap-northeast-1",
          profile: "nekochans-dev"
        }
      }
    };

    const expected = {
      terraform: {
        required_version: `${params.backendParams.requiredVersion}`,

        backend: {
          bucket: "dev-tfstate",
          key: "network/terraform.tfstate",
          region: "ap-northeast-1",
          profile: "nekochans-dev"
        }
      }
    };

    const result = await createS3Backend(params);

    expect(result).toEqual(expected);
  });
});
