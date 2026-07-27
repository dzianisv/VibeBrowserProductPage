---
phase: 160
slug: mcp-remote-split
status: draft
shadcn_initialized: true
preset: "style: default, baseColor: neutral, cssVariables: true (components.json, pre-existing)"
created: 2026-07-21
routes:
  - /mcp (rebuilt — hosted remote Streamable HTTP)
  - /mcp-stdio (new — moved local stdio guide)
---

# Phase 160 — UI Design Contract: MCP Remote/Stdio Route Split

> Visual and interaction contract for splitting `/mcp` (hosted remote) from `/mcp-stdio`
> (local process). Source of truth for planner and executor. Do not invent client
> config syntax — this document specifies **where copy goes and how it looks**, not
> the literal command/JSON strings for unverified agents.

---

## 0. Locked Inputs (from decisions.md / design.md — not re-litigated)

- `/mcp` stays the primary public URL; it becomes the **hosted remote Streamable HTTP**
  page. No redirect.
- `/mcp-stdio` is the **local-only stdio** guide, carrying over the existing local
  setup content from today's `/mcp`.
- **WebSocket `--remote` bridge disposition (resolves the old three-mechanism
  ambiguity):** the pre-existing `vibebrowser-mcp --remote <uuid>` flow — a **local**
  `npx` process that dials out to `wss://relay.api.vibebrowser.app/<uuid>` to reach a
  browser on another machine — is retired from `/mcp` entirely and relocated to
  `/mcp-stdio` as an **optional, clearly-secondary** variant of the local stdio setup
  ("point your local bridge at a remote browser"). It still starts a local process,
  so it must never appear on `/mcp` and must never be used to qualify or soften
  `/mcp`'s "no local process" claim. `/mcp` carries **only** the Direct Streamable
  HTTP mechanism (zero local process, header-based auth) — see §6 disposition table
  and anti-patterns #7/#11.
- `/mcp` must carry a prominent, non-buried link to `/mcp-stdio` framed as: local
  stdio avoids sending browser-control traffic through the internet relay.
- `/mcp` agent selector covers exactly: Claude Code, Codex CLI, GitHub Copilot (VS
  Code/Copilot Chat — distinct from CLI), GitHub Copilot CLI, Cursor, OpenCode, a
  generic MCP-compatible client, and Pi (honest no-native-MCP card). 8 cards total.
- Remote contract: endpoint `https://relay.api.vibebrowser.app/mcp`, header
  `X-Remote-Session`. Per design.md, the header **accepts either** a bare UUID **or**
  the canonical `wss://relay.api.vibebrowser.app/YOUR-SESSION-UUID` form — both are
  real, supported values (the extension's own "Copy the UUID/relay URL shown under
  Relay access" control may hand a user either string). UI copy/examples on `/mcp`
  should **illustrate the bare UUID** as the primary, shortest example, with one
  parenthetical note that the canonical `wss://` relay URL is also an accepted header
  value. This is unrelated to anti-pattern #2 (never show a *real* UUID, and never
  put a session identifier in a browser-navigable URL/query string in marketing
  copy) — placeholders only, in either format.
- `Verified` status (see §7) means a client's remote/Streamable-HTTP config syntax is
  confirmed against that client's own official documentation — **not** merely
  present in this repo. Two cards are `Verified` today because their existing
  in-repo strings (`DIRECT_MCP_CLI_COMMAND`, `DIRECT_MCP_JSON_CONFIG` for Claude Code
  CLI and generic JSON `mcpServers`) are also independently confirmed by published
  docs; the executor must record which doc source substantiates each. **If
  planning/research locates an equally-documented format for any of the other five
  clients, that card ships as `Verified` even though it isn't in this repo yet —
  absence from the current codebase is never a reason to downgrade a documented
  format to `Needs verification`.** Conversely, lacking a citable doc source keeps a
  card at `Needs verification` regardless of how plausible the guess looks.

---

## 1. Design System (detected — reuse, do not reinvent)

| Property | Value | Source |
|---|---|---|
| Tool | shadcn, already initialized | `components.json` |
| Component library | Radix primitives via shadcn (`accordion`, `badge`, `button`, `card`, `dialog`, `input`, `label`) | `components/ui/*` |
| Icon library | lucide-react | `components.json`, `app/mcp/page.tsx` imports |
| Body/heading font | Geist Sans (`GeistSans`, via `geist/font/sans`) | `app/layout.tsx` |
| Mono font (code blocks) | Geist Mono (`GeistMono`) via `font-mono` utility | `app/layout.tsx` |
| Page palette family | Page-scoped hex tokens (Google Material dark), **not** the generic shadcn HSL theme vars used elsewhere in the site | `app/mcp/page.tsx` |

**Do not** introduce the site's generic shadcn `bg-background`/`text-foreground` HSL
tokens on these two routes — `/mcp` already established its own dark palette
independent of the rest of the site, and `/mcp-stdio` must match it exactly since it
is literally the same page split in two.

---

## 2. Spacing Scale

Multiples of 4 only, matching the existing page's rhythm:

| Token | Value | Usage |
|---|---|---|
| xs | 4px | icon-to-label gaps, badge padding |
| sm | 8px | inline chip padding, tight stacks |
| md | 16px | card internal padding (`p-4`/`p-5`), form-like rows |
| lg | 24px | card padding on larger cards (`p-6`), gap between related cards |
| xl | 32px | gap between major in-section blocks |
| 2xl | 48–64px | `py-12`–`py-16` section vertical padding |
| 3xl | 80–112px | `py-20`–`py-28` hero vertical padding |

