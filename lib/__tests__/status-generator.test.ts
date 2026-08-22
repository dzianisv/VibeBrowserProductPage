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
  test('data/status-endpoints.json does not list tee_attestation (AGE-1053 delisted TEE)', () => {
    const config = JSON.parse(fs.readFileSync(ENDPOINTS_PATH, 'utf8'))
    const ids = config.endpoints.map((e: { id: string }) => e.id)
    assert.ok(!ids.includes('tee_attestation'))
    assert.deepEqual([...ids].sort(), ['api_health_readiness', 'docs_portal', 'relay_health'].sort())
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
