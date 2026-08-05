#!/usr/bin/env node

/**
 * Idempotently create the contact attributes the waitlist relies on.
 *
 * Brevo silently DROPS attributes that are not declared on the account, so
 * without this the TIER / SOURCE / UTM_* values sent by `actions/waitlist.ts`
 * never land and the admin dashboard shows empty tier/source breakdowns.
 *
 * Run once per Brevo account:  node scripts/setup-brevo-attributes.js
 */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  console.error('❌ BREVO_API_KEY is not set in .env.local');
  process.exit(1);
}

const ATTRIBUTES = ['TIER', 'SOURCE', 'UTM_SOURCE', 'UTM_MEDIUM', 'UTM_CAMPAIGN', 'LANDING_PAGE'];

(async () => {
  const existingRes = await fetch('https://api.brevo.com/v3/contacts/attributes', {
    headers: { accept: 'application/json', 'api-key': apiKey },
  });
  if (!existingRes.ok) {
    console.error('❌ Failed to list attributes:', existingRes.status, await existingRes.text());
    process.exit(1);
  }
  const existing = new Set(((await existingRes.json()).attributes || []).map((a) => a.name));

  for (const name of ATTRIBUTES) {
    if (existing.has(name)) {
      console.log(`✓ ${name} already exists`);
      continue;
    }

    const res = await fetch(`https://api.brevo.com/v3/contacts/attributes/normal/${name}`, {
      method: 'POST',
      headers: { accept: 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'text' }),
    });

    if (res.ok) {
      console.log(`+ ${name} created`);
    } else {
      console.error(`✗ ${name} failed:`, res.status, await res.text());
      process.exitCode = 1;
    }
  }
})();
