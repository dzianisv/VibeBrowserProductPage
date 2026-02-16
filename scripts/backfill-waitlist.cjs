#!/usr/bin/env node
/**
 * Backfill old waitlist data from old-waitlist-backup.json into the new Supabase project.
 *
 * Usage:
 *   node scripts/backfill-waitlist.cjs
 *
 * Uses service_role key (from .env) for bulk insert, bypassing RLS.
 * Skips duplicates via ON CONFLICT (email) DO NOTHING via upsert header.
 */

require("dotenv").config();
const fs = require("fs");

const SUPABASE_URL = (process.env.SUPABASE_PROJECT_URL || "").trim().replace(/\\n$/, "");
const SUPABASE_SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim().replace(/\\n$/, "");

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_PROJECT_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

async function main() {
  const backupPath = "./old-waitlist-backup.json";
  if (!fs.existsSync(backupPath)) {
    console.error("Backup file not found: " + backupPath);
    process.exit(1);
  }

  const backup = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
  const entries = backup.vibebrowser_waitlist || [];
  console.log(`Found ${entries.length} entries in backup.`);

  if (entries.length === 0) {
    console.log("Nothing to backfill.");
    return;
  }

  // Map to new table schema (drop old UUID id, let BIGSERIAL auto-generate)
  const rows = entries.map((e) => ({
    email: e.email,
    tier: e.tier || "free",
    source: e.source || "website",
    referral_source: e.referral_source || null,
    utm_source: e.utm_source || null,
    utm_medium: e.utm_medium || null,
    utm_campaign: e.utm_campaign || null,
    landing_page: e.landing_page || null,
    metadata: e.metadata || {},
    confirmed: e.confirmed || false,
    created_at: e.created_at,
  }));

  // Batch insert in chunks of 50 (Supabase REST has payload limits)
  const BATCH_SIZE = 50;
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/vibebrowser_waitlist`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        body: JSON.stringify(batch),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`Batch ${i / BATCH_SIZE + 1} failed: ${res.status} ${body}`);
      errors += batch.length;
      continue;
    }

    const result = await res.json();
    const batchInserted = result.length;
    const batchSkipped = batch.length - batchInserted;
    inserted += batchInserted;
    skipped += batchSkipped;
    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(rows.length / BATCH_SIZE)}: ` +
      `${batchInserted} inserted, ${batchSkipped} skipped (duplicate)`
    );
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped (duplicate): ${skipped}, Errors: ${errors}`);

  // Verify count
  const countRes = await fetch(
    `${SUPABASE_URL}/rest/v1/vibebrowser_waitlist?select=email&limit=0`,
    {
      method: "HEAD",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "count=exact",
      },
    }
  );
  const totalCount = countRes.headers.get("content-range");
  console.log(`Total rows in table: ${totalCount}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
