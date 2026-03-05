import fs from "fs";
import os from "os";
import path from "path";
import { ensureReadme } from "../scripts/update-readme";

function createTempProject(pkg: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "auto-readme-"));
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkg, null, 2), "utf8");
  return dir;
}

function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}

describe("update-readme script", () => {
  it("creates README with metadata when missing", () => {
    const pkg = {
      name: "demo-app",
      version: "1.2.3",
      dependencies: { react: "19.0.0" },
      devDependencies: { jest: "30.0.0" },
    };
    const dir = createTempProject(pkg);

    try {
      const changed = ensureReadme(dir);
      expect(changed).toBe(true);

      const content = fs.readFileSync(path.join(dir, "README.md"), "utf8");
      expect(content).toContain("## Project Metadata");
      expect(content).toContain("Version: 1.2.3");
      expect(content).toContain("react `19.0.0`");
      expect(content).toContain("jest `30.0.0`");
    } finally {
      cleanup(dir);
    }
  });

  it("updates existing metadata block to match package.json", () => {
    const pkg = {
      name: "demo-app",
      version: "2.0.0",
      dependencies: { next: "16.1.6" },
      devDependencies: { typescript: "5.0.0" },
    };
    const dir = createTempProject(pkg);
    const readmePath = path.join(dir, "README.md");

    const staleReadme = [
      "# demo-app",
      "",
      "Existing docs",
      "",
      "## Project Metadata",
      "<!-- AUTO-README:START -->",
      "- Version: 0.0.1",
      "",
      "### Dependencies",
      "- none",
      "",
      "### Dev Dependencies",
      "- none",
      "<!-- AUTO-README:END -->",
      "",
    ].join("\n");
    fs.writeFileSync(readmePath, staleReadme, "utf8");

    try {
      const changed = ensureReadme(dir);
      expect(changed).toBe(true);

      const updated = fs.readFileSync(readmePath, "utf8");
      expect(updated).toContain("Version: 2.0.0");
      expect(updated).toContain("next `16.1.6`");
      expect(updated).toContain("typescript `5.0.0`");
      expect(updated).not.toContain("Version: 0.0.1");
    } finally {
      cleanup(dir);
    }
  });

  it("appends metadata block when markers are missing", () => {
    const pkg = { name: "demo-app", version: "1.0.0" };
    const dir = createTempProject(pkg);
    const readmePath = path.join(dir, "README.md");
    fs.writeFileSync(readmePath, "# demo-app\n\nContenido existente\n", "utf8");

    try {
      const changed = ensureReadme(dir);
      expect(changed).toBe(true);

      const updated = fs.readFileSync(readmePath, "utf8");
      expect(updated).toContain("<!-- AUTO-README:START -->");
      expect(updated).toContain("Version: 1.0.0");
      expect(updated).toContain("Contenido existente");
    } finally {
      cleanup(dir);
    }
  });
});
