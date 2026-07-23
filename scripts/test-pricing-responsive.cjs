/**
 * Real-browser (Puppeteer + real Chromium) rendered/responsive check for the
 * /pricing route.
 *
 * Unlike scripts/test-pricing-value-clarity.js (which only greps the source
 * strings), this test actually builds no assumptions about render: it spawns
 * the production `next start` server, drives real Chromium, and asserts — at
 * three viewports (mobile / tablet / desktop) — that:
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
 * Harness (server spawn / waitForServer / check() / Results / RESULT / exit)
 * mirrors scripts/test-install-nonce.cjs. Assumes the app is already built
 * (`npm run build`). Spawns `next start` itself.
 *
 * Usage:  node scripts/test-pricing-responsive.cjs
 */

const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')
// Distinct default port from test-install-nonce.cjs (3123) to avoid collisions
// if the two scripts ever run concurrently locally.
const NEXT_PORT = Number(process.env.TEST_NEXT_PORT || 3134)
const BASE = `http://localhost:${NEXT_PORT}`
const PRICING_URL = `${BASE}/pricing`

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

async function runViewport(browser, vp) {
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
    await page.goto(PRICING_URL, { waitUntil: 'networkidle2', timeout: 60000 })

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

;(async () => {
  const server = spawn('npx', ['next', 'start', '-p', String(NEXT_PORT)], {
    cwd: REPO_ROOT,
    env: { ...process.env },
    stdio: ['ignore', 'inherit', 'inherit'],
  })

  let browser
  try {
    await waitForServer(`${BASE}/`, 60000)
    console.log(`[next] ready on ${BASE}`)

    browser = await puppeteer.launch({
      headless: true,
      // --no-sandbox + --disable-setuid-sandbox are required for Chromium inside
      // an unprivileged CI container (GitHub Actions ubuntu-latest); harmless locally.
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    })

    for (const vp of VIEWPORTS) {
      await runViewport(browser, vp)
    }
  } catch (err) {
    console.error('FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: 'harness', ok: false, detail: String(err) })
  } finally {
    if (browser) await browser.close().catch(() => {})
    try {
      server.kill('SIGTERM')
    } catch {}
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
