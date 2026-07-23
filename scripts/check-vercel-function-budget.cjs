#!/usr/bin/env node
/**
 * Regression guard for the Vercel Hobby-plan Serverless Function budget.
 *
 * WHY THIS EXISTS
 * ---------------
 * Production deploys of this Next.js app run on the Vercel Hobby plan, which
 * caps a deployment at 12 Serverless Functions. A `next` 16.2.10 -> 16.2.11
 * bump regressed Vercel's function deduplication for file-convention
 * `opengraph-image.tsx` / `twitter-image.tsx` metadata routes, exploding the
 * real function count from 5 (baseline) to 21 and hard-failing every prod
 * deploy. This script makes that class of regression a loud, cheap CI failure
 * BEFORE any deploy/spend happens, instead of an opaque Vercel build error.
 *
 * WHAT "REAL" MEANS (symlink dedup)
 * ---------------------------------
 * Vercel emits duplicate function bundles as SYMLINKS to a single real bundle
 * (e.g. dozens of `*.func` entries all pointing at `blog/[slug].func`), and
 * only the real (non-symlink) bundles count against the plan limit. So the
 * check enumerates every `*.func` entry under `.vercel/output/functions` at ANY
 * depth and counts only entries where `fs.lstatSync(p).isSymbolicLink()` is
 * false — mirroring Vercel's own accounting. `countRealFunctions()` is a
 * standalone, pure-fs function so it can be exercised by the deterministic
 * self-test below.
 *
 * DETERMINISTIC SELF-TEST (why this file is a real guard, not a tautology)
 * -----------------------------------------------------------------------
 * Before touching the network, the script builds a throwaway, repo-local
 * scratch tree with a KNOWN mix of real `*.func` directories and `*.func`
 * symlinks, then asserts `countRealFunctions()` (a) excludes the symlinked
 * duplicates, (b) finds real bundles at nested depth, and (c) flags a >12 set
 * as over budget while a <=12 set is within budget. If the counting/symlink
 * logic ever silently breaks, the self-test FAILs regardless of whether a
 * Vercel token is present — so a broken guard can never masquerade as a pass.
 *
 * MODES
 * -----
 *   node scripts/check-vercel-function-budget.cjs
 *     Full check. Requires VERCEL_TOKEN (uses the linked .vercel/project.json
 *     if present, else VERCEL_ORG_ID / VERCEL_PROJECT_ID from env). Runs, in
 *     order, `vercel pull --environment=production` then `vercel build --prod`
 *     (matching .github/workflows/deploy.yml exactly), then counts. If
 *     VERCEL_TOKEN is absent (e.g. a contributor without secrets) it prints a
 *     SKIPPED marker and exits 0 — but the self-test still runs and still
 *     counts, and SKIPPED is textually distinct from a real PASS.
 *
 *   node scripts/check-vercel-function-budget.cjs --skip-build
 *     Skips `vercel pull`/`vercel build` and counts whatever already exists at
 *     .vercel/output/functions (used by deploy.yml to reuse the artifacts from
 *     its own preceding Build step instead of double-building). Fails loudly if
 *     that output directory is missing.
 *
 * Plain Node, no external deps. Mirrors the repo's scripts/test-*.cjs house
 * style: a check(name, cond, detail) tally, a final `Results: X/Y passed` line,
 * and a terminal `=== RESULT: PASS|FAIL|SKIPPED ===` marker with a non-zero
 * exit code on failure.
 */

const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const REPO_ROOT = path.resolve(__dirname, '..')
const FUNCTIONS_DIR = path.join(REPO_ROOT, '.vercel', 'output', 'functions')
const VERCEL_LINK = path.join(REPO_ROOT, '.vercel', 'project.json')
// Repo-local scratch dir for the self-test. NOT /tmp / os.tmpdir() (repo policy);
// gitignored and removed at both start and end of the self-test.
const SCRATCH_DIR = path.join(REPO_ROOT, '.vercel-budget-selftest-scratch')
// Vercel Hobby plan Serverless Functions limit.
const HOBBY_FUNCTION_LIMIT = 12
// Pin the Vercel CLI to the exact version deploy.yml uses.
const VERCEL_CLI = 'vercel@56.1.0'

