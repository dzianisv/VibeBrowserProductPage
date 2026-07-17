/**
 * Unit tests for lib/privacy-log.ts. No test runner was configured in this
 * repo (no jest/vitest in package.json) — these use Node's built-in test
 * runner (`node --test`, stable since Node 20) so no new dependency is
 * needed. Run with `npm run test:privacy-log` (see package.json).
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hashEmailForLog, anonymizeIp } from './privacy-log.ts'

test('hashEmailForLog never returns the raw email', () => {
  const hash = hashEmailForLog('User@Example.com')
  assert.equal(hash.includes('@'), false)
  assert.equal(hash.length, 12)
})

test('hashEmailForLog is case/whitespace-insensitive (matches route normalization)', () => {
  assert.equal(hashEmailForLog('User@Example.com'), hashEmailForLog(' user@example.com '))
})

test('hashEmailForLog is deterministic for correlation across log lines', () => {
  assert.equal(hashEmailForLog('a@b.com'), hashEmailForLog('a@b.com'))
})

test('hashEmailForLog differs for different emails', () => {
  assert.notEqual(hashEmailForLog('a@b.com'), hashEmailForLog('c@d.com'))
})

test('anonymizeIp truncates the last octet of an IPv4 address', () => {
  assert.equal(anonymizeIp('203.0.113.42'), '203.0.113.0')
})

test('anonymizeIp takes only the first hop of a forwarded-for list', () => {
  assert.equal(anonymizeIp('203.0.113.42, 70.41.3.18, 150.172.238.178'), '203.0.113.0')
})

test('anonymizeIp collapses an IPv6 address to its first 3 groups', () => {
  assert.equal(anonymizeIp('2001:db8:85a3:8d3:1319:8a2e:370:7348'), '2001:db8:85a3::')
})

test('anonymizeIp returns null for missing input', () => {
  assert.equal(anonymizeIp(null), null)
  assert.equal(anonymizeIp(undefined), null)
  assert.equal(anonymizeIp(''), null)
})

test('anonymizeIp returns null for unparseable input', () => {
  assert.equal(anonymizeIp('not-an-ip'), null)
})
