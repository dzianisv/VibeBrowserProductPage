/**
 * Framework-free core of referral / campaign attribution.
 *
 * Kept separate from `referral-tracking.ts` so it can be unit-tested under plain
 * Node (`node --test`) without pulling in React or `next/navigation`.
 *
 * ---------------------------------------------------------------------------
 * ATTRIBUTION SCHEME: first-touch landing, first-touch *non-empty* UTM set
 * ---------------------------------------------------------------------------
 * Previously this module early-returned whenever `vibe_referral_data` already
 * existed in sessionStorage. That made first-touch attribution correct, but it
 * silently DISCARDED campaign UTMs that appeared on a later page in the same
 * session. A visitor who read /blog and then clicked an ad landing on
 * /cloud?utm_source=... was recorded as `referral_source: "direct"` with every
 * UTM null, so paid traffic looked organic.
 *
 * The scheme now is:
 *
 *   - `landing_page` and `referral_source` are FIRST-TOUCH and are never
 *     overwritten. They describe how the visitor first entered the site.
 *   - The UTM set (`utm_source|medium|campaign|term|content`) is backfilled the
 *     first time a NON-EMPTY set is observed, even if that happens several
 *     navigations into the session. All five fields are copied together so a
 *     campaign is never spliced across two different campaigns.
 *   - Once a non-empty UTM set is stored, later/different UTMs are ignored —
 *     first campaign touch wins.
 *   - `utm_landing_page` records the page on which the winning UTM set was
 *     seen, so the original `landing_page` stays intact while the campaign's
 *     own entry page is still recoverable.
 *   - If first-touch `referral_source` was unknown ("direct" or null) and we
 *     later backfill UTMs, it is upgraded to the campaign's `utm_source`. A
 *     genuine external referrer (linkedin, hackernews, ...) is never
 *     downgraded.
 *
 * TRADEOFF: if one session touches two different campaigns, only the first is
 * recorded. That is the accepted cost of first-touch. The bug being fixed here
 * was strictly worse — it recorded NEITHER. Switching to last-touch would
 * instead lose the true discovery source, which is the number we actually use
 * to decide where to spend. Storing full multi-touch history is out of scope
 * for a sessionStorage-backed signup form.
 */

export interface ReferralData {
  referral_source: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  landing_page: string | null
  /**
   * Page on which the stored UTM set was observed. May differ from
   * `landing_page` when the campaign was picked up mid-session. Optional so
   * records written by earlier deploys still parse.
   */
  utm_landing_page?: string | null
}

export const REFERRAL_STORAGE_KEY = 'vibe_referral_data'

/** UTM fields, treated as one atomic set. */
export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export type UtmKey = (typeof UTM_KEYS)[number]

// Map of known referrers to friendly names
const REFERRER_MAPPINGS: Record<string, string> = {
  'linkedin.com': 'linkedin',
  'www.linkedin.com': 'linkedin',
  'twitter.com': 'twitter',
  'x.com': 'twitter',
  'facebook.com': 'facebook',
  'www.facebook.com': 'facebook',
  'google.com': 'google',
  'www.google.com': 'google',
  'bing.com': 'bing',
  'www.bing.com': 'bing',
  'reddit.com': 'reddit',
  'www.reddit.com': 'reddit',
  'old.reddit.com': 'reddit',
  'news.ycombinator.com': 'hackernews',
  'youtube.com': 'youtube',
  'www.youtube.com': 'youtube',
  'github.com': 'github',
  'producthunt.com': 'producthunt',
  'www.producthunt.com': 'producthunt',
}

/** Normalise a raw `document.referrer` value to a friendly source name. */
export function normalizeReferrer(referrer: string | null | undefined): string | null {
  if (!referrer) return null

  try {
    const hostname = new URL(referrer).hostname.toLowerCase()

    // Our own domain is internal navigation, not a referral
    if (hostname.includes('vibebrowser.app')) return null

    if (REFERRER_MAPPINGS[hostname]) return REFERRER_MAPPINGS[hostname]

    return hostname.replace('www.', '')
  } catch {
    return null
  }
}