const results = []
function check(name, cond, detail) {
  const ok = !!cond
  results.push({ name, ok, detail })
  console.log(`  ${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? `  [${detail}]` : ''}`)
}

// Recursively enumerate every `*.func` entry under `functionsDir` at any depth
// and return the REAL (non-symlink) bundles. Symlinked duplicates are recorded
// but excluded from the count, mirroring how Vercel bills only real bundles
// against the plan limit. Never traverses INTO a symlink — following it is
// exactly how the real bundle it points at would get double-counted.
function countRealFunctions(functionsDir) {
  const real = []
  const symlinked = []
  function walk(dir) {
    let names
    try {
      names = fs.readdirSync(dir)
    } catch {
      return
    }
    for (const name of names) {
      const p = path.join(dir, name)
      let st
      try {
        st = fs.lstatSync(p)
      } catch {
        continue
      }
      const isSymlink = st.isSymbolicLink()
      if (name.endsWith('.func')) {
        if (isSymlink) symlinked.push(p)
        else real.push(p)
      }
      if (st.isDirectory() && !isSymlink) walk(p)
    }
  }
  walk(functionsDir)
  real.sort()
  symlinked.sort()
  return { count: real.length, paths: real, symlinkedPaths: symlinked }
}

// Deterministic proof that the counting/symlink-detection logic works and can
// catch its own regressions. Pure filesystem — no network, no Vercel token.
function runSelfTest() {
  console.log('\n=== Self-test: symlink-dedup counting logic ===')
  fs.rmSync(SCRATCH_DIR, { recursive: true, force: true })
  try {
    // A. 5 real `.func` dirs + 3 `.func` symlinks pointing at one real bundle.
    const aDir = path.join(SCRATCH_DIR, 'mixed')
    fs.mkdirSync(aDir, { recursive: true })
    for (const n of ['one', 'two', 'three', 'four', 'five']) {
      const d = path.join(aDir, `${n}.func`)
      fs.mkdirSync(d, { recursive: true })
      fs.writeFileSync(path.join(d, 'index.js'), '// bundle\n')
    }
    const dupTarget = path.join(aDir, 'one.func')
    for (const n of ['dup1', 'dup2', 'dup3']) {
      fs.symlinkSync(dupTarget, path.join(aDir, `${n}.func`))
    }
    const mixed = countRealFunctions(aDir)
    check(
      '[self-test] counts 5 real .func dirs, excludes 3 symlinked duplicates',
      mixed.count === 5 && mixed.paths.length === 5,
      `count=${mixed.count}`
    )
    check(
      '[self-test] the 3 symlinked duplicates are detected and NOT counted',
      mixed.symlinkedPaths.length === 3,
      `symlinked=${mixed.symlinkedPaths.length}`
    )

    // B. Real `.func` nested several dirs deep must still be found.
    const nestedDir = path.join(SCRATCH_DIR, 'nested')
    fs.mkdirSync(path.join(nestedDir, 'sub', 'deep', 'x.func'), { recursive: true })
    fs.mkdirSync(path.join(nestedDir, 'y.func'), { recursive: true })
    const nested = countRealFunctions(nestedDir)
    check(
      '[self-test] finds real .func bundles at nested depth',
      nested.count === 2,
      `count=${nested.count}`
    )

    // C. A 12-real-dir set is within budget (<= limit).
    const withinDir = path.join(SCRATCH_DIR, 'within')
    fs.mkdirSync(withinDir, { recursive: true })
    for (let i = 0; i < HOBBY_FUNCTION_LIMIT; i++) {
      fs.mkdirSync(path.join(withinDir, `fn${i}.func`), { recursive: true })
    }
    const within = countRealFunctions(withinDir)
    check(
      `[self-test] ${HOBBY_FUNCTION_LIMIT} real .func dirs flagged WITHIN budget (<= ${HOBBY_FUNCTION_LIMIT})`,
      within.count === HOBBY_FUNCTION_LIMIT && within.count <= HOBBY_FUNCTION_LIMIT,
      `count=${within.count}`
    )

    // D. A 21-real-dir set (the incident count) is over budget even with extra
    //    symlinked duplicates present — symlinks must not mask the overage.
    const overDir = path.join(SCRATCH_DIR, 'over')
    fs.mkdirSync(overDir, { recursive: true })
    for (let i = 0; i < 21; i++) {
      fs.mkdirSync(path.join(overDir, `fn${i}.func`), { recursive: true })
    }
    for (let i = 0; i < 5; i++) {
      fs.symlinkSync(path.join(overDir, 'fn0.func'), path.join(overDir, `dup${i}.func`))
    }
    const over = countRealFunctions(overDir)
    check(
      `[self-test] 21 real .func dirs flagged OVER budget (> ${HOBBY_FUNCTION_LIMIT}), symlinks ignored`,
      over.count === 21 && over.count > HOBBY_FUNCTION_LIMIT && over.symlinkedPaths.length === 5,
      `count=${over.count} symlinked=${over.symlinkedPaths.length}`
    )
  } finally {
    fs.rmSync(SCRATCH_DIR, { recursive: true, force: true })
  }
}

