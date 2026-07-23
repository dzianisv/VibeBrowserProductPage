/**
 * Regression test for the shared `/og/[key]` OG/Twitter image route
 * (app/og/[key]/route.tsx + lib/og-image-designs.tsx), added after an
 * independent review of the Vercel-function-budget hotfix found:
 *
 *   1. `ogImageDesigns[key]` on a plain object literal let prototype-chain
 *      keys (`constructor`, `toString`, `__proto__`, `hasOwnProperty`, ...)
 *      bypass the "unknown key" 404 check (they're truthy own-or-inherited
 *      members) and reach `ImageResponse`, producing a 500 or a meaningless
 *      200. Fixed with `Object.hasOwn(ogImageDesigns, key)`.
 *   2. Without `dynamicParams = false`, an unknown key still 404s but Next
 *      treats it as an ISR candidate and caches that 404 for a year
 *      (`s-maxage=31536000`) instead of a normal, cheaply-invalidated 404.
 *   3. Every route consolidated into the shared endpoint must keep
 *      referencing a REAL key in `lib/og-image-designs.tsx` — a typo'd or
 *      removed key would silently 404 a route's social-preview image in
 *      production with no build-time signal.
 *
 * PART 1 (static, no server): scans app/ and shared/ for every `/og/<key>`
 * string literal (skipping static assets like `/og/home.svg`) and asserts
 * each referenced key exists in ogImageDesigns. A network-free self-test
 * proves this comparison logic actually flags a typo'd/missing key and
 * accepts a matching one, so it cannot pass vacuously.
 *
 * PART 2 (live, spawns `next start`): for every REAL key, asserts `/og/<key>`
 * returns 200, `image/png`, and a valid 1200x630 PNG. For every
 * prototype-chain / obviously-unknown key, asserts EXACTLY 404 (not 500, not
 * 200) and that the response is not year-cached. Reuses the exact
 * detached-process-group server lifecycle (spawn the real `next` binary
 * directly, group-kill on cleanup, verify the port is released afterwards)
 * that scripts/test-pricing-responsive.cjs was hardened with after a prior
 * orphan-server false-pass bug, plus the same decoy-server self-test proving
 * a stale/foreign listener on the default port can't be mistaken for a
 * server this run started.
 *
 * Assumes the app is already built (`npm run build`). Spawns the Next server
 * itself. Usage: node scripts/test-og-image-routing.cjs
 */

const { spawn } = require('child_process')
const path = require('path')
const net = require('net')
const http = require('http')
const fs = require('fs')

const REPO_ROOT = path.resolve(__dirname, '..')
const NEXT_BIN = path.resolve(REPO_ROOT, 'node_modules/.bin/next')
const HOST = '127.0.0.1'
const DEFAULT_BASE_PORT = Number(process.env.TEST_OG_PORT || 3151)
const DECOY_MARKER = 'DECOY-SERVER-MARKER-DO-NOT-MATCH'

// Prototype-chain members that are truthy on `{}` and must never bypass the
// unknown-key 404, plus a couple of plain unknown keys for good measure.
const PROTOTYPE_AND_UNKNOWN_KEYS = [
  'constructor',
  'toString',
  'hasOwnProperty',
  'valueOf',
  '__proto__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'definitely-not-a-real-key-99999',
]

const results = []
function check(name, cond, detail) {
  const ok = !!cond
  results.push({ name, ok, detail })
  console.log(`  ${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? `  [${detail}]` : ''}`)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ---------------------------------------------------------------------------
// PART 1 helpers: static key<->wiring extraction (pure string ops, no I/O
// side effects beyond reading files, so the self-test can exercise the exact
// same functions against synthetic strings).
// ---------------------------------------------------------------------------

// Extracts the set of top-level keys of the `ogImageDesigns` object literal
// from its source text. Matches `  amazon: () => (`, `  'mcp-twitter': () =>`,
// and `  blog: () => renderBlogIndexSocialImage(),` — i.e. any 2-space-indented
// `key: () =>` entry, which is exactly (and only) how top-level entries are
// written in lib/og-image-designs.tsx.
function extractDesignKeys(source) {
  const re = /^ {2}(?:'([^']+)'|([A-Za-z_$][A-Za-z0-9_$-]*)):\s*\(\)\s*=>/gm
  const keys = new Set()
  let m
  while ((m = re.exec(source))) {
    keys.add(m[1] || m[2])
  }
  return keys
}

// Extracts every `/og/<key>` reference from arbitrary source text, skipping
// references to real static files (anything with a dot before the next path
// boundary, e.g. `/og/home.svg`) which are NOT part of the dynamic route.
function extractOgKeyReferences(source) {
  const re = /\/og\/([A-Za-z0-9_-]+(?:\.[A-Za-z0-9]+)?)/g
  const refs = new Set()
  let m
  while ((m = re.exec(source))) {
    const token = m[1]
    if (token.includes('.')) continue // static asset (e.g. home.svg), not a design key
    refs.add(token)
  }
  return refs
}

function walkFiles(dir, exts, out = []) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkFiles(full, exts, out)
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full)
  }
  return out
}

