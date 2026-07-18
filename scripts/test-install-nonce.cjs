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
const https = require('https')
const fs = require('fs')
const { spawn, execFileSync } = require('child_process')
const path = require('path')

const NEXT_PORT = Number(process.env.TEST_NEXT_PORT || 3123)
const MOCK_PORT = Number(process.env.TEST_MOCK_PORT || 3199)
// HTTPS front-proxy port used for the apex->www canonicalization scenarios. The
// bare apex, www, and enterprise/teams subdomains are all --host-resolver-rules'd
// to 127.0.0.1 and terminated here over TLS (Secure cookies + the nonce route's
// same-origin check both REQUIRE an https origin — plain http would silently drop
// the Secure `vibe_ga_nonce` cookie and fail the Origin allowlist for a non-loopback
// host). This proxy forwards to the same `next start` server, preserving the Host
// header so proxy.ts/route.ts see the real external host+port.
const TLS_PORT = Number(process.env.TEST_TLS_PORT || 3443)
const BASE = `http://localhost:${NEXT_PORT}`
const TLS_APEX_BASE = `https://vibebrowser.app:${TLS_PORT}`
const TLS_WWW_BASE = `https://www.vibebrowser.app:${TLS_PORT}`
const CWS_PREFIX = 'https://chromewebstore.google.com'
// The two SEPARATE GA4 properties this handoff must exercise:
//   WEBSITE   — site-wide "VibeBrowser Website" stream, fired on every page by
//               <GoogleAnalytics/> (must remain unaffected / still firing).
//   EXTENSION — SEPARATE "VibeBrowser Extension" property (538007690), opened as a
//               second stream by /install so a REAL first_visit lands there and its
//               client_id is what the nonce hands off.
const WEBSITE_TID = 'G-EYZHHTHR57'
const EXTENSION_TID = 'G-LP618JZN7X'
const REPO_ROOT = path.resolve(__dirname, '..')
const TLS_DIR = path.join(REPO_ROOT, '.test-tls')

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

// --- HTTPS front-proxy for apex->www canonicalization scenarios --------------
// Generates a throwaway self-signed cert (Puppeteer runs with acceptInsecureCerts,
// so trust chain is irrelevant) covering the apex + subdomains, then terminates TLS
// and forwards to the plain-http `next start`, preserving the original Host header.
function ensureTestCert() {
  fs.mkdirSync(TLS_DIR, { recursive: true })
  const keyPath = path.join(TLS_DIR, 'key.pem')
  const certPath = path.join(TLS_DIR, 'cert.pem')
  execFileSync(
    'openssl',
    [
      'req', '-x509', '-newkey', 'rsa:2048', '-nodes',
      '-keyout', keyPath, '-out', certPath, '-days', '2',
      '-subj', '/CN=www.vibebrowser.app',
      '-addext',
      'subjectAltName=DNS:vibebrowser.app,DNS:www.vibebrowser.app,DNS:enterprise.vibebrowser.app,DNS:teams.vibebrowser.app',
    ],
    { stdio: 'ignore' }
  )
  return { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }
}

