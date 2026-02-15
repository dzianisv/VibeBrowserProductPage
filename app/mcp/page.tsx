"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Copy,
  Check,
  Terminal,
  Globe,
  MousePointerClick,
  Layers,
  Eye,
  Mail,
  Calendar,
  Lock,
  Zap,
  GitBranch,
  Monitor,
  Code2,
  Keyboard,
  ScrollText,
  Search,
  Shield,
  ExternalLink,
  ChevronRight,
  Cpu,
} from "lucide-react"

// ----- Data -----

const COMPATIBLE_AGENTS = [
  { name: "Claude Desktop", icon: "anthropic" },
  { name: "Cursor", icon: "cursor" },
  { name: "VS Code", icon: "vscode" },
  { name: "Claude Code", icon: "claudecode" },
  { name: "OpenCode", icon: "opencode" },
  { name: "Windsurf", icon: "windsurf" },
  { name: "Gemini CLI", icon: "gemini" },
]

const COMPARISON_ROWS = [
  { feature: "Multi-agent support", vibe: true, browser: false, detail: "Multiple AI agents control the same browser simultaneously via relay daemon" },
  { feature: "Total tools", vibe: "25+", browser: "~12", detail: "" },
  { feature: "Chrome debug permissions", vibe: "Not required", browser: "Required", vibeGood: true, browserBad: true, detail: "--remote-debugging-port opens your browser to security risks" },
  { feature: "Google Workspace integration", vibe: true, browser: false, detail: "Gmail search/send/draft, Calendar view/create — 7 native tools" },
  { feature: "Credential vault", vibe: true, browser: false, detail: "Secure password manager that never exposes secrets to the LLM" },
  { feature: "Sub-agent orchestration", vibe: true, browser: false, detail: "Spawn sub-agents with isolated context and parallel tool execution" },
  { feature: "Standalone AI browser", vibe: true, browser: false, detail: "Works as both MCP server AND as a standalone AI co-pilot in-browser" },
  { feature: "Page content format", vibe: "Markdown + [index:score]", browser: "Accessibility tree", detail: "Indexed markdown drastically reduces token usage vs raw trees" },
  { feature: "Open source extension", vibe: true, browser: false, detail: "Vibe extension is open source; BrowserMCP's monorepo can't be built standalone" },
]

interface ToolDef {
  name: string
  description: string
}

const TOOL_CATEGORIES: { category: string; icon: React.ReactNode; tools: ToolDef[] }[] = [
  {
    category: "Navigation",
    icon: <Globe className="w-5 h-5" />,
    tools: [
      { name: "navigate_to_url", description: "Navigate to URL and wait for load" },
      { name: "navigate", description: "Browser history back / forward / refresh" },
    ],
  },
  {
    category: "Tab Management",
    icon: <Monitor className="w-5 h-5" />,
    tools: [
      { name: "create_new_tab", description: "Open new tab with optional URL" },
      { name: "switch_to_tab", description: "Switch browser focus to tab" },
      { name: "set_working_tab", description: "Set working tab without focus change" },
    ],
  },
  {
    category: "Index-Based Interaction",
    icon: <MousePointerClick className="w-5 h-5" />,
    tools: [
      { name: "click_by_index", description: "Click element by [index:score]" },
      { name: "fill_by_index", description: "Fill form field by index" },
      { name: "select_by_index", description: "Select dropdown option by index" },
      { name: "scroll_page", description: "Scroll page up or down" },
      { name: "media_control_by_index", description: "Control video/audio playback" },
    ],
  },
  {
    category: "Advanced Interaction",
    icon: <Keyboard className="w-5 h-5" />,
    tools: [
      { name: "keypress", description: "Send keyboard keys and shortcuts" },
      { name: "hover_element", description: "Hover to trigger tooltips/menus" },
    ],
  },
  {
    category: "Utility",
    icon: <Zap className="w-5 h-5" />,
    tools: [
      { name: "wait", description: "Wait N seconds" },
      { name: "subagent", description: "Spawn sub-agent with isolated context" },
      { name: "parallel", description: "Execute multiple tools in parallel" },
      { name: "web_fetch", description: "HTTP fetch + text extraction" },
    ],
  },
  {
    category: "Visual",
    icon: <Eye className="w-5 h-5" />,
    tools: [
      { name: "take_screenshot", description: "JPEG screenshot with resize, grayscale, quality controls" },
    ],
  },
  {
    category: "Google Workspace",
    icon: <Mail className="w-5 h-5" />,
    tools: [
      { name: "gmail_search", description: "Search emails via Gmail API" },
      { name: "gmail_get_message", description: "Get full email content" },
      { name: "gmail_get_thread", description: "Get all messages in thread" },
      { name: "gmail_create_draft", description: "Create email draft" },
      { name: "gmail_send_message", description: "Send email" },
      { name: "calendar_view", description: "View upcoming events" },
      { name: "calendar_create", description: "Create calendar event" },
    ],
  },
  {
    category: "Credential Management",
    icon: <Lock className="w-5 h-5" />,
    tools: [
      { name: "secrets_manager", description: "List/read saved credentials" },
      { name: "typein_secret", description: "Fill form from vault (hidden from LLM)" },
    ],
  },
]

