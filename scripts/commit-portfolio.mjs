import {spawnSync} from "node:child_process";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const portfolioRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const projects = [
  "2026-03-19_dail_chamber_vote_poc",
  "2026-03-25_pq-explorer-framework",
  "2026-04-04_elections_explorer",
  "2026-04-08_seanad_elections",
  "2026-06-26_seanad-chamber-vote",
  "2026-06-27-open-data-insights-front-end",
  "2026-08-24_PBO-Insights",
  "Constituency Insights/2026-04-11_constituency_insights",
];

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}
if (options.commit && !options.message) {
  throw new Error("--commit requires a non-empty --message");
}
if (!options.commit && options.message) {
  throw new Error("--message is only valid with --commit");
}

const dirty = [];
for (const project of projects) {
  const cwd = resolve(portfolioRoot, project);
  const topLevel = git(cwd, ["rev-parse", "--show-toplevel"]).stdout.trim();
  if (topLevel !== cwd) {
    throw new Error(`${project} did not resolve to the expected Git repository`);
  }

  const conflicts = git(cwd, ["diff", "--name-only", "--diff-filter=U"]).stdout.trim();
  if (conflicts) {
    throw new Error(`${project} has unresolved conflicts:\n${conflicts}`);
  }

  const status = git(cwd, ["status", "--short"]).stdout.trimEnd();
  if (status) dirty.push({project, cwd, status});
}

if (!dirty.length) {
  console.log("All portfolio repositories are clean.");
  process.exit(0);
}

console.log(`${dirty.length} of ${projects.length} portfolio repositories have changes:\n`);
for (const item of dirty) {
  console.log(`=== ${item.project} ===`);
  console.log(item.status);
  console.log();
}

if (!options.commit) {
  console.log("Status only; nothing was staged or committed.");
  console.log("Use --commit --message \"…\" to commit every repository listed above.");
  process.exit(0);
}

const committed = [];
for (const item of dirty) {
  git(item.cwd, ["add", "-A"], {stdio: "inherit"});
  const staged = spawnSync("git", ["diff", "--cached", "--quiet"], {cwd: item.cwd});
  if (staged.error) throw staged.error;
  if (staged.status === 0) continue;
  if (staged.status !== 1) {
    throw new Error(`Could not inspect staged changes in ${item.project}`);
  }

  git(item.cwd, ["commit", "-m", options.message], {stdio: "inherit"});
  const revision = git(item.cwd, ["rev-parse", "--short", "HEAD"]).stdout.trim();
  committed.push({project: item.project, revision});
}

console.log(`\nCommitted ${committed.length} portfolio repositories:`);
for (const item of committed) console.log(`- ${item.project}: ${item.revision}`);

function parseArgs(args) {
  const options = {commit: false, help: false, message: ""};
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--commit") options.commit = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else if (argument === "--message") options.message = args[++index] ?? "";
    else if (argument.startsWith("--message=")) {
      options.message = argument.slice("--message=".length);
    } else throw new Error(`Unknown option: ${argument}`);
  }
  options.message = options.message.trim();
  return options;
}

function git(cwd, args, options = {}) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: options.stdio ? undefined : "utf8",
    stdio: options.stdio,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = typeof result.stderr === "string" ? `: ${result.stderr.trim()}` : "";
    throw new Error(`git ${args[0]} failed in ${cwd}${detail}`);
  }
  return result;
}

function printHelp() {
  console.log(`Usage:
  npm run portfolio:status
  npm run portfolio:commit -- --message "Commit message"

The default status command is read-only. The commit command preflights all
repositories, stages every change in each dirty repository, and creates one
commit per repository using the supplied message. It does not push.`);
}