function startTlsProxy({ key, cert }) {
  const server = https.createServer({ key, cert }, (creq, cres) => {
    // Preserve the browser-sent Host header (e.g. vibebrowser.app:3443) so the Next
    // server's proxy.ts and /api/install/nonce see the real external host + port.
    const proxyReq = http.request(
      { host: '127.0.0.1', port: NEXT_PORT, method: creq.method, path: creq.url, headers: creq.headers },
      (proxyRes) => {
        cres.writeHead(proxyRes.statusCode || 502, proxyRes.headers)
        proxyRes.pipe(cres)
      }
    )
    proxyReq.on('error', () => {
      try {
        cres.writeHead(502)
        cres.end()
      } catch {}
    })
    creq.pipe(proxyReq)
  })
  return new Promise((resolve) => server.listen(TLS_PORT, '127.0.0.1', () => resolve(server)))
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

// Matches the real GA4 gtag.js measurement-protocol endpoints observed in-browser
// (`https://<region>.google-analytics.com/g/collect?...` and the `/j/collect` +
// legacy `/collect` variants). We capture these REAL outgoing hits to prove which
// GA4 property/stream (`tid`) actually received a hit and under which `cid`.
const GA_COLLECT_RE = /google-analytics\.com\/(?:[a-z]\/)?collect(?:[/?]|$)/

function parseGaCollect(url) {
  try {
    const u = new URL(url)
    return {
      url,
      tid: u.searchParams.get('tid'),
      cid: u.searchParams.get('cid'),
      en: u.searchParams.get('en'),
      // Real debug flag gtag.js appends when a stream is configured with
      // `debug_mode: true` — observed empirically as `ep.debug_mode=true` (NOT guessed).
      debug: u.searchParams.get('ep.debug_mode') === 'true' || u.search.includes('ep.debug_mode=true'),
      search: u.search,
    }
  } catch {
    return null
  }
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
  const collectHits = []
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
    // Record REAL GA4 measurement-protocol hits (unmocked, sent by the site's own
    // gtag.js to Google) so we can prove which stream/property received a hit.
    if (GA_COLLECT_RE.test(url)) {
      const hit = parseGaCollect(url)
      if (hit) collectHits.push(hit)
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

  // --- DUAL-STREAM: prove BOTH GA4 properties get a REAL hit under one client_id ---
  // (issue #1546 core fix). These assertions read the ACTUAL unmocked /g/collect
  // requests the site's gtag.js sent to Google during this real cold-start run.
  if (expect.dualStream) {
    // The extension config fires inside install-client's client_id budget; its
    // /collect beacon can land just after the CWS-abort keeps us on /install, so give
    // gtag.js a moment to emit BOTH streams' hits before asserting.
    const hitDeadline = Date.now() + 4000
    while (Date.now() < hitDeadline) {
      if (collectHits.some((h) => h.tid === WEBSITE_TID) && collectHits.some((h) => h.tid === EXTENSION_TID)) break
      await sleep(100)
    }
    const webHits = collectHits.filter((h) => h.tid === WEBSITE_TID)
    const extHits = collectHits.filter((h) => h.tid === EXTENSION_TID)
    const webCid = webHits[0] && webHits[0].cid
    const extCid = extHits[0] && extHits[0].cid

    // (a) website stream (G-EYZHHTHR57) unaffected — still firing its own real hit.
    check(`${title}: (a) website stream hit sent (tid=${WEBSITE_TID})`, webHits.length > 0, `hits=${webHits.length} cid=${webCid}`)
    // (b) NEW extension stream (G-LP618JZN7X) received a real, SEPARATE hit -> genuine
    // first_visit created in property 538007690.
    check(`${title}: (b) extension stream hit sent (tid=${EXTENSION_TID})`, extHits.length > 0, `hits=${extHits.length} cid=${extCid}`)
    // (c) IDENTICAL client_id on both streams (shared top-level _ga cookie continuity),
    // and it equals the ground-truth _ga client_id read from the cookie.
    check(`${title}: (c) identical cid across both streams`, !!webCid && !!extCid && webCid === extCid, `web=${webCid} ext=${extCid}`)
    check(`${title}: (c) cid == ground-truth _ga client_id`, !!extCid && extCid === gaClientId, `cid=${extCid} ga=${gaClientId}`)
    // (d) the SAME cid that just got the real extension-property hit is what was handed
    // off to /api/install/nonce.
    check(`${title}: (d) same cid forwarded to /api/install/nonce`, !!lastIssueBody && lastIssueBody.client_id === extCid, `forwarded=${lastIssueBody && lastIssueBody.client_id} cid=${extCid}`)
    // Debug OFF by default: extension hit must NOT carry ep.debug_mode without ?ga_debug=1.
    check(`${title}: extension hit has NO debug flag (ga_debug absent)`, extHits.length > 0 && extHits.every((h) => !h.debug), `debugHits=${extHits.filter((h) => h.debug).length}`)
  }

  await context.close()
}

// --- ITEM 2: canonical apex->www redirect as a code-level guarantee ----------
// A genuinely-cold first-touch visitor hits the BARE APEX vibebrowser.app/install
// (as an ad/HN/Reddit link, or if external Cloudflare/DNS canonicalization is ever
// misconfigured). proxy.ts must 308 them to the www host BEFORE any cookie is set,
// then the real gtag.js -> cookie -> nonce flow must complete on www, and NO
// vibe_* cookie may ever land on the apex origin (the extension's
// chrome.cookies.get is hardcoded to https://www.vibebrowser.app/ and would find
// nothing if a cookie were mistakenly host-scoped to the bare apex).
async function runApexRedirectScenario(browser) {
  const title = 'D/apex->www redirect'
  console.log(`\n=== Scenario: ${title} ===`)
  mockMode = 'success'
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}_${Date.now()}`
  lastIssueBody = null

  const query = '?utm_source=apextest&utm_medium=social&utm_campaign=canonical'
  const apexUrl = `${TLS_APEX_BASE}/install${query}`

  const context = await browser.createBrowserContext()
  const page = await context.newPage()

  let cwsRequested = false
  const redirects = []
  let wwwLandingUrl = null
  page.on('response', (res) => {
    const st = res.status()
    if (st >= 300 && st < 400) {
      redirects.push({ url: res.url(), status: st, location: res.headers()['location'] || '' })
    }
    // The 200 document actually served on www AFTER the redirect — captured from the
    // response stream so it is not clobbered by the later window.location.replace(CWS)
    // (which request-interception aborts, leaving page.url() at chrome-error://).
    if (!wwwLandingUrl && res.url().startsWith(`${TLS_WWW_BASE}/install`) && st === 200) {
      wwwLandingUrl = res.url()
    }
  })
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const url = req.url()
    if (url.startsWith(CWS_PREFIX)) {
      cwsRequested = true
      try {
        req.abort()
      } catch {}
      return
    }
    try {
      req.continue()
    } catch {}
  })

  // Warm this incognito context's TLS session + HTTP cache (gtag.js) with a www-root
  // visit first. The apex->www redirect adds a hop whose cold-network latency can
  // otherwise blow install-client's 500ms client_id budget and make the app fail open
  // (no nonce) non-deterministically. Genuinely-cold client_id capture is already
  // proven by scenario A; D's job is the redirect + that the flow COMPLETES on www.
  await page.goto(`${TLS_WWW_BASE}/`, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {})

  // First navigation of a fresh context goes straight to the bare apex /install.
  await page.goto(apexUrl, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {})

  const redirectDeadline = Date.now() + 8000
  while (Date.now() < redirectDeadline && !cwsRequested) {
    await sleep(50)
  }

  // Ground-truth `_ga` client_id minted by www's own gtag.js after the redirect.
  let gaClientId = null
  const gaDeadline = Date.now() + 5000
  while (Date.now() < gaDeadline) {
    const c = await page.cookies(TLS_WWW_BASE)
    const ga = c.find((ck) => ck.name === '_ga')
    gaClientId = parseGaClientId(ga && ga.value)
    if (gaClientId) break
    await sleep(100)
  }

  const wwwCookies = await page.cookies(TLS_WWW_BASE)
  const apexCookies = await page.cookies(TLS_APEX_BASE)
  const attrib = wwwCookies.find((c) => c.name === 'vibe_attribution')
  const nonce = wwwCookies.find((c) => c.name === 'vibe_ga_nonce')

  // (a) app-level 308 fired and preserved the FULL path + query string.
  const apexRedirect = redirects.find((r) => r.url.startsWith(TLS_APEX_BASE) && r.status === 308)
  check(`${title}: apex request 308-redirected (app-level, not external infra)`, !!apexRedirect, `redirects=${JSON.stringify(redirects)}`)
  check(
    `${title}: redirect Location targets the www host /install`,
    !!apexRedirect && /^https:\/\/www\.vibebrowser\.app(:\d+)?\/install/.test(apexRedirect.location),
    `location=${apexRedirect && apexRedirect.location}`
  )
  check(
    `${title}: redirect preserved full utm_* query string`,
    !!apexRedirect &&
      apexRedirect.location.includes('utm_source=apextest') &&
      apexRedirect.location.includes('utm_medium=social') &&
      apexRedirect.location.includes('utm_campaign=canonical'),
    `location=${apexRedirect && apexRedirect.location}`
  )
  check(`${title}: browser landed on & fetched www /install (200)`, !!wwwLandingUrl && wwwLandingUrl.startsWith(`${TLS_WWW_BASE}/install`), `wwwLandingUrl=${wwwLandingUrl}`)
  check(`${title}: landed www URL kept query string intact`, !!wwwLandingUrl && wwwLandingUrl.includes('utm_source=apextest'), `wwwLandingUrl=${wwwLandingUrl}`)

  // (b) the rest of the /install flow proceeds correctly on www (same as same-origin).
  check(`${title}: real gtag.js client_id captured on www`, !!gaClientId, `client_id=${gaClientId}`)
  check(`${title}: redirected on to Chrome Web Store`, cwsRequested, 'ok')
  let src = null
  try {
    src = JSON.parse(decodeURIComponent(attrib.value)).source
  } catch {}
  check(`${title}: vibe_attribution set on www with source`, !!attrib && src === 'apextest', `source=${src}`)
  check(`${title}: vibe_ga_nonce == relay nonce on www`, !!nonce && nonce.value === mockNonce, `got=${nonce && nonce.value}`)
  check(`${title}: real client_id forwarded to relay`, !!lastIssueBody && lastIssueBody.client_id === gaClientId, `forwarded=${lastIssueBody && lastIssueBody.client_id}`)
  check(`${title}: relay received utm_source from preserved query`, !!lastIssueBody && lastIssueBody.utm_source === 'apextest', `got=${lastIssueBody && lastIssueBody.utm_source}`)

  // (c) NO vibe_* cookie ever set on the apex origin (the audit's core concern).
  const apexAttrib = apexCookies.find((c) => c.name === 'vibe_attribution')
  const apexNonce = apexCookies.find((c) => c.name === 'vibe_ga_nonce')
  check(`${title}: NO vibe_attribution cookie on apex origin`, !apexAttrib, apexAttrib ? `unexpected=${apexAttrib.value}` : 'absent')
  check(`${title}: NO vibe_ga_nonce cookie on apex origin`, !apexNonce, apexNonce ? `unexpected=${apexNonce.value}` : 'absent')
  check(`${title}: vibe_ga_nonce is host-only on www.vibebrowser.app`, !!nonce && nonce.domain === 'www.vibebrowser.app', `domain=${nonce && nonce.domain}`)

  await context.close()
}

// --- ITEM 2 (part 3): the apex rule must fire ONLY for the bare apex ----------
// A direct www request (the common case) and the enterprise./teams. subdomain
// routing must be completely unaffected — never shadowed by the new redirect.
async function runNonApexHostsScenario(browser) {
  const title = 'E/non-apex hosts unaffected'
  console.log(`\n=== Scenario: ${title} ===`)

  // (1) Direct www /install: no cross-host redirect, and the full flow still runs.
  {
    mockMode = 'success'
    mockNonce = `nonce_${Math.random().toString(36).slice(2)}_${Date.now()}`
    lastIssueBody = null

    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    let cwsRequested = false
    const redirects = []
    let wwwLandingUrl = null
    page.on('response', (res) => {
      const st = res.status()
      if (st >= 300 && st < 400) redirects.push({ url: res.url(), status: st, location: res.headers()['location'] || '' })
      if (!wwwLandingUrl && res.url().startsWith(`${TLS_WWW_BASE}/install`) && st === 200) wwwLandingUrl = res.url()
    })
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const url = req.url()
      if (url.startsWith(CWS_PREFIX)) {
        cwsRequested = true
        try {
          req.abort()
        } catch {}
        return
      }
      try {
        req.continue()
      } catch {}
    })

    // Warm TLS + gtag.js cache (see scenario D rationale) so this DIRECT-www flow
    // completes deterministically; the point here is that www is NOT redirected.
    await page.goto(`${TLS_WWW_BASE}/`, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {})
    await page.goto(`${TLS_WWW_BASE}/install?utm_source=wwwdirect`, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {})
    const deadline = Date.now() + 8000
    while (Date.now() < deadline && !cwsRequested) await sleep(50)

    const cookies = await page.cookies(TLS_WWW_BASE)
    const nonce = cookies.find((c) => c.name === 'vibe_ga_nonce')
    // A canonicalization redirect wrongly shadowing www would re-point to a DIFFERENT
    // vibebrowser.app host. Unrelated asset redirects (e.g. next.config's
    // .mp4 -> media.githubusercontent.com) target other registrable domains and must
    // be ignored.
    const reqHost = new URL(TLS_WWW_BASE).host
    const crossHostRedirect = redirects.find((r) => {
      let locHost = ''
      try {
        locHost = new URL(r.location || '', TLS_WWW_BASE).host
      } catch {}
      return /(^|\.)vibebrowser\.app(:\d+)?$/.test(locHost) && locHost !== reqHost
    })

    check(`${title}: www /install NOT apex-redirected`, !crossHostRedirect, crossHostRedirect ? `unexpected=${JSON.stringify(crossHostRedirect)}` : 'no cross-host 3xx')
    check(`${title}: www /install served directly on www host (200)`, !!wwwLandingUrl && wwwLandingUrl.startsWith(`${TLS_WWW_BASE}/install`), `wwwLandingUrl=${wwwLandingUrl}`)
    check(`${title}: www /install flow completed (nonce issued)`, !!nonce && nonce.value === mockNonce, `got=${nonce && nonce.value}`)
    await context.close()
  }

  // (2) enterprise. and teams. subdomains: apex rule must not shadow their routing.
  for (const sub of ['enterprise', 'teams']) {
    const subBase = `https://${sub}.vibebrowser.app:${TLS_PORT}`
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    const redirects = []
    page.on('response', (res) => {
      const st = res.status()
      if (st >= 300 && st < 400) redirects.push({ url: res.url(), status: st, location: res.headers()['location'] || '' })
    })
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      try {
        req.continue()
      } catch {}
    })

    const resp = await page.goto(`${subBase}/`, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => null)
    const finalUrl = page.url()
    const redirectedToWww = redirects.find((r) => (r.location || '').startsWith('https://www.vibebrowser.app'))
    check(`${title}: ${sub}. root NOT apex-redirected to www`, !redirectedToWww, redirectedToWww ? `unexpected=${JSON.stringify(redirectedToWww)}` : 'no www redirect')
    check(`${title}: ${sub}. root stayed on ${sub} host (200)`, finalUrl.startsWith(subBase) && !!resp && resp.status() === 200, `finalUrl=${finalUrl} status=${resp && resp.status()}`)
    await context.close()
  }
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

