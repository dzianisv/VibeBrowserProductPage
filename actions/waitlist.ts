"use server"

/**
 * Waitlist / mailing-list server actions — Brevo is the single source of truth.
 *
 * There is no database behind this: contacts live on the Brevo list identified
 * by `BREVO_LIST_ID`, and all reads (admin dashboard, stats, CSV export) go
 * straight to the Brevo Contacts API. Signup uses `updateEnabled: true`, so a
 * repeat signup is an upsert, not an error.
 *
 * Required env (set in Vercel project settings and `.env.local`):
 *   BREVO_API_KEY  — Brevo v3 API key
 *   BREVO_LIST_ID  — numeric id of the waitlist contact list
 * Optional:
 *   RESEND_API_KEY — enables the internal "new signup" notification email
 */

const BREVO_API = "https://api.brevo.com/v3"

type ResendLike = { emails: { send: (data: unknown) => Promise<unknown> } }

let resendClient: ResendLike | null = null

async function getResendClient(): Promise<ResendLike | null> {
  if (resendClient) return resendClient

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null

  try {
    const { Resend } = await import("resend")
    resendClient = new Resend(apiKey) as unknown as ResendLike
    return resendClient
  } catch {
    console.log("Resend not configured - email notifications disabled")
    return null
  }
}

type BrevoConfig = { apiKey: string; listId: number }

function getBrevoConfig(): BrevoConfig | null {
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number.parseInt(process.env.BREVO_LIST_ID ?? "", 10)

  if (!apiKey || !Number.isInteger(listId) || listId < 1) return null
  return { apiKey, listId }
}

const NOT_CONFIGURED = { success: false as const, message: "Brevo is not configured" }

type BrevoAttributes = Record<string, string | null>

/**
 * Upsert a contact onto the Brevo list. `updateEnabled: true` means duplicates
 * are updated rather than rejected — 201 (created) and 204 (updated) are both
 * success, and a 400 `duplicate_parameter` still means the address is captured.
 */
async function upsertBrevoContact(
  email: string,
  attributes: BrevoAttributes,
  config: BrevoConfig,
): Promise<{ ok: boolean; status: number }> {
  const response = await fetch(`${BREVO_API}/contacts`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": config.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      listIds: [config.listId],
      updateEnabled: true,
      attributes,
    }),
    cache: "no-store",
  }).catch((error: unknown) => {
    console.error("[waitlist] Brevo request failed", error)
    return null
  })

  if (!response) return { ok: false, status: 502 }
  if (response.ok) return { ok: true, status: response.status }

  if (response.status === 400) {
    const detail = (await response.json().catch(() => null)) as { code?: string } | null
    if (detail?.code === "duplicate_parameter") return { ok: true, status: 200 }
  }

  console.error("[waitlist] Brevo rejected signup", response.status)
  return { ok: false, status: 502 }
}

export interface ReferralData {
  referral_source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  landing_page?: string
}

export async function joinWaitlist(
  email: string,
  tier: string = "free",
  referralData?: ReferralData,
) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." }
  }

  const config = getBrevoConfig()
  if (!config) return NOT_CONFIGURED

  try {
    const result = await upsertBrevoContact(
      email,
      {
        TIER: tier,
        SOURCE: referralData?.referral_source || "website",
        UTM_SOURCE: referralData?.utm_source || null,
        UTM_MEDIUM: referralData?.utm_medium || null,
        UTM_CAMPAIGN: referralData?.utm_campaign || null,
        LANDING_PAGE: referralData?.landing_page || null,
      },
      config,
    )

    if (!result.ok) {
      return { success: false, message: "Failed to join waitlist. Please try again." }
    }

    // Internal notification email (optional — only when Resend is configured).
    const resend = await getResendClient()
    if (resend) {
      try {
        await resend.emails.send({
          from: "Vibe Browser <noreply@vibebrowser.app>",
          to: ["info@vibebrowser.app"],
          subject: "New Waitlist Signup - Vibe Browser",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">New Waitlist Signup</h2>
              <p>A new user has joined the Vibe Browser waitlist:</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Tier:</strong> ${tier}</p>
                <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
                ${referralData?.referral_source ? `<p><strong>Referral Source:</strong> ${referralData.referral_source}</p>` : ""}
                ${referralData?.utm_source ? `<p><strong>UTM Source:</strong> ${referralData.utm_source}</p>` : ""}
                ${referralData?.utm_medium ? `<p><strong>UTM Medium:</strong> ${referralData.utm_medium}</p>` : ""}
                ${referralData?.utm_campaign ? `<p><strong>UTM Campaign:</strong> ${referralData.utm_campaign}</p>` : ""}
              </div>
              <p>You can view all waitlist signups in your admin dashboard.</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This notification was sent automatically from the Vibe Browser waitlist system.
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error("[waitlist] Failed to send notification email:", emailError)
        // Never fail the signup because the internal notification failed.
      }
    }

    return { success: true, message: "You're on the list! We'll be in touch soon." }
  } catch (error) {
    console.error("[waitlist] Error joining waitlist:", error)
    return { success: false, message: "Failed to join waitlist. Please try again." }
  }
}

/**
 * Tier assigned to footer / dev mailing-list subscribers.
 *
 * These are NOT waitlist signups: they never picked a plan, they just handed us
 * an address. Tagging them explicitly keeps them separable from genuine
 * free-tier waitlist signups in the admin dashboard and the CSV export —
 * previously they were sent with no TIER at all and `mapContact` silently
 * relabelled them "free", inflating the free-tier count.
 *
 * Not exported: a "use server" module may only export async functions.
 */
const MAILING_LIST_TIER = "newsletter"
const MAILING_LIST_SOURCE = "mailing_list"

/** Subscribe to the dev mailing list (same Brevo list, different SOURCE tag). */
export async function subscribeToMailingList(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." }
  }

  const config = getBrevoConfig()
  if (!config) return NOT_CONFIGURED

  try {
    const result = await upsertBrevoContact(
      email,
      { TIER: MAILING_LIST_TIER, SOURCE: MAILING_LIST_SOURCE },
      config,
    )
    if (!result.ok) {
      return { success: false, message: "Failed to subscribe. Please try again." }
    }
    return { success: true, message: "You're subscribed! Check your inbox." }
  } catch (error) {
    console.error("[waitlist] Mailing list subscribe error:", error)
    return { success: false, message: "Failed to subscribe. Please try again." }
  }
}

