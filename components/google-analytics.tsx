'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-EYZHHTHR57'

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Event tracking helper functions
export function trackEvent(
  eventName: string, 
  eventParams?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, eventParams)
  }
}

// Track waitlist signup with referral data
export function trackWaitlistSignup(params: {
  tier: string
  referral_source?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}) {
  trackEvent('generate_lead', {
    event_category: 'waitlist',
    event_label: params.tier,
    referral_source: params.referral_source || 'direct',
    utm_source: params.utm_source || '',
    utm_medium: params.utm_medium || '',
    utm_campaign: params.utm_campaign || '',
  })
}

// Track dialog opens
export function trackDialogOpen(dialogName: string) {
  trackEvent('dialog_open', {
    dialog_name: dialogName,
  })
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  })
}
