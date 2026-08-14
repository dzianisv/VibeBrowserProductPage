import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import {
  INTEGRATIONS,
  getIntegration,
  CODEX_ADD_REMOTE_CMD,
  type Integration,
} from '../integrations.ts'

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
        // The bare /mcp endpoint must never be handed out as the thing to paste
        // into a connector field. Naming it while explaining the HEADER form is
        // fine and is exactly what the boundary FAQ does.
        assert.doesNotMatch(
          blob,
          /(paste|add|enter)[^.]{0,60}relay\.api\.vibebrowser\.app\/mcp(?![/\w])/,
          'the bare /mcp endpoint was presented as a connector URL to paste',
        )
        // Whenever the bare endpoint IS named, the header form must be named in
        // the same breath, so nobody reads it as a URL-only option.
        if (/relay\.api\.vibebrowser\.app\/mcp(?![/\w])/.test(blob)) {
          assert.match(
            blob,
            /x-remote-session/,
            'the bare /mcp endpoint was named without the header it requires',
          )
        }
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
    // The privacy policy is a rendered page that also described the relay's
    // OAuth scopes. Unrelated OAuth there (the `identity` Chrome permission,
    // provider OAuth tokens in the credential vault) is deliberately untouched
    // and does not trip these patterns.
    'privacy-policy.tsx',
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

/** Repo root, resolved from this test file. */
const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url))

/** The one hosted-connector URL readers are ever told to paste. */
const DIRECT_CONNECTOR_URL = 'https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>'

/**
 * Relay-OAuth markers. Every one of these describes a mechanism the relay does
 * not expose as an onboarding path, so any of them appearing in reader-facing
 * content means the docs are teaching a dead flow again.
 */
const RELAY_OAUTH_PATTERNS: { name: string; re: RegExp }[] = [
  { name: 'OAuth 2.1 / OAuth2 branding', re: /oauth\s*2(\.1|\.0)?\b/ },
  { name: 'PKCE', re: /\bpkce\b/ },
  { name: 'Dynamic Client Registration', re: /dynamic client registration|\bdcr\b/ },
  { name: 'relay scopes', re: /browser:read|browser:control/ },
  { name: 'authorize endpoint', re: /\/oauth\/authorize|\/oauth\/register|\/oauth\/token/ },
  { name: 'OAuth discovery documents', re: /\.well-known\/oauth/ },
  { name: 'consent instruction', re: /(approve|approving|complete|completing)[^.]{0,40}consent/ },
  // "canonical URL" alone is ordinary SEO vocabulary; only the relay-OAuth
  // sense is forbidden.
  { name: 'canonical credential-free URL', re: /canonical oauth url|canonical,? (credential|secret)-free/ },
]

/**
 * Unrelated OAuth that MUST survive. These are other products' auth (Google,
 * Gmail, Salesforce, Okta), the extension's own `identity` permission, the
 * credential vault, OpenCode's client-side `"oauth": false` switch, and demo
 * terminal copy. The scan skips a LINE when it matches one of these, so a file
 * is never blanket-exempted — only the specific unrelated sentence is.
 */
const UNRELATED_OAUTH_ALLOWLIST: RegExp[] = [
  /google|gmail|drive|docs|sheets|calendar|workspace/,
  /salesforce|okta|saml|sso|edgar|stripe|hubspot/,
  /credential vault|api keys and oauth tokens|oauth tokens:/,
  /"oauth": false|oauth: false|disabling oauth|pre-registered/,
  /identity<\/p>|oauth authentication/,
  // demo terminal transcripts on the /claude and /codex product pages
  /oauth\.test\.ts|feat\/oauth-fix|add oauth flow|oauth flow ready to merge|fix the oauth test/,
  // analytics consent, which has nothing to do with MCP auth
  /analytics|telemetry|cookie/,
]

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue
    const full = `${dir}/${entry}`
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.(tsx?|md)$/.test(entry)) out.push(full)
  }
  return out
}

/**
 * ACTIVE, READER-FACING CONTENT.
 *
 * Everything a reader can actually reach: the routed app, shared components,
 * the integration catalog, the standalone policy pages, and the published blog.
 * `launch/` is excluded here because those drafts are unrendered and carry a
 * SUPERSEDED banner instead — asserted separately below.
 */
function activeContentFiles(): string[] {
  const files = [
    ...walk(`${REPO_ROOT}app`),
    ...walk(`${REPO_ROOT}components`),
    ...walk(`${REPO_ROOT}blog`),
    `${REPO_ROOT}lib/integrations.ts`,
    `${REPO_ROOT}privacy-policy.tsx`,
    `${REPO_ROOT}terms-of-service.tsx`,
    `${REPO_ROOT}landing-page.tsx`,
  ]
  return files.filter((f) => !f.includes('/__tests__/'))
}

