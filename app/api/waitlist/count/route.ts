import { NextResponse } from 'next/server'

import { handleWaitlistCountRequest } from '@/lib/waitlist-count'

/**
 * Authenticated waitlist SIZE endpoint — the stable path the daily snapshot job
 * uses to read Brevo.
 *
 * WHY THIS EXISTS
 * ---------------
 * Brevo enforces an IP allowlist on API keys. GitHub-hosted runners get a fresh
 * egress IP on every run, so `.github/workflows/waitlist-snapshot.yml` calling
 * Brevo directly failed with 401 "unrecognised IP address" (run 31679376529).
 * Vercel's production runtime already talks to Brevo for live signups, so its
 * egress is authorized; routing the snapshot through this route makes the runner
 * IP irrelevant WITHOUT widening the Brevo allowlist.
 *
 * All auth and Brevo access live in lib/waitlist-count.ts so they are unit
 * testable; this file is only the HTTP adapter.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { status, body } = await handleWaitlistCountRequest(request.headers.get('authorization'))
  return NextResponse.json(body, { status, headers: { 'cache-control': 'no-store' } })
}
