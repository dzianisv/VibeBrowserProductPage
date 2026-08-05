"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureReferralDataOnLoad } from '@/lib/referral-tracking'

/**
 * ReferralTracker - Captures referral / campaign attribution data.
 *
 * Runs on initial load AND on every client-side navigation, because:
 * 1. document.referrer gets cleared when the user navigates within the site.
 * 2. UTM parameters may appear on a LATER page in the session (e.g. the user
 *    browses /blog first, then clicks an ad landing on /cloud?utm_source=...).
 *    Only capturing once meant those campaign UTMs were silently dropped and
 *    the signup looked like direct traffic.
 *
 * The capture helper is idempotent: first-touch landing page and referral
 * source are preserved, and only a missing UTM set is backfilled. See
 * lib/referral-tracking-core.ts for the full scheme.
 *
 * Data lives in sessionStorage until the user signs up or closes the tab.
 */
export function ReferralTracker() {
  const pathname = usePathname()

  useEffect(() => {
    captureReferralDataOnLoad()
  }, [pathname])

  // This component doesn't render anything
  return null
}
