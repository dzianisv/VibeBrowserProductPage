/**
 * Framework-free core of the "mailto fallback" waitlist reconciler.
 *
 * WHY THIS EXISTS
 * ---------------
 * OpenCode Mobile signs users up through `POST /api/beta-signup` (Brevo list 4).
 * When that call fails — and on every build older than v0.4.8, where it did not
 * exist at all — the app falls back to a `mailto:` to support@agentlabs.cc
 * (`opencode-mobile/src/lib/waitlist.ts:buildWaitlistMailtoUrl`). Those mails
 * land in Chatwoot inbox 2 and NOWHERE ELSE: between 2026-08-03 and 2026-08-13,
 * 20 of 21 such signups never reached the waitlist store and sat unanswered for
 * 11 days (AGE-61). Nothing reconciled the inbox back into the list.
 *
 * This module is that missing reconciliation, expressed as pure functions so it
 * is unit-testable under `node --test`; `scripts/reconcile-waitlist-mailto.js`
 * is the I/O shell and `.github/workflows/waitlist-mailto-reconcile.yml` runs it
 * hourly.
 *
 * DESIGN NOTES
 * ------------
 * - The signup is replayed through the DEPLOYED production route, never Brevo
 *   directly: Brevo pins API keys to an IP allowlist and GitHub runners get a
 *   fresh egress IP every run (same reason documented in lib/waitlist-count.ts).
 *   No Brevo key ever reaches the runner.
 * - Dedupe state lives in Chatwoot as a conversation label (`waitlist-synced`),
 *   not in a database or a committed file: the inbox is already the source of
 *   truth for these signups, and a label survives re-runs, re-deploys and
 *   repo history rewrites.
 * - The cohort stays distinguishable in Brevo via `source`
 *   (`opencode-connect-waitlist-mailto`), which the beta-signup route writes to
 *   the contact's SOURCE attribute.
 */

/** Subject the app's mailto fallback always sets (compared case-insensitively). */
export const WAITLIST_MAIL_SUBJECT = 'opencode connect waitlist'

/** Chatwoot label that marks a conversation as already replayed into the store. */
export const SYNCED_LABEL = 'waitlist-synced'

/** Brevo SOURCE attribute for signups recovered from the inbox. */
export const MAILTO_SOURCE = 'opencode-connect-waitlist-mailto'

/** Mirrors the server-side pattern in OpenCodeMobileSite/lib/brevo-contact.ts. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The app writes `Email: <address>` as the second line of the mailto body. That
 * typed address is authoritative — a user can mail us from a different account
 * than the one they want on the list — so it wins over the envelope sender.
 */
const bodyEmailPattern = /^\s*Email:\s*<?([^\s<>,;]+@[^\s<>,;]+)>?\s*$/im

export interface ChatwootConversation {
  id: number
  inbox_id?: number
  labels?: string[] | null
  status?: string
  created_at?: number
  additional_attributes?: { mail_subject?: string | null } | null
  meta?: { sender?: { email?: string | null } | null } | null
}

/** Chatwoot `message_type`: 0 = incoming (customer), 1 = outgoing, 2 = activity. */
export interface ChatwootMessage {
  id?: number
  message_type?: number
  private?: boolean
  content?: string | null
  sender?: { email?: string | null } | null
}

export type ReconcilePlan =
  | { conversationId: number; action: 'sync'; email: string; origin: 'body' | 'sender' }
  | { conversationId: number; action: 'skip'; reason: 'already-synced' | 'not-waitlist' | 'no-email' }

/** Trim/lowercase like the server does; null when the server would 400. */
export function normalizeEmail(raw: string | null | undefined): string | null {
  const email = (raw ?? '').trim().toLowerCase()
  if (!email || email.length > 254 || !emailPattern.test(email)) return null
  return email
}

/** True when this conversation is an app mailto-fallback waitlist signup. */
export function isWaitlistConversation(conv: ChatwootConversation): boolean {
  const subject = (conv.additional_attributes?.mail_subject ?? '').trim().toLowerCase()
  // startsWith, not equals: mail clients prefix Re:/Fwd: and append list noise.
  return subject.includes(WAITLIST_MAIL_SUBJECT)
}

export function isSynced(conv: ChatwootConversation): boolean {
  return (conv.labels ?? []).includes(SYNCED_LABEL)
}

