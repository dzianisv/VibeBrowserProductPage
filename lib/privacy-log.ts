/**
 * Privacy-safe helpers for server logs.
 *
 * Server logs (Vercel function logs) are readable by anyone with dashboard
 * access, may be forwarded to a log drain, and have no retention/RLS
 * controls of their own — unlike the Supabase table, which has RLS and no
 * public SELECT policy (see supabase/migrations/20260711000000_*.sql). Raw
 * email addresses and full client IPs must never be written to
 * console.log/console.error. These helpers keep log lines useful for
 * debugging (dedup correlation, coarse abuse/geo signal) without persisting
 * the underlying PII anywhere logs might be scraped or retained
 * indefinitely.
 *
 * Pure functions — no I/O, no env access — safe to unit test in isolation.
 */

import { createHash } from 'crypto'

/**
 * Returns a short, non-reversible identifier for an email address, suitable
 * for correlating repeated signups/log lines without exposing the address
 * itself. This is NOT a security control (12 hex chars of SHA-256 is not
 * meant to resist targeted brute-forcing of a small, known email set) — it
 * only exists to keep raw PII out of logs.
 */
export function hashEmailForLog(email: string): string {
  const normalized = email.trim().toLowerCase()
  return createHash('sha256').update(normalized).digest('hex').slice(0, 12)
}

/**
 * Truncates a client IP address for logging: drops the last octet of an
 * IPv4 address (a.b.c.d -> a.b.c.0), or collapses an IPv6 address to its
 * first 3 of 8 groups (~48 bits kept, ~80 bits dropped). Returns null for
 * missing/unparseable input so callers can log `ip: null` instead of
 * guessing.
 *
 * `x-forwarded-for` may be a comma-separated hop list (client, proxy1,
 * proxy2, ...) — only the first (client-supplied) address is used.
 */
export function anonymizeIp(ip: string | null | undefined): string | null {
  if (!ip) return null
  const first = ip.split(',')[0]?.trim()
  if (!first) return null

  const ipv4 = first.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (ipv4) {
    return `${ipv4[1]}.${ipv4[2]}.${ipv4[3]}.0`
  }

  if (first.includes(':')) {
    const groups = first.split(':').filter((g) => g.length > 0)
    const leading = groups.slice(0, 3)
    return leading.length ? `${leading.join(':')}::` : '::'
  }

  return null
}
