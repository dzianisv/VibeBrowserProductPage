---
title: "How We Added Claude and DeepSeek Portfolio Managers to Our AI Agent"
description: "Two LLMs run competing paper-trading books on a public, git-timestamped ledger. The architecture: one committee runner, strict server-side validation, fail-closed stats, and a track record you can audit commit by commit."
date: "2026-07-16"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ai-agents
  - llm-trading
  - claude
  - deepseek
  - paper-trading
  - quantarena
published: true
---

Apps like Autopilot proved people want to watch AI models trade — their GPT, Claude, DeepSeek and Grok portfolios hold about $150M of mirrored retail money. But their published returns are undated marketing numbers ("+76.4% all-time"), and the engineering is a black box.

We added the same idea to QuantArena, our agentic hedge-fund project, with one difference: every decision is a line in an append-only, git-timestamped ledger, and the full decision log — losing days included — is published on the track-record page. When the repository goes public, the git history itself becomes independently auditable.

## The problem

"Let an LLM manage a portfolio" sounds simple until you ask three questions. Where do decisions come from — a person pasting model output, or a pipeline? Who checks the model's math? And how does a reader know you didn't delete the bad weeks?

## The idea

One ledger, multiple books. A "book" is a virtual $100k portfolio owned by one model — today `claude` and `deepseek`. Every model gets the same data, the same rules, the same starting capital. The ledger is a JSONL file in git; the daily mark-to-market runs in CI and commits its own updates, so history rewrites would be visible to anyone.

## How a decision actually happens

One script, `run_committee.py`, is the only path into the ledger:

1. Fetch live data for a fixed 7-token universe (BTC, ETH, SOL, UNI, HYPE, AAVE, LINK): CoinGecko prices and 24h change, a 365-day history for 200-day SMA and 52-week range, and the Fear & Greed index.
2. Build a committee prompt. The model is told to simulate a 5-seat quorum (on-chain, sentiment, macro, order-flow, narrative) and output strict JSON: one decision per token, `buy/sell/hold`, a dollar allocation, and a thesis citing the data.
3. Call the model through OpenRouter (temperature 0.2, JSON response format). Claude and DeepSeek use the same prompt — only the model id changes.
4. Validate everything server-side. This is the part that matters.

The model's own numbers are never trusted:

```python
qty = float(alloc_usd) / price_usd  # our fetched price, never the model's
if cost > cash + EPS: raise CommitteeError(...)
if new_position_value > MAX_POSITION_PCT * book_equity: raise CommitteeError(...)
# after all decisions:
if cash < MIN_CASH_PCT * book_equity: raise CommitteeError(...)
```

Position cap 15% of book equity, cash floor 40%, buys only from the book's own cash, sells only of what the book holds. One violation rejects the whole batch — nothing is partially applied. If the API call fails, the run is blocked, not faked. We also tell the model it has no news feed, so it can't invent headlines for its thesis.

## What surprised us

The hard bugs weren't in the LLM parts. Our review process (a second agent instructed to attack the code) found that a typo'd book name — `"deepseeek"` — would silently vanish from the per-book breakdown while still counting toward combined totals. Classic identifier-without-a-whitelist bug. Everything that enters the ledger is now validated against a known-books list, fail-closed like the rest.

The other lesson: prompt-injection surface moves. A model-written thesis ends up rendered on a public web page, so the page builds its DOM with `textContent` only, and book/side values are whitelisted before they touch a CSS class.

## Trade-offs

- Paper trading, clearly labeled. No broker code exists in the ledger path — that's deliberate; a fake track record with real-money framing is worse than none.
- One structured completion per run instead of a live tool-using agent loop. Cheaper, reproducible, and easier to validate — but the narrative seat only sees price and sentiment data, not news.
- Fail-closed everywhere costs availability: one corrupt ledger line blocks stats for every book until fixed. We prefer publishing nothing over publishing wrong numbers.

## Where it stands

The Claude book made its first committee decisions on day one — four buys (ETH, UNI, SOL, LINK) and a BTC hold under Extreme Fear conditions, each with a full thesis in the ledger. The DeepSeek book is seeded at $100k and runs through the identical pipeline; its first committee decisions are queued. Both books, the decision log, and the live stats are public at [quantarena.xyz/track-record](https://quantarena.xyz/track-record.html).

QuantArena is built and operated by the same agent stack we write about here — the committee runner, the hostile code review, and this post's fact-checking all ran through it. If you want the model-vs-model idea with numbers you can verify instead of a marketing screenshot, that page is the whole point.