/** Labels are REPLACED by Chatwoot's API, so always merge before writing. */
export function mergeLabels(existing: string[] | null | undefined, add: string): string[] {
  const labels = (existing ?? []).filter((label) => typeof label === 'string' && label.length > 0)
  return labels.includes(add) ? [...labels] : [...labels, add]
}

/**
 * Pull the signup address out of the first customer message, falling back to the
 * envelope sender. Outgoing/private/activity messages are ignored so our own
 * reply copy (which quotes addresses) can never be mistaken for a signup.
 */
export function extractSignupEmail(
  conv: ChatwootConversation,
  messages: ChatwootMessage[],
): { email: string; origin: 'body' | 'sender' } | null {
  const incoming = messages
    .filter((m) => m.message_type === 0 && m.private !== true)
    .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))

  for (const message of incoming) {
    const match = bodyEmailPattern.exec(message.content ?? '')
    const email = match ? normalizeEmail(match[1]) : null
    if (email) return { email, origin: 'body' }
  }

  const senderEmail =
    normalizeEmail(incoming[0]?.sender?.email) ?? normalizeEmail(conv.meta?.sender?.email)
  return senderEmail ? { email: senderEmail, origin: 'sender' } : null
}

export function planConversation(
  conv: ChatwootConversation,
  messages: ChatwootMessage[],
): ReconcilePlan {
  if (!isWaitlistConversation(conv)) {
    return { conversationId: conv.id, action: 'skip', reason: 'not-waitlist' }
  }
  if (isSynced(conv)) {
    return { conversationId: conv.id, action: 'skip', reason: 'already-synced' }
  }
  const found = extractSignupEmail(conv, messages)
  if (!found) return { conversationId: conv.id, action: 'skip', reason: 'no-email' }
  return { conversationId: conv.id, action: 'sync', email: found.email, origin: found.origin }
}

/** Body for the deployed beta-signup route. `source` becomes the SOURCE attribute. */
export function buildSignupBody(email: string): { email: string; source: string } {
  return { email, source: MAILTO_SOURCE }
}

export function buildSyncNote(email: string, origin: 'body' | 'sender'): string {
  return [
    `Internal (automated): this signup arrived through the app's mailto fallback and has been`,
    `replayed into the waitlist store as \`${email}\` (address taken from the message ${origin}),`,
    `tagged \`SOURCE=${MAILTO_SOURCE}\`. Labelled \`${SYNCED_LABEL}\` so it is not re-sent.`,
  ].join(' ')
}

export interface ReconcileSummary {
  synced: { conversationId: number; email: string; origin: string }[]
  failed: { conversationId: number; email: string; error: string }[]
  skipped: number
  scanned: number
}

/**
 * Alert copy. Any signup that reached a human inbox instead of the store is a
 * leak worth paging on, even though we just healed it — it means installs on
 * that build cannot sign up on their own.
 */
export function formatAlert(summary: ReconcileSummary): string {
  const lines: string[] = []
  lines.push(
    `${summary.synced.length} waitlist signup(s) arrived through the app's **mailto fallback** ` +
      `instead of \`POST /api/beta-signup\`, and were auto-recovered into the waitlist store ` +
      `(Brevo list 4, \`SOURCE=${MAILTO_SOURCE}\`).`,
  )
  lines.push('')
  lines.push('| Chatwoot conversation | Email | Address from |')
  lines.push('| --- | --- | --- |')
  for (const item of summary.synced) {
    lines.push(
      `| [#${item.conversationId}](https://support.agentlabs.cc/app/accounts/1/conversations/${item.conversationId}) ` +
        `| \`${item.email}\` | ${item.origin} |`,
    )
  }
  if (summary.failed.length > 0) {
    lines.push('')
    lines.push('**Failed to sync (needs a human):**')
    for (const item of summary.failed) {
      lines.push(`- conversation #${item.conversationId} (\`${item.email}\`): ${item.error}`)
    }
  }
  lines.push('')
  lines.push(
    'Why it matters: the fallback only fires on pre-v0.4.8 builds or when the signup API is ' +
      'unreachable. A steady trickle here means installs in the wild still have no working ' +
      'signup path — see AGE-61.',
  )
  return lines.join('\n')
}