// Core comparison: every referenced key must exist in the design-key set.
// Returns the list of referenced-but-missing keys (empty = all wired).
function findMissingKeys(referencedKeys, designKeys) {
  return [...referencedKeys].filter((k) => !designKeys.has(k))
}

function runStaticSelfTest() {
  console.log('\n=== Self-test: static wiring-comparison logic ===')

  // a. A referenced key that IS in the design map must NOT be flagged.
  const goodRefs = extractOgKeyReferences(
    `images: [{ url: '/og/real-key', width: 1200 }]`
  )
  const goodDesignKeys = extractDesignKeys(`  'real-key': () => (\n    <div />\n  ),`)
  check(
    '[self-test] a correctly-wired key is NOT flagged as missing',
    findMissingKeys(goodRefs, goodDesignKeys).length === 0,
    `refs=${[...goodRefs]} designKeys=${[...goodDesignKeys]}`
  )

  // b. A typo'd/removed key (present in wiring, absent from the design map)
  //    MUST be flagged — proves the checker isn't vacuously passing.
  const badRefs = extractOgKeyReferences(
    `images: [{ url: '/og/typo-key-that-does-not-exist', width: 1200 }]`
  )
  const badDesignKeys = extractDesignKeys(`  'real-key': () => (\n    <div />\n  ),`)
  const missing = findMissingKeys(badRefs, badDesignKeys)
  check(
    '[self-test] a typo\'d/missing key IS flagged',
    missing.length === 1 && missing[0] === 'typo-key-that-does-not-exist',
    `missing=${JSON.stringify(missing)}`
  )

  // c. Static-asset references (e.g. `/og/home.svg`) must be ignored, not
  //    treated as dynamic-route keys (cloud's static SVG is not in the map).
  const staticRefs = extractOgKeyReferences(`images: ['/og/home.svg']`)
  check(
    '[self-test] static asset references (e.g. /og/home.svg) are ignored',
    staticRefs.size === 0,
    `refs=${[...staticRefs]}`
  )
}

function runStaticWiringCheck() {
  console.log('\n=== Static check: every /og/<key> reference resolves to a real design key ===')

  const designSource = fs.readFileSync(
    path.join(REPO_ROOT, 'lib/og-image-designs.tsx'),
    'utf8'
  )
  const designKeys = extractDesignKeys(designSource)
  check(
    'lib/og-image-designs.tsx exports at least one design key',
    designKeys.size > 0,
    `count=${designKeys.size}`
  )

  const scanDirs = ['app', 'shared'].map((d) => path.join(REPO_ROOT, d))
  const files = scanDirs.flatMap((d) => walkFiles(d, ['.ts', '.tsx']))
  // The design map itself and the route handler are the source of truth /
  // consumer, not "callers" whose references need validating against
  // themselves.
  const skip = new Set([
    path.join(REPO_ROOT, 'lib/og-image-designs.tsx'),
    path.join(REPO_ROOT, 'app/og/[key]/route.tsx'),
  ])

  const allRefs = new Set()
  const refsByFile = new Map()
  for (const file of files) {
    if (skip.has(file)) continue
    const source = fs.readFileSync(file, 'utf8')
    const refs = extractOgKeyReferences(source)
    if (refs.size === 0) continue
    for (const r of refs) allRefs.add(r)
    refsByFile.set(file, refs)
  }

  check(
    'at least one route references the shared /og/<key> map',
    allRefs.size > 0,
    `referencingFiles=${refsByFile.size} distinctKeys=${allRefs.size}`
  )

  const missing = findMissingKeys(allRefs, designKeys)
  check(
    'every /og/<key> reference under app/ and shared/ resolves to a real design key (no typos/missing keys)',
    missing.length === 0,
    missing.length === 0
      ? `checked ${allRefs.size} distinct keys across ${refsByFile.size} files`
      : `MISSING keys: ${missing.join(', ')}`
  )

  if (missing.length > 0) {
    for (const [file, refs] of refsByFile) {
      const bad = [...refs].filter((r) => missing.includes(r))
      if (bad.length > 0) {
        console.log(`    -> ${path.relative(REPO_ROOT, file)} references missing key(s): ${bad.join(', ')}`)
      }
    }
  }

  return designKeys
}

// ---------------------------------------------------------------------------
// PART 2 helpers: live server lifecycle, ported unchanged in spirit from
// scripts/test-pricing-responsive.cjs's hardened harness (direct-binary
// spawn, detached process-group kill, free-port preflight, content-verified
// readiness, post-run listener check, decoy self-test).
// ---------------------------------------------------------------------------

function isPortFree(port) {
  return new Promise((resolve) => {
    const probe = net.createServer()
    probe.once('error', () => resolve(false))
    probe.once('listening', () => probe.close(() => resolve(true)))
    probe.listen(port, HOST)
  })
}

async function findFreePort(startPort, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i
    if (await isPortFree(port)) return port
  }
  throw new Error(`no free port in range ${startPort}..${startPort + maxAttempts - 1}`)
}

