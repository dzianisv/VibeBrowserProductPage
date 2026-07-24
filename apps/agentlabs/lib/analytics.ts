/**
 * Lightweight client-side analytics helper for the agentlabs site.
 *
 * The site's existing analytics provider is Google Analytics 4 (GA4), mounted
 * globally in `app/layout.tsx` via gtag (`G-EYZHHTHR57`). This helper wraps
 * gtag so product pages can fire funnel events without duplicating the
 * `window.gtag` guard everywhere. If PostHog is ever added to the site, its
 * global (`window.posthog`) is also called when present — harmless no-op today.
 */

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posthog?: { capture?: (event: string, props?: Record<string, any>) => void }
  }
}

/**
 * Fire a funnel/interaction event to whichever analytics providers are mounted.
 * Safe to call during SSR (no-ops off the browser).
 */
export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return
  try {
    window.gtag?.("event", event, params)
    window.posthog?.capture?.(event, params)
  } catch {
    // Never let analytics break the page.
  }
}
