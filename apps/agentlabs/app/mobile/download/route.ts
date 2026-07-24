import { NextResponse } from "next/server"

export const runtime = "nodejs"

const FALLBACK_URL = "https://github.com/VibeTechnologies/AgentPodMobile/releases/latest"

export function GET() {
  const target = process.env.NEXT_PUBLIC_APK_URL?.trim() || FALLBACK_URL
  return NextResponse.redirect(target, 302)
}
