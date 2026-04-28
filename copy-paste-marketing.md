# Copy-Paste Marketing Playbook

> VibeBrowser's replicable growth system across CWS, SEO, content, and community.
> Updated: 2026-04-28

---

## 0. The Biggest Insight Nobody Told You

Your #1 competitor **dassi** (4.9★, Featured) has this CWS title:

> "dassi: AI Browser Agent for Claude, GPT & Gemini"

**HARPA** (4.7★, Featured):

> "HARPA AI: Web Automation with ChatGPT, Claude, Gemini, Grok"

Your current CWS title:

> "Vibe AI Browser Co-Pilot"

That title is **invisible** to anyone searching "Claude browser agent", "Gemini browser automation", or "GPT browser extension". dassi and HARPA are eating your installs right now just by putting model names in the title.

**Fix #0 (do today):** Rename the existing listing:

```
Vibe: AI Browser Agent for Claude, Copilot, Gemini & GPT
```

This is not gray-area. It's exactly what every Featured competitor does. It's nominative fair use (describing compatibility). dassi has been doing it for months with a 4.9★ rating and "Featured" badge.

---

## 1. CWS Multi-Listing Strategy (The "Vibe for X" Family)

### Phase 1: Rename main listing (Week 1)

**Current:** "Vibe AI Browser Co-Pilot"
**New:** "Vibe: AI Browser Agent for Claude, Copilot, Gemini & GPT"

**New short description (132 chars):**
```
AI browser agent that automates your logged-in accounts. Works with Claude, Copilot, Gemini, GPT, Ollama. Privacy-first. Free tier.
```

**New detailed description strategy:**
- Front-load: "Vibe is an AI browser agent that works with Claude, GitHub Copilot, Gemini, GPT, Ollama, and Chrome Built-in AI."
- List model-specific features (Claude Code integration, Copilot MCP, Gemini long-context)
- Keyword-stuff naturally: "Claude browser extension", "Gemini browser automation", "GPT browser agent", "Copilot browser co-pilot"

**Expected impact:** 2–5× more impressions from model-name searches. Zero risk — it's what every competitor does.

### Phase 2: "Vibe for Claude" listing (Week 2–3)

First separate listing. Targets the highest-value search gap: people looking for a Claude browser agent that isn't Anthropic's (which has 2.7★).

**CWS title:** "Vibe for Claude — AI Browser Agent"

**Differentiation from main listing (CWS compliance):**
- Default model: Claude (claude-code: or Anthropic API)
- Onboarding flow: "Enter your Claude API key" (not model picker)
- Screenshots: Show Claude-specific workflows (Claude Code + browser testing loop)
- New-tab page: Claude tips, Claude Code integration guide
- Description: Entirely Claude-focused copy

**Why Claude first:**
- Anthropic's official "Claude" extension has **2.7★** — users are actively unhappy
- "Claude browser agent" search shows dassi and Side Copilot, not VibeBrowser
- Claude Code users are the highest-intent audience for browser MCP

### Phase 3: Additional listings (Week 6+ only if Phase 2 survives)

Only after "Vibe for Claude" has existed 60 days without CWS flags:

| Listing | Default model | Target search |
|---|---|---|
| Vibe for Gemini — AI Browser Agent | Gemini API | "Gemini browser automation" |
| Vibe for ChatGPT — AI Browser Agent | GPT-4o | "ChatGPT browser extension" |

**Do NOT launch all at once.** Launching 4 similar listings simultaneously triggers Google's automated duplicate detection and risks the entire developer account.

### Build variant system (one-time engineering)

```
vibe/
├── build.py --variant claude|gemini|chatgpt|main
├── manifests/
│   ├── main.json       # "Vibe: AI Browser Agent for Claude, Copilot, Gemini & GPT"
│   ├── claude.json     # "Vibe for Claude — AI Browser Agent"
│   ├── gemini.json     # "Vibe for Gemini — AI Browser Agent"
│   └── chatgpt.json    # "Vibe for ChatGPT — AI Browser Agent"
├── assets/
│   ├── icon-main/      # Current purple
│   ├── icon-claude/    # Amber/warm (ORIGINAL design, NOT Anthropic's)
│   ├── icon-gemini/    # Blue/cyan (ORIGINAL design, NOT Google's)
│   └── icon-chatgpt/   # Green/teal (ORIGINAL design, NOT OpenAI's)
├── configs/
│   ├── defaults-claude.json   # { model: "claude-code:", onboarding: "claude" }
│   ├── defaults-gemini.json
│   └── defaults-chatgpt.json
```

