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

test('the /tee whitepaper page carries a not-currently-offered disclaimer and a research-only CTA', () => {
  const content = read('app/tee/page.tsx')
  assert.match(content, /not currently offered as a live or purchasable Vibe product/)
  assert.doesNotMatch(content, /Ready to deploy privacy-preserving AI/)
  assert.doesNotMatch(content, /Contact us about enterprise TEE deployment/)
})
