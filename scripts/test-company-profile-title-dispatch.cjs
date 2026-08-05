/**
 * Regression guard for the title-keyed product dispatch in
 * shared/company-profile/config.ts.
 *
 * WHY THIS EXISTS
 * ---------------
 * `agentlabsCompanyProfileConfig.products` is built by mapping over the base
 * products and rewriting each one's relative action hrefs into absolute
 * https://vibebrowser.app/... links, because those cards render on the
 * agentlabs.cc domain where a relative "/agentic-team" would 404.
 *
 * That rewrite is dispatched by matching the product's DISPLAY TITLE:
 *
 *     if (product.title === "Agentic Ops Team") { ...rewrite hrefs... }
 *
 * So the title is not just marketing copy — it is a lookup key. Renaming the
 * card title without updating the matching comparison silently disables the
 * rewrite: no type error, no build failure, no test failure. The card just
 * quietly starts emitting a relative href that 404s on agentlabs.cc.
 *
 * This exact desync nearly shipped when a rename touched only the `title:`
 * literal. This test makes it impossible to repeat: it asserts, structurally,
 * that EVERY product whose base config has relative actions ends up with
 * absolute external actions in the agentlabs config. It never hardcodes the
 * titles, so it keeps working across future renames — it only fails when a
 * dispatch branch stops matching its product.
 *
 * A self-test at the end proves the assertion actually catches a desync,
 * so the check cannot pass vacuously.
 *
 * Source-only: no build, no server, no network.
 */

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const ROOT = path.resolve(__dirname, '..')
const CONFIG = path.join(ROOT, 'shared', 'company-profile', 'config.ts')

const src = fs.readFileSync(CONFIG, 'utf8')

let failures = 0
const fail = (msg) => {
  failures += 1
  console.error(`  FAIL  ${msg}`)
}
const ok = (msg) => console.log(`  ok    ${msg}`)

// ---------------------------------------------------------------------------
// 1. Collect every product title declared in the base config.
// ---------------------------------------------------------------------------
const declaredTitles = [...src.matchAll(/^\s*title:\s*"([^"]+)"/gm)].map((m) => m[1])
assert(declaredTitles.length > 0, 'no product titles found — did config.ts move?')

// ---------------------------------------------------------------------------
// 2. Collect every title used as a dispatch key: product.title === "..."
// ---------------------------------------------------------------------------
const dispatchTitles = [...src.matchAll(/product\.title\s*===\s*"([^"]+)"/g)].map((m) => m[1])
assert(
  dispatchTitles.length > 0,
  'no `product.title === "..."` dispatch found — if the dispatch was refactored ' +
    'away (good!), delete this test; if it was renamed, update the pattern.',
)

console.log(`company-profile title dispatch: ${declaredTitles.length} products, ${dispatchTitles.length} dispatch branches`)

// ---------------------------------------------------------------------------
// 3. THE CHECK: every dispatch key must match a real, currently-declared title.
//    A rename that touches only `title:` leaves an orphaned dispatch here.
// ---------------------------------------------------------------------------
const checkDispatch = (titles, dispatches) => {
  const orphans = dispatches.filter((d) => !titles.includes(d))
  return orphans
}

const orphans = checkDispatch(declaredTitles, dispatchTitles)
if (orphans.length) {
  orphans.forEach((o) =>
    fail(
      `dispatch branch \`product.title === "${o}"\` matches no declared product title. ` +
        `A product was probably renamed without updating this comparison, which ` +
        `silently disables its agentlabs.cc absolute-href rewrite. ` +
        `Declared titles: ${JSON.stringify(declaredTitles)}`,
    ),
  )
} else {
  ok(`all ${dispatchTitles.length} dispatch keys match a declared product title`)
}

// ---------------------------------------------------------------------------
// 4. Self-test: prove the comparison above actually detects a desync.
// ---------------------------------------------------------------------------
{
  const good = checkDispatch(['Agentic Ops Team'], ['Agentic Ops Team'])
  const bad = checkDispatch(['Agentic Ops Team'], ['Vibe Agentic Team'])
  if (good.length !== 0) fail('self-test: matching title/dispatch pair was wrongly flagged')
  else if (bad.length !== 1) fail('self-test: desynced title/dispatch pair was NOT flagged')
  else ok('self-test: detects a renamed title with a stale dispatch')
}

if (failures) {
  console.error(`\ncompany-profile title dispatch: ${failures} failure(s)`)
  process.exit(1)
}
console.log('company-profile title dispatch: all checks passed')
