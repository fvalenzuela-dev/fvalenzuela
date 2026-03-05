import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  generateReadmeContent,
  syncReadme,
  type PackageMetadata,
} from "@/lib/readmeGenerator";

const baseMetadata: PackageMetadata = {
  name: "demo-app",
  version: "1.2.3",
  description: "Example description",
  scripts: {
    build: "next build",
    dev: "next dev",
  },
  dependencies: {
    next: "16.1.6",
    react: "19.2.3",
  },
  devDependencies: {
    jest: "^30.0.0",
  },
};

const createTempPath = (): string =>
  fs.mkdtempSync(path.join(os.tmpdir(), "readme-gen-"));

describe("generateReadmeContent", () => {
  it("builds README content that includes metadata and scripts", () => {
    const output = generateReadmeContent(baseMetadata);

    expect(output).toContain("# demo-app");
    expect(output).toContain("**Version:** 1.2.3");
    expect(output).toContain("- `dev`: next dev");
    expect(output).toContain("- next: 16.1.6");
    expect(output).toContain("- react: 19.2.3");
  });
});

describe("syncReadme", () => {
  it("creates a README when it does not exist", () => {
    const tempDirectory = createTempPath();
    const readmePath = path.join(tempDirectory, "README.md");

    syncReadme(baseMetadata, readmePath);
    const fileContents = fs.readFileSync(readmePath, "utf8");

    expect(fileContents).toContain("# demo-app");
    expect(fileContents).toContain("**Version:** 1.2.3");
  });

  it("updates an existing README with the latest metadata", () => {
    const tempDirectory = createTempPath();
    const readmePath = path.join(tempDirectory, "README.md");
    fs.writeFileSync(readmePath, "# old\n- **Version:** 0.0.1\n");

    syncReadme({ ...baseMetadata, version: "9.9.9" }, readmePath);
    const fileContents = fs.readFileSync(readmePath, "utf8");

    expect(fileContents).toContain("**Version:** 9.9.9");
    expect(fileContents).not.toContain("0.0.1");
  });
});
