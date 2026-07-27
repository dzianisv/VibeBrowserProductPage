# UI-SPEC Check — Issue #160 (mcp-remote-split)

**Verdict: BLOCK**

Reviewed: `.tasks/160/{design.md,plan.md,validation.md,decisions.md,success.md,UI-SPEC.md}` against the
live worktree (`app/mcp/page.tsx`, `app/mcp/layout.tsx`, `app/cli/page.tsx`, `app/cloud/page.tsx`,
`app/openclaw/page.tsx`, `app/llms.txt/route.ts`, `scripts/indexnow-ping.js`, `app/sitemap.ts`,
`components/site-nav.tsx`, `components/site-footer.tsx`, `components/copyable-prompt.tsx`,
`components.json`).

Most of the spec is strong and unusually well-evidenced (copywriting is specific, Pi honesty
requirements are explicit and correctly cross-checked against the "standalone co-pilot" claim that
already exists on-page, spacing/registry sections check out exactly against the repo). The blockers
below are narrow but real: two are outright false claims baked into a "locked" section, and one is a
structural ambiguity that can ship a page contradicting its own hero copy.

---

## Blocking Issues

### 1. Unresolved fate of the existing WebSocket `--remote` bridge ("Remote mode") section — risks a false "no local process" claim on `/mcp`
The live page has **three**, not two, distinct connection mechanisms:
- Local stdio (`app/mcp/page.tsx` `SETUP_CONFIGS`) → cleanly maps to `/mcp-stdio`.
- **"Remote mode"** (lines ~890–1047): `REMOTE_MCP_COMMAND = npx -y -p @vibebrowser/mcp@latest vibebrowser-mcp --remote <uuid>` — this **still runs a local npx process**, just pointed at a browser on another machine over `wss://relay.api.vibebrowser.app/<uuid>`. It has its own diagram, its own "Remote mode setup" steps, and an "Architecture highlights" grid.
- Direct Streamable HTTP (lines ~1213–1360, `DIRECT_MCP_CLI_COMMAND`/`DIRECT_MCP_JSON_CONFIG`) — genuinely zero local process, HTTP header auth. This is the one design.md/decisions.md call "hosted remote Streamable HTTP MCP only."

UI-SPEC §12 anti-pattern #7 only says: *"local diagram moves to `/mcp-stdio` entirely, remote diagram stays on `/mcp` entirely."* This treats the section as containing exactly one "remote" diagram, but there are two structurally different remote-ish things in the source (the WebSocket `--remote` bridge, and the Direct HTTP endpoint), and the spec never says what happens to the WebSocket bridge's copy/CLI command/setup steps/"Architecture highlights" block. Taken literally, an executor could ship **both** the old `--remote` WebSocket instructions and the new 8-card Streamable HTTP selector on the same page — directly contradicting the UI-SPEC's own hero subhead (§8: *"No local process, no port forwarding, no VPN"*) and decisions.md's locked "becomes remote-hosted MCP" (singular model). It also leaves the WebSocket bridge's command entirely unrepresented in the new 8-card selector (§7), i.e. orphaned.

**Fix:** UI-SPEC must explicitly state the disposition of the WebSocket `--remote` bridge content (lines ~890–1047 minus the "Local mode" half already assigned to `/mcp-stdio`): either (a) retire it entirely from `/mcp` as superseded by the Direct HTTP contract, (b) merge its "connect from anywhere" framing into §6.3's endpoint quick-facts without keeping a second competing CLI command, or (c) give it an explicit 9th distinct place in the page with copy that doesn't contradict "no local process." Also resolve the now-stale FAQ cross-reference to `/openclaw` (page.tsx line 1470) and the comparison-table "Internet-exposed relay" row's conditional ("drop if redundant... otherwise leave as-is" — make an actual call, don't defer it to the executor).

### 2. False accessibility claim — `#5f6368` does not pass 4.5:1 contrast
UI-SPEC §10 states: *"reuse existing token pairs only (`#e8eaed`/`#9aa0a6`/`#5f6368` text on `#0a0a0a`/`#111111` all already pass 4.5:1+)."* Measured (WCAG relative luminance):

| Pair | Ratio |
|---|---|
| `#e8eaed` on `#0a0a0a` | 16.43:1 ✅ |
| `#9aa0a6` on `#0a0a0a` | 7.50:1 ✅ |
| **`#5f6368` on `#0a0a0a`** | **3.27:1 ❌ (fails 4.5:1)** |
| **`#5f6368` on `#111111`** | **3.12:1 ❌ (fails 4.5:1)** |

`#5f6368` is specced as the color for "Eyebrow/label" text at 11–12px (§3, explicit example class `text-[11px] ... text-[#5f6368]`) and "tertiary/meta" copy generally (file paths, footnotes, badge text, §4) — all well under the ~18.5px/14px-bold large-text threshold, so 4.5:1 is the correct bar and this token fails it by a wide margin. This is being explicitly locked in for reuse on a **brand-new route** (`/mcp-stdio`) that didn't previously exist, so it's not just inherited legacy debt — the spec is asserting a compliance property that is false and instructing the executor not to re-check it ("do not introduce a new gray without checking contrast" implies the existing ones are already validated).

**Fix:** Either raise `#5f6368` to a value that clears 4.5:1 on both `#0a0a0a` and `#111111` for any text role at label/caption sizes, or restrict `#5f6368` to large-text/decorative-only uses (≥18.5px / 14px bold) and move eyebrow/caption/label roles to `#9aa0a6` (7.5:1, passes). Correct the §10 claim either way.

