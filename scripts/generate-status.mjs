#!/usr/bin/env node
/**
 * Generates public/status.json for the Vibe Browser public status page.
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
 * response is never "ok") mirror VibeWebAgent/scripts/status/generate-status.mjs
 * line for line, so a service can never show green on one side and red on
 * the other for the same response.
 *
 * Do NOT add extra services (landing page, portal, langfuse, etc.) here —
 * that would recreate the "second, independently drifting health registry"
 * this issue exists to avoid. Anything not deterministically probed by the
 * sweep does not belong on this page. tee_attestation is deliberately
 * absent: AGE-1053 delisted TEE/Confidential Mode from the shipped product.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const TIMEOUT_MS = 10_000

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
      throw new Error(`unsupported check type "${check.type}"`)
  }
}

async function checkOne(ep) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(ep.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'vibebrowser-status-page/1.0' },
    })
    const check = ep.check || { type: 'http_2xx' }
    const body = check.type === 'http_2xx' ? '' : await res.text().catch(() => '')
    const healthy = evalCheck(check, res, body)
    return {
      id: ep.id,
      label: ep.name,
      url: ep.url,
      state: healthy ? 'up' : 'down',
      httpStatus: res.status,
    }
  } catch (err) {
    return {
      id: ep.id,
      label: ep.name,
      url: ep.url,
      state: 'down',
      httpStatus: null,
      error: String(err && err.message ? err.message : err),
    }
  } finally {
    clearTimeout(timer)
  }
}

export async function generateStatusPayload(endpointsConfig) {
  const results = await Promise.all((endpointsConfig.endpoints || []).map(checkOne))
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
  const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
  const endpointsPath = path.join(repoRoot, 'data', 'status-endpoints.json')
  const endpointsConfig = JSON.parse(readFileSync(endpointsPath, 'utf8'))

  const payload = await generateStatusPayload(endpointsConfig)

  const fs = await import('node:fs/promises')
  await fs.mkdir(path.join(repoRoot, 'public'), { recursive: true })
  await fs.writeFile(path.join(repoRoot, 'public', 'status.json'), JSON.stringify(payload, null, 2) + '\n')

  console.log(JSON.stringify(payload, null, 2))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error('generate-status failed:', err)
    process.exit(1)
  })
}
