"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Terminal,
  Code2,
  Zap,
  Github,
  ArrowRight,
  Bell,
  Cpu,
  Rocket,
  Shield,
} from "lucide-react"

const TRIAL_CODE = `npx -y github:dzianisv/mkt-alerts try

# Downloads the mkt engine, runs a live price check on localhost,
# and fires a demo alert — no signup, no API key, no manual clone.
#
# (npx -y @vibetechnologies/mkt-alerts try ships with the next npm release)`

const MCP_CODE = `# Add to your MCP client config (Claude Desktop, Cursor, etc.)
{
  "mcpServers": {
    "mkt": {
      "command": "mkt",
      "args": ["mcp"]
    }
  }
}

# Or register with the Claude Code CLI:
claude mcp add --transport stdio mkt -- mkt mcp

# Read-only — exactly 4 tools, no alert writes:
#   get_quote(symbol)
#   query_history(symbol, limit)
#   get_alerts()
#   get_portfolio(name)
#
# Alerts are created via the CLI or HTTP API, never via MCP.`

const CLI_CODE = `# Try it instantly — no install, no signup
npx -y github:dzianisv/mkt-alerts try

# Install
npm install -g @vibetechnologies/mkt-alerts

# Price/level alerts require --data-source: the CLI refuses to
# store a fabricated support/resistance line without evidence.
mkt-alerts add \\
  --symbol BTC-USD \\
  --condition below --value 90000 \\
  --reason "reclaim entry" \\
  --data-source "210w OHLCV from TradingView" \\
  --channel ntfy:my-topic

# List active alerts
mkt-alerts list`

const API_CODE = `# Read — quotes, alerts, metrics
curl https://mkt.agentlabs.cc/quotes/BTC-USD -H "Authorization: Bearer $TOKEN"
curl https://mkt.agentlabs.cc/quotes         -H "Authorization: Bearer $TOKEN"
curl https://mkt.agentlabs.cc/alerts         -H "Authorization: Bearer $TOKEN"
curl https://mkt.agentlabs.cc/metrics        -H "Authorization: Bearer $TOKEN"

# Write — create / delete alerts (bearer-authenticated)
curl -X POST https://mkt.agentlabs.cc/alerts \\
  -H "Authorization: Bearer $TOKEN"

curl -X DELETE https://mkt.agentlabs.cc/alerts \\
  -H "Authorization: Bearer $TOKEN"

# Self-host, or request access to the hosted instance → ai@agentlabs.cc`

const SKILL_CODE = `# Install as a Claude Code skill
npx skills add github.com/dzianisv/mkt-alerts/ -s mkt-alerts -y

# Agents (stocks-advisor, crypto-advisor, multi-lens-quorum, etc.)
# can then set alerts themselves after analysis, via the CLI or
# HTTP API — never via MCP, which is strictly read-only:
mkt-alerts add \\
  --symbol BTC-USD \\
  --condition below --value 90000 \\
  --reason "reclaim entry" \\
  --data-source "210w OHLCV from TradingView" \\
  --channel ntfy:my-topic`

const PINE_CODE = `# golden-cross.pine — plot a "signal" series
//@version=5
indicator("golden cross")
plot(ta.sma(close, 20) - ta.sma(close, 50), "signal")

# Arm it — runs on your own checker via an isolated PineTS
# subprocess, evaluated every ~15 minutes. Never on TradingView's
# servers, never against your alert plan's quota.
npx -y @vibetechnologies/mkt-alerts add \\
  --symbol BTC-USD \\
  --pine golden-cross.pine \\
  --signal signal \\
  --fire-on cross_up \\
  --reason "SMA20 crossing above SMA50 confirms trend flip" \\
  --channel email:you@example.com`

const OPENCLAW_CODE = `openclaw plugins install ./integrations/openclaw
openclaw gateway restart

# No GCP, no API keys — live prices from Coinbase (crypto) and
# Yahoo Finance (stocks), public key-free endpoints.
# Zero runtime deps (Node built-ins only: fetch/fs/path). MIT licensed.`

