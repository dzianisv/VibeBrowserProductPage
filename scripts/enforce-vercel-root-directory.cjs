#!/usr/bin/env node
'use strict';

// `vercel pull` writes the Vercel dashboard's CURRENT project settings into
// .vercel/project.json. That dashboard setting can drift (confirmed on
// bison-s-projects/agentlabs, 2026-09-26): if "Root Directory" gets unset or
// reset, `vercel build` silently builds the repo root instead of the
// intended app — no error, just the wrong pages/assets in the output.
//
// This script makes the required rootDirectory a repo-owned invariant
// instead of a dashboard setting we hope stays correct: it overwrites
// .vercel/project.json's settings.rootDirectory with the value this
// workflow requires, and fails loudly if the file vercel pull produced
// doesn't have the shape we expect (so a Vercel CLI/output-format change is
// a loud CI failure here, not a silently wrong build).
//
// Usage: node scripts/enforce-vercel-root-directory.cjs <expected-root-dir>

const fs = require('fs');
const path = require('path');

function fail(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}

const expectedRootDirectory = process.argv[2];
if (!expectedRootDirectory) {
  fail('usage: enforce-vercel-root-directory.cjs <expected-root-directory>');
}

const projectJsonPath = path.join(process.cwd(), '.vercel', 'project.json');
if (!fs.existsSync(projectJsonPath)) {
  fail(
    `${projectJsonPath} does not exist — expected \`vercel pull\` to have run first.`
  );
}

let project;
try {
  project = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
} catch (err) {
  fail(`${projectJsonPath} is not valid JSON: ${err.message}`);
}

if (typeof project !== 'object' || project === null || Array.isArray(project)) {
  fail(`${projectJsonPath} did not parse to a JSON object.`);
}
if (!project.projectId || !project.orgId) {
  fail(
    `${projectJsonPath} is missing projectId/orgId — not the shape \`vercel pull\` normally produces.`
  );
}

const priorRootDirectory =
  project.settings && typeof project.settings === 'object'
    ? project.settings.rootDirectory
    : undefined;

if (priorRootDirectory !== expectedRootDirectory) {
  console.log(
    `::warning::Vercel dashboard rootDirectory was ${JSON.stringify(
      priorRootDirectory
    )}, expected ${JSON.stringify(
      expectedRootDirectory
    )}. Forcing it for this build so CI does not silently build the wrong app. Fix the dashboard setting at your convenience — this workflow no longer depends on it.`
  );
}

project.settings = project.settings && typeof project.settings === 'object'
  ? project.settings
  : {};
project.settings.rootDirectory = expectedRootDirectory;

fs.writeFileSync(projectJsonPath, JSON.stringify(project, null, 2) + '\n');
console.log(
  `Enforced settings.rootDirectory=${expectedRootDirectory} in ${projectJsonPath}`
);