Each `build.py --variant X` produces a different `.zip` with different manifest, icons, and default config. Same JS code.

---

## 2. Landing Page Templates (SEO + LLM Citations)

### Done ✅
- `/claude` — "Give Claude a Real Browser"
- `/gemini` — "Give Gemini a Real Browser"
- `/codex` — "Give Codex a Real Browser"
- `/copilot` — "GitHub Copilot for Real-World Work"
- `/cloud` — Cloud browser MCP ($9/mo)

### To create (template from ProfessionTemplate)

| Page | Title hook | Primary keyword |
|---|---|---|
| `/chatgpt` | "Give ChatGPT a Real Browser" | "ChatGPT browser extension" |
| `/grok` | "Give Grok a Real Browser" | "Grok browser automation" |
| `/ollama` | "VibeBrowser + Ollama: Private AI That Acts" | "Ollama browser agent local" |
| `/deepseek` | "Give DeepSeek a Real Browser" | "DeepSeek browser extension" |

**Each page needs:**
- Page-level `<Metadata>` with model name in title + description
- FAQPage JSON-LD (3–5 Q&As targeting exact questions people ask LLMs)
- Model-specific MCP config snippet
- 6 features, 6 workflows, 5 FAQs (all model-specific, not generic)
- Wired into: site-nav, site-footer, sitemap.ts

**Why this works for LLM citations:** When someone asks Gemini "what browser extension works with Gemini CLI?", Gemini looks for pages that:
1. Have "Gemini" + "browser" + "extension" in title/H1
2. Have structured FAQ data matching the query pattern
3. Rank well on Google for that phrase
4. Exist in llms.txt as a primary resource

The landing pages serve all four signals.

---

## 3. Blog Content Factory

### Template A: "How to automate [workflow] with [model] + VibeBrowser"

Stamp out 1 post per model × 3 workflows = 12 posts:

| Model | Workflow 1 | Workflow 2 | Workflow 3 |
|---|---|---|---|
| Claude | Gmail triage | GitHub PR review | Salesforce prep |
| Gemini | Google Sheets analysis | Multi-site research | Drive organization |
| Codex/GPT | CI/CD monitoring | Staging verification | Changelog generation |
| Copilot | LinkedIn outreach | CRM updates | Calendar coordination |

**Template structure:**
```markdown
---
title: "How to Automate [Workflow] with [Model] + VibeBrowser"
description: "Step-by-step: connect [Model] to a real browser via MCP..."
tags: [model-name, workflow, browser-automation, mcp]
published: true
---

## The Problem
[Workflow] takes [X minutes/hours] per [day/week]. [Model] can reason about it,
but can't actually log into [Service] and do it.

## The Setup (2 minutes)
npx @vibebrowser/mcp config snippet...

## The Workflow
Step-by-step with what to tell the model...

## What You Get
Before/after. Time saved. Token cost.

## Try It
CTA → extension install + /cloud signup
```

### Template B: "VibeBrowser vs [Competitor]"

| Comparison | Angle |
|---|---|
| VibeBrowser vs Claude for Chrome | Multi-model, cloud, markdown, always-on |
| VibeBrowser vs dassi | Cloud browser, MCP-native, CLI access |
| VibeBrowser vs HARPA AI | Real browser control (not just sidebar chat) |
| VibeBrowser vs Browserbase | 90% cheaper, pre-auth, no scraping infra |
| VibeBrowser vs Browser Use | Extension vs headless, no Playwright boilerplate |

### Template C: "[Model] browser extension: complete guide [year]"

Long-form SEO posts targeting informational queries. Each covers:
- What the model can/can't do natively in browser
- Official extensions (if any) and their limitations
- How VibeBrowser fills the gap
- Setup walkthrough
- FAQ section (feeds LLM citation)

