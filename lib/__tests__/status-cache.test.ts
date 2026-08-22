import { test, describe, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'

/**
 * AGE-1095 review fix: lib/status-cache.ts is the shared, in-process,
 * TTL-cached function both `/status` and `/status.json` call -- replacing
 * the old `status-page-refresh.yml` cron that committed public/status.json
 * every 15 minutes and force-triggered a production deploy. These tests
 * exercise its two production-safety guarantees deterministically, with
 * `global.fetch` stubbed so no real network egress happens:
 *
 *   1. Bounded caching: repeated calls inside the TTL window reuse the
 *      cached payload instead of re-probing every upstream endpoint.
 *   2. Coalescing: concurrent calls during a cache miss share a single
 *      in-flight generation instead of firing duplicate probe storms.
 *
 * `getCachedStatusPayload(nowMs)` takes an explicit "now" for the
 * freshness comparison, which lets the TTL-expiry test force a cache miss
 * by advancing the logical clock instead of sleeping 60 real seconds.
 */

let fetchCallCount = 0
const originalFetch = globalThis.fetch

function stubFetch() {
  fetchCallCount = 0
  // @ts-expect-error -- test stub, narrower signature than the real fetch
  globalThis.fetch = async () => {
    fetchCallCount += 1
    return {
      status: 200,
      text: async () => 'ok',
    } as Response
  }
}

beforeEach(async () => {
  stubFetch()
  const { __resetStatusCacheForTests } = await import('../status-cache.ts')
  __resetStatusCacheForTests()
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('getCachedStatusPayload', () => {
  test('a second call within the TTL window reuses the cached payload (no re-probe)', async () => {
    const { getCachedStatusPayload } = await import('../status-cache.ts')
    const now = Date.now()

    const first = await getCachedStatusPayload(now)
    const callsAfterFirst = fetchCallCount
    assert.ok(callsAfterFirst > 0, 'first call must actually probe the endpoints')

    const second = await getCachedStatusPayload(now + 5_000)
    assert.equal(fetchCallCount, callsAfterFirst, 'a call inside the TTL window must not re-probe')
    assert.equal(second.generatedAt, first.generatedAt, 'cached payload is returned verbatim, not regenerated')
  })

  test('a call after the TTL window has elapsed regenerates (bounded caching, not indefinite staleness)', async () => {
    const { getCachedStatusPayload } = await import('../status-cache.ts')
    const now = Date.now()

    await getCachedStatusPayload(now)
    const callsAfterFirst = fetchCallCount

    // CACHE_TTL_MS is 60_000; well past that.
    const second = await getCachedStatusPayload(now + 61_000)
    assert.ok(fetchCallCount > callsAfterFirst, 'a call past the TTL must re-probe rather than serve stale data forever')
    assert.ok(second.generatedAt, 'regenerated payload still has a generatedAt timestamp')
  })

  test('concurrent calls during a cache miss are coalesced into a single generation', async () => {
    const { getCachedStatusPayload } = await import('../status-cache.ts')
    const now = Date.now()

    const [a, b] = await Promise.all([getCachedStatusPayload(now), getCachedStatusPayload(now)])
    // 3 endpoints in data/status-endpoints.json; a coalesced miss probes
    // each exactly once, not once per caller.
    assert.equal(fetchCallCount, 3, 'concurrent callers during a cache miss must share one probe run')
    assert.equal(a.generatedAt, b.generatedAt, 'concurrent callers must resolve to the same payload')
  })
})
