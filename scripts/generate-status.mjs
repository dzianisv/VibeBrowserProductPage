#!/usr/bin/env node
/**
 * Generates public/status.json for the Vibe Browser public status page.
 *
 * AGE-1095: this endpoint set is a DELIBERATE, literal mirror of the
 * deterministic (LLM-independent) probes the VibeWebAgent repo's
 * `.github/workflows/oncall-health-sweep.yml` cron actually executes on
 * every run — `db_probe` (api_health_readiness) and `tee_relay_docs_probe`
 * (tee_attestation, relay_health, docs_portal) — both of which are in turn
 * driven by the single canonical registry at
 * `VibeWebAgent/scripts/status/endpoints.json`. That JSON is not fetchable
 * from here at build/runtime (VibeWebAgent is a private repo, and adding a
 * cross-repo read credential to this public site would violate the
 * zero-new-credential constraint on this issue), so the ids/urls/checks
 * below are copied verbatim instead. If you change the endpoint list or a
 * check in either `scripts/status/endpoints.json` (VibeWebAgent) or here,
 * update the other file in the same change — these four ids/urls/checks
 * must stay byte-for-byte identical between the two repos:
 *   - api_health_readiness -> https://api.vibebrowser.app/health/readiness (body matches "db":"connected")
 *   - tee_attestation      -> https://tee.vibebrowser.app/attestation (body matches "tee_verified":true)
 *   - relay_health         -> https://relay.api.vibebrowser.app/health (body contains "ok", case-insensitive)
 *   - docs_portal          -> https://docs.vibebrowser.app (HTTP 2xx)
 *
 * Do NOT add extra services (landing page, portal, langfuse, etc.) here —
 * that would recreate the "second, independently drifting health registry"
 * this issue exists to avoid. Anything not deterministically probed by the
 * sweep does not belong on this page.
 */

const SERVICES = [
  {
    id: 'api_health_readiness',
    label: 'API (DB readiness)',
    url: 'https://api.vibebrowser.app/health/readiness',
    check: (res, body) => res.ok && /"db"\s*:\s*"connected"/.test(body),
  },
  {
    id: 'tee_attestation',
    label: 'TEE Attestation',
    url: 'https://tee.vibebrowser.app/attestation',
    check: (res, body) => res.ok && /"tee_verified"\s*:\s*true/.test(body),
  },
  {
    id: 'relay_health',
    label: 'MCP/WS Relay',
    url: 'https://relay.api.vibebrowser.app/health',
    check: (res, body) => res.ok && /ok/i.test(body),
  },
  {
    id: 'docs_portal',
    label: 'Docs Portal',
    url: 'https://docs.vibebrowser.app',
    check: (res) => res.ok,
  },
]

const TIMEOUT_MS = 10_000

async function checkOne(svc) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(svc.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'vibebrowser-status-page/1.0' },
    })
    const body = await res.text().catch(() => '')
    const healthy = svc.check(res, body)
    return {
      id: svc.id,
      label: svc.label,
      url: svc.url,
      state: healthy ? 'up' : 'down',
      httpStatus: res.status,
    }
  } catch (err) {
    return {
      id: svc.id,
      label: svc.label,
      url: svc.url,
      state: 'down',
      httpStatus: null,
      error: String(err && err.message ? err.message : err),
    }
  } finally {
    clearTimeout(timer)
  }
}

async function main() {
  const results = await Promise.all(SERVICES.map(checkOne))
  const overall = results.every((r) => r.state === 'up')
    ? 'operational'
    : results.some((r) => r.state === 'down')
      ? 'degraded'
      : 'unknown'

  const payload = {
    generatedAt: new Date().toISOString(),
    overall,
    services: results,
  }

  const fs = await import('node:fs/promises')
  await fs.mkdir('public', { recursive: true })
  await fs.writeFile('public/status.json', JSON.stringify(payload, null, 2) + '\n')

  console.log(JSON.stringify(payload, null, 2))

  // Non-zero exit only if we could not produce output at all; individual
  // service outages are expected content, not a script failure.
}

main().catch((err) => {
  console.error('generate-status failed:', err)
  process.exit(1)
})
