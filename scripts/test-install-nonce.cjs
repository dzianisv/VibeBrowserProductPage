/* eslint-disable */
/**
 * Real-browser test for the `/install` gtag.js welcome page + one-time nonce handoff
 * (issue VibeTechnologies/VibeWebAgent#1546).
 *
 * What is REAL here (runs unmocked in Chromium / the actual Next server):
 *   - The site's real gtag.js (mounted globally by app/layout.tsx) loading from
 *     googletagmanager.com and minting a genuine GA4 client_id.
 *   - middleware.ts setting the `vibe_attribution` cookie.
 *   - app/install/install-client.tsx reading the real client_id and POSTing it.
 *   - app/api/install/nonce/route.ts forwarding to the relay and Set-Cookie'ing
 *     `vibe_ga_nonce`.
 *   - window.location.replace(...) to the Chrome Web Store.
 *
 * The ONLY mocked boundary is PR #1551's `POST /api/analytics/nonce/issue`, stood up
 * as a local HTTP server that the Next server calls via ANALYTICS_API_BASE.
 *
 * Usage:  node scripts/test-install-nonce.cjs
 * Assumes the app is already built (`npm run build`). Spawns `next start` itself.
 */

const puppeteer = require('puppeteer')
const http = require('http')
const { spawn } = require('child_process')
const path = require('path')

const NEXT_PORT = Number(process.env.TEST_NEXT_PORT || 3123)
const MOCK_PORT = Number(process.env.TEST_MOCK_PORT || 3199)
const BASE = `http://localhost:${NEXT_PORT}`
const CWS_PREFIX = 'https://chromewebstore.google.com'
const REPO_ROOT = path.resolve(__dirname, '..')

// --- mutable mock state ---------------------------------------------------
let mockMode = 'success' // 'success' | 'fail' | 'timeout'
let mockNonce = ''
let lastIssueBody = null

const mock = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.startsWith('/api/analytics/nonce/issue')) {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => {
      try {
        lastIssueBody = JSON.parse(data)
      } catch {
        lastIssueBody = null
      }
      if (mockMode === 'fail') {
        res.writeHead(500, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'boom' }))
        return
      }
      if (mockMode === 'timeout') {
        // Respond far later than the route's 800ms upstream budget — the route must abort.
        setTimeout(() => {
          try {
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ nonce: 'too-late', expires_at: Date.now() + 300000 }))
          } catch {}
        }, 5000)
        return
      }
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ nonce: mockNonce, expires_at: Date.now() + 300000 }))
    })
    return
  }
  res.writeHead(404)
  res.end()
})

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url)
      if (r.status > 0) return true
    } catch {}
    await sleep(300)
  }
  throw new Error(`server not ready: ${url}`)
}

function parseGaClientId(gaValue) {
  if (!gaValue) return null
  const parts = decodeURIComponent(gaValue).split('.')
  if (parts.length < 4) return null
  const c = parts.slice(2).join('.')
  return /^\d+\.\d+$/.test(c) ? c : null
}

const results = []
function check(name, cond, detail) {
  const ok = !!cond
  results.push({ name, ok, detail })
  console.log(`  ${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? `  [${detail}]` : ''}`)
}

