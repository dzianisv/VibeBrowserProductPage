import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { INTEGRATIONS, getIntegration, type Integration } from '../integrations.ts'

/**
 * Guards the two hosted-connector setup guides.
 *
 * These pages document a click path that was walked end to end against the
 * real products, and they carry the one warning that actually matters: the
 * connector URL is a bearer capability over the reader's logged-in browser.
 * Both of those are the kind of content that quietly rots when someone
 * "tidies" the data file, so assert on them instead of trusting review.
 */

const CONNECTOR_SLUGS = ['claude-connector', 'chatgpt-connector'] as const

function connector(slug: string): Integration {
  const found = getIntegration(slug)
  assert.ok(found, `expected integration "${slug}" to exist`)
  return found
}

describe('hosted connector guides', () => {
  for (const slug of CONNECTOR_SLUGS) {
    describe(slug, () => {
      test('has a prominent bearer-credential warning', () => {
        const i = connector(slug)
        assert.ok(i.security, 'security callout must be present, not buried in the FAQ')
        assert.ok(i.security.bullets.length >= 3)
        const text = [i.security.heading, i.security.body, ...i.security.bullets]
          .join(' ')
          .toLowerCase()
        // Don't share it / regenerate it if it leaks — the two operational
        // instructions a reader must come away with.
        assert.match(text, /never (paste|commit)/)
        assert.match(text, /regenerate/)
      })

      test('ships a verification prompt with a deterministic expected answer', () => {
        const i = connector(slug)
        assert.ok(i.verify, 'every connector guide needs a self-service smoke test')
        assert.match(i.verify.prompt, /duckduckgo\.com/i)
        assert.equal(i.verify.expect, '2018')
        assert.ok(i.verify.note.length > 40)
      })

      test('documents troubleshooting for 401 and for a saved-but-dead connector', () => {
        const i = connector(slug)
        assert.ok(i.troubleshooting && i.troubleshooting.length >= 2)
        const rows = i.troubleshooting.map((t) =>
          `${t.symptom} ${t.cause} ${t.fix}`.toLowerCase(),
        )
        assert.ok(
          rows.some((r) => r.includes('401')),
          '401 (wrong/expired routing UUID) must be covered',
        )
        assert.ok(
          rows.some((r) => r.includes('external agent control') || r.includes('extension is closed')),
          'connector saved but tool calls fail (extension down / remote control off) must be covered',
        )
      })

      test('states that no domain verification, allowlist, or OAuth is needed', () => {
        const i = connector(slug)
        const blob = [
          i.answerBlock,
          ...i.steps.map((s) => s.body),
          ...i.faqs.map((f) => `${f.q} ${f.a}`),
        ]
          .join(' ')
          .toLowerCase()
        assert.match(blob, /domain verification/)
        assert.match(blob, /allowlist/)
        assert.match(blob, /oauth/)
      })

      test('records when the click path was last verified', () => {
        assert.ok(connector(slug).verifiedOn)
      })
    })
  }

  test('claude guide documents the exact click path and the first-use quirk', () => {
    const i = connector('claude-connector')
    const steps = i.steps.map((s) => `${s.title} ${s.body}`).join(' ')
    assert.match(steps, /Settings → Connectors/)
    assert.match(steps, /Add custom connector/)
    assert.ok(i.connectedLooksLike)
    const connected = i.connectedLooksLike.join(' ')
    // Claude reports "not connected" until the first tool call. Users read that
    // as a failed setup and give up, so it must stay documented.
    assert.match(connected, /not connected/i)
    assert.match(connected, /27 tools/)
  })

  test('chatgpt guide documents developer mode under Security and login, then Plugins → Create app', () => {
    const i = connector('chatgpt-connector')
    const steps = i.steps.map((s) => `${s.title} ${s.body}`).join(' ')
    // The commonly-published path (Settings → Connectors → advanced) is wrong;
    // developer mode lives under Security and login.
    assert.match(steps, /Security and login/)
    assert.match(steps, /Developer mode/)
    assert.match(steps, /Plugins/)
    assert.match(steps, /Create app/)
    assert.ok(i.connectedLooksLike)
    assert.match(i.connectedLooksLike.join(' '), /Navigate page/)
  })

  test('the documented connector URL is a redacted placeholder, never a real UUID', () => {
    const blob = JSON.stringify(INTEGRATIONS)
    assert.match(blob, /relay\.api\.vibebrowser\.app\/mcp\/<your-routing-uuid>/)
    // A v4 UUID anywhere in this file would mean someone pasted their own
    // browser credential into a public marketing page.
    const uuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
    assert.doesNotMatch(blob, uuid, 'a literal UUID leaked into the integration catalog')
  })
})
