import { NextRequest, NextResponse } from 'next/server'
import { insertSignup, markEnrolled, notifyFounder } from '@/lib/opencode-beta-signup'
import { enrollBetaTester } from '@/lib/google-groups'

// googleapis (used by the gated Google Group auto-enroll) requires the
// Node.js runtime — it isn't Edge-compatible.
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let email: string
  try {
    const body = await request.json()
    if (!body?.email || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    email = body.email
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
    timestamp: new Date().toISOString(),
    ip,
  }))

  let result
  try {
    result = await insertSignup({ email: normalized, ip, userAgent })
  } catch (err) {
    // Supabase env vars missing/misconfigured, or the client threw. The
    // signup would otherwise be lost entirely (as it was before this
    // rework), so surface a real error instead of a false "success".
    console.error('[beta-signup] insertSignup threw:', err)
    return NextResponse.json({ error: 'Failed to sign up. Please try again.' }, { status: 500 })
  }

  if (result.outcome === 'error') {
    return NextResponse.json({ error: 'Failed to sign up. Please try again.' }, { status: 500 })
  }

  if (result.outcome === 'duplicate') {
    // Idempotent: already on the list. Don't re-notify or re-enroll.
    return NextResponse.json({ message: "You're already on the beta list." })
  }

  // New signup — attempt gated auto-enroll, then notify the founder either
  // way. Neither step may block or fail the response: the row is already
  // persisted, which is the durability guarantee this endpoint owes.
  const enroll = await enrollBetaTester(normalized)

  let enrollOutcome: 'enrolled' | 'pending' | 'enrollment_failed' = 'pending'
  if (enroll.attempted && enroll.success) {
    enrollOutcome = 'enrolled'
    await markEnrolled(result.row.id)
  } else if (enroll.attempted && !enroll.success) {
    enrollOutcome = 'enrollment_failed'
  }

  await notifyFounder({
    email: normalized,
    createdAt: result.row.created_at,
    enrollResult: enrollOutcome,
  })

  return NextResponse.json({ message: 'Signed up successfully' })
}
