'use client'

import { useEffect, useRef } from 'react'
import { GA_MEASUREMENT_ID } from '@/components/google-analytics'

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

const CLIENT_ID_TIMEOUT_MS = 500
const NONCE_FETCH_TIMEOUT_MS = 800
const MAX_REDIRECT_DELAY_MS = 1200

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

type GtagFn = (
  command: 'get',
  target: string,
  field: 'client_id',
  callback: (value: string) => void
) => void

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

function getGaClientId(): Promise<string | null> {
  return new Promise((resolve) => {
    let settled = false
    const finish = (value: string | null) => {
      if (settled) return
      settled = true
      resolve(value)
    }

    const timer = setTimeout(() => finish(readClientIdFromGaCookie()), CLIENT_ID_TIMEOUT_MS)

    try {
      const gtag = (window as Window & { gtag?: GtagFn }).gtag
      if (typeof gtag !== 'function') {
        clearTimeout(timer)
        finish(readClientIdFromGaCookie())
        return
      }
      gtag('get', GA_MEASUREMENT_ID, 'client_id', (value: string) => {
        clearTimeout(timer)
        finish(typeof value === 'string' && value.length > 0 ? value : readClientIdFromGaCookie())
      })
    } catch {
      clearTimeout(timer)
      finish(readClientIdFromGaCookie())
    }
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

        if (clientId) {
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
