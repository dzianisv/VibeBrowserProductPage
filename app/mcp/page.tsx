"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/components/google-analytics"
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
  AlertCircle,
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
  Shield,
  ShieldCheck,
  Cpu,
  Chrome,
} from "lucide-react"

// Rotating agent names for the hero typewriter animation — mirrors the 7
// named clients in the remote agent selector below (Pi excluded: it has no
// native MCP support, see REMOTE_AGENT_CARDS).
const ROTATING_AGENTS = [
  "Claude Code",
  "Codex CLI",
  "GitHub Copilot",
  "GitHub Copilot CLI",
  "Cursor",
  "OpenCode",
  "Any MCP Client",
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
  { feature: "Multi-agent support", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Multiple AI agents control the same browser simultaneously — via the local relay daemon (stdio) or independent hosted HTTP sessions (remote)" },
  { feature: "Internet-exposed relay", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Reach your browser over the internet — via the hosted Direct HTTP endpoint on this page, or an optional relay-exposed stdio bridge on /mcp-stdio" },
  { feature: "Google Workspace integration", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Gmail search/send/draft/thread/message plus Calendar view/create/delete — 8 native tools" },
  { feature: "Credential vault", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Secure password manager that never exposes secrets to the LLM" },
  { feature: "Sub-agent orchestration", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Spawn sub-agents with isolated context and parallel tool execution" },
  { feature: "Standalone AI browser", vibe: true, playwright: false, devtools: false, browsermcp: false, detail: "Also works as a standalone AI co-pilot directly in your browser" },
  { feature: "Open source", vibe: "partial", playwright: true, devtools: true, browsermcp: "partial", detail: "Vibe's npm package (@vibebrowser/mcp) ships the vibebrowser-mcp binary as open source; the browser extension is not. BrowserMCP is similar" },
  { feature: "Telemetry to vendor", vibe: false, playwright: false, devtools: true, browsermcp: false, detail: "Chrome DevTools MCP sends usage statistics and CrUX API calls to Google by default" },
]

const COMPETITOR_COLS = [
  { key: "vibe" as const, label: "Vibe Browser MCP", color: "text-[#8ab4f8]" },
  { key: "playwright" as const, label: "Playwright MCP", color: "text-[#9aa0a6]" },
  { key: "devtools" as const, label: "DevTools MCP", color: "text-[#9aa0a6]" },
  { key: "browsermcp" as const, label: "Browser MCP", color: "text-[#9aa0a6]" },
]

// Published npm package identity — still referenced by the open-source FAQ
// entry on this page even though the local install command itself now lives
// on /mcp-stdio only. Scoped package only: the unscoped "vibe-mcp" name on
// npm is an unrelated third-party package and must never be published here
// as an installable command or alias.
const MCP_SERVER_BINARY = "vibebrowser-mcp"

// Direct remote MCP endpoint (Streamable HTTP) — the only connection model
// this page shows. No local vibebrowser-mcp process, no daemon, no ws port,
// no --remote bridge. Auth is a UUID-only bearer credential sent via the
// X-Remote-Session header.
const DIRECT_MCP_ENDPOINT = "https://relay.api.vibebrowser.app/mcp"
const DIRECT_MCP_SESSION_HEADER = "X-Remote-Session"
// Canonical form the extension's "Relay access" control may also hand back —
// the header accepts either the bare UUID above or this full wss:// URL.
const DIRECT_MCP_CANONICAL_HEADER_VALUE = "wss://relay.api.vibebrowser.app/YOUR-SESSION-UUID"
const DIRECT_MCP_CLI_COMMAND = `claude mcp add --transport http --scope user vibebrowser ${DIRECT_MCP_ENDPOINT} --header "${DIRECT_MCP_SESSION_HEADER}: <uuid>"`

interface ToolDef {
  name: string
  description: string
}

interface CapabilitySurface {
  label: string
  title: string
  description: string
  proof: string
  outcomes: string[]
  tools: string[]
  icon: React.ReactNode
}

const CAPABILITY_SURFACES: CapabilitySurface[] = [
  {
    label: "Browser control",
    title: "Drive the live browser session your operator already trusts",
    description:
      "Open tabs, navigate, click, fill, drag, type, and scroll inside the same logged-in browser profile instead of a disposable automation runtime.",
    proof:
      "This is the right surface when your agent needs real UI state, installed extensions, existing cookies, and human-visible execution.",
    outcomes: [
      "Works on authenticated SaaS, portals, and internal tools",
      "Keeps the human in the same browser context as the agent",
      "Avoids extra browser launch flags or CDP ceremony",
    ],
    tools: ["navigate_page", "click", "fill_form", "press_key", "drag"],
    icon: <Globe className="w-5 h-5" />,
  },
  {
    label: "Snapshots",
    title: "Read pages in agent-friendly formats instead of flooding context",
    description:
      "Indexed markdown, accessibility trees, HTML snapshots, screenshots, script evaluation, and network inspection let the agent ground itself before it acts.",
    proof:
      "This is where Vibe shifts from generic browser automation into a better reasoning surface for coding agents and workflow agents.",
    outcomes: [
      "Lower token usage than raw DOM dumps",
      "Cleaner bug reports, QA runs, and extraction tasks",
      "More reliable browser state before every action",
    ],
    tools: [
      "take_snapshot",
      "take_html_snapshot",
      "evaluate_script",
      "list_network_requests",
    ],
    icon: <Eye className="w-5 h-5" />,
  },
  {
    label: "Workspace",
    title: "Use Gmail and Calendar as first-class tools, not just browser targets",
    description:
      "Search inboxes, read threads, draft or send email, view calendars, and create or delete events through native actions when DOM automation would be the wrong abstraction.",
    proof:
      "This is a strong wedge for real operator workflows because it removes fragile webmail clicking from the high-value parts of the job.",
    outcomes: [
      "Keep inbox and scheduling flows reliable",
      "Mix API-native workspace actions with live browser control",
      "Reduce the number of brittle UI-only steps in the workflow",
    ],
    tools: ["gmail_search", "gmail_create_draft", "calendar_view", "calendar_create"],
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: "Secrets + memory",
    title: "Carry state safely across long-running browser workflows",
    description:
      "Search stored memories, inspect credential metadata, and fill secrets into forms without exposing plaintext passwords to the model.",
    proof:
      "This matters when an agent should remember prior work and stay authenticated without turning secrets into prompt text.",
    outcomes: [
      "Safer authentication for portal workflows",
      "Reusable context across runs and sessions",
      "Cleaner separation between model context and secret material",
    ],
    tools: ["memory_search", "secrets_manager", "typein_secret", "settings"],
    icon: <Lock className="w-5 h-5" />,
  },
  {
    label: "Coordination",
    title: "Split work across agents without losing the browser execution layer",
    description:
      "Spawn sub-agents, run parallel tasks, and fetch supporting context while the main agent keeps control of the live browser workflow.",
    proof:
      "This is the surface that makes Vibe feel like infrastructure for agent systems rather than a single browser toy.",
    outcomes: [
      "Research and execution can run in parallel",
      "One browser can support multiple cooperating agents",
      "Works for coding loops and browser-heavy operator tasks",
    ],
    tools: ["subagent", "parallel", "web_fetch", "wait"],
    icon: <GitBranch className="w-5 h-5" />,
  },
]

const TOOL_CATEGORIES: { category: string; icon: React.ReactNode; tools: ToolDef[] }[] = [
  {
    category: "Navigation",
    icon: <Globe className="w-5 h-5" />,
    tools: [
      { name: "navigate_page", description: "Navigate to a URL or go back / forward / reload" },
      { name: "wait_for", description: "Wait for text to appear on the page" },
    ],
  },
  {
    category: "Tab Management",
    icon: <Monitor className="w-5 h-5" />,
    tools: [
      { name: "list_pages", description: "List open browser pages/tabs" },
      { name: "new_page", description: "Open a new page with optional URL" },
      { name: "close_page", description: "Close a page by ID" },
    ],
  },
  {
    category: "Index-Based Interaction",
    icon: <MousePointerClick className="w-5 h-5" />,
    tools: [
      { name: "click", description: "Click by canonical ref like A7, M12, or 12" },
      { name: "fill", description: "Fill an input/select/contenteditable by canonical ref" },
      { name: "fill_form", description: "Fill multiple fields in one call" },
      { name: "scroll_page", description: "Scroll page up or down" },
      { name: "media_control", description: "Control video/audio playback" },
    ],
  },
  {
    category: "Advanced Interaction",
    icon: <Keyboard className="w-5 h-5" />,
    tools: [
      { name: "type_text", description: "Type into the focused field" },
      { name: "press_key", description: "Send keyboard keys and shortcuts" },
      { name: "hover", description: "Hover to trigger tooltips/menus" },
      { name: "drag", description: "Drag between elements or coordinates" },
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
    category: "Inspection & State",
    icon: <Eye className="w-5 h-5" />,
    tools: [
      { name: "take_snapshot", description: "Take indexed page snapshot (`type='markdown'` default or `type='a11y'`)" },
      { name: "take_html_snapshot", description: "Take a dedicated indexed HTML snapshot" },
      { name: "take_screenshot", description: "JPEG screenshot with resize, grayscale, quality controls" },
      { name: "evaluate_script", description: "Run JavaScript in the current page context" },
      { name: "list_network_requests", description: "List captured network requests" },
      { name: "get_network_request", description: "Inspect one captured request/response" },
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
      { name: "calendar_delete", description: "Delete a calendar event" },
    ],
  },
  {
    category: "Credential Management",
    icon: <Lock className="w-5 h-5" />,
    tools: [
      { name: "secrets_manager", description: "List/read saved credentials" },
      { name: "typein_secret", description: "Fill form from vault (hidden from LLM)" },
      { name: "settings", description: "Read or update extension settings and skills" },
      { name: "settings_list", description: "List stored settings keys and skill entries" },
      { name: "memory_search", description: "Recall stored context before acting" },
    ],
  },
]

// Status badge for each card in the remote agent selector. "verified" means
// the exact config shape below is confirmed against that client's own
// current official documentation (doc source recorded in the comment above
// each entry). "generic" is the catch-all Streamable HTTP contract for any
// other MCP-compatible client. "no-mcp" is Pi only — see anti-pattern #3/#5
// in the UI spec: neutral styling, no fabricated config.
type RemoteCardStatus = "verified" | "generic" | "no-mcp"

interface RemoteAgentCard {
  agent: string
  icon: string
  status: RemoteCardStatus
  summary: string
  file?: string
  config?: string
  note?: string
}

const REMOTE_AGENT_CARDS: RemoteAgentCard[] = [
  // Doc source: docs.claude.com/en/docs/claude-code/mcp — "Option 1: Add a
  // remote HTTP server" and "Environment variable expansion in .mcp.json"
  // (headers is a listed expansion location for HTTP server types).
  {
    agent: "Claude Code",
    icon: "claudecode",
    status: "verified",
    summary: "Streamable HTTP entry in .mcp.json or ~/.claude.json.",
    file: ".mcp.json (or ~/.claude.json)",
    config: `{
  "mcpServers": {
    "vibebrowser": {
      "type": "http",
      "url": "${DIRECT_MCP_ENDPOINT}",
      "headers": {
        "${DIRECT_MCP_SESSION_HEADER}": "\${VIBE_REMOTE_UUID}"
      }
    }
  }
}`,
    note: `Claude Code expands \${VAR} inside .mcp.json's headers field for HTTP servers — set VIBE_REMOTE_UUID in your shell, never hardcode the UUID in a committed file. Or run: ${DIRECT_MCP_CLI_COMMAND}`,
  },
  // Doc source: developers.openai.com/codex/mcp — "Configure with
  // config.toml" → Streamable HTTP servers: url, env_http_headers (map of
  // header name to environment variable name).
  {
    agent: "Codex CLI",
    icon: "codex-cli",
    status: "verified",
    summary: "[mcp_servers.vibebrowser] table in config.toml.",
    file: "~/.codex/config.toml",
    config: `[mcp_servers.vibebrowser]
url = "${DIRECT_MCP_ENDPOINT}"
env_http_headers = { "${DIRECT_MCP_SESSION_HEADER}" = "VIBE_REMOTE_UUID" }`,
    note: "env_http_headers maps the header name to an environment variable name — Codex reads the UUID from VIBE_REMOTE_UUID at runtime, never from the file itself.",
  },
  // Doc source: code.visualstudio.com/docs/agents/reference/mcp-configuration
  // — "HTTP and Server-Sent Events (SSE) servers" (type/url/headers) and
  // "Input variables for sensitive data" (promptString + password: true).
  {
    agent: "GitHub Copilot (VS Code)",
    icon: "copilot-vscode",
    status: "verified",
    summary: "settings.json-style mcp.json entry with a password input.",
    file: ".vscode/mcp.json (or user mcp.json)",
    config: `{
  "inputs": [
    {
      "type": "promptString",
      "id": "vibe-remote-uuid",
      "description": "Paste the Vibe relay UUID",
      "password": true
    }
  ],
  "servers": {
    "vibebrowser": {
      "type": "http",
      "url": "${DIRECT_MCP_ENDPOINT}",
      "headers": {
        "${DIRECT_MCP_SESSION_HEADER}": "\${input:vibe-remote-uuid}"
      }
    }
  }
}`,
    note: "VS Code prompts for the UUID the first time this server starts and stores it securely — it is never written into mcp.json.",
  },
  // Doc source: docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers
  // — "Editing the configuration file" (~/.copilot/mcp-config.json,
  // mcpServers.<name>.headers as literal values; no documented env
  // interpolation for header values).
  {
    agent: "GitHub Copilot CLI",
    icon: "copilot-cli",
    status: "verified",
    summary: "Remote HTTP entry in ~/.copilot/mcp-config.json.",
    file: "~/.copilot/mcp-config.json",
    config: `{
  "mcpServers": {
    "vibebrowser": {
      "type": "http",
      "url": "${DIRECT_MCP_ENDPOINT}",
      "headers": {
        "${DIRECT_MCP_SESSION_HEADER}": "YOUR-SESSION-UUID"
      }
    }
  }
}`,
    note: "Published docs show a literal header value here, not environment-variable interpolation — keep this file private with restrictive permissions (chmod 600) instead of committing it. This is the Copilot CLI's local config file, distinct from GitHub's cloud coding agent.",
  },
  // Doc source: cursor.com/docs/mcp — "Config interpolation" (headers is a
  // resolved field; supported syntax includes ${env:NAME}).
  {
    agent: "Cursor",
    icon: "cursor",
    status: "verified",
    summary: "mcp.json entry using Cursor's ${env:NAME} interpolation.",
    file: "~/.cursor/mcp.json (or .cursor/mcp.json)",
    config: `{
  "mcpServers": {
    "vibebrowser": {
      "url": "${DIRECT_MCP_ENDPOINT}",
      "headers": {
        "${DIRECT_MCP_SESSION_HEADER}": "\${env:VIBE_REMOTE_UUID}"
      }
    }
  }
}`,
    note: "Cursor resolves ${env:NAME} inside mcp.json's url and headers fields — set VIBE_REMOTE_UUID in your shell profile, not in the file.",
  },
  // Doc source: opencode.ai/docs/mcp-servers — "Remote" (type/url/headers),
  // "Disabling OAuth" (oauth: false + headers), and the {env:NAME} syntax
  // shown under "Pre-registered" OAuth credentials.
  {
    agent: "OpenCode",
    icon: "opencode",
    status: "verified",
    summary: "Remote MCP entry in opencode.json with OAuth disabled.",
    file: "~/.config/opencode/opencode.json",
    config: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "vibebrowser": {
      "type": "remote",
      "url": "${DIRECT_MCP_ENDPOINT}",
      "headers": {
        "${DIRECT_MCP_SESSION_HEADER}": "{env:VIBE_REMOTE_UUID}"
      },
      "oauth": false,
      "enabled": true
    }
  }
}`,
    note: `"oauth": false tells OpenCode to send the header instead of starting its automatic OAuth flow.`,
  },
  {
    agent: "Generic MCP client",
    icon: "generic",
    status: "generic",
    summary: "The underlying Streamable HTTP contract — syntax varies by client.",
    file: "mcp.json (syntax varies by client)",
    config: `{
  "mcpServers": {
    "vibebrowser": {
      "type": "http",
      "url": "${DIRECT_MCP_ENDPOINT}",
      "headers": {
        "${DIRECT_MCP_SESSION_HEADER}": "<uuid>"
      }
    }
  }
}`,
    note: "Any client that speaks the Streamable HTTP MCP transport can use this shape. Top-level key names (mcpServers vs servers) and environment-variable syntax vary — check your client's own docs before publishing a committed config.",
  },
  {
    agent: "Pi",
    icon: "pi",
    status: "no-mcp",
    summary: "No built-in MCP by design — custom/third-party extension only.",
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
    claudecode: "Claude Code",
    "codex-cli": "Codex CLI",
    "copilot-vscode": "Copilot",
    "copilot-cli": "Copilot CLI",
    cursor: "Cursor",
    opencode: "OpenCode",
    generic: "Generic",
  }
  const colors: Record<string, string> = {
    claudecode: "bg-[#d4a574]",
    "codex-cli": "bg-[#a8dab5]",
    "copilot-vscode": "bg-[#c9b3f0]",
    "copilot-cli": "bg-[#b39ddb]",
    cursor: "bg-[#8ab4f8]",
    opencode: "bg-[#81c995]",
    generic: "bg-[#9aa0a6]",
  }
  return (
    <div className={`w-10 h-10 rounded-lg ${colors[icon] || "bg-[#9aa0a6]"} flex items-center justify-center flex-shrink-0`}>
      <span className="text-[#202124] font-bold text-sm">{(labels[icon] || icon)[0]}</span>
    </div>
  )
}

// ----- Page -----

export default function McpPage() {
  const [activeSurface, setActiveSurface] = useState(0)
  const [selectedCard, setSelectedCard] = useState(0) // index into REMOTE_AGENT_CARDS for the shared config panel
  const rotatingAgent = useTypewriter(ROTATING_AGENTS, 100, 60, 2500)
  const selectedSurface = CAPABILITY_SURFACES[activeSurface]
  const selectedCardData = REMOTE_AGENT_CARDS[selectedCard]

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#8ab4f8]/10 text-[#8ab4f8] border-[#8ab4f8]/20">
                <Cpu className="w-4 h-4 mr-2" />
                Hosted · Streamable HTTP
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Give <span className="text-[#8ab4f8]">{rotatingAgent}</span>
                  <span className="animate-pulse text-[#8ab4f8]">|</span>
                  <br className="hidden sm:block" />
                  a real browser — from anywhere
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  Your real logged-in browser, exposed as a hosted MCP endpoint. No local process, no port forwarding, no VPN.
                </p>
              </div>

              {/* Hero CTAs: Install in Chrome + jump to the agent selector below */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center">
                <Link href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced" target="_blank">
                  <Button
                    size="lg"
                    className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full"
                    onClick={() => trackCTAClick('install_extension_docs', 'mcp_hero')}
                  >
                    <Chrome className="mr-2 h-5 w-5" />
                    Install in Chrome
                  </Button>
                </Link>
                <a href="#setup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]"
                  >
                    Jump to agent setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#81c995]" />
                  25+ browser tools
                </span>
                <span className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Multi-agent, no local daemon
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Hosted Streamable HTTP relay
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

        {/* Privacy / local-alternative callout — the single most important
            non-CTA element on this page (UI spec §5): stands between the
            hero and any endpoint detail. */}
        <section id="local-alternative" className="w-full py-6 border-t border-b border-[#81c995]/20 bg-[#81c995]/5">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <ShieldCheck className="w-6 h-6 text-[#81c995] flex-shrink-0" />
              <p className="text-sm text-[#e8eaed]">
                <strong className="font-medium">Don&apos;t want browser-control traffic to touch the internet?</strong>{" "}
                <span className="text-[#9aa0a6]">
                  Run Vibe MCP locally instead — the MCP bridge and browser-control path stay on your machine, with no Vibe internet relay involved. See the{" "}
                </span>
                <Link href="/mcp-stdio" className="text-[#81c995] hover:underline font-medium">
                  local stdio setup
                </Link>
                <span className="text-[#9aa0a6]">.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Remote endpoint quick-facts */}
        <section className="w-full py-16 md:py-20 border-t border-[#1e1e1e]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                One endpoint, one header
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Every remote client — CLI, IDE, or cloud runner — talks to the same hosted endpoint with the same header.
              </p>
            </div>

            <div className="bg-[#111111] rounded-lg border border-[#2a2a2a] overflow-hidden max-w-2xl mx-auto divide-y divide-[#2a2a2a]">
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Endpoint</p>
                  <p className="text-sm font-mono text-[#e8eaed] break-all mt-1">{DIRECT_MCP_ENDPOINT}</p>
                </div>
                <CopyButton text={DIRECT_MCP_ENDPOINT} />
              </div>
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Header</p>
                  <p className="text-sm font-mono text-[#e8eaed] mt-1">{DIRECT_MCP_SESSION_HEADER}</p>
                </div>
                <CopyButton text={DIRECT_MCP_SESSION_HEADER} />
              </div>
              <div className="px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Value</p>
                <p className="text-sm text-[#e8eaed] mt-1">
                  The UUID from Settings → AI Agent Control → Remote (internet) → Relay access.
                </p>
                <p className="text-xs text-[#9aa0a6] mt-2">
                  The bare UUID is the primary, shortest form. The canonical{" "}
                  <code className="text-[#9aa0a6] break-all">{DIRECT_MCP_CANONICAL_HEADER_VALUE}</code> URL shown by
                  the same extension control is also an accepted header value — use whichever string the extension
                  hands you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent setup selector */}
        <section id="setup" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111] scroll-mt-20">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Configuration for every agent
              </h2>
              <p className="text-[#9aa0a6]">
                Click an agent to see its config. Copy, paste, add your UUID, done.
              </p>
            </div>

            {/* Agent cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REMOTE_AGENT_CARDS.map((card, i) => {
                const isPi = card.status === "no-mcp"
                const isSelected = !isPi && selectedCard === i
                const statusBadge =
                  card.status === "verified" ? (
                    <Badge variant="secondary" className="bg-[#81c995]/10 text-[#81c995] border-[#81c995]/20 text-[10px]">
                      Verified
                    </Badge>
                  ) : card.status === "generic" ? (
                    <Badge variant="secondary" className="bg-[#8ab4f8]/10 text-[#8ab4f8] border-[#8ab4f8]/20 text-[10px]">
                      Generic JSON
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-[#9aa0a6]/10 text-[#9aa0a6] border-[#9aa0a6]/20 text-[10px]">
                      No built-in MCP
                    </Badge>
                  )
                const cardHeader = (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      {isPi ? (
                        <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                          <MinusCircle className="w-5 h-5 text-[#9aa0a6]" />
                        </div>
                      ) : (
                        <AgentIcon icon={card.icon} />
                      )}
                      {statusBadge}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#e8eaed] text-base">{card.agent}</h3>
                      <p className="text-xs text-[#9aa0a6] mt-1">{card.summary}</p>
                    </div>
                  </>
                )
                // Pi has no toggle action — it is not a <button> at all (its
                // one real action is the co-pilot link below, and a <button>
                // cannot legally contain a nested <a>/<Link>). The other 7
                // cards are real toggle buttons driving the shared config
                // panel underneath the grid.
                if (isPi) {
                  return (
                    <div
                      key={card.agent}
                      className="text-left rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4 flex flex-col gap-3"
                    >
                      {cardHeader}
                      <p className="text-xs text-[#9aa0a6] mt-1">
                        Pi has no built-in MCP support by design — only a custom or third-party Pi extension could add it. Vibe also works as a{" "}
                        <Link
                          href="https://docs.vibebrowser.app/getting-started/extension#option-2-developer-version-advanced"
                          target="_blank"
                          className="text-[#8ab4f8] hover:underline"
                        >
                          standalone in-browser co-pilot
                        </Link>{" "}
                        — no MCP required.
                      </p>
                    </div>
                  )
                }
                return (
                  <button
                    key={card.agent}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCard(i)}
                    className={`text-left rounded-lg border p-4 transition-colors flex flex-col gap-3 ${
                      isSelected
                        ? "border-[#8ab4f8]/50 bg-[#8ab4f8]/10"
                        : "border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#3a3a3a]"
                    }`}
                  >
                    {cardHeader}
                  </button>
                )
              })}
            </div>

            {/* Shared config panel for the selected (non-Pi) card */}
            <div className="mt-8 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] overflow-hidden max-w-3xl mx-auto">
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-[#9aa0a6]" />
                  <span className="text-xs text-[#9aa0a6] font-mono">{selectedCardData.file}</span>
                </div>
                {selectedCardData.config && <CopyButton text={selectedCardData.config} />}
              </div>
              <pre className="p-4 text-sm font-mono text-[#e8eaed] text-left overflow-x-auto whitespace-pre-wrap break-all">
                <code>{selectedCardData.config}</code>
              </pre>
              {selectedCardData.note && (
                <div className="px-4 py-2 border-t border-[#2a2a2a] text-xs text-[#9aa0a6]">
                  {selectedCardData.note}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Security / credential-handling callout */}
        <section className="w-full py-16 border-t border-[#1e1e1e]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="rounded-lg border border-[#fdd663]/30 bg-[#fdd663]/5 p-5 max-w-3xl mx-auto flex gap-3">
              <Shield className="w-5 h-5 text-[#fdd663] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#9aa0a6]">
                <strong className="text-[#e8eaed]">Handle your relay credential safely.</strong> Your{" "}
                <code className="text-[#9aa0a6]">{DIRECT_MCP_SESSION_HEADER}</code> value is a bearer credential for
                your real, logged-in browser — anyone who holds it can drive it. Keep it out of shared chat logs,
                screenshots, and public repos, and never commit it to a config file. Prefer to keep this credential
                off the internet entirely? See the{" "}
                <Link href="/mcp-stdio" className="text-[#8ab4f8] hover:underline">
                  local stdio setup
                </Link>{" "}
                instead.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.26em] text-[#9aa0a6]">Capability surfaces</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-normal text-[#e8eaed]">
                What agents can actually do through Vibe Browser MCP
              </h2>
              <p className="mt-4 text-[#9aa0a6]">
                Package the browser, workspace, security, and coordination layers as explicit surfaces.
                That is the useful lesson from infrastructure products like Tavily, translated to a real-browser MCP.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {CAPABILITY_SURFACES.map((surface, index) => (
                <button
                  key={surface.label}
                  onClick={() => setActiveSurface(index)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    activeSurface === index
                      ? "border-[#8ab4f8]/40 bg-[#8ab4f8]/12 text-[#e8f0fe]"
                      : "border-[#2a2a2a] bg-[#0a0a0a] text-[#9aa0a6] hover:border-[#3a3a3a] hover:text-[#e8eaed]"
                  }`}
                >
                  {surface.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <Card className="border-[#2a2a2a] bg-[#0a0a0a]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-sm font-medium text-[#8ab4f8]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8ab4f8]/10 text-[#8ab4f8]">
                      {selectedSurface.icon}
                    </div>
                    <span>{selectedSurface.label}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-normal text-[#e8eaed]">
                    {selectedSurface.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#9aa0a6]">
                    {selectedSurface.description}
                  </p>

                  <div className="mt-6 rounded-2xl border border-[#2a2a2a] bg-[#111111] p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Why teams reach for this surface</p>
                    <p className="mt-3 text-sm leading-7 text-[#c4cbe0]">{selectedSurface.proof}</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {selectedSurface.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#81c995] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#c4cbe0]">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-[#2a2a2a] bg-[#0a0a0a]">
                  <CardContent className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Representative tools</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedSurface.tools.map((tool) => (
                        <code
                          key={tool}
                          className="rounded-full border border-[#2a2a2a] bg-[#111111] px-3 py-1.5 text-xs text-[#8ab4f8]"
                        >
                          {tool}
                        </code>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#2a2a2a] bg-[#0a0a0a]">
                  <CardContent className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Packaging that technical buyers understand</p>
                    <p className="mt-3 text-sm leading-7 text-[#9aa0a6]">
                      Tavily makes its product legible by naming a small set of surfaces clearly. The
                      equivalent move for Vibe is not “search” or “crawl”; it is browser control,
                      snapshots, workspace actions, secrets, and agent coordination.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-[#2a2a2a] bg-[#0a0a0a]">
                  <CardContent className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#9aa0a6]">Proof points already present in this route</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-4">
                        <p className="text-lg font-medium text-[#e8eaed]">25+</p>
                        <p className="mt-1 text-xs text-[#9aa0a6]">published tools across browser, workspace, security, and agent orchestration</p>
                      </div>
                      <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-4">
                        <p className="text-lg font-medium text-[#e8eaed]">Local + remote</p>
                        <p className="mt-1 text-xs text-[#9aa0a6]">relay paths for laptop agents and internet-reachable runners</p>
                      </div>
                      <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-4">
                        <p className="text-lg font-medium text-[#e8eaed]">Multi-agent</p>
                        <p className="mt-1 text-xs text-[#9aa0a6]">one real browser session can be shared by multiple cooperating agents</p>
                      </div>
                      <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-4">
                        <p className="text-lg font-medium text-[#e8eaed]">Real sessions</p>
                        <p className="mt-1 text-xs text-[#9aa0a6]">cookies, tabs, extensions, and authenticated apps stay intact</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                Navigation, interaction, Google Workspace, credential management, skills, sub-agents, and more — all exposed via MCP.
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
                          <span className="text-xs text-[#9aa0a6] group-hover:text-[#e8eaed] transition-colors">{tool.description}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5 text-[#8ab4f8]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Skills Library</h3>
                  <p className="text-xs text-[#9aa0a6]">
                    Turn workflows into reusable skills and share them across agents or teams.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-[#81c995]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Secrets Vault + Type-In</h3>
                  <p className="text-xs text-[#9aa0a6]">
                    Internal password vault with a fill tool that never exposes secrets to the LLM.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0a0a0a] border-[#2a2a2a]">
                <CardContent className="p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-[#fdd663]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Model & Agent Choice</h3>
                  <p className="text-xs text-[#9aa0a6]">
                    Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Vibe Browser MCP */}
        <section id="compare" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                How Vibe Browser MCP compares
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Vibe Browser MCP is the only browser MCP that uses your real browser with all your logged-in sessions — no debug ports, no separate browser instance.
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
                        {row.detail && <p className="text-xs text-[#9aa0a6] mt-0.5">{row.detail}</p>}
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
            <div className="grid md:grid-cols-3 gap-4 mt-10 text-xs text-[#9aa0a6]">
              <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <h4 className="text-[#9aa0a6] font-medium mb-1">Playwright MCP <span className="text-[#9aa0a6]">(Microsoft)</span></h4>
                <p>Launches a separate Playwright-managed browser. Requires CDP for existing browser connection. 27k GitHub stars.</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <h4 className="text-[#9aa0a6] font-medium mb-1">Chrome DevTools MCP <span className="text-[#9aa0a6]">(Google)</span></h4>
                <p>Developer debugging tool using Puppeteer + CDP. Launches separate Chrome instance. Sends telemetry to Google by default. 25k GitHub stars.</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-4">
                <h4 className="text-[#9aa0a6] font-medium mb-1">Browser MCP <span className="text-[#9aa0a6]">(Namu)</span></h4>
                <p>Chrome extension-based like Vibe. Single agent only. Extension is closed-source. 5.8k GitHub stars.</p>
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
                  How is Vibe Browser MCP different from Playwright MCP, Chrome DevTools MCP, and BrowserMCP?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  <strong className="text-[#e8eaed]">vs Playwright MCP &amp; Chrome DevTools MCP:</strong> By default both launch a separate browser instance — you lose all logged-in sessions, cookies, and extensions. Playwright MCP can connect to your existing browser either through its Chrome extension mode or through an explicit <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--cdp-endpoint</code> when Chrome remote debugging is already enabled, but that is still manual setup and it still lacks multi-agent control, Google Workspace tools, credential vault, and sub-agent orchestration. Chrome DevTools MCP requires <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote-debugging-port</code> for existing browser connections and sends telemetry to Google by default.
                  <br /><br />
                  <strong className="text-[#e8eaed]">vs BrowserMCP:</strong> Like Vibe, BrowserMCP is a Chrome extension that uses your real browser. However, it only supports a single agent at a time (new connections kill the previous one), has ~13 tools vs Vibe's 25+, lacks Google Workspace integration, credential vault, and sub-agent orchestration. Its extension is also closed-source.
                  <br /><br />
                  <strong className="text-[#e8eaed]">Unique to Vibe:</strong> Multi-agent support, 25+ tools, native Gmail/Calendar integration, secure credential vault (<code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">typein_secret</code>), sub-agent orchestration, and indexed markdown snapshots for 3-5x lower token usage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  I don&apos;t want my browser traffic to touch the internet — what should I use instead?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Use local stdio MCP — it runs as a process on your machine and never sends browser-control traffic over the internet. See <Link href="/mcp-stdio" className="text-[#8ab4f8] hover:underline">/mcp-stdio</Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can multiple AI agents control the browser at the same time?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Each agent sends its own <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">X-Remote-Session</code> header value to the hosted endpoint independently — there&apos;s no local daemon or port to share, so multiple direct HTTP clients (or a mix of direct HTTP and local stdio agents) can drive the browser without conflicting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Does Vibe Browser MCP require Chrome debug permissions?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  No. Vibe Browser MCP uses content scripts and the Chrome Extensions API to interact with pages — no <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--remote-debugging-port</code> or CDP required. Playwright MCP's extension mode also avoids debug ports, and it can manually attach via <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--cdp-endpoint</code> if Chrome is already exposing CDP, but its default mode still launches a separate browser via Playwright's protocol. Chrome DevTools MCP requires debug ports. Vibe works with your normal browser profile without any special launch flags or security downgrades.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What AI agents work with Vibe Browser MCP?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Any MCP client that supports the Streamable HTTP transport. We provide verified remote configs for Claude Code, Codex CLI, GitHub Copilot (VS Code and CLI), Cursor, and OpenCode, plus a generic JSON contract for any other Streamable HTTP client. Prefer to run your agent on the same machine as your browser? See the <Link href="/mcp-stdio" className="text-[#8ab4f8] hover:underline">local stdio setup</Link> instead.
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
                  Is Vibe Browser MCP open source?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Partially. The npm package (<code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">@vibebrowser/mcp</code>) is open source on GitHub and published on npm with the <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">{MCP_SERVER_BINARY}</code> binary. The Vibe Browser extension itself is not open source. Playwright MCP (Microsoft) and Chrome DevTools MCP (Google) are fully open source under Apache-2.0. BrowserMCP is in a similar position to Vibe — their MCP server is open source, but the Chrome extension is closed-source and the monorepo cannot be built standalone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What are indexed markdown snapshots?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Instead of dumping raw DOM or accessibility tree snapshots, Vibe can capture indexed markdown snapshots with interactive elements labeled as <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">[index:score]</code>. Agents use these indices to click, fill, and interact with elements. This format is 3-5x smaller than alternatives, reducing token usage and context pollution while staying readable for both humans and agents.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-[#2a2a2a] bg-[#0a0a0a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can Vibe Browser MCP also work as a standalone browser?
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
                  Playwright MCP and Chrome DevTools MCP launch a fresh, separate browser instance by default. That means you start with no logged-in sessions, no cookies, no extensions, and no saved passwords. Playwright MCP can reuse an existing browser through its extension flow or by pointing it at an explicit <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">--cdp-endpoint</code>, but that still requires extra setup and it still lacks multi-agent support. Vibe Browser MCP connects directly to the browser you're already using with zero configuration — your agent can interact with Gmail, Slack, GitHub, Jira, or any site you're logged into without re-authenticating. This is critical for real-world automation workflows.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Ready to connect your AI agent from anywhere?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Grab your relay UUID from the extension, add one config block, and go. Prefer to stay fully local?{" "}
              <Link href="/mcp-stdio" className="text-[#8ab4f8] hover:underline">
                Use local stdio MCP instead
              </Link>
              .
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
            <p className="text-xs text-[#9aa0a6] mt-8">
              Questions? <a href="mailto:info@vibebrowser.app" className="text-[#8ab4f8] hover:underline">info@vibebrowser.app</a> · <Link href="https://github.com/VibeTechnologies/vibe-mcp" target="_blank" className="text-[#8ab4f8] hover:underline">GitHub</Link> · <Link href="https://www.npmjs.com/package/@vibebrowser/mcp" target="_blank" className="text-[#8ab4f8] hover:underline">npm</Link> · <Link href="/mcp-stdio" className="text-[#8ab4f8] hover:underline">Local stdio setup</Link>
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
