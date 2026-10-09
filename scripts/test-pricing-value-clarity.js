#!/usr/bin/env node
/**
 * Regression guard for the pricing value-clarity change.
 *
 * Verifies that components/pricing-section.tsx (rendered on /pricing) exposes the concrete cloud AI
 * usage budgets per tier, the on-device-AI clarifying footnote, and the
 * non-numeric Chrome Web Store trust link wired to analytics — and that no
 * numeric rating claim or aggregateRating/Review JSON-LD was introduced.
 * Also verifies the landing page shows only a one-line pricing summary that
 * links to /pricing instead of embedding the full widget.
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
const landingPagePath = path.join(repoRoot, 'landing-page.tsx')

const pricingSection = fs.readFileSync(pricingSectionPath, 'utf8')
const pricingPage = fs.readFileSync(pricingPagePath, 'utf8')
const landingPage = fs.readFileSync(landingPagePath, 'utf8')

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
  'Free tier shows no dollar amount and reads Free, no card required',
  !pricingSection.includes('$1/day') &&
    pricingSection.includes('Free, no card required')
)

// b. Pro tier budget line (distinct from the $25 price line)
assert(
  'Pro tier shows $7/mo cloud AI usage cap resetting each billing period',
  pricingSection.includes('Cloud AI usage cap: $7/mo (resets each billing period)')
)

// c. Max tier budget line
assert(
  'Max tier shows $28/mo cloud AI usage cap resetting each billing period',
  pricingSection.includes('Cloud AI usage cap: $28/mo (resets each billing period)')
)

// c2. "resets each billing period" appears exactly twice (Pro + Max)
assert(
  '"resets each billing period" appears twice (Pro and Max)',
  (pricingSection.match(/resets each billing period/g) || []).length === 2
)

// d. On-device/local-AI footnote
assert(
  'Footnote clarifies on-device AI never counts against your cap',
  pricingSection.includes('never counts against your cap') &&
    pricingSection.includes('On-device AI (Gemma 4)') &&
    !pricingSection.includes('Gemini Nano')
)

// d2. Footnote states paid caps reset on the subscriber's own billing date (Stripe period anchored)
assert(
  'Footnote states paid caps reset on the billing date, not the 1st of the month',
  pricingSection.includes('reset on your own billing date, each time your subscription renews, not on the 1st of the month')
)

// d3. Footnote separates usage cap from subscription price
assert(
  'Footnote establishes usage cap is separate from subscription price',
  pricingSection.includes('separate spend limit from your subscription price')
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
    pricingSection.includes('Unlimited local AI (Gemma 4 on your device or BYOM)')
)

// j. The full pricing widget lives on /pricing, not on the landing page
assert(
  'app/pricing/page.tsx renders the full <PricingSection />',
  pricingPage.includes("import { PricingSection } from '@/components/pricing-section'") &&
    pricingPage.includes('<PricingSection />')
)
assert(
  'landing-page.tsx no longer imports or renders PricingSection',
  !landingPage.includes('pricing-section') && !landingPage.includes('<PricingSection')
)

// k. Landing page shows the one-line pricing summary linking to /pricing
assert(
  'landing-page.tsx shows the compact Free/Pro/Max line',
  landingPage.includes('Free with Gemma 4 on your device. Pro and Max for cloud models.')
)
const pricingLinks = landingPage.match(/<Link href="\/pricing"/g) || []
assert(
  'landing-page.tsx links to /pricing from the compact line plus desktop and mobile nav (3 links)',
  pricingLinks.length === 3
)

const total = passed + failed
console.log(`Results: ${passed}/${total} passed`)
process.exit(failed === 0 ? 0 : 1)
