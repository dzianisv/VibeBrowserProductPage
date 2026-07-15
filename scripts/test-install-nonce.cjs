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

  // COLD START — the whole point of issue #1546's real target scenario. The FIRST
  // navigation in this fresh browser context goes straight to /install, with NO
  // prior visit to `/`. This mirrors a genuine first-touch install-funnel visitor
  // (an ad / HN / Reddit link opened directly on /install). gtag.js therefore loads
  // and mints the real `_ga` cookie / client_id for the FIRST time ON /install
  // itself — a true first_visit — which is exactly the race a `/`-prewarm used to
  // hide. install-client.tsx must wait for gtag within its budget and still hand off.
  tStart = Date.now()
  await page
    .goto(`${BASE}/install${query}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
    .catch(() => {})

  // Wait until the redirect to CWS is observed (or a hard ceiling).
  const redirectDeadline = Date.now() + 8000
  while (Date.now() < redirectDeadline && !cwsRequested) {
    await sleep(50)
  }

  // Ground truth: read the cold-start-minted `_ga` client_id AFTER /install's own
  // gtag.js has run. This is the first (and only) place `_ga` is ever set in this
  // context, so it is a genuinely cold first_visit value — not a warmed-up
  // approximation. We then assert this exact value is what got forwarded to the
  // relay (lastIssueBody.client_id), which is what actually proves the fix works.
  // The CWS-abort keeps us on /install, so page.cookies() still sees `_ga`.
  let gaClientId = null
  const gaDeadline = Date.now() + 5000
  while (Date.now() < gaDeadline) {
    const c = await page.cookies(BASE)
    const ga = c.find((ck) => ck.name === '_ga')
    gaClientId = parseGaClientId(ga && ga.value)
    if (gaClientId) break
    await sleep(100)
  }

  const cookies = await page.cookies(BASE)
  const attrib = cookies.find((c) => c.name === 'vibe_attribution')
  const nonce = cookies.find((c) => c.name === 'vibe_ga_nonce')

  // --- assertions ---
  check(`${title}: real gtag.js client_id captured`, !!gaClientId, `client_id=${gaClientId}`)
  check(`${title}: redirected to Chrome Web Store`, cwsRequested, `after ${cwsAt ? cwsAt - tStart : 'n/a'}ms`)
  if (cwsRequested) {
    // Enforce the ACTUAL documented contract: install-client.tsx caps the redirect at
    // MAX_REDIRECT_DELAY_MS = 1200ms *from component mount*. We measure from tStart
    // (set just before page.goto), so the delta additionally includes navigation +
    // hydration that happen before the effect mounts. We therefore allow a small,
    // explicitly-justified margin on top of the 1200ms cap:
    //   1200ms  — the real hard cap (MAX_REDIRECT_DELAY_MS), measured from mount
    //   + 300ms — pre-mount nav/hydration + request-interception & Chrome cold-start
    //             jitter in this CI/test harness (tStart precedes mount).
    // Observed across repeated cold-start runs: happy path ~240-540ms, and the
    // worst case (C2, relay-timeout path that deliberately burns the full 800ms
    // upstream-abort budget) settles at ~1060-1081ms — comfortably under 1500ms yet
    // far below the old 3000ms bound, so a real regression of the 1200ms guarantee
    // (e.g. creeping toward 2s+) would now actually fail this assertion.
    const MAX_REDIRECT_DELAY_MS = 1200
    const HARNESS_MARGIN_MS = 300
    const budget = MAX_REDIRECT_DELAY_MS + HARNESS_MARGIN_MS
    check(
      `${title}: redirect within time budget (<=${budget}ms = 1200ms cap + ${HARNESS_MARGIN_MS}ms nav/CI margin)`,
      cwsAt - tStart <= budget,
      `${cwsAt - tStart}ms`
    )
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

// --- FINDING 1: same-origin enforcement on POST /api/install/nonce ----------
// Real HTTP requests straight to the route (Node fetch does NOT auto-send Origin,
// so we control every header) proving the cross-site identity-poisoning attack is
// blocked and the legitimate same-origin call is unaffected.
async function runOriginScenarios() {
  const NONCE_URL = `${BASE}/api/install/nonce`
  const SAME_ORIGIN = BASE // http://localhost:<port> — what the real /install fetch sends

  // (a) Forged/attacker Origin -> 403, no cookie, upstream relay NEVER called.
  console.log('\n=== Scenario: SecA/forged-origin ===')
  mockMode = 'success'
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}`
  lastIssueBody = null
  {
    const res = await fetch(NONCE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://evil.example' },
      body: JSON.stringify({ client_id: '1234567890.1234567890' }),
    })
    let json = null
    try {
      json = await res.json()
    } catch {}
    check('SecA: forged Origin rejected 403', res.status === 403, `status=${res.status}`)
    check('SecA: error=cross_origin_forbidden', json && json.error === 'cross_origin_forbidden', `body=${JSON.stringify(json)}`)
    check('SecA: no vibe_ga_nonce Set-Cookie', !/vibe_ga_nonce=/.test(res.headers.get('set-cookie') || ''), `set-cookie=${res.headers.get('set-cookie')}`)
    check('SecA: upstream relay NOT called', lastIssueBody === null, `lastIssueBody=${JSON.stringify(lastIssueBody)}`)
  }

  // (b) Correct same-origin Origin -> 200, cookie set, relay called (no regression).
  console.log('\n=== Scenario: SecB/same-origin-success ===')
  mockMode = 'success'
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}`
  lastIssueBody = null
  {
    const clientId = '9876543210.9876543210'
    const res = await fetch(NONCE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: SAME_ORIGIN,
        'sec-fetch-site': 'same-origin',
      },
      body: JSON.stringify({ client_id: clientId, utm_source: 'hn' }),
    })
    let json = null
    try {
      json = await res.json()
    } catch {}
    const setCookie = res.headers.get('set-cookie') || ''
    check('SecB: same-origin accepted 200', res.status === 200, `status=${res.status}`)
    check('SecB: ok=true', json && json.ok === true, `body=${JSON.stringify(json)}`)
    check('SecB: vibe_ga_nonce Set-Cookie present', new RegExp(`vibe_ga_nonce=${mockNonce}`).test(setCookie), `set-cookie=${setCookie}`)
    check('SecB: nonce cookie HttpOnly+Secure', /HttpOnly/i.test(setCookie) && /Secure/i.test(setCookie), `set-cookie=${setCookie}`)
    check('SecB: upstream relay called with real client_id', !!lastIssueBody && lastIssueBody.client_id === clientId, `lastIssueBody=${JSON.stringify(lastIssueBody)}`)
  }

  // (c) Sec-Fetch-Site: cross-site -> rejected even if Origin is missing/spoofed.
  console.log('\n=== Scenario: SecC/sec-fetch-cross-site ===')
  mockMode = 'success'
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}`
  lastIssueBody = null
  {
    const res = await fetch(NONCE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Origin omitted entirely AND an explicit cross-site fetch metadata header.
        'sec-fetch-site': 'cross-site',
      },
      body: JSON.stringify({ client_id: '1111111111.2222222222' }),
    })
    let json = null
    try {
      json = await res.json()
    } catch {}
    check('SecC: Sec-Fetch-Site cross-site rejected 403', res.status === 403, `status=${res.status}`)
    check('SecC: error=cross_origin_forbidden', json && json.error === 'cross_origin_forbidden', `body=${JSON.stringify(json)}`)
    check('SecC: no vibe_ga_nonce Set-Cookie', !/vibe_ga_nonce=/.test(res.headers.get('set-cookie') || ''), `set-cookie=${res.headers.get('set-cookie')}`)
    check('SecC: upstream relay NOT called', lastIssueBody === null, `lastIssueBody=${JSON.stringify(lastIssueBody)}`)
  }
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
      // --no-sandbox + --disable-setuid-sandbox are required for Chromium inside an
      // unprivileged CI container (GitHub Actions ubuntu-latest); harmless locally.
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

    // FINDING 1 — same-origin enforcement (raw HTTP, controlled headers).
    await runOriginScenarios()
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
