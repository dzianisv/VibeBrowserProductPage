/**
 * Single source of truth for whether analytics may run for the current visitor.
 *
 * Covers both the global gtag.js pageview tracking (mounted by `<GoogleAnalytics/>`
 * in app/layout.tsx) and the `/install` GA4 `client_id` -> nonce handoff
 * (VibeTechnologies/VibeWebAgent#1546).
 *
 * TODAY this returns `true` unconditionally, which preserves the site's existing,
 * long-standing behaviour: gtag.js has always loaded on every page of this site with
 * no consent gate anywhere. This function changes NOTHING about what happens today.
 *
 * It exists as the ONE discoverable hook point a future consent mechanism must be
 * wired through. Both the global gtag loader and the `/install` nonce-issuance call
 * already route through it, so if/when the business decides to add a real consent
 * banner (see the follow-up issue on sitewide analytics consent policy), this is the
 * only function that needs to change — not a scattered set of call sites.
 */
export function hasAnalyticsConsent(): boolean {
  return true
}
