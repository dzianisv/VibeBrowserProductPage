'use client'

import posthog from 'posthog-js'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-EYZHHTHR57'
const TELEMETRY_EVENTS_ENDPOINT = '/api/telemetry/events'

type TelemetryEventValue = string | number | boolean | null

function sendTelemetryEvent(
  eventName: string,
  eventParams?: Record<string, TelemetryEventValue>
) {
  if (typeof window === 'undefined') {
    return
  }

  const payload = JSON.stringify({
    eventName,
    pathname: window.location.pathname,
    properties: eventParams,
  })

  if (navigator.sendBeacon) {
    const beacon = new Blob([payload], { type: 'application/json' })
    navigator.sendBeacon(TELEMETRY_EVENTS_ENDPOINT, beacon)
    return
  }

  void fetch(TELEMETRY_EVENTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
    keepalive: true,
  })
}

// Fires a GA page_view on every SPA route change (Next.js App Router)
function GAPageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as Window & { gtag: (...args: unknown[]) => void }).gtag(
        'config',
        GA_MEASUREMENT_ID,
        {
          page_path: pathname,
          page_title: document.title,
          page_location: window.location.href,
        }
      )
    }
  }, [pathname])

  return null
}

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
      <GAPageTracker />
    </>
  )
}

// Event tracking helper functions
export function trackEvent(
  eventName: string, 
  eventParams?: Record<string, string | number | boolean>
) {
  const hasPostHogToken = Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY
  )

  if (typeof window !== 'undefined' && hasPostHogToken) {
    posthog.capture(eventName, eventParams)
  }

  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, eventParams)
  }

  sendTelemetryEvent(eventName, eventParams)
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

export function trackMailingListSignup(location: string) {
  trackEvent('mailing_list_signup', {
    location,
  })
}

// Track uninstall churn-survey submissions from the /uninstall page.
// `v` and `src` come from the query string that chrome.runtime.setUninstallURL
// appends (extension version + install source).
export function trackUninstallFeedback(params: {
  reason: string
  otherReason?: string
  v?: string | null
  src?: string | null
  email?: string | null
}) {
  trackEvent('uninstall_feedback', {
    reason: params.reason,
    other_reason: params.otherReason || '',
    v: params.v || '',
    src: params.src || '',
    email: params.email || '',
  })
}
