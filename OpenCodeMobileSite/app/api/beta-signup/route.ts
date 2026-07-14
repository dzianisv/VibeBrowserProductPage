import { addBrevoContact } from '../../../lib/brevo-contact'

export const runtime = 'nodejs'

export function POST(request: Request) {
  return addBrevoContact(request, {
    label: 'beta-signup',
    listId: process.env.BREVO_OPENCODE_BETA_LIST_ID,
  })
}
