'use client'

import { useEffect, useRef } from 'react'
import { GA_MEASUREMENT_ID } from '@/components/google-analytics'
import { hasAnalyticsConsent } from '@/lib/analytics-consent'

/**
 * `/install` welcome page — the browser-side half of the issue #1546 GA4 identity
 * bridge (VibeTechnologies/VibeWebAgent#1546).
 *
 * Why this exists: GA4 Measurement Protocol (server-to-server) can never synthesize
 * the reserved `first_visit`/`session_start` events — only a REAL `gtag.js` run in
 * an actual browser page does. The old `/install` route was a bare 302 redirect, so
 * no genuine `client_id` with a real `first_visit` was ever minted for the install
 * funnel. This page runs the site's existing gtag.js (mounted globally by
 * `app/layout.tsx` -> <GoogleAnalytics/>), reads the real `client_id`, and hands it
 * to the extension via a short-lived, HttpOnly, opaque nonce cookie (`vibe_ga_nonce`).
 *
 * Hard rule: this must NEVER block or delay the redirect to the Chrome Web Store.
 * Every step is time-boxed and fails open.
 *
 *   Timeouts (documented):
 *     - CLIENT_ID_TIMEOUT_MS (500ms): max wait for gtag('get', ..., 'client_id', cb).
 *       On timeout we fall back to parsing the real client_id out of the `_ga` cookie.
 *     - NONCE_FETCH_TIMEOUT_MS (800ms): abort the /api/install/nonce POST if it hangs.
 *     - MAX_REDIRECT_DELAY_MS (1200ms): absolute cap — redirect to the CWS no later
 *       than this after mount, no matter what gtag/nonce did. The redirect also fires
 *       immediately once the handoff attempt settles, so the happy path is well under a second.
 */

const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado'

// SEPARATE "VibeBrowser Extension" GA4 property (property id 538007690, data stream
// 14889947093) — NOT the site-wide "VibeBrowser Website" property that
// `GA_MEASUREMENT_ID` (G-EYZHHTHR57) already tracks on every page via
// <GoogleAnalytics/>. This page opens a SECOND, independent gtag.js stream for the
// extension property on the same load so a genuine first_visit/session_start is
// created SPECIFICALLY in property 538007690 (the property the backend relay,
// VibeTechnologies/VibeWebAgent#1551, forwards extension events to). Reusing the same
// client_id string does NOT transfer "New user" status across GA4 properties — each
// property independently decides whether it has seen a client_id before — so the
// extension property must receive its own real hit here, or it will never recognize
// the install.
//
// This is a PUBLIC, non-secret client-side identifier (same class as the
// `GA_MEASUREMENT_ID` default 'G-EYZHHTHR57' committed in components/google-analytics.tsx),
// so hardcoding the default is consistent with existing convention, not a secret.
const EXTENSION_GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_EXTENSION_MEASUREMENT_ID || 'G-LP618JZN7X'

const CLIENT_ID_TIMEOUT_MS = 500
const NONCE_FETCH_TIMEOUT_MS = 800
const MAX_REDIRECT_DELAY_MS = 1200

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

// gtag.js command surface used by this page. We need BOTH the existing
// `get`/`client_id` read AND the `config` command that opens the second (extension)
// stream, so the type carries both call signatures.
interface GtagFn {
  (command: 'get', target: string, field: 'client_id', callback: (value: string) => void): void
  (command: 'config', target: string, params?: Record<string, unknown>): void
}

// Guards the one-time `gtag('config', EXTENSION_GA_MEASUREMENT_ID)` call so the second
// stream is opened at most once per page load even if `tryGtag` were re-entered.
let extensionStreamConfigured = false

// Debug-mode toggle (OFF by default). Only when an operator explicitly opens
// `/install?ga_debug=1` do we tag the extension stream's hits with `debug_mode`, so a
// developer with GA4 Admin/DebugView access to property 538007690 can watch the real
// first_visit land in DebugView. Absent the param, production traffic is untouched.
function isGaDebugRequested(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('ga_debug') === '1'
  } catch {
    return false
  }
}

