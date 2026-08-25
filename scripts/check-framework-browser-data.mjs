import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const portfolioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const projects = [
  "2026-03-25_pq-explorer-framework",
  "2026-04-04_elections_explorer",
  "2026-04-08_seanad_elections",
  "2026-08-24_PBO-Insights",
  "Constituency Insights/2026-04-11_constituency_insights",
];
const violations = [];

for (const project of projects) {
  const sourceRoot = path.join(portfolioRoot, project, "src");
  for (const file of await sourceFiles(sourceRoot)) {
    const relative = path.relative(sourceRoot, file);
    if (isOfflineCode(relative)) continue;
    const text = await fs.readFile(file, "utf8");
    const lines = text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      if (/\.csv\s*\(|\bcsvParse(?:Rows)?\s*\(/.test(lines[index])) {
        violations.push(`${project}/src/${relative}:${index + 1}: ${lines[index].trim()}`);
      }
    }
  }
}

if (violations.length) {
  throw new Error(
    "Browser-side CSV parsing violates the derived-data policy:\n- " + violations.join("\n- "),
  );
}

console.log(`Verified browser-data policy across ${projects.length} Framework projects.`);

async function sourceFiles(directory) {
  const output = [];
  for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
    if (entry.name === ".observablehq") continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await sourceFiles(file));
    else if (/\.(?:js|mjs|ts|md)$/i.test(entry.name)) output.push(file);
  }
  return output;
}

function isOfflineCode(relative) {
  const parts = relative.split(path.sep);
  return parts.includes("scripts") ||
    (parts.includes("data") && parts.includes("transformers")) ||
    /\.(?:csv|json|geojson)\.(?:js|mjs|ts)$/i.test(relative);
}
