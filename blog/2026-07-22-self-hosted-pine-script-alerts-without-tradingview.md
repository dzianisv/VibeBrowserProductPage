---
title: "Self-Hosted Pine Script Alerts Without TradingView"
description: "Run TradingView-style Pine Script v5 alerts without a TradingView account — self-hosted, open source, via ntfy, email, or Telegram, no paid plan."
date: "2026-07-22"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - open-source
  - trading-alerts
  - pine-script
  - self-hosted
  - ai-agents
  - mcp
published: true
---

TradingView alerts are fine until you hit their edges: alert count and frequency are gated behind paid tiers, the condition has to live inside their UI, and there's no way for a script or an AI agent to create or read an alert without scraping the page. If you want a price or Pine Script condition that fires from your own server, on your own schedule, to your own phone — you're on your own.

We open-sourced [mkt-alerts](https://github.com/dzianisv/mkt-alerts) to close that gap: a self-hosted alert daemon that runs price, RSI/MACD/SMA, and full **Pine Script v5** conditions off-platform, delivers through ntfy push, email, or Telegram, and exposes the same alerts to AI agents over MCP, HTTP, or CLI. MIT licensed, no account, no vendor lock-in.

## The problem with alerting on TradingView

TradingView is a genuinely good charting product, and its alert engine works — for a human clicking around the UI. It breaks down for a few specific things:

- **Alert quotas are a pricing lever.** Free and lower paid tiers cap active alerts and check frequency, not because of a technical limit but because that's the upsell.
- **Alert counts are capped on free and lower tiers**, and Pine-based alerts still run on TradingView's own servers, on their schedule — never on your own.
- **There's no clean write API.** An agent that just formed a thesis — "BTC broke its 200-week support" — can't create the alert itself; a person has to go add it by hand.
- **Your data stays in their account.** No git history, no exportable audit trail of why an alert exists.

None of this is a knock on TradingView as a charting tool. It's a gap specifically in *programmable, self-hosted* alerting.

## The one-command trial

```bash
npx -y github:dzianisv/mkt-alerts try
```

No signup, no API key, no manual clone. It downloads the underlying `mkt` engine, runs a live price check against a real, key-free quote (Coinbase for crypto, Yahoo Finance for stocks), and fires a demo alert on localhost so you can see the whole loop — define condition, evaluate against a live price, get notified — end to end before you write a single config file.

![mkt-alerts one-command trial: npx github:dzianisv/mkt-alerts try fires a live BTC-USD alert](/images/mkt-alerts-demo.gif)

*One command, no signup, fires a live alert in seconds.*

## A price alert, the boring but important case

Most of what you actually want is a price level with a reason attached. mkt-alerts makes you write the reason down: any `above`/`below` alert requires a `--data-source` citing the evidence for the level. It's a small piece of friction that stops "vibes" support/resistance lines from silently becoming alert rules.

> Only `try` is zero-config. Every `add` command below writes to *your own* deployed instance, so it needs a running daemon and `~/.config/mkt-watch/auth.json` first — see the [repo's deploy walkthrough](https://github.com/dzianisv/mkt-alerts#deploy-your-own-always-on-instance-optional). The commands run straight from GitHub via `npx` — no npm install needed.

```bash
npx -y github:dzianisv/mkt-alerts add \
  --symbol BTC-USD \
  --condition below --value 90000 \
  --reason "Support break — invalidates bull thesis" \
  --data-source "200wMA \$62,640 from TradingView 210 weekly bars" \
  --channel ntfy:my-topic
```

Built-in conditions cover `above`/`below`, `pct_up`/`pct_down`, `rsi_above`/`rsi_below` (RSI is fixed at 14), `sma_cross_above`/`sma_cross_below` (SMA fixed at 20), and `macd_cross`. Repeat `--condition`/`--value` to require several conditions at once (RSI oversold *and* below a price level, for example). Once deployed as an always-on instance, alerts are checked on a schedule (every 15 minutes in the reference deployment) and delivered to whichever channel you named.

## The actual point: Pine Script v5, off TradingView

RSI(14) and SMA(20) don't cover everything — a different RSI period, a custom multi-factor score, a channel breakout with your own logic. For that, mkt-alerts runs real **Pine Script v5** through an isolated PineTS subprocess (a sidecar process, not bundled into the MIT-licensed CLI — PineTS itself is AGPL-3.0, kept at arm's length on purpose). Your script evaluates against live OHLCV on your own checker, on your own schedule, never against a TradingView plan's quota.

The contract is simple: your script plots one numeric series named whatever you pass to `--signal` (default `"signal"`), encoded so positive means "fire":

```pine
//@version=5
indicator("golden cross")
fast = ta.sma(close, 20)
slow = ta.sma(close, 50)
plot(fast - slow, "signal")   // >0 when fast is above slow
```

Save that as `golden-cross.pine` and arm it:

```bash
npx -y github:dzianisv/mkt-alerts add \
  --symbol BTC-USD \
  --pine golden-cross.pine \
  --signal signal \
  --fire-on cross_up \
  --reason "SMA20 crossing above SMA50 confirms trend flip" \
  --channel email:you@example.com
```

`--fire-on` controls when a positive signal actually triggers a notification: `cross_up` (the default) fires once, when the signal crosses from ≤0 to >0 — good for edge events like a cross or a breakout. `truthy` fires on every check where the signal is currently positive — good for a persistent state like "still oversold." Pine alerts skip the `--data-source` gate; the script itself is the evidence.

## How an AI agent reads and uses this

There are three ways in — MCP, HTTP, and CLI — and they are not interchangeable; this is the part worth getting precise about.

mkt-alerts itself does not run its own MCP server. It shells out to the third-party `mkt` engine's MCP mode (`mkt mcp`, from [github.com/stxkxs/mkt](https://github.com/stxkxs/mkt)) for market data, and that same MCP server is what an agent connects to directly:

```json
{
  "mcpServers": {
    "mkt": {
      "command": "mkt",
      "args": ["mcp"]
    }
  }
}
```

`mkt` is a standalone Go binary — install it on your PATH from the [stxkxs/mkt releases](https://github.com/stxkxs/mkt/releases) for the MCP config to resolve. (The `try` command downloads `mkt` into an internal cache to run the demo; it does not put it on your PATH.)

It exposes exactly four **read-only** tools: `get_quote(symbol)`, `query_history(symbol, limit)`, `get_alerts()`, `get_portfolio(name)`. There is no `set_alert`, no `get_rsi`, and no write path over MCP at all — an agent cannot create or delete an alert through it. Writing an alert goes through the CLI (`mkt-alerts add`) or the bearer-authenticated HTTP API (`POST /alerts`, `DELETE /alerts`), the same paths a human uses.

In practice that means a research agent can call `get_quote`/`query_history` mid-analysis to ground its numbers, then — once it has an actual thesis — shell out to `mkt-alerts add` with a `--reason` and `--data-source` to leave a paper trail for why the alert exists. There's a [Claude Code skill](https://github.com/dzianisv/mkt-alerts/blob/main/skills/mkt-alerts/SKILL.md) (`npx skills add github.com/dzianisv/mkt-alerts/ -s mkt-alerts -y`) that wires this into an agent's toolset directly.

If you're building agents that reason about markets more generally, we've written before about the harder problem of letting an LLM make and track live decisions — see [How We Added Claude and DeepSeek Portfolio Managers to Our AI Agent](/blog/2026-07-16-claude-deepseek-ai-portfolio-manager-paper-trading), on running two models as competing paper-trading books against the same validated data.

## What this is not

Worth being blunt about, since the honest answer is more useful than a vague one:

- **No charts, no screener, no drawing tools.** mkt-alerts is an alerting engine, not a TradingView replacement. You still want a charting platform to look at price action; this just runs the alert once you've decided the level.
- **Built-in indicator periods are fixed.** RSI is 14, SMA-cross is 20. Anything else needs Pine Script or a precomputed price level — there's no `--rsi-period` flag.
- **Checks run on an interval, not tick-by-tick.** The reference deployment checks every 15 minutes. Fine for swing levels and Pine conditions; not a substitute for a real-time execution feed if you're scalping.
- **You run it.** The model is self-hosting on your own laptop or a free-tier VM — not a managed multi-tenant SaaS. There's no open public demo endpoint; the `try` command is the zero-setup way to see it work.

## Try it

```bash
npx -y github:dzianisv/mkt-alerts try
```

That's the whole trial — no signup, no key, and it fires a real alert against a live quote. From there: every command runs straight from GitHub via `npx -y github:dzianisv/mkt-alerts …` (npm publish is pending, so skip `npm install` for now), the [GitHub repo](https://github.com/dzianisv/mkt-alerts) for source, deploy scripts, and the Pine Script skill docs, or the [product page](/agentsdata) for the MCP config and API reference in one place.
