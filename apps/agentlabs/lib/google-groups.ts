import crypto from "node:crypto"

type ServiceAccount = {
  client_email: string
  private_key: string
}

function base64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

function loadServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_GROUPS_SA_JSON
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ServiceAccount
    if (!parsed.client_email || !parsed.private_key) return null
    // Support keys stored with escaped newlines.
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n")
    return parsed
  } catch {
    return null
  }
}

const TOKEN_URI = "https://oauth2.googleapis.com/token"
const SCOPE = "https://www.googleapis.com/auth/admin.directory.group.member"

async function mintAccessToken(sa: ServiceAccount, subject: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claim = base64Url(
    JSON.stringify({
      iss: sa.client_email,
      sub: subject,
      scope: SCOPE,
      aud: TOKEN_URI,
      iat: now,
      exp: now + 3600,
    }),
  )
  const signingInput = `${header}.${claim}`
  const signer = crypto.createSign("RSA-SHA256")
  signer.update(signingInput)
  signer.end()
  const signature = base64Url(signer.sign(sa.private_key))
  const assertion = `${signingInput}.${signature}`

  const response = await fetch(TOKEN_URI, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  }).catch(() => null)

  if (!response || !response.ok) return null
  const json = (await response.json().catch(() => null)) as { access_token?: string } | null
  return json?.access_token ?? null
}

export type GroupAddResult = { ok: boolean; already: boolean; status: number }

/**
 * Add an email to the Google Group that backs the Play internal-test track.
 * Uses a domain-wide-delegated service account impersonating a Workspace admin.
 * A 409 (already a member) is treated as success.
 */
export async function addMemberToGroup(email: string): Promise<GroupAddResult> {
  const sa = loadServiceAccount()
  const group = process.env.GOOGLE_GROUPS_TARGET || "beta-testers@agentlabs.cc"
  const subject = process.env.GOOGLE_GROUPS_ADMIN || "admin@agentlabs.cc"
  if (!sa) {
    console.error("[play-tester] Google Groups SA is not configured")
    return { ok: false, already: false, status: 503 }
  }

  const token = await mintAccessToken(sa, subject)
  if (!token) {
    console.error("[play-tester] Could not mint Google access token")
    return { ok: false, already: false, status: 502 }
  }

  const response = await fetch(
    `https://admin.googleapis.com/admin/directory/v1/groups/${encodeURIComponent(group)}/members`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ email, role: "MEMBER", delivery_settings: "NONE" }),
      cache: "no-store",
    },
  ).catch(() => null)

  if (!response) return { ok: false, already: false, status: 502 }
  if (response.ok) return { ok: true, already: false, status: response.status }
  if (response.status === 409) return { ok: true, already: true, status: 409 }

  console.error("[play-tester] Directory members.insert failed", response.status)
  return { ok: false, already: false, status: 502 }
}
