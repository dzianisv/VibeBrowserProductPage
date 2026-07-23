#!/usr/bin/env node
/**
 * Regression guard for the pricing value-clarity change.
 *
 * Verifies that components/pricing-section.tsx exposes the concrete cloud AI
 * usage budgets per tier, the on-device-AI clarifying footnote, and the
 * non-numeric Chrome Web Store trust link wired to analytics — and that no
 * numeric rating claim or aggregateRating/Review JSON-LD was introduced.
 *
 * Plain Node, no dependencies. Mirrors the repo's scripts/test-*.js convention.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..')
const pricingSectionPath = path.join(repoRoot, 'components', 'pricing-section.tsx')
const pricingPagePath = path.join(repoRoot, 'app', 'pricing', 'page.tsx')

const pricingSection = fs.readFileSync(pricingSectionPath, 'utf8')
const pricingPage = fs.readFileSync(pricingPagePath, 'utf8')

let passed = 0
let failed = 0

function assert(name, condition) {
  if (condition) {
    console.log(`PASS: ${name}`)
    passed++
  } else {
    console.log(`FAIL: ${name}`)
    failed++
  }
}

// a. Free tier budget line
assert(
  'Free tier shows $1/day cloud AI budget that resets daily',
  pricingSection.includes('$1/day') &&
    pricingSection.includes('Includes $1/day cloud AI usage (resets daily)')
)

// b. Pro tier budget line (distinct from the $25 price line)
assert(
  'Pro tier shows Includes $25/month cloud AI usage budget line',
  pricingSection.includes('Includes $25/month cloud AI usage (resets every 30 days)')
)

// c. Max tier budget line
assert(
  'Max tier shows Includes $99/month cloud AI usage budget line',
  pricingSection.includes('Includes $99/month cloud AI usage (resets every 30 days)')
)

// d. On-device/local-AI footnote
assert(
  'Footnote clarifies on-device AI never counts against your budget',
  pricingSection.includes('never counts against your budget') &&
    pricingSection.includes('Gemini Nano')
)

// e. Literal CWS URL
assert(
  'Contains the exact Chrome Web Store URL',
  pricingSection.includes(
    'https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado'
  )
)

// f. CWS link wired to analytics
assert(
  "CWS review link wired to trackCTAClick('view_cws_reviews', ...)",
  pricingSection.includes("trackCTAClick('view_cws_reviews'")
)

// g. No numeric rating claim introduced
const numericRatingPatterns = [
  /aggregateRating/,
  /\/5 stars/i,
  /\d(?:\.\d+)?\s*(?:stars?|★)/i, // e.g. "4.5 stars", "4 star"
  /\d[^\n]{0,20}\breviews?\)/i, // e.g. "(2 reviews)", "4 reviews)"
]
const introducedNumericRating = numericRatingPatterns.some((re) => re.test(pricingSection))
assert('No numeric rating / review-count claim introduced', !introducedNumericRating)

// h. app/pricing/page.tsx must not contain aggregateRating
assert(
  'app/pricing/page.tsx has no aggregateRating JSON-LD',
  !pricingPage.includes('aggregateRating')
)

// i. Prices and canonical local-AI bullet unchanged
assert(
  'Prices ($25, $99, Free) and Unlimited local AI bullet unchanged',
  pricingSection.includes('$25') &&
    pricingSection.includes('$99') &&
    pricingSection.includes('Free') &&
    pricingSection.includes('Unlimited local AI (Gemini Nano or BYOM)')
)

const total = passed + failed
console.log(`Results: ${passed}/${total} passed`)
process.exit(failed === 0 ? 0 : 1)