// Run one `vercel` CLI invocation, capturing stdout+stderr. On a non-zero exit
// print the full captured output and throw (fail loudly). The token is masked
// in the echoed command line so it never leaks into CI logs.
function runVercel(args, token) {
  const npxArgs = ['--yes', VERCEL_CLI, ...args, `--token=${token}`]
  const printable = ['npx', ...npxArgs].join(' ').split(token).join('***')
  console.log(`  $ ${printable}`)
  const res = spawnSync('npx', npxArgs, {
    cwd: REPO_ROOT,
    // VERCEL_ORG_ID / VERCEL_PROJECT_ID (if set in the parent env) flow through
    // to the child here; a linked .vercel/project.json is used when present.
    env: { ...process.env },
    encoding: 'utf8',
  })
  const out = `${res.stdout || ''}${res.stderr || ''}`
  if (res.error) {
    console.error(out)
    throw new Error(`failed to spawn "vercel ${args[0]}": ${res.error.message}`)
  }
  if (res.status !== 0) {
    console.error(out)
    throw new Error(`"vercel ${args[0]}" exited with code ${res.status}`)
  }
  return out
}

// Reproduce deploy.yml's `Pull Vercel project settings` + `Build` steps exactly.
function runVercelPullAndBuild(token) {
  if (!fs.existsSync(VERCEL_LINK)) {
    // Not fatal on its own — vercel pull can resolve the project from
    // VERCEL_ORG_ID / VERCEL_PROJECT_ID — but surface it so a misconfigured
    // run is diagnosable.
    console.log(
      `  note: ${path.relative(REPO_ROOT, VERCEL_LINK)} not found; relying on ` +
        'VERCEL_ORG_ID / VERCEL_PROJECT_ID from env'
    )
  }
  runVercel(['pull', '--yes', '--environment=production'], token)
  runVercel(['build', '--prod'], token)
}

function finish() {
  const passed = results.filter((r) => r.ok).length
  const total = results.length
  console.log(`\nResults: ${passed}/${total} passed`)
  if (passed === total && total > 0) {
    console.log('=== RESULT: PASS ===')
    process.exit(0)
  }
  console.log('=== RESULT: FAIL ===')
  process.exit(1)
}