async function waitForReady(readyUrl, readinessCheck, timeoutMs, exitPromise) {
  const deadline = Date.now() + timeoutMs
  const poll = (async () => {
    while (Date.now() < deadline) {
      try {
        const r = await fetch(readyUrl)
        if (await readinessCheck(r)) return true
      } catch {}
      await sleep(300)
    }
    throw new Error(`server not ready (readiness check never passed for ${readyUrl})`)
  })()
  return Promise.race([poll, exitPromise])
}

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

async function verifyPortReleased(port) {
  for (let i = 0; i < 15; i++) {
    if (await isPortFree(port)) return true
    await sleep(200)
  }
  return false
}

async function startNextServer(startPort, firstRealKey) {
  const port = await findFreePort(startPort, 10)
  const base = `http://${HOST}:${port}`
  const readyUrl = `${base}/og/${firstRealKey}`

  const server = spawn(NEXT_BIN, ['start', '-p', String(port), '-H', HOST], {
    cwd: REPO_ROOT,
    env: { ...process.env },
    stdio: ['ignore', 'inherit', 'inherit'],
    detached: true,
  })

  const exitPromise = new Promise((_, reject) => {
    server.on('error', (err) => reject(new Error(`next failed to spawn: ${err.message}`)))
    server.on('exit', (code, signal) =>
      reject(new Error(`next exited before ready (code=${code} signal=${signal})`))
    )
  })
  exitPromise.catch(() => {})

  try {
    await waitForReady(
      readyUrl,
      async (r) => r.status === 200 && (r.headers.get('content-type') || '').includes('image/png'),
      60000,
      exitPromise
    )
  } catch (err) {
    await killServer(server)
    throw err
  }

  return { server, port, base }
}

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

// Minimal PNG IHDR parse (no image-processing dependency): magic bytes at
// 0-7, then an 8-byte chunk header ("length" + "IHDR"), then width/height as
// two big-endian uint32s.
function isValidPng1200x630(buf) {
  const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  if (buf.length < 24 || !buf.subarray(0, 8).equals(PNG_MAGIC)) return false
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return false
  const width = buf.readUInt32BE(16)
  const height = buf.readUInt32BE(20)
  return width === 1200 && height === 630
}

async function runDecoySelfTest(firstRealKey) {
  console.log('\n=== Self-test: stale-server false-pass prevention (og-image route) ===')
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

    srv = await startNextServer(decoyPort, firstRealKey)

    check(
      `[self-test] preflight moved off occupied port ${decoyPort}`,
      srv.port !== decoyPort,
      `decoyPort=${decoyPort} resolvedPort=${srv.port}`
    )

    const realRes = await fetch(`${srv.base}/og/${firstRealKey}`)
    const realBuf = Buffer.from(await realRes.arrayBuffer())
    check(
      `[self-test] resolved port ${srv.port} serves a real PNG, not the decoy`,
      realRes.headers.get('content-type') === 'image/png' && isValidPng1200x630(realBuf),
      `contentType=${realRes.headers.get('content-type')} validPng=${isValidPng1200x630(realBuf)}`
    )

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

async function runLiveChecks(designKeys) {
  console.log('\n=== Live check: every real key serves a valid PNG; unknown/prototype keys 404 cleanly ===')
  const keys = [...designKeys]
  const firstRealKey = keys[0]

  let main = null
  try {
    main = await startNextServer(DEFAULT_BASE_PORT, firstRealKey)
    console.log(`[next] ready on ${main.base} (resolved port ${main.port})`)

    for (const key of keys) {
      const res = await fetch(`${main.base}/og/${encodeURIComponent(key)}`)
      const buf = Buffer.from(await res.arrayBuffer())
      check(
        `/og/${key} returns a valid 1200x630 PNG`,
        res.status === 200 &&
          res.headers.get('content-type') === 'image/png' &&
          isValidPng1200x630(buf),
        `status=${res.status} contentType=${res.headers.get('content-type')} bytes=${buf.length}`
      )
    }

    for (const key of PROTOTYPE_AND_UNKNOWN_KEYS) {
      const res = await fetch(`${main.base}/og/${encodeURIComponent(key)}`)
      const cacheControl = res.headers.get('cache-control') || ''
      check(
        `/og/${key} returns a clean 404 (not 500, not 200)`,
        res.status === 404,
        `status=${res.status}`
      )
      check(
        `/og/${key} 404 is not year-cached as an ISR page (dynamicParams=false holds)`,
        !cacheControl.includes('31536000'),
        `cache-control="${cacheControl}"`
      )
    }
  } finally {
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

  return firstRealKey
}

;(async () => {
  try {
    runStaticSelfTest()
    const designKeys = runStaticWiringCheck()

    if (designKeys.size > 0) {
      const firstRealKey = [...designKeys][0]
      await runDecoySelfTest(firstRealKey)
      await runLiveChecks(designKeys)
    } else {
      check('live checks skipped', false, 'no design keys found — cannot proceed')
    }
  } catch (err) {
    console.error('FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: 'harness', ok: false, detail: String(err) })
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
