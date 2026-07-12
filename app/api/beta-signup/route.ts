import { NextRequest, NextResponse } from 'next/server'
import { insertSignup, markEnrolled, notifyFounder, type SignupList } from '@/lib/opencode-beta-signup'
import { enrollBetaTester } from '@/lib/google-groups'
import { addContactToBrevo } from '@/lib/brevo'

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

  console.log(JSON.stringify({
    event: 'beta_signup',
    email: normalized,
    list,
    timestamp: new Date().toISOString(),
    ip,
  }))

  // 1. Persist to Supabase — the durable backstop. Must not be dropped.
  let result
  try {
    result = await insertSignup({ email: normalized, ip, userAgent, list })
  } catch (err) {
    // Supabase env vars missing/misconfigured, or the client threw. The
    // signup would otherwise be lost entirely, so surface a real error
    // instead of a false "success".
    console.error('[beta-signup] insertSignup threw:', err)
    return NextResponse.json({ error: 'Failed to sign up. Please try again.' }, { status: 500 })
  }

  if (result.outcome === 'error') {
    return NextResponse.json({ error: 'Failed to sign up. Please try again.' }, { status: 500 })
  }

  if (result.outcome === 'duplicate') {
    // Idempotent: already recorded. Still sync to Brevo (upsert is safe
    // and cheap) but don't re-notify or re-enroll.
    try {
      await addContactToBrevo(normalized, resolveBrevoListId(list))
    } catch (err) {
      console.error('[beta-signup] Brevo sync (duplicate path) failed:', err)
    }
    return NextResponse.json({
      message: list === 'beta' ? "You're already on the beta list." : "You're already subscribed.",
    })
  }

  // New signup — persisted. Every remaining step is best-effort: a
  // Brevo/enroll/notify failure must never break the response or the
  // Supabase write, which is already durable at this point.

  // 2. Add to the correct Brevo list.
  try {
    await addContactToBrevo(normalized, resolveBrevoListId(list))
  } catch (err) {
    console.error('[beta-signup] Brevo sync failed:', err)
  }

  // 3. Beta-only: gated Google Group auto-enroll.
  let enrollOutcome: 'enrolled' | 'pending' | 'enrollment_failed' | 'not_applicable' = 'not_applicable'
  if (list === 'beta') {
    enrollOutcome = 'pending'
    try {
      const enroll = await enrollBetaTester(normalized)
      if (enroll.attempted && enroll.success) {
        enrollOutcome = 'enrolled'
        await markEnrolled(result.row.id)
        try {
          await addContactToBrevo(normalized, resolveBrevoListId('beta'), { PLAY_ENROLLED: true })
        } catch (err) {
          console.error('[beta-signup] Brevo PLAY_ENROLLED attribute update failed:', err)
        }
      } else if (enroll.attempted && !enroll.success) {
        enrollOutcome = 'enrollment_failed'
      }
    } catch (err) {
      console.error('[beta-signup] Google Group enroll threw:', err)
      enrollOutcome = 'enrollment_failed'
    }
  }

  // 4. Notify founder — include which list.
  try {
    await notifyFounder({
      email: normalized,
      createdAt: result.row.created_at,
      list,
      enrollResult: enrollOutcome,
    })
  } catch (err) {
    console.error('[beta-signup] notifyFounder threw:', err)
  }

  return NextResponse.json({ message: 'Signed up successfully' })
}