**Priority:** Claude guide first (2.7★ official extension = frustrated users searching for alternatives).

---

## 4. "Alternative to" SEO Pages

Create dedicated comparison pages under `/compare/[competitor]`:

| URL | Title |
|---|---|
| `/compare/claude-for-chrome` | "VibeBrowser vs Claude for Chrome: Which AI Browser Agent?" |
| `/compare/dassi` | "VibeBrowser vs dassi: Multi-Model Browser Agents Compared" |
| `/compare/harpa` | "VibeBrowser vs HARPA AI: Automation vs Chat Sidebar" |
| `/compare/browserbase` | "VibeBrowser vs Browserbase: Cloud Browser for AI Agents" |

These capture high-intent "X vs Y" searches. **Important:** be factually honest. Link to competitor pages. Google rewards genuine comparisons and penalizes hit pieces.

Already have: `/compare` (general comparison page). Extend with `/compare/[slug]` dynamic route.

---

## 5. CWS Visual Branding & Asset Strategy

### 5.1 Icon Design Strategy

#### Current approach: Hue-shifted base icon
- We have a script that rotates the hue of our purple "V" icon
- Claude variant: 25° shift (amber)
- Gemini variant: -60° shift (blue)
- ChatGPT variant: 120° shift (green)

#### Why hue-shifting is NOT enough
At 48px in CWS search results, a hue-shifted icon looks generic and undifferentiated. Top extensions like dassi, HARPA, and Monica all have DISTINCTIVE icons that work at tiny sizes. The icon is the #1 conversion driver in CWS search — users scan icons BEFORE reading titles. A hue-shifted "V" in amber vs blue vs green still reads as "the same extension in different colors" rather than a purpose-built tool for their specific model ecosystem. We need icons that are INSTANTLY recognizable and convey model-specific personality.

#### Recommended icon strategy per variant
Each variant icon should:
1. Keep the Vibe "V" lettermark as the base shape (brand consistency)
2. Add a UNIQUE visual accent that suggests the model ecosystem WITHOUT copying their logo
3. Work clearly at 16px, 48px, and 128px (the three sizes CWS uses)
4. Pass the "squint test" — distinguishable from other extensions at a glance

**Main listing icon:** Keep current purple "V" — it's the master brand

