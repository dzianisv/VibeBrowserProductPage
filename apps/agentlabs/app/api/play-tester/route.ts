import { NextResponse } from "next/server"
import { addContactToBrevo, agentPodListId, parseEmailFromRequest } from "@/lib/brevo-contact"
import { addMemberToGroup } from "@/lib/google-groups"

export const runtime = "nodejs"

// ⚠️ AGENTPOD-SCOPED — DO NOT REUSE THIS ENDPOINT FOR ANOTHER PRODUCT.
// This is AgentPod Mobile's internal-test track (Play console app AgentPod Mobile,
// backed by the `beta-testers@agentlabs.cc` Google Group). Any page that POSTs here
// enrolls the visitor in *AgentPod's* test build regardless of which product they
// came for. This already shipped once by accident on /products/mystic-tarot and had
// to be reverted — a tarot visitor was being pointed at an unrelated app.
// Before another product can use this route it must be parameterized: a per-product
// internal-test track URL (read from that app's Play Console — never guessed) plus a
// per-product Brevo list, selected from an explicit product key in the request.
// Follow-up: "Parameterize /api/play-tester per product (Brevo list + internal-test track)".
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
  //
  // ⚠️ AGENTPOD-SCOPED: `agentPodListId()` is BREVO_AGENTPOD_LIST_ID (list 9,
  // "AgentPod Mobile"). Callers from any other product would silently land on
  // AgentPod's mailing list — misleading collection of personal data. Parameterize
  // the list per product before reusing this route. See the note on PLAY_OPT_IN_URL.
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
