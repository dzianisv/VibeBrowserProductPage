import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// `/install` UTM attribution cookie. Preserves the exact server-side behaviour of
// the old `app/install/route.ts` bare-redirect handler (PR #138): host-only on
// www.vibebrowser.app, no JavaScript required, read back by the extension's
// captureInstallAttribution() (extension PR #1528). `/install` is now a real
// gtag.js welcome page (app/install/page.tsx), so this cookie is set here instead
// of during a route-handler redirect. The paired `vibe_ga_nonce` cookie is NOT set
// here — it needs a real client_id and is issued by app/api/install/nonce/route.ts.
const ATTRIBUTION_COOKIE_NAME = 'vibe_attribution'
const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Canonical apex -> www redirect as an explicit, code-level guarantee — NOT a
  // reliance on external Cloudflare/DNS/Vercel domain config (which is out-of-band
  // and could silently break/misconfigure). This install funnel's cookies
  // (`vibe_ga_nonce`, `vibe_attribution`) are host-only, scoped to
  // www.vibebrowser.app, and the extension reads `vibe_ga_nonce` from
  // https://www.vibebrowser.app/ via chrome.cookies.get. Every visitor MUST
  // therefore reach /install's logic on the www host, never the bare apex.
  // Running this BEFORE the /install cookie-setting below also guarantees those
  // cookies are never mistakenly written on the apex origin. Only the exact bare
  // apex `vibebrowser.app` is redirected; `www.`, `enterprise.`, `teams.`, and
  // preview/localhost hosts are untouched. Full path + query string are preserved
  // (critical: utm_* attribution params must survive). 308 is the permanent,
  // method-preserving counterpart of the 307 the external infra currently emits —
  // canonical/SEO-friendly and correct for any request type.
  const bareHost = hostname.split(':')[0]
  if (bareHost === 'vibebrowser.app') {
    const targetHost = hostname.replace(/^vibebrowser\.app/, 'www.vibebrowser.app')
    const location = `https://${targetHost}${pathname}${request.nextUrl.search}`
    return NextResponse.redirect(location, 308)
  }

  if (pathname === '/v2') {
    return NextResponse.redirect(new URL('/enterprise', request.url))
  }

  if (pathname === '/install') {
    const response = NextResponse.next()
    const source = request.nextUrl.searchParams.get('utm_source')

    if (source) {
      const medium = request.nextUrl.searchParams.get('utm_medium')
      const campaign = request.nextUrl.searchParams.get('utm_campaign')
      const term = request.nextUrl.searchParams.get('utm_term')
      const content = request.nextUrl.searchParams.get('utm_content')

      const payload = {
        source,
        ...(medium ? { medium } : {}),
        ...(campaign ? { campaign } : {}),
        ...(term ? { term } : {}),
        ...(content ? { content } : {}),
        capturedAt: Date.now(),
      }

      response.cookies.set(ATTRIBUTION_COOKIE_NAME, JSON.stringify(payload), {
        path: '/',
        maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      })
    }

    return response
  }

  // Handle enterprise.vibebrowser.app subdomain
  if (hostname.startsWith('enterprise.')) {
    // Rewrite root to /enterprise (enterprise page)
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/enterprise', request.url))
    }
    // /tee stays as /tee (security whitepaper)
    if (pathname === '/tee') {
      return NextResponse.next()
    }
    // /privacy and /terms stay the same
    if (pathname === '/privacy' || pathname === '/terms') {
      return NextResponse.next()
    }
  }

  // Handle teams.vibebrowser.app subdomain
  if (hostname.startsWith('teams.')) {
    // Rewrite root to /teams (teams page)
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/teams', request.url))
    }
    // /privacy and /terms stay the same
    if (pathname === '/privacy' || pathname === '/terms') {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|icon.png).*)',
  ],
}
