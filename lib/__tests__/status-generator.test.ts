import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.join(__dirname, '..', '..')
const GENERATOR_PATH = path.join(REPO_ROOT, 'scripts', 'generate-status.mjs')
const ENDPOINTS_PATH = path.join(REPO_ROOT, 'data', 'status-endpoints.json')

/**
 * AGE-1095 review fix: scripts/generate-status.mjs's check functions must
 * gate on HTTP status (2xx) AND the body predicate -- a 500/503 response
 * whose body happens to match the pattern must never render "up". All
 * network calls below hit a local, in-process HTTP fixture server
 * (127.0.0.1, ephemeral port), so this is deterministic with no real
 * internet access.
 */

function startFixtureServer(routes: Record<string, (req: http.IncomingMessage, res: http.ServerResponse) => void>) {
  return new Promise<{ server: http.Server; base: string }>((resolve) => {
    const server = http.createServer((req, res) => {
      const handler = routes[req.url ?? '']
      if (handler) return handler(req, res)
      res.writeHead(404).end('not found')
    })
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      resolve({ server, base: `http://127.0.0.1:${port}` })
    })
  })
}

function stopFixtureServer(server: http.Server) {
  return new Promise<void>((resolve) => server.close(() => resolve()))
}

describe('scripts/generate-status.mjs', () => {
  test('data/status-endpoints.json lists the full probed set and no tee_attestation (AGE-1053 delisted TEE; PH-5 added portal + subscription API)', () => {
    const config = JSON.parse(fs.readFileSync(ENDPOINTS_PATH, 'utf8'))
    const ids = config.endpoints.map((e: { id: string }) => e.id)
    assert.ok(!ids.includes('tee_attestation'))
    assert.deepEqual(
      [...ids].sort(),
      ['api_health_readiness', 'docs_portal', 'relay_health', 'subscription_api', 'user_portal'].sort()
    )
    const byId = Object.fromEntries(config.endpoints.map((e: { id: string }) => [e.id, e])) as Record<string, { name: string; url: string; check: { type: string } }>
    // PH-5: the card requires the page to show api / relay / portal /
    // litellm as distinguishable things. api.vibebrowser.app/health/readiness
    // IS litellm's own readiness endpoint (its body carries litellm_version),
    // so it must be NAMED for litellm; the stripe-service billing API gets
    // its own separate entry rather than being conflated with it.
    assert.match(byId.api_health_readiness.name, /LiteLLM/i)
    assert.equal(byId.user_portal.url, 'https://portal.vibebrowser.app/health')
    assert.equal(byId.subscription_api.url, 'https://api.vibebrowser.app/api/health')
    // A 200 carrying a failure body must read as down -> body-level checks.
    assert.notEqual(byId.user_portal.check.type, 'http_2xx')
    assert.notEqual(byId.subscription_api.check.type, 'http_2xx')
  })

  /**
   * PH-5: both new endpoints must be exercised UP and DOWN against the local
   * fixture server, using each entry's REAL check from the registry (not a
   * hand-copied one) -- so a check that silently stops discriminating cannot
   * pass this suite.
   */
  function registryEntry(id: string) {
    const config = JSON.parse(fs.readFileSync(ENDPOINTS_PATH, 'utf8'))
    const ep = config.endpoints.find((e: { id: string }) => e.id === id)
    assert.ok(ep, `registry must contain ${id}`)
    return ep as { id: string; name: string; url: string; check: unknown }
  }

  test('user_portal: a 200 whose body says status ok is "up"', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const ep = registryEntry('user_portal')
    const { server, base } = await startFixtureServer({
      '/health': (_req, res) =>
        res.writeHead(200, { 'content-type': 'application/json' }).end('{"status":"ok","service":"user-portal"}'),
    })
    try {
      const payload = await generateStatusPayload({ endpoints: [{ ...ep, url: `${base}/health` }] })
      assert.equal(payload.services[0].state, 'up')
      assert.equal(payload.overall, 'operational')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('user_portal: a 200 whose body reports a FAILING portal is "down" (not merely 2xx)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const ep = registryEntry('user_portal')
    const { server, base } = await startFixtureServer({
      '/health': (_req, res) =>
        res
          .writeHead(200, { 'content-type': 'application/json' })
          .end('{"status":"error","service":"user-portal","detail":"supabase unreachable"}'),
    })
    try {
      const payload = await generateStatusPayload({ endpoints: [{ ...ep, url: `${base}/health` }] })
      assert.equal(payload.services[0].state, 'down', 'a 200 with a failure body must not read as up')
      assert.equal(payload.overall, 'degraded')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('user_portal: an HTTP 503 whose body still says ok is "down" (status gates the result)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const ep = registryEntry('user_portal')
    const { server, base } = await startFixtureServer({
      '/health': (_req, res) =>
        res.writeHead(503, { 'content-type': 'application/json' }).end('{"status":"ok","service":"user-portal"}'),
    })
    try {
      const payload = await generateStatusPayload({ endpoints: [{ ...ep, url: `${base}/health` }] })
      assert.equal(payload.services[0].state, 'down')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('subscription_api: a 200 aggregate body with stripe-service ok is "up"', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const ep = registryEntry('subscription_api')
    const { server, base } = await startFixtureServer({
      '/api/health': (_req, res) =>
        res.writeHead(200, { 'content-type': 'application/json' }).end(
          '{"status":"ok","timestamp":"2026-09-24T21:36:28.912Z","services":{"stripe-service":{"status":"ok"},"litellm":{"status":"ok"}}}'
        ),
    })
    try {
      const payload = await generateStatusPayload({ endpoints: [{ ...ep, url: `${base}/api/health` }] })
      assert.equal(payload.services[0].state, 'up')
      assert.equal(payload.overall, 'operational')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('subscription_api: a 200 whose aggregate body reports stripe-service NOT ok is "down"', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const ep = registryEntry('subscription_api')
    const { server, base } = await startFixtureServer({
      '/api/health': (_req, res) =>
        res.writeHead(200, { 'content-type': 'application/json' }).end(
          '{"status":"degraded","services":{"stripe-service":{"status":"error","detail":"stripe api 500"},"litellm":{"status":"ok"}}}'
        ),
    })
    try {
      const payload = await generateStatusPayload({ endpoints: [{ ...ep, url: `${base}/api/health` }] })
      assert.equal(payload.services[0].state, 'down', 'a 200 that reports the billing API broken must not read as up')
      assert.equal(payload.overall, 'degraded')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('subscription_api: an unreachable host is "unknown", never "up"', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const ep = registryEntry('subscription_api')
    const { server, base } = await startFixtureServer({})
    await stopFixtureServer(server)
    const payload = await generateStatusPayload({ endpoints: [{ ...ep, url: `${base}/api/health` }] })
    assert.equal(payload.services[0].state, 'unknown')
    assert.equal(payload.overall, 'unknown')
  })

  test('a 2xx response with a matching body is "up"', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/readiness': (_req, res) => res.writeHead(200, { 'content-type': 'application/json' }).end('{"db":"connected"}'),
    })
    try {
      const payload = await generateStatusPayload({
        endpoints: [{ id: 'api_health_readiness', name: 'API', url: `${base}/readiness`, check: { type: 'regex', pattern: '"db"\\s*:\\s*"connected"' } }],
      })
      assert.equal(payload.services[0].state, 'up')
      assert.equal(payload.overall, 'operational')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('an HTTP 500 with a body that matches the predicate is still "down" (status always gates the result)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/degraded': (_req, res) => res.writeHead(500, { 'content-type': 'application/json' }).end('{"db":"connected"}'),
    })
    try {
      const payload = await generateStatusPayload({
        endpoints: [{ id: 'api_health_readiness', name: 'API', url: `${base}/degraded`, check: { type: 'regex', pattern: '"db"\\s*:\\s*"connected"' } }],
      })
      assert.equal(payload.services[0].state, 'down', 'HTTP 500 must not be "up" even when the body matches')
      assert.equal(payload.overall, 'degraded')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('an HTTP 503 with a body containing the needle is still "down" (body_contains_ci gated by status)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/relay-down': (_req, res) => res.writeHead(503, { 'content-type': 'text/plain' }).end('OK (cached, stale)'),
    })
    try {
      const payload = await generateStatusPayload({
        endpoints: [{ id: 'relay_health', name: 'Relay', url: `${base}/relay-down`, check: { type: 'body_contains_ci', needle: 'ok' } }],
      })
      assert.equal(payload.services[0].state, 'down')
    } finally {
      await stopFixtureServer(server)
    }
  })

  /**
   * AGE-1095 review fix: "unknown" fail-closed floor. A network error
   * (unreachable host, timeout, abort) means we could not determine health
   * at all -- this must render as "unknown", never "down" (which implies a
   * confirmed incident on the probed service) and never "up" (which would
   * mask a real outage). Mirrors VibeWebAgent/scripts/status/generate-status.mjs.
   */
  test('a connection error (unreachable host) is "unknown", never "down" or "up"', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    // Bind and immediately close a server to get a guaranteed-closed local
    // port -- ECONNREFUSED, fast and deterministic, no real network egress.
    const { server, base } = await startFixtureServer({})
    await stopFixtureServer(server)

    const payload = await generateStatusPayload({
      endpoints: [{ id: 'docs_portal', name: 'Docs', url: `${base}/unreachable`, check: { type: 'http_2xx' } }],
    })
    assert.equal(payload.services[0].state, 'unknown')
    assert.equal(payload.services[0].httpStatus, null)
    assert.ok(payload.services[0].error, 'unknown state should carry a diagnostic error message')
    assert.equal(payload.overall, 'unknown')
  })

  test('a request exceeding the timeout is "unknown" (fail-closed on timeout, production-safe bounded wait)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/slow': (_req, res) => {
        // Deliberately never respond within the test's short timeout.
        setTimeout(() => res.writeHead(200).end('ok'), 5_000).unref()
      },
    })
    try {
      const payload = await generateStatusPayload(
        { endpoints: [{ id: 'relay_health', name: 'Relay', url: `${base}/slow`, check: { type: 'http_2xx' } }] },
        { timeoutMs: 100 }
      )
      assert.equal(payload.services[0].state, 'unknown')
      assert.match(payload.services[0].error ?? '', /timed out/)
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('an unsupported check type is "unknown", not "down" (fail-closed on unrecognized check)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/ok': (_req, res) => res.writeHead(200).end('ok'),
    })
    try {
      const payload = await generateStatusPayload({
        endpoints: [{ id: 'docs_portal', name: 'Docs', url: `${base}/ok`, check: { type: 'some_future_check' } }],
      })
      assert.equal(payload.services[0].state, 'unknown')
      assert.equal(payload.overall, 'unknown')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('overall is "unknown" (never "operational") when one endpoint is up and another cannot be reached', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/ok': (_req, res) => res.writeHead(200).end('ok'),
    })
    const { server: deadServer, base: deadBase } = await startFixtureServer({})
    await stopFixtureServer(deadServer)
    try {
      const payload = await generateStatusPayload({
        endpoints: [
          { id: 'docs_portal', name: 'Docs', url: `${base}/ok`, check: { type: 'http_2xx' } },
          { id: 'relay_health', name: 'Relay', url: `${deadBase}/unreachable`, check: { type: 'http_2xx' } },
        ],
      })
      assert.equal(payload.overall, 'unknown', 'a mix of up + unknown (no down) must not be masked as operational')
    } finally {
      await stopFixtureServer(server)
    }
  })

  test('overall is "degraded" when one endpoint is down and another is unknown (down outranks unknown)', async () => {
    const { generateStatusPayload } = await import(`file://${GENERATOR_PATH}`)
    const { server, base } = await startFixtureServer({
      '/broken': (_req, res) => res.writeHead(500).end('error'),
    })
    const { server: deadServer, base: deadBase } = await startFixtureServer({})
    await stopFixtureServer(deadServer)
    try {
      const payload = await generateStatusPayload({
        endpoints: [
          { id: 'api_health_readiness', name: 'API', url: `${base}/broken`, check: { type: 'http_2xx' } },
          { id: 'relay_health', name: 'Relay', url: `${deadBase}/unreachable`, check: { type: 'http_2xx' } },
        ],
      })
      assert.equal(payload.overall, 'degraded')
    } finally {
      await stopFixtureServer(server)
    }
  })
})
