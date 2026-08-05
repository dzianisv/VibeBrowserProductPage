import { test, beforeEach, describe } from 'node:test'
import assert from 'node:assert/strict'

import {
  REFERRAL_STORAGE_KEY,
  buildCurrentReferralData,
  captureReferralData,
  clearReferralData,
  getStoredReferralData,
  hasUtmParams,
  mergeReferralData,
  normalizeReferrer,
  parseUtmParams,
  type ReferralData,
} from '../referral-tracking-core.ts'

// --- minimal sessionStorage stub -------------------------------------------

class MemoryStorage {
  private store = new Map<string, string>()
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  clear(): void {
    this.store.clear()
  }
}

const storage = new MemoryStorage()
;(globalThis as Record<string, unknown>).sessionStorage = storage

beforeEach(() => storage.clear())

function stored(): ReferralData | null {
  const raw = storage.getItem(REFERRAL_STORAGE_KEY)
  return raw ? (JSON.parse(raw) as ReferralData) : null
}

const CAMPAIGN =
  '?utm_source=e2etest&utm_medium=cli&utm_campaign=brevo_e2e&utm_term=agents&utm_content=hero'

// --- helpers ----------------------------------------------------------------

describe('parseUtmParams', () => {
  test('extracts all five params', () => {
    assert.deepEqual(parseUtmParams(CAMPAIGN), {
      utm_source: 'e2etest',
      utm_medium: 'cli',
      utm_campaign: 'brevo_e2e',
      utm_term: 'agents',
      utm_content: 'hero',
    })
  })

  test('missing and empty params become null', () => {
    assert.deepEqual(parseUtmParams('?utm_source=&utm_medium=cli'), {
      utm_source: null,
      utm_medium: 'cli',
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    })
  })
})

describe('hasUtmParams', () => {
  test('false for null and for an all-null set', () => {
    assert.equal(hasUtmParams(null), false)
    assert.equal(hasUtmParams(buildCurrentReferralData({ search: '', pathname: '/blog' })), false)
  })

  test('true when any single field is set', () => {
    assert.equal(hasUtmParams({ utm_content: 'hero' }), true)
  })
})

describe('normalizeReferrer', () => {
  test('maps known hosts to friendly names', () => {
    assert.equal(normalizeReferrer('https://news.ycombinator.com/item?id=1'), 'hackernews')
    assert.equal(normalizeReferrer('https://x.com/foo'), 'twitter')
  })

  test('own domain and junk are not referrals', () => {
    assert.equal(normalizeReferrer('https://www.vibebrowser.app/blog'), null)
    assert.equal(normalizeReferrer('not-a-url'), null)
    assert.equal(normalizeReferrer(''), null)
  })
})

// --- the defect under test --------------------------------------------------

