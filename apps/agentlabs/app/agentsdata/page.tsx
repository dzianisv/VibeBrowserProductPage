"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Code2, Zap, Github } from "lucide-react"

const MCP_CODE = `# Add to your MCP config (Claude Desktop, Cursor, etc.)
{
  "mcpServers": {
    "market-data": {
      "command": "mkt",
      "args": ["mcp"]
    }
  }
}
# Agent can now call: get_quote("BTC-USD"), get_rsi("AAPL"), set_alert(...)`

const CLI_CODE = `# Install once
npm install -g @vibetechnologies/mkt-alerts

# Subscribe to push notifications
mkt-alerts subscribe

# Set a price alert
mkt-alerts add \\
  --symbol BTC-USD \\
  --condition below --value 90000 \\
  --reason "Support break" \\
  --link "https://your-analysis"

# List active alerts
mkt-alerts list`

const API_CODE = `# Get real-time quote
curl https://mkt.agentlabs.cc/quotes/BTC-USD \\
  -H "Authorization: Bearer $MKT_TOKEN"

# Create an alert
curl -X POST https://mkt.agentlabs.cc/alerts \\
  -H "Authorization: Bearer $MKT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "AAPL",
    "conditions": [{"condition": "rsi_below", "value": 30}],
    "reason": "Oversold on daily"
  }'

# Get fired notifications
curl https://mkt.agentlabs.cc/notifications \\
  -H "Authorization: Bearer $MKT_TOKEN"`

const SKILL_CODE = `# Install as a Claude Code skill (agents can then set alerts automatically)
npx -y skills add github.com/dzianisv/mkt-alerts -s mkt-alerts

# Or point your agent at the hosted instance
# Skill reads auth from ~/.config/mkt-watch/auth.json
# Request access → ai@agentlabs.cc

# After install, agents (stocks-advisor, crypto-advisor, etc.) can call:
# → set_alert({ symbol: "BTC-USD", condition: "below", value: 90000, reason: "..." })
# → list_alerts()
# → remove_alert({ id: "..." })`

const ALERT_CONDITIONS = [
  { condition: "above / below", type: "Price", example: "BTC-USD below 90000" },
  { condition: "pct_up / pct_down", type: "% move", example: "AAPL pct_down 5%" },
  { condition: "rsi_above / rsi_below", type: "RSI", example: "ETH-USD rsi_below 30" },
  { condition: "sma_cross_above / sma_cross_below", type: "SMA cross", example: "SOL-USD sma_cross_above" },
  { condition: "macd_cross", type: "MACD", example: "BTC-USD macd_cross" },
  { condition: "volume_above", type: "Volume spike", example: "NVDA volume_above 50M" },
]

type Tab = "mcp" | "cli" | "api" | "skill"

export default function MarketDataPage() {
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
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight text-[#e8eaed]">AgentLabs Agents Data</span>
          <div className="flex items-center gap-3">
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
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#1e2b1e] text-[#81c995] border border-[#2a3f2a] text-xs font-medium">
            Live at mkt.agentlabs.cc
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#e8eaed]">
            Market data and alerts for AI agents
          </h1>
          <p className="text-lg text-[#9aa0a6] max-w-2xl mb-8">
            Real-time prices and indicators for 10,000+ stocks and crypto, accessible via MCP, HTTP
            API, or CLI. Set alerts programmatically. No scraping.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium">
              <a href="mailto:ai@agentlabs.cc">Request Demo</a>
            </Button>
            <Button asChild className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:bg-[#1a1a1a]">
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
            MIT licensed · Self-hostable · Live at mkt.agentlabs.cc
          </p>
        </div>
      </section>

      {/* Three feature columns */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#1e2b1e] flex items-center justify-center mb-4">
                  <Terminal className="h-5 w-5 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">MCP Server</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Drop into any MCP-compatible agent. Claude, Cursor, any tool supporting the Model
                  Context Protocol.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#1e2b1e] flex items-center justify-center mb-4">
                  <Code2 className="h-5 w-5 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">HTTP API</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Bearer-authenticated REST. GET /quotes, POST /alerts, GET /notifications. Works
                  from any language.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-lg bg-[#1e2b1e] flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#e8eaed]">CLI</h3>
                <p className="text-sm text-[#9aa0a6]">
                  <code className="font-mono bg-[#1a1a1a] px-1 rounded text-xs text-[#81c995]">
                    npx -y @vibetechnologies/mkt-alerts
                  </code>{" "}
                  — no install. Set alerts from your terminal or agent scripts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">How it works</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm">
            Three integration paths, same data underneath.
          </p>

          <div className="flex gap-2 mb-4">
            {(["mcp", "cli", "api", "skill"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#1e2b1e] text-[#81c995]"
                    : "bg-[#1a1a1a] text-[#9aa0a6] hover:bg-[#222222]"
                }`}
              >
                {tab === "mcp" ? "MCP" : tab === "cli" ? "CLI" : tab === "api" ? "HTTP API" : "Claude Skill"}
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
            Agents can subscribe to any of these conditions via the API or CLI.
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
                      <code className="font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded text-xs text-[#81c995]">
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

      {/* Self-host */}
      <section className="py-16 md:py-24 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-[#e8eaed]">Self-host in 10 minutes</h2>
          <p className="text-[#9aa0a6] mb-8 text-sm">
            MIT licensed. No vendor dependency. Bring your own infrastructure.
          </p>
          <pre className="bg-[#0a0a0a] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
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
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center text-[#e8eaed]">
            Ready to give your agents market data?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-base mb-1 text-[#e8eaed]">Hosted</h3>
                <p className="text-sm text-[#9aa0a6] mb-4">
                  Request access to the managed instance at mkt.agentlabs.cc. No setup required.
                </p>
                <Button asChild className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full">
                  <a href="mailto:ai@agentlabs.cc">Request Access</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-[#3c4043] bg-[#141414] shadow-none">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-base mb-1 text-[#e8eaed]">Self-hosted</h3>
                <p className="text-sm text-[#9aa0a6] mb-4">
                  Clone and deploy in 10 minutes. MIT license. Full source on GitHub.
                </p>
                <Button asChild className="border border-[#3c4043] bg-transparent text-[#e8eaed] hover:bg-[#1a1a1a] w-full">
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
