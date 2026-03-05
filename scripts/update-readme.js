#!/usr/bin/env node
/**
 * Automatic README generator and updater.
 * - Creates README.md from a template when missing.
 * - Keeps a metadata block (version and dependencies) in sync with package.json.
 *
 * Marked block is delimited by:
 * <!-- AUTO-README:START --> ... <!-- AUTO-README:END -->
 */

const fs = require("fs");
const path = require("path");

const MARKER_START = "<!-- AUTO-README:START -->";
const MARKER_END = "<!-- AUTO-README:END -->";

function readPackageJson(rootDir) {
  const pkgPath = path.join(rootDir, "package.json");
  const raw = fs.readFileSync(pkgPath, "utf8");
  return JSON.parse(raw);
}

function formatDeps(deps = {}) {
  return Object.entries(deps)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, version]) => `- ${name} \`${version}\``)
    .join("\n");
}

function buildMetadataSection(pkg) {
  const dependencies = formatDeps(pkg.dependencies);
  const devDependencies = formatDeps(pkg.devDependencies);

  const lines = [
    "## Project Metadata",
    MARKER_START,
    `- Version: ${pkg.version ?? "0.0.0"}`,
    "- Package Manager: npm",
    "",
    "### Dependencies",
    dependencies || "- None",
    "",
    "### Dev Dependencies",
    devDependencies || "- None",
    MARKER_END,
  ];

  return lines.join("\n");
}

function buildTemplate(pkg) {
  const title = pkg.name ?? "Project Title";
  const description =
    "Next.js monolith con React 19, Tailwind CSS v4 y Clerk para autenticación. Despliegue listo para GCP Cloud Run.";
  return [
    `# ${title}`,
    "",
    description,
    "",
    "## Getting Started",
    "- Instala dependencias: `npm install`",
    "- Ejecuta el servidor de desarrollo: `npm run dev`",
    "",
    "## Scripts",
    "- `npm run dev`: Inicia el servidor de desarrollo",
    "- `npm run build`: Compila la aplicación para producción",
    "- `npm run start`: Arranca el servidor en modo producción",
    "- `npm run lint`: Ejecuta ESLint",
    "- `npm test`: Ejecuta la suite de pruebas",
    "",
    "## Deployment",
    "- Contenedores listos para Cloud Run en GCP.",
    "",
    buildMetadataSection(pkg),
    "",
  ].join("\n");
}

function upsertMetadataBlock(readmeContent, pkg) {
  const nextBlock = buildMetadataSection(pkg);

  if (readmeContent.includes(MARKER_START) && readmeContent.includes(MARKER_END)) {
    const pattern = new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`);
    return readmeContent.replace(pattern, nextBlock);
  }

  const trimmed = readmeContent.trimEnd();
  return `${trimmed}\n\n${nextBlock}\n`;
}

function ensureReadme(rootDir) {
  const readmePath = path.join(rootDir, "README.md");
  const pkg = readPackageJson(rootDir);

  if (!fs.existsSync(readmePath)) {
    const template = buildTemplate(pkg);
    fs.writeFileSync(readmePath, template, "utf8");
    return true;
  }

  const current = fs.readFileSync(readmePath, "utf8");
  const updated = upsertMetadataBlock(current, pkg);

  if (updated !== current) {
    fs.writeFileSync(readmePath, updated, "utf8");
    return true;
  }

  return false;
}

function run() {
  const rootDir = process.cwd();
  ensureReadme(rootDir);
}

if (require.main === module) {
  run();
}

module.exports = {
  buildMetadataSection,
  buildTemplate,
  ensureReadme,
  upsertMetadataBlock,
};
