/**
 * Real-browser (Puppeteer + real Chromium) rendered/responsive check for the
 * /pricing route.
 *
 * Unlike scripts/test-pricing-value-clarity.js (which only greps the source
 * strings), this test actually builds no assumptions about render: it spawns
 * the production Next server, drives real Chromium, and asserts — at three
 * viewports (mobile / tablet / desktop) — that:
 *   1. There is no horizontal overflow (documentElement + body scrollWidth
 *      <= innerWidth), reusing the overflow-detection logic from
 *      scripts/test-mobile-layout.cjs.
 *   2. All three per-tier cloud-AI usage-cap lines are present, not hidden,
 *      have a non-zero bounding box, AND are reachable by scrolling into view.
 *   3. The Chrome Web Store trust link is present, visible, and its href
 *      contains the real extension id (djodpgokbmobeclicaicnnidccoinado).
 *   4. The footnote's distinctive "not on a rolling window from your signup
 *      or billing date" copy is present and visible.
 *
 * TEST-INTEGRITY HARDENING (why this file looks the way it does)
 * --------------------------------------------------------------
 * A prior version copied test-install-nonce.cjs's harness and inherited a
 * serious false-pass bug: it spawned the server via `spawn('npx', ['next',
 * 'start', ...])` and on cleanup did `server.kill('SIGTERM')`. That only kills
 * the `npx` wrapper, leaving the real `next-server` process orphaned and still
 * LISTENING on the fixed port. Because `waitForServer` returned true on ANY
 * non-crashing HTTP status (`r.status > 0`) without checking that ITS OWN child
 * was alive or that the response came from the server it started, a second run
 * would silently attach to the stale first-run orphan and report a full PASS
 * against a dead build. This rewrite closes that hole:
 *   - Spawns the REAL Next binary directly (node_modules/.bin/next), not npx,
 *     `detached: true` so it leads its own process group; cleanup group-kills
 *     via `process.kill(-pid, SIGTERM)` (then SIGKILL escalation), so Next's
 *     own next-server worker dies too — no orphan, no leaked port.
 *   - PORT PREFLIGHT: binds a throwaway net server to pick a genuinely-free
 *     port (starting at the default, moving up on EADDRINUSE). The invocation
 *     can never silently reuse a stale/foreign server squatting on the default
 *     port; the resolved port is threaded through the whole run.
 *   - FAIL-FAST: `error`/`exit` listeners race the readiness poll, so a crashed
 *     or never-started child fails immediately with a clear message.
 *   - CONTENT-VERIFIED READINESS: readiness requires /pricing to actually
 *     return real page content ("Cloud AI usage cap:"), not just any status.
 *   - POST-RUN LISTENER CHECK: after cleanup, a preflight-bind confirms the
 *     port is released; this is a counted check() (a broken cleanup FAILs).
 *   - DETERMINISTIC SELF-TEST: before the viewport checks, a plain-http decoy
 *     squats on the default port; the same start-and-wait logic must move to a
 *     different port, serve real (non-decoy) content, leave the decoy intact,
 *     and release its own port afterwards — all counted in the final tally, so
 *     any future regression FAILs the script rather than logging a warning.
 *
 * Everything is bound to 127.0.0.1 (IPv4 loopback) so the preflight bind, the
 * decoy, and `fetch`/Chromium never disagree about how `localhost` resolves
 * (some hosts map `localhost` only to ::1).
 *
 * Assumes the app is already built (`npm run build`). Spawns the Next server
 * itself. Runs unconditionally with no flags/args (wired into CI as-is).
 *
 * Usage:  node scripts/test-pricing-responsive.cjs
 */

const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const path = require('path')
const net = require('net')
const http = require('http')

const REPO_ROOT = path.resolve(__dirname, '..')
// Spawn the REAL Next binary (not `npx`) so we own a killable, group-leader
// process. It's a Node script with a shebang and is marked executable by
// `npm ci`, so it can be spawned directly.
const NEXT_BIN = path.resolve(REPO_ROOT, 'node_modules/.bin/next')
// Pin everything to IPv4 loopback so the preflight bind, the decoy, Next, and
// fetch/Chromium never disagree over how `localhost` resolves (::1 vs 127.0.0.1).
const HOST = '127.0.0.1'
// Preferred base port. The ACTUAL port is resolved at runtime via a free-port
// preflight (see startNextServer) so a stale/foreign listener on this port can
// never be silently mistaken for a server THIS invocation started.
const DEFAULT_BASE_PORT = Number(process.env.TEST_NEXT_PORT || 3134)
// Real page content that must appear in a genuine /pricing response; used as the
// readiness gate — a bare HTTP status is NOT enough (see waitForReady).
const READINESS_MARKER = 'Cloud AI usage cap:'
// Obviously-fake body served by the self-test decoy squatting on the default port.
const DECOY_MARKER = 'DECOY-SERVER-MARKER-DO-NOT-MATCH'

