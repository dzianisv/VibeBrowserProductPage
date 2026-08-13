import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { INTEGRATIONS, getIntegration, type Integration } from '../integrations.ts'

const repoFile = (rel: string) =>
  readFileSync(fileURLToPath(new URL(`../../${rel}`, import.meta.url)), 'utf8')

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

      test('documents the direct /mcp/<uuid> connector URL in the numbered steps', () => {
        const i = connector(slug)
        assert.ok(
          i.steps.some(
            (s) => s.config?.code === 'https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>',
          ),
          'the direct connector URL must appear in the numbered steps, not only in prose',
        )
      })

      test('never instructs the reader through a relay OAuth flow', () => {
        const i = connector(slug)
        const blob = [
          i.tagline,
          i.answerBlock,
          ...i.solution,
          ...i.steps.map((s) => `${s.title} ${s.body}`),
          ...(i.connectedLooksLike ?? []),
          ...(i.troubleshooting ?? []).map((t) => `${t.symptom} ${t.cause} ${t.fix}`),
          ...i.faqs.map((f) => `${f.q} ${f.a}`),
          i.connectorStatus?.summary ?? '',
          i.security ? `${i.security.heading} ${i.security.body} ${i.security.bullets.join(' ')}` : '',
        ]
          .join(' ')
          .toLowerCase()

        // The relay's hosted contract is the direct URL. Consent screens, DCR,
        // /oauth/authorize and browser:* scopes are not part of it — any of
        // these coming back means the guide is telling readers to do something
        // that does not exist.
        // Negations ("there is no consent screen") are fine and desirable —
        // only instructions to complete one are forbidden.
        assert.doesNotMatch(blob, /(approve|complete|approving|completing)[^.]{0,40}consent/)
        assert.doesNotMatch(blob, /consent screen (appears|naming|for the)/)
        assert.doesNotMatch(blob, /dynamic client registration/)
        assert.doesNotMatch(blob, /oauth 2\.1/)
        assert.doesNotMatch(blob, /\/oauth\/authorize/)
        assert.doesNotMatch(blob, /browser:read|browser:control/)
        assert.doesNotMatch(
          blob,
          /canonical (oauth )?url/,
          'the credential-free canonical OAuth URL is not a supported setup path',
        )
        // The bare /mcp endpoint must never be handed out as the thing to paste.
        assert.doesNotMatch(
          blob,
          /relay\.api\.vibebrowser\.app\/mcp(?![/\w])/,
          'the bare /mcp endpoint was presented as a connector URL',
        )
      })

      test('carries no OAuth schema on the integration record', () => {
        const i = connector(slug) as Record<string, unknown>
        assert.equal(i.oauth, undefined, 'the OAuth block must be gone, not merely unrendered')
        assert.equal(i.alternatePath, undefined, 'the direct URL is the primary path, not an alternate')
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

/**
 * Hosted-connector contract guard.
 *
 * What is actually true (Aug 2026):
 *   - The only hosted-connector contract is the direct Streamable HTTP URL
 *     https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>.
 *   - Claude on the web is verified on it.
 *   - ChatGPT is verified on it too, but only on a PAID plan: Settings →
 *     Security and login → Developer mode → Plugins → Create app silently
 *     no-ops on a free account, so the URL field never appears.
 *   - There is no relay OAuth: no consent screen, no Dynamic Client
 *     Registration, no browser:read / browser:control scopes.
 *
 * These assertions fail if relay OAuth instructions come back, or if the
 * ChatGPT plan gate is quietly dropped.
 */
describe('hosted connectors document the direct URL contract only', () => {
  test('the catalog records the connector status without an OAuth verdict', () => {
    const claude = getIntegration('claude-connector')!
    const chatgpt = getIntegration('chatgpt-connector')!

    assert.ok(claude.connectorStatus, 'claude connector needs an explicit verification status')
    assert.equal(claude.connectorStatus.tone, 'ok')
    assert.doesNotMatch(claude.connectorStatus.summary.toLowerCase(), /oauth/)

    assert.ok(chatgpt.connectorStatus, 'chatgpt connector needs an explicit verification status')
    assert.equal(chatgpt.connectorStatus.tone, 'caveat')
    // The badge must not read as an unqualified "Verified" on a card.
    assert.notEqual(chatgpt.connectorStatus.badge.trim().toLowerCase(), 'verified')
    const summary = chatgpt.connectorStatus.summary.toLowerCase()
    assert.match(summary, /paid/, 'the ChatGPT status must name the plan requirement')
    assert.match(summary, /no-ops|does nothing|silently/)
    assert.doesNotMatch(summary, /oauth/)
  })

  test('ChatGPT is still described as working via the direct per-user URL', () => {
    // Do not overcorrect: the direct path genuinely works on ChatGPT.
    const chatgpt = getIntegration('chatgpt-connector')!
    const blob = [
      chatgpt.answerBlock,
      chatgpt.connectorStatus!.summary,
      ...chatgpt.faqs.map((f) => `${f.q} ${f.a}`),
    ]
      .join(' ')
      .toLowerCase()
    assert.match(blob, /per-user|direct/)
    assert.match(blob, /verified/)
  })

  test('the catalog documents the codex --url form of the same direct contract', () => {
    const codex = getIntegration('openai-codex-cli')!
    const blob = [
      ...codex.steps.map((s) => `${s.title} ${s.body} ${s.config?.code ?? ''}`),
      ...codex.faqs.map((f) => `${f.q} ${f.a}`),
    ].join(' ')
    assert.match(
      blob,
      /codex mcp add vibe --url https:\/\/relay\.api\.vibebrowser\.app\/mcp\/<your-routing-uuid>/,
    )
  })

  const MARKETING_PAGES = [
    'app/mcp/page.tsx',
    'app/mcp/layout.tsx',
    'app/integrations/page.tsx',
    'app/integrations/[slug]/page.tsx',
  ]

  for (const page of MARKETING_PAGES) {
    test(`${page} carries no relay OAuth setup instructions`, () => {
      const text = repoFile(page).replace(/\s+/g, ' ').toLowerCase()

      assert.doesNotMatch(text, /canonical oauth url/)
      assert.doesNotMatch(text, /oauth 2\.1/)
      assert.doesNotMatch(text, /dynamic client registration/)
      assert.doesNotMatch(text, /browser:read|browser:control/)
      assert.doesNotMatch(text, /\/oauth\/authorize/)
      assert.doesNotMatch(
        text,
        /approve the [^.]{0,40}consent screen/,
        'a relay OAuth consent instruction came back',
      )

      // Any page that names ChatGPT and the connector URL must keep the plan gate.
      if (text.includes('chatgpt') && text.includes('relay.api.vibebrowser.app/mcp')) {
        assert.match(
          text,
          /paid plan|no-ops/,
          'the ChatGPT paid-plan caveat is missing from a page that promotes the connector URL',
        )
      }
    })
  }
})
