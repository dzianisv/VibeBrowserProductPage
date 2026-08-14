import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  MAILTO_SOURCE,
  SYNCED_LABEL,
  buildSignupBody,
  buildSyncNote,
  extractAppVersion,
  extractSignupEmail,
  formatAlert,
  isSynced,
  isWaitlistConversation,
  mergeLabels,
  normalizeEmail,
  planConversation,
  splitByAppVersion,
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
    appVersion: null,
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

/**
 * Body shape from OpenCode Mobile v0.4.13+ (Play versionCode 149), which stamps
 * the build into the mail so AGE-100 can tell a stale sideload apart from a
 * current build that leaked past the retry queue.
 */
const stampedIncoming: ChatwootMessage = {
  id: 2001,
  message_type: 0,
  private: false,
  content: 'Sign me up!\n\nEmail: leak@example.com\n\nApp: OpenCode Mobile v0.4.13\n',
  sender: { email: 'leak@example.com' },
}

test('the App: stamp is read off the body, and its absence means a pre-v0.4.13 build', () => {
  assert.equal(extractAppVersion([stampedIncoming]), '0.4.13')
  // Absence is the measurement, not an error: no stamp => older than v0.4.13.
  assert.equal(extractAppVersion([realIncoming]), null)
  assert.equal(extractAppVersion([]), null)
  // Signature noise after the stamp must not swallow it.
  assert.equal(
    extractAppVersion([
      { id: 1, message_type: 0, content: 'Sign me up!\n\nEmail: a@b.com\n\nApp: OpenCode Mobile v1.2.3-rc.1\n\n--\nSent from my phone' },
    ]),
    '1.2.3-rc.1',
  )
})

test('our own replies cannot attribute a build (they quote the customer mail)', () => {
  const quotedByUs: ChatwootMessage = {
    id: 3001,
    message_type: 1,
    private: false,
    content: 'Thanks! You wrote:\n\nApp: OpenCode Mobile v0.4.13\n',
  }
  const privateNote: ChatwootMessage = {
    id: 3002,
    message_type: 0,
    private: true,
    content: 'App: OpenCode Mobile v9.9.9\n',
  }
  assert.equal(extractAppVersion([quotedByUs, privateNote]), null)
})

test('planConversation carries the build through to the sync plan', () => {
  assert.deepEqual(planConversation(conversation(), [stampedIncoming]), {
    conversationId: 277,
    action: 'sync',
    email: 'leak@example.com',
    origin: 'body',
    appVersion: '0.4.13',
  })
})

test('splitByAppVersion separates the unreachable cohort from a real regression', () => {
  const split = splitByAppVersion({
    synced: [
      { conversationId: 1, email: 'a@b.com', origin: 'body', appVersion: null },
      { conversationId: 2, email: 'c@d.com', origin: 'sender' }, // legacy row, no field
      { conversationId: 3, email: 'e@f.com', origin: 'body', appVersion: '0.4.13' },
      { conversationId: 4, email: 'g@h.com', origin: 'body', appVersion: '0.4.13' },
      { conversationId: 5, email: 'i@j.com', origin: 'body', appVersion: '0.5.0' },
    ],
    failed: [],
    skipped: 0,
    scanned: 5,
  })
  assert.deepEqual(split, {
    unstamped: 2,
    stamped: 3,
    versions: [
      { version: '0.4.13', count: 2 },
      { version: '0.5.0', count: 1 },
    ],
  })
})

test('a stamped signup is called a regression in the alert, an unstamped one is not', () => {
  const clean = formatAlert({
    synced: [{ conversationId: 277, email: 'a@b.com', origin: 'body', appVersion: null }],
    failed: [],
    skipped: 0,
    scanned: 1,
  })
  assert.match(clean, /pre-v0\.4\.13 \(unstamped\)/)
  assert.doesNotMatch(clean, /Regression/)

  const leaking = formatAlert({
    synced: [{ conversationId: 900, email: 'leak@example.com', origin: 'body', appVersion: '0.4.13' }],
    failed: [],
    skipped: 0,
    scanned: 1,
  })
  assert.match(leaking, /Regression/)
  assert.match(leaking, /v0\.4\.13 \(1\)/)
})

test('the internal note tells a human which of the two cases they are looking at', () => {
  assert.match(buildSyncNote('a@b.com', 'body', null), /older than v0\.4\.13/)
  assert.match(buildSyncNote('a@b.com', 'body', '0.4.13'), /DEFECT/)
})
