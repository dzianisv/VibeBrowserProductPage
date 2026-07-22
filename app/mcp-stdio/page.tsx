"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/components/google-analytics"
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
  Copy,
  Check,
  AlertCircle,
  Terminal,
  Globe,
  Layers,
  Zap,
  GitBranch,
  Code2,
  ScrollText,
  Shield,
  ChevronDown,
  Chrome,
} from "lucide-react"

// Rotating agent names for the hero typewriter animation — unchanged from
// the pre-split /mcp page; this is the full local-verified agent list.
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
]

const MCP_PACKAGE_SPEC = "@vibebrowser/mcp@latest"
// Scoped package identity only — the unscoped "vibe-mcp" name on npm is an
// unrelated third-party package and must never be published here as an
// installable command or alias.
const MCP_SERVER_BINARY = "vibebrowser-mcp"
const LOCAL_MCP_COMMAND = `npx -y -p ${MCP_PACKAGE_SPEC} ${MCP_SERVER_BINARY}`

// Optional remote-browser addendum — still a local process (the same
// vibebrowser-mcp bridge above), just dialing out to a browser on another
// machine over the relay instead of talking to localhost. This is distinct
// from /mcp's Direct Streamable HTTP endpoint, which has no local process
// at all. Never presented as the default on this page.
const REMOTE_MCP_COMMAND = `${LOCAL_MCP_COMMAND} --remote YOUR_UUID`
const REMOTE_MCP_DISPLAY_COMMAND = `${LOCAL_MCP_COMMAND} --remote <uuid>`

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
    config: `claude mcp add --transport stdio --scope user vibe -- ${LOCAL_MCP_COMMAND}`,
    note: "Or add to project-level .mcp.json",
  },
  {
    agent: "OpenCode",
    file: "~/.config/opencode/opencode.json",
    config: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "vibe": {
      "type": "local",
      "command": ["npx", "-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"],
      "enabled": true
    }
  }
}`,
    note: "Project-level config: ./opencode.json",
  },
  {
    agent: "Cursor",
    file: "~/.cursor/mcp.json",
    config: `{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
    }
  }
}`,
    note: "Or: Settings > MCP > Add Server (project-level: .cursor/mcp.json)",
  },
  {
    agent: "Claude Desktop",
    file: "~/Library/Application Support/Claude/claude_desktop_config.json",
    config: `{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
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
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
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
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
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
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
    }
  }
}`,
    note: "Project-level config: .gemini/settings.json",
  },
  {
    agent: "Codex",
    file: "CLI",
    config: `codex mcp add vibe -- ${LOCAL_MCP_COMMAND}`,
    note: "Or add to ~/.codex/config.toml (or .codex/config.toml): [mcp_servers.vibe] command = \"npx\" args = [\"-y\", \"-p\", \"@vibebrowser/mcp@latest\", \"vibebrowser-mcp\"]",
  },
]

// ----- Components -----

function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setStatus("copied")
      window.setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
      window.setTimeout(() => setStatus("idle"), 2500)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 p-1.5 rounded hover:bg-[#3c4043] text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
      aria-label="Copy to clipboard"
    >
      {status === "copied" ? (
        <Check className="w-4 h-4 text-[#81c995]" />
      ) : status === "error" ? (
        <AlertCircle className="w-4 h-4 text-[#f28b82]" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : ""}
      </span>
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
  }
  return (
    <div className={`w-10 h-10 rounded-lg ${colors[icon] || "bg-[#9aa0a6]"} flex items-center justify-center`}>
      <span className="text-[#202124] font-bold text-sm">{(labels[icon] || icon)[0]}</span>
    </div>
  )
}

// ----- Page -----

export default function McpStdioPage() {
  const [activeAgent, setActiveAgent] = useState(0)
  const [heroAgent, setHeroAgent] = useState(0)
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
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#81c995]/10 text-[#81c995] border-[#81c995]/20">
                <Terminal className="w-4 h-4 mr-2" />
                MCP over stdio · Local process
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Run <span className="text-[#81c995]">{rotatingAgent}</span>
                  <span className="animate-pulse text-[#81c995]">|</span>
                  &apos;s browser control locally
                  <br className="hidden sm:block" />
                  — no internet relay
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  vibebrowser-mcp runs as a process next to your agent and talks to the extension over localhost only — the MCP bridge and browser-control path stay on this machine, with no Vibe internet relay involved.
                </p>
              </div>

              {/* Hero buttons: Install in Chrome + Install in [Agent] */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button
                    size="lg"
                    className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full"
                    onClick={() => trackCTAClick('install_extension_docs', 'mcp_stdio_hero')}
                  >
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
                      className="px-6 py-6 h-auto rounded-full rounded-r-none border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#81c995] border-r-0"
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
                      className="px-3 py-6 h-auto rounded-full rounded-l-none border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#81c995] border-l-[#3a3a3a]"
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
                          } ${heroAgent === i ? "bg-[#81c995]/10" : ""}`}
                          onClick={() => {
                            setHeroAgent(i)
                            setActiveAgent(i) // also sync the setup section below
                            setAgentDropdownOpen(false)
                          }}
                        >
                          <Terminal className="h-4 w-4 text-[#81c995] flex-shrink-0" />
                          <div>
                            <div className="font-medium text-[#e8eaed]">{cfg.agent}</div>
                            <div className="text-xs text-[#9aa0a6]">{cfg.file}</div>
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
                      <ScrollText className="w-3.5 h-3.5 text-[#9aa0a6]" />
                      <span className="text-xs text-[#9aa0a6] font-mono">{SETUP_CONFIGS[heroAgent].file}</span>
                    </div>
                    <CopyButton text={SETUP_CONFIGS[heroAgent].config} />
                  </div>
                  <pre className="px-4 py-3 text-sm font-mono text-[#e8eaed] text-left overflow-x-auto max-h-40 overflow-y-auto">
                    <code>{SETUP_CONFIGS[heroAgent].config}</code>
                  </pre>
                  {SETUP_CONFIGS[heroAgent].note && (
                    <div className="px-4 py-2 border-t border-[#2a2a2a] text-xs text-[#9aa0a6]">
                      {SETUP_CONFIGS[heroAgent].note}
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#9aa0a6] mt-2">Requires Node.js and the <Link href="https://docs.vibebrowser.app/getting-started/extension" target="_blank" className="text-[#8ab4f8] hover:underline">Vibe Browser extension</Link></p>
                <p className="text-xs text-[#9aa0a6] mt-1">
                  Published MCP binary: <code className="text-[#9aa0a6]">{MCP_SERVER_BINARY}</code>. For OpenClaw-style CLI flows, see <Link href="/openclaw" className="text-[#8ab4f8] hover:underline">the separate OpenClaw page</Link>.
                </p>
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
                  Runs on localhost only
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  No debug permissions
                </span>
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Open source MCP package
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#ffd700]" />
                  Free — no Browserbase account needed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible Agents */}
        <section className="w-full py-12 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <p className="text-center text-sm text-[#9aa0a6] mb-6 uppercase tracking-wider">Works with any MCP-compatible agent</p>
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

        {/* Why local explainer */}
        <section className="w-full py-16 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Why run MCP locally
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <CheckCircle className="w-5 h-5 text-[#81c995] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#9aa0a6]">Runs on your machine, not a hosted relay</p>
              </div>
              <div className="flex items-start gap-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <CheckCircle className="w-5 h-5 text-[#81c995] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#9aa0a6]">No bearer credential ever sent over the internet</p>
              </div>
              <div className="flex items-start gap-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <CheckCircle className="w-5 h-5 text-[#81c995] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#9aa0a6]">The safest default when your agent and browser are on the same computer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Local architecture diagram (default) */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                How the local bridge works
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                vibebrowser-mcp runs as a child process next to your agent and talks to your browser through a local relay daemon. Multiple agents can share it at once.
              </p>
            </div>

            {/* Local mode diagram */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-[#e8eaed] mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#81c995]" />
                Local mode <span className="text-sm text-[#9aa0a6] font-normal">— the default, agents on your machine</span>
              </h3>
              <div className="bg-[#111111] rounded-lg border border-[#2a2a2a] overflow-hidden max-w-3xl mx-auto">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                  <div className="w-3 h-3 rounded-full bg-[#f28b82]" />
                  <div className="w-3 h-3 rounded-full bg-[#fdd663]" />
                  <div className="w-3 h-3 rounded-full bg-[#81c995]" />
                  <span className="text-xs text-[#9aa0a6] ml-2">{LOCAL_MCP_COMMAND}</span>
                </div>
                <pre aria-hidden="true" className="p-6 text-sm font-mono text-[#9aa0a6] overflow-x-auto leading-relaxed">
{`  Claude Code          Cursor           OpenCode
       │                  │                 │
       ▼                  ▼                 ▼
   [vibebrowser-mcp]  [vibebrowser-mcp] [vibebrowser-mcp] ← stdio MCP bridges
       │                  │                 │
       └──────────────────┼─────────────────┘
                          │
                   ws://localhost:19888
                          │
                          ▼
                 ┌──────────────────┐
                 │   Local Relay    │  ← auto-spawned daemon
                 │  (localhost only) │
                 └──────────────────┘
                          │
                   ws://localhost:19889
                          │
                          ▼
                 ┌──────────────────┐
                 │  Vibe Extension  │  ← your real Chrome browser
                 └──────────────────┘`}
                </pre>
              </div>
            </div>

            {/* Optional: point this bridge at a remote browser — collapsed
                by default, visibly subordinate to the local diagram above.
                Moved verbatim from the pre-split /mcp page; still a local
                process (--remote flag), never /mcp's Direct HTTP endpoint. */}
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="remote-bridge" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                  <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                    Optional: point this bridge at a remote browser
                  </AccordionTrigger>
                  <AccordionContent className="text-[#9aa0a6]">
                    <p className="text-sm text-[#9aa0a6] mb-3">
                      Same local process, same <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1.5 py-0.5 rounded">--remote</code> flag — instead of talking to a browser on this machine, it dials out to a browser on another machine through our relay. Most people don&apos;t need this; use it when your agent and browser aren&apos;t on the same computer and you&apos;d rather keep a local process than call the{" "}
                      <Link href="/mcp" className="text-[#8ab4f8] hover:underline">hosted endpoint</Link> directly.
                    </p>
                    <p className="text-sm text-[#fdd663] mb-6">
                      This path does use the Vibe internet relay (<code className="text-[#fdd663] bg-[#fdd663]/5 px-1.5 py-0.5 rounded">wss://relay.api.vibebrowser.app</code>) to reach the remote browser — it is <strong>not</strong> the privacy-local option. Stick with the default local mode above if avoiding the relay matters to you.
                    </p>

                    <div className="bg-[#0a0a0a] rounded-lg border border-[#8ab4f8]/30 overflow-hidden max-w-3xl mx-auto mb-6">
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                        <div className="w-3 h-3 rounded-full bg-[#f28b82]" />
                        <div className="w-3 h-3 rounded-full bg-[#fdd663]" />
                        <div className="w-3 h-3 rounded-full bg-[#81c995]" />
                        <span className="text-xs text-[#9aa0a6] ml-2">{REMOTE_MCP_DISPLAY_COMMAND}</span>
                      </div>
                      <pre aria-hidden="true" className="p-6 text-sm font-mono text-[#9aa0a6] overflow-x-auto leading-relaxed">
{`  Cloud runner         Claude Code (laptop)     Cursor (office)
       │                      │                       │
       ▼                      ▼                       ▼
   [vibebrowser-mcp      [vibebrowser-mcp      [vibebrowser-mcp
    --remote <uuid>]         --remote <uuid>]         --remote <uuid>]
       │                      │                       │
       └──────────────────────┼───────────────────────┘
                              │
                    wss://relay.api.vibebrowser.app/<uuid>
                              │
                              ▼
                 ┌────────────────────────────┐
                 │    Public Relay Server      │  ← hosted by Vibe
                 │  relay.api.vibebrowser.app  │     UUID-authenticated
                 └────────────────────────────┘
                              │
                    wss://relay.api.vibebrowser.app
                              │
                              ▼
                 ┌──────────────────┐
                 │  Vibe Extension  │  ← your real Chrome browser
                 │   (at home)      │     connects on "Remote" toggle
                 └──────────────────┘`}
                      </pre>
                    </div>

                    {/* Remote mode setup instructions */}
                    <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-6 max-w-3xl mx-auto mb-6">
                      <h4 className="font-medium text-[#e8eaed] mb-4 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[#8ab4f8]" />
                        Remote mode setup
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="text-[#8ab4f8] font-mono text-sm font-bold mt-0.5 flex-shrink-0">1.</span>
                          <div>
                            <p className="text-sm text-[#e8eaed]">In the Vibe extension, go to <strong>Settings → AI Agent Control</strong>, turn on <strong>Enable external AI agent control</strong>, then select <strong>Remote (internet)</strong></p>
                            <p className="text-xs text-[#9aa0a6] mt-1">This connects your browser to relay.api.vibebrowser.app and generates a unique UUID</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-[#8ab4f8] font-mono text-sm font-bold mt-0.5 flex-shrink-0">2.</span>
                          <div>
                            <p className="text-sm text-[#e8eaed]">Copy the UUID/relay URL shown under <strong>Relay access</strong></p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-[#8ab4f8] font-mono text-sm font-bold mt-0.5 flex-shrink-0">3.</span>
                          <div>
                            <p className="text-sm text-[#e8eaed] mb-2">Configure your agent with the <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1.5 py-0.5 rounded">--remote</code> flag:</p>
                            <div className="bg-[#111111] rounded border border-[#2a2a2a] overflow-hidden">
                              <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                                <span className="text-xs text-[#9aa0a6] font-mono">CLI</span>
                                <CopyButton text={REMOTE_MCP_COMMAND} />
                              </div>
                              <pre className="px-3 py-2 text-sm font-mono text-[#e8eaed] overflow-x-auto">
                                <code>{REMOTE_MCP_COMMAND}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-4">
                        Share your UUID with any MCP-compatible agent on the internet. They connect to your browser through the relay — no port forwarding, no VPN, no firewall changes needed.
                      </p>
                    </div>

                    {/* Architecture highlights */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center mx-auto mb-3">
                          <GitBranch className="w-6 h-6 text-[#8ab4f8]" />
                        </div>
                        <h4 className="font-medium text-[#e8eaed] mb-1">Multi-Agent</h4>
                        <p className="text-xs text-[#9aa0a6]">Multiple agents connect simultaneously — local or remote, no conflicts</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-[#81c995]/10 flex items-center justify-center mx-auto mb-3">
                          <Globe className="w-6 h-6 text-[#81c995]" />
                        </div>
                        <h4 className="font-medium text-[#e8eaed] mb-1">Connect from Anywhere</h4>
                        <p className="text-xs text-[#9aa0a6]">Any agent on the internet can control your browser — just share your UUID</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-[#fdd663]" />
                        </div>
                        <h4 className="font-medium text-[#e8eaed] mb-1">Authenticated</h4>
                        <p className="text-xs text-[#9aa0a6]">UUID + secret authentication — only you control who connects</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Local setup steps (trimmed, no --remote/UUID references) */}
        <section className="w-full py-16 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-6 max-w-3xl mx-auto">
              <h4 className="font-medium text-[#e8eaed] mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#81c995]" />
                Local setup
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#81c995] font-mono text-sm font-bold mt-0.5 flex-shrink-0">1.</span>
                  <div>
                    <p className="text-sm text-[#e8eaed]">Install the Vibe extension and enable <strong>AI Agent Control</strong> in Settings</p>
                    <p className="text-xs text-[#9aa0a6] mt-1">Local is the default connection mode — no toggle needed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#81c995] font-mono text-sm font-bold mt-0.5 flex-shrink-0">2.</span>
                  <div>
                    <p className="text-sm text-[#e8eaed]">Add <code className="text-[#81c995] bg-[#81c995]/5 px-1.5 py-0.5 rounded">{MCP_SERVER_BINARY}</code> to your agent&apos;s MCP config</p>
                    <p className="text-xs text-[#9aa0a6] mt-1">Pick your agent in the reference below — copy, paste, done.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#81c995] font-mono text-sm font-bold mt-0.5 flex-shrink-0">3.</span>
                  <div>
                    <p className="text-sm text-[#e8eaed]">Your agent now talks to your browser over localhost only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full 8-agent config reference (unchanged) */}
        <section id="setup" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] scroll-mt-20">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Configuration for every agent
              </h2>
              <p className="text-[#9aa0a6]">
                Click an agent to see the config. Copy, paste, done.
              </p>
              <p className="text-xs text-[#9aa0a6] mt-3">
                Local mode defaults to relay port <code className="text-[#9aa0a6]">19888</code> (no flag needed). The browser
                extension listens on <code className="text-[#9aa0a6]">19889</code> — do not point the MCP server at the extension port.
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
                      ? "bg-[#81c995] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#9aa0a6] hover:text-[#e8eaed] border border-[#2a2a2a]"
                  }`}
                >
                  {cfg.agent}
                </button>
              ))}
            </div>

            {/* Config display */}
            <div className="bg-[#111111] rounded-lg border border-[#2a2a2a] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-[#9aa0a6]" />
                  <span className="text-xs text-[#9aa0a6] font-mono">{SETUP_CONFIGS[activeAgent].file}</span>
                </div>
                <CopyButton text={SETUP_CONFIGS[activeAgent].config} />
              </div>
              <pre className="p-4 text-sm font-mono text-[#e8eaed] text-left overflow-x-auto">
                <code>{SETUP_CONFIGS[activeAgent].config}</code>
              </pre>
              {SETUP_CONFIGS[activeAgent].note && (
                <div className="px-4 py-2 border-t border-[#2a2a2a] text-xs text-[#9aa0a6]">
                  {SETUP_CONFIGS[activeAgent].note}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Link to /mcp — quieter than the reverse banner on /mcp */}
        <section className="w-full py-10 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto flex items-center gap-3 text-sm text-[#9aa0a6]">
              <Globe className="w-4 h-4 text-[#8ab4f8] flex-shrink-0" />
              <p>
                Need agents outside your machine, or a cloud runner? Hosted remote MCP is on{" "}
                <Link href="/mcp" className="text-[#8ab4f8] hover:underline">/mcp</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ (local subset) */}
        <section id="faq" className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-8 text-center">
              Frequently asked questions
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can multiple AI agents control the browser at the same time?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Vibe Browser MCP uses a relay daemon architecture where multiple AI clients (Claude, Cursor, VS Code, etc.) each connect via their own stdio MCP bridge to a shared relay on port 19888. The relay forwards requests to the Vibe extension on port 19889. Each agent operates independently without conflicts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Does Vibe Browser MCP require Chrome debug permissions?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  No. Vibe Browser MCP uses content scripts and the Chrome Extensions API to interact with pages — no <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote-debugging-port</code> or CDP required. Playwright MCP&apos;s extension mode also avoids debug ports, and it can manually attach via <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--cdp-endpoint</code> if Chrome is already exposing CDP, but its default mode still launches a separate browser via Playwright&apos;s protocol. Chrome DevTools MCP requires debug ports. Vibe works with your normal browser profile without any special launch flags or security downgrades.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can I point my local bridge at a browser on another machine?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes — optionally. The same local <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">{MCP_SERVER_BINARY}</code> bridge above can add a <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote &lt;uuid&gt;</code> flag to dial out to a browser on another machine through our relay, instead of talking to a browser on this machine — see the optional bridge setup above. That includes OpenClaw-style remote flows, but the command-oriented setup lives on the dedicated <Link href="/openclaw" className="text-[#8ab4f8] hover:underline">OpenClaw page</Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How does the credential vault work?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  The <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">secrets_manager</code> tool lets agents list and read credentials by domain. The <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">typein_secret</code> tool fills form fields directly from the vault — the actual password value is never exposed to the LLM. This means your AI agent can log in to sites on your behalf without seeing your passwords.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Is Vibe Browser MCP open source?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Partially. The npm package (<code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">@vibebrowser/mcp</code>) is open source on GitHub and published on npm with the <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">{MCP_SERVER_BINARY}</code> binary. The Vibe Browser extension itself is not open source. Playwright MCP (Microsoft) and Chrome DevTools MCP (Google) are fully open source under Apache-2.0. BrowserMCP is in a similar position to Vibe — their MCP server is open source, but the Chrome extension is closed-source and the monorepo cannot be built standalone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What are indexed markdown snapshots?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Instead of dumping raw DOM or accessibility tree snapshots, Vibe can capture indexed markdown snapshots with interactive elements labeled as <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">[index:score]</code>. Agents use these indices to click, fill, and interact with elements. This format is 3-5x smaller than alternatives, reducing token usage and context pollution while staying readable for both humans and agents.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-[#2a2a2a] bg-[#111111] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can Vibe Browser MCP also work as a standalone browser?
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
              Ready to connect your local AI agent?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Install the extension, add one config block, and start automating — entirely on your machine. Free, with an open source MCP package and browser CLI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  <Chrome className="mr-2 h-5 w-5" />
                  Install in Chrome
                </Button>
              </Link>
              <a href="#setup">
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#111111] text-[#81c995]">
                  Configure Your Agent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            <p className="text-xs text-[#9aa0a6] mt-8">
              Questions? <a href="mailto:info@vibebrowser.app" className="text-[#8ab4f8] hover:underline">info@vibebrowser.app</a> · <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="text-[#8ab4f8] hover:underline">GitHub</Link> · <Link href="https://www.npmjs.com/package/@vibebrowser/mcp" target="_blank" className="text-[#8ab4f8] hover:underline">npm</Link> · <Link href="/mcp" className="text-[#8ab4f8] hover:underline">Hosted remote MCP</Link>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
              <Link href="/people" className="text-[#8ab4f8] hover:underline">
                Personal automation
              </Link>
              <Link href="/lawyers" className="text-[#8ab4f8] hover:underline">
                Legal research automation
              </Link>
              <Link href="/recruiters" className="text-[#8ab4f8] hover:underline">
                LinkedIn recruiter automation
              </Link>
              <Link href="/researchers" className="text-[#8ab4f8] hover:underline">
                Academic research automation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <SiteFooter />
    </div>
  )
}
