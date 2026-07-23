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
  Clock,
} from "lucide-react"

const TRIAL_CODE = `npx -y github:dzianisv/mkt-alerts try

# Downloads the mkt engine, runs a local price check,
# and fires a demo alert — no signup, no API key, no clone.`

const MCP_CODE = `# mkt-alerts ships its OWN stdio MCP server — READ/WRITE.
# Add to your MCP client config (Claude Desktop, Claude Code, Cursor):
{
  "mcpServers": {
    "mkt-alerts": {
      "command": "npx",
      "args": ["-y", "github:dzianisv/mkt-alerts", "mcp"]
    }
  }
}

# Tools (manage alerts, not just read):
#   list_alerts()
#   add_alert(...)
#   remove_alert(id)

# ── Optional companion (third-party, read-only) ──────────────
# The 'mkt' Go binary (github.com/stxkxs/mkt) exposes a separate
# READ-ONLY MCP with market-data tools. Install it on PATH first:
#   get_quote  query_history  get_alerts  get_portfolio
# {
#   "mcpServers": { "mkt": { "command": "mkt", "args": ["mcp"] } }
# }`

const CLI_CODE = `# The full CLI runs clone-free from GitHub — no install, no signup.
# (The scoped package @vibetechnologies/mkt-alerts exists on npm;
#  advanced commands ship via the github: form today.)

# Try it instantly
npx -y github:dzianisv/mkt-alerts try

# Price/level alerts require --data-source: the CLI refuses to
# store a fabricated support/resistance line without evidence.
npx -y github:dzianisv/mkt-alerts add \\
  --symbol BTC-USD \\
  --condition below --value 90000 \\
  --reason "reclaim entry" \\
  --data-source "200wMA \$62,640 from TradingView 210 weekly bars" \\
  --channel ntfy:my-topic

# List active alerts
npx -y github:dzianisv/mkt-alerts list`

const API_CODE = `# Private, bearer-authenticated REST — every route returns 401
# without a valid token (this is NOT an open public endpoint).

# Read — quotes, alerts, metrics
curl "$MKT_API_URL/quotes/BTC-USD" -H "Authorization: Bearer $TOKEN"
curl "$MKT_API_URL/quotes"         -H "Authorization: Bearer $TOKEN"
curl "$MKT_API_URL/alerts"         -H "Authorization: Bearer $TOKEN"
curl "$MKT_API_URL/metrics"        -H "Authorization: Bearer $TOKEN"

# Write — create / delete alerts
curl -X POST "$MKT_API_URL/alerts" \\
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \\
  -d '{"symbol":"BTC-USD","conditions":[{"condition":"below","value":90000}]}'

curl -X DELETE "$MKT_API_URL/alerts/:id" \\
  -H "Authorization: Bearer $TOKEN"

# Private, bearer-authenticated. Self-host your own instance,
# or request access → ai@agentlabs.cc`

const SKILL_CODE = `# Install as a Claude Code skill
npx skills add github.com/dzianisv/mkt-alerts/ -s mkt-alerts -y

# Agents (stocks-advisor, crypto-advisor, multi-lens-quorum, etc.)
# can then set alerts themselves after analysis — via the mkt-alerts
# MCP server, the CLI, or the HTTP API:
npx -y github:dzianisv/mkt-alerts add \\
  --symbol BTC-USD \\
  --condition below --value 90000 \\
  --reason "reclaim entry" \\
  --data-source "200wMA \$62,640 from TradingView 210 weekly bars" \\
  --channel ntfy:my-topic`

const PINE_CODE = `# golden-cross.pine — plot a "signal" series
//@version=5
indicator("golden cross")
plot(ta.sma(close, 20) - ta.sma(close, 50), "signal")

# Arm it — runs SERVER-SIDE in an isolated PineTS subprocess,
# evaluated every ~15 minutes. Never on TradingView's servers,
# never against your alert plan's quota.
npx -y github:dzianisv/mkt-alerts add \\
  --symbol BTC-USD \\
  --pine golden-cross.pine \\
  --signal signal \\
  --fire-on cross_up \\
  --reason "SMA20 crossing above SMA50 confirms trend flip" \\
  --channel email:you@example.com`

const OPENCLAW_CODE = `openclaw plugins install @vibetechnologies/openclaw-mkt-alerts
openclaw gateway restart

# The plugin is publishing to npm now. Until it lands, point OpenClaw
# at it via your plugins.load.paths config.
#
# Live prices from Coinbase (crypto) and Yahoo Finance (stocks),
# public key-free endpoints. Zero runtime deps (Node built-ins only:
# fetch/fs/path). MIT licensed.
#
# Note: the plugin's Pine, match:"sequence", and volume_above
# conditions are accepted for config parity but DEFERRED — they do
# not fire yet.`

const HERMES_CLI_CODE = `# Pattern A — shell the CLI on a schedule.
# Requires ~/.config/mkt-watch/auth.json present on the runner.
npx -y github:dzianisv/mkt-alerts add \\
  --symbol BTC-USD --condition below --value 90000 \\
  --reason "reclaim entry" \\
  --data-source "200wMA \$62,640 from TradingView 210 weekly bars" \\
  --channel ntfy:my-topic`

