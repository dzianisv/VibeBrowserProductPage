"use client"

import React, { useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/components/google-analytics"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Copy,
  Check,
  Terminal,
  Globe,
  Layers,
  Lock,
  Zap,
  GitBranch,
  Shield,
  Code2,
  Cloud,
  Server,
  Bot,
  Cookie,
  Wifi,
  MonitorSmartphone,
} from "lucide-react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="p-1.5 rounded hover:bg-[#3c4043] text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-[#81c995]" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

const CLI_COMMAND = "npx -y --package @vibebrowser/mcp@latest vibebrowser-cli"
const CLI_REMOTE_COMMAND = "npx -y --package @vibebrowser/mcp@latest vibebrowser-cli --remote <uuid> --timeout 30000"
const MCP_COMMAND = "npx -y --package @vibebrowser/mcp@latest vibebrowser-mcp --remote <uuid>"

const CLOUD_AGENTS = [
  {
    name: "Paperclip",
    description: "Autonomous task execution platform for AI agents. Agents can browse authenticated sites on behalf of users.",
    url: "https://paperclip.ing",
    color: "bg-[#f0b27a]",
  },
  {
    name: "OpenClaw",
    description: "Agent marketplace and execution framework. Give your agents real browser access to complete web tasks.",
    url: "https://openclaw.com",
    color: "bg-[#a8dab5]",
  },
  {
    name: "Hermes",
    description: "Nous Research's open agent. Connect to your local browser for grounded web interaction and research.",
    url: "https://hermes-agent.nousresearch.com/",
    color: "bg-[#a8c7fa]",
  },
]

const VALUE_PROPS = [
  {
    icon: <Cookie className="w-6 h-6" />,
    title: "Your Active Sessions",
    description: "Cloud agents access your logged-in browser — Gmail, Slack, dashboards, internal tools. No re-authentication needed.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Credentials Never Leave Your Machine",
    description: "Passwords and session cookies stay in your local browser. The agent sends commands, not credentials.",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "No Port Forwarding or VPN",
    description: "The --remote flag connects through our relay server. Share a UUID and any cloud agent can reach your browser instantly.",
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Multi-Agent Ready",
    description: "Multiple cloud agents can connect to the same browser simultaneously. Coordinate research, monitoring, and execution in parallel.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "UUID-Authenticated",
    description: "Only agents with your UUID can connect. Revoke access instantly by regenerating your ID in the extension.",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Local or Remote — Same CLI",
    description: "Run without --remote for local agents. Add --remote for cloud agents. Same tool surface, same capabilities.",
  },
]

const USE_CASES = [
  {
    title: "Autonomous Web Research",
    description: "Cloud agents browse the web using your authenticated sessions — search your email, check your calendar, monitor dashboards.",
    example: "Agent reads your Gmail threads and summarizes action items from the last 24 hours.",
  },
  {
    title: "Multi-Step Form Automation",
    description: "Complete complex workflows across authenticated portals — HR systems, banking, government services — without sharing passwords.",
    example: "Agent fills out your expense reports using data from receipts in your email.",
  },
  {
    title: "Monitoring and Alerting",
    description: "Keep a cloud agent watching dashboards, internal tools, or competitor sites. Get summaries without keeping tabs open.",
    example: "Agent checks your analytics dashboard hourly and alerts you on anomalies.",
  },
  {
    title: "Agent Economy Integration",
    description: "Let marketplace agents (OpenClaw, Hermes) perform browser tasks as a service while keeping your data local.",
    example: "Hire a specialized agent to update your CRM records based on recent LinkedIn activity.",
  },
]

export default function CliPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#81c995]/10 text-[#81c995] border-[#81c995]/20">
                <Cloud className="w-4 h-4 mr-2" />
                VibeBrowser for Cloud Agents
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Give Cloud Agents Access
                  <br className="hidden sm:block" />
                  <span className="text-[#81c995]"> to Your Real Browser</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  One CLI command connects any cloud-hosted agent to your local browser — with all your sessions, cookies, and extensions intact. No passwords shared, no ports opened.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="w-full max-w-2xl">
                <div className="bg-[#1a1a1a] rounded-lg border border-[#81c995]/30 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#81c995]" />
                      <span className="text-xs text-[#9aa0a6] font-mono">Connect a cloud agent to your browser</span>
                    </div>
                    <CopyButton text="npx -y --package @vibebrowser/mcp@latest vibebrowser-cli --remote YOUR_UUID --timeout 30000" />
                  </div>
                  <pre className="px-4 py-3 text-sm font-mono text-[#e8eaed] overflow-x-auto">
                    <code>{CLI_REMOTE_COMMAND}</code>
                  </pre>
                </div>
                <p className="text-xs text-[#5f6368] mt-2">
                  Requires Node.js and the{" "}
                  <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank" className="text-[#81c995] hover:underline">
                    Vibe Browser extension
                  </Link>
                </p>
              </div>

              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button
                    size="lg"
                    className="bg-[#81c995] hover:bg-[#a8dab5] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full"
                    onClick={() => trackCTAClick('install_extension_docs', 'cli_hero')}
                  >
                    Install Extension
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/mcp">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]"
                  >
                    MCP Setup Guide
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#81c995]" />
                  Works from anywhere
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Credentials stay local
                </span>
                <span className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Multi-agent support
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Zero config networking
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Cloud Agents Need Your Real Browser */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Why cloud agents need your real browser
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Cloud-hosted agents are powerful — but they can&apos;t log into your accounts. VibeBrowser bridges that gap by letting remote agents control your authenticated browser session without ever seeing your passwords.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUE_PROPS.map((prop) => (
                <Card key={prop.title} className="bg-[#0a0a0a] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[#81c995]/10 flex items-center justify-center text-[#81c995] mb-4">
                      {prop.icon}
                    </div>
                    <h3 className="font-medium text-[#e8eaed] mb-2">{prop.title}</h3>
                    <p className="text-sm text-[#9aa0a6]">{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                How it works
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Two modes, one CLI. Run locally for agents on your machine, or use <code className="text-[#81c995] bg-[#81c995]/5 px-1.5 py-0.5 rounded">--remote</code> for agents anywhere on the internet.
              </p>
            </div>

            {/* Architecture diagram */}
            <div className="bg-[#111111] rounded-lg border border-[#81c995]/30 overflow-hidden max-w-3xl mx-auto mb-10">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="w-3 h-3 rounded-full bg-[#f28b82]" />
                <div className="w-3 h-3 rounded-full bg-[#fdd663]" />
                <div className="w-3 h-3 rounded-full bg-[#81c995]" />
                <span className="text-xs text-[#5f6368] ml-2">Cloud Agent → Your Browser</span>
              </div>
              <pre className="p-6 text-sm font-mono text-[#9aa0a6] overflow-x-auto leading-relaxed">
{`  ┌─────────────────────────────────────────────────────────┐
  │              Cloud / Remote Environment                   │
  │                                                           │
  │   Paperclip Agent    OpenClaw Agent    Hermes Agent       │
  │        │                  │                │              │
  │        ▼                  ▼                ▼              │
  │   vibebrowser-cli    vibebrowser-mcp   vibebrowser-cli    │
  │   --remote <uuid>    --remote <uuid>   --remote <uuid>   │
  └───────────┬──────────────┬──────────────┬────────────────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                   wss://relay.vibebrowser.app/<uuid>
                             │
                             ▼
                ┌────────────────────────┐
                │    Public Relay Server  │
                │  relay.vibebrowser.app  │
                └────────────────────────┘
                             │
                   wss://relay.vibebrowser.app
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────┐
  │              Your Local Machine                           │
  │                                                           │
  │           ┌──────────────────┐                           │
  │           │  Vibe Extension  │  ← logged into everything │
  │           │   (your Chrome)  │    Gmail, Slack, GitHub... │
  │           └──────────────────┘                           │
  └──────────────────────────────────────────────────────────┘`}
              </pre>
            </div>

            {/* Steps */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#81c995]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#81c995] font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#e8eaed]">Install the Vibe Browser extension</h4>
                  <p className="text-sm text-[#9aa0a6] mt-1">Enable MCP External Control in <strong>Remote</strong> mode from Settings. Copy your UUID.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#81c995]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#81c995] font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#e8eaed]">Configure your cloud agent</h4>
                  <p className="text-sm text-[#9aa0a6] mt-1">Give the agent the CLI command or MCP server config with your UUID:</p>
                  <div className="mt-3 bg-[#0a0a0a] rounded border border-[#2a2a2a] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                      <span className="text-xs text-[#5f6368] font-mono">CLI mode</span>
                      <CopyButton text="npx -y --package @vibebrowser/mcp@latest vibebrowser-cli --remote YOUR_UUID --timeout 30000" />
                    </div>
                    <pre className="px-3 py-2 text-sm font-mono text-[#e8eaed] overflow-x-auto">
                      <code>{CLI_REMOTE_COMMAND}</code>
                    </pre>
                  </div>
                  <div className="mt-3 bg-[#0a0a0a] rounded border border-[#2a2a2a] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                      <span className="text-xs text-[#5f6368] font-mono">MCP server mode</span>
                      <CopyButton text="npx -y --package @vibebrowser/mcp@latest vibebrowser-mcp --remote YOUR_UUID" />
                    </div>
                    <pre className="px-3 py-2 text-sm font-mono text-[#e8eaed] overflow-x-auto">
                      <code>{MCP_COMMAND}</code>
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#81c995]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#81c995] font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#e8eaed]">Agent controls your browser</h4>
                  <p className="text-sm text-[#9aa0a6] mt-1">The cloud agent can now navigate, click, fill forms, read pages — all in your authenticated browser. You see everything happen in real time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible Cloud Agents */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Works with the agent economy
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Any agent platform that supports MCP or CLI tool execution can use VibeBrowser to access your real browser. Here are some platforms already using it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {CLOUD_AGENTS.map((agent) => (
                <Card key={agent.name} className="bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                  <CardContent className="p-6">
                    <div className={`w-10 h-10 rounded-lg ${agent.color} flex items-center justify-center mb-4`}>
                      <span className="text-[#202124] font-bold text-lg">{agent.name[0]}</span>
                    </div>
                    <h3 className="font-medium text-[#e8eaed] mb-2">{agent.name}</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">{agent.description}</p>
                    <Link href={agent.url} target="_blank" className="text-sm text-[#81c995] hover:underline flex items-center gap-1">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-[#5f6368] mt-8">
              Any MCP-compatible agent works — these are just examples. See the full{" "}
              <Link href="/mcp" className="text-[#8ab4f8] hover:underline">MCP integration guide</Link>{" "}
              for setup with Claude Code, Cursor, Codex, and more.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                What agents can do with your browser
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Your browser has active sessions to every service you use. That makes it the most valuable tool an agent can have.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {USE_CASES.map((useCase) => (
                <Card key={useCase.title} className="bg-[#111111] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-[#e8eaed] mb-2">{useCase.title}</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">{useCase.description}</p>
                    <div className="bg-[#0a0a0a] rounded border border-[#2a2a2a] px-4 py-3">
                      <p className="text-xs text-[#5f6368] uppercase tracking-wider mb-1">Example</p>
                      <p className="text-sm text-[#c4cbe0]">{useCase.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CLI vs MCP */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                CLI or MCP — choose your integration
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Both modes give agents the same 25+ browser tools. The difference is how they connect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="w-5 h-5 text-[#81c995]" />
                    <h3 className="font-medium text-[#e8eaed]">vibebrowser-cli</h3>
                  </div>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Standalone CLI binary. Agents call it as a subprocess or shell command. Best for platforms that execute tools via command line.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      <span className="text-[#c4cbe0]">Works with any agent that can run shell commands</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      <span className="text-[#c4cbe0]">Simple --timeout flag for long-running tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      <span className="text-[#c4cbe0]">No protocol overhead — just stdin/stdout</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="w-5 h-5 text-[#8ab4f8]" />
                    <h3 className="font-medium text-[#e8eaed]">vibebrowser-mcp</h3>
                  </div>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Full MCP server over stdio. Agents connect via the Model Context Protocol. Best for MCP-native platforms.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      <span className="text-[#c4cbe0]">Native integration with Claude, Cursor, Codex</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      <span className="text-[#c4cbe0]">Structured tool schemas and responses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      <span className="text-[#c4cbe0]">Persistent session across tool calls</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-[#5f6368]">
                Both binaries ship in the same npm package:{" "}
                <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1.5 py-0.5 rounded">@vibebrowser/mcp</code>
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Ready to connect your agents?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Install the extension, copy your UUID, and give any cloud agent access to your authenticated browser in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                <Button
                  size="lg"
                  className="bg-[#81c995] hover:bg-[#a8dab5] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full"
                  onClick={() => trackCTAClick('install_extension_docs', 'cli_bottom_cta')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/mcp">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]"
                >
                  Full MCP Docs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
