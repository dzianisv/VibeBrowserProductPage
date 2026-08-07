import assert from 'node:assert/strict'
import test from 'node:test'
import { NextResponse } from 'next/server.js'
import {
  ATTRIBUTION_UTM_MAX_LENGTH,
  buildAttributionPayload,
  setAttributionCookie,
} from '../install-attribution.ts'

const CAPTURED_AT = 1_720_000_000_000

function serialize(searchParams: URLSearchParams) {
  const response = NextResponse.next()
  assert.equal(setAttributionCookie(response, searchParams, CAPTURED_AT), true)
  return response.headers.get('set-cookie') ?? ''
}

function chromeCookieValue(setCookie: string): string {
  return setCookie.slice(setCookie.indexOf('=') + 1, setCookie.indexOf(';'))
}

test('NextResponse wire value round-trips through Chrome cookie semantics', () => {
  const params = new URLSearchParams({
    utm_source: 'Hacker News launch',
    utm_medium: 'social/referral',
    utm_campaign: 'summer & fall; 50% "off"',
    utm_term: 'browser agents + MCP',
    utm_content: 'hero=blue?variant#2',
  })
  const payload = buildAttributionPayload(params, CAPTURED_AT)
  assert.ok(payload)

  const setCookie = serialize(params)
  const cookieValue = chromeCookieValue(setCookie)

  assert.match(cookieValue, /^%7B%22source%22/)
  assert.throws(() => JSON.parse(cookieValue), SyntaxError)
  assert.deepEqual(JSON.parse(decodeURIComponent(cookieValue)), payload)
  assert.match(setCookie, /Max-Age=2592000/)
  assert.match(setCookie, /Path=\//)
  assert.match(setCookie, /Secure/)
  assert.match(setCookie, /HttpOnly/)
  assert.match(setCookie, /SameSite=lax/i)
  assert.doesNotMatch(setCookie, /Domain=/i)
})

test('accepts UTM values at relay limit and drops oversized optional values', () => {
  const max = 'x'.repeat(ATTRIBUTION_UTM_MAX_LENGTH)
  const payload = buildAttributionPayload(
    new URLSearchParams({
      utm_source: max,
      utm_medium: 'y'.repeat(ATTRIBUTION_UTM_MAX_LENGTH + 1),
      utm_campaign: max,
    }),
    CAPTURED_AT,
  )

  assert.deepEqual(payload, { source: max, campaign: max, capturedAt: CAPTURED_AT })
})

test('rejects malformed or oversized required source', () => {
  assert.equal(
    buildAttributionPayload(new URLSearchParams(`utm_source=${'%E0%A4%A'}`), CAPTURED_AT),
    null,
  )
  assert.equal(
    buildAttributionPayload(
      new URLSearchParams({ utm_source: 'x'.repeat(ATTRIBUTION_UTM_MAX_LENGTH + 1) }),
      CAPTURED_AT,
    ),
    null,
  )
})
