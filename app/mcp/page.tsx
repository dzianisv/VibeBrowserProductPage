"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  MinusCircle,
  Copy,
  Check,
  Terminal,
  Globe,
  MousePointerClick,
  Layers,
  Eye,
  Mail,
  Lock,
  Zap,
  GitBranch,
  Monitor,
  Code2,
  Keyboard,
  ScrollText,
  Search,
  Shield,
  ChevronDown,
  Cpu,
  Chrome,
} from "lucide-react"

// Rotating agent names for the hero typewriter animation
const ROTATING_AGENTS = [
  "Any AI Agent",
  "OpenCode",
  "Claude Code",
  "Gemini CLI",
  "Claude Desktop",
  "Codex",
  "Cursor",
  "GitHub Copilot",
  "Windsurf",
  "OpenClaw",
]

// Typewriter hook with delete and retype animation
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState(words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        } else {
          setDisplayText(displayText.slice(0, -1))
        }
      } else {
        const nextWord = words[wordIndex]
        if (displayText === nextWord) {
          setIsPaused(true)
        } else {
          setDisplayText(nextWord.slice(0, displayText.length + 1))
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}

// ----- Data -----

const COMPATIBLE_AGENTS = [
  { name: "Claude Code", icon: "claudecode" },
  { name: "OpenCode", icon: "opencode" },
  { name: "Cursor", icon: "cursor" },
  { name: "Claude Desktop", icon: "anthropic" },
  { name: "VS Code", icon: "vscode" },
  { name: "Windsurf", icon: "windsurf" },
  { name: "Gemini CLI", icon: "gemini" },
  { name: "Codex", icon: "codex" },
  { name: "OpenClaw", icon: "openclaw" },
]

type CellValue = true | false | "partial" | string

interface ComparisonRow {
  feature: string
  vibe: CellValue
  playwright: CellValue
  devtools: CellValue
  browsermcp: CellValue
  detail: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Uses your logged-in browser", vibe: true, playwright: "partial", devtools: false, browsermcp: true, detail: "Playwright supports this via its extension mode, but defaults to launching a separate browser instance" },
  { feature: "No debug port required", vibe: true, playwright: "partial", devtools: false, browsermcp: true, detail: "Playwright's default mode requires --remote-debugging-port; extension mode avoids this but adds token auth setup" },
  { feature: "Multi-agent support", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Multiple AI agents control the same browser simultaneously via relay daemon" },
  { feature: "Internet-exposed relay", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Expose your relay to the internet so remote agents can connect to your local browser from anywhere" },
  { feature: "Google Workspace integration", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Gmail search/send/draft, Calendar view/create — 7 native tools" },
  { feature: "Credential vault", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Secure password manager that never exposes secrets to the LLM" },
  { feature: "Sub-agent orchestration", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Spawn sub-agents with isolated context and parallel tool execution" },
  { feature: "Standalone AI browser", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Also works as a standalone AI co-pilot directly in your browser" },
  { feature: "Open source", vibe: "partial", playwright: true, devtools: true, browsermcp: "partial", detail: "Vibe's MCP server (@vibebrowser/mcp) is open source; the browser extension is not. BrowserMCP is similar" },
  { feature: "Telemetry to vendor", vibe: false, playwright: false, devtools: true, browsermcp: false, detail: "Chrome DevTools MCP sends usage statistics and CrUX API calls to Google by default" },
]

const COMPETITOR_COLS = [
  { key: "vibe" as const, label: "Vibe MCP", color: "text-[#8ab4f8]" },
  { key: "playwright" as const, label: "Playwright MCP", color: "text-[#9aa0a6]" },
  { key: "devtools" as const, label: "DevTools MCP", color: "text-[#9aa0a6]" },
  { key: "browsermcp" as const, label: "Browser MCP", color: "text-[#9aa0a6]" },
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
    agent: "Claude Code",
    file: "CLI",
    config: `claude mcp add --transport stdio vibe -- npx -y @vibebrowser/mcp`,
    note: "Or add to project-level .mcp.json",
  },
  {
    agent: "OpenCode",
    file: "opencode.json",
    config: `{
  "mcp": {
    "vibe": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "@vibebrowser/mcp"
      ],
      "enabled": true
    }
  }
}`,
    note: "Or: opencode mcp add vibe -- npx -y @vibebrowser/mcp",
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
    note: "Or: gemini mcp add vibe -- npx -y @vibebrowser/mcp",
  },
  {
    agent: "Codex",
    file: "CLI",
    config: `codex mcp add vibe -- npx -y @vibebrowser/mcp`,
    note: "Or add to ~/.codex/config.toml: [mcp_servers.vibe] command = \"npx\" args = [\"-y\", \"@vibebrowser/mcp\"]",
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
    codex: "Codex",
    openclaw: "OpenClaw",
  }
  const colors: Record<string, string> = {
    anthropic: "bg-[#d4a574]",
    cursor: "bg-[#8ab4f8]",
    vscode: "bg-[#4fc1ff]",
    claudecode: "bg-[#d4a574]",
    opencode: "bg-[#81c995]",
    windsurf: "bg-[#a8c7fa]",
    gemini: "bg-[#f28b82]",
    codex: "bg-[#a8dab5]",
    openclaw: "bg-[#f0b27a]",
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
  const [heroAgent, setHeroAgent] = useState(0) // index into SETUP_CONFIGS for hero split button
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false)
  const agentDropdownRef = useRef<HTMLDivElement>(null)
  const rotatingAgent = useTypewriter(ROTATING_AGENTS, 100, 60, 2500)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target as Node)) {
        setAgentDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          <a href="#compare" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Compare</a>
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
                  <span className="text-[#8ab4f8]"> {rotatingAgent}</span>
                  <span className="animate-pulse text-[#8ab4f8]">|</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  Connect Claude, Cursor, VS Code, and more to your real browser — with all your sessions, cookies, and extensions intact.
                   Multi-agent ready, internet-exposed relay, 25+ tools, open source MCP server. Connect any agent on the internet — including <a href="https://openclaw.com" target="_blank" rel="noopener noreferrer" className="text-[#8ab4f8] hover:underline">OpenClaw</a> — to your local browser.
                </p>
              </div>

              {/* Hero buttons: Install in Chrome + Install in [Agent] */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                    <Chrome className="mr-2 h-5 w-5" />
                    Install in Chrome
                  </Button>
                </Link>

                {/* Split button: Install in [Agent] + chevron dropdown */}
                <div className="relative" ref={agentDropdownRef}>
                  <div className="flex">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-6 py-6 h-auto rounded-full rounded-r-none border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8] border-r-0"
                      onClick={() => {
                        const cfg = SETUP_CONFIGS[heroAgent]
                        navigator.clipboard.writeText(cfg.config)
                      }}
                    >
                      <Terminal className="mr-2 h-4 w-4" />
                      Install in {SETUP_CONFIGS[heroAgent].agent}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-3 py-6 h-auto rounded-full rounded-l-none border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8] border-l-[#3a3a3a]"
                      onClick={() => setAgentDropdownOpen(!agentDropdownOpen)}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${agentDropdownOpen ? "rotate-180" : ""}`} />
                    </Button>
                  </div>
                  {agentDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] rounded-lg shadow-xl border border-[#2a2a2a] overflow-hidden z-50 min-w-[240px]">
                      {SETUP_CONFIGS.map((cfg, i) => (
                        <button
                          key={cfg.agent}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-[#2a2a2a] flex items-center gap-3 transition-colors ${
                            i < SETUP_CONFIGS.length - 1 ? "border-b border-[#2a2a2a]" : ""
                          } ${heroAgent === i ? "bg-[#8ab4f8]/10" : ""}`}
                          onClick={() => {
                            setHeroAgent(i)
                            setActiveAgent(i) // also sync the setup section below
                            setAgentDropdownOpen(false)
                          }}
                        >
                          <Terminal className="h-4 w-4 text-[#8ab4f8] flex-shrink-0" />
                          <div>
                            <div className="font-medium text-[#e8eaed]">{cfg.agent}</div>
                            <div className="text-xs text-[#5f6368]">{cfg.file}</div>
                          </div>
                          {heroAgent === i && <Check className="h-4 w-4 text-[#81c995] ml-auto" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected agent config preview */}
              <div className="w-full max-w-lg">
                <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-2">
                      <ScrollText className="w-3.5 h-3.5 text-[#5f6368]" />
                      <span className="text-xs text-[#9aa0a6] font-mono">{SETUP_CONFIGS[heroAgent].file}</span>
                    </div>
                    <CopyButton text={SETUP_CONFIGS[heroAgent].config} />
                  </div>
                  <pre className="px-4 py-3 text-sm font-mono text-[#e8eaed] text-left overflow-x-auto max-h-40 overflow-y-auto">
                    <code>{SETUP_CONFIGS[heroAgent].config}</code>
                  </pre>
                  {SETUP_CONFIGS[heroAgent].note && (
                    <div className="px-4 py-2 border-t border-[#2a2a2a] text-xs text-[#5f6368]">
                      {SETUP_CONFIGS[heroAgent].note}
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#5f6368] mt-2">Requires Node.js and the <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank" className="text-[#8ab4f8] hover:underline">Vibe Browser extension</Link></p>
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
                  <Globe className="w-4 h-4" />
                  Internet-exposed relay
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  No debug permissions
                </span>
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                   Open source MCP
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

        {/* Why Vibe MCP */}
        <section id="compare" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                How Vibe MCP compares
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Vibe MCP is the only browser MCP that uses your real browser with all your logged-in sessions — no debug ports, no separate browser instance.
              </p>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-4 px-3 text-[#9aa0a6] font-medium">Feature</th>
                    {COMPETITOR_COLS.map((col) => (
                      <th key={col.key} className={`text-center py-4 px-3 ${col.color} font-medium min-w-[110px]`}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i} className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-3 px-3">
                        <span className="text-[#e8eaed]">{row.feature}</span>
                        {row.detail && <p className="text-xs text-[#5f6368] mt-0.5">{row.detail}</p>}
                      </td>
                      {COMPETITOR_COLS.map((col) => {
                        const val = row[col.key]
                        return (
                          <td key={col.key} className="py-3 px-3 text-center">
                            {val === true ? (
                              <CheckCircle className="w-5 h-5 text-[#81c995] mx-auto" />
                            ) : val === false ? (
                              <XCircle className="w-5 h-5 text-[#f28b82] mx-auto" />
                            ) : val === "partial" ? (
                              <MinusCircle className="w-5 h-5 text-[#fdd663] mx-auto" />
                            ) : (
                              <span className="text-[#9aa0a6]">{val}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Competitor context */}
            <div className="grid md:grid-cols-3 gap-4 mt-10 text-xs text-[#5f6368]">
              <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <h4 className="text-[#9aa0a6] font-medium mb-1">Playwright MCP <span className="text-[#5f6368]">(Microsoft)</span></h4>
                <p>Launches a separate Playwright-managed browser. Requires CDP for existing browser connection. 27k GitHub stars.</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <h4 className="text-[#9aa0a6] font-medium mb-1">Chrome DevTools MCP <span className="text-[#5f6368]">(Google)</span></h4>
                <p>Developer debugging tool using Puppeteer + CDP. Launches separate Chrome instance. Sends telemetry to Google by default. 25k GitHub stars.</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <h4 className="text-[#9aa0a6] font-medium mb-1">Browser MCP <span className="text-[#5f6368]">(Namu)</span></h4>
                <p>Chrome extension-based like Vibe. Single agent only. Extension is closed-source. 5.8k GitHub stars.</p>
              </div>
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
                Multiple AI agents connect to your browser simultaneously through a shared relay daemon — locally or over the internet. Remote agents like OpenClaw can connect to your browser from anywhere.
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
{`  Claude Desktop       Cursor           VS Code          OpenClaw (remote)
       │                  │                 │                  │
       ▼                  ▼                 ▼                  │
   [vibe-mcp]         [vibe-mcp]        [vibe-mcp]             │  ← local stdio
       │                  │                 │                  │     MCP bridges
       └──────────────────┼─────────────────┘                  │
                          │                                    │
                   WebSocket :19888                   Internet (HTTPS/WSS)
                          │                                    │
                          ▼                                    ▼
                   ┌──────────────────────────────────────────────┐
                   │              Relay Daemon                     │
                   │   ← auto-spawned, local + internet-exposed → │
                   └──────────────────────────────────────────────┘
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
                  <Globe className="w-6 h-6 text-[#81c995]" />
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1">Internet-Exposed</h4>
                <p className="text-xs text-[#9aa0a6]">Expose your relay to the internet — let remote agents like OpenClaw connect to your browser</p>
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

            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#8ab4f8] font-mono text-lg font-bold">1</span>
                </div>
                <h3 className="font-medium text-[#e8eaed] mb-2">Install Extension</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Install the <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank" className="text-[#8ab4f8] hover:underline">Vibe AI Browser extension</Link> and enable MCP External Control in Settings.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#81c995]/10 border border-[#81c995]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#81c995] font-mono text-lg font-bold">2</span>
                </div>
                <h3 className="font-medium text-[#e8eaed] mb-2">Configure Your Agent</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Add the MCP server config to your AI agent. <a href="#setup" className="text-[#8ab4f8] hover:underline">Pick your agent below</a> — copy, paste, done.
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
              <pre className="p-4 text-sm font-mono text-[#e8eaed] text-left overflow-x-auto">
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
                  How is Vibe MCP different from Playwright MCP, Chrome DevTools MCP, and BrowserMCP?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  <strong className="text-[#e8eaed]">vs Playwright MCP &amp; Chrome DevTools MCP:</strong> By default both launch a separate browser instance — you lose all logged-in sessions, cookies, and extensions. Playwright MCP now offers a Chrome extension mode that can connect to your existing browser, but it still lacks multi-agent control, Google Workspace tools, credential vault, and sub-agent orchestration. Chrome DevTools MCP requires <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote-debugging-port</code> for existing browser connections and sends telemetry to Google by default.
                  <br /><br />
                  <strong className="text-[#e8eaed]">vs BrowserMCP:</strong> Like Vibe, BrowserMCP is a Chrome extension that uses your real browser. However, it only supports a single agent at a time (new connections kill the previous one), has ~13 tools vs Vibe's 25+, lacks Google Workspace integration, credential vault, and sub-agent orchestration. Its extension is also closed-source.
                  <br /><br />
                  <strong className="text-[#e8eaed]">Unique to Vibe:</strong> Multi-agent relay daemon, 25+ tools, native Gmail/Calendar integration, secure credential vault (<code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">typein_secret</code>), sub-agent orchestration, and markdown-indexed page content for 3-5x lower token usage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can remote agents on the internet connect to my browser?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Vibe MCP now supports exposing your relay daemon to the internet, so any remote AI agent — such as <a href="https://openclaw.com" target="_blank" rel="noopener noreferrer" className="text-[#8ab4f8] hover:underline">OpenClaw</a> — can connect to your local browser extension from anywhere. This means you can use cloud-hosted agents and AI platforms to automate tasks in your real browser with all your sessions intact, without needing to be on the same machine.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can multiple AI agents control the browser at the same time?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Vibe MCP uses a relay daemon architecture where multiple AI clients (Claude, Cursor, VS Code, etc.) each connect via their own stdio MCP bridge to a shared relay on port 19888. The relay forwards requests to the Vibe extension on port 19889. Each agent operates independently without conflicts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Does Vibe MCP require Chrome debug permissions?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  No. Vibe MCP uses content scripts and the Chrome Extensions API to interact with pages — no <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote-debugging-port</code> or CDP required. Playwright MCP's extension mode also avoids debug ports, but its default mode still launches a separate browser via Playwright's protocol. Chrome DevTools MCP requires debug ports. Vibe works with your normal browser profile without any special launch flags or security downgrades.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What AI agents work with Vibe MCP?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Any MCP-compatible AI client — local or remote. We provide setup configs for Claude Desktop, Cursor, VS Code (GitHub Copilot), OpenCode, Claude Code, Windsurf, and Gemini CLI. Remote agents like <a href="https://openclaw.com" target="_blank" rel="noopener noreferrer" className="text-[#8ab4f8] hover:underline">OpenClaw</a> can also connect to your browser over the internet. Setup is one JSON block per agent.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How does the credential vault work?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  The <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">secrets_manager</code> tool lets agents list and read credentials by domain. The <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">typein_secret</code> tool fills form fields directly from the vault — the actual password value is never exposed to the LLM. This means your AI agent can log in to sites on your behalf without seeing your passwords.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Is Vibe MCP open source?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Partially. The MCP server package (<code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">@vibebrowser/mcp</code>) is open source on GitHub and published on npm. The Vibe Browser extension itself is not open source. Playwright MCP (Microsoft) and Chrome DevTools MCP (Google) are fully open source under Apache-2.0. BrowserMCP is in a similar position to Vibe — their MCP server is open source, but the Chrome extension is closed-source and the monorepo cannot be built standalone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What is the markdown-indexed page content?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Instead of sending raw DOM or accessibility tree snapshots, Vibe extracts page content as clean markdown with interactive elements labeled as <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">[index:score]</code>. Agents use these indices to click, fill, and interact with elements. This format is 3-5x smaller than alternatives, reducing token usage and context pollution. Page content is delivered automatically before each agent turn — no tool call required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can Vibe MCP also work as a standalone browser?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Unlike Browser MCP which is MCP-only, Vibe also functions as a standalone AI co-pilot directly in your browser. Click the extension icon to chat, automate tasks, and get AI assistance — no external agent required. MCP mode is an additional capability on top of the full in-browser experience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Why does it matter that Vibe uses my real browser?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Playwright MCP and Chrome DevTools MCP launch a fresh, separate browser instance by default. That means you start with no logged-in sessions, no cookies, no extensions, and no saved passwords. Playwright MCP now offers a Chrome extension mode that can connect to your existing browser, but setup requires a token-based auth flow and it still lacks multi-agent support. Vibe MCP connects directly to the browser you're already using with zero configuration — your agent can interact with Gmail, Slack, GitHub, Jira, or any site you're logged into without re-authenticating. This is critical for real-world automation workflows.
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
              Install the extension, add one config block, and start automating. Free, with an open source MCP server.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  <Chrome className="mr-2 h-5 w-5" />
                  Install in Chrome
                </Button>
              </Link>
              <a href="#setup">
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#111111] text-[#8ab4f8]">
                  Configure Your Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            <p className="text-xs text-[#5f6368] mt-8">
              Questions? <a href="mailto:info@vibebrowser.app" className="text-[#8ab4f8] hover:underline">info@vibebrowser.app</a> · <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="text-[#8ab4f8] hover:underline">GitHub</Link> · <Link href="https://www.npmjs.com/package/@vibebrowser/mcp" target="_blank" className="text-[#8ab4f8] hover:underline">npm</Link>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
              <Link href="/use-cases/financial-advisor-morningstar-schwab" className="text-[#8ab4f8] hover:underline">
                Morningstar Schwab research automation
              </Link>
              <Link href="/use-cases/privacy-first-legal-research" className="text-[#8ab4f8] hover:underline">
                Private legal research automation
              </Link>
              <Link href="/use-cases/recruiter-linkedin-automation" className="text-[#8ab4f8] hover:underline">
                LinkedIn recruiter automation
              </Link>
              <Link href="/use-cases" className="text-[#8ab4f8] hover:underline">
                All use cases
              </Link>
            </div>
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
              <Link href="/agentic-team" className="hover:text-[#9aa0a6] transition-colors">Agentic Team</Link>
              <Link href="/teams" className="hover:text-[#9aa0a6] transition-colors">Teams</Link>
              <Link href="/enterprise" className="hover:text-[#9aa0a6] transition-colors">Enterprise</Link>
              <Link href="https://docs.vibebrowser.app" target="_blank" className="hover:text-[#9aa0a6] transition-colors">Docs</Link>
              <Link href="/privacy" className="hover:text-[#9aa0a6] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#9aa0a6] transition-colors">Terms</Link>
              <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="hover:text-[#9aa0a6] transition-colors">GitHub</Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer" className="hover:text-[#9aa0a6] transition-colors">Telegram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