async function runScenario(browser, { title, query, mode, expect }) {
  console.log(`\n=== Scenario: ${title} ===`)
  mockMode = mode
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}_${Date.now()}`
  lastIssueBody = null

  const context = await browser.createBrowserContext()
  const page = await context.newPage()

  let cwsRequested = false
  let cwsAt = 0
  let tStart = 0
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const url = req.url()
    if (url.startsWith(CWS_PREFIX)) {
      cwsRequested = true
      cwsAt = Date.now()
      try {
        req.abort()
      } catch {}
      return
    }
    try {
      req.continue()
    } catch {}
  })

  // Pre-warm gtag on the homepage so a real `_ga` cookie / client_id exists before
  // we hit /install (removes the first-load network race; the client_id is still the
  // genuine gtag.js one). middleware only matches /install, so `/` sets no cookies.
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {})

  let gaClientId = null
  const gaDeadline = Date.now() + 10000
  while (Date.now() < gaDeadline) {
    const cookies = await page.cookies(BASE)
    const ga = cookies.find((c) => c.name === '_ga')
    gaClientId = parseGaClientId(ga && ga.value)
    if (gaClientId) break
    await sleep(300)
  }

  // Navigate to /install; the page will attempt the handoff then redirect to CWS.
  tStart = Date.now()
  await page
    .goto(`${BASE}/install${query}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
    .catch(() => {})

  // Wait until the redirect to CWS is observed (or a hard ceiling).
  const redirectDeadline = Date.now() + 8000
  while (Date.now() < redirectDeadline && !cwsRequested) {
    await sleep(50)
  }

  const cookies = await page.cookies(BASE)
  const attrib = cookies.find((c) => c.name === 'vibe_attribution')
  const nonce = cookies.find((c) => c.name === 'vibe_ga_nonce')

  // --- assertions ---
  check(`${title}: real gtag.js client_id captured`, !!gaClientId, `client_id=${gaClientId}`)
  check(`${title}: redirected to Chrome Web Store`, cwsRequested, `after ${cwsAt ? cwsAt - tStart : 'n/a'}ms`)
  if (cwsRequested) {
    check(`${title}: redirect within time budget (<3000ms)`, cwsAt - tStart < 3000, `${cwsAt - tStart}ms`)
  }

  if (expect.attribution) {
    let src = null
    try {
      src = JSON.parse(decodeURIComponent(attrib.value)).source
    } catch {}
    check(`${title}: vibe_attribution set with source`, !!attrib && src === expect.attribution, `source=${src}`)
    check(`${title}: vibe_attribution HttpOnly+Secure`, !!attrib && attrib.httpOnly && attrib.secure, `httpOnly=${attrib && attrib.httpOnly} secure=${attrib && attrib.secure}`)
  } else {
    check(`${title}: vibe_attribution NOT set`, !attrib, attrib ? `unexpected=${attrib.value}` : 'absent')
  }

  if (expect.nonce) {
    check(`${title}: vibe_ga_nonce == relay nonce`, !!nonce && nonce.value === mockNonce, `got=${nonce && nonce.value}`)
    check(`${title}: vibe_ga_nonce HttpOnly+Secure+MaxAge`, !!nonce && nonce.httpOnly && nonce.secure, `httpOnly=${nonce && nonce.httpOnly} secure=${nonce && nonce.secure}`)
    check(`${title}: real client_id forwarded to relay (never in cookie)`, !!lastIssueBody && lastIssueBody.client_id === gaClientId, `forwarded=${lastIssueBody && lastIssueBody.client_id}`)
    check(`${title}: nonce cookie value is opaque, not the client_id`, !!nonce && nonce.value !== gaClientId, 'ok')
  } else {
    check(`${title}: vibe_ga_nonce NOT set`, !nonce, nonce ? `unexpected=${nonce.value}` : 'absent')
  }

  if (expect.utmForwarded) {
    for (const [k, v] of Object.entries(expect.utmForwarded)) {
      check(`${title}: relay received ${k}=${v}`, !!lastIssueBody && lastIssueBody[k] === v, `got=${lastIssueBody && lastIssueBody[k]}`)
    }
  }

  await context.close()
}

;(async () => {
  await new Promise((r) => mock.listen(MOCK_PORT, '127.0.0.1', r))
  console.log(`[mock] relay listening on http://127.0.0.1:${MOCK_PORT}`)

  const server = spawn('npx', ['next', 'start', '-p', String(NEXT_PORT)], {
    cwd: REPO_ROOT,
    env: { ...process.env, ANALYTICS_API_BASE: `http://127.0.0.1:${MOCK_PORT}` },
    stdio: ['ignore', 'inherit', 'inherit'],
  })

  let browser
  try {
    await waitForServer(`${BASE}/`, 60000)
    console.log(`[next] ready on ${BASE}`)

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    })

    await runScenario(browser, {
      title: 'A/utm+success',
      query: '?utm_source=hn&utm_medium=social&utm_campaign=launch',
      mode: 'success',
      expect: {
        attribution: 'hn',
        nonce: true,
        utmForwarded: { utm_source: 'hn', utm_medium: 'social', utm_campaign: 'launch' },
      },
    })

    await runScenario(browser, {
      title: 'B/no-utm+success',
      query: '',
      mode: 'success',
      expect: { attribution: null, nonce: true },
    })

    await runScenario(browser, {
      title: 'C1/utm+relay-500',
      query: '?utm_source=hn',
      mode: 'fail',
      expect: { attribution: 'hn', nonce: false },
    })

    await runScenario(browser, {
      title: 'C2/utm+relay-timeout',
      query: '?utm_source=hn',
      mode: 'timeout',
      expect: { attribution: 'hn', nonce: false },
    })
  } catch (err) {
    console.error('FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: 'harness', ok: false, detail: String(err) })
  } finally {
    if (browser) await browser.close().catch(() => {})
    try {
      server.kill('SIGTERM')
    } catch {}
    mock.close()
  }

  const passed = results.filter((r) => r.ok).length
  const total = results.length
  console.log(`\nResults: ${passed}/${total} passed`)
  if (passed === total && total > 0) {
    console.log('=== RESULT: PASS ===')
    process.exit(0)
  } else {
    console.log('=== RESULT: FAIL ===')
    process.exit(1)
  }
})()
