#!/usr/bin/env node

/**
 * Replay OpenCode Connect waitlist signups that arrived through the app's
 * `mailto:` fallback into the real waitlist store.
 *
 * Reads Chatwoot inbox 2 (support@agentlabs.cc), finds conversations whose mail
 * subject is "OpenCode Connect Waitlist" and that are not yet labelled
 * `waitlist-synced`, POSTs each address to the deployed beta-signup route
 * (Brevo list 4, tagged SOURCE=opencode-connect-waitlist-mailto), then labels
 * the conversation and leaves an internal note.
 *
 * All decision logic lives in lib/waitlist-mailto-reconcile.ts (unit-tested);
 * this file is only I/O, so a bug here is a network/permission bug, not a
 * "which signup counts" bug.
 *
 * WHY NOT CALL BREVO DIRECTLY: Brevo pins API keys to an IP allowlist and
 * GitHub-hosted runners change egress IP every run (401 "unrecognised IP").
 * The production route on Vercel is already trusted by Brevo, so we go through
 * it and the Brevo key never reaches the runner. Same rationale as
 * scripts/snapshot-waitlist-count.js.
 *
 * Env:
 *   CHATWOOT_TOKEN       (required) Chatwoot access token — NOT a Bearer token
 *   CHATWOOT_BASE_URL    default https://support.agentlabs.cc
 *   CHATWOOT_ACCOUNT_ID  default 1
 *   CHATWOOT_INBOX_ID    default 2   (Support Email)
 *   WAITLIST_SIGNUP_URL  default https://opencode.agentlabs.cc/api/beta-signup
 *
 * Usage:
 *   node scripts/reconcile-waitlist-mailto.js            # sync + label
 *   node scripts/reconcile-waitlist-mailto.js --dry-run  # report only, no writes
 *   node scripts/reconcile-waitlist-mailto.js --json     # machine-readable summary on stdout
 *
 * Exit codes: 0 = nothing to do or everything synced; 1 = at least one signup
 * could not be synced (the scheduled workflow then fails loudly, which is the
 * alert path for the error case).
 */

import fs from 'node:fs'

import {
  SYNCED_LABEL,
  buildSignupBody,
  buildSyncNote,
  formatAlert,
  isWaitlistConversation,
  mergeLabels,
  planConversation,
} from '../lib/waitlist-mailto-reconcile.ts'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const asJson = args.includes('--json')

if (args.includes('--help') || args.includes('-h')) {
  console.log(
    'Usage: node scripts/reconcile-waitlist-mailto.js [--dry-run] [--json]\n\n' +
      'Replays mailto-fallback waitlist signups from Chatwoot into the waitlist store.\n',
  )
  process.exit(0)
}

const TOKEN = (process.env.CHATWOOT_TOKEN || '').trim()
const BASE = (process.env.CHATWOOT_BASE_URL || 'https://support.agentlabs.cc').replace(/\/+$/, '')
const ACCOUNT = (process.env.CHATWOOT_ACCOUNT_ID || '1').trim()
const INBOX = Number.parseInt(process.env.CHATWOOT_INBOX_ID || '2', 10)
const SIGNUP_URL = (
  process.env.WAITLIST_SIGNUP_URL || 'https://opencode.agentlabs.cc/api/beta-signup'
).trim()
const MAX_PAGES = Number.parseInt(process.env.CHATWOOT_MAX_PAGES || '20', 10)

// Fail closed and loudly: a missing token must never degrade into "0 signups
// found", which reads identical to a healthy run.
if (!TOKEN) {
  console.error('CHATWOOT_TOKEN is not set — refusing to report a false all-clear.')
  process.exit(1)
}
if (!SIGNUP_URL.startsWith('https://')) {
  console.error('WAITLIST_SIGNUP_URL must be https://')
  process.exit(1)
}

const CW = `${BASE}/api/v1/accounts/${ACCOUNT}`
const headers = { api_access_token: TOKEN, 'content-type': 'application/json' }

async function chatwoot(path, init = {}) {
  const res = await fetch(`${CW}${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } })
  if (!res.ok) {
    // Never echo the body: Chatwoot error payloads can carry request context.
    throw new Error(`Chatwoot ${init.method || 'GET'} ${path} failed: HTTP ${res.status}`)
  }
  return res.json()
}

async function listConversations() {
  const all = []
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const body = await chatwoot(`/conversations?inbox_id=${INBOX}&status=all&page=${page}`)
    const payload = body?.data?.payload ?? body?.payload ?? []
    all.push(...payload)
    if (payload.length < 25) break
  }
  return all
}

async function listMessages(conversationId) {
  const body = await chatwoot(`/conversations/${conversationId}/messages`)
  return Array.isArray(body) ? body : (body?.payload ?? [])
}

async function submitSignup(email) {
  const res = await fetch(SIGNUP_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(buildSignupBody(email)),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`signup route returned HTTP ${res.status}${detail ? ` ${detail.slice(0, 120)}` : ''}`)
  }
  return true
}

async function markSynced(conv, email, origin) {
  // Chatwoot REPLACES the label set on write, so merge with what is there.
  await chatwoot(`/conversations/${conv.id}/labels`, {
    method: 'POST',
    body: JSON.stringify({ labels: mergeLabels(conv.labels, SYNCED_LABEL) }),
  })
  await chatwoot(`/conversations/${conv.id}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      content: buildSyncNote(email, origin),
      message_type: 'outgoing',
      private: true, // internal note — never delivered to the customer
    }),
  })
}

const summary = { synced: [], failed: [], skipped: 0, scanned: 0 }

const conversations = await listConversations()
const candidates = conversations.filter(isWaitlistConversation)
summary.scanned = candidates.length

for (const conv of candidates) {
  const messages = await listMessages(conv.id)
  const plan = planConversation(conv, messages)
  if (plan.action === 'skip') {
    summary.skipped += 1
    if (plan.reason === 'no-email') {
      summary.failed.push({
        conversationId: conv.id,
        email: '(none found)',
        error: 'no signup address in the message body or envelope sender',
      })
    }
    continue
  }

  if (dryRun) {
    console.log(`[dry-run] would sync conversation ${conv.id} -> ${plan.email} (${plan.origin})`)
    summary.synced.push({ conversationId: conv.id, email: plan.email, origin: plan.origin })
    continue
  }

  try {
    await submitSignup(plan.email)
    await markSynced(conv, plan.email, plan.origin)
    summary.synced.push({ conversationId: conv.id, email: plan.email, origin: plan.origin })
    console.log(`synced conversation ${conv.id} -> ${plan.email} (${plan.origin})`)
  } catch (error) {
    summary.failed.push({ conversationId: conv.id, email: plan.email, error: String(error?.message || error) })
    console.error(`FAILED conversation ${conv.id} (${plan.email}): ${error?.message || error}`)
  }
}

console.log(
  `scanned=${summary.scanned} synced=${summary.synced.length} ` +
    `skipped=${summary.skipped} failed=${summary.failed.length}`,
)

if (asJson) console.log(JSON.stringify(summary))

// Hand the alert to the workflow: it opens a GitHub issue when synced > 0.
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `synced_count=${summary.synced.length}\nfailed_count=${summary.failed.length}\n`,
  )
}
if (summary.synced.length > 0 || summary.failed.length > 0) {
  fs.writeFileSync('waitlist-mailto-alert.md', formatAlert(summary))
}
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### Waitlist mailto reconcile\n\nscanned ${summary.scanned}, synced ${summary.synced.length}, ` +
      `skipped ${summary.skipped}, failed ${summary.failed.length}\n`,
  )
}

process.exit(summary.failed.length > 0 ? 1 : 0)
