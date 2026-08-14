import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  MAILTO_SOURCE,
  SYNCED_LABEL,
  buildSignupBody,
  extractSignupEmail,
  formatAlert,
  isSynced,
  isWaitlistConversation,
  mergeLabels,
  normalizeEmail,
  planConversation,
  type ChatwootConversation,
  type ChatwootMessage,
} from '../waitlist-mailto-reconcile.ts'

/** Shaped from a real conversation in inbox 2 (Chatwoot #277). */
function conversation(overrides: Partial<ChatwootConversation> = {}): ChatwootConversation {
  return {
    id: 277,
    inbox_id: 2,
    labels: ['answered', 'onboarding', 'p3'],
    additional_attributes: { mail_subject: 'OpenCode Connect Waitlist' },
    meta: { sender: { email: 'ricardoventura@gmail.com' } },
    ...overrides,
  }
}

/** Real body shape produced by buildWaitlistMailtoUrl(), signature noise included. */
const realIncoming: ChatwootMessage = {
  id: 1083,
  message_type: 0,
  private: false,
  content:
    'Sign me up!\n\nEmail: Ricardo.Ventura@gmail.com\n\n\n\n«Ricardo Ventura»\nother@example.com\n',
  sender: { email: 'envelope@gmail.com' },
}

test('only conversations carrying the app fallback subject are candidates', () => {
  assert.equal(isWaitlistConversation(conversation()), true)
  assert.equal(
    isWaitlistConversation(conversation({ additional_attributes: { mail_subject: 'Re: OpenCode Connect Waitlist' } })),
    true,
  )
  assert.equal(
    isWaitlistConversation(conversation({ additional_attributes: { mail_subject: 'Billing question' } })),
    false,
  )
  assert.equal(isWaitlistConversation(conversation({ additional_attributes: null })), false)
})

test('the typed address in the body wins over the envelope sender, normalized', () => {
  const found = extractSignupEmail(conversation(), [realIncoming])
  assert.deepEqual(found, { email: 'ricardo.ventura@gmail.com', origin: 'body' })
})

test('falls back to the sender when the body has no Email: line', () => {
  const found = extractSignupEmail(conversation(), [
    { id: 1, message_type: 0, content: 'Sign me up!', sender: { email: 'Someone@Example.com' } },
  ])
  assert.deepEqual(found, { email: 'someone@example.com', origin: 'sender' })
})

test('our own reply copy can never be mistaken for a signup', () => {
  // Outgoing + private messages quote addresses; they must be ignored entirely.
  const found = extractSignupEmail(conversation({ meta: { sender: { email: null } } }), [
    { id: 5, message_type: 1, content: 'Email: agent@agentlabs.cc', sender: { email: 'agent@agentlabs.cc' } },
    { id: 6, message_type: 0, private: true, content: 'Email: note@agentlabs.cc' },
    { id: 7, message_type: 2, content: 'Alfred added answered' },
  ])
  assert.equal(found, null)
})

test('garbage addresses are rejected rather than mailed to the store', () => {
  assert.equal(normalizeEmail('not-an-email'), null)
  assert.equal(normalizeEmail(''), null)
  assert.equal(normalizeEmail(`${'a'.repeat(250)}@example.com`), null)
  assert.equal(extractSignupEmail(conversation({ meta: { sender: { email: 'bad' } } }), [
    { id: 1, message_type: 0, content: 'Email: also-bad' },
  ]), null)
})

test('an already-labelled conversation is never re-sent (idempotent re-runs)', () => {
  const conv = conversation({ labels: ['answered', SYNCED_LABEL] })
  assert.equal(isSynced(conv), true)
  assert.deepEqual(planConversation(conv, [realIncoming]), {
    conversationId: 277,
    action: 'skip',
    reason: 'already-synced',
  })
})

test('planConversation syncs a fresh waitlist mail and skips everything else', () => {
  assert.deepEqual(planConversation(conversation(), [realIncoming]), {
    conversationId: 277,
    action: 'sync',
    email: 'ricardo.ventura@gmail.com',
    origin: 'body',
  })
  assert.deepEqual(
    planConversation(conversation({ additional_attributes: { mail_subject: 'Bug report' } }), [realIncoming]),
    { conversationId: 277, action: 'skip', reason: 'not-waitlist' },
  )
  assert.deepEqual(
    planConversation(conversation({ meta: { sender: { email: null } } }), [
      { id: 1, message_type: 0, content: 'hello' },
    ]),
    { conversationId: 277, action: 'skip', reason: 'no-email' },
  )
})

test('labels are merged, not replaced (Chatwoot overwrites the whole set)', () => {
  assert.deepEqual(mergeLabels(['answered', 'p3'], SYNCED_LABEL), ['answered', 'p3', SYNCED_LABEL])
  assert.deepEqual(mergeLabels([SYNCED_LABEL], SYNCED_LABEL), [SYNCED_LABEL])
  assert.deepEqual(mergeLabels(null, SYNCED_LABEL), [SYNCED_LABEL])
})

test('the cohort stays distinguishable in the store', () => {
  assert.deepEqual(buildSignupBody('a@b.com'), { email: 'a@b.com', source: MAILTO_SOURCE })
})

test('the alert names every recovered signup and every failure', () => {
  const alert = formatAlert({
    synced: [{ conversationId: 277, email: 'a@b.com', origin: 'body' }],
    failed: [{ conversationId: 300, email: 'c@d.com', error: 'signup route returned HTTP 502' }],
    skipped: 3,
    scanned: 5,
  })
  assert.match(alert, /a@b\.com/)
  assert.match(alert, /conversations\/277/)
  assert.match(alert, /c@d\.com/)
  assert.match(alert, /HTTP 502/)
})
