import fs from "node:fs";
import path from "node:path";

import { syncReadme, type PackageMetadata } from "../lib/readmeGenerator.ts";

const rootDirectory = process.cwd();
const packageJsonPath = path.join(rootDirectory, "package.json");
const readmePath = path.join(rootDirectory, "README.md");

const loadPackageMetadata = (): PackageMetadata => {
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("package.json is required to generate README.md");
  }

  const rawPackageJson = fs.readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(rawPackageJson) as Partial<PackageMetadata>;

  return {
    name: packageJson.name ?? "Project",
    version: packageJson.version ?? "0.0.0",
    description: packageJson.description,
    scripts: packageJson.scripts ?? {},
    dependencies: packageJson.dependencies ?? {},
    devDependencies: packageJson.devDependencies ?? {},
  };
};

const updateReadme = (): void => {
  const readmeExistedBefore = fs.existsSync(readmePath);
  const packageMetadata = loadPackageMetadata();
  syncReadme(packageMetadata, readmePath);
  const statusLabel = readmeExistedBefore ? "updated" : "created";
  // eslint-disable-next-line no-console -- CLI utility for developers
  console.log(`README.md ${statusLabel} successfully.`);
};

try {
  updateReadme();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  // eslint-disable-next-line no-console -- CLI utility for developers
  console.error(`Failed to update README.md: ${message}`);
  process.exitCode = 1;
}
