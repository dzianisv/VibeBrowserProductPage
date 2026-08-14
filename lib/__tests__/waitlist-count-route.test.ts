import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'

import { handleWaitlistCountRequest, type WaitlistCountEnv } from '../waitlist-count.ts'

const CONFIGURED = {
  WAITLIST_SNAPSHOT_TOKEN: 'right-token',
  BREVO_API_KEY: 'brevo-key',
  BREVO_LIST_ID: '3',
} satisfies WaitlistCountEnv

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

const brevoOk: typeof fetch = async () =>
  jsonResponse({
    id: 3,
    name: 'waitlist',
    totalSubscribers: 411,
    totalBlacklisted: 2,
    contacts: [{ email: 'someone@example.com' }],
  })

test('endpoint is disabled (503), not open, when the dedicated secret is unset', async () => {
  const res = await handleWaitlistCountRequest(
    'Bearer right-token',
    { ...CONFIGURED, WAITLIST_SNAPSHOT_TOKEN: undefined },
    brevoOk
  )
  assert.equal(res.status, 503)
})

test('missing, wrong, malformed and length-variant tokens are all rejected', async () => {
  for (const header of [
    null,
    '',
    'Bearer wrong-token',
    'right-token',
    'Bearer ',
    'Bearer right-token-longer',
    'Bearer right-toke',
    'bearer right-token',
  ]) {
    const res = await handleWaitlistCountRequest(header, CONFIGURED, brevoOk)
    assert.equal(res.status, 401, `expected 401 for ${JSON.stringify(header)}`)
  }
})

test('valid token returns counts only — no contacts, no Brevo key', async () => {
  let seenUrl = ''
  let seenHeaders: Record<string, string> = {}
  const spyFetch: typeof fetch = async (input, init) => {
    seenUrl = String(input)
    seenHeaders = (init?.headers ?? {}) as Record<string, string>
    return jsonResponse({
      totalSubscribers: 411,
      totalBlacklisted: 2,
      contacts: [{ email: 'someone@example.com' }],
    })
  }
  const res = await handleWaitlistCountRequest('Bearer right-token', CONFIGURED, spyFetch)

  assert.equal(res.status, 200)
  assert.deepEqual(res.body, { totalSubscribers: 411, blacklisted: 2 })
  assert.deepEqual(Object.keys(res.body).sort(), ['blacklisted', 'totalSubscribers'])
  const raw = JSON.stringify(res.body)
  assert.equal(raw.includes('example.com'), false)
  assert.equal(raw.includes('brevo-key'), false)
  assert.match(seenUrl, /contacts\/lists\/3$/)
  assert.equal(seenHeaders['api-key'], 'brevo-key')
})

test('upstream failure is opaque (502) and never echoes Brevo detail', async () => {
  const failingFetch: typeof fetch = async () =>
    jsonResponse({ message: 'unrecognised IP address 1.2.3.4', key: 'brevo-key' }, 401)
  const res = await handleWaitlistCountRequest('Bearer right-token', CONFIGURED, failingFetch)

  assert.equal(res.status, 502)
  const raw = JSON.stringify(res.body)
  assert.equal(raw.includes('brevo-key'), false)
  assert.equal(raw.includes('1.2.3.4'), false)
})

test('a 200 with no usable count is rejected rather than reported as 0', async () => {
  const emptyFetch: typeof fetch = async () => jsonResponse({ name: 'waitlist' })
  const res = await handleWaitlistCountRequest('Bearer right-token', CONFIGURED, emptyFetch)
  assert.equal(res.status, 502)
})

test('route file is a thin adapter over the audited handler', () => {
  const route = fs.readFileSync(
    path.join(process.cwd(), 'app/api/waitlist/count/route.ts'),
    'utf8'
  )
  assert.match(route, /handleWaitlistCountRequest/)
  // No second, unaudited Brevo call path in the route itself.
  assert.equal(route.includes('api.brevo.com'), false)
  assert.equal(route.includes('BREVO_API_KEY'), false)
})