// Consent resolution for the /install handoff. In all real usage this is exactly
// `hasAnalyticsConsent()`. The `window.__vibeInstallAnalyticsConsent === false`
// override exists ONLY so the automated test suite can exercise the consent-withheld
// path deterministically; it can only DENY consent (force false), never grant it, so
// it can never expand tracking in production.
function installAnalyticsConsentGranted(): boolean {
  if (
    typeof window !== 'undefined' &&
    (window as Window & { __vibeInstallAnalyticsConsent?: boolean }).__vibeInstallAnalyticsConsent === false
  ) {
    return false
  }
  return hasAnalyticsConsent()
}

// GA4 `_ga` cookie format: `GA1.<subdomainDepth>.<clientId1>.<clientId2>`, where the
// real client_id is `<clientId1>.<clientId2>`. This is the documented fallback when
// the gtag('get') callback does not fire in time.
function readClientIdFromGaCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]+)/)
  if (!match) return null
  const raw = decodeURIComponent(match[1])
  const parts = raw.split('.')
  if (parts.length < 4) return null
  const clientId = parts.slice(2).join('.')
  return /^\d+\.\d+$/.test(clientId) ? clientId : null
}

// How often we re-check for `window.gtag` while waiting for the async gtag.js
// loader (mounted by <GoogleAnalytics/> via Next <Script strategy="afterInteractive">)
// to finish. Small enough to catch it the moment it lands, well within budget.
const GTAG_POLL_INTERVAL_MS = 25

function getGaClientId(): Promise<string | null> {
  return new Promise((resolve) => {
    let settled = false
    let pollTimer: ReturnType<typeof setTimeout> | undefined
    const finish = (value: string | null) => {
      if (settled) return
      settled = true
      if (pollTimer) clearTimeout(pollTimer)
      clearTimeout(backstop)
      resolve(value)
    }

    // Single absolute backstop bounding the WHOLE operation to CLIENT_ID_TIMEOUT_MS,
    // no matter which slow path we're on. It covers BOTH failure modes:
    //   (a) gtag.js never becomes available within the budget, and
    //   (b) gtag becomes available but its get-callback never fires.
    // On a genuine cold start (first navigation straight to /install) `window.gtag`
    // is very likely still undefined when this runs, because gtag.js loads
    // asynchronously — so we must WAIT for it rather than give up instantly. If the
    // budget elapses we fall back to parsing the `_ga` cookie (which itself only
    // exists once gtag.js has run at least once).
    const backstop = setTimeout(() => finish(readClientIdFromGaCookie()), CLIENT_ID_TIMEOUT_MS)

    const tryGtag = () => {
      if (settled) return

      let gtag: GtagFn | undefined
      try {
        gtag = (window as Window & { gtag?: GtagFn }).gtag
      } catch {
        finish(readClientIdFromGaCookie())
        return
      }

      if (typeof gtag === 'function') {
        // gtag is ready. Open the SECOND (extension) GA4 stream, then ask it for the
        // real client_id. The backstop still guards against the get-callback never firing.
        try {
          const consented = installAnalyticsConsentGranted()

          // Consent gating (same gate as the /api/install/nonce POST below):
          // `gtag('config', EXTENSION_GA_MEASUREMENT_ID)` opens a real second GA4 stream
          // and sends a genuine network hit to Google (creating the first_visit/
          // session_start in property 538007690), so it must NOT fire without analytics
          // consent — never silently expand tracking beyond what is already consented.
          // Fired exactly once per page load (extensionStreamConfigured guard). This is
          // ADDITIVE: the site-wide website stream (GA_MEASUREMENT_ID) keeps firing on
          // every page via <GoogleAnalytics/>, completely unaffected.
          if (consented && !extensionStreamConfigured) {
            extensionStreamConfigured = true
            const configParams: Record<string, unknown> = {}
            if (isGaDebugRequested()) {
              configParams.debug_mode = true
            }
            if (Object.keys(configParams).length > 0) {
              gtag('config', EXTENSION_GA_MEASUREMENT_ID, configParams)
            } else {
              gtag('config', EXTENSION_GA_MEASUREMENT_ID)
            }
          }

          // Read the client_id FOR the stream we hand off. When consented we read it
          // from the extension stream we just opened — its hits are what create the
          // real first_visit in property 538007690, and per Google's documented cookie
          // model the shared top-level `_ga` cookie makes this identical to the website
          // stream's client_id, so user continuity is preserved. When consent is
          // withheld the extension stream is never opened, so we read from the website
          // measurement id purely to resolve a value promptly; it is never handed off
          // because the nonce POST below is itself consent-gated.
          const clientIdTarget = consented ? EXTENSION_GA_MEASUREMENT_ID : GA_MEASUREMENT_ID
          gtag('get', clientIdTarget, 'client_id', (value: string) => {
            finish(typeof value === 'string' && value.length > 0 ? value : readClientIdFromGaCookie())
          })
        } catch {
          finish(readClientIdFromGaCookie())
        }
        return
      }

      // Not available yet — keep polling until gtag lands or the backstop fires.
      pollTimer = setTimeout(tryGtag, GTAG_POLL_INTERVAL_MS)
    }

    tryGtag()
  })
}