export interface WaitlistSignup {
  id: string
  email: string
  tier: string
  source: string
  referral_source: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  landing_page: string | null
  metadata: Record<string, unknown> | null
  confirmed: boolean
  created_at: string
}

interface BrevoContact {
  id?: number | string
  email?: string
  createdAt?: string
  emailBlacklisted?: boolean
  attributes?: Record<string, unknown>
}

function str(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null
  return String(value)
}

function mapContact(contact: BrevoContact): WaitlistSignup {
  const attributes = contact.attributes ?? {}
  const source = str(attributes.SOURCE)
  // Legacy contacts predate the explicit TIER on the mailing-list path, so fall
  // back on SOURCE rather than defaulting every untagged contact to "free" —
  // that default is what made footer subscribers masquerade as waitlist signups.
  const defaultTier = source === MAILING_LIST_SOURCE ? MAILING_LIST_TIER : "free"
  return {
    id: String(contact.id ?? contact.email ?? ""),
    email: contact.email ?? "",
    tier: str(attributes.TIER) ?? defaultTier,
    source: source ?? "website",
    referral_source: source,
    utm_source: str(attributes.UTM_SOURCE),
    utm_medium: str(attributes.UTM_MEDIUM),
    utm_campaign: str(attributes.UTM_CAMPAIGN),
    landing_page: str(attributes.LANDING_PAGE),
    metadata: Object.keys(attributes).length > 0 ? (attributes as Record<string, unknown>) : null,
    confirmed: contact.emailBlacklisted === false,
    created_at: contact.createdAt ?? new Date(0).toISOString(),
  }
}

const PAGE_SIZE = 500
const MAX_PAGES = 100 // hard stop: 50k contacts

/** Read every contact on the Brevo waitlist list, newest first. */
export async function getWaitlistSignups() {
  const config = getBrevoConfig()
  if (!config) return NOT_CONFIGURED

  try {
    const signups: WaitlistSignup[] = []

    for (let page = 0; page < MAX_PAGES; page++) {
      const url = `${BREVO_API}/contacts/lists/${config.listId}/contacts?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`
      const response = await fetch(url, {
        headers: { accept: "application/json", "api-key": config.apiKey },
        cache: "no-store",
      })

      if (!response.ok) {
        console.error("[waitlist] Brevo list fetch failed", response.status)
        return { success: false, message: "Failed to fetch signups." }
      }

      const body = (await response.json()) as { contacts?: BrevoContact[] }
      const contacts = body.contacts ?? []
      signups.push(...contacts.map(mapContact))

      if (contacts.length < PAGE_SIZE) break
    }

    signups.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    return { success: true, data: signups }
  } catch (error) {
    console.error("[waitlist] Error fetching waitlist signups:", error)
    return { success: false, message: "Failed to fetch signups." }
  }
}

/** Aggregate stats, derived in memory from the Brevo contact list. */
export async function getWaitlistStats() {
  const result = await getWaitlistSignups()
  if (!result.success || !result.data) {
    return { success: false, message: "Failed to fetch stats." }
  }

  const signups = result.data
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  // Seeded empty on purpose: every tier present is discovered from the data and
  // rendered dynamically, so we must not invent zero-count rows for tiers that
  // nobody actually holds.
  const tierBreakdown: Record<string, number> = {}
  const referralBreakdown: Record<string, number> = {}
  let today = 0
  let week = 0

  for (const signup of signups) {
    const created = new Date(signup.created_at)
    if (created >= startOfToday) today++
    if (created >= weekAgo) week++

    // `mapContact` already resolved the tier (explicit TIER, else SOURCE-derived).
    const tier = signup.tier
    tierBreakdown[tier] = (tierBreakdown[tier] || 0) + 1

    const source = signup.referral_source || signup.utm_source || "direct"
    referralBreakdown[source] = (referralBreakdown[source] || 0) + 1
  }

  return {
    success: true,
    data: { total: signups.length, today, week, tierBreakdown, referralBreakdown },
  }
}

/** CSV export of the Brevo waitlist, same columns as the previous export. */
export async function exportWaitlistToCSV() {
  const result = await getWaitlistSignups()
  if (!result.success || !result.data) {
    return { success: false, message: "Failed to export waitlist." }
  }

  const signups = result.data
  if (signups.length === 0) {
    return { success: false, message: "No signups to export." }
  }

  const headers = [
    "Email",
    "Tier",
    "Source",
    "Referral Source",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "Confirmed",
    "Signup Date",
  ]

  const rows = signups.map((signup) => [
    signup.email,
    // Already resolved by `mapContact` — re-defaulting here would relabel
    // newsletter subscribers as "free" in the export.
    signup.tier,
    signup.source,
    signup.referral_source || "",
    signup.utm_source || "",
    signup.utm_medium || "",
    signup.utm_campaign || "",
    signup.confirmed ? "Yes" : "No",
    new Date(signup.created_at).toLocaleString(),
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n")

  return {
    success: true,
    data: csvContent,
    filename: `vibebrowser-waitlist-${new Date().toISOString().split("T")[0]}.csv`,
  }
}
