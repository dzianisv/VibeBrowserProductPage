import { timingSafeEqual } from 'node:crypto'

/**
 * Framework-free core of the authenticated waitlist-count endpoint.
 *
 * Kept out of `app/api/.../route.ts` so it is directly unit-testable under
 * `node --test` (importing `next/server` outside a Next build fails to resolve).
 * The route is a thin adapter over `handleWaitlistCountRequest`.
 *
 * Security invariants enforced here and asserted by lib/__tests__:
 * - Requires a dedicated server-side secret (`WAITLIST_SNAPSHOT_TOKEN`); when it
 *   is unset the endpoint is DISABLED (503), never open.
 * - Bearer token compared in constant time.
 * - Emits aggregate counts ONLY — never contacts, never the Brevo key, and
 *   never a Brevo error body (which can echo request/IP context).
 */

const BREVO_API = 'https://api.brevo.com/v3'

/** Only what this module reads from the environment. `process.env` satisfies it. */
export type WaitlistCountEnv = Record<string, string | undefined>

export interface WaitlistCountResult {
  status: number
  body: Record<string, unknown>
}

function tokenMatches(presented: string, expected: string): boolean {
  const a = Buffer.from(presented)
  const b = Buffer.from(expected)
  // Length is not secret; comparing unequal lengths would throw.
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function extractBearer(authorizationHeader: string | null): string {
  const header = authorizationHeader ?? ''
  return header.startsWith('Bearer ') ? header.slice(7) : ''
}

export async function handleWaitlistCountRequest(
  authorizationHeader: string | null,
  env: WaitlistCountEnv = process.env,
  fetchImpl: typeof fetch = fetch
): Promise<WaitlistCountResult> {
  const expectedToken = env.WAITLIST_SNAPSHOT_TOKEN
  const apiKey = env.BREVO_API_KEY
  if (!expectedToken || !apiKey) {
    return { status: 503, body: { error: 'not_configured' } }
  }

  const presented = extractBearer(authorizationHeader)
  if (!presented || !tokenMatches(presented, expectedToken)) {
    return { status: 401, body: { error: 'unauthorized' } }
  }

  const listId = Number.parseInt(env.BREVO_LIST_ID ?? '3', 10)
  if (!Number.isInteger(listId) || listId < 1) {
    return { status: 503, body: { error: 'not_configured' } }
  }

  const res = await fetchImpl(`${BREVO_API}/contacts/lists/${listId}`, {
    headers: { accept: 'application/json', 'api-key': apiKey },
    cache: 'no-store',
  })

  if (!res.ok) {
    return { status: 502, body: { error: 'upstream_error', status: res.status } }
  }

  const payload = (await res.json()) as { totalSubscribers?: unknown; totalBlacklisted?: unknown }
  const totalSubscribers = Number(payload.totalSubscribers)
  if (!Number.isFinite(totalSubscribers)) {
    return { status: 502, body: { error: 'upstream_error', status: 200 } }
  }

  return {
    status: 200,
    body: { totalSubscribers, blacklisted: Number(payload.totalBlacklisted) || 0 },
  }
}