interface SetupConfig {
  agent: string
  file: string
  config: string
  note?: string
}

const SETUP_CONFIGS: SetupConfig[] = [
  {
    agent: "Claude Desktop",
    file: "~/Library/Application Support/Claude/claude_desktop_config.json",
    config: `{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`,
    note: "Restart Claude Desktop after saving.",
  },
  {
    agent: "Cursor",
    file: "~/.cursor/mcp.json",
    config: `{
  "vibe": {
    "command": "npx",
    "args": ["-y", "@vibebrowser/mcp"]
  }
}`,
    note: "Or: Settings > Features > MCP Servers > Add Server",
  },
  {
    agent: "VS Code",
    file: "settings.json",
    config: `{
  "github.copilot.chat.mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`,
  },
  {
    agent: "OpenCode",
    file: "opencode.json",
    config: `{
  "mcp": {
    "vibe": {
      "type": "local",
      "command": ["npx", "-y", "@vibebrowser/mcp"],
      "enabled": true
    }
  }
}`,
    note: "Or: opencode mcp add vibe -- npx -y @vibebrowser/mcp",
  },
  {
    agent: "Claude Code",
    file: "CLI",
    config: `claude mcp add --transport stdio vibe -- npx -y @vibebrowser/mcp`,
    note: "Or add to project-level .mcp.json",
  },
  {
    agent: "Windsurf",
    file: "~/.codeium/windsurf/mcp_config.json",
    config: `{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`,
  },
  {
    agent: "Gemini CLI",
    file: "~/.gemini/settings.json",
    config: `{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`,
  },
]

// ----- Components -----

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

function AgentIcon({ icon }: { icon: string }) {
  // Simple text-based icons since we don't have logos
  const labels: Record<string, string> = {
    anthropic: "Claude",
    cursor: "Cursor",
    vscode: "VS Code",
    claudecode: "Claude Code",
    opencode: "OpenCode",
    windsurf: "Windsurf",
    gemini: "Gemini",
  }
  const colors: Record<string, string> = {
    anthropic: "bg-[#d4a574]",
    cursor: "bg-[#8ab4f8]",
    vscode: "bg-[#4fc1ff]",
    claudecode: "bg-[#d4a574]",
    opencode: "bg-[#81c995]",
    windsurf: "bg-[#a8c7fa]",
    gemini: "bg-[#f28b82]",
  }
  return (
    <div className={`w-10 h-10 rounded-lg ${colors[icon] || "bg-[#5f6368]"} flex items-center justify-center`}>
      <span className="text-[#202124] font-bold text-sm">{(labels[icon] || icon)[0]}</span>
    </div>
  )
}

// ----- Page -----