const CWS_EXTENSION_ID = 'djodpgokbmobeclicaicnnidccoinado'
const CWS_HREF_SELECTOR =
  'a[href*="chromewebstore.google.com/detail/vibe-ai-browser-co-pilot"]'

const BUDGET_CAP_LINES = [
  'Cloud AI usage cap: $1/day',
  'Cloud AI usage cap: $25/mo',
  'Cloud AI usage cap: $99/mo',
]

const FOOTNOTE_SUBSTRING = 'not on a rolling window from your signup or billing date'

const VIEWPORTS = [
  { label: 'mobile', width: 375, height: 667, isMobile: true, hasTouch: true },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1440, height: 900 },
]

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

const results = []
function check(name, cond, detail) {
  const ok = !!cond
  results.push({ name, ok, detail })
  console.log(`  ${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? `  [${detail}]` : ''}`)
}

// True if `port` can be bound on HOST right now (i.e. nothing is listening).
// Used BOTH to pick a genuinely-free port before spawning AND to confirm the
// port is released after cleanup.
function isPortFree(port) {
  return new Promise((resolve) => {
    const probe = net.createServer()
    probe.once('error', () => resolve(false))
    probe.once('listening', () => probe.close(() => resolve(true)))
    probe.listen(port, HOST)
  })
}

// Find the first free port at/after startPort (bounded), so this invocation can
// never attach to a pre-existing/stale server squatting on the default port.
async function findFreePort(startPort, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i
    if (await isPortFree(port)) return port
  }
  throw new Error(
    `no free port in range ${startPort}..${startPort + maxAttempts - 1}`
  )
}

// Poll until /pricing returns REAL content (not merely any HTTP status), racing
// against `exitPromise` so a crashed/never-started child fails fast with a clear
// error instead of grinding the full timeout or masking a stale server as ready.
async function waitForReady(pricingUrl, timeoutMs, exitPromise) {
  const deadline = Date.now() + timeoutMs
  const poll = (async () => {
    while (Date.now() < deadline) {
      try {
        const r = await fetch(pricingUrl)
        if (r.ok) {
          const body = await r.text()
          if (body.includes(READINESS_MARKER)) return true
        }
      } catch {}
      await sleep(300)
    }
    throw new Error(
      `server not ready (no "${READINESS_MARKER}" from ${pricingUrl})`
    )
  })()
  return Promise.race([poll, exitPromise])
}

// Kill the WHOLE process group (negative pid) of a `detached` child, so Next's
// own next-server worker dies too — not just a wrapper. SIGTERM, short grace,
// then escalate to SIGKILL. ESRCH (already dead) is fine.
async function killServer(server) {
  if (!server || server.pid == null) return
  const pid = server.pid
  const groupAlive = () => {
    try {
      process.kill(-pid, 0)
      return true
    } catch {
      return false
    }
  }
  try {
    process.kill(-pid, 'SIGTERM')
  } catch {}
  const graceDeadline = Date.now() + 2000
  while (Date.now() < graceDeadline && groupAlive()) await sleep(100)
  if (groupAlive()) {
    try {
      process.kill(-pid, 'SIGKILL')
    } catch {}
    const killDeadline = Date.now() + 2000
    while (Date.now() < killDeadline && groupAlive()) await sleep(100)
  }
}

// Confirm nothing is listening on `port` anymore (defensive: allow the OS a
// brief moment to release it after the kill).
async function verifyPortReleased(port) {
  for (let i = 0; i < 15; i++) {
    if (await isPortFree(port)) return true
    await sleep(200)
  }
  return false
}

// Resolve a free port at/after startPort, spawn the REAL Next binary detached
// (its own process group), fail fast if it errors/exits before serving real
// content, and return the live handle. Caller MUST killServer() in a finally.
async function startNextServer(startPort) {
  const port = await findFreePort(startPort, 10)
  const base = `http://${HOST}:${port}`
  const pricingUrl = `${base}/pricing`

  const server = spawn(NEXT_BIN, ['start', '-p', String(port), '-H', HOST], {
    cwd: REPO_ROOT,
    env: { ...process.env },
    stdio: ['ignore', 'inherit', 'inherit'],
    detached: true,
  })

  const exitPromise = new Promise((_, reject) => {
    server.on('error', (err) => {
      reject(new Error(`next failed to spawn: ${err.message}`))
    })
    server.on('exit', (code, signal) => {
      reject(
        new Error(`next exited before ready (code=${code} signal=${signal})`)
      )
    })
  })
  // Swallow late/expected exits (e.g. during cleanup) so they never surface as an
  // unhandled rejection; waitForReady's Promise.race still observes an EARLY exit
  // independently via its own handler on the same promise.
  exitPromise.catch(() => {})

  try {
    await waitForReady(pricingUrl, 60000, exitPromise)
  } catch (err) {
    await killServer(server)
    throw err
  }

  return { server, port, base, pricingUrl }
}

