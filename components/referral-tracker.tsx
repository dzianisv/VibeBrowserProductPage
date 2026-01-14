"use client"

import { useEffect } from 'react'
import { captureReferralDataOnLoad } from '@/lib/referral-tracking'

/**
 * ReferralTracker - Captures referral source data on initial page load
 * 
 * This component must be mounted early in the app because:
 * 1. document.referrer gets cleared when user navigates within the site
 * 2. UTM parameters in the URL may be lost if user navigates to another page
 * 
 * Data is stored in sessionStorage and persists until the user signs up or closes the tab.
 */
export function ReferralTracker() {
  useEffect(() => {
    // Capture referral data immediately on mount
    captureReferralDataOnLoad()
  }, [])

  // This component doesn't render anything
  return null
}