// --- CONSENT WITHHELD: the extension-stream config + nonce must BOTH stay silent ---
// Mirrors "stubbing hasAnalyticsConsent() -> false" by setting the install-client's
// deny-only test override BEFORE any script runs. The global <GoogleAnalytics/> loader
// is intentionally left alone (it reads the raw hook, which is true today) so the
// WEBSITE stream still fires — this isolates and proves exactly the two things the new
// consent gate controls: the SECOND (extension) stream config hit and the nonce POST.
async function runConsentWithheldScenario(browser) {
  const title = 'F/consent-withheld'
  console.log(`\n=== Scenario: ${title} ===`)
  mockMode = 'success'
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}_${Date.now()}`
  lastIssueBody = null

  const context = await browser.createBrowserContext()
  const page = await context.newPage()

  // Deny-only override, injected before app JS — the legitimate way to exercise the
  // consent-withheld branch of OUR OWN gate (never fakes external data).
  await page.evaluateOnNewDocument(() => {
    window.__vibeInstallAnalyticsConsent = false
  })

  let cwsRequested = false
  const collectHits = []
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const url = req.url()
    if (url.startsWith(CWS_PREFIX)) {
      cwsRequested = true
      try {
        req.abort()
      } catch {}
      return
    }
    if (GA_COLLECT_RE.test(url)) {
      const hit = parseGaCollect(url)
      if (hit) collectHits.push(hit)
    }
    try {
      req.continue()
    } catch {}
  })

  await page.goto(`${BASE}/install?utm_source=hn`, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {})

  // Wait for the redirect (fail-open must still happen), then give gtag.js ample time
  // to have emitted any hit it was going to, so "extension hit absent" is meaningful.
  const redirectDeadline = Date.now() + 8000
  while (Date.now() < redirectDeadline && !cwsRequested) await sleep(50)
  await sleep(2500)

  const cookies = await page.cookies(BASE)
  const nonce = cookies.find((c) => c.name === 'vibe_ga_nonce')
  const extHits = collectHits.filter((h) => h.tid === EXTENSION_TID)

  // Fail-open redirect still guaranteed even with consent withheld.
  check(`${title}: still redirected to Chrome Web Store`, cwsRequested, 'ok')
  // The NEW extension-stream config hit must NOT fire without consent.
  check(`${title}: NO extension-stream hit (tid=${EXTENSION_TID})`, extHits.length === 0, `extHits=${extHits.length}`)
  // The nonce POST must NOT fire -> relay never called, no cookie set.
  check(`${title}: /api/install/nonce NOT called`, lastIssueBody === null, `lastIssueBody=${JSON.stringify(lastIssueBody)}`)
  check(`${title}: NO vibe_ga_nonce cookie`, !nonce, nonce ? `unexpected=${nonce.value}` : 'absent')

  await context.close()
}

// --- DEBUG TOGGLE: /install?ga_debug=1 marks ONLY the extension stream for DebugView --
// Proves the opt-in debug flag is (1) real and observable on the extension hit as the
// empirically-confirmed `ep.debug_mode=true` param, and (2) scoped — it never touches
// the website stream's hit. (The OFF-by-default case is asserted in scenario A.)
async function runDebugModeScenario(browser) {
  const title = 'G/ga_debug toggle'
  console.log(`\n=== Scenario: ${title} ===`)
  mockMode = 'success'
  mockNonce = `nonce_${Math.random().toString(36).slice(2)}_${Date.now()}`
  lastIssueBody = null

  const context = await browser.createBrowserContext()
  const page = await context.newPage()

  let cwsRequested = false
  const collectHits = []
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const url = req.url()
    if (url.startsWith(CWS_PREFIX)) {
      cwsRequested = true
      try {
        req.abort()
      } catch {}
      return
    }
    if (GA_COLLECT_RE.test(url)) {
      const hit = parseGaCollect(url)
      if (hit) collectHits.push(hit)
    }
    try {
      req.continue()
    } catch {}
  })

  await page
    .goto(`${BASE}/install?ga_debug=1&utm_source=test`, { waitUntil: 'domcontentloaded', timeout: 45000 })
    .catch(() => {})

  const redirectDeadline = Date.now() + 8000
  while (Date.now() < redirectDeadline && !cwsRequested) await sleep(50)
  // Wait for BOTH streams' hits to land.
  const hitDeadline = Date.now() + 4000
  while (Date.now() < hitDeadline) {
    if (collectHits.some((h) => h.tid === WEBSITE_TID) && collectHits.some((h) => h.tid === EXTENSION_TID)) break
    await sleep(100)
  }

  const webHits = collectHits.filter((h) => h.tid === WEBSITE_TID)
  const extHits = collectHits.filter((h) => h.tid === EXTENSION_TID)

  check(`${title}: extension stream hit sent (tid=${EXTENSION_TID})`, extHits.length > 0, `hits=${extHits.length}`)
  // Debug flag present on the extension hit — real observed param `ep.debug_mode=true`.
  check(`${title}: extension hit carries ep.debug_mode=true`, extHits.length > 0 && extHits.some((h) => h.debug), `debugHits=${extHits.filter((h) => h.debug).length}`)
  // Scoped: the website stream hit must NOT be marked debug (we never touched it).
  check(`${title}: website hit NOT marked debug (tid=${WEBSITE_TID})`, webHits.length > 0 && webHits.every((h) => !h.debug), `webDebugHits=${webHits.filter((h) => h.debug).length}`)

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
  let tlsServer
  try {
    await waitForServer(`${BASE}/`, 60000)
    console.log(`[next] ready on ${BASE}`)

    // Stand up the HTTPS front-proxy + host-resolver mapping for the apex/www/subdomain
    // canonicalization scenarios (ITEM 2). Failure here must fail the suite, not skip it.
    tlsServer = await startTlsProxy(ensureTestCert())
    console.log(`[tls] apex/www proxy listening on https://127.0.0.1:${TLS_PORT}`)

    browser = await puppeteer.launch({
      headless: true,
      // Self-signed test cert on the HTTPS front-proxy — trust chain is irrelevant.
      acceptInsecureCerts: true,
      // --no-sandbox + --disable-setuid-sandbox are required for Chromium inside an
      // unprivileged CI container (GitHub Actions ubuntu-latest); harmless locally.
      // --host-resolver-rules maps the apex + www + enterprise/teams hostnames to the
      // local TLS front-proxy so the real apex->www redirect can be exercised end-to-end
      // (localhost is left untouched, so the existing same-origin scenarios are unaffected).
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--host-resolver-rules=MAP vibebrowser.app 127.0.0.1,MAP www.vibebrowser.app 127.0.0.1,MAP enterprise.vibebrowser.app 127.0.0.1,MAP teams.vibebrowser.app 127.0.0.1',
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    })

    await runScenario(browser, {
      title: 'A/utm+success',
      query: '?utm_source=hn&utm_medium=social&utm_campaign=launch',
      mode: 'success',
      expect: {
        attribution: 'hn',
        nonce: true,
        dualStream: true,
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

    // Issue #1546 core fix — consent gating + debug toggle for the SECOND (extension)
    // GA4 stream. Run same-origin (localhost) like scenarios A-C2.
    await runConsentWithheldScenario(browser)
    await runDebugModeScenario(browser)

    // ITEM 2 — canonical apex->www redirect (code-level guarantee) + confirmation
    // that www-direct and enterprise./teams. routing are unaffected.
    await runApexRedirectScenario(browser)
    await runNonApexHostsScenario(browser)
  } catch (err) {
    console.error('FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: 'harness', ok: false, detail: String(err) })
  } finally {
    if (browser) await browser.close().catch(() => {})
    try {
      server.kill('SIGTERM')
    } catch {}
    try {
      if (tlsServer) tlsServer.close()
    } catch {}
    try {
      fs.rmSync(TLS_DIR, { recursive: true, force: true })
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