// Plain Node http server that always answers with the decoy marker — simulates a
// stale/foreign process squatting on the default port for the deterministic
// self-test.
function startDecoy(port) {
  return new Promise((resolve, reject) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(DECOY_MARKER)
    })
    srv.once('error', reject)
    srv.listen(port, HOST, () => resolve(srv))
  })
}

// Overflow detection reused from scripts/test-mobile-layout.cjs.
function detectOverflow() {
  return {
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
  }
}

// Locate the first element whose OWN text (not merely a descendant's) contains
// `needle`, then report visibility + geometry. We prefer the deepest matching
// element so getBoundingClientRect reflects the text node, not a huge wrapper.
function inspectText(needle) {
  const all = Array.from(document.querySelectorAll('body *'))
  let match = null
  for (const el of all) {
    if (!el.textContent || !el.textContent.includes(needle)) continue
    // Prefer an element none of whose children individually contain the needle
    // (i.e. the tightest wrapper around the text).
    const childHas = Array.from(el.children).some(
      (c) => c.textContent && c.textContent.includes(needle)
    )
    if (!childHas) {
      match = el
      break
    }
    match = el // fallback: keep last ancestor if no tighter child found
  }
  if (!match) return { found: false }
  const cs = getComputedStyle(match)
  const rect = match.getBoundingClientRect()
  return {
    found: true,
    display: cs.display,
    visibility: cs.visibility,
    width: rect.width,
    height: rect.height,
  }
}

// Scroll the tightest element containing `needle` into view, then report
// whether its rect intersects the current viewport (proving it's reachable by
// a real user at this breakpoint, not just present in the DOM).
function scrollIntoViewAndCheck(needle) {
  const all = Array.from(document.querySelectorAll('body *'))
  let match = null
  for (const el of all) {
    if (!el.textContent || !el.textContent.includes(needle)) continue
    const childHas = Array.from(el.children).some(
      (c) => c.textContent && c.textContent.includes(needle)
    )
    if (!childHas) {
      match = el
      break
    }
    match = el
  }
  if (!match) return { found: false }
  match.scrollIntoView({ block: 'center', inline: 'nearest' })
  const rect = match.getBoundingClientRect()
  const intersects =
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth &&
    rect.width > 0 &&
    rect.height > 0
  return { found: true, intersects, top: Math.round(rect.top), bottom: Math.round(rect.bottom) }
}

async function runViewport(browser, pricingUrl, vp) {
  console.log(`\n=== Viewport: ${vp.label} (${vp.width}x${vp.height}) ===`)
  const context = await browser.createBrowserContext()
  const page = await context.newPage()
  try {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.hasTouch,
    })
    await page.goto(pricingUrl, { waitUntil: 'networkidle2', timeout: 60000 })

    // 1. No horizontal overflow.
    const ov = await page.evaluate(detectOverflow)
    check(
      `[${vp.label}] no horizontal overflow (documentElement)`,
      ov.docScrollWidth <= ov.innerWidth,
      `scrollWidth=${ov.docScrollWidth} innerWidth=${ov.innerWidth}`
    )
    check(
      `[${vp.label}] no horizontal overflow (body)`,
      ov.bodyScrollWidth <= ov.innerWidth,
      `scrollWidth=${ov.bodyScrollWidth} innerWidth=${ov.innerWidth}`
    )

    // 2. Each budget-cap line present, visible, and scrollable into view.
    for (const line of BUDGET_CAP_LINES) {
      const info = await page.evaluate(inspectText, line)
      check(
        `[${vp.label}] budget-cap line present & rendered: "${line}"`,
        info.found &&
          info.display !== 'none' &&
          info.visibility !== 'hidden' &&
          info.width > 0 &&
          info.height > 0,
        info.found
          ? `display=${info.display} visibility=${info.visibility} w=${Math.round(
              info.width
            )} h=${Math.round(info.height)}`
          : 'not found'
      )
      const sv = await page.evaluate(scrollIntoViewAndCheck, line)
      check(
        `[${vp.label}] budget-cap line scrollable into view: "${line}"`,
        sv.found && sv.intersects,
        sv.found ? `top=${sv.top} bottom=${sv.bottom}` : 'not found'
      )
    }

    // 3. CWS trust link present, visible, correct href.
    const cws = await page.evaluate((sel, extId) => {
      const el = document.querySelector(sel)
      if (!el) return { found: false }
      const cs = getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      const href = el.getAttribute('href') || ''
      el.scrollIntoView({ block: 'center' })
      const rect2 = el.getBoundingClientRect()
      const intersects =
        rect2.bottom > 0 &&
        rect2.top < window.innerHeight &&
        rect2.right > 0 &&
        rect2.left < window.innerWidth
      return {
        found: true,
        display: cs.display,
        visibility: cs.visibility,
        width: rect.width,
        height: rect.height,
        hasExtId: href.includes(extId),
        intersects,
      }
    }, CWS_HREF_SELECTOR, CWS_EXTENSION_ID)
    check(
      `[${vp.label}] CWS trust link present, visible & has extension id`,
      cws.found &&
        cws.display !== 'none' &&
        cws.visibility !== 'hidden' &&
        cws.width > 0 &&
        cws.height > 0 &&
        cws.hasExtId &&
        cws.intersects,
      cws.found
        ? `display=${cws.display} w=${Math.round(cws.width)} h=${Math.round(
            cws.height
          )} extId=${cws.hasExtId} intersects=${cws.intersects}`
        : 'not found'
    )

    // 4. Footnote distinctive copy present & visible.
    const foot = await page.evaluate(inspectText, FOOTNOTE_SUBSTRING)
    check(
      `[${vp.label}] footnote copy present & rendered`,
      foot.found &&
        foot.display !== 'none' &&
        foot.visibility !== 'hidden' &&
        foot.width > 0 &&
        foot.height > 0,
      foot.found
        ? `display=${foot.display} visibility=${foot.visibility} w=${Math.round(
            foot.width
          )} h=${Math.round(foot.height)}`
        : 'not found'
    )
  } finally {
    await context.close().catch(() => {})
  }
}