export default function McpPage() {
  const [activeAgent, setActiveAgent] = useState(0)
  const installCmd = "npx @vibebrowser/mcp"

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-9 h-9 object-contain" />
          <span className="text-lg font-medium text-[#e8eaed]">
            Vibe MCP<span className="text-[#9aa0a6]"> · Browser Automation</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#compare" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">vs BrowserMCP</a>
          <a href="#tools" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Tools</a>
          <a href="#setup" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Setup</a>
          <a href="#faq" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">FAQ</a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors hidden sm:block">
            Product Page →
          </Link>
          <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank">
            <Button size="sm" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium rounded-full">
              Install Extension
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#8ab4f8]/10 text-[#8ab4f8] border-[#8ab4f8]/20">
                <Cpu className="w-4 h-4 mr-2" />
                Model Context Protocol
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Control Your Browser from
                  <br className="hidden sm:block" />
                  <span className="text-[#8ab4f8]"> Any AI Agent</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  Connect Claude, Cursor, VS Code, and more to your real browser.
                  Multi-agent, 25+ tools, zero debug permissions.
                </p>
              </div>

              {/* Install command */}
              <div className="w-full max-w-lg">
                <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-[#9aa0a6]" />
                      <code className="text-[#81c995] text-sm sm:text-base font-mono">{installCmd}</code>
                    </div>
                    <CopyButton text={installCmd} />
                  </div>
                </div>
                <p className="text-xs text-[#5f6368] mt-2">Requires Node.js and the <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank" className="text-[#8ab4f8] hover:underline">Vibe Browser extension</Link></p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank">
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                    Install Extension
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://docs.vibebrowser.app/mcp" target="_blank">
                  <Button variant="outline" size="lg" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]">
                    Documentation
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#81c995]" />
                  25+ browser tools
                </span>
                <span className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Multi-agent relay
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  No debug permissions
                </span>
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Open source
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible Agents */}
        <section className="w-full py-12 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <p className="text-center text-sm text-[#5f6368] mb-6 uppercase tracking-wider">Works with any MCP-compatible agent</p>
            <div className="flex flex-wrap justify-center gap-6">
              {COMPATIBLE_AGENTS.map((agent) => (
                <div key={agent.name} className="flex flex-col items-center gap-2 group">
                  <AgentIcon icon={agent.icon} />
                  <span className="text-xs text-[#9aa0a6] group-hover:text-[#e8eaed] transition-colors">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Vibe MCP > Browser MCP */}
        <section id="compare" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Why teams switch from Browser MCP
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Vibe MCP is a drop-in replacement with more tools, better architecture, and features Browser MCP doesn't have.
              </p>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-4 px-4 text-[#9aa0a6] font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-[#8ab4f8] font-medium min-w-[140px]">Vibe MCP</th>
                    <th className="text-center py-4 px-4 text-[#9aa0a6] font-medium min-w-[140px]">Browser MCP</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i} className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-[#e8eaed]">{row.feature}</span>
                        {row.detail && <p className="text-xs text-[#5f6368] mt-0.5">{row.detail}</p>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof row.vibe === "boolean" ? (
                          row.vibe ? <CheckCircle className="w-5 h-5 text-[#81c995] mx-auto" /> : <XCircle className="w-5 h-5 text-[#f28b82] mx-auto" />
                        ) : (
                          <span className={row.vibeGood ? "text-[#81c995] font-medium" : "text-[#e8eaed] font-medium"}>{row.vibe}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof row.browser === "boolean" ? (
                          row.browser ? <CheckCircle className="w-5 h-5 text-[#81c995] mx-auto" /> : <XCircle className="w-5 h-5 text-[#f28b82] mx-auto" />
                        ) : (
                          <span className={row.browserBad ? "text-[#f28b82] font-medium" : "text-[#9aa0a6]"}>{row.browser}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Multi-agent relay architecture
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Multiple AI agents connect to your browser simultaneously through a shared relay daemon. No conflicts, no debug ports.
              </p>
            </div>

            <div className="bg-[#111111] rounded-lg border border-[#2a2a2a] overflow-hidden max-w-3xl mx-auto">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="w-3 h-3 rounded-full bg-[#f28b82]" />
                <div className="w-3 h-3 rounded-full bg-[#fdd663]" />
                <div className="w-3 h-3 rounded-full bg-[#81c995]" />
                <span className="text-xs text-[#5f6368] ml-2">architecture</span>
              </div>
              <pre className="p-6 text-sm font-mono text-[#9aa0a6] overflow-x-auto leading-relaxed">
{`  Claude Desktop       Cursor           VS Code
       │                  │                 │
       ▼                  ▼                 ▼
   [vibe-mcp]         [vibe-mcp]        [vibe-mcp]      ← stdio MCP bridges
       │                  │                 │
       └──────────────────┼─────────────────┘
                          │
                   WebSocket :19888
                          │
                          ▼
                   ┌─────────────┐
                   │ Relay Daemon │  ← auto-spawned by first vibe-mcp
                   └─────────────┘
                          │
                   WebSocket :19889
                          │
                          ▼
                   ┌──────────────┐
                   │Vibe Extension│  ← Chrome Extensions API
                   └──────────────┘
                          │
                    Content Scripts
                          │
                          ▼
                    ┌────────────┐
                    │ Chrome Tabs │
                    └────────────┘`}
              </pre>
            </div>

            {/* Architecture highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mx-auto mb-3">
                  <GitBranch className="w-6 h-6 text-[#8ab4f8]" />
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1">Multi-Agent</h4>
                <p className="text-xs text-[#9aa0a6]">Each agent gets its own stdio bridge — no conflicts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-[#81c995]/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-[#81c995]" />
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1">Local Only</h4>
                <p className="text-xs text-[#9aa0a6]">WebSocket binds to 127.0.0.1 — no remote access</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-[#fdd663]" />
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1">Auto-Spawned</h4>
                <p className="text-xs text-[#9aa0a6]">Relay daemon starts automatically on first connection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Showcase */}
        <section id="tools" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                25+ tools across 8 categories
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Navigation, interaction, Google Workspace, credential management, sub-agents, and more — all exposed via MCP.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {TOOL_CATEGORIES.map((cat) => (
                <Card key={cat.category} className="bg-[#0a0a0a] border-[#2a2a2a]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#8ab4f8]">
                        {cat.icon}
                      </div>
                      <h3 className="font-medium text-[#e8eaed]">{cat.category}</h3>
                      <Badge variant="secondary" className="ml-auto bg-[#1a1a1a] text-[#9aa0a6] border-[#2a2a2a] text-xs">
                        {cat.tools.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {cat.tools.map((tool) => (
                        <div key={tool.name} className="flex items-start gap-2 group">
                          <code className="text-xs text-[#8ab4f8] font-mono bg-[#8ab4f8]/5 px-1.5 py-0.5 rounded flex-shrink-0">{tool.name}</code>
                          <span className="text-xs text-[#5f6368] group-hover:text-[#9aa0a6] transition-colors">{tool.description}</span>
                        </div>
                      ))}
                    </div>
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
                Set up in under 2 minutes
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#8ab4f8] font-mono text-lg font-bold">1</span>
                </div>
                <h3 className="font-medium text-[#e8eaed] mb-2">Install Extension</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Install the Vibe AI Browser extension and enable MCP External Control in Settings.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#8ab4f8] font-mono text-lg font-bold">2</span>
                </div>
                <h3 className="font-medium text-[#e8eaed] mb-2">Add Config</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Add the MCP server JSON to your AI client config. One block, same for all agents.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#81c995]/10 border border-[#81c995]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#81c995] font-mono text-lg font-bold">3</span>
                </div>
                <h3 className="font-medium text-[#e8eaed] mb-2">Start Using</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Ask your AI agent to navigate, click, fill forms, search Gmail, or take screenshots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Instructions */}
        <section id="setup" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Configuration for every agent
              </h2>
              <p className="text-[#9aa0a6]">
                Click an agent to see the config. Copy, paste, done.
              </p>
            </div>

            {/* Agent tabs */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {SETUP_CONFIGS.map((cfg, i) => (
                <button
                  key={cfg.agent}
                  onClick={() => setActiveAgent(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeAgent === i
                      ? "bg-[#8ab4f8] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#9aa0a6] hover:text-[#e8eaed] border border-[#2a2a2a]"
                  }`}
                >
                  {cfg.agent}
                </button>
              ))}
            </div>

            {/* Config display */}
            <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-[#5f6368]" />
                  <span className="text-xs text-[#9aa0a6] font-mono">{SETUP_CONFIGS[activeAgent].file}</span>
                </div>
                <CopyButton text={SETUP_CONFIGS[activeAgent].config} />
              </div>
              <pre className="p-4 text-sm font-mono text-[#e8eaed] overflow-x-auto">
                <code>{SETUP_CONFIGS[activeAgent].config}</code>
              </pre>
              {SETUP_CONFIGS[activeAgent].note && (
                <div className="px-4 py-2 border-t border-[#2a2a2a] text-xs text-[#5f6368]">
                  {SETUP_CONFIGS[activeAgent].note}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How Page Content Works */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  Markdown-indexed pages, not raw DOM
                </h2>
                <p className="text-[#9aa0a6] mb-6">
                  Instead of dumping raw accessibility trees or DOM snapshots, Vibe extracts page content as clean markdown. Interactive elements get <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">[index:score]</code> labels that agents use to click, fill, and interact.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                    <Search className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Lower token usage</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Markdown is 3-5x smaller than raw DOM or accessibility trees
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                    <MousePointerClick className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Scored interactions</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Elements scored by relevance — agents focus on what matters
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                    <Zap className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Automatic delivery</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Page content sent before each agent turn — no tool call needed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example markdown output */}
              <div className="bg-[#111111] rounded-lg border border-[#2a2a2a] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                  <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                  <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                  <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                  <span className="text-xs text-[#5f6368] ml-2">page content (auto)</span>
                </div>
                <pre className="p-4 text-sm font-mono text-[#9aa0a6] overflow-x-auto leading-relaxed">
{`# GitHub - VibeTechnologies/vibe-mcp

MCP server for browser automation.

## Quick Start

[1:0.9] Install extension
[2:0.8] View documentation
[3:0.7] Star repository

## Features
- Multi-agent support
- 25+ browser tools
- Google Workspace integration

[4:0.6] Sign in
[5:0.5] Fork repository
[6:0.3] Watch`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-8 text-center">
              Frequently asked questions
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How is Vibe MCP different from Browser MCP?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Vibe MCP supports multiple AI agents controlling the same browser simultaneously via a relay daemon, offers 25+ tools (vs ~12), includes native Google Workspace integration (7 tools for Gmail and Calendar), provides a secure credential vault that never exposes passwords to the LLM, and uses markdown-indexed page content instead of raw accessibility trees for lower token usage. It also does not require Chrome debug permissions — it uses the Chrome Extensions API directly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can multiple AI agents control the browser at the same time?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Vibe MCP uses a relay daemon architecture where multiple AI clients (Claude, Cursor, VS Code, etc.) each connect via their own stdio MCP bridge to a shared relay on port 19888. The relay forwards requests to the Vibe extension on port 19889. Each agent operates independently without conflicts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Does Vibe MCP require Chrome debug permissions?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  No. Unlike Browser MCP which is adapted from Playwright and requires <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote-debugging-port</code>, Vibe MCP uses content scripts and the Chrome Extensions API to interact with pages. It works with your normal browser profile without any special launch flags or security downgrades.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What AI agents work with Vibe MCP?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Any MCP-compatible AI client. We provide setup configs for Claude Desktop, Cursor, VS Code (GitHub Copilot), OpenCode, Claude Code, Windsurf, and Gemini CLI. Setup is one JSON block per agent.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How does the credential vault work?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  The <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">secrets_manager</code> tool lets agents list and read credentials by domain. The <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">typein_secret</code> tool fills form fields directly from the vault — the actual password value is never exposed to the LLM. This means your AI agent can log in to sites on your behalf without seeing your passwords.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Is Vibe MCP open source?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. The Vibe Browser extension is open source on GitHub. The MCP server package (<code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">@vibebrowser/mcp</code>) is published on npm. Browser MCP's monorepo can't be built standalone due to internal dependencies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What is the markdown-indexed page content?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Instead of sending raw DOM or accessibility tree snapshots, Vibe extracts page content as clean markdown with interactive elements labeled as <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">[index:score]</code>. Agents use these indices to click, fill, and interact with elements. This format is 3-5x smaller than alternatives, reducing token usage and context pollution. Page content is delivered automatically before each agent turn — no tool call required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can Vibe MCP also work as a standalone browser?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Unlike Browser MCP which is MCP-only, Vibe also functions as a standalone AI co-pilot directly in your browser. Click the extension icon to chat, automate tasks, and get AI assistance — no external agent required. MCP mode is an additional capability on top of the full in-browser experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Ready to connect your AI agent to your browser?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Install the extension, add one config block, and start automating. Free and open source.
            </p>

            {/* Install command */}
            <div className="w-full max-w-md mx-auto mb-8">
              <div className="bg-[#111111] rounded-lg border border-[#2a2a2a] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-[#5f6368]" />
                    <code className="text-[#81c995] text-sm font-mono">{installCmd}</code>
                  </div>
                  <CopyButton text={installCmd} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank">
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  Install Extension
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <WaitlistDialog>
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#111111] text-[#e8eaed]">
                  Join Waitlist
                </Button>
              </WaitlistDialog>
            </div>
            <p className="text-xs text-[#5f6368] mt-8">
              Questions? <a href="mailto:info@vibebrowser.app" className="text-[#8ab4f8] hover:underline">info@vibebrowser.app</a> · <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="text-[#8ab4f8] hover:underline">GitHub</Link> · <Link href="https://www.npmjs.com/package/@vibebrowser/mcp" target="_blank" className="text-[#8ab4f8] hover:underline">npm</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#1e1e1e] bg-[#0a0a0a]">
        <div className="container max-w-5xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#5f6368]">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-6 h-6 object-contain" />
              <span>Vibe Technologies</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/" className="hover:text-[#9aa0a6] transition-colors">Product</Link>
              <Link href="/teams" className="hover:text-[#9aa0a6] transition-colors">Teams</Link>
              <Link href="/v2" className="hover:text-[#9aa0a6] transition-colors">Enterprise</Link>
              <Link href="https://docs.vibebrowser.app" target="_blank" className="hover:text-[#9aa0a6] transition-colors">Docs</Link>
              <Link href="/privacy" className="hover:text-[#9aa0a6] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#9aa0a6] transition-colors">Terms</Link>
              <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="hover:text-[#9aa0a6] transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
