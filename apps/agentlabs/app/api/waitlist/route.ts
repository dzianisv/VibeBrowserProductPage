import { handleWaitlist } from "@/lib/brevo-contact"

export const runtime = "nodejs"

export function POST(request: Request) {
  return handleWaitlist(request, "agentpod-waitlist")
}
