#!/usr/bin/env node
/**
 * Generates public/status.json for the Vibe Browser public status page.
 *
 * Endpoint set is the SAME set checked by the oncall-engineer health sweep's
 * "Domain TLS + availability" section
 * (VibeWebAgent .agents/skills/oncall-engineer/SKILL.md, invoked on a
 * schedule by .github/workflows/oncall-health-sweep.yml). Do not add or
 * remove services here without updating that section too — the status page
 * exists to make the sweep's own findings public, not to introduce a second,
 * independently drifting registry. AGE-1051 owns adding tee/relay/docs
 * enumeration upstream in the sweep; when that lands, mirror it here.
 */

const SERVICES = [
  {
    id: 'landing',
    label: 'vibebrowser.app (landing)',
    url: 'https://vibebrowser.app',
    check: (res) => res.ok,
  },
  {
    id: 'api',
    label: 'api.vibebrowser.app',
    url: 'https://api.vibebrowser.app/health',
    check: (res, body) => res.ok && /ok/i.test(body),
  },
  {
    id: 'portal',
    label: 'portal.vibebrowser.app',
    url: 'https://portal.vibebrowser.app',
    check: (res) => res.ok,
  },
  {
    id: 'docs',
    label: 'docs.vibebrowser.app',
    url: 'https://docs.vibebrowser.app',
    check: (res) => res.ok,
  },
  {
    id: 'langfuse',
    label: 'langfuse.vibebrowser.app',
    url: 'https://langfuse.vibebrowser.app',
    check: (res) => res.ok,
  },
  {
    id: 'relay',
    label: 'relay.api.vibebrowser.app',
    url: 'https://relay.api.vibebrowser.app/health',
    check: (res, body) => res.ok && /ok/i.test(body),
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
