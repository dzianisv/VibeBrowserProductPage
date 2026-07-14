import { NextResponse } from 'next/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Options = {
  label: string
  listId: string | undefined
}

export async function addBrevoContact(request: Request, options: Options) {
  const body: unknown = await request.json().catch(() => null)
  const email = (
    typeof body === 'object'
    && body !== null
    && 'email' in body
    && typeof body.email === 'string'
  )
    ? body.email.trim().toLowerCase()
    : ''

  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const key = process.env.BREVO_API_KEY
  const list = Number.parseInt(options.listId ?? '', 10)

  if (!key || !Number.isInteger(list) || list < 1) {
    console.error(`[${options.label}] Brevo is not configured`)
    return NextResponse.json(
      { error: 'The waitlist is temporarily unavailable. Please try again later.' },
      { status: 503 },
    )
  }

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': key,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [list],
      updateEnabled: true,
    }),
    cache: 'no-store',
  }).catch((error: unknown) => {
    console.error(`[${options.label}] Brevo request failed`, error)
    return null
  })

  if (!response) {
    return NextResponse.json(
      { error: 'We could not add you right now. Please try again.' },
      { status: 502 },
    )
  }

  if (!response.ok) {
    console.error(`[${options.label}] Brevo rejected signup`, response.status)
    return NextResponse.json(
      { error: 'We could not add you right now. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
