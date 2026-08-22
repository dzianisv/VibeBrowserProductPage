/**
 * In-process, cached status payload generator (AGE-1095 review fix).
 *
 * Both `/status` (the HTML page) and `/status.json` (the machine-readable
 * artifact) call `getCachedStatusPayload()` so there is exactly one code
 * path that talks to the upstream services, and both surfaces are always
 * in agreement.
 *
 * Previously this repo ran a `*\/15 * * * *` GitHub Actions cron that
 * committed `public/status.json` and relied on the resulting push to
 * trigger a full Vercel production build/deploy -- up to 96 rebuilds a day
 * for a status snapshot. That workflow (status-page-refresh.yml) has been
 * removed. Generation now happens on request, bounded by a short in-memory
 * TTL cache so a burst of visitors does not hammer the probed endpoints or
 * pay the ~6s worst-case probe latency (3 endpoints in parallel, each
 * bounded by generate-status.mjs's own per-endpoint timeout) on every
 * request.
 *
 * The cache is process-local (module-scope variable). On Vercel serverless
 * this means a cold start regenerates immediately -- which is the correct
 * fail-closed direction: we would rather probe again than serve unbounded
 * stale data. The independent status-page-freshness-check.yml workflow
 * remains as the external, out-of-band fail-closed check.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { generateStatusPayload } from '../scripts/generate-status.mjs'
import type { StatusPayload } from './status'

const CACHE_TTL_MS = 60_000

let cached: { payload: StatusPayload; expiresAt: number } | null = null
let inflight: Promise<StatusPayload> | null = null

function loadEndpointsConfig() {
  const endpointsPath = path.join(process.cwd(), 'data', 'status-endpoints.json')
  return JSON.parse(readFileSync(endpointsPath, 'utf8'))
}

export async function getCachedStatusPayload(nowMs: number = Date.now()): Promise<StatusPayload> {
  if (cached && cached.expiresAt > nowMs) {
    return cached.payload
  }
  // Coalesce concurrent requests during a cache miss into a single probe run.
  if (inflight) {
    return inflight
  }
  inflight = (async () => {
    try {
      const endpointsConfig = loadEndpointsConfig()
      const payload = (await generateStatusPayload(endpointsConfig)) as StatusPayload
      cached = { payload, expiresAt: Date.now() + CACHE_TTL_MS }
      return payload
    } finally {
      inflight = null
    }
  })()
  return inflight
}

/** Test-only: force the next call to regenerate instead of hitting the cache. */
export function __resetStatusCacheForTests() {
  cached = null
  inflight = null
}