const ALERT_CONDITIONS = [
  { condition: "above / below", type: "Price", example: "BTC-USD below 90000" },
  { condition: "pct_up / pct_down", type: "% move", example: "AAPL pct_down 5%" },
  { condition: "rsi_above / rsi_below", type: "RSI", example: "ETH-USD rsi_below 30" },
  { condition: "sma_cross_above / sma_cross_below", type: "SMA cross", example: "SOL-USD sma_cross_above" },
  { condition: "macd_cross", type: "MACD", example: "BTC-USD macd_cross" },
  { condition: "volume_above", type: "Volume spike", example: "NVDA volume_above 50M" },
  { condition: "pine", type: "Pine Script v5", example: "custom indicator, any period" },
]

type Tab = "mcp" | "cli" | "api" | "skill"

export default function AgentsDataPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mcp")

  const tabCode: Record<Tab, string> = {
    mcp: MCP_CODE,
    cli: CLI_CODE,
    api: API_CODE,
    skill: SKILL_CODE,
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e8eaed]">
      {/* Header */}
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight text-[#e8eaed] hover:text-white transition-colors">
            AgentLabs Agents Data
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Products
            </Link>
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] text-sm font-medium"
              size="sm"
            >
              <a href="mailto:ai@agentlabs.cc">Request Demo</a>
            </Button>
            <a
              href="https://github.com/dzianisv/mkt-alerts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="rounded-full bg-[#81c995]/10 px-3 py-1 text-xs font-medium text-[#81c995] border border-[#81c995]/20">
              Open Source · MIT
            </span>
            <span className="rounded-full bg-[#3c4043]/60 px-3 py-1 text-xs font-medium text-[#9aa0a6]">
              Stocks + Crypto
            </span>
            <span className="rounded-full bg-[#fdd663]/10 px-3 py-1 text-xs font-medium text-[#fdd663] border border-[#fdd663]/20">
              Self-Hostable
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#e8eaed] md:text-5xl lg:text-6xl max-w-3xl mb-4">
            Price alerts and{" "}
            <span className="text-[#fdd663]">Pine Script signals</span> for AI agents
          </h1>
          <p className="text-lg text-[#9aa0a6] max-w-2xl mb-8 leading-relaxed">
            An alerting engine, not a charting replacement. Set price, RSI/MACD/SMA, and full Pine
            Script v5 conditions on 10,000+ stocks and crypto — delivered by ntfy push, email, or
            Telegram, and readable by any AI agent via MCP, HTTP API, or CLI.
          </p>

          <div className="rounded-xl border border-[#3c4043] bg-[#111111] overflow-hidden mb-6 max-w-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="ml-2 text-xs text-[#9aa0a6] font-mono">terminal</span>
            </div>
            <pre className="p-6 font-mono text-sm text-[#e8eaed] leading-relaxed overflow-x-auto">{TRIAL_CODE}</pre>
          </div>

          <figure className="rounded-xl border border-[#3c4043] bg-[#111111] overflow-hidden mb-6 max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mkt-alerts-demo.gif"
              alt="mkt-alerts one-command trial: npx github:dzianisv/mkt-alerts try fires a live BTC-USD alert"
              width={1200}
              height={700}
              loading="lazy"
              className="w-full h-auto"
            />
            <figcaption className="px-4 py-3 border-t border-[#3c4043] bg-[#1a1a1a] text-xs text-[#9aa0a6] font-mono">
              One command — no signup — fires a live alert in seconds.
            </figcaption>
          </figure>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium">
              <a href="mailto:ai@agentlabs.cc" className="flex items-center gap-2">
                Request Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:border-[#fdd663]/40 hover:bg-[#fdd663]/5">
              <a
                href="https://github.com/dzianisv/mkt-alerts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
          <p className="text-sm text-[#9aa0a6]">
            MIT licensed · Self-hostable · <code className="font-mono text-xs text-[#fdd663]">@vibetechnologies/mkt-alerts</code> on npm · Live at mkt.agentlabs.cc
          </p>
        </div>
      </section>

      {/* Three feature columns */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Three ways in, same alerts underneath</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm">
            Read prices and alerts from your agent, manage alerts from your terminal or backend.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                  <Terminal className="h-5 w-5 text-[#fdd663]" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">MCP Server (read-only)</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Drop into Claude Desktop, Claude Code, Cursor, or any MCP-compatible agent.
                  Exposes exactly 4 read tools — quotes, history, alerts, portfolio. No write tools;
                  alerts are managed via CLI or HTTP API.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                  <Code2 className="h-5 w-5 text-[#fdd663]" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">HTTP API</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Bearer-authenticated REST. <code className="font-mono text-xs text-[#fdd663]">GET /quotes</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">GET /alerts</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">POST</code>/<code className="font-mono text-xs text-[#fdd663]">DELETE /alerts</code>. Works from any language.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-[#fdd663]" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">CLI</h3>
                <p className="text-sm text-[#9aa0a6]">
                  <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">
                    npx -y github:dzianisv/mkt-alerts try
                  </code>{" "}
                  — no install. Set alerts from your terminal or agent scripts, with a mandatory
                  data-source evidence gate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Integration paths
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">How it works</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm">
            Four integration paths, same alerting engine underneath.
          </p>

          <div className="flex gap-2 mb-4 flex-wrap">
            {(["mcp", "cli", "api", "skill"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#fdd663]/10 text-[#fdd663]"
                    : "bg-[#1a1a1a] text-[#9aa0a6] hover:bg-[#222222]"
                }`}
              >
                {tab === "mcp" ? "MCP (read-only)" : tab === "cli" ? "CLI" : tab === "api" ? "HTTP API" : "Claude Skill"}
              </button>
            ))}
          </div>

          <pre className="bg-[#0d0d0d] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
            {tabCode[activeTab]}
          </pre>
        </div>
      </section>

      {/* Alert conditions table */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Alert conditions</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm">
            Agents and humans can subscribe to any of these conditions via the API or CLI.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#3c4043]">
                  <th className="text-left py-3 pr-6 font-semibold text-[#9aa0a6]">Condition</th>
                  <th className="text-left py-3 pr-6 font-semibold text-[#9aa0a6]">Type</th>
                  <th className="text-left py-3 font-semibold text-[#9aa0a6]">Example</th>
                </tr>
              </thead>
              <tbody>
                {ALERT_CONDITIONS.map((row, i) => (
                  <tr key={i} className={`border-b border-[#3c4043] ${i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#141414]"}`}>
                    <td className="py-3 pr-6">
                      <code className="font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded text-xs text-[#fdd663]">
                        {row.condition}
                      </code>
                    </td>
                    <td className="py-3 pr-6 text-[#9aa0a6]">{row.type}</td>
                    <td className="py-3 text-[#9aa0a6] font-mono text-xs">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pine Script v5 */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              New · Custom Indicators
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Pine Script v5 alerts</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm max-w-2xl leading-relaxed">
            Write real <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">ta.sma</code>/
            <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">ta.rsi</code>/custom
            Pine Script v5 logic. It runs on your own checker via an isolated PineTS subprocess — not on
            TradingView&apos;s servers, and not against your alert plan&apos;s quota. Evaluated every ~15 minutes.
          </p>

          <div className="rounded-xl border border-[#3c4043] bg-[#111111] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="ml-2 text-xs text-[#9aa0a6] font-mono">golden-cross.pine</span>
            </div>
            <pre className="p-6 font-mono text-sm text-[#e8eaed] leading-relaxed overflow-x-auto">{PINE_CODE}</pre>
          </div>

          <p className="text-[#9aa0a6] text-sm mt-4 leading-relaxed">
            <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">--signal signal</code> names
            which <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">plot()</code> series to
            read (default <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">&quot;signal&quot;</code>).{" "}
            <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">--fire-on cross_up</code> is
            edge-triggered — fires when the signal crosses 0 upward. <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">truthy</code> is
            state-based — fires on every check while the signal is currently positive (e.g. &quot;while oversold&quot;).
          </p>
        </div>
      </section>

      {/* OpenClaw agent-wake plugin */}
      <section className="py-16 md:py-24 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              New · OpenClaw Plugin
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Your agent wakes up when the market hits your level</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm max-w-2xl leading-relaxed">
            An in-process OpenClaw plugin runs the mkt-alerts checker inside your agent&apos;s gateway
            process. When an alert fires, it wakes the agent so it acts on the condition
            automatically — on the last active channel. No separate service to babysit.
          </p>

          <div className="rounded-xl border border-[#3c4043] bg-[#0a0a0a] overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="h-3 w-3 rounded-full bg-[#3c4043]" />
              <span className="ml-2 text-xs text-[#9aa0a6] font-mono">terminal</span>
            </div>
            <pre className="p-6 font-mono text-sm text-[#e8eaed] leading-relaxed overflow-x-auto">{OPENCLAW_CODE}</pre>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border border-[#3c4043] bg-[#1a1a1a] px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} className="text-[#fdd663]" />
                <span className="text-sm font-medium text-[#e8eaed]">No GCP, no API keys</span>
              </div>
              <p className="text-xs text-[#9aa0a6]">Public, key-free price feeds — Coinbase for crypto, Yahoo Finance for stocks.</p>
            </div>
            <div className="rounded-lg border border-[#3c4043] bg-[#1a1a1a] px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Rocket size={14} className="text-[#fdd663]" />
                <span className="text-sm font-medium text-[#e8eaed]">Zero runtime deps</span>
              </div>
              <p className="text-xs text-[#9aa0a6]">Node built-ins only — fetch, fs, path. Nothing else to install or trust.</p>
            </div>
            <div className="rounded-lg border border-[#3c4043] bg-[#1a1a1a] px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Code2 size={14} className="text-[#fdd663]" />
                <span className="text-sm font-medium text-[#e8eaed]">MIT licensed</span>
              </div>
              <p className="text-xs text-[#9aa0a6]">Read the plugin source, fork it, or vendor it — no lock-in.</p>
            </div>
          </div>

          <a
            href="https://github.com/dzianisv/mkt-alerts/tree/main/integrations/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#fdd663] hover:text-[#ffe28a] transition-colors"
          >
            Read the OpenClaw plugin docs
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Self-host */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Self-hosted
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Self-host in 10 minutes</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm">
            MIT licensed. No vendor dependency. Bring your own infrastructure.
          </p>
          <pre className="bg-[#111111] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
{`git clone https://github.com/dzianisv/mkt-alerts
cd mkt-alerts
bash deploy.sh   # GCP e2-micro free tier + Cloudflare Tunnel`}
          </pre>
          <p className="text-[#9aa0a6] text-sm mt-4">
            Deploys to a free GCP e2-micro VM behind Cloudflare Tunnel. No open ports.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center text-[#e8eaed]">
            Ready to give your agents market alerts?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-base mb-1 text-[#e8eaed]">Hosted</h3>
                <p className="text-sm text-[#9aa0a6] mb-4">
                  Request access to the managed instance at mkt.agentlabs.cc — Pine Script v5,
                  OpenClaw agent-wake, and the one-command trial included. No setup required.
                </p>
                <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full">
                  <a href="mailto:ai@agentlabs.cc">Request Access</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-[#3c4043] bg-[#141414] shadow-none transition-colors hover:border-[#fdd663]/40">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-base mb-1 text-[#e8eaed]">Self-hosted</h3>
                <p className="text-sm text-[#9aa0a6] mb-4">
                  Clone and deploy in 10 minutes, or just try it first with{" "}
                  <code className="font-mono text-xs text-[#fdd663]">npx</code>. MIT license, full
                  source on GitHub.
                </p>
                <Button asChild className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:border-[#fdd663]/40 hover:bg-[#fdd663]/5 w-full">
                  <a
                    href="https://github.com/dzianisv/mkt-alerts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
          <span>© 2026 AgentLabs · ai@agentlabs.cc · MIT License</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dzianisv/mkt-alerts"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8eaed] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@vibetechnologies/mkt-alerts"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8eaed] transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
