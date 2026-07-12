#!/usr/bin/env node
/**
 * One-time setup: point a Google Play closed-testing track's tester list
 * at a Google Group, using the Android Publisher API.
 *
 * Docs:
 *   - edits.testers.update: https://developers.google.com/android-publisher/api-ref/rest/v3/edits.testers/update
 *   - edits.commit:         https://developers.google.com/android-publisher/api-ref/rest/v3/edits/commit
 *
 * Auth: a Google service account JSON key with access to the Play Console
 * app (Release Manager or equivalent). Reuses the same service account
 * already used to publish this app — playstore-deploy@opencode-mobile-deploy.iam.gserviceaccount.com
 * (see the opencode-mobile repo's publish workflow). Point
 * GOOGLE_PLAY_SA_JSON at that same key material (raw JSON or base64).
 *
 * Usage:
 *   GOOGLE_PLAY_SA_JSON='...' \
 *   node scripts/set-play-tester-group.mjs \
 *     --package cc.agentlabs.opencode \
 *     --track internal \
 *     --group beta-testers@agentlabs.cc
 *
 * Flags default to:
 *   --package  cc.agentlabs.opencode
 *   --track    internal   (use "alpha" if that's the closed track you use)
 *   --group    $PLAY_BETA_GROUP_EMAIL
 *
 * This is a manual, one-time (or run-when-the-group-changes) admin script.
 * It is NOT part of the app build and is never invoked automatically.
 */

import { google } from 'googleapis'

function parseArgs(argv) {
  const args = { package: 'cc.agentlabs.opencode', track: 'internal', group: process.env.PLAY_BETA_GROUP_EMAIL }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--package') args.package = argv[++i]
    else if (arg === '--track') args.track = argv[++i]
    else if (arg === '--group') args.group = argv[++i]
  }
  return args
}

function decodeServiceAccountJson(raw) {
  const trimmed = raw.trim()
  const json = trimmed.startsWith('{') ? trimmed : Buffer.from(trimmed, 'base64').toString('utf8')
  return JSON.parse(json)
}

async function main() {
  const { package: packageName, track, group } = parseArgs(process.argv.slice(2))

  if (!group) {
    console.error('Missing --group (or set PLAY_BETA_GROUP_EMAIL), e.g. beta-testers@agentlabs.cc')
    process.exit(1)
  }

  const saJsonRaw = process.env.GOOGLE_PLAY_SA_JSON
  if (!saJsonRaw) {
    console.error('Missing GOOGLE_PLAY_SA_JSON — set it to the playstore-deploy service account key (raw JSON or base64).')
    process.exit(1)
  }

  const credentials = decodeServiceAccountJson(saJsonRaw)
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  })

  const publisher = google.androidpublisher({ version: 'v3', auth })

  console.log(`Creating edit for ${packageName}...`)
  const { data: edit } = await publisher.edits.insert({ packageName })
  const editId = edit.id

  console.log(`Setting track "${track}" testers to Google Group ${group}...`)
  await publisher.edits.testers.update({
    packageName,
    editId,
    track,
    requestBody: {
      track,
      googleGroups: [group],
    },
  })

  console.log('Committing edit...')
  await publisher.edits.commit({ packageName, editId })

  console.log(`Done. Track "${track}" for ${packageName} now reads testers from ${group}.`)
}

main().catch((err) => {
  console.error('Failed to update Play Console tester group:', err?.message || err)
  process.exit(1)
})
