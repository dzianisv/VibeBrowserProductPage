import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'

import { fetchCounts, parseCounts, resolveSource } from '../../scripts/snapshot-waitlist-count.js'

type Env = Record<string, string | undefined>

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

test('proxy mode is chosen when both proxy vars are set', () => {
  const source = resolveSource({
    WAITLIST_COUNT_URL: 'https://www.vibebrowser.app/api/waitlist/count',
    WAITLIST_SNAPSHOT_TOKEN: 'secret',
    BREVO_API_KEY: 'brevo-key',
  } satisfies Env)
  assert.equal(source.kind, 'proxy')
  // The Brevo key must never be carried into proxy mode.
  assert.equal('apiKey' in source, false)
})

test('half-configured proxy fails closed instead of silently using Brevo', () => {
  assert.throws(() => resolveSource({ WAITLIST_COUNT_URL: 'https://x/y' } satisfies Env), /together/)
  assert.throws(() => resolveSource({ WAITLIST_SNAPSHOT_TOKEN: 't' } satisfies Env), /together/)
})

test('non-https proxy url is refused so the token cannot leak in cleartext', () => {
  assert.throws(
    () => resolveSource({ WAITLIST_COUNT_URL: 'http://x/y', WAITLIST_SNAPSHOT_TOKEN: 't' } satisfies Env),
    /https/
  )
})

test('no source configured is an error, not a default count', () => {
  assert.throws(() => resolveSource({} satisfies Env), /No count source configured/)
})

test('direct Brevo mode still works for allowlisted local dev', () => {
  const source = resolveSource({ BREVO_API_KEY: 'k', BREVO_LIST_ID: '3' } satisfies Env)
  assert.deepEqual(source, { kind: 'brevo', apiKey: 'k', listId: 3 })
})

test('proxy request sends the bearer token and no Brevo key', async () => {
  let seenUrl = ''
  let seenHeaders: Record<string, string> = {}
  const spyFetch: typeof fetch = async (input, init) => {
    seenUrl = String(input)
    seenHeaders = (init?.headers ?? {}) as Record<string, string>
    return jsonResponse({ totalSubscribers: 411, blacklisted: 2 })
  }

  const counts = await fetchCounts(
    { kind: 'proxy', url: 'https://host/api/waitlist/count', token: 'tok' },
    spyFetch
  )
  assert.deepEqual(counts, { total: 411, blacklisted: 2 })
  assert.equal(seenUrl, 'https://host/api/waitlist/count')
  assert.equal(seenHeaders.authorization, 'Bearer tok')
  assert.equal(seenHeaders['api-key'], undefined)
})

test('a failing upstream throws instead of writing a bogus row', async () => {
  const failingFetch: typeof fetch = async () => jsonResponse({ error: 'unauthorized' }, 401)
  await assert.rejects(
    fetchCounts({ kind: 'proxy', url: 'https://host/c', token: 't' }, failingFetch),
    /401/
  )
})

test('parseCounts rejects a body with no real count', () => {
  assert.throws(() => parseCounts({}), /totalSubscribers/)
  assert.deepEqual(parseCounts({ totalSubscribers: 5 }), { total: 5, blacklisted: 0 })
})

// --- workflow guard -------------------------------------------------------
// These assertions are the durable part of the fix: they fail CI if someone
// reverts the workflow to the IP-fragile direct-Brevo call or lets it pass
// silently without credentials.

const workflow = fs.readFileSync(
  path.join(process.cwd(), '.github/workflows/waitlist-snapshot.yml'),
  'utf8'
)

test('snapshot workflow never receives the Brevo API key', () => {
  assert.equal(/BREVO_API_KEY:/.test(workflow), false)
  assert.equal(/secrets\.BREVO_API_KEY/.test(workflow), false)
})

test('snapshot workflow uses the authenticated production endpoint', () => {
  assert.match(workflow, /secrets\.WAITLIST_COUNT_URL/)
  assert.match(workflow, /secrets\.WAITLIST_SNAPSHOT_TOKEN/)
  assert.match(workflow, /node scripts\/snapshot-waitlist-count\.js/)
})

test('snapshot workflow fails closed on missing secrets', () => {
  assert.match(workflow, /WAITLIST_COUNT_URL:\?/)
  assert.match(workflow, /WAITLIST_SNAPSHOT_TOKEN:\?/)
  assert.match(workflow, /set -euo pipefail/)
})

test('snapshot workflow keeps the LFS budget guard', () => {
  assert.match(workflow, /lfs: false/)
})
