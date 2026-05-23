---
title: "How We Cut Token Costs on OpenCode Coding Agents: LST, RTK, Caveman, and Smarter Subagents"
description: "Practical token-optimization stack at Vibe Technologies for OpenCode coding agents — LST for log compression, RTK (Rust Token Killer) as a CLI proxy, Caveman mode for terse output, and orchestrator + subagent role split that keeps expensive models doing only expensive work."
date: "2026-05-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - opencode
  - token-optimization
  - ai-coding
  - rtk
  - caveman
  - lst
  - subagents
  - vibe-technologies
---

Vibe Technologies is a one-person company. There is me, and there is a fleet of [OpenCode](https://opencode.ai) coding agents running 24/7 on a handful of remote VMs. The headcount is "1.0 human." The actual operating cost is not salaries. It is the token bill.

When you run an orchestrator plus five specialized subagents around the clock, the failure mode is not "the agent gets stuck." The failure mode is **expensive models doing cheap work**. An Opus-class orchestrator burning reasoning tokens to `ls` a directory. A frontier model reading the full output of `git status` when three lines were the signal. A subagent generating a six-paragraph explanation when a one-line answer would have shipped.

This post is the honest accounting of the four optimizations I run on every OpenCode worker today. None of them are clever individually. They stack.

Running AI agents full-time is expensive. This post covers four changes that cut token usage across every OpenCode worker: LST compresses what the agent reads from code and the web, RTK compresses shell command output before it enters context, Caveman mode makes the agent write shorter replies, and a deliberate orchestrator/subagent split keeps expensive models off cheap work. We don't have a single combined metric yet, but each layer has measurable impact and none of them overlap.

## The Problem

The cost is not obvious until it is. When you run an orchestrator plus specialized subagents around the clock, every turn burns tokens: the system prompt, the tool call, the tool output, the model's response. Most of that content is noise the agent didn't need.

We didn't track a clean baseline — costs just climbed as agent session volume grew. What we noticed first was the shape of the waste: a frontier model reading fifty lines of `git status` to extract three. An Opus-class orchestrator reasoning through a `find` result it never had to see. A subagent writing three paragraphs when the orchestrator needed one line. At a certain scale, token cost exceeds the value of marginal quality improvements. These four optimizations are the answer to each of those failure modes.

## The Four Optimizations

### 1. LST — Compressing What the Agent Has to Read

LST is the layer I added first. The name in our internal docs is "LST" — log/source/transcript compression — but the actual implementation borrows heavily from the **Language Server Protocol (LSP)** approach I documented in [this gist](https://gist.github.com/dvashchuk/b5f8494764a8fb18651622206e205789) ("640K ought to be enough for anybody. 50$ too").

The principle is simple: don't make the agent read a file when a structured query can return the exact symbol.

The gist measures the savings on common operations:

| Capability | Token Savings |
|---|---|
| Find definition | ~99% |
| Find references | ~95% |
| Type information | ~90% |
| Rename symbol | ~80% |
| Diagnostics | ~70% |

Concretely: `grep -r "func X"` returning fifty file matches becomes a single `file:line` location from `gopls` or `pyright`. The agent never has to scan, summarize, or hold the noise in context. For OpenCode running over a million-line monorepo, this is the difference between "the agent has room to think" and "context window full, compact triggered."

The same gist also bundles the full token-optimization stack we now ship per repo:

- **Scrapling MCP** — markdown extraction for web fetches, around 59% token reduction on web content
- **Context7 MCP** — documentation lookups, around 95% savings versus pulling the full doc
- **Language servers** (gopls, pyright, typescript-language-server) — the LSP layer above
- **`code-review-graph`** — the persistent knowledge graph the agent uses before falling back to `grep`/`read`

This is the input-side optimization. Everything below is the output and execution side.

### 2. RTK — Rust Token Killer

Once you have stopped the agent from reading too much, the next bleed is the shell. Coding agents call `git status`, `ls -la`, `find`, `cat`, `tail` constantly. Each of those returns more text than the agent needed. The agent reads it, summarizes it, holds it in context.

[RTK](https://github.com/dzianisv/rtk) (Rust Token Killer) is a CLI proxy. It intercepts common dev commands and returns a compressed, agent-friendly version of the output before it ever enters the context window. Claimed savings on the install doc: **60–90% on dev operations**.

The meta commands the agent itself can call:

```bash
rtk gain              # token savings analytics for this project
rtk gain --history    # per-command savings history
rtk discover          # scan Claude Code / OpenCode history for missed opportunities
rtk proxy <cmd>       # bypass filtering, run raw (debugging)
```

The transparent part is what matters in practice. A hook rewrites every common command:

```
git status   →  rtk git status
ls           →  rtk ls
find ...     →  rtk find ...
```

The agent never sees the `rtk` wrapper. It just sees a shorter output. Zero prompt overhead, zero behavior change in the agent itself. The agent stays "honest" — it ran `git status` — and the context stays small.

`rtk discover` is the part I use weekly. It reads agent session logs and tells me which commands ran without compression and how many tokens I could have saved. That feedback loop is what made me realize, for example, that `kubectl get pods -A` was eating a non-trivial chunk of every DevOpsEngineer turn.

### 3. Caveman Mode — Making the Agent Talk Less

Input side handled, shell handled. Now the output side: the agent's own replies.

[Caveman](https://github.com/JuliusBrussee/caveman) is a Claude Code / OpenCode / Codex / Gemini skill with one job: make the agent talk like a smart caveman. Drop articles, drop filler, drop pleasantries, drop hedging. Fragments OK. Technical terms exact. Code unchanged.

Their tagline is honest: *"why use many token when few do trick."*

The rule sheet:

> Drop: articles (a/an/the), filler (just/really/basically), pleasantries, hedging.
> Fragments OK. Short synonyms. Technical terms exact. Code unchanged.
> Pattern: [thing] [action] [reason]. [next step].
> Not: "Sure! I'd be happy to help you with that."
> Yes: "Bug in auth middleware. Fix:"

The before/after on a React re-render explanation:

> **Normal Claude (69 tokens):** "The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object."
>
> **Caveman Claude (19 tokens):** "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

Same fix. Same correctness. About a quarter of the tokens.

Their published benchmarks across ten real prompts (Claude API token counts):

| Task | Normal | Caveman | Saved |
|------|-------:|--------:|------:|
| Explain React re-render | 1180 | 159 | 87% |
| Auth middleware fix | 704 | 121 | 83% |
| PostgreSQL pool setup | 2347 | 380 | 84% |
| Refactor callback to async | 387 | 301 | 22% |
| Docker multi-stage build | 1042 | 290 | 72% |
| Implement React error boundary | 3454 | 456 | 87% |
| **Average** | **1214** | **294** | **65%** |

**Average ~65% reduction on output tokens across the sample.** Range 22–87%, so it is not magic on every task, but the median is real.

Caveman ships levels — `lite` (drop filler only), `full` (default), `ultra` (telegraphic), `wenyan` (classical Chinese, shortest). I run my subagents at `full`. I keep the orchestrator at `lite` because I am the one reading those messages in Slack and I want them readable.

One detail that matters: caveman only affects **output** tokens. Reasoning/thinking tokens are untouched. The brain stays big. Only the mouth gets smaller. That is exactly the right tradeoff for a coding subagent — you do not want to compress its thinking, you want to compress what it spends tokens producing for the orchestrator to read.

There is also `/caveman-compress`, which rewrites a memory file (`CLAUDE.md`, project notes) into caveman-speak. Their receipts on real memory files show ~46% average reduction, with code, URLs, and paths preserved byte-for-byte. We compress every project's `CLAUDE.md` this way. It saves tokens **every session**, forever, not just one reply.

### 4. The Orchestrator/Subagent Role Split

The biggest single token saver is not a tool. It is the architecture. I have written about this before in [Vibe Coding Practice #4](https://medium.com/@dzianisv/vibe-coding-practice-4-using-expensive-models-as-orchestrators-62d61e28fb50) and in [our engineering stack post](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode), but it is the foundation everything else builds on.

The setup:

```
Orchestrator (Claude Opus, max context, max reasoning)
├── BackendDeveloper  (GPT-4o)        — APIs, databases, server-side logic
├── FrontendDeveloper (Gemini)        — UI, styling, client-side
├── QAEngineer        (Sonnet-4.6)   — writing and running tests, edge cases
├── DevOpsEngineer    (Sonnet-4.6)   — CI/CD, infrastructure, deployments
└── SEOEngineer       (Gemini)       — release notes, blog posts, changelogs, SEO
```

The orchestrator's primary rule, repeated in every system prompt:

> **Never implement changes yourself — your role is to design, delegate, and review.**

This is the rule that pays for everything. Opus is the most expensive token I buy. I do not want Opus writing a CSS tweak. I want Opus turning "the pricing page feels off" into a clean spec, picking the right subagent, and reviewing the diff. The subagent — a cheaper specialized model at a fraction of the per-token cost — does the actual edit.

Cross-model review on top of this is cheap and catches a lot. After a subagent submits a PR, the orchestrator routes the diff to a *different* model: "GPT-4o, do you agree with what Gemini wrote here?" Diff review is small context. They disagree often enough to surface real issues. We use the same pattern documented in our [reflection layer post](/blog/reflection-verification-layer).

The role split is the macro optimization. Caveman, RTK, and LST are the micro optimizations inside each agent. They compound.

## The Stack, Layered

How the four pieces sit together on a single OpenCode worker:

```
┌─────────────────────────────────────────────────────────────┐
│ Orchestrator (Opus-class) — designs, delegates, reviews     │
│   ↓  spec + task                                            │
├─────────────────────────────────────────────────────────────┤
│ Subagent (cheaper specialized model)                        │
│   ├─ Caveman mode → terse output back to orchestrator       │
│   ├─ RTK proxy   → compressed shell output into context     │
│   └─ LST/LSP      → structured symbol lookups, not file reads│
├─────────────────────────────────────────────────────────────┤
│ Persistent context                                          │
│   ├─ caveman-compressed CLAUDE.md / project notes           │
│   └─ code-review-graph for structural queries               │
└─────────────────────────────────────────────────────────────┘
```

Each layer attacks a different category of token spend:

- **LST/LSP** — input tokens from code reads
- **RTK** — input tokens from shell output
- **Caveman** — output tokens from the agent itself
- **Role split** — *which model* burns *which* tokens

You can run any one of them alone and see savings. The point is none of them overlap.

## Honest Accounting — What Does Not Work Yet

I am not going to pretend this is solved.

**Caveman fragments occasionally get misread on multi-step ops.** When an `ultra`-mode subagent emits "deploy fail. cred bad. rotate." the orchestrator sometimes interprets "rotate" as advice rather than a completed action. I dropped subagents back to `full` after one production incident where this matters. `ultra` stays for one-shot tasks.

**Over-compression destroys useful context.** RTK is aggressive. On rare debugging sessions where I actually want the full `git log --all --graph` output, I have to call `rtk proxy git log ...` to bypass compression. The agent does not know when it wants the raw version. I do. That is still a manual call.

**LST/LSP coverage is uneven by language.** `gopls` and `pyright` are excellent. The TypeScript LSP is fine. Less mainstream stacks (Zig, Nim, anything custom) fall back to grep, and the savings disappear. We accept this for now.

**The optimizations can fight.** Caveman tells the agent to skip pleasantries. The cross-model reviewer is another agent reading caveman output. If both sides are running caveman at `ultra`, the review conversation becomes almost too terse to recover the disagreement signal. We keep the reviewer at `lite`.

**No combined metric.** I can pull `rtk gain` per project and caveman's `/caveman-stats` per session, but I do not yet have a single dashboard that says "total tokens saved across the fleet this week." That is on the roadmap.

## Where This Fits in the Series

This is the optimization layer of a stack I have been documenting for six months. If you are landing here cold, the prerequisite reads are:

- [Vibe Engineering Stack: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — the orchestrator pattern in full
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — why the role split matters at the operations layer too
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — model routing as a token-cost lever
- [OpenCode Memory Optimizations and `serve`](/blog/opencode-memory-optimizations-and-serve) — how we keep the long-running worker honest
- [The Reflection / Verification Layer](/blog/reflection-verification-layer) — the cross-model review pattern in detail
- [We Forked OpenCode — Here's What We Changed](/blog/we-forked-opencode-heres-what-we-changed) — the fork that hosts most of this

The takeaway from all of these is the same: at 1.0-human headcount, we didn't scale by hiring — we scaled by making the agents we already run cost less per useful unit of work. LST, RTK, Caveman, and the orchestrator role split are how that math closed.

Brain stay big. Mouth stay small. Token bill stay flat.

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- **You are here — Token Optimization with OpenCode, LST, RTK, Caveman**
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
