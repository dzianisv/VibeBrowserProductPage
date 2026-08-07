import assert from 'node:assert/strict'
import test from 'node:test'
import { NextResponse } from 'next/server.js'
import {
  ATTRIBUTION_COOKIE_VALUE_MAX_BYTES,
  ATTRIBUTION_UTM_MAX_LENGTH,
  buildAttributionPayload,
  encodedAttributionValue,
  setAttributionCookie,
} from '../install-attribution.ts'

const CAPTURED_AT = 1_720_000_000_000

function serialize(searchParams: URLSearchParams) {
  const response = NextResponse.next()
  assert.equal(setAttributionCookie(response, searchParams, CAPTURED_AT), true)
  return response.headers.get('set-cookie') ?? ''
}

function parsedCookieValue(setCookie: string): string {
  return setCookie.slice(setCookie.indexOf('=') + 1, setCookie.indexOf(';'))
}

test('NextResponse Set-Cookie value round-trips through standard cookie parsing', () => {
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
  const cookieValue = parsedCookieValue(setCookie)

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

test('normal payload keeps every attribution field below encoded value budget', () => {
  const params = new URLSearchParams({
    utm_source: 'newsletter',
    utm_medium: 'email',
    utm_campaign: 'launch',
    utm_term: 'browser agent',
    utm_content: 'hero',
  })
  const setCookie = serialize(params)
  const cookieValue = parsedCookieValue(setCookie)

  assert.ok(cookieValue.length <= ATTRIBUTION_COOKIE_VALUE_MAX_BYTES)
  assert.deepEqual(JSON.parse(decodeURIComponent(cookieValue)), {
    source: 'newsletter',
    medium: 'email',
    campaign: 'launch',
    term: 'browser agent',
    content: 'hero',
    capturedAt: CAPTURED_AT,
  })
})

test('worst-case Unicode and special UTMs drop optional fields in fixed priority order', () => {
  const expensive = `${'\u0800'.repeat(250)};"&%+?`
  assert.equal(expensive.length, ATTRIBUTION_UTM_MAX_LENGTH)
  const params = new URLSearchParams({
    utm_source: expensive,
    utm_medium: expensive,
    utm_campaign: expensive,
    utm_term: expensive,
    utm_content: expensive,
  })
  const setCookie = serialize(params)
  const cookieValue = parsedCookieValue(setCookie)
  const payload = JSON.parse(decodeURIComponent(cookieValue))

  assert.ok(cookieValue.length <= ATTRIBUTION_COOKIE_VALUE_MAX_BYTES)
  assert.equal(payload.source, expensive)
  assert.equal(payload.medium, undefined)
  assert.equal(payload.campaign, undefined)
  assert.equal(payload.term, undefined)
  assert.equal(payload.content, undefined)
})

test('encoded value boundary accepts 3500 bytes and trims at 3501 bytes', () => {
  function paramsAtEncodedSize(target: number): URLSearchParams {
    for (let encodedChars = 0; encodedChars <= ATTRIBUTION_UTM_MAX_LENGTH; encodedChars++) {
      for (let twoByteChars = 0; twoByteChars <= ATTRIBUTION_UTM_MAX_LENGTH - encodedChars; twoByteChars++) {
        const content = ' '.repeat(encodedChars) + 'é'.repeat(twoByteChars) + 'x'.repeat(ATTRIBUTION_UTM_MAX_LENGTH - encodedChars - twoByteChars)
        const params = new URLSearchParams({
          utm_source: '\u0800'.repeat(256),
          utm_medium: 'm'.repeat(256),
          utm_campaign: 'c'.repeat(256),
          utm_term: 't'.repeat(256),
          utm_content: content,
        })
        const payload = buildAttributionPayload(params, CAPTURED_AT)
        if (payload && encodedAttributionValue(payload).length === target) return params
      }
    }
    throw new Error(`could not construct encoded payload of ${target} bytes`)
  }

  const atLimit = parsedCookieValue(serialize(paramsAtEncodedSize(ATTRIBUTION_COOKIE_VALUE_MAX_BYTES)))
  assert.equal(atLimit.length, ATTRIBUTION_COOKIE_VALUE_MAX_BYTES)
  assert.equal(JSON.parse(decodeURIComponent(atLimit)).content.length, ATTRIBUTION_UTM_MAX_LENGTH)

  const overLimit = parsedCookieValue(serialize(paramsAtEncodedSize(ATTRIBUTION_COOKIE_VALUE_MAX_BYTES + 1)))
  assert.ok(overLimit.length <= ATTRIBUTION_COOKIE_VALUE_MAX_BYTES)
  assert.equal(JSON.parse(decodeURIComponent(overLimit)).content, undefined)
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
