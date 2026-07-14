import { addBrevoContact } from '../../../lib/brevo-contact'

export const runtime = 'nodejs'

export function POST(request: Request) {
  return addBrevoContact(request, {
    label: 'ios-waitlist',
    listId: process.env.BREVO_OPENCODE_IOS_LIST_ID,
  })
}
