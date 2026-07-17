/**
 * Shared Brevo contact-list helper. Mirrors the `addToBrevo` conventions
 * already used by actions/waitlist-supabase.ts (same endpoint, same
 * `api-key` header, same "duplicate contact = success" idempotency) but
 * generalized to accept an arbitrary list id so callers can target
 * different Brevo lists (e.g. the opencode "news" vs "beta" lists).
 *
 * Never throws — a Brevo outage or misconfiguration must never break the
 * caller's signup flow. Every outcome is reported via the return value
 * and logged.
 *
 * PRIVACY: log lines below use hashEmailForLog(), never the raw address —
 * see lib/privacy-log.ts for why.
 */

import { hashEmailForLog } from './privacy-log'

export type AddContactOutcome =
  | { status: 'added' }
  | { status: 'skipped'; reason: string }
  | { status: 'error'; message: string }

/**
 * Upserts a contact into the given Brevo list.
 *
 * - `updateEnabled: true` — idempotent, safe to call repeatedly for the
 *   same email (e.g. to add a contact to a second list, or to set an
 *   attribute after the fact).
 * - Brevo returns 400 with a "Contact already exist" message when the
 *   contact already exists but `updateEnabled` wasn't set correctly for
 *   the request shape being sent — treated as success, same as
 *   actions/waitlist-supabase.ts.
 * - If `BREVO_API_KEY` is unset, this is a silent no-op (logged) so local
 *   dev / CI never needs the key.
 */
export async function addContactToBrevo(
  email: string,
  listId: string | number | undefined,
  attributes?: Record<string, string | boolean | null>
): Promise<AddContactOutcome> {
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    console.log('[brevo] BREVO_API_KEY not set - skipping mailing list sync')
    return { status: 'skipped', reason: 'BREVO_API_KEY not set' }
  }

  if (!listId) {
    console.log('[brevo] No list id provided - skipping mailing list sync')
    return { status: 'skipped', reason: 'list id not set' }
  }

  const numericListId = Number(listId)
  if (!Number.isFinite(numericListId)) {
    console.error('[brevo] Invalid list id:', listId)
    return { status: 'skipped', reason: 'invalid list id' }
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        listIds: [numericListId],
        updateEnabled: true,
        attributes: attributes || {},
      }),
    })

    if (res.ok) {
      console.log('[brevo] contact added/updated', hashEmailForLog(email), 'list', numericListId)
      return { status: 'added' }
    }

    const body = await res.text()

    // Brevo's "contact already exists" error — idempotent, treat as success.
    if (res.status === 400 && /already exist/i.test(body)) {
      console.log('[brevo] contact already exists (treated as success)', hashEmailForLog(email))
      return { status: 'added' }
    }

    console.error('[brevo] API error:', res.status, body)
    return { status: 'error', message: `${res.status}: ${body}` }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[brevo] request failed:', message)
    return { status: 'error', message }
  }
}

/**
 * Sends a transactional email via Brevo's SMTP API. Used for the internal
 * founder notification (no separate Resend key needed — Brevo is already
 * the mailing platform). Never throws.
 *
 * `sender` must be a Brevo-verified sender. `BREVO_NOTIFY_SENDER` overrides
 * the default (`support@vibebrowser.app`, verified on this account); the
 * agentlabs.cc domain is not a verified Brevo sender, so notifications are
 * sent from the vibebrowser.app identity by design.
 */
export async function sendTransactionalEmail(params: {
  to: string
  subject: string
  htmlContent: string
  senderName?: string
}): Promise<{ status: 'sent' | 'skipped' | 'error'; message?: string }> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.log('[brevo] BREVO_API_KEY not set - skipping notification email')
    return { status: 'skipped', message: 'BREVO_API_KEY not set' }
  }

  const senderEmail = process.env.BREVO_NOTIFY_SENDER || 'support@vibebrowser.app'

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: params.senderName || 'OpenCode Signups' },
        to: [{ email: params.to }],
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    })

    if (res.ok) {
      console.log('[brevo] notification email sent to', params.to)
      return { status: 'sent' }
    }

    const body = await res.text()
    console.error('[brevo] transactional email error:', res.status, body)
    return { status: 'error', message: `${res.status}: ${body}` }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[brevo] transactional email request failed:', message)
    return { status: 'error', message }
  }
}
