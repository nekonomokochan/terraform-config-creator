import { createS3Backend } from "../../src/index";
import fs from "fs";

describe("createS3Backend.integrationTest", () => {
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
});
