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
 */

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
      console.log('[brevo] contact added/updated', email, 'list', numericListId)
      return { status: 'added' }
    }

    const body = await res.text()

    // Brevo's "contact already exists" error — idempotent, treat as success.
    if (res.status === 400 && /already exist/i.test(body)) {
      console.log('[brevo] contact already exists (treated as success)', email)
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