/** Read the referral source from `document.referrer` in the browser. */
export function getReferralSource(): string | null {
  if (typeof document === 'undefined') return null
  return normalizeReferrer(document.referrer)
}

/** Pull the five UTM params out of a query string. Empty strings become null. */
export function parseUtmParams(search: string): Record<UtmKey, string | null> {
  const params = new URLSearchParams(search)
  const out = {} as Record<UtmKey, string | null>
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    out[key] = value && value.trim() !== '' ? value : null
  }
  return out
}

/** True when at least one UTM field carries a value. */
export function hasUtmParams(data: Partial<ReferralData> | null | undefined): boolean {
  if (!data) return false
  return UTM_KEYS.some((key) => {
    const value = data[key]
    return typeof value === 'string' && value.trim() !== ''
  })
}

/**
 * Merge a freshly observed page view into whatever the session already holds.
 * See the scheme documented at the top of this file.
 */
export function mergeReferralData(
  existing: ReferralData | null,
  incoming: ReferralData,
): ReferralData {
  // First page of the session — nothing to reconcile.
  if (!existing) {
    return {
      ...incoming,
      utm_landing_page: hasUtmParams(incoming) ? incoming.landing_page : null,
    }
  }

  // First-touch landing page and referral source are immutable.
  const merged: ReferralData = { ...existing }

  // Backfill the UTM set only if we have not captured one yet.
  if (!hasUtmParams(existing) && hasUtmParams(incoming)) {
    for (const key of UTM_KEYS) {
      merged[key] = incoming[key]
    }
    merged.utm_landing_page = incoming.landing_page

    // Upgrade an unknown first-touch source to the campaign source. A real
    // external referrer already tells us more, so leave it alone.
    if (!existing.referral_source || existing.referral_source === 'direct') {
      merged.referral_source = incoming.utm_source ?? existing.referral_source
    }
  }

  return merged
}

/** Build a `ReferralData` record describing the page currently being viewed. */
export function buildCurrentReferralData(input: {
  search: string
  pathname: string | null
  referrer?: string | null
}): ReferralData {
  const utms = parseUtmParams(input.search)
  const referral_source = normalizeReferrer(input.referrer)

  return {
    referral_source: referral_source || utms.utm_source || 'direct',
    ...utms,
    landing_page: input.pathname,
    utm_landing_page: null,
  }
}

// --- sessionStorage helpers (browser only, no framework imports) ------------

function readStored(): ReferralData | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(REFERRAL_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ReferralData) : null
  } catch {
    return null
  }
}

/**
 * Capture / upgrade referral data for the page currently being viewed.
 *
 * Safe to call on every navigation: first-touch fields are preserved and only
 * a missing UTM set is ever filled in. Returns the record now in storage.
 */
export function captureReferralData(input: {
  search: string
  pathname: string | null
  referrer?: string | null
}): ReferralData | null {
  if (typeof sessionStorage === 'undefined') return null

  const existing = readStored()
  const incoming = buildCurrentReferralData(input)
  const merged = mergeReferralData(existing, incoming)

  // Avoid a pointless write (and a storage event) when nothing changed.
  if (!existing || JSON.stringify(existing) !== JSON.stringify(merged)) {
    try {
      sessionStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(merged))
    } catch {
      // Storage can be full or blocked (private mode) — attribution is
      // best-effort and must never break the signup flow.
    }
  }

  return merged
}

/** Read the stored referral data, if any. */
export function getStoredReferralData(): ReferralData | null {
  return readStored()
}

/** Clear referral data after a successful signup. */
export function clearReferralData(): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(REFERRAL_STORAGE_KEY)
  } catch {
    // ignore
  }
}
