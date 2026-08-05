#!/usr/bin/env node

/**
 * Waitlist query tool — reads contacts straight from Brevo.
 *
 * Brevo is the single source of truth for the waitlist; there is no database.
 * Requires BREVO_API_KEY and BREVO_LIST_ID (loaded from .env.local).
 */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');
const exportCsv = args.includes('--csv');
const showStats = args.includes('--stats');
const limit = args.find((arg) => arg.startsWith('--limit='))?.split('=')[1] || null;
const tierFilter = args.find((arg) => arg.startsWith('--tier='))?.split('=')[1] || null;

if (showHelp) {
  console.log(`
📧 Waitlist Query Tool (Brevo)
==============================

Usage: node scripts/get-waitlist.js [options]

Options:
  --help, -h      Show this help message
  --csv           Export as CSV format
  --stats         Show statistics only
  --limit=N       Limit results to N entries
  --tier=TYPE     Filter by tier (free/pro)

Examples:
  node scripts/get-waitlist.js                    # Show all entries
  node scripts/get-waitlist.js --stats            # Show statistics only
  node scripts/get-waitlist.js --csv              # Export as CSV
  node scripts/get-waitlist.js --limit=10         # Show last 10 entries
  node scripts/get-waitlist.js --tier=pro         # Show only pro tier
  node scripts/get-waitlist.js --csv > list.csv   # Save to file

Env:
  BREVO_API_KEY   Brevo v3 API key
  BREVO_LIST_ID   Numeric id of the waitlist contact list
`);
  process.exit(0);
}

const BREVO_API = 'https://api.brevo.com/v3';
const apiKey = process.env.BREVO_API_KEY;
const listId = Number.parseInt(process.env.BREVO_LIST_ID ?? '', 10);

if (!apiKey || !Number.isInteger(listId) || listId < 1) {
  console.error('❌ Error: Brevo credentials not found in .env.local');
  console.error('Please ensure BREVO_API_KEY and BREVO_LIST_ID are set.');
  process.exit(1);
}

const PAGE_SIZE = 500;

function attr(attributes, key) {
  const value = attributes?.[key];
  return value === undefined || value === null || value === '' ? null : String(value);
}

async function fetchContacts() {
  const contacts = [];

  for (let page = 0; page < 100; page++) {
    const url = `${BREVO_API}/contacts/lists/${listId}/contacts?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`;
    const res = await fetch(url, {
      headers: { accept: 'application/json', 'api-key': apiKey },
    });

    if (!res.ok) {
      throw new Error(`Brevo API error: ${res.status} ${await res.text()}`);
    }

    const body = await res.json();
    const batch = body.contacts || [];
    contacts.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return contacts.map((contact) => {
    const attributes = contact.attributes || {};
    return {
      email: contact.email || '',
      tier: attr(attributes, 'TIER') || 'free',
      source: attr(attributes, 'SOURCE') || 'website',
      utm_source: attr(attributes, 'UTM_SOURCE'),
      confirmed: contact.emailBlacklisted === false,
      created_at: contact.createdAt || null,
    };
  }).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

function tally(entries, pick) {
  return entries.reduce((acc, entry) => {
    const key = pick(entry) || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

async function printStats() {
  const entries = await fetchContacts();
  const total = entries.length;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const todayCount = entries.filter((e) => e.created_at && new Date(e.created_at) >= startOfToday).length;
  const weekCount = entries.filter((e) => e.created_at && new Date(e.created_at) >= weekAgo).length;

  console.log('\n📊 WAITLIST STATISTICS');
  console.log('======================\n');
  console.log(`📧 Total Signups: ${total}`);
  console.log(`📅 Today: ${todayCount}`);
  console.log(`📅 Last 7 days: ${weekCount}`);

  const pct = (count) => (total ? ((count / total) * 100).toFixed(1) : '0.0');

  console.log('\n🏷️  By Tier:');
  Object.entries(tally(entries, (e) => e.tier)).forEach(([tier, count]) => {
    console.log(`   ${tier}: ${count} (${pct(count)}%)`);
  });

  console.log('\n📍 By Source:');
  Object.entries(tally(entries, (e) => e.source)).forEach(([source, count]) => {
    console.log(`   ${source}: ${count} (${pct(count)}%)`);
  });
}

async function printEntries() {
  const all = await fetchContacts();
  const filtered = tierFilter ? all.filter((e) => e.tier === tierFilter) : all;
  const data = limit ? filtered.slice(0, Number.parseInt(limit, 10)) : filtered;

  if (exportCsv) {
    console.log('email,tier,source,confirmed,created_at');
    data.forEach((entry) => {
      console.log(`"${entry.email}","${entry.tier}","${entry.source}",${entry.confirmed},"${entry.created_at || ''}"`);
    });
    return;
  }

  console.log('\n📧 WAITLIST ENTRIES');
  console.log('===================\n');
  console.log(`Showing ${data.length} of ${filtered.length} entries\n`);

  console.log('┌─────┬──────────────────────────────────┬──────────┬────────────┬───────────┬─────────────────────┐');
  console.log('│ #   │ Email                            │ Tier     │ Source     │ Confirmed │ Date                │');
  console.log('├─────┼──────────────────────────────────┼──────────┼────────────┼───────────┼─────────────────────┤');

  data.forEach((entry, index) => {
    const num = String(index + 1).padEnd(3);
    const email = entry.email.substring(0, 32).padEnd(32);
    const tier = entry.tier.padEnd(8);
    const source = entry.source.substring(0, 10).padEnd(10);
    const confirmed = (entry.confirmed ? '✓' : '✗').padEnd(9);
    const date = entry.created_at
      ? new Date(entry.created_at).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'unknown';

    console.log(`│ ${num} │ ${email} │ ${tier} │ ${source} │ ${confirmed} │ ${String(date).padEnd(19)} │`);
  });

  console.log('└─────┴──────────────────────────────────┴──────────┴────────────┴───────────┴─────────────────────┘');

  console.log('\n📊 Summary:');
  Object.entries(tally(data, (e) => e.tier)).forEach(([tier, count]) => {
    console.log(`   ${tier}: ${count} entries`);
  });
}

async function main() {
  if (showStats) {
    await printStats();
  } else {
    await printEntries();
  }
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