describe('active content teaches only the direct connector contract', () => {
  test('no active, reader-facing file teaches relay OAuth', () => {
    const offences: string[] = []

    for (const file of activeContentFiles()) {
      const rel = file.slice(REPO_ROOT.length)
      const lines = readFileSync(file, 'utf8').split('\n')

      lines.forEach((raw, i) => {
        const line = raw.toLowerCase()
        // Negations ("there is no consent screen", "no scopes to approve") are
        // the correction, not the regression.
        if (/\bno\b[^.]{0,30}(consent|scope|oauth)/.test(line)) return
        if (UNRELATED_OAUTH_ALLOWLIST.some((re) => re.test(line))) return

        for (const { name, re } of RELAY_OAUTH_PATTERNS) {
          if (re.test(line)) offences.push(`${rel}:${i + 1} [${name}] ${raw.trim().slice(0, 120)}`)
        }
      })
    }

    assert.deepEqual(offences, [], `relay OAuth content is live again:\n${offences.join('\n')}`)
  })

  test('the catalog hands out an HTTPS /mcp/<uuid> URL and never a wss:// MCP URL', () => {
    const blob = JSON.stringify(INTEGRATIONS)
    assert.ok(
      blob.includes(DIRECT_CONNECTOR_URL),
      'the direct HTTPS connector URL must be present in the catalog',
    )
    assert.doesNotMatch(
      blob,
      /"code":"wss:|"url":"wss:|wss:\/\/[^"']*\/mcp/i,
      'a wss:// address was presented as the MCP endpoint — the connector is Streamable HTTP',
    )
    // Every connector URL we print must be https, never http.
    assert.doesNotMatch(blob, /http:\/\/relay\.api\.vibebrowser\.app/)
  })

  test('the verified Codex command is shared from one constant, not retyped', () => {
    assert.equal(
      CODEX_ADD_REMOTE_CMD,
      `codex mcp add vibe --url ${DIRECT_CONNECTOR_URL}`,
      'the Codex command must match the form verified against `codex mcp add --help`',
    )
    const codex = getIntegration('openai-codex-cli')!
    const rendered = [
      ...codex.steps.map((s) => `${s.title} ${s.body} ${s.config?.code ?? ''}`),
      ...codex.faqs.map((f) => `${f.q} ${f.a}`),
    ].join(' ')
    assert.ok(
      rendered.includes(CODEX_ADD_REMOTE_CMD),
      'the Codex page must render the shared command constant',
    )
    // Codex has no hosted connector menu we have driven — the shared TOML file
    // is the integration surface, and saying otherwise invents a click path.
    assert.doesNotMatch(rendered.toLowerCase(), /codex[^.]{0,40}connectors (menu|tab|panel)/)
    assert.match(rendered, /~\/\.codex\/config\.toml/)
  })

  test('the header form and the path form are distinguished for the reader', () => {
    for (const slug of CONNECTOR_SLUGS) {
      const blob = connector(slug)
        .faqs.map((f) => `${f.q} ${f.a}`)
        .join(' ')
        .toLowerCase()
      assert.match(blob, /x-remote-session/, `${slug} must explain the header form exists`)
      assert.match(
        blob,
        /(one text field|no header editor|cannot send|only accept a url|takes a bare url)/,
        `${slug} must say WHY a hosted connector UI needs the path form`,
      )
    }
  })

  test('every connector guide tells an OAuth-era user how to migrate', () => {
    for (const slug of CONNECTOR_SLUGS) {
      const blob = connector(slug)
        .faqs.map((f) => `${f.q} ${f.a}`)
        .join(' ')
        .toLowerCase()
      assert.match(blob, /consent screen/, `${slug} must acknowledge the old consent-screen setup`)
      assert.match(
        blob,
        /(remove|delete)[^.]{0,60}(connector|app|entry)/,
        `${slug} must tell the reader to remove the old connector`,
      )
      assert.match(blob, /(re-?add|add it again|create app)/, `${slug} must tell them to re-add it`)
    }
  })

  test('unrendered launch drafts are clearly marked superseded', () => {
    const drafts = readdirSync(`${REPO_ROOT}launch`).filter((f) => f.endsWith('.md'))
    assert.ok(drafts.length >= 4, 'expected the launch drafts to still be present')
    for (const draft of drafts) {
      const text = readFileSync(`${REPO_ROOT}launch/${draft}`, 'utf8')
      assert.match(text, /SUPERSEDED/, `${draft} still reads as postable`)
      assert.match(text, /do not post as written/i, `${draft} needs an explicit do-not-post`)
      assert.ok(
        text.includes(DIRECT_CONNECTOR_URL),
        `${draft} must name the URL that actually works`,
      )
      // The banner has to appear before the stale body, or a skimmer misses it.
      // Measure the stale copy in the BODY (after the banner's closing rule),
      // so this cannot be satisfied by the banner quoting OAuth itself.
      const bannerEnd = text.indexOf('> ---')
      assert.ok(bannerEnd > -1, `${draft}: the banner must end with a rule`)
      const body = text.slice(bannerEnd)
      assert.match(
        body,
        /OAuth 2\.1|browser:read|consent screen/i,
        `${draft}: expected the historical copy to be preserved verbatim below the banner`,
      )
      assert.ok(text.indexOf('SUPERSEDED') < bannerEnd, `${draft}: banner must come first`)
    }
  })

  test('published blog posts never hand out a bare /mcp connector URL to paste', () => {
    for (const file of walk(`${REPO_ROOT}blog`)) {
      const text = readFileSync(file, 'utf8').toLowerCase()
      if (!text.includes('relay.api.vibebrowser.app')) continue
      const rel = file.slice(REPO_ROOT.length)
      // A post may use the bare endpoint ONLY with the header form, which is
      // the supported shape for header-capable MCP clients.
      if (/relay\.api\.vibebrowser\.app\/mcp(?![/\w<])/.test(text)) {
        assert.match(
          text,
          /x-remote-session/,
          `${rel} names the bare /mcp endpoint without the required header`,
        )
      }
    }
  })
})
