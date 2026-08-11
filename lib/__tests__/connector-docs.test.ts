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

      test('leads with OAuth and never claims OAuth is unavailable', () => {
        const i = connector(slug)
        const blob = [
          i.tagline,
          i.answerBlock,
          ...i.solution,
          ...i.steps.map((s) => `${s.title} ${s.body}`),
          ...i.faqs.map((f) => `${f.q} ${f.a}`),
        ]
          .join(' ')
          .toLowerCase()

        // OAuth 2.1 + DCR is live at the canonical endpoint. Any page that still
        // tells a reader OAuth is not an option is factually wrong and blocks
        // directory submission.
        assert.match(blob, /oauth/)
        assert.doesNotMatch(
          blob,
          /(no|without|not?) (domain verification, an allowlist, or )?oauth (step|flow|configuration|setup)/,
          'a stale "no OAuth" claim survived',
        )
        assert.doesNotMatch(blob, /no oauth\b/, 'a stale "no OAuth" claim survived')

        // The canonical, credential-free URL must be the one we hand out.
        assert.ok(i.oauth, 'connector guides must document the OAuth path')
        assert.equal(i.oauth.url, 'https://relay.api.vibebrowser.app/mcp')
        assert.ok(
          i.steps.some((s) => s.config?.code === 'https://relay.api.vibebrowser.app/mcp'),
          'the canonical OAuth URL must appear in the numbered steps, not only in prose',
        )
      })

      test('explains both scopes concretely and how to revoke', () => {
        const i = connector(slug)
        assert.ok(i.oauth)
        const names = i.oauth.scopes.map((s) => s.name)
        assert.deepEqual(names, ['browser:read', 'browser:control'])
        for (const s of i.oauth.scopes) {
          assert.ok(s.grants.length > 80, `${s.name} needs a concrete explanation, not a label`)
        }
        assert.ok(i.oauth.revoke.length >= 2, 'a reader must be told how to withdraw access')
      })

      test('keeps the legacy per-UUID path as a labelled secondary section', () => {
        const i = connector(slug)
        assert.ok(i.alternatePath, 'the direct URL path still works and must stay documented')
        assert.match(i.alternatePath.heading, /direct url/i)
        assert.match(i.alternatePath.heading, /headless|automation/i)
        assert.equal(
          i.alternatePath.config?.code,
          'https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>',
        )
        const bullets = (i.alternatePath.bullets ?? []).join(' ').toLowerCase()
        assert.match(bullets, /credential|bearer/)
        assert.match(bullets, /regenerate/)
      })

      test('states that no domain verification or allowlist is needed', () => {
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

  test('chatgpt guide states plainly that Create app no-ops on a free account', () => {
    const i = connector('chatgpt-connector')
    const blob = [i.answerBlock, ...i.steps.map((s) => `${s.title} ${s.body}`), ...i.faqs.map((f) => `${f.q} ${f.a}`)]
      .join(' ')
      .toLowerCase()
    // We could NOT add the canonical OAuth URL on a free plan. Saying "it works"
    // would be a lie the reader discovers the hard way.
    assert.match(blob, /free/)
    assert.match(blob, /create app/)
    assert.match(blob, /no-ops|does nothing|silently/)
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
