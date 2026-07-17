import { NextRequest, NextResponse } from 'next/server'
import { insertSignup, markEnrolled, notifyFounder, type SignupList } from '@/lib/opencode-beta-signup'
import { enrollBetaTester } from '@/lib/google-groups'
import { addContactToBrevo } from '@/lib/brevo'
import { anonymizeIp, hashEmailForLog, redactForLog } from '@/lib/privacy-log'

// googleapis (used by the gated Google Group auto-enroll) requires the
// Node.js runtime — it isn't Edge-compatible.
export const runtime = 'nodejs'

function resolveBrevoListId(list: SignupList): string | undefined {
  return list === 'beta'
    ? process.env.BREVO_OPENCODE_BETA_LIST_ID
    : process.env.BREVO_OPENCODE_NEWS_LIST_ID
}

export async function POST(request: NextRequest) {
  let email: string
  let list: SignupList = 'beta'
  try {
    const body = await request.json()
    if (!body?.email || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    email = body.email

    if (body.list !== undefined) {
      if (body.list !== 'beta' && body.list !== 'news') {
        return NextResponse.json({ error: 'Invalid list' }, { status: 400 })
      }
      list = body.list
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
  const userAgent = request.headers.get('user-agent')

  // PRIVACY: never log the raw email or full client IP — Vercel function
  // logs have no retention/access controls of their own (unlike the
  // Supabase row, which has RLS + no public SELECT). Log a one-way hash for
  // dedup correlation and a truncated IP for coarse abuse signal only. See
  // docs/opencode-beta-signup.md "Privacy, Consent, Retention" and
  // lib/privacy-log.ts.
  console.log(JSON.stringify({
    event: 'beta_signup',
    emailHash: hashEmailForLog(normalized),
    list,
    timestamp: new Date().toISOString(),
    ipTruncated: anonymizeIp(ip),
  }))

  // 1. Persist to Supabase — a durable backstop when configured. Best-effort:
  // Brevo (below) is the primary source of truth, so a missing table or
  // Supabase outage must NOT drop the signup. `row` stays null when Supabase
  // is unavailable; we only fail the request if Brevo ALSO fails.
  let result: Awaited<ReturnType<typeof insertSignup>> | null = null
  try {
    result = await insertSignup({ email: normalized, ip, userAgent, list })
  } catch (err) {
    console.error('[beta-signup] insertSignup threw (continuing, Brevo is primary):', redactForLog(err))
  }

  if (result?.outcome === 'duplicate') {
    // Idempotent: already recorded. Still sync to Brevo (upsert is safe
    // and cheap) but don't re-notify or re-enroll.
    try {
      await addContactToBrevo(normalized, resolveBrevoListId(list))
    } catch (err) {
      console.error('[beta-signup] Brevo sync (duplicate path) failed:', redactForLog(err))
    }
    return NextResponse.json({
      message: list === 'beta' ? "You're already on the beta list." : "You're already subscribed.",
    })
  }

  const row = result?.outcome === 'created' ? result.row : null
  const supabaseOk = row !== null

  // 2. Add to the correct Brevo list — the primary store.
  const brevo = await addContactToBrevo(normalized, resolveBrevoListId(list)).catch((err) => {
    console.error('[beta-signup] Brevo sync failed:', redactForLog(err))
    return { status: 'error' as const, message: String(err) }
  })
  const brevoOk = brevo.status === 'added'

  // If neither store captured the signup, it's truly lost — fail loudly.
  if (!supabaseOk && !brevoOk) {
    console.error('[beta-signup] BOTH Supabase and Brevo failed — signup lost:', hashEmailForLog(normalized))
    return NextResponse.json({ error: 'Failed to sign up. Please try again.' }, { status: 500 })
  }

  // Captured. Every remaining step is best-effort — a failure here must
  // never break the response.

  // 3. Beta-only: gated Google Group auto-enroll.
  let enrollOutcome: 'enrolled' | 'pending' | 'enrollment_failed' | 'not_applicable' = 'not_applicable'
  if (list === 'beta') {
    enrollOutcome = 'pending'
    try {
      const enroll = await enrollBetaTester(normalized)
      if (enroll.attempted && enroll.success) {
        enrollOutcome = 'enrolled'
        if (row) await markEnrolled(row.id)
        try {
          await addContactToBrevo(normalized, resolveBrevoListId('beta'), { PLAY_ENROLLED: true })
        } catch (err) {
          console.error('[beta-signup] Brevo PLAY_ENROLLED attribute update failed:', redactForLog(err))
        }
      } else if (enroll.attempted && !enroll.success) {
        enrollOutcome = 'enrollment_failed'
      }
    } catch (err) {
      console.error('[beta-signup] Google Group enroll threw:', redactForLog(err))
      enrollOutcome = 'enrollment_failed'
    }
  }

  // 4. Notify founder — include which list.
  try {
    await notifyFounder({
      email: normalized,
      createdAt: row?.created_at ?? new Date().toISOString(),
      list,
      enrollResult: enrollOutcome,
    })
  } catch (err) {
    console.error('[beta-signup] notifyFounder threw:', redactForLog(err))
  }

  return NextResponse.json({ message: 'Signed up successfully' })
}