export function InstallClient() {
  const redirectedRef = useRef(false)

  useEffect(() => {
    const redirect = () => {
      if (redirectedRef.current) return
      redirectedRef.current = true
      window.location.replace(CHROME_WEB_STORE_URL)
    }

    // Absolute safety cap: the redirect can never be blocked longer than this.
    const hardTimer = setTimeout(redirect, MAX_REDIRECT_DELAY_MS)

    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const utm: Record<string, string> = {}
        for (const key of UTM_KEYS) {
          const value = params.get(key)
          if (value) utm[key] = value
        }

        // Capture the genuine gtag.js client_id whenever we can — regardless of UTM
        // presence. See PR description for the rationale: the whole point of #1546 is
        // real "New users" capture for ALL installs (most are organic / no UTM), and
        // the relay's nonce/issue contract makes utm_* optional. `vibe_attribution`
        // stays strictly utm_source-gated in proxy.ts and is unaffected by this.
        const clientId = await getGaClientId()

        // Same consent gate as the extension-stream config above and the global gtag
        // loader (lib/analytics-consent.ts). Returns true today, so the handoff behaves
        // exactly as before; this is the one place the /install nonce issuance is gated
        // by a future consent mechanism. Fails open into the redirect below regardless.
        if (clientId && installAnalyticsConsentGranted()) {
          const controller = new AbortController()
          const fetchTimer = setTimeout(() => controller.abort(), NONCE_FETCH_TIMEOUT_MS)
          try {
            await fetch('/api/install/nonce', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ client_id: clientId, ...utm }),
              signal: controller.signal,
              keepalive: true,
            })
          } catch {
            // Fail open — nonce is best-effort, never blocks the redirect.
          } finally {
            clearTimeout(fetchTimer)
          }
        }
      } catch {
        // Fail open — any unexpected error must still let the redirect happen.
      } finally {
        clearTimeout(hardTimer)
        redirect()
      }
    }

    void run()

    return () => clearTimeout(hardTimer)
  }, [])

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.1rem',
        background: '#0b0b0f',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.18)',
          borderTopColor: '#ffffff',
          animation: 'vibe-install-spin 0.8s linear infinite',
        }}
      />
      <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>Installing Vibe…</p>
      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        Taking you to the Chrome Web Store.
      </p>

      {/* No-JS fallback: still redirect + offer a manual link (mirrors the old
          route's guaranteed redirect for clients that never run our script). */}
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${CHROME_WEB_STORE_URL}`} />
        <a href={CHROME_WEB_STORE_URL} style={{ color: '#8ab4f8' }}>
          Continue to the Chrome Web Store
        </a>
      </noscript>

      <style>{`@keyframes vibe-install-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )
}
