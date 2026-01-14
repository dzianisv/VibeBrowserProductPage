"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export interface ReferralData {
  referral_source: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  landing_page: string | null
}

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

function getReferralSource(): string | null {
  if (typeof window === 'undefined') return null
  
  const referrer = document.referrer
  if (!referrer) return null
  
  try {
    const url = new URL(referrer)
    const hostname = url.hostname.toLowerCase()
    
    // Check if it's our own domain (not a referral)
    if (hostname.includes('vibebrowser.app')) return null
    
    // Check known mappings
    if (REFERRER_MAPPINGS[hostname]) {
      return REFERRER_MAPPINGS[hostname]
    }
    
    // Return the hostname for unknown referrers
    return hostname.replace('www.', '')
  } catch {
    return null
  }
}

// Capture referral data immediately on page load
// This must run ASAP because document.referrer gets cleared on navigation
export function captureReferralDataOnLoad(): void {
  if (typeof window === 'undefined') return
  
  // Only capture once per session - don't overwrite existing data
  const existingData = sessionStorage.getItem('vibe_referral_data')
  if (existingData) return
  
  const params = new URLSearchParams(window.location.search)
  const referral_source = getReferralSource()
  
  const data: ReferralData = {
    referral_source: referral_source || params.get('utm_source') || 'direct',
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    landing_page: window.location.pathname,
  }
  
  sessionStorage.setItem('vibe_referral_data', JSON.stringify(data))
}

export function useReferralTracking(): ReferralData {
  const searchParams = useSearchParams()
  const [referralData, setReferralData] = useState<ReferralData>({
    referral_source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    landing_page: null,
  })

  useEffect(() => {
    // Get UTM parameters from URL
    const utm_source = searchParams.get('utm_source')
    const utm_medium = searchParams.get('utm_medium')
    const utm_campaign = searchParams.get('utm_campaign')
    const utm_term = searchParams.get('utm_term')
    const utm_content = searchParams.get('utm_content')
    
    // Get referral source from document.referrer
    const referral_source = getReferralSource()
    
    // Get current landing page
    const landing_page = typeof window !== 'undefined' ? window.location.pathname : null

    const data: ReferralData = {
      referral_source: referral_source || utm_source || null,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      landing_page,
    }

    // Store in session storage for persistence across dialog opens
    if (typeof window !== 'undefined') {
      const existingData = sessionStorage.getItem('vibe_referral_data')
      if (!existingData) {
        sessionStorage.setItem('vibe_referral_data', JSON.stringify(data))
      }
    }

    setReferralData(data)
  }, [searchParams])

  return referralData
}

// Function to get stored referral data (for use in server actions)
export function getStoredReferralData(): ReferralData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = sessionStorage.getItem('vibe_referral_data')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore parse errors
  }
  
  return null
}

// Clear referral data after successful signup
export function clearReferralData(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('vibe_referral_data')
  }
}
