"use strict";

const fs = require("fs");
const path = require("path");

const AUTO_START = "<!-- AUTO-README:START -->";
const AUTO_END = "<!-- AUTO-README:END -->";
const README_PATH = path.resolve(process.cwd(), "README.md");
const PACKAGE_PATH = path.resolve(process.cwd(), "package.json");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const readPackageJson = () => {
  const raw = fs.readFileSync(PACKAGE_PATH, "utf8");
  return JSON.parse(raw);
};

const formatTable = (entries) => {
  if (entries.length === 0) {
    return "_None_";
  }

  const rows = entries.map(
    ([name, command]) => `| \`${name}\` | \`${command}\` |`
  );

  return ["| Script | Command |", "| --- | --- |", ...rows].join("\n");
};

const formatDependencyList = (entries) => {
  if (entries.length === 0) {
    return "_None_";
  }

  return entries.map(([name, version]) => `- \`${name}\` \`${version}\``).join("\n");
};

const buildAutoSection = (pkg) => {
  const scripts = Object.entries(pkg.scripts ?? {}).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  const dependencies = Object.entries(pkg.dependencies ?? {}).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  const devDependencies = Object.entries(pkg.devDependencies ?? {}).sort(
    ([a], [b]) => a.localeCompare(b)
  );

  return [
    AUTO_START,
    "## Project Metadata",
    "",
    `- **Package:** \`${pkg.name ?? "unknown"}\``,
    `- **Version:** \`${pkg.version ?? "0.0.0"}\``,
    "",
    "### Scripts",
    "",
    formatTable(scripts),
    "",
    "### Dependencies",
    "",
    formatDependencyList(dependencies),
    "",
    "### Dev Dependencies",
    "",
    formatDependencyList(devDependencies),
    AUTO_END,
  ].join("\n");
};

const buildTemplate = (pkg, autoSection) => {
  const title = pkg.name ?? "Project Title";

  return [
    `# ${title}`,
    "",
    "## Description",
    "",
    "Add a short description of the project here.",
    "",
    "## Installation",
    "",
    "```bash",
    "npm install",
    "```",
    "",
    "## Usage",
    "",
    "```bash",
    "npm run dev",
    "```",
    "",
    autoSection,
    "",
    "## Contributing",
    "",
    "Contributions are welcome! Please open an issue or submit a pull request.",
    "",
    "## License",
    "",
    "Specify the license for the project.",
    "",
  ].join("\n");
};

const applyAutoSection = (content, autoSection) => {
  const autoSectionRegex = new RegExp(
    `${escapeRegExp(AUTO_START)}[\\s\\S]*?${escapeRegExp(AUTO_END)}`,
    "m"
  );

  if (autoSectionRegex.test(content)) {
    return content.replace(autoSectionRegex, autoSection);
  }

  return `${content.trimEnd()}\n\n${autoSection}\n`;
};

const writeFileIfChanged = (targetPath, content) => {
  if (fs.existsSync(targetPath)) {
    const existing = fs.readFileSync(targetPath, "utf8");
    if (existing === content) {
      return false;
    }
  }

  fs.writeFileSync(targetPath, content, "utf8");
  return true;
};

const main = () => {
  const pkg = readPackageJson();
  const autoSection = buildAutoSection(pkg);

  if (!fs.existsSync(README_PATH)) {
    const template = buildTemplate(pkg, autoSection);
    writeFileIfChanged(README_PATH, template);
    return;
  }

  const currentReadme = fs.readFileSync(README_PATH, "utf8");
  const updatedReadme = applyAutoSection(currentReadme, autoSection);
  writeFileIfChanged(README_PATH, updatedReadme);
};

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Failed to update README:", message);
  process.exitCode = 1;
}
