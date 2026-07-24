import { NextResponse } from "next/server"
import { addContactToBrevo, agentPodListId, parseEmailFromRequest } from "@/lib/brevo-contact"
import { addMemberToGroup } from "@/lib/google-groups"

export const runtime = "nodejs"

const PLAY_OPT_IN_URL = "https://play.google.com/apps/internaltest/4701574809387172305"

export async function POST(request: Request) {
  const email = await parseEmailFromRequest(request)
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  // Add to the Google Group backing the Play internal-test track.
  const group = await addMemberToGroup(email)

  // Best-effort: also capture on the Brevo list. A Brevo failure must not block
  // the tester enrollment, so we only surface a hard error if the group add
  // failed for a reason other than the account being unconfigured.
  const brevo = await addContactToBrevo(email, agentPodListId(), "play-tester").catch(() => ({
    ok: false,
    status: 502,
  }))

  if (!group.ok) {
    const status = group.status === 503 ? 503 : 502
    return NextResponse.json(
      {
        error:
          status === 503
            ? "Early access is temporarily unavailable. Please try again later."
            : "We could not enroll you right now. Please try again.",
      },
      { status },
    )
  }

  return NextResponse.json({
    ok: true,
    already: group.already,
    brevo: brevo.ok,
    optInUrl: PLAY_OPT_IN_URL,
  })
}
