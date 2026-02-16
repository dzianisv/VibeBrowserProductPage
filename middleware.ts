import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  if (pathname === '/v2') {
    return NextResponse.redirect(new URL('/enterprise', request.url))
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