function main() {
  const skipBuild = process.argv.slice(2).includes('--skip-build')
  console.log('== Vercel Serverless Function budget guard ==')

  // 1. Self-test ALWAYS runs first (pure fs, no token). A self-test failure is
  //    a real failure even when no token is present — never conflated with the
  //    "no token -> SKIPPED" path below.
  try {
    runSelfTest()
  } catch (err) {
    console.error('SELF-TEST FATAL:', err && err.stack ? err.stack : err)
    results.push({ name: '[self-test] harness', ok: false, detail: String(err) })
  }
  const selfTestOk = results.length > 0 && results.every((r) => r.ok)
  if (!selfTestOk) {
    console.error('\nSelf-test failed — the budget guard itself is broken; refusing to continue.')
    finish() // prints FAIL, exits non-zero
    return
  }

  const token = process.env.VERCEL_TOKEN

  // 2. No token and not reusing an existing build => skip the network-dependent
  //    real check. Distinct SKIPPED marker (never counted as a pass) so a
  //    contributor without secrets doesn't hard-fail CI.
  if (!skipBuild && !token) {
    const selfPassed = results.filter((r) => r.ok).length
    console.log(`\nSelf-test: ${selfPassed}/${results.length} passed`)
    console.log('SKIPPED (no VERCEL_TOKEN): skipping the real Vercel deployment budget check')
    console.log('=== RESULT: SKIPPED ===')
    process.exit(0)
  }

  // 3. Produce or locate the build output.
  if (skipBuild) {
    if (!fs.existsSync(FUNCTIONS_DIR)) {
      console.error(
        `\n--skip-build was set but ${path.relative(REPO_ROOT, FUNCTIONS_DIR)} does not exist.\n` +
          'Run the Vercel Build step first (this mode reuses its output).'
      )
      results.push({
        name: 'existing .vercel/output/functions present for --skip-build',
        ok: false,
        detail: `${path.relative(REPO_ROOT, FUNCTIONS_DIR)} missing`,
      })
      finish()
      return
    }
    console.log(`\nReusing existing build output at ${path.relative(REPO_ROOT, FUNCTIONS_DIR)} (--skip-build)`)
  } else {
    console.log('\n=== Building deployment to inspect real function count ===')
    try {
      runVercelPullAndBuild(token)
    } catch (err) {
      console.error(`\n${err && err.message ? err.message : err}`)
      results.push({
        name: 'vercel pull + build succeeded',
        ok: false,
        detail: String(err && err.message ? err.message : err),
      })
      finish()
      return
    }
    if (!fs.existsSync(FUNCTIONS_DIR)) {
      console.error(`\nExpected ${path.relative(REPO_ROOT, FUNCTIONS_DIR)} after build, but it is missing.`)
      results.push({
        name: '.vercel/output/functions produced by build',
        ok: false,
        detail: `${path.relative(REPO_ROOT, FUNCTIONS_DIR)} missing`,
      })
      finish()
      return
    }
  }

  // 4. Count real (non-symlink) function bundles and assert within the limit.
  const { count, paths, symlinkedPaths } = countRealFunctions(FUNCTIONS_DIR)
  console.log(
    `\nReal (non-symlink) Serverless Functions: ${count}` +
      `  [symlinked duplicates ignored: ${symlinkedPaths.length}]`
  )
  const within = count <= HOBBY_FUNCTION_LIMIT
  check(
    `real function bundles within Hobby limit (${count} <= ${HOBBY_FUNCTION_LIMIT})`,
    within,
    within ? `count=${count}` : `OVER by ${count - HOBBY_FUNCTION_LIMIT}`
  )
  if (!within) {
    console.error(
      `\nOVER BUDGET: ${count} real Serverless Functions exceed the ${HOBBY_FUNCTION_LIMIT}-function Hobby limit.`
    )
    console.error('Real (non-symlink) function bundles:')
    for (const p of paths) console.error(`  - ${path.relative(REPO_ROOT, p)}`)
  }

  finish()
}

main()