describe('captureReferralData', () => {
  test('no prior session data + UTMs in URL -> captured', () => {
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })

    const data = stored()
    assert.equal(data?.utm_source, 'e2etest')
    assert.equal(data?.utm_medium, 'cli')
    assert.equal(data?.utm_campaign, 'brevo_e2e')
    assert.equal(data?.utm_term, 'agents')
    assert.equal(data?.utm_content, 'hero')
    assert.equal(data?.landing_page, '/cloud')
    assert.equal(data?.utm_landing_page, '/cloud')
    assert.equal(data?.referral_source, 'e2etest')
  })

  test('no prior data, no UTMs -> direct, no campaign recorded', () => {
    captureReferralData({ search: '', pathname: '/blog' })

    const data = stored()
    assert.equal(data?.referral_source, 'direct')
    assert.equal(data?.utm_source, null)
    assert.equal(data?.landing_page, '/blog')
    assert.equal(data?.utm_landing_page, null)
  })

  // This is the regression: previously the second call early-returned and the
  // campaign UTMs were silently discarded.
  test('prior session data (no UTMs) + UTMs now in URL -> UTMs captured, original landing page preserved', () => {
    captureReferralData({ search: '', pathname: '/blog' })
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })

    const data = stored()
    assert.equal(data?.utm_source, 'e2etest')
    assert.equal(data?.utm_medium, 'cli')
    assert.equal(data?.utm_campaign, 'brevo_e2e')
    // first-touch landing page is NOT overwritten
    assert.equal(data?.landing_page, '/blog')
    // but the campaign's own entry page is recoverable
    assert.equal(data?.utm_landing_page, '/cloud')
    // "direct" is upgraded to the campaign source
    assert.equal(data?.referral_source, 'e2etest')
  })

  test('a real external referrer is not downgraded when UTMs arrive later', () => {
    captureReferralData({
      search: '',
      pathname: '/blog',
      referrer: 'https://news.ycombinator.com/item?id=1',
    })
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })

    const data = stored()
    assert.equal(data?.referral_source, 'hackernews')
    assert.equal(data?.utm_source, 'e2etest')
    assert.equal(data?.landing_page, '/blog')
  })

  test('prior session data WITH UTMs + different UTMs now -> first-touch UTMs win', () => {
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    captureReferralData({
      search: '?utm_source=second&utm_medium=email&utm_campaign=later',
      pathname: '/pricing',
    })

    const data = stored()
    assert.equal(data?.utm_source, 'e2etest')
    assert.equal(data?.utm_medium, 'cli')
    assert.equal(data?.utm_campaign, 'brevo_e2e')
    assert.equal(data?.utm_landing_page, '/cloud')
    assert.equal(data?.landing_page, '/cloud')
  })

  test('navigating to a UTM-free page does not erase a captured campaign', () => {
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    captureReferralData({ search: '', pathname: '/pricing' })

    const data = stored()
    assert.equal(data?.utm_source, 'e2etest')
    assert.equal(data?.landing_page, '/cloud')
  })

  test('UTM set is backfilled atomically, never spliced across campaigns', () => {
    captureReferralData({ search: '', pathname: '/blog' })
    captureReferralData({ search: '?utm_medium=cli', pathname: '/cloud' })
    captureReferralData({ search: '?utm_source=late', pathname: '/pricing' })

    const data = stored()
    // the first non-empty set wins wholesale — no utm_source from a later hit
    assert.equal(data?.utm_medium, 'cli')
    assert.equal(data?.utm_source, null)
  })

  test('returns the merged record', () => {
    captureReferralData({ search: '', pathname: '/blog' })
    const merged = captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })

    assert.equal(merged?.landing_page, '/blog')
    assert.equal(merged?.utm_source, 'e2etest')
  })
})

describe('mergeReferralData', () => {
  test('returns incoming when there is no existing record', () => {
    const incoming = buildCurrentReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    assert.deepEqual(mergeReferralData(null, incoming), {
      ...incoming,
      utm_landing_page: '/cloud',
    })
  })

  test('is a pure function - does not mutate its arguments', () => {
    const existing = buildCurrentReferralData({ search: '', pathname: '/blog' })
    const incoming = buildCurrentReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    const snapshot = structuredClone(existing)

    mergeReferralData(existing, incoming)

    assert.deepEqual(existing, snapshot)
  })

  test('tolerates legacy records written without utm_landing_page', () => {
    const legacy = {
      referral_source: 'direct',
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      landing_page: '/blog',
    } as ReferralData

    const merged = mergeReferralData(
      legacy,
      buildCurrentReferralData({ search: CAMPAIGN, pathname: '/cloud' }),
    )

    assert.equal(merged.utm_source, 'e2etest')
    assert.equal(merged.landing_page, '/blog')
    assert.equal(merged.utm_landing_page, '/cloud')
  })
})

describe('getStoredReferralData / clearReferralData', () => {
  test('reads back what was captured', () => {
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    assert.equal(getStoredReferralData()?.utm_campaign, 'brevo_e2e')
  })

  test('returns null when nothing is stored', () => {
    assert.equal(getStoredReferralData(), null)
  })

  test('survives corrupt JSON instead of throwing', () => {
    storage.setItem(REFERRAL_STORAGE_KEY, '{not json')
    assert.equal(getStoredReferralData(), null)
  })

  test('clearReferralData() resets state', () => {
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    assert.notEqual(getStoredReferralData(), null)

    clearReferralData()

    assert.equal(getStoredReferralData(), null)
    assert.equal(storage.getItem(REFERRAL_STORAGE_KEY), null)
  })

  test('a fresh capture after clearing starts a new first-touch', () => {
    captureReferralData({ search: CAMPAIGN, pathname: '/cloud' })
    clearReferralData()
    captureReferralData({ search: '?utm_source=second', pathname: '/pricing' })

    const data = stored()
    assert.equal(data?.utm_source, 'second')
    assert.equal(data?.landing_page, '/pricing')
  })
})