const HERMES_API_CODE = `# Pattern B — POST the HTTP API directly with a bearer token.
curl -sS -X POST "$MKT_API_URL/alerts" \\
  -H "Authorization: Bearer $MKT_TOKEN" -H "Content-Type: application/json" \\
  -d '{"symbol":"BTC-USD","desk":"crypto","reasoning":"reclaim entry [data: 200wMA \$62,640, 210w TradingView]","conditions":[{"condition":"below","value":90000}]}'`

const ALERT_CONDITIONS = [
  { condition: "above / below", type: "Price", example: "BTC-USD below 90000" },
  { condition: "pct_up / pct_down", type: "% move", example: "AAPL pct_down 5%" },
  { condition: "rsi_above / rsi_below", type: "RSI", example: "ETH-USD rsi_below 30" },
  { condition: "sma_cross_above / sma_cross_below", type: "SMA cross", example: "SOL-USD sma_cross_above" },
  { condition: "macd_cross", type: "MACD", example: "BTC-USD macd_cross" },
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
            MIT licensed · Self-host or request access · The full CLI ships via{" "}
            <code className="font-mono text-xs text-[#fdd663]">npx -y github:dzianisv/mkt-alerts</code> today
            (<code className="font-mono text-xs text-[#fdd663]">@vibetechnologies/mkt-alerts</code> on npm)
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
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">MCP Server (read/write)</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Drop into Claude Desktop, Claude Code, Cursor, or any MCP-compatible agent.
                  mkt-alerts ships its own stdio MCP server that both reads and manages alerts —
                  <code className="font-mono text-xs text-[#fdd663]"> list_alerts</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">add_alert</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">remove_alert</code>.
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
                  Private, bearer-authenticated REST. <code className="font-mono text-xs text-[#fdd663]">GET /quotes</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">GET /alerts</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">POST /alerts</code>,{" "}
                  <code className="font-mono text-xs text-[#fdd663]">DELETE /alerts/:id</code>. Works from any language.
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
                {tab === "mcp" ? "MCP (read/write)" : tab === "cli" ? "CLI" : tab === "api" ? "HTTP API" : "Claude Skill"}
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
          <p className="text-xs text-[#9aa0a6] mt-4">
            RSI period is fixed at 14 and SMA-cross period at 20 — there is no CLI flag to change
            them yet. For any other period or custom logic, use a Pine Script v5 condition.
          </p>
        </div>
      </section>
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

      {/* Hermes cron */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-[#fdd663]" />
            <span className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider">
              Scheduling
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Schedule alerts with Hermes (or any cron)</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm max-w-2xl leading-relaxed">
            <a
              href="https://hermes-agent.nousresearch.com/docs/user-guide/features/cron"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fdd663] hover:text-[#ffe28a] transition-colors"
            >
              Hermes
            </a>{" "}
            is a scheduled-prompt agent — not a separate mkt-alerts plugin. It just runs the same
            CLI or HTTP call a human would, on a schedule. Two patterns work today.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
                <Terminal size={14} className="text-[#fdd663]" />
                <span className="text-xs text-[#9aa0a6] font-mono">Pattern A · CLI</span>
              </div>
              <pre className="p-6 font-mono text-xs text-[#e8eaed] leading-relaxed overflow-x-auto">{HERMES_CLI_CODE}</pre>
            </div>
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3c4043] bg-[#1a1a1a]">
                <Code2 size={14} className="text-[#fdd663]" />
                <span className="text-xs text-[#9aa0a6] font-mono">Pattern B · HTTP API</span>
              </div>
              <pre className="p-6 font-mono text-xs text-[#e8eaed] leading-relaxed overflow-x-auto">{HERMES_API_CODE}</pre>
            </div>
          </div>

          <p className="text-[#9aa0a6] text-sm mt-4 leading-relaxed">
            Auth is read from <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">~/.config/mkt-watch/auth.json</code>{" "}
            (<code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">apiUrl</code> +{" "}
            <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#fdd663]">token</code>). There is no
            env-var override for the CLI&apos;s auth today, so a Hermes runner needs that file present —
            or use Pattern B with an explicit bearer token.
          </p>
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
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Self-host the daemon in 10 minutes</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm max-w-2xl leading-relaxed">
            MIT licensed. No vendor dependency. This clones the repo to stand up your own
            always-on daemon (the whole backend) — distinct from installing the client, CLI,
            or plugin, which are all clone-free.
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
                <h3 className="font-semibold text-base mb-1 text-[#e8eaed]">Request access to a hosted instance</h3>
                <p className="text-sm text-[#9aa0a6] mb-4">
                  There&apos;s a private, bearer-gated reference instance (Pine Script v5, OpenClaw
                  agent-wake, one-command trial). It&apos;s not an open multi-tenant SaaS — ask for
                  access, or stand up your own daemon in ~10 minutes.
                </p>
                <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full">
                  <a href="mailto:ai@agentlabs.cc">Ask about access</a>
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