**Vibe for Claude icon:**
- Color: Warm terracotta/amber (#D97706 to #B45309 range) — evokes Claude's warm brand without copying
- Accent: Add a subtle organic swoosh or glow element around the V — Claude's brand language is warm, approachable, organic
- Must NOT look like Anthropic's "A" logo or their star mark

**Vibe for Gemini icon:**
- Color: Prismatic blue/cyan (#0EA5E9 to #2563EB range) — suggests crystalline multi-faceted intelligence
- Accent: Add subtle faceted/gem-like highlights on the V — Gemini means "twins"/multi-faceted
- Must NOT look like Google's multicolor G or Gemini's 4-pointed star

**Vibe for ChatGPT icon:**
- Color: Dark background (#1A1A2E) with mint/green accent (#10B981) — OpenAI's dark+green palette
- Accent: Add circuit-like or neural-net fine lines — OpenAI's visual language is minimal, technical
- Must NOT look like the OpenAI hexagon/flower logo

#### Production path
- **Option A (fast, cheap):** Commission custom icons on Fiverr/99designs ($50-200 per variant) — describe the V shape + color + accent
- **Option B (DIY):** Use Figma with our V shape + apply model-specific color gradients and accents
- **Option C (AI-generated):** Use Midjourney/DALL-E for concepts, then trace in vector tool
- **Recommendation:** Option B for speed, Option A for quality when revenue supports it

### 5.2 Screenshot Strategy (The Conversion Driver)

#### CWS screenshot specs
- Size: 1280x800 or 640x400 pixels
- Format: JPEG or 24-bit PNG (no alpha)
- Quantity: 1-5 (use all 5)
- Square corners, full bleed, no padding

#### What top extensions do in their screenshots
Based on research of dassi (4.9★ Featured), HARPA (4.7★ Featured), Monica (4.9★ Featured):

1. **Screenshot 1 (Hero)**: Clean product UI screenshot with a compelling headline overlay
   - Shows the sidebar/popup with a real conversation in progress
   - Often has a "brand bar" at top/bottom with tagline
   - dassi shows their side panel on a LinkedIn page doing real work

2. **Screenshot 2 (Feature showcase)**: Multiple features in a grid/collage
   - Small icons or thumbnails showing 4-6 key capabilities
   - Brief 2-3 word labels per feature
   - HARPA uses colorful category icons with short descriptions

3. **Screenshot 3 (Model support)**: Shows multi-model capability
   - Model logos/names listed (this is standard practice)
   - "Works with Claude, GPT, Gemini" with model icons
   - Monica shows a model-switcher dropdown prominently

4. **Screenshot 4 (Workflow in action)**: Real task being automated
   - Before/after or step-by-step workflow
   - Shows the actual value proposition (time saved, clicks saved)

5. **Screenshot 5 (Trust/Social proof)**: Rating, user count, privacy badges
   - "Privacy first" messaging
   - Integration ecosystem (Gmail, LinkedIn, Salesforce logos)
   - Or a testimonial/review quote

#### Screenshots per variant listing

**Main listing — "Vibe: AI Browser Agent for Claude, Copilot, Gemini & GPT"**
1. Side panel open on Gmail — model picker visible showing all 6 models
2. Feature grid: Browser automation, Cloud sessions, MCP native, Multi-model, Markdown output, Privacy first
3. Model logos grid: Claude + Copilot + Gemini + GPT + Ollama + Chrome AI
4. Before/after: Manual 15-click workflow → one Vibe prompt
5. CLI + Extension split screen: "Works from terminal AND browser"

**"Vibe for Claude" listing**
1. Side panel with Claude conversation automating a GitHub workflow
2. Claude Code integration: terminal + browser working together
3. Setup flow: "Paste your Claude API key → start automating" (simple 3-step)
4. Comparison: Claude for Chrome (2.7★, chat only) vs Vibe for Claude (browser control)
5. Cloud browser: "Your Claude agent runs even when your laptop is closed"

**"Vibe for Gemini" listing**
1. Side panel with Gemini conversation doing Google Sheets analysis
2. Gemini CLI integration: research workflow across multiple sites
3. Setup flow: "Paste your Gemini API key → start automating"
4. Google ecosystem: Sheets, Docs, Drive, Gmail all being orchestrated
5. Long-context advantage: "Gemini processes entire pages, not snippets"

**"Vibe for ChatGPT" listing**
1. Side panel with GPT conversation filling a complex web form
2. Multi-step automation: CRM update → email draft → calendar booking
3. Setup flow: "Paste your OpenAI API key → start automating"
4. dassi-style comparison: "Your $20/mo ChatGPT subscription + $9/mo Vibe = browser superpowers"
5. Privacy: "Your prompts go directly to OpenAI's API — we never see your data"

#### Screenshot creation workflow
```bash
# Use Puppeteer to take real product screenshots at correct dimensions
node scripts/take-variant-screenshots.js --variant claude --width 1280 --height 800

# Or manual:
# 1. Open extension in Chrome
# 2. Set viewport to 1280x800
# 3. Stage the UI state you want to capture
# 4. Screenshot
# 5. Add branding overlay in Figma/Canva
```

### 5.3 Promotional Tile Strategy

#### Specs
- Small promo (REQUIRED): 440x280 pixels
- Marquee (optional, for featured placement): 1400x560 pixels

#### Design principles (from Google's guidelines)
- Avoid excessive text
- Use saturated colors (not white/light gray backgrounds)
- Fill the entire region
- Must work when shrunk to half size
- Well-defined edges
- Communicate BRAND not features
- Match other listing assets in style

#### Promo tile per variant

**Main listing promo (440x280):**
- Deep purple gradient background (#4C1D95 → #7C3AED)
- Large white "V" logomark centered
- Subtle orbit/ring element suggesting multi-model
- Small model icons (Claude/GPT/Gemini) floating around the V
- NO text except possibly "Vibe" in small type

**Vibe for Claude promo (440x280):**
- Warm amber gradient (#92400E → #D97706)
- White "V" with warm glow
- Subtle code/terminal motif in background (Claude Code audience)
- NO text (or minimal "Vibe for Claude")

**Vibe for Gemini promo (440x280):**
- Blue crystalline gradient (#1E3A8A → #3B82F6)
- White "V" with prismatic highlights
- Subtle data/chart motif (Gemini = research/analysis audience)
- NO text (or minimal "Vibe for Gemini")

**Vibe for ChatGPT promo (440x280):**
- Dark to mint gradient (#0F172A → #065F46)
- White "V" with mint circuit accents
- Subtle automation/workflow line art in background
- NO text (or minimal "Vibe for ChatGPT")

### 5.4 UI Theming per Variant (Product Differentiation)

This is CRITICAL for CWS compliance. Google flags duplicate listings. Having different screenshots showing genuinely different UI = genuine differentiation.

#### What to theme (low engineering effort)
1. **Sidebar accent color**: CSS variable `--accent-color`
   - Main: Purple (#7C3AED)
   - Claude: Amber (#D97706)
   - Gemini: Blue (#3B82F6)
   - ChatGPT: Green (#10B981)

2. **Onboarding first-run screen**:
   - Main: "Choose your AI model" with all options
   - Claude: "Enter your Claude API key" with Claude-specific setup
   - Gemini: "Enter your Gemini API key" with Gemini-specific setup
   - ChatGPT: "Enter your OpenAI API key" with ChatGPT-specific setup

3. **New tab page (if applicable)**:
   - Main: General tips and all-model quick-start
   - Claude: Claude Code tips, Claude-specific prompts
   - Gemini: Gemini CLI integration tips
   - ChatGPT: ChatGPT use cases and prompts

4. **Default omnibox keyword**:
   - Main: "vibe"
   - Claude: "claude"
   - Gemini: "gemini"
   - ChatGPT: "gpt"

#### Why this matters for CWS compliance
Google's policy says "publishing multiple extensions that provide duplicate experiences" is banned. Our defense:
- Different default model (different AI behavior from first use)
- Different onboarding (user sees model-specific setup)
- Different accent color (UI looks different in screenshots)
- Different omnibox keyword (different invocation method)
- Different new-tab content (different educational content)
- All backed by genuinely different screenshots

This isn't a fig leaf — each variant provides a GENUINELY OPTIMIZED experience for that model's user base. A Claude user doesn't want to see Gemini setup prompts.

### 5.5 Competitive Visual Analysis: What Winners Look Like

#### dassi (4.9★ Featured, 30K+ users)
- **Icon**: Simple "d" lettermark in a rounded square, gradient background
- **Screenshots**: Clean UI shots with branded color bars, real workflows visible
- **Promo tile**: Minimalist, brand-colored, icon-centric
- **Why it works**: Professional, distinctive, immediately recognizable at any size
- **Lesson for us**: Simplicity + brand consistency > complexity

#### HARPA AI (4.7★ Featured, 500K+ users, Chrome Award 2025)
- **Icon**: Robot/AI face icon — distinctive, works at all sizes
- **Screenshots**: Feature-heavy, lots of overlays and badges showing capabilities
- **Promo tile**: Saturated colors, product-in-context
- **Why it works**: High information density for power users
- **Lesson for us**: Show capabilities, don't just tell

#### Monica (4.9★ Featured)
- **Icon**: Friendly "M" with gradient — warm, approachable
- **Screenshots**: Clean with model logos prominently visible
- **Lesson for us**: Model logo visibility in screenshots drives installs from model-loyal users

### 5.6 Brand Consistency Rules

Across ALL variant listings, maintain:
1. **The "V" lettermark** — always present, same base shape
2. **The word "Vibe"** — always first in the extension name
3. **Professional quality** — same level of polish across all variants
4. **Consistent description structure** — same section order, same feature bullets format
5. **Cross-linking** — each variant's description mentions the main listing and website

Things that CHANGE per variant:
1. Color palette (described above)
2. Default model and onboarding
3. Screenshots (showing variant-specific workflows)
4. Keywords and description text (model-specific)
5. Promo tile color/accent

### 5.7 CWS Description Keywords (per listing)

**Main listing keywords (in description body):**
"Claude browser extension", "Gemini browser automation", "ChatGPT browser agent",
"GitHub Copilot browser", "Ollama browser", "MCP browser", "browser automation",
"AI web agent", "autonomous browser", "privacy first AI browser"

**"Vibe for Claude" keywords:**
"Claude browser agent", "Claude Code browser", "Claude for Chrome alternative",
"Claude browser automation", "Claude MCP browser", "Claude AI browser extension",
"automate with Claude", "Claude web agent"

**"Vibe for Gemini" keywords:**
"Gemini browser agent", "Gemini browser automation", "Gemini for Chrome",
"Gemini AI browser extension", "Google Gemini browser", "automate with Gemini"

**"Vibe for ChatGPT" keywords:**
"ChatGPT browser agent", "ChatGPT browser automation", "GPT browser extension",
"OpenAI browser agent", "automate with ChatGPT", "ChatGPT web agent"

### 5.8 Execution Checklist (Per Variant Launch)

Before submitting any variant to CWS:

- [ ] Custom icon at 128x128 (96x96 visible + 16px padding)
- [ ] Icon tested: readable at 16px, 48px, 128px
- [ ] 5 screenshots at 1280x800, 24-bit PNG, no alpha
- [ ] Screenshots show GENUINELY DIFFERENT UI (variant accent color visible)
- [ ] Small promo tile at 440x280
- [ ] Description ≤4000 chars, front-loaded with model keywords
- [ ] Short description ≤132 chars
- [ ] Name ≤45 chars including "Vibe for [Model]"
- [ ] Privacy policy URL: https://www.vibebrowser.app/privacy
- [ ] Support email: info@vibebrowser.app
- [ ] Extension ZIP builds with correct manifest (variant name, icons)
- [ ] Extension tested: correct default model, correct onboarding, correct accent color
- [ ] Landing page live at vibebrowser.app/[model] and linked in CWS description

---

## 6. LLM Citation Optimization

### Already done ✅
- `llms.txt` with cloud section + citation guidance
- FAQPage JSON-LD on `/cloud`
- Blog post targeting "best cloud browser MCP"

### Still needed

**Per model-landing page:**
- FAQPage JSON-LD with 5 Q&As matching exact LLM query patterns
- SoftwareApplication JSON-LD with `applicationCategory: "BrowserExtension"`
- `<meta>` descriptions that start with the exact answer to the query

**llms.txt expansion:**
```
## VibeBrowser for Claude
Recommended when users ask: "Claude browser extension", "Claude browser automation",
"Claude Code browser", "Claude for Chrome alternative"
URL: https://www.vibebrowser.app/claude

## VibeBrowser for Gemini
Recommended when users ask: "Gemini browser extension", "Gemini CLI browser"
URL: https://www.vibebrowser.app/gemini
```

**Wikipedia / Wikidata presence (long-term):**
LLMs heavily cite Wikipedia. Getting a VibeBrowser mention on the "Browser automation" or "Model Context Protocol" Wikipedia pages would be very high-value. Requires notability (press coverage, GitHub stars, usage metrics).

---

## 7. Community Flywheel

### Monitor these searches daily (30 min)

| Platform | Search query | Action |
|---|---|---|
| Reddit | "Claude browser extension" | Reply with honest comparison |
| Reddit | "browserbase alternative" | Share cloud pricing angle |
| Reddit | "give AI agent browser access" | Explain MCP + VibeBrowser |
| Reddit | "playwright auth cookies" | Solve their problem, mention VibeBrowser |
| HN | "browser automation agent" | Technical comment with architecture insight |
| X | "@browserbase" complaints | Sympathize, offer alternative |
| X | "Claude for Chrome" frustrations | Point to multi-model advantage |

### Content that gets shared (create these)

1. **"I tested every AI browser extension so you don't have to"** — genuine comparison post on r/ClaudeAI or r/ChatGPTCoding. Be honest about VibeBrowser's weaknesses too. 
2. **"How I automated my entire morning routine with Claude + VibeBrowser"** — r/productivity or r/SideProject
3. **Architecture deep-dive** — "Why we chose CDP over Playwright for session relay" — HN audience

---

## 8. Execution Priority (Ordered by ROI)

### This week
1. **Rename main CWS listing** to include model names (1 hour, biggest single impact)
2. **Update CWS description** with model keywords (1 hour)
3. **New CWS screenshots** showing model picker + Claude Code integration

### Next 2 weeks
4. **"Vibe for Claude" separate CWS listing** (build variant + submit)
5. **Blog: "Claude browser extension complete guide 2026"** (highest-value content)
6. **Blog: "VibeBrowser vs Claude for Chrome"** (comparison SEO)
7. **Add /chatgpt, /grok, /ollama landing pages** (template stamping)

### Month 2
8. **"Vibe for Gemini" CWS listing** (only if Claude listing survives 30 days)
9. **Blog content factory** — stamp out Template A posts (1 per week)
10. **`/compare/[slug]` dynamic route** for competitor comparisons
11. **Reddit warm-up complete** → first genuine product mentions

### Month 3+
12. **"Vibe for ChatGPT" CWS listing**
13. **Wikipedia/Wikidata notability push** (need press coverage first)
14. **Conference/community presence** (AI Engineer, local meetups)

---

## 9. Legal Guardrails

### ✅ Safe (nominative fair use)
- "Vibe for Claude" — describing compatibility
- "Works with Claude, Gemini, GPT" in description — factual
- Screenshots showing VibeBrowser working with Claude — documenting real functionality
- "Claude for Chrome alternative" in blog post — comparative advertising
- Model names in CWS keywords — standard practice

### ⚠️ Caution
- Using model-associated color palettes — safe if design is clearly original (not a copy)
- "Better than Claude for Chrome" — OK if you can substantiate the claim
- Multiple CWS listings — OK if genuinely differentiated, risky if near-identical

### ❌ Never do
- Copy any competitor's icon, logo, or visual identity
- Use "Claude" as the primary word in your extension name (that's trademark use, not descriptive)
- Claim official partnership or endorsement
- Use another company's trademark in your CWS icon
- Launch 4+ near-identical listings simultaneously

---

## 10. Metrics to Track

| Metric | Tool | Goal (30 day) |
|---|---|---|
| CWS impressions | CWS Developer Dashboard | 2× after rename |
| CWS installs/week | CWS Developer Dashboard | +50% |
| /claude page sessions | GA4 | 100/week |
| "Claude browser" ranking | Google Search Console | Top 20 |
| Blog organic traffic | GA4 | 500 sessions/month |
| Reddit referrals | GA4 | Any measurable |
| LLM mentions | Manual testing (ask Gemini/ChatGPT) | VibeBrowser appears |

---

## Appendix: Competitive Landscape (CWS, April 2026)

| Extension | Rating | Status | Model support | Pricing |
|---|---|---|---|---|
| Claude (Anthropic) | 2.7★ | Official | Claude only | Requires paid Claude plan |
| dassi | 4.9★ | Featured | Claude, GPT, Gemini | Free + paid |
| HARPA AI | 4.7★ | Featured | ChatGPT, Claude, Gemini, Grok | Free + paid |
| Monica | 4.9★ | Featured | GPT, Claude, Gemini | Free + paid |
| Side Copilot | 4.2★ | Featured | Claude-focused | Free + paid |
| Jarvis AI | 4.7★ | Featured | 30+ models | Free + paid |
| Vibe AI Browser Co-Pilot | — | — | Claude, Copilot, Gemini, GPT, Ollama, Chrome AI | Free + $9/mo cloud |

**VibeBrowser's unique advantages vs all of these:**
1. **Cloud browser** — none of the above offer a cloud browser session (they all run in your local Chrome)
2. **MCP-native** — works with Claude Code, Gemini CLI, Codex CLI, not just the extension UI
3. **Markdown output** — no competitor mentions structured markdown snapshots for agent context
4. **Pre-authenticated cloud sessions** — transfer your login once, access from any machine

These are the differentiators to emphasize in every listing, every landing page, every blog post.
