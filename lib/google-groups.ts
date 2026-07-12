/**
 * Auto-enrollment of a tester email into a Google Group via the Admin SDK
 * Directory API (members.insert). Used to auto-populate a Google Play
 * closed-testing track, which reads its tester list from a Google Group.
 *
 * Docs: https://developers.google.com/workspace/admin/directory/reference/rest/v1/members/insert
 *
 * Gated by design: every caller MUST treat a non-attempted or failed
 * enrollment as a soft failure. This module never throws — callers get a
 * discriminated result they can branch on.
 */
import { google } from 'googleapis'

const GROUP_MEMBER_SCOPE = 'https://www.googleapis.com/auth/admin.directory.group.member'

export type EnrollResult =
  | { attempted: false }
  | { attempted: true; success: true; alreadyMember: boolean }
  | { attempted: true; success: false; error: string }

function decodeServiceAccountJson(raw: string): { client_email: string; private_key: string } {
  const trimmed = raw.trim()
  const json = trimmed.startsWith('{') ? trimmed : Buffer.from(trimmed, 'base64').toString('utf8')
  const parsed = JSON.parse(json)
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error('GOOGLE_GROUPS_SA_JSON is missing client_email/private_key')
  }
  return parsed
}

/**
 * Adds `email` as a MEMBER of the configured Google Group.
 *
 * Gated behind two env vars — if either is unset, this is a silent no-op
 * (`{ attempted: false }`) so the app works before the one-time Cloud
 * Identity setup documented in docs/opencode-beta-signup.md is done:
 *   - GOOGLE_GROUPS_SA_JSON     service account credentials JSON (raw or base64),
 *                               scoped to admin.directory.group.member, with
 *                               domain-wide delegation (or Groups Admin role).
 *   - PLAY_BETA_GROUP_EMAIL     the target group, e.g. beta-testers@agentlabs.cc
 *
 * Optional:
 *   - GOOGLE_GROUPS_IMPERSONATE_EMAIL  subject to impersonate via domain-wide
 *                                      delegation (an actual Workspace admin
 *                                      user). Required by the classic Admin
 *                                      SDK Directory API unless the service
 *                                      account itself has been granted the
 *                                      Groups Admin role directly.
 */
export async function enrollBetaTester(email: string): Promise<EnrollResult> {
  const saJsonRaw = process.env.GOOGLE_GROUPS_SA_JSON
  const groupEmail = process.env.PLAY_BETA_GROUP_EMAIL

  if (!saJsonRaw || !groupEmail) {
    return { attempted: false }
  }

  try {
    const credentials = decodeServiceAccountJson(saJsonRaw)

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [GROUP_MEMBER_SCOPE],
      subject: process.env.GOOGLE_GROUPS_IMPERSONATE_EMAIL || undefined,
    })

    const admin = google.admin({ version: 'directory_v1', auth })

    await admin.members.insert({
      groupKey: groupEmail,
      requestBody: {
        email,
        role: 'MEMBER',
      },
    })

    return { attempted: true, success: true, alreadyMember: false }
  } catch (err: unknown) {
    const status = (err as { code?: number; response?: { status?: number } })?.code
      ?? (err as { response?: { status?: number } })?.response?.status
    const message = err instanceof Error ? err.message : String(err)

    // "Member already exists" — treat as success, it's idempotent.
    if (status === 409 || /already exists|duplicate/i.test(message)) {
      return { attempted: true, success: true, alreadyMember: true }
    }

    console.error('[beta-signup] Google Group enrollment failed:', message)
    return { attempted: true, success: false, error: message }
  }
}
