import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * First-party bridge that turns a REAL gtag.js `client_id` (captured by the
 * `/install` welcome page in the browser) into an opaque one-time nonce, and
 * hands that nonce to the extension via an HttpOnly cookie.
 *
 * Flow (issue VibeTechnologies/VibeWebAgent#1546):
 *   install page JS  --POST { client_id, utm_* }-->  this route (www.vibebrowser.app)
 *   this route       --POST { client_id, utm_* }-->  api.vibebrowser.app /api/analytics/nonce/issue  (PR #1551)
 *   PR #1551         --{ nonce, expires_at }-------->  this route
 *   this route       --Set-Cookie: vibe_ga_nonce----->  browser (HttpOnly)
 *   extension (PR #1552) later reads vibe_ga_nonce via chrome.cookies.get and exchanges it.
 *
 * The real `client_id` only ever travels browser -> this first-party server over
 * HTTPS, then server -> our own relay. It is never placed in the redirect URL,
 * page HTML, or any client-JS-readable cookie. Only the opaque `nonce` leaves in
 * cookie form, and it is HttpOnly so page JS cannot read it either.
 */

const NONCE_COOKIE_NAME = 'vibe_ga_nonce'
const NONCE_COOKIE_MAX_AGE = 300 // 5 minutes — matches the relay nonce TTL (PR #1551)

// Server-to-server relay base (never exposed to the browser). Defaults to prod;
// overridable via env for local tests that mock the PR #1551 boundary.
const ANALYTICS_API_BASE = process.env.ANALYTICS_API_BASE || 'https://api.vibebrowser.app'

// Bound the upstream call so a slow/hung relay can never delay the install redirect.
const UPSTREAM_TIMEOUT_MS = 800

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

// Explicit allowlist of this site's real own origins. `/install` (the only
// legitimate caller of this route) is served canonically from www.vibebrowser.app
// (see app/layout.tsx metadataBase/canonical); the apex vibebrowser.app is also a
// valid host for this deployment, so both are trusted.
const STATIC_ALLOWED_ORIGINS = ['https://www.vibebrowser.app', 'https://vibebrowser.app']

function isLoopbackHost(host: string): boolean {
  const h = host.split(':')[0]
  return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '[::1]'
}

// The request's own Host is same-origin by definition, so derive an allowed origin
// from it too. This covers preview deployments (*.vercel.app) and local dev/test
// without hard-coding them, while http is only trusted for loopback hosts.
function buildAllowedOrigins(host: string | null): Set<string> {
  const allowed = new Set(STATIC_ALLOWED_ORIGINS)
  if (host) {
    allowed.add(`https://${host}`)
    if (isLoopbackHost(host)) {
      allowed.add(`http://${host}`)
    }
  }
  return allowed
}

/**
 * Same-origin enforcement (security review FINDING 1). This route sets a cookie for
 * this domain with no session/credentials required, so without an origin check a
 * malicious cross-site page could POST an attacker-chosen `client_id` and poison the
 * victim's extension GA4 identity. Defense is layered:
 *   1. PRIMARY — the `Origin` header must be present and in the allowlist. A same-origin
 *      POST fetch from the /install page always sends `Origin`; a missing or foreign
 *      Origin on this state-changing endpoint is treated as untrusted (never "allow").
 *   2. SECONDARY — when present, `Sec-Fetch-Site` (set automatically by modern browsers,
 *      unspoofable by page JS) must be `same-origin`. This is belt-and-suspenders on top
 *      of the Origin check, not a replacement, since older clients omit it.
 */
function isSameOriginRequest(request: Request): boolean {
  const secFetchSite = request.headers.get('sec-fetch-site')
  if (secFetchSite && secFetchSite !== 'same-origin') {
    return false
  }

  const origin = request.headers.get('origin')
  if (!origin) {
    return false
  }

  return buildAllowedOrigins(request.headers.get('host')).has(origin)
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    // Reject before touching the body, the cookie, or the upstream relay.
    return NextResponse.json({ ok: false, error: 'cross_origin_forbidden' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const clientId = typeof body.client_id === 'string' ? body.client_id : ''
  if (!clientId) {
    return NextResponse.json({ ok: false, error: 'client_id_required' }, { status: 400 })
  }

  // Match the relay's `nonce/issue` contract: client_id required, utm_* optional
  // strings. UTM keys are forwarded only when actually present (mirrors #138 optionality).
  const issueBody: Record<string, string> = { client_id: clientId }
  for (const key of UTM_KEYS) {
    const value = body[key]
    if (typeof value === 'string' && value.length > 0) {
      issueBody[key] = value
    }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const upstream = await fetch(`${ANALYTICS_API_BASE}/api/analytics/nonce/issue`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(issueBody),
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!upstream.ok) {
      // Fail open: no cookie, page still redirects to the Chrome Web Store.
      return NextResponse.json({ ok: false, error: 'issue_failed' }, { status: 502 })
    }

    const data = (await upstream.json()) as { nonce?: unknown }
    const nonce = typeof data.nonce === 'string' ? data.nonce : ''
    if (!nonce) {
      return NextResponse.json({ ok: false, error: 'no_nonce' }, { status: 502 })
    }

    const response = NextResponse.json({ ok: true })
    // Mirrors the old `vibe_attribution` cookie mechanics (path=/, host-only, Secure,
    // HttpOnly, SameSite=Lax) but with the nonce-only value and a short 5-min TTL.
    response.cookies.set(NONCE_COOKIE_NAME, nonce, {
      path: '/',
      maxAge: NONCE_COOKIE_MAX_AGE,
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    })
    return response
  } catch {
    // Timeout / network error / relay down — fail open, no cookie.
    return NextResponse.json({ ok: false, error: 'issue_error' }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}