Exceptions: none. Reuse the exact Tailwind spacing utilities already present in
`app/mcp/page.tsx` (`p-4`, `p-5`, `p-6`, `gap-6`, `py-16 md:py-24`, etc.) verbatim for
new sections so the two routes stay pixel-consistent.

---

## 3. Typography (detected system — locked for this phase)

| Role | Size | Weight | Tracking/Line-height | Example class |
|---|---|---|---|---|
| Eyebrow/label | 11–12px | 500 (medium) | `uppercase tracking-[0.22em]` | `text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]` |
| Caption/meta | 12px (`text-xs`) | 400 | 1.4 | file paths, footnotes, badge text — color `#9aa0a6`, never `#5f6368` (see §10) |
| Body | 14px (`text-sm`) | 400 | 1.6 (`leading-7` on longer paragraphs) | card copy, FAQ answers |
| Subhead | 20px (`text-xl`) | 400 | 1.4 | hero paragraph |
| Card title (H3/H4) | 18–20px (`text-lg`/`text-xl`) | 500 (medium) | 1.3 | card headers |
| Section title (H2) | 24–30px (`text-2xl md:text-3xl`) | 400 (normal) | 1.2 | every section heading |
| Page title (H1) | 36–60px (`text-4xl sm:text-5xl md:text-6xl`) | 400 (normal) | `tracking-tight`, 1.1 | hero only, one per page |

Weights used: **400 (normal)** for all headings and prose, **500 (medium)** for
labels/card titles/buttons. `<strong>` inline emphasis inside FAQ/callout copy is an
accepted existing exception (browser-default bold) — do not add a third heading
weight anywhere else.

---

## 4. Color Contract

60/30/10 split, reusing the exact hex values already shipping on `/mcp`:

| Role | Value | Usage |
|---|---|---|
| Dominant (60%) | `#0a0a0a` | page background |
| Secondary (30%) | `#111111` surfaces, `#2a2a2a` borders | section bands, cards, code block chrome, dividers |
| Accent (10%) | `#8ab4f8` | **Reserved for:** primary CTA button fill, all text links, active/selected state on agent cards and tabs, primary icon accents (e.g. capability-surface icon chip) |
| Semantic — safe/local | `#81c995` (green) | **Reserved for:** the `/mcp → /mcp-stdio` privacy callout accent, "copied" checkmark state, local-mode indicator dot |
| Semantic — caution/credential | `#fdd663` (yellow) | **Reserved for:** the remote bearer-credential security callout box only (never used for the page's primary CTAs) |
| Destructive/error | `#f28b82` (red) | **Reserved for:** comparison-table "no" cells, copy-to-clipboard failure state only — never used for Pi's no-support card (see §9 anti-patterns) |

Muted text: `#9aa0a6` (secondary copy **and** tertiary/meta/caption/label copy —
measured 7.50:1 on `#0a0a0a`, 4.5:1+ AA-safe at any size) and `#e8eaed` (primary text
on dark). `#5f6368` measures **3.27:1 on `#0a0a0a` / 3.12:1 on `#111111` — it fails
4.5:1 and must never be used for text at label/caption/body sizes** (< 18.5px normal
or < 14px bold). Restrict `#5f6368` to large-text (≥18.5px normal / 14px bold) or
purely decorative/non-text uses (e.g. divider dots, disabled icon tint) where the
3:1 non-text-contrast bar applies instead. Reuse `#9aa0a6`/`#e8eaed` verbatim for all
small text; do not introduce new grays.

---

## 5. Visual Hierarchy

### `/mcp` (hosted remote) — priority order top→bottom

1. **H1 + subhead** — remote framing ("connect from anywhere," not "local process").
2. **Privacy banner linking to `/mcp-stdio`** — standalone, high-contrast, above the
   fold or immediately below hero. This is the single most important non-CTA element
   on the page per the locked requirement; it must outrank the comparison table,
   FAQ, and architecture content in visual weight.
3. **Remote endpoint quick-facts** (endpoint URL, header name, value format) — the
   thing a returning user scans for.
4. **Agent setup selector** (8 cards) — the primary task-completion surface.
5. **Security/credential-handling callout** (yellow, §4) — directly under the
   selector, not hidden in FAQ.
6. **Supporting credibility content** — capability surfaces, tools showcase,
   competitor comparison (unchanged from today, kept as-is).
7. **FAQ** (remote-focused subset, see §6).
8. **Closing CTA**, with a secondary, smaller repeat of the `/mcp-stdio` link.

### `/mcp-stdio` (local) — priority order top→bottom

1. **H1 + subhead** — privacy/local framing ("runs on your machine, no relay").
2. **Hero setup card** — "Install in Chrome" + "Copy config for {Agent}" split
   button, identical interaction pattern to today's `/mcp` hero (reuse, don't
   redesign).
