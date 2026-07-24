import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Public CDN (Cloudflare Worker mirror) — always the latest signed universal APK.
const FALLBACK_URL = "https://dl.agentlabs.cc/agentpod/openclaw-latest.apk"

export function GET() {
  const target = process.env.NEXT_PUBLIC_APK_URL?.trim() || FALLBACK_URL
  return NextResponse.redirect(target, 302)
}
