import { NextResponse } from "next/server"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null
  const email = value.trim().toLowerCase()
  if (!email || email.length > 254 || !emailPattern.test(email)) return null
  return email
}

export async function parseEmailFromRequest(request: Request): Promise<string | null> {
  const body: unknown = await request.json().catch(() => null)
  if (typeof body === "object" && body !== null && "email" in body) {
    return normalizeEmail((body as { email: unknown }).email)
  }
  return null
}

export type BrevoResult = { ok: boolean; status: number }

/**
 * Add (or update) a contact on a Brevo list. Duplicate contacts are treated as
 * success because `updateEnabled: true` upserts them. Returns a structured
 * result so callers (waitlist, play-tester) can compose their own responses.
 */
export async function addContactToBrevo(
  email: string,
  listId: number,
  label: string,
): Promise<BrevoResult> {
  const key = process.env.BREVO_API_KEY
  if (!key || !Number.isInteger(listId) || listId < 1) {
    console.error(`[${label}] Brevo is not configured`)
    return { ok: false, status: 503 }
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": key,
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    cache: "no-store",
  }).catch((error: unknown) => {
    console.error(`[${label}] Brevo request failed`, error)
    return null
  })

  if (!response) return { ok: false, status: 502 }

  // 201 = created, 204 = updated existing. Both are success.
  if (response.ok) return { ok: true, status: response.status }

  // Duplicate contact without update still means the address is captured.
  if (response.status === 400) {
    const detail = (await response.json().catch(() => null)) as { code?: string } | null
    if (detail?.code === "duplicate_parameter") return { ok: true, status: 200 }
  }

  console.error(`[${label}] Brevo rejected signup`, response.status)
  return { ok: false, status: 502 }
}

function agentPodListId(): number {
  return Number.parseInt(process.env.BREVO_AGENTPOD_LIST_ID ?? "", 10)
}

/** NextResponse wrapper used by the plain waitlist endpoint. */
export async function handleWaitlist(request: Request, label: string): Promise<NextResponse> {
  const email = await parseEmailFromRequest(request)
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  const result = await addContactToBrevo(email, agentPodListId(), label)
  if (result.ok) return NextResponse.json({ ok: true })

  if (result.status === 503) {
    return NextResponse.json(
      { error: "The waitlist is temporarily unavailable. Please try again later." },
      { status: 503 },
    )
  }
  return NextResponse.json(
    { error: "We could not add you right now. Please try again." },
    { status: 502 },
  )
}

export { agentPodListId }
