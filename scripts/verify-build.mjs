import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const maximumBytes = 20 * 1024 * 1024;
const forbiddenDirectories = ["chambers"];
const redirectDirectories = ["elections-dail", "elections-seanad"];
const forbiddenRuntimeHosts = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "unpkg.com",
];

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  }));
  return nested.flat();
}

for (const directory of forbiddenDirectories) {
  try {
    await stat(join(root, directory));
    throw new Error(`Unexpected deployed directory: ${directory}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const files = await filesUnder(root);
const sizes = await Promise.all(files.map((file) => stat(file)));
const totalBytes = sizes.reduce((sum, file) => sum + file.size, 0);

for (const directory of redirectDirectories) {
  const deployed = files
    .map((file) => relative(root, file))
    .filter((file) => file.startsWith(`${directory}/`));
  if (deployed.length !== 1 || deployed[0] !== `${directory}/index.html`) {
    throw new Error(`Legacy redirect ${directory} contains unexpected deployed files`);
  }
}

if (totalBytes > maximumBytes) {
  throw new Error(`Build is ${(totalBytes / 1024 / 1024).toFixed(2)} MiB; expected no more than 20 MiB`);
}

for (const file of files.filter((path) => /\.(?:css|html|js)$/u.test(path))) {
  const content = await readFile(file, "utf8");
  for (const host of forbiddenRuntimeHosts) {
    if (content.includes(host)) {
      throw new Error(`External runtime host ${host} found in ${relative(root, file)}`);
    }
  }
}

if (!files.some((file) => file.endsWith(".woff2"))) {
  throw new Error("No self-hosted WOFF2 font was emitted");
}

console.log(`Verified ${files.length} files (${(totalBytes / 1024 / 1024).toFixed(2)} MiB)`);
