"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import {
  buildCurrentReferralData,
  captureReferralData,
  clearReferralData,
  getReferralSource,
  getStoredReferralData,
  hasUtmParams,
  mergeReferralData,
  normalizeReferrer,
  parseUtmParams,
  REFERRAL_STORAGE_KEY,
  UTM_KEYS,
  type ReferralData,
  type UtmKey,
} from './referral-tracking-core'

// The attribution scheme (first-touch landing + first non-empty UTM set) is
// documented in ./referral-tracking-core.ts. This module is the client-side
// entry point; the core is framework-free so it can be unit-tested.
export {
  buildCurrentReferralData,
  captureReferralData,
  clearReferralData,
  getReferralSource,
  getStoredReferralData,
  hasUtmParams,
  mergeReferralData,
  normalizeReferrer,
  parseUtmParams,
  REFERRAL_STORAGE_KEY,
  UTM_KEYS,
}
export type { ReferralData, UtmKey }

/** Snapshot of the page currently being viewed, for the capture helpers. */
function currentPageInput() {
  return {
    search: window.location.search,
    pathname: window.location.pathname,
    referrer: document.referrer,
  }
}

/**
 * Capture referral data for the current page.
 *
 * Despite the historical name this is safe to call on every navigation, not
 * just the first load: first-touch landing page and referral source are kept,
 * while a campaign UTM set arriving later in the session is still recorded.
 * That later-UTM case is exactly what this function used to drop on the floor.
 */
export function captureReferralDataOnLoad(): ReferralData | null {
  if (typeof window === 'undefined') return null
  return captureReferralData(currentPageInput())
}

/**
 * Capture the current page, then return the merged session record.
 *
 * Used by the waitlist dialogs so that opening the form on a URL carrying UTMs
 * records them even when the session started on a UTM-free page.
 */
export function captureAndGetReferralData(): ReferralData | null {
  if (typeof window === 'undefined') return null
  return captureReferralData(currentPageInput()) ?? getStoredReferralData()
}

/**
 * React hook returning the session's referral data, refreshed on navigation.
 *
 * Keyed on `usePathname()` rather than `useSearchParams()` so it does not force
 * a Suspense boundary on every consumer; the live query string is read inside
 * the effect. The waitlist dialogs additionally call
 * `captureAndGetReferralData()` on open, which covers query-only URL changes.
 */
export function useReferralTracking(): ReferralData | null {
  const pathname = usePathname()
  const [referralData, setReferralData] = useState<ReferralData | null>(null)

  useEffect(() => {
    setReferralData(captureReferralDataOnLoad())
  }, [pathname])

  return referralData
}
