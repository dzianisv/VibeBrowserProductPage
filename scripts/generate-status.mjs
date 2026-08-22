#!/usr/bin/env node
/**
 * Canonical status-check generator for the Vibe Browser public status page.
 *
 * AGE-1095: reads data/status-endpoints.json in THIS repo, which is a
 * verbatim mirror of the single canonical registry at
 * `VibeWebAgent/scripts/status/endpoints.json` (private repo -- see that
 * file's header for the sync contract). VibeWebAgent's CI enforces parity
 * mechanically (fetches data/status-endpoints.json from this repo's public
 * raw URL and diffs it against its own registry; see
 * tests/unit/issue-1095-status-page-parity.test.js over there) -- so if
 * this file drifts from the private registry, the OTHER repo's CI goes red,
 * not just a comment telling maintainers to remember to mirror it.
 *
 * The check-type semantics (http_2xx / body_contains / body_contains_ci /
 * regex, all gated by HTTP status — a body predicate matching on a 4xx/5xx
 * response is never "up") AND the three-state model (up/down/unknown, with
 * an "unknown" fail-closed floor for anything we could not determine) mirror
 * VibeWebAgent/scripts/status/generate-status.mjs's ok/fail/unknown model
 * line for line, so a service can never show healthy on one side and
 * unhealthy on the other for the same response, and a network hiccup here
 * can never be silently rendered as "down" (a real incident) OR "up" (masks
 * an outage) -- it must render as "unknown".
 *
 * Do NOT add extra services (landing page, portal, langfuse, etc.) here —
 * that would recreate the "second, independently drifting health registry"
 * this issue exists to avoid. Anything not deterministically probed by the
 * sweep does not belong on this page. tee_attestation is deliberately
 * absent: AGE-1053 delisted TEE/Confidential Mode from the shipped product.
 *
 * AGE-1095 review fix: this file is imported by lib/status-cache.ts (which
 * backs both the /status page and the /status.json route -- both bounded by
 * a short in-process TTL cache) and by lib/__tests__/status-generator.test.ts.
 * `main()` below is a manual CLI debug entrypoint only (prints JSON to
 * stdout); it deliberately does NOT write public/status.json anymore -- the
 * *.github/workflows/status-page-refresh.yml* cron that committed that file
 * and force-triggered a production deploy every 15 minutes has been removed.
 * There is no code path left in this repo that writes public/status.json.
 *
 * Per-endpoint timeout is intentionally short (production-safe): this
 * function backs a live Serverless Function response, and 3 endpoints are
 * probed in parallel, so the worst case wall-clock time is ~1 timeout, not
 * the sum -- kept well under typical platform function-duration limits.
 */

import { fileURLToPath } from 'node:url'
import path from 'node:path'

const DEFAULT_TIMEOUT_MS = 6_000

// Returns true/false when the check type is understood, or null when it is
// not -- the caller treats null as "unknown", never as a silent "down".
function evalCheck(check, res, body) {
  const isHttpOk = res.status >= 200 && res.status < 300
  switch (check.type) {
    case 'http_2xx':
      return isHttpOk
    case 'body_contains':
      return isHttpOk && body.includes(check.needle)
    case 'body_contains_ci':
      return isHttpOk && body.toLowerCase().includes(String(check.needle).toLowerCase())
    case 'regex':
      return isHttpOk && new RegExp(check.pattern).test(body)
    default:
      return null
  }
}

async function checkOne(ep, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(ep.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'vibebrowser-status-page/1.0' },
    })
    const check = ep.check || { type: 'http_2xx' }
    const body = check.type === 'http_2xx' ? '' : await res.text().catch(() => '')
    const verdict = evalCheck(check, res, body)
    if (verdict === null) {
      // Fail-closed: an unrecognized check type means we cannot determine
      // health, so this must render as "unknown", not "down" or "up".
      return {
        id: ep.id,
        label: ep.name,
        url: ep.url,
        state: 'unknown',
        httpStatus: res.status,
        error: `unsupported check type "${check.type}"`,
      }
    }
    return {
      id: ep.id,
      label: ep.name,
      url: ep.url,
      state: verdict ? 'up' : 'down',
      httpStatus: res.status,
    }
  } catch (err) {
    // Network error / abort / timeout: we could not determine health at
    // all. This must be "unknown" (fail-closed floor), NOT "down" -- a
    // transient network hiccup on the status page's own runtime is not the
    // same as a confirmed incident on the probed service.
    const reason = err && err.name === 'AbortError' ? `timed out after ${timeoutMs}ms` : String(err && err.message ? err.message : err)
    return {
      id: ep.id,
      label: ep.name,
      url: ep.url,
      state: 'unknown',
      httpStatus: null,
      error: reason,
    }
  } finally {
    clearTimeout(timer)
  }
}

export async function generateStatusPayload(endpointsConfig, opts = {}) {
  const timeoutMs = opts.timeoutMs || DEFAULT_TIMEOUT_MS
  const results = await Promise.all((endpointsConfig.endpoints || []).map((ep) => checkOne(ep, timeoutMs)))
  // Worst-of ranking mirrors VibeWebAgent's generate-status.mjs: fail (down)
  // outranks unknown, which outranks ok (up). A single "down" is always a
  // confirmed incident, even alongside "unknown" readings; absent any
  // "down", a single "unknown" is enough to withhold "operational".
  const overall = results.every((r) => r.state === 'up')
    ? 'operational'
    : results.some((r) => r.state === 'down')
      ? 'degraded'
      : 'unknown'
  return {
    generatedAt: new Date().toISOString(),
    overall,
    services: results,
  }
}

async function main() {
  const { readFileSync } = await import('node:fs')
  const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
  const endpointsPath = path.join(repoRoot, 'data', 'status-endpoints.json')
  const endpointsConfig = JSON.parse(readFileSync(endpointsPath, 'utf8'))

  const payload = await generateStatusPayload(endpointsConfig)
  console.log(JSON.stringify(payload, null, 2))
  if (payload.overall !== 'operational') process.exitCode = 1
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error('generate-status failed:', err)
    process.exit(1)
  })
}
