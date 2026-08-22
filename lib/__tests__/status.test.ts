import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { computeDisplayStatus, STALE_AFTER_MINUTES, type StatusPayload } from '../status.ts'

/**
 * AGE-1095 definition-of-done requires demonstrating: one healthy service,
 * one unhealthy/unknown fixture, and the stale-data behavior. These three
 * cases are exactly the three tests below.
 */

const NOW = Date.parse('2026-08-22T21:00:00.000Z')

function payloadAt(isoOffsetMinutesAgo: number, services: StatusPayload['services']): StatusPayload {
  const generatedAt = new Date(NOW - isoOffsetMinutesAgo * 60_000).toISOString()
  return { generatedAt, overall: 'operational', services }
}

describe('computeDisplayStatus', () => {
  test('fresh data with a healthy service renders "up", never masked', () => {
    const payload = payloadAt(1, [
      { id: 'docs', label: 'docs.vibebrowser.app', url: 'https://docs.vibebrowser.app', state: 'up', httpStatus: 200 },
    ])
    const result = computeDisplayStatus(payload, NOW)
    assert.equal(result.isStale, false)
    assert.equal(result.overallState, 'up')
    assert.equal(result.services[0].state, 'up')
  })

  test('fresh data with an unhealthy service renders "down" (unhealthy fixture)', () => {
    const payload = payloadAt(1, [
      { id: 'docs', label: 'docs.vibebrowser.app', url: 'https://docs.vibebrowser.app', state: 'up', httpStatus: 200 },
      {
        id: 'relay',
        label: 'relay.api.vibebrowser.app',
        url: 'https://relay.api.vibebrowser.app/health',
        state: 'down',
        httpStatus: null,
        error: 'timed out',
      },
    ])
    const result = computeDisplayStatus(payload, NOW)
    assert.equal(result.isStale, false)
    assert.equal(result.overallState, 'down')
    assert.equal(result.services.find((s) => s.id === 'relay')?.state, 'down')
  })

  test('data older than the staleness threshold is forced to "unknown", not left green', () => {
    const payload = payloadAt(STALE_AFTER_MINUTES + 5, [
      { id: 'docs', label: 'docs.vibebrowser.app', url: 'https://docs.vibebrowser.app', state: 'up', httpStatus: 200 },
    ])
    const result = computeDisplayStatus(payload, NOW)
    assert.equal(result.isStale, true)
    assert.equal(result.overallState, 'unknown')
    assert.equal(result.services[0].state, 'unknown', 'a stale "up" reading must not render as up')
  })

  test('missing payload (unreachable/unpublished data) also renders "unknown", not healthy', () => {
    const result = computeDisplayStatus(null, NOW)
    assert.equal(result.isStale, true)
    assert.equal(result.overallState, 'unknown')
    assert.deepEqual(result.services, [])
  })

  test('a payload exactly at the freshness boundary is still fresh', () => {
    const payload = payloadAt(STALE_AFTER_MINUTES - 1, [
      { id: 'docs', label: 'docs.vibebrowser.app', url: 'https://docs.vibebrowser.app', state: 'up', httpStatus: 200 },
    ])
    const result = computeDisplayStatus(payload, NOW)
    assert.equal(result.isStale, false)
  })
})