### 3. `llms.txt` claim is factually wrong — real file exists and is now stale
UI-SPEC §13 states: *"`public/llms.txt` not present in this repo — no action needed here."* But `app/llms.txt/route.ts` **exists** (a dynamic route serving `/llms.txt`) and explicitly lists:
```
{ label: 'Vibe Browser for Agents MCP page', url: `${siteUrl}/mcp` }
```
with no mention of `/mcp-stdio`. This is exactly the kind of AI-agent-facing discovery surface most relevant to this phase (an MCP setup split), and design.md explicitly names "llms.txt" as an update target in scope. Leaving it untouched means AI agents/crawlers reading `/llms.txt` will continue to be told `/mcp` is "the" MCP page with no signal that a local-only alternative exists — stale/incomplete information shipped on day one of the split.

**Fix:** Add an `/mcp-stdio` entry (and/or update the `/mcp` label to reflect "hosted remote") in `app/llms.txt/route.ts`. Correct §13 to acknowledge the file's real location.

---

## Non-Blocking Findings (recommend fixing alongside the above)

- **IndexNow omitted entirely.** `scripts/indexnow-ping.js`'s `defaultPaths` hardcodes `/mcp` and has no `/mcp-stdio`. design.md explicitly lists "IndexNow" as an update target; UI-SPEC §13 doesn't mention it at all. Add `/mcp-stdio` to `defaultPaths` (or explicitly decide/justify leaving it out).
- **Internal "stdio-specific" links outside nav/footer not addressed.** UI-SPEC §13's "Internal links" note only covers `site-nav.tsx`/`site-footer.tsx`. Grep shows other pages linking to `/mcp` in contexts that are specifically about the *local* execution layer and will read as false once `/mcp` is remote-only:
  - `app/cli/page.tsx:326` — *"Need richer tool orchestration? Use the same package via `/mcp` setup **without changing the execution layer**."* This claim becomes false post-split (the execution layer *does* change — local process vs. hosted relay). Should point to `/mcp-stdio`.
  - `app/cloud/page.tsx:539` — `<Link href="/mcp">Get the extension →</Link>` sits under a bullet list describing the free/local/self-hosted tier ("Your local browser, pre-authenticated", "MCP via `npx @vibebrowser/mcp`") in contrast to paid Cloud — contextually a stdio link, should likely become `/mcp-stdio`.
  - `app/openclaw/page.tsx:212` — "For JSON MCP config blocks ... use `/mcp`" — ambiguous whether this meant local or remote config blocks; needs an explicit call now that they live on different routes.
- **Remote-value contract narrowed without acknowledgment.** design.md's Remote Contract allows *"a bare UUID or canonical `wss://relay.api.vibebrowser.app/YOUR-SESSION-UUID`"* as the accepted header value; UI-SPEC §0 narrows this to *"value is a bare UUID ... never in a URL"* with no note that it's diverging from design.md, and the existing extension copy users are told to copy from ("Copy the UUID/relay URL shown under Relay access") may hand them the `wss://` form. Worth an explicit note reconciling which format the extension UI will show for the new Direct HTTP flow.

---

## What Passed
- Copywriting: no generic CTAs; Pi/error/empty-state copy is specific and cross-verified against real on-page substantiation (existing "standalone AI co-pilot" FAQ).
- Color: 60/30/10 split declared, accent/semantic reservations specific (not "all interactive elements"), destructive red correctly excluded from Pi's card.
- Spacing: all values multiples of 4, matches shipped Tailwind classes verified in `app/mcp/page.tsx`.
- Registry Safety: shadcn init and all 7 listed blocks (`accordion`, `badge`, `button`, `card`, `dialog`, `input`, `label`) verified present in `components.json`/`components/ui/`; no third-party registries introduced.
- Mobile/Responsive (§9): specific, verifiable breakpoints and a named ≤375px failure mode (hero button truncation) — no gaps found.
- Accessibility structure (headings, `aria-pressed`, focus rings, decorative diagram `aria-hidden`): sound, except the contrast claim above.
- Content distinction: explicit "do not carry over" list (§6) and anti-duplication anti-patterns (§12 #6) correctly address SEO duplicate-content risk between the two routes.

## Action Required
Fix the three blocking issues (and ideally the two non-blocking findings) in UI-SPEC.md, then re-run
verification before planning proceeds.

---

## Second-Pass Verification — 2026-07-21

**Verdict: APPROVED**

The revised UI-SPEC was independently checked against the live worktree.

| Dimension | Verdict | Notes |
|---|---|---|
| Copywriting | PASS | Pi is explicitly no-native-MCP; privacy CTA is specific. |
| Visual hierarchy | PASS | Local-only stdio route is the second priority on `/mcp`. |
| Color | PASS | Small text uses AA-safe `#9aa0a6`; `#5f6368` is restricted. |
| Typography and spacing | PASS | Existing scale and spacing system are retained. |
| Route semantics | PASS | Direct HTTP is `/mcp` only; local bridge variants are `/mcp-stdio` only. |
| Discovery wiring | PASS | `llms.txt`, IndexNow, sitemap, and internal links are explicitly scoped. |

The WebSocket `--remote` bridge is expressly moved to `/mcp-stdio` as an optional
local-process variant. The remote route keeps only direct hosted HTTP. The contract
also reconciles bare UUID and canonical relay URL header values, and requires
published-documentation evidence for each claimed client configuration.
