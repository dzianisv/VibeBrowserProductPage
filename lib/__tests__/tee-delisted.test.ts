import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'

// AGE-1053: tee.vibebrowser.app is unreachable (Cloudflare 530/1033) and the
// Azure service principal that would restore it fails AADSTS5000224 before any
// RBAC check — there is no reliable recovery path. TEE/Confidential Mode was
// delisted from every paid/public surface in this repo. These assertions guard
// against the claims regressing back onto a live-availability footing.

const root = path.resolve(import.meta.dirname, '../..')
const read = (relPath: string) => fs.readFileSync(path.join(root, relPath), 'utf8')

test('enterprise-template.tsx no longer advertises a TEE deployment card or badge', () => {
  const content = read('components/enterprise-template.tsx')
  assert.doesNotMatch(content, /TEE Deployment Path/)
  assert.doesNotMatch(content, /TEE-Ready/)
  assert.doesNotMatch(content, /Remote attestation API/)
})

test('enterprise page/layout no longer claims current TEE availability', () => {
  const page = read('app/enterprise/page.tsx')
  const layout = read('app/enterprise/layout.tsx')
  for (const content of [page, layout]) {
    assert.doesNotMatch(content, /TEE Protection/)
    assert.doesNotMatch(content, /TEE-ready deployment/)
    assert.doesNotMatch(content, /TEE-Protected Inference/)
    assert.doesNotMatch(content, /How does TEE protect my data/)
  }
})

test('lawyers page/layout no longer claims current TEE availability', () => {
  const page = read('app/lawyers/page.tsx')
  const layout = read('app/lawyers/layout.tsx')
  assert.doesNotMatch(page, /TEE-oriented cloud deployments/)
  assert.doesNotMatch(layout, /TEE Privacy/)
  assert.doesNotMatch(layout, /runs in TEE/)
})

test('researchers page no longer claims current TEE availability', () => {
  const content = read('app/researchers/page.tsx')
  assert.doesNotMatch(content, /\bTEE\b/)
})

test('incognito waitlist dialog no longer claims TEE-protected inference', () => {
  const content = read('components/waitlist-dialog-incognito.tsx')
  assert.doesNotMatch(content, /TEE-protected/)
})

test('shared company profile no longer sells TEE as an enterprise deployment path', () => {
  const content = read('shared/company-profile/config.ts')
  assert.doesNotMatch(content, /TEE-oriented deployment paths/)
  assert.doesNotMatch(content, /TEE Security/)
  assert.doesNotMatch(content, /TEE enclaves/)
})

test('the /tee page leads with an explicit, dominant unavailable-status banner', () => {
  const content = read('app/tee/page.tsx')
  assert.match(content, /Status: Unavailable/)
  assert.match(content, /Confidential Mode \/ TEE inference is not available today/)
  assert.match(content, /tee\.vibebrowser\.app/)
  assert.match(content, /no live deployment, no purchase path, and no trial available/)
  assert.doesNotMatch(content, /Production TEE-LLM Infrastructure/)
  assert.doesNotMatch(content, /Our production deployment demonstrates/)
  assert.doesNotMatch(content, /Ready to deploy privacy-preserving AI/)
  assert.doesNotMatch(content, /Contact us about enterprise TEE deployment/)
})

test('/tee layout metadata reflects unavailability, not an active whitepaper pitch', () => {
  const content = read('app/tee/layout.tsx')
  assert.match(content, /Not Currently Available/)
  assert.match(content, /not currently available as a Vibe product or service/)
  assert.doesNotMatch(content, /TEE Security Whitepaper — Privacy-Preserving LLM Inference with Intel TDX/)
})
