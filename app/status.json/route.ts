import { NextResponse } from 'next/server'
import { getCachedStatusPayload } from '@/lib/status-cache'

// Machine-readable counterpart of /status (AGE-1095). Served dynamically
// from the same in-process, TTL-cached generator the HTML page uses --
// there is no static file and no commit-triggered rebuild in this path.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const payload = await getCachedStatusPayload()
  return NextResponse.json(payload, {
    headers: {
      // Allow the freshness-check workflow (and any CDN edge) to reuse a
      // response for a few seconds, but never long enough to outlive the
      // in-process TTL cache or mask a real outage.
      'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=30',
    },
  })
}
