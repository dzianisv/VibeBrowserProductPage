import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Handle incognito.vibebrowser.app subdomain
  if (hostname.startsWith('incognito.')) {
    // Rewrite root to /v2 (incognito page)
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/v2', request.url))
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