3. **"Why local" explainer** — 2–3 short bullets, the differentiator copy.
4. **Local architecture diagram** (today's local-mode diagram, unchanged).
5. **Full 8-agent config reference** (today's `SETUP_CONFIGS` tabs, unchanged).
6. **Link back to `/mcp`** for remote/multi-machine/cloud-runner needs — present but
   visually quieter than the reverse link in §5.2, since local is already the
   privacy-safe default a visitor chose to land on.
7. **FAQ** (local-focused subset).
8. **Closing CTA.**

---

## 6. Page Sections (implementation-ready outline)

### `/mcp` sections, in order

1. **Hero** — H1 rotates agent names (keep existing `useTypewriter`/`ROTATING_AGENTS`
   mechanism, but rotation list should mirror the 7 named clients, not the old
   8-agent local list). Subhead emphasizes "your real browser, over a hosted
   relay — no local process, no Vibe Studio required." CTAs: primary "Install in
   Chrome" (extension prerequisite, unchanged destination), secondary anchor button
   "Jump to agent setup" scrolling to §6.4. Do **not** put a config-copy split button
   in the hero — remote setup requires a UUID the user doesn't have yet at
   first-paint, unlike stdio.
2. **Privacy/local callout banner** (new, `id="local-alternative"`) — full-width band,
   green-accented (§4), icon + one sentence + link. Sits directly under hero, before
   any endpoint detail. See §8 exact copy.
3. **Remote endpoint quick-facts card** — endpoint URL, `X-Remote-Session` header
   name, "value = the UUID from Settings → AI Agent Control → Remote (internet) →
   Relay access" (reuse existing extension-flow copy verbatim — already correct),
   plus a short parenthetical noting the canonical `wss://relay.api.vibebrowser.app/
   YOUR-SESSION-UUID` form is also an accepted header value (see §0) since the
   extension's own copy-affordance may hand a user either string.
4. **Agent setup selector** (`id="setup"`) — 8 cards, see §7 for anatomy. Grid, not
   the old two-item pill-row pattern (that pattern only had 2 entries; 8 needs a
   proper grid).
5. **Security/credential callout** — reuse today's "Security tradeoff" box content
   almost verbatim (it already exists and is correct), retitled since local-vs-remote
   contrast is no longer the framing (local content moved away) — reframe as "Handle
   your relay credential safely," dropping the "vs local stdio" comparison language
   and replacing it with a pointer to `/mcp-stdio` instead (avoids re-explaining local
   mode on this page).
6. **Capability surfaces** — unchanged, reuse today's tabbed content wholesale.
7. **Tools showcase** — unchanged, reuse wholesale.
8. **Competitor comparison table** — unchanged, reuse wholesale, **except** the
   "Internet-exposed relay" row's `detail` copy (source: "Expose your relay to the
   internet so remote agents can connect to your local browser from anywhere") —
   that phrasing describes the retired local-relay bridge (see disposition table
   below) and would misrepresent `/mcp`'s new hosted model. **Explicit call: keep
   the row** (Vibe is still the only one of the four compared products offering
   internet-reachable access at all — true regardless of transport) **but rewrite
   its `detail`** to: "Reach your browser over the internet — via the hosted Direct
   HTTP endpoint on this page, or an optional relay-exposed stdio bridge on
   `/mcp-stdio`." Do not drop the row and do not leave the old local-relay-specific
   wording in place.
9. **FAQ** — keep entries: differentiation vs competitors, multi-agent support,
   debug-permissions question, "what agents work," credential vault, open-source
   status, indexed markdown, standalone-browser question, "why real browser."
   **Explicitly drop** "Can remote agents on the internet connect to my browser?"
   (source item-2) from `/mcp` — its whole subject (the WebSocket `--remote` bridge)
   no longer belongs here; it moves wholesale to `/mcp-stdio`'s FAQ (see that page's
   item 7 below). Do not leave a stale or ambiguous trace of it on `/mcp`.
   **Add** one new FAQ entry: "I don't want my browser traffic to touch the internet
   — what should I use instead?" → answer links to `/mcp-stdio` (copy in §8).
   **Rewrite** "multi-agent support" (source item-3) for Direct HTTP — drop all
   port/daemon specifics (`19888`, stdio bridge) and use verbatim: "Yes. Each agent
   sends its own `X-Remote-Session` header value to the hosted endpoint
   independently — there's no local daemon or port to share, so multiple direct HTTP
   clients (or a mix of direct HTTP and local stdio agents) can drive the browser
   without conflicting." This is the literal replacement answer, not a placeholder.
10. **Closing CTA** — reuse pattern, adjust copy (§8), add the secondary
    `/mcp-stdio` link inline with the existing GitHub/npm/persona links row.

### Disposition: old combined "Local mode / Remote mode" Architecture Diagram section

Source `app/mcp/page.tsx` ~lines 890–1047 contains **three** artifacts that must be
split as follows — none stay combined, and no "Remote mode" (WebSocket bridge)
content stays on `/mcp`:

| Artifact | Today | Goes to |
|---|---|---|
| "Local mode" diagram (`LOCAL_MCP_COMMAND`, stdio bridges → `ws://localhost:19888` → extension) | `/mcp` (combined section) | `/mcp-stdio`, default/primary diagram — item 4 below, unchanged |
| "Remote mode" diagram + "Remote mode setup" steps + "Architecture highlights" grid (`REMOTE_MCP_COMMAND` = `vibebrowser-mcp --remote <uuid>`, `wss://relay...`) | `/mcp` (combined section) | `/mcp-stdio`, **new optional** addendum — item 4 addendum below. Never appears on `/mcp` in any form. |
| Direct Streamable HTTP diagram + setup steps + security callout (`app/mcp/page.tsx` ~1213–1360, `DIRECT_MCP_ENDPOINT`) | `/mcp` (separate section) | `/mcp` — the **only** diagram/setup flow `/mcp` keeps; already covered by items 3–5 above |

This closes the ambiguity in the previous draft: `/mcp` never shows a local-process
CLI command of any kind; `/mcp-stdio` gains the WebSocket bridge as an additional,
clearly-labeled optional path alongside its default local-only setup.

### `/mcp-stdio` sections, in order

1. **Hero** — H1/subhead reframed for local/privacy (see §8). Same split-button
   pattern as today's hero, unchanged mechanics, using the existing 8-agent
   `SETUP_CONFIGS` (Claude Code, OpenCode, Cursor, Claude Desktop, VS Code,
   Windsurf, Gemini CLI, Codex) verbatim — this content is already verified, do not
   touch the config strings.
2. **Compatible-agents strip** — unchanged, same 8-icon roster.
3. **"Why local" explainer band** — new, 2–3 bullets: "runs as a child process next
   to your agent," "talks to the extension over localhost only," "nothing leaves
   your machine, ever." Visually similar treatment to the existing green-dot
   "Local mode" diagram header.
4. **Local architecture diagram** — today's "Local mode" ASCII diagram section,
   unchanged, as the default/primary diagram on this page. **Immediately below it,
   add a new, visually secondary sub-section**: "Optional: point this bridge at a
   remote browser" — carries the old "Remote mode" diagram, its "Remote mode setup"
   numbered steps (`REMOTE_MCP_COMMAND`, `wss://relay.api.vibebrowser.app/<uuid>`),
   and the "Architecture highlights" grid (Multi-Agent / Connect from Anywhere /
   Authenticated), moved verbatim from `app/mcp/page.tsx`. Style it visibly
   subordinate to the default diagram (e.g., a collapsed `Accordion` or muted card,
   not full section visual weight) — it is still the *same* stdio bridge, just
   pointed at a browser on another machine over the relay, and must read as
   secondary to the default localhost-only path, not as a second "remote mode"
   competing with `/mcp`'s Direct HTTP framing. Retitle away from "Remote mode"
   (that label now collides with `/mcp`'s subject) to "Optional: point this bridge
   at a remote browser" or equivalent.
5. **Local setup steps card** — a trimmed version of today's numbered instructions
   (points 1–3) for the **default** localhost-only path, dropping any reference to
   `--remote`/UUID (that content lives only in item 4's optional addendum above, not
   here).
6. **Link to `/mcp`** — one clearly-labeled sentence/card: "Need agents outside your
   machine, or a cloud runner? Hosted remote MCP is on `/mcp`." Quieter styling than
   §6.2 of `/mcp` (this is a "by the way," not the page's main hook).
7. **FAQ (local subset)** — keep: multi-agent local relay (ports 19888/19889),
   debug-permissions question, credential vault, open-source status, indexed
   markdown, standalone-browser question. **Add back** the existing "Can remote
   agents on the internet connect to my browser?" entry (source item-2) here,
   reworded to describe the item-4 optional bridge addendum above, keeping its
   existing `/openclaw` cross-link (OpenClaw's own remote flow uses this same
   `--remote` mechanism — see §13 internal-link notes). **Do not** move any FAQ
   entry to `/mcp` — `/mcp`'s FAQ is the remote-Direct-HTTP-focused subset in §6.9,
   already fully specified there and unrelated to the bridge.
8. **Closing CTA** — same pattern, copy reframed for "local setup," secondary link
   back to `/mcp`.

**Explicitly do not carry over to `/mcp-stdio`:** capability surfaces, tools
showcase, and competitor comparison table sections. Those are core `/mcp` marketing
content; duplicating them on `/mcp-stdio` creates near-duplicate page content (bad
for SEO, bad for maintenance) for a page whose job is "how do I run this locally."

---

## 7. Agent Setup Selector — Card Anatomy (`/mcp`)

Single component spec, 8 instances. Do not vary structure per card — only content
and a status badge differ.

**Layout:** responsive grid — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-4`,
inside `id="setup"`. Selecting a card swaps a single shared code-block panel below
the grid (same interaction model as today's `DIRECT_REMOTE_SETUP_CONFIGS` tab
buttons — extend that pattern from 2 to 8 entries, don't invent a new pattern).

**Per-card fields:**

| Field | Content rule |
|---|---|
| Icon/avatar | Reuse/extend `AgentIcon` — add keys for `codex-cli`, `copilot-vscode`, `copilot-cli`, `generic`, `pi` |
| Title | Exact client name: "Claude Code", "Codex CLI", "GitHub Copilot (VS Code)", "GitHub Copilot CLI", "Cursor", "OpenCode", "Generic MCP client", "Pi" |
| Status badge | One of: `Verified` (green), `Generic JSON` (blue), `Needs verification` (yellow, implementation must confirm against official docs before shipping), `No native MCP` (neutral gray — Pi only) |
| Body | 1 short sentence describing the config surface (e.g., "CLI command," "settings.json entry," "JSON `mcpServers` block") — no invented flag names in the *card blurb*; specifics live only in the code panel once verified |
| Action | Selecting the card shows its config in the shared code panel + Copy button, **except** Pi (see below) |

**Status badge → content mapping (mandatory, do not blend):**

- `Verified` — any card whose exact remote/Streamable-HTTP config string is backed
  by a citable, current official doc from that client (see §0). Today that's Claude
  Code CLI and generic JSON `mcpServers`, using the existing `DIRECT_MCP_CLI_COMMAND`/
  `DIRECT_MCP_JSON_CONFIG` strings — executor must record which doc URL/version
  substantiates each. **If research turns up an equally-documented format for Codex
  CLI, GitHub Copilot (VS Code or CLI), Cursor, or OpenCode before this ships, that
  card is `Verified` too — never leave a documented format at `Needs verification`
  just because it isn't already hardcoded in this repo.**
- `Needs verification` — the fallback for any of the above five clients when, at
  ship time, no citable official doc for their remote transport syntax was found.
  Code panel shows a placeholder state: "Confirm this client's Streamable HTTP /
  remote MCP syntax in its official docs before publishing" plus a link to that
  client's docs (if design.md/research names one) instead of a fake command. This is
  a content gate for the executor, not a visual defect — ship the placeholder rather
  than a guessed command.
- `No native MCP` — Pi. See dedicated spec below.

**Pi card (honesty requirement):**

- Neutral, muted styling — **not** destructive red, **not** a grayed-out/disabled
  look that reads as "broken." Use `MinusCircle` icon (already imported elsewhere in
  this file for "partial/not applicable" table cells) in `#9aa0a6`, not `XCircle` in
  red.
- No code panel, no Copy button — there is nothing to copy.
- Body copy states the fact plainly (see §8) and offers the one truthful
  alternative already substantiated elsewhere on this site: Vibe also works as a
  standalone in-browser co-pilot without MCP. Link to the extension install page.
  Do not invent any Pi-specific bridge, plugin, or workaround.

**GitHub Copilot split (two cards, not one):** "GitHub Copilot (VS Code)" refers to
the Copilot Chat MCP integration inside the editor (`settings.json`, the same
surface already used for local stdio today via `github.copilot.chat.mcpServers`).
"GitHub Copilot CLI" is a distinct standalone product with its own config surface.
Do not merge them into one card with an "either/or" toggle — they are different
installs for different users and must read as two separate entries in the grid.

---

## 8. Copywriting Contract

| Element | Copy | Notes |
|---|---|---|
| `/mcp` H1 | "Give **{Agent}** a real browser — from anywhere" | Rotates through the 7 named clients only (drop Windsurf/Gemini/Claude Desktop from the rotation list on this page; they're not in the remote card set) |
| `/mcp` subhead | "Your real logged-in browser, exposed as a hosted MCP endpoint. No local process, no port forwarding, no VPN." | Reframes today's subhead away from "no Browserbase account" toward "no local process" — the differentiator that matters for *this* page |
| `/mcp` primary CTA | "Install in Chrome" | unchanged destination/behavior |
| `/mcp` secondary hero CTA | "Jump to agent setup" | anchors to `#setup`, replaces the old install-in-agent split button in hero |
| `/mcp` privacy banner heading | "Don't want browser-control traffic to touch the internet?" | |
| `/mcp` privacy banner body | "Run Vibe MCP locally instead — it never leaves your machine. See the **local stdio setup**." | "local stdio setup" is the link text to `/mcp-stdio` |
| `/mcp` security callout lead | "Handle your relay credential safely" | replaces today's "Security tradeoff:" local-vs-remote framing (that comparison now lives on `/mcp-stdio`'s reciprocal link, not restated here) |
| `/mcp` new FAQ Q | "I don't want my browser traffic to touch the internet — what should I use instead?" | A: "Use local stdio MCP — it runs as a process on your machine and never sends browser-control traffic over the internet. See `/mcp-stdio`." |
| `/mcp` closing CTA heading | "Ready to connect your AI agent from anywhere?" | |
| `/mcp` closing CTA body | "Grab your relay UUID from the extension, add one config block, and go. Prefer to stay fully local? Use local stdio MCP instead." | inline link on "local stdio MCP" |
| `/mcp-stdio` H1 | "Run **{Agent}**'s browser control locally — no internet relay" | rotates the 8 local-verified agents, unchanged list |
| `/mcp-stdio` subhead | "vibebrowser-mcp runs as a process next to your agent and talks to the extension over localhost only. Nothing leaves your machine." | |
| `/mcp-stdio` "why local" bullets | "Runs on your machine, not a hosted relay" / "No bearer credential ever sent over the internet" / "The safest default when your agent and browser are on the same computer" | |
| `/mcp-stdio` reciprocal link | "Need agents outside your machine, or a cloud runner? Hosted remote MCP is on **`/mcp`**." | quieter placement than the `/mcp` privacy banner, per §5 |
| `/mcp-stdio` optional-bridge heading | "Optional: point this bridge at a remote browser" | §6 item 4 addendum — replaces the old "Remote mode" label |
| `/mcp-stdio` optional-bridge body | "Same local process, same `--remote` flag — instead of talking to a browser on this machine, it dials out to a browser on another machine through our relay. Most people don't need this; use it when your agent and browser aren't on the same computer and you'd rather keep a local process than call the hosted endpoint directly." | sits directly above the moved diagram/steps; distinguishes this from both the default local path above it and from `/mcp`'s Direct HTTP |
| `/mcp-stdio` closing CTA heading | "Ready to connect your local AI agent?" | |
| Pi card body | "Pi doesn't support MCP or third-party tool plugins today. If you want browser automation with Pi's assistant experience, Vibe also works as a **standalone in-browser co-pilot** — no MCP required." | link "standalone in-browser co-pilot" → existing extension install page |
| Pi card status label | "No native MCP support" | never phrase as "Coming soon" or "Not yet supported" — no roadmap claim exists to back that |
| Copy-success toast (all copy buttons) | "Copied" | existing pattern, keep |
| Copy-failure state | "Copy failed" | new — currently unhandled in `app/mcp/page.tsx`'s local `CopyButton`; `components/copyable-prompt.tsx` already has this state, mirror its logic |
| "Needs verification" card note | "Verify this client's remote MCP syntax against its official docs before publishing." | internal/implementation-facing copy, should not read as consumer-facing marketing fluff — fine if styled distinctly (e.g., a dashed border) to signal it's a placeholder, but must not ship silently as if it were a real command |

---

## 9. Responsive Requirements

- Agent selector grid: 1 col (< 640px) → 2 col (`sm:`) → 4 col (`lg:`), `gap-4`.
- Shared config panel below the grid keeps the existing scroll pattern: header row
  with filename + Copy button, `pre` body with `overflow-x-auto`, plus
  `whitespace-pre-wrap break-all` for JSON blocks so long lines wrap instead of
  forcing horizontal scroll on mobile (already the pattern for
  `DIRECT_REMOTE_SETUP_CONFIGS`; extend it to all 8 cards).
- Hero split-button: agent names up to "GitHub Copilot (VS Code)" length must not
  overflow the button on ≤375px viewports — truncate the visible label and keep the
  full name + detail line in the dropdown list item (existing dropdown item pattern
  already supports a name + file/detail two-line layout).
- Privacy banner must render as a real, always-visible inline link — never a
  hover-only reveal (hover has no reliable mobile equivalent).
- Anchor-jump CTA ("Jump to agent setup") must account for the sticky `SiteNav`
  height in scroll-offset so the target section isn't hidden underneath it.
- ASCII-art diagrams (`pre` blocks): keep `overflow-x-auto` on mobile; do not shrink
  font below `text-sm` to fit width, since that makes the diagrams illegible.

---

## 10. Accessibility Requirements

- Maintain single `h1` per page; `h2` for every major section; `h3`/`h4` for card
  and sub-block titles. Do not skip levels.
- All copy buttons: keep `aria-label="Copy to clipboard"`; add
  `aria-live="polite"` around the status text so "Copied"/"Copy failed" is announced
  (today's local `CopyButton` lacks this — `components/copyable-prompt.tsx` already
  has the correct pattern to copy).
- Agent selector cards/tabs: implement as real `<button>` elements with
  `aria-pressed={selected}`, matching the existing `DIRECT_REMOTE_SETUP_CONFIGS`
  toggle-button approach — do not build a full ARIA `tablist`/`tab` pattern, it adds
  roving-tabindex complexity this component doesn't need.
- Pi card: since it has no code panel, ensure its one real action (the standalone
  co-pilot link) is still a focusable, labelled link — don't make the whole card an
  inert `div` with no reachable interactive content.
- Decorative ASCII diagrams: mark the `pre` block `aria-hidden="true"` and ensure
  the adjacent prose fully describes the flow in real sentences (partially true
  today; confirm every diagram has a prose equivalent on both routes).
- Color contrast (measured WCAG relative luminance, corrects the prior draft's false
  claim): `#e8eaed` on `#0a0a0a`/`#111111` = 16.43:1; `#9aa0a6` on either = 7.50:1 —
  both pass 4.5:1 at any text size. `#5f6368` on `#0a0a0a`/`#111111` = 3.27:1/3.12:1
  — **fails 4.5:1** and must not be used for body/caption/label/eyebrow text (see
  §3/§4, both corrected). Use `#9aa0a6` or `#e8eaed` for all text ≤ 18.5px normal /
  14px bold; `#5f6368` is restricted to large text (≥18.5px/14px bold) or
  decorative/non-text elements (divider dots, muted icon tint) governed by the 3:1
  non-text bar. This applies identically to the new `/mcp-stdio` route — do not
  carry the failing pairing onto brand-new markup.
- Focus states: keep default shadcn `Button`/`Badge` focus-visible rings; don't
  strip them via custom `className` overrides on new cards.

---

## 11. Component Reuse Guidance

- **Reuse as-is:** `SiteNav`, `SiteFooter`, shadcn `Button`, `Badge`,
  `Card`/`CardContent`, `Accordion`/`AccordionItem`/`AccordionTrigger`/
  `AccordionContent`, lucide icons, `trackCTAClick` analytics helper.
- **Must update:** `darkPages` arrays in `components/site-nav.tsx` and
  `components/site-footer.tsx` — both currently list `/mcp` but not `/mcp-stdio`;
  add it or the new route renders in the wrong (light) nav variant.
- **Extract, don't fork:** the inline `CopyButton` and `AgentIcon` components
  currently defined at the bottom of `app/mcp/page.tsx` should move to a shared
  module (e.g. `components/mcp/copy-button.tsx`, `components/mcp/agent-icon.tsx`) so
  `/mcp` and `/mcp-stdio` import one implementation instead of duplicating it.
  `AgentIcon`'s `labels`/`colors` maps need new keys: `codex-cli`, `copilot-vscode`,
  `copilot-cli`, `generic`, `pi`.
- **Do not** pull in `components/copyable-prompt.tsx` as a visual component on these
  routes — its indigo theme (built for `/openclaw`) doesn't match the established
  Material-dark palette here. Only its `aria-live`/copy-failure **logic** is worth
  copying (see §10), not its markup/styling.
- **Base the new remote page on the existing "Direct remote MCP" section**
  (`app/mcp/page.tsx`, currently ~lines 1213–1360: two-column contrast cards, ASCII
  diagram box, numbered setup steps, yellow security callout). This is already the
  correct visual language for `/mcp`'s new purpose — promote and extend it, don't
  design a new system.
- **Extend, don't replace,** the existing `DIRECT_REMOTE_SETUP_CONFIGS` tab-button
  pattern to cover all 8 agent cards (§7) rather than inventing a new selector
  widget.
- **Move, do not duplicate,** the WebSocket bridge's existing implementation
  artifacts — `REMOTE_MCP_COMMAND`, `REMOTE_MCP_DISPLAY_COMMAND`, the "Remote mode"
  diagram JSX, "Remote mode setup" numbered-steps JSX, and the "Architecture
  highlights" grid (Multi-Agent / Connect from Anywhere / Authenticated) — from
  `app/mcp/page.tsx` to `/mcp-stdio` verbatim as the item 4 optional addendum (§6).
  None of this markup or these constants should remain on, or be forked/duplicated
  onto, `/mcp`.

---

## 12. Anti-Patterns (explicit — do not do these)

1. **Never fabricate CLI flags, config keys, or file paths** for Codex CLI, GitHub
   Copilot (VS Code or CLI), Cursor, or OpenCode's *remote* transport. If unverified,
   ship the "Needs verification" placeholder state (§7), not a plausible-looking
   guess.
2. **Never put the session UUID in a URL, query string, or code sample as anything
   but the `X-Remote-Session` header value.** Never show a real UUID anywhere —
   placeholder text only (`<uuid>`).
3. **Never imply Pi has MCP/plugin support**, and never invent a bridge/adapter for
   it. State the limitation once, plainly, and stop.
4. **Never bury the `/mcp-stdio` link** inside the FAQ accordion only — it must
   exist as a standalone, always-visible banner per §6.2.
5. **Never style the Pi card as an error/destructive state** (no red, no `XCircle`).
   It's an honest limitation, not a failure.
6. **Never duplicate the full capability-surfaces/tools/comparison marketing
   content on `/mcp-stdio`** — keep it a focused install guide that links back to
   `/mcp` for the rest.
7. **Never leave the old combined "Local mode / Remote mode" architecture-diagram
   section intact on `/mcp`** showing either mode — it must not exist on `/mcp` in
   any form. Split per the §6 disposition table: the "Local mode" diagram moves to
   `/mcp-stdio` as its default diagram; the "Remote mode" WebSocket-bridge diagram,
   its setup steps, and its "Architecture highlights" grid also move to
   `/mcp-stdio` (as a secondary, clearly-labeled optional addendum — never the
   default, never on `/mcp`). `/mcp` keeps only the pre-existing Direct Streamable
   HTTP diagram/steps (source ~1213–1360) — never relabel the WebSocket bridge's
   diagram as if it were this Direct HTTP diagram, and never let both appear
   side-by-side on either page.
8. **Never let the compatible-agents strip on `/mcp` list agents that aren't in the
   8-card selector below it** (e.g., don't show Windsurf/Gemini CLI/Claude Desktop
   badges on `/mcp` if they're not part of the remote card set — that mismatch reads
   as broken promises).
9. **Never auto-redirect** `/mcp` ↔ `/mcp-stdio`. Both are permanent, distinct,
   linked pages.
10. **Never reuse identical OG image/canonical/JSON-LD between the two routes** —
    each needs its own accurate metadata (see §13).
11. **Never let `/mcp` reference, link to, or reuse copy from the retired WebSocket
    `--remote` bridge** (the `REMOTE_MCP_COMMAND`/`REMOTE_MCP_DISPLAY_COMMAND`
    strings, "Remote mode" heading, or "Architecture highlights" grid) — that
    mechanism is `/mcp-stdio`-only now (§0, §6 disposition table). If in doubt
    whether a piece of copy describes the bridge or Direct HTTP: if it mentions a
    local process or the `--remote` CLI flag, it's bridge copy and does not belong
    on `/mcp`.

---

## 13. Route-Specific SEO / Visual Asset Notes

### `/mcp`

- **Canonical:** unchanged, `https://www.vibebrowser.app/mcp`.
- **Title/description:** rewrite away from local-process framing. Emphasize
  "hosted," "remote," "Streamable HTTP," "no install," while keeping the existing
  brand/competitor keyword list (still accurate — competitors are compared
  regardless of transport).
- **OG/Twitter image:** `public/og/mcp.svg` (referenced in `app/mcp/layout.tsx`) plus
  the code-generated `app/mcp/opengraph-image.tsx`/`twitter-image.tsx` both currently
  say "Real Browser MCP" generically — fine to keep the brand mark, but any
  sub-copy referencing local install specifics should shift to "Hosted · Streamable
  HTTP" framing so social previews match new page content.
- **JSON-LD:** `HowToStep` #3 in `app/mcp/layout.tsx` currently demonstrates the
  *local* `mcpServers` JSON block — update it to the remote header-based example
  (already-verified `DIRECT_MCP_JSON_CONFIG`/CLI string) so structured data matches
  the visible page. Trim `FAQPage` entries to the remote-focused subset from §6.9;
  move the rest to `/mcp-stdio`'s own `FAQPage` block.
- **Sitemap:** `app/sitemap.ts` already lists `/mcp` — no change needed there.

### `/mcp-stdio`

- **New route, new metadata entirely** — do not clone `/mcp`'s metadata verbatim.
  Title should foreground "local," "stdio," "no internet relay." Canonical:
  `https://www.vibebrowser.app/mcp-stdio`.
- **New OG/Twitter image** — a distinct asset (e.g. `public/og/mcp-stdio.svg`) so
  social shares don't show the remote-page's imagery for a local-only guide.
- **New JSON-LD** — `HowTo` for the local setup flow (install extension → enable
  local relay → add stdio config), `FAQPage` with the local-only subset from §6
  ("`/mcp-stdio`" list). Do not carry the remote `HowToStep` here.
- **Sitemap:** add a new entry for `/mcp-stdio` in `app/sitemap.ts` (currently only
  `/mcp` is listed).
- **Internal links (nav/footer):** top nav (`components/site-nav.tsx`) can stay
  pointing only at `/mcp` (keep nav simple); footer's existing "Agents"/"MCP for
  Agents" link clusters (`components/site-footer.tsx`) are the right place to add a
  secondary "Local-only MCP setup" link to `/mcp-stdio`.
- **Internal links (stdio-specific, outside nav/footer) — explicit target
  decisions, resolved now, not deferred to the executor:**

  | Source | Current copy/context | New target | Why |
  |---|---|---|---|
  | `app/cli/page.tsx:326` | "Use the same package via `/mcp` setup without changing the execution layer." | `/mcp-stdio` | Retargeting makes the existing sentence *true again*: the local execution layer is unchanged on `/mcp-stdio`; left pointing at `/mcp` it becomes false (that's now HTTP-based, a different execution layer). Change the `href` only, keep the copy. |
  | `app/cloud/page.tsx:539` | `<Link href="/mcp">Get the extension →</Link>` under the free/local tier's bullet list (`npx @vibebrowser/mcp`, "your local browser, pre-authenticated") | `/mcp-stdio` | The surrounding bullets describe the local/free tier specifically; the CTA must land on the page that still matches that description post-split. |
  | `app/openclaw/page.tsx:212` | "For JSON MCP config blocks (Claude Code, Codex, Cursor, VS Code), use Vibe Browser for Agents [`/mcp`]" | `/mcp-stdio` | All four named clients and the "JSON config blocks" phrasing describe the local `SETUP_CONFIGS` entries (all four are in that list), not the new 8-card remote selector. |

  All three: change the `href` only — no copy rewrite required. Do not leave any of
  these three pointing at `/mcp` after the split.
- **IndexNow:** `scripts/indexnow-ping.js`'s `defaultPaths` hardcodes `/mcp` and has
  no `/mcp-stdio` entry. Add `"/mcp-stdio"` to `defaultPaths` alongside the existing
  `"/mcp"` entry — both routes are permanent, indexable pages (anti-pattern #9:
  never redirect between them), so both must be pinged.
- **llms.txt:** the route is `app/llms.txt/route.ts` (a dynamic Next.js route
  serving `/llms.txt` at request time — correcting the prior draft's claim that no
  such file exists; there is no static `public/llms.txt`). Its `primaryPages` array
  currently has one `/mcp` entry labeled "Vibe Browser for Agents MCP page." Require
  **two separate entries** post-split:
  - Update the existing `/mcp` entry's label to "Vibe Browser for Agents — hosted
    remote MCP page" (reflects the new hosted-only content).
  - Add a new entry: "Vibe Browser for Agents — local stdio MCP page" →
    `${siteUrl}/mcp-stdio`.
  Both entries must be present so AI agents/crawlers reading `/llms.txt` see the
  remote and local guides as the two distinct surfaces they now are.

---

## 14. Registry Safety

| Registry | Blocks Used | Safety Gate |
|---|---|---|
| shadcn official | accordion, badge, button, card, dialog, input, label (all pre-existing, already in use) | not required — no new registry pulls needed for this phase |
| Third-party | none declared | not applicable |

No new component installs are required to execute this spec — everything needed
(cards, tabs-as-toggle-buttons, accordions, badges) is buildable from components
already present in `components/ui/`.

---

## 15. Checker Sign-Off

- [ ] Copywriting — CTA/banner/Pi-card/FAQ copy matches §8 exactly, no invented
      client syntax present anywhere on `/mcp`.
- [ ] Visuals — section order matches §6 for both routes; local/remote diagrams are
      fully split, not duplicated.
- [ ] Color — accent reservations from §4 respected; Pi card uses neutral styling,
      not destructive red.
- [ ] Typography — scale in §3 used consistently on both routes, no new sizes/weights
      introduced.
- [ ] Spacing — §2 scale reused verbatim from existing `/mcp` utility classes.
- [ ] Registry safety — no third-party registry introduced.
- [ ] Bridge disposition — the WebSocket `--remote` bridge (diagram, setup steps,
      highlights grid, `REMOTE_MCP_COMMAND`) appears only on `/mcp-stdio` as the
      optional addendum in §6 item 4; zero trace of it on `/mcp` (§0, §12 #7/#11).
- [ ] Accessibility — no body/caption/label/eyebrow text uses `#5f6368`; only
      `#9aa0a6` or `#e8eaed` for text ≤ 18.5px/14px-bold (§10).
- [ ] SEO/discovery — `app/llms.txt/route.ts` has separate `/mcp` and `/mcp-stdio`
      entries; `scripts/indexnow-ping.js` `defaultPaths` includes `/mcp-stdio`; the
      three internal links in §13 point at their new targets.

**Approval:** pending
