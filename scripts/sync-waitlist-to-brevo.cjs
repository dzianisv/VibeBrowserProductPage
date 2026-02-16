#!/usr/bin/env node
/**
 * One-time script to sync existing Supabase waitlist subscribers to Brevo.
 *
 * Usage:
 *   node scripts/sync-waitlist-to-brevo.js
 *
 * Reads env vars from .env (dotenv) or from the shell environment.
 * Required env vars:
 *   SUPABASE_PROJECT_URL, SUPABASE_API_KEY, BREVO_API_KEY, BREVO_LIST_ID
 */

require("dotenv").config(); // npm i dotenv — already a transitive dep of Next.js

const SUPABASE_URL = (process.env.SUPABASE_PROJECT_URL || "").trim().replace(/\\n$/, "");
const SUPABASE_KEY = (process.env.SUPABASE_API_KEY || "").trim().replace(/\\n$/, "");
const BREVO_API_KEY = (process.env.BREVO_API_KEY || "").trim();
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID);

if (!SUPABASE_URL || !SUPABASE_KEY || !BREVO_API_KEY || !BREVO_LIST_ID) {
  console.error("Missing required env vars. Check .env file.");
  process.exit(1);
}

async function fetchWaitlist() {
  // Supabase REST API — select all rows from vibebrowser_waitlist
  const url = `${SUPABASE_URL}/rest/v1/vibebrowser_waitlist?select=email,tier,referral_source,utm_source,utm_medium,utm_campaign,created_at&order=created_at.asc`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase fetch failed: ${res.status} ${body}`);
  }

  return res.json();
}

async function addToBrevo(contact) {
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      email: contact.email.toLowerCase(),
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: {
        TIER: contact.tier || "free",
        SOURCE: contact.referral_source || null,
        UTM_SOURCE: contact.utm_source || null,
        UTM_MEDIUM: contact.utm_medium || null,
        UTM_CAMPAIGN: contact.utm_campaign || null,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    // duplicate_parameter is fine — means the contact already exists
    if (res.status === 400 && body.includes("duplicate_parameter")) {
      return { status: "exists" };
    }
    return { status: "error", detail: `${res.status} ${body}` };
  }
  return { status: "created" };
}

async function main() {
  console.log("Fetching waitlist from Supabase…");
  const contacts = await fetchWaitlist();
  console.log(`Found ${contacts.length} contacts.`);

  let created = 0;
  let existing = 0;
  let errors = 0;

  for (const contact of contacts) {
    const result = await addToBrevo(contact);
    if (result.status === "created") {
      created++;
      console.log(`  + ${contact.email}`);
    } else if (result.status === "exists") {
      existing++;
      console.log(`  = ${contact.email} (already in Brevo)`);
    } else {
      errors++;
      console.error(`  ! ${contact.email}: ${result.detail}`);
    }
    // Brevo rate limit is 10 req/s on free tier — add a small delay
    await new Promise((r) => setTimeout(r, 120));
  }

  console.log(`\nDone. Created: ${created}, Already existing: ${existing}, Errors: ${errors}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
