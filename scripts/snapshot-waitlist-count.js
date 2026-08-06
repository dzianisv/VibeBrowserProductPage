#!/usr/bin/env node

/**
 * Daily waitlist size snapshot — appends one row per day to data/waitlist-count.csv.
 *
 * Brevo is the single source of truth for the waitlist; there is no database.
 * Brevo's per-contact `createdAt` cannot be used to reconstruct history (see the
 * caveat in the CSV header), so growth over time has to be recorded forward from
 * now by sampling the list size once a day.
 *
 * Uses GET /contacts/lists/{id}, which returns the aggregate counts directly —
 * one request, no pagination over 400+ contacts, and no contact emails ever
 * enter this process.
 *
 * Env:
 *   BREVO_API_KEY   Brevo v3 API key (required)
 *   BREVO_LIST_ID   Numeric id of the waitlist contact list (default: 3)
 *
 * Usage:
 *   node scripts/snapshot-waitlist-count.js            # append/refresh today's row
 *   node scripts/snapshot-waitlist-count.js --dry-run  # print, don't write
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Local dev keeps Brevo credentials in .env; .env.local is loaded too for
// parity with scripts/get-waitlist.js. In CI neither file exists and the values
// come from the workflow environment, so `override: false` keeps CI authoritative.
dotenv.config({ path: '.env', override: false });
dotenv.config({ path: '.env.local', override: false });

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node scripts/snapshot-waitlist-count.js [--dry-run]

Appends one row (date,total_subscribers,blacklisted) to data/waitlist-count.csv
for today (UTC). Re-running on the same day refreshes that row in place instead
of adding a duplicate, so the job is safe to retry.
`);
  process.exit(0);
}

const BREVO_API = 'https://api.brevo.com/v3';
const apiKey = process.env.BREVO_API_KEY;
const listId = Number.parseInt(process.env.BREVO_LIST_ID ?? '3', 10);

if (!apiKey) {
  console.error('❌ Error: BREVO_API_KEY is not set.');
  process.exit(1);
}
if (!Number.isInteger(listId) || listId < 1) {
  console.error(`❌ Error: BREVO_LIST_ID is not a valid list id: ${process.env.BREVO_LIST_ID}`);
  process.exit(1);
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const csvPath = path.join(repoRoot, 'data', 'waitlist-count.csv');

// Kept in the committed file so anyone plotting this series sees the caveat.
const HEADER_COMMENT = [
  '# Daily size of the VibeBrowser waitlist (Brevo list 3), one row per UTC day.',
  '# Written by scripts/snapshot-waitlist-count.js via .github/workflows/waitlist-snapshot.yml.',
  '#',
  '# CAVEAT: this series is only honest from 2026-08-05 forward. The 402 contacts',
  '# migrated into Brevo on 2026-08-05 all carry that migration date rather than',
  '# their real signup date, so nothing before 2026-08-05 can be reconstructed and',
  '# the first row is a standing balance, not a day of growth.',
].join('\n');

const CSV_HEADER = 'date,total_subscribers,blacklisted';

/** Today in UTC as YYYY-MM-DD; matches the workflow's UTC cron. */
function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchListCounts() {
  const res = await fetch(`${BREVO_API}/contacts/lists/${listId}`, {
    headers: { accept: 'application/json', 'api-key': apiKey },
  });

  if (!res.ok) {
    throw new Error(`Brevo API error: ${res.status} ${await res.text()}`);
  }

  const body = await res.json();
  const total = Number(body.totalSubscribers);
  if (!Number.isFinite(total)) {
    throw new Error(`Brevo returned no usable totalSubscribers for list ${listId}`);
  }

  return { total, blacklisted: Number(body.totalBlacklisted) || 0 };
}

/** Split the existing file into its comment/header preamble and data rows. */
function readExisting() {
  if (!fs.existsSync(csvPath)) return [];
  return fs
    .readFileSync(csvPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line !== CSV_HEADER);
}

function render(rows) {
  return `${HEADER_COMMENT}\n${CSV_HEADER}\n${rows.join('\n')}\n`;
}

async function main() {
  const { total, blacklisted } = await fetchListCounts();
  const date = todayUtc();
  const row = `${date},${total},${blacklisted}`;

  const rows = readExisting();
  const existingIndex = rows.findIndex((line) => line.startsWith(`${date},`));

  let action;
  if (existingIndex === -1) {
    rows.push(row);
    action = 'appended';
  } else if (rows[existingIndex] === row) {
    action = 'unchanged';
  } else {
    rows[existingIndex] = row;
    action = 'refreshed';
  }

  rows.sort();

  if (dryRun) {
    console.log(`[dry-run] ${action}: ${row}`);
    return;
  }

  fs.mkdirSync(path.dirname(csvPath), { recursive: true });
  fs.writeFileSync(csvPath, render(rows));
  console.log(`✅ ${action}: ${row} -> data/waitlist-count.csv`);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