async function runSelfTest() {
  console.log('\n=== Self-test: stale-server false-pass prevention ===')
  const decoyPort = DEFAULT_BASE_PORT
  let decoy = null
  let srv = null
  try {
    decoy = await startDecoy(decoyPort)
    check(
      `[self-test] decoy occupies default port ${decoyPort}`,
      !(await isPortFree(decoyPort)),
      `port ${decoyPort} busy`
    )

    // Run the SAME start-and-wait logic the real test uses, aimed at the SAME
    // default port the decoy squats on.
    srv = await startNextServer(decoyPort)

    // a. Preflight must have moved off the occupied port (no stale reuse).
    check(
      `[self-test] preflight moved off occupied port ${decoyPort}`,
      srv.port !== decoyPort,
      `decoyPort=${decoyPort} resolvedPort=${srv.port}`
    )

    // b. The resolved server serves REAL content, never the decoy marker.
    const realBody = await (await fetch(srv.pricingUrl)).text()
    check(
      `[self-test] resolved port ${srv.port} serves real /pricing content, not decoy`,
      realBody.includes(READINESS_MARKER) && !realBody.includes(DECOY_MARKER),
      `hasReal=${realBody.includes(READINESS_MARKER)} hasDecoy=${realBody.includes(
        DECOY_MARKER
      )}`
    )

    // c. The decoy is untouched and still serves its own marker (isolation).
    const decoyBody = await (await fetch(`http://${HOST}:${decoyPort}/`)).text()
    check(
      `[self-test] decoy on ${decoyPort} unaffected & still serves decoy marker`,
      decoyBody.includes(DECOY_MARKER),
      `body="${decoyBody.slice(0, 40)}"`
    )
  } finally {
    if (srv) {
      await killServer(srv.server)
      const released = await verifyPortReleased(srv.port)
      check(
        `[self-test] port ${srv.port} released after run`,
        released,
        released ? 'bind ok' : 'still listening'
      )
    }
    if (decoy) await new Promise((res) => decoy.close(() => res()))
  }
}

;(async () => {
  // 1. Deterministic proof that a stale server on the default port can no longer
  //    be mistaken for one THIS invocation started.
  try {
    await runSelfTest()
  } catch (err) {
    console.error('SELF-TEST FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: '[self-test] harness', ok: false, detail: String(err) })
  }

  // 2. Real-browser responsive checks against a fresh server we own.
  let main = null
  let browser
  try {
    main = await startNextServer(DEFAULT_BASE_PORT)
    console.log(`[next] ready on ${main.base} (resolved port ${main.port})`)

    browser = await puppeteer.launch({
      headless: true,
      // --no-sandbox + --disable-setuid-sandbox are required for Chromium inside
      // an unprivileged CI container (GitHub Actions ubuntu-latest); harmless locally.
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    })

    for (const vp of VIEWPORTS) {
      await runViewport(browser, main.pricingUrl, vp)
    }
  } catch (err) {
    console.error('FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: 'harness', ok: false, detail: String(err) })
  } finally {
    if (browser) await browser.close().catch(() => {})
    if (main) {
      await killServer(main.server)
      const released = await verifyPortReleased(main.port)
      check(
        `port ${main.port} released after run`,
        released,
        released ? 'bind ok' : 'still listening'
      )
    }
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
