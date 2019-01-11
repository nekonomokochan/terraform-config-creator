import { createAwsProvider } from "../../src/index";
import fs from "fs";

describe("createAwsProvider.integrationTest", () => {
  it("should be able to create a provider.tf", async () => {
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

    const expected = `provider "aws" {
  version = "=1.54.0"
  region  = "ap-northeast-1"
  profile = "nekochans-dev"
}

provider "aws" {
  version = "=1.54.0"
  region  = "us-east-1"
  profile = "nekochans-dev"
  alias   = "us_east_1"
}\n\n`;

    await createAwsProvider(params);

    const resultString = fs.readFileSync("./provider.tf").toString();

    expect(resultString).toEqual(expected);
  });
});
