/**
 * Persistence + founder notification for the opencode.agentlabs.cc signup
 * forms (closed beta + general news list). Mirrors the Supabase + Resend
 * conventions already used by actions/waitlist-supabase.ts (same env var
 * names, same "resolve client lazily, never throw across a signup" shape).
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const TABLE = 'opencode_beta_signups'
const PLAY_PACKAGE_NAME = 'cc.agentlabs.opencode'

export type SignupStatus = 'pending' | 'enrolled'
export type SignupList = 'beta' | 'news'

export interface BetaSignupRow {
  id: string
  email: string
  created_at: string
  ip: string | null
  user_agent: string | null
  status: SignupStatus
  enrolled_at: string | null
  list: SignupList
}

function getSupabaseClient(): SupabaseClient {
  const url = process.env.SUPABASE_PROJECT_URL
  const key = process.env.SUPABASE_API_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase environment variables are not configured. Set SUPABASE_PROJECT_URL and SUPABASE_API_KEY.'
    )
  }

  return createClient(url, key)
}

type ResendLike = { emails: { send: (data: unknown) => Promise<unknown> } }

let resendClient: ResendLike | null = null

async function getResendClient(): Promise<ResendLike | null> {
  if (resendClient) {
    return resendClient
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }

  try {
    const { Resend } = await import('resend')
    resendClient = new Resend(apiKey) as unknown as ResendLike
    return resendClient
  } catch {
    console.log('Resend not configured - beta signup notifications disabled')
    return null
  }
}

export type InsertSignupResult =
  | { outcome: 'created'; row: BetaSignupRow }
  | { outcome: 'duplicate' }
  | { outcome: 'error'; message: string }

/**
 * Inserts a new signup row. Duplicate emails (unique constraint on `email`)
 * are treated as an idempotent success — the caller should respond to the
 * client as if the signup succeeded, without re-sending notifications or
 * re-running enrollment.
 */
export async function insertSignup(params: {
  email: string
  ip: string | null
  userAgent: string | null
  list: SignupList
}): Promise<InsertSignupResult> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from(TABLE)
    .insert([
      {
        email: params.email,
        ip: params.ip,
        user_agent: params.userAgent,
        status: 'pending',
        list: params.list,
      },
    ])
    .select()
    .single()

  if (error) {
    if (error.code === '23505' || /duplicate/i.test(error.message ?? '')) {
      return { outcome: 'duplicate' }
    }
    console.error('[beta-signup] Supabase insert failed:', error)
    return { outcome: 'error', message: error.message }
  }

  return { outcome: 'created', row: data as BetaSignupRow }
}

/**
 * Best-effort status update after a Google Group enrollment attempt.
 * Never throws — a failed update must not fail the signup response since
 * the row already persisted successfully.
 */
export async function markEnrolled(id: string): Promise<void> {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from(TABLE)
      .update({ status: 'enrolled', enrolled_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('[beta-signup] Failed to mark signup enrolled:', error)
    }
  } catch (err) {
    console.error('[beta-signup] Failed to mark signup enrolled:', err)
  }
}

function playConsoleTestersUrl(): string {
  // There's no stable deep link into a specific closed-testing track's
  // Testers tab that only needs the package name — Play Console URLs are
  // keyed by numeric developer/app IDs. Set PLAY_CONSOLE_TESTERS_URL once
  // you know it (see docs/opencode-beta-signup.md) for a true one-click
  // link; until then this falls back to the app list, pre-filtered by
  // package name, from which the Testers tab is one click away.
  return (
    process.env.PLAY_CONSOLE_TESTERS_URL ||
    `https://play.google.com/console/u/0/developers/app-list?query=${encodeURIComponent(PLAY_PACKAGE_NAME)}`
  )
}

/**
 * Notifies the founder of a new signup. Best-effort — errors are caught
 * and logged, never thrown, so a Resend outage can't break the signup
 * response.
 */
export async function notifyFounder(params: {
  email: string
  createdAt: string
  list: SignupList
  enrollResult: 'enrolled' | 'pending' | 'enrollment_failed' | 'not_applicable'
}): Promise<void> {
  const resend = await getResendClient()
  if (!resend) {
    return
  }

  const notifyEmail = process.env.BETA_NOTIFY_EMAIL || 'vibeteaichnologies@gmail.com'
  const isBeta = params.list === 'beta'

  const statusLine = !isBeta
    ? 'News list signup — no Play beta enrollment needed.'
    : params.enrollResult === 'enrolled'
      ? 'Auto-enrolled into the beta-testers Google Group. No action needed.'
      : params.enrollResult === 'enrollment_failed'
        ? 'Auto-enroll FAILED — add them manually.'
        : 'Auto-enroll is not configured yet — add them manually.'

  const testersLink = isBeta
    ? `
          <p>
            <a href="${playConsoleTestersUrl()}" style="display: inline-block; background-color: #81c995; color: #0a0a0a; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              Open Play Console testers
            </a>
          </p>`
    : ''

  try {
    await resend.emails.send({
      from: 'OpenCode Mobile <noreply@agentlabs.cc>',
      to: [notifyEmail],
      subject: isBeta ? 'New OpenCode Mobile beta tester' : 'New OpenCode news list signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #81c995;">New ${isBeta ? 'Beta' : 'News List'} Signup</h2>
          <p>A new contact signed up for the OpenCode Mobile ${isBeta ? 'closed beta' : 'news list'}:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${params.email}</p>
            <p><strong>List:</strong> ${params.list}</p>
            <p><strong>Signup Time:</strong> ${new Date(params.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> ${statusLine}</p>
          </div>${testersLink}
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This notification was sent automatically from the opencode.agentlabs.cc signup system.
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('[beta-signup] Failed to send founder notification:', err)
  }
}
