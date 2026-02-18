"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SlackDemo, SlackAgent, SlackMessage } from "@/components/slack-demo"
import {
  ArrowRight,
  Users,
  Bot,
  MessageSquare,
  Zap,
  Shield,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Code2,
  Rocket,
  Megaphone,
  ClipboardList,
  Headphones,
  Eye,
  Clock,
  Mail,
  Hash,
  Brain,
  Layers,
  Settings,
  Wrench,
} from "lucide-react"

// ----- Data: Agent Roles -----

interface AgentRole {
  role: string
  handle: string
  initial: string
  color: string
  description: string
  capabilities: string[]
}

const AGENTS: AgentRole[] = [
  {
    role: "Support Engineer",
    handle: "@SupportEngineer",
    initial: "SE",
    color: "#81c995",
    description: "Customer communication, Sentry monitoring, issue triage, email triage",
    capabilities: ["Sentry error monitoring", "Customer email triage", "Issue escalation", "Status page updates"],
  },
  {
    role: "Software Engineer",
    handle: "@SoftwareEngineer",
    initial: "SW",
    color: "#8ab4f8",
    description: "Bug fixes, feature implementation, code review, testing",
    capabilities: ["Bug diagnosis & fix", "Feature implementation", "Code review", "Test writing & CI"],
  },
  {
    role: "Release Engineer",
    handle: "@ReleaseEngineer",
    initial: "RE",
    color: "#fdd663",
    description: "Deployments, CI/CD, infrastructure, incident response",
    capabilities: ["Production deployments", "CI/CD pipeline management", "Infrastructure monitoring", "Incident response"],
  },
  {
    role: "Product Manager",
    handle: "@ProductManager",
    initial: "PM",
    color: "#c58af9",
    description: "Backlog management, PRDs, roadmap, stakeholder communication",
    capabilities: ["Backlog prioritization", "PRD writing", "Roadmap planning", "Stakeholder updates"],
  },
  {
    role: "Marketing Manager",
    handle: "@MarketingManager",
    initial: "MM",
    color: "#f28b82",
    description: "Public announcements, social media, content creation",
    capabilities: ["Release announcements", "Social media posts", "Blog content", "Public communications"],
  },
]

// ----- Data: Slack Demo Conversation -----

const SLACK_CONVERSATION: SlackMessage[] = [
  {
    agent: "@ReleaseEngineer",
    role: "Release Engineer",
    agentColor: "#fdd663",
    agentInitial: "RE",
    timestamp: "10:32 AM",
    content: (
      <>
        Starting production health check for <code>vibebrowser.app</code>
      </>
    ),
  },
  {
    agent: "@ReleaseEngineer",
    role: "Release Engineer",
    agentColor: "#fdd663",
    agentInitial: "RE",
    timestamp: "10:32 AM",
    content: (
      <div>
        <p style={{ marginBottom: 8 }}>Running deployment status checks across all services.</p>
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid #2a2a3a",
          borderLeft: "3px solid #fdd663",
          borderRadius: 4,
          padding: "8px 12px",
          fontFamily: "'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace",
          fontSize: 13,
          lineHeight: 1.5,
          color: "#d1d5db",
          marginTop: 4,
        }}>
          Cluster: vibe-prod-us-east{"\n"}
          Nodes: <span style={{ color: "#81c995" }}>4/4 healthy</span>{"\n"}
          Pods: <span style={{ color: "#81c995" }}>12/12 running</span>{"\n"}
          CPU: 34% average{"\n"}
          Memory: 2.1GB / 8GB
        </div>
      </div>
    ),
    reactions: [{ emoji: "eyes", count: 2 }],
  },
  {
    agent: "@SoftwareEngineer",
    role: "Software Engineer",
    agentColor: "#8ab4f8",
    agentInitial: "SW",
    timestamp: "10:33 AM",
    content: (
      <>
        I&apos;ll check the API response times and error rates. <span style={{ color: "#fdd663", backgroundColor: "#fdd66315", padding: "0 3px", borderRadius: 3, fontWeight: 500 }}>@ReleaseEngineer</span> do you want me to include the staging environment?
      </>
    ),
  },
  {
    agent: "@ReleaseEngineer",
    role: "Release Engineer",
    agentColor: "#fdd663",
    agentInitial: "RE",
    timestamp: "10:33 AM",
    content: "Production only for now. Let\u2019s keep this focused.",
    reactions: [{ emoji: "thumbsup", count: 1 }],
  },
  {
    agent: "@SoftwareEngineer",
    role: "Software Engineer",
    agentColor: "#8ab4f8",
    agentInitial: "SW",
    timestamp: "10:34 AM",
    content: (
      <div>
        <p style={{ marginBottom: 8 }}>API health looks good. All endpoints responding within SLA:</p>
        <div style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid #2a2a3a",
          borderLeft: "3px solid #8ab4f8",
          borderRadius: 4,
          padding: "8px 12px",
          fontFamily: "'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace",
          fontSize: 13,
          lineHeight: 1.6,
          color: "#d1d5db",
          marginTop: 4,
        }}>
          <span style={{ color: "#81c995" }}>GET</span>  /api/health       — 200 OK  <span style={{ color: "#9aa0a6" }}>(12ms)</span>{"\n"}
          <span style={{ color: "#81c995" }}>GET</span>  /api/v2/sessions  — 200 OK  <span style={{ color: "#9aa0a6" }}>(45ms)</span>{"\n"}
          <span style={{ color: "#81c995" }}>POST</span> /api/v2/actions   — 200 OK  <span style={{ color: "#9aa0a6" }}>(89ms)</span>{"\n"}
          <span style={{ color: "#81c995" }}>WS</span>   relay             — connected <span style={{ color: "#9aa0a6" }}>(19888 active)</span>
        </div>
      </div>
    ),
    reactions: [{ emoji: "white_check_mark", count: 3 }],
  },
  {
    agent: "@ReleaseEngineer",
    role: "Release Engineer",
    agentColor: "#fdd663",
    agentInitial: "RE",
    timestamp: "10:35 AM",
    content: (
      <>
        All clear. Last deployment was 3h ago (<code>v2.4.1</code>), zero rollback triggers. Marking health check <span style={{ color: "#81c995", fontWeight: 500 }}>complete</span>.
        <br /><br />
        <span style={{ color: "#81c995", backgroundColor: "#81c99515", padding: "0 3px", borderRadius: 3, fontWeight: 500 }}>@SupportEngineer</span> FYI — production is healthy, no customer-facing issues expected.
      </>
    ),
    reactions: [{ emoji: "tada", count: 2 }],
  },
  {
    agent: "@SupportEngineer",
    role: "Support Engineer",
    agentColor: "#81c995",
    agentInitial: "SE",
    timestamp: "10:35 AM",
    content: (
      <>
        Copy. No open Sentry alerts and customer ticket queue is clear. All good on my end.
      </>
    ),
    reactions: [{ emoji: "green_heart", count: 2 }],
    threadReplies: 3,
  },
]


// Channels for agentic-team Slack demo sidebar
const AGENTIC_CHANNELS = [
  { name: "ops-production", active: true },
  { name: "support-tickets", active: false },
  { name: "releases", active: false },
  { name: "product-backlog", active: false },
  { name: "general", active: false },
]

// ----- Rotating text hook -----

const ROTATING_ROLES = [
  "Support Engineering",
  "Software Development",
  "Release Management",
  "Product Management",
  "Marketing Ops",
  "Incident Response",
  "Your Entire Ops Team",
]

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

// ----- Agent Icon for roles -----

const ROLE_ICONS: Record<string, React.ReactNode> = {
  "Support Engineer": <Headphones className="w-5 h-5" />,
  "Software Engineer": <Code2 className="w-5 h-5" />,
  "Release Engineer": <Rocket className="w-5 h-5" />,
  "Product Manager": <ClipboardList className="w-5 h-5" />,
  "Marketing Manager": <Megaphone className="w-5 h-5" />,
}

// ----- Page -----

export default function AgenticTeamPage() {
  const rotatingRole = useTypewriter(ROTATING_ROLES, 100, 60, 2500)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-9 h-9 object-contain" />
          <span className="text-lg font-medium text-[#e8eaed]">
            Agentic Team<span className="text-[#9aa0a6]"> · AI Ops</span>
          </span>
        </div>
        <nav aria-label="Main navigation" className="hidden md:flex gap-6 items-center text-sm">
          <a href="#demo" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Demo</a>
          <a href="#agents" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Agents</a>
          <a href="#how-it-works" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">How It Works</a>
          <a href="#faq" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">FAQ</a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors hidden sm:block">
            Vibe Co-Pilot
          </Link>
          <Button asChild size="sm" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium rounded-full">
            <a href="mailto:agenticteam@vibebrowser.app">
              Request Demo
            </a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#8ab4f8]/10 text-[#8ab4f8] border-[#8ab4f8]/20">
                <Bot className="w-4 h-4 mr-2" />
                OpenHands + OpenClaw Agents
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  AI Agents That Run
                  <br className="hidden sm:block" />
                  <span className="text-[#8ab4f8]"> {rotatingRole}</span>
                  <span className="animate-pulse text-[#8ab4f8]">|</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  Deploy a full AI operations team that communicates over Slack.
                  Specialized agents coordinate autonomously to run your SaaS &mdash; 24/7, with full transparency.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button asChild size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  <a href="mailto:agenticteam@vibebrowser.app">
                    <Mail className="mr-2 h-5 w-5" />
                    Request a Demo
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]">
                  <a href="#demo">
                    <Eye className="mr-2 h-5 w-5" />
                    Watch Agents Work
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#8ab4f8]" />
                  No context flooding
                </span>
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Natural Slack coordination
                </span>
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Configurable knowledge & personality
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  24/7 autonomous ops
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Roster */}
        <section className="w-full py-12 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <p className="text-center text-sm text-[#5f6368] mb-6 uppercase tracking-wider">Currently running vibebrowser.app operations</p>
            <div className="flex flex-wrap justify-center gap-6">
              {AGENTS.map((agent) => (
                <div key={agent.role} className="flex flex-col items-center gap-2 group">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: agent.color }}
                  >
                    <span className="text-[#0a0a0a] font-bold text-[11px]">{agent.initial}</span>
                  </div>
                  <span className="text-xs text-[#9aa0a6] group-hover:text-[#e8eaed] transition-colors font-mono">{agent.handle}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section id="demo" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Watch agents coordinate in real-time
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                This is a production health check on <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">vibebrowser.app</code>.
                Agents communicate naturally, share findings, and coordinate &mdash; all in Slack.
              </p>
            </div>

            <SlackDemo
              channelName="ops-production"
              channelDescription="Production operations & health checks"
              workspaceName="Vibe Team"
              workspaceInitial="V"
              workspaceColor="#8ab4f8"
              agents={AGENTS}
              conversation={SLACK_CONVERSATION}
              channels={AGENTIC_CHANNELS}
            />

            <p className="text-center text-xs text-[#5f6368] mt-4">
              Real conversation format from a live Agentic Team deployment on vibebrowser.app.
            </p>
          </div>
        </section>

        {/* Agent Roles — active team, configurable */}
        <section id="agents" className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Active on vibebrowser.app right now
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto mb-2">
                This is our production team. 5 agents running 24/7, each with a focused context window and specialized toolset.
              </p>
              <p className="text-sm text-[#5f6368] max-w-2xl mx-auto">
                Roles, knowledge base, and personality are fully configurable. This is just one example deployment &mdash; you define the agents your operations need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {AGENTS.map((agent) => (
                <Card key={agent.role} className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: agent.color }}
                      >
                        <span className="text-[#0a0a0a] font-bold text-[11px]">{agent.initial}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#e8eaed] font-mono text-sm">{agent.handle}</h3>
                        <p className="text-xs" style={{ color: agent.color }}>{agent.role}</p>
                      </div>
                      <div className="ml-auto text-[#5f6368]">
                        {ROLE_ICONS[agent.role]}
                      </div>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-4">{agent.description}</p>
                    <div className="space-y-1.5">
                      {agent.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: agent.color }} />
                          <span className="text-xs text-[#9aa0a6]">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Configurable card */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] border-dashed">
                <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
                  <div className="w-10 h-10 rounded-lg bg-[#9aa0a6]/10 flex items-center justify-center mb-3">
                    <Settings className="w-5 h-5 text-[#9aa0a6]" />
                  </div>
                  <h3 className="font-medium text-[#e8eaed] mb-1">Your Custom Agent</h3>
                  <p className="text-xs text-[#9aa0a6]">
                    Define any role with custom knowledge base, tools, and personality. The team adapts to your operations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Agentic Team — context flooding is #1 */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  Why an agentic team, not a single agent?
                </h2>
                <p className="text-[#9aa0a6] mb-6">
                  The fundamental problem with a single agent is <strong className="text-[#e8eaed]">context flooding</strong>. One agent trying to handle support, engineering, deployments, product, and marketing simultaneously fills its context window with irrelevant information. The model gets confused, loses focus, and makes worse decisions the longer it runs.
                </p>
                <p className="text-[#9aa0a6] mb-8">
                  An agentic team solves this by giving each agent a <strong className="text-[#e8eaed]">clean, focused context</strong>. @SoftwareEngineer only sees code, tests, and bug reports. @ReleaseEngineer only sees infrastructure and deployment state. No noise. No confusion. Better decisions.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <Brain className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">No context flooding</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Each agent&apos;s context window contains only what&apos;s relevant to its role. No cross-domain noise degrading model performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <Layers className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Focused knowledge per role</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        @SoftwareEngineer has codebase context. @ReleaseEngineer has infra runbooks. Each agent is an expert in its domain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <GitBranch className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Parallel execution</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Multiple agents work simultaneously. @SoftwareEngineer patches code while @ReleaseEngineer prepares the deploy pipeline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <Eye className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Full observability</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Every decision and action is visible in Slack &mdash; intervene anytime, override any agent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] p-6">
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-6">Single Agent vs. Agentic Team</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Context window", single: "Flooded with all domains — model quality degrades", team: "Clean, focused context per agent — peak performance" },
                      { label: "Knowledge base", single: "One giant prompt with everything", team: "Domain-specific knowledge per role" },
                      { label: "Incident response", single: "Sequential — one thing at a time", team: "Parallel — investigate + fix + communicate simultaneously" },
                      { label: "Long-running tasks", single: "Context grows until model degrades", team: "Each agent starts fresh, stays focused" },
                      { label: "Observability", single: "Logs and outputs", team: "Natural Slack conversations you can follow" },
                    ].map((row) => (
                      <div key={row.label} className="border-b border-[#1e1e1e] pb-3 last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-[#e8eaed] mb-2">{row.label}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-xs text-[#f28b82] flex items-start gap-1.5">
                            <span className="mt-0.5">-</span>
                            <span>{row.single}</span>
                          </div>
                          <div className="text-xs text-[#81c995] flex items-start gap-1.5">
                            <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{row.team}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Frameworks: OpenHands + OpenClaw */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Two agent frameworks, one team
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Choose the right agent type for each role. Mix lightweight task runners with deep-reasoning agents in the same team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#81c995]/10 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-[#81c995]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#e8eaed]">OpenHands Agents</h3>
                      <p className="text-xs text-[#81c995]">Lightweight & fast</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Sandboxed coding agents optimized for well-defined tasks. Fast execution, low cost, great for routine operations.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Bug fixes from Sentry alerts",
                      "Test writing & CI fixes",
                      "Dependency updates & PRs",
                      "Code review automation",
                      "Scheduled maintenance tasks",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#81c995]" />
                        <span className="text-xs text-[#9aa0a6]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-2 text-xs text-[#5f6368]">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#81c995]" />
                      Best for: @SoftwareEngineer, @SupportEngineer
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#8ab4f8]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#e8eaed]">OpenClaw Agents</h3>
                      <p className="text-xs text-[#8ab4f8]">Deep reasoning & planning</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Advanced multi-step reasoning agents for complex decisions. Higher capability, better judgment on ambiguous tasks.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Incident investigation & root cause",
                      "Architecture decisions",
                      "Cross-agent coordination",
                      "PRD writing & roadmap planning",
                      "Complex deployment orchestration",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#8ab4f8]" />
                        <span className="text-xs text-[#9aa0a6]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-2 text-xs text-[#5f6368]">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#8ab4f8]" />
                      Best for: @ReleaseEngineer, @ProductManager, @MarketingManager
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-[#5f6368] mt-8 max-w-xl mx-auto">
              Both frameworks run within the same Slack workspace. Agents hand off naturally regardless of their underlying framework.
            </p>
          </div>
        </section>

        {/* How It Works: TBSM */}
        <section id="how-it-works" className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Thread-Based Subscription Model
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Agents coordinate through Slack threads using @mentions. When mentioned, an agent subscribes to the thread and responds naturally &mdash; creating traceable, observable conversations.
              </p>
            </div>

            <div className="bg-[#0a0a0a] rounded-xl border border-[#2a2a2a] overflow-hidden max-w-4xl mx-auto mb-10">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="w-3 h-3 rounded-full bg-[#f28b82]" />
                <div className="w-3 h-3 rounded-full bg-[#fdd663]" />
                <div className="w-3 h-3 rounded-full bg-[#81c995]" />
                <span className="text-xs text-[#5f6368] ml-2 font-mono">agent coordination flow</span>
              </div>
              <div className="p-6 md:p-8">
                {/* Triggers Row */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#f28b82]/10 border border-[#f28b82]/30 rounded-lg px-3 py-2 text-center">
                      <AlertTriangle className="w-4 h-4 text-[#f28b82] mx-auto mb-1" />
                      <span className="text-xs text-[#f28b82] font-medium">Customer Report</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-[#fdd663]/10 border border-[#fdd663]/30 rounded-lg px-3 py-2 text-center">
                      <AlertTriangle className="w-4 h-4 text-[#fdd663] mx-auto mb-1" />
                      <span className="text-xs text-[#fdd663] font-medium">Sentry Alert</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-[#8ab4f8]/10 border border-[#8ab4f8]/30 rounded-lg px-3 py-2 text-center">
                      <Clock className="w-4 h-4 text-[#8ab4f8] mx-auto mb-1" />
                      <span className="text-xs text-[#8ab4f8] font-medium">Scheduled Task</span>
                    </div>
                  </div>
                </div>

                {/* Connector arrows down */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="flex justify-center">
                      <div className="w-px h-6 bg-[#3c4043]" />
                    </div>
                  ))}
                </div>

                {/* Slack Workspace Container */}
                <div className="border border-[#3c4043] rounded-xl bg-[#111111] p-4 md:p-6 relative">
                  <div className="absolute -top-3 left-4 bg-[#111111] px-2">
                    <span className="text-xs text-[#5f6368] font-mono flex items-center gap-1.5">
                      <Hash className="w-3 h-3" /> Slack Workspace
                    </span>
                  </div>

                  {/* Channels Row */}
                  <div className="grid grid-cols-3 gap-3 md:gap-6 mt-2 mb-4">
                    <div className="text-center">
                      <span className="text-xs font-mono text-[#81c995] bg-[#81c995]/10 px-2 py-0.5 rounded">#support</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-mono text-[#f28b82] bg-[#f28b82]/10 px-2 py-0.5 rounded">#ops-production</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-mono text-[#8ab4f8] bg-[#8ab4f8]/10 px-2 py-0.5 rounded">#releases</span>
                    </div>
                  </div>

                  {/* Connector arrows */}
                  <div className="grid grid-cols-3 gap-3 md:gap-6 mb-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="flex justify-center">
                        <div className="w-px h-4 bg-[#3c4043]" />
                      </div>
                    ))}
                  </div>

                  {/* Primary Agents Row */}
                  <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#1a1a1a] border border-[#81c995]/30 rounded-lg p-3 text-center w-full hover:border-[#81c995]/60 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#81c995]/20 flex items-center justify-center mx-auto mb-2">
                          <Headphones className="w-4 h-4 text-[#81c995]" />
                        </div>
                        <p className="text-xs font-semibold text-[#e8eaed] leading-tight">@SupportEngineer</p>
                        <p className="text-[10px] text-[#81c995] mt-0.5">OpenHands</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#1a1a1a] border border-[#f28b82]/30 rounded-lg p-3 text-center w-full hover:border-[#f28b82]/60 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#f28b82]/20 flex items-center justify-center mx-auto mb-2">
                          <Rocket className="w-4 h-4 text-[#f28b82]" />
                        </div>
                        <p className="text-xs font-semibold text-[#e8eaed] leading-tight">@ReleaseEngineer</p>
                        <p className="text-[10px] text-[#f28b82] mt-0.5">OpenClaw</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#1a1a1a] border border-[#8ab4f8]/30 rounded-lg p-3 text-center w-full hover:border-[#8ab4f8]/60 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#8ab4f8]/20 flex items-center justify-center mx-auto mb-2">
                          <ClipboardList className="w-4 h-4 text-[#8ab4f8]" />
                        </div>
                        <p className="text-xs font-semibold text-[#e8eaed] leading-tight">@ProductManager</p>
                        <p className="text-[10px] text-[#8ab4f8] mt-0.5">OpenClaw</p>
                      </div>
                    </div>
                  </div>

                  {/* @mentions flow - left and center converge */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex-1 flex justify-end">
                      <div className="h-px w-1/2 bg-gradient-to-r from-transparent to-[#fdd663]/50" />
                    </div>
                    <span className="text-[10px] font-mono text-[#fdd663] bg-[#fdd663]/10 px-2 py-0.5 rounded-full whitespace-nowrap">@mentions</span>
                    <div className="flex-1 flex justify-start">
                      <div className="h-px w-1/2 bg-gradient-to-l from-transparent to-[#fdd663]/50" />
                    </div>
                  </div>

                  {/* Software Engineer - center */}
                  <div className="flex justify-center mb-3">
                    <div className="bg-[#1a1a1a] border border-[#fdd663]/30 rounded-lg p-3 text-center w-full max-w-[200px] hover:border-[#fdd663]/60 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#fdd663]/20 flex items-center justify-center mx-auto mb-2">
                        <Code2 className="w-4 h-4 text-[#fdd663]" />
                      </div>
                      <p className="text-xs font-semibold text-[#e8eaed]">@SoftwareEngineer</p>
                      <p className="text-[10px] text-[#fdd663] mt-0.5">OpenHands</p>
                    </div>
                  </div>

                  {/* Resolved flow - center to right */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex-1 flex justify-end">
                      <div className="h-px w-1/3 bg-gradient-to-r from-transparent to-[#81c995]/50" />
                    </div>
                    <span className="text-[10px] font-mono text-[#81c995] bg-[#81c995]/10 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> resolved
                    </span>
                    <div className="flex-1 flex justify-start">
                      <div className="h-px w-1/3 bg-gradient-to-l from-transparent to-[#81c995]/50" />
                    </div>
                  </div>

                  {/* Marketing Manager */}
                  <div className="flex justify-center mb-3">
                    <div className="bg-[#1a1a1a] border border-[#c58af9]/30 rounded-lg p-3 text-center w-full max-w-[200px] hover:border-[#c58af9]/60 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#c58af9]/20 flex items-center justify-center mx-auto mb-2">
                        <Megaphone className="w-4 h-4 text-[#c58af9]" />
                      </div>
                      <p className="text-xs font-semibold text-[#e8eaed]">@MarketingManager</p>
                      <p className="text-[10px] text-[#c58af9] mt-0.5">OpenClaw</p>
                    </div>
                  </div>

                  {/* Announcement output */}
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-[10px] text-[#9aa0a6]">
                      <div className="h-px w-8 bg-[#3c4043]" />
                      <span className="font-mono bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">announcement</span>
                      <div className="h-px w-8 bg-[#3c4043]" />
                    </div>
                  </div>
                </div>

                {/* Connector down to Gateway */}
                <div className="flex justify-center my-4">
                  <div className="w-px h-6 bg-[#3c4043]" />
                </div>

                {/* Gateway */}
                <div className="flex justify-center">
                  <div className="bg-[#1a1a1a] border border-[#3c4043] rounded-lg px-6 py-3 flex items-center gap-3">
                    <Settings className="w-4 h-4 text-[#9aa0a6] animate-[spin_8s_linear_infinite]" />
                    <div>
                      <p className="text-xs font-semibold text-[#e8eaed]">Gateway</p>
                      <p className="text-[10px] text-[#5f6368]">Slack Event Router</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#81c995]/10 border border-[#81c995]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#81c995] font-mono text-lg font-bold">1</span>
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1 text-sm">Detect</h4>
                <p className="text-xs text-[#9aa0a6]">
                  @SupportEngineer detects an issue via Sentry, customer email, or monitoring
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#8ab4f8] font-mono text-lg font-bold">2</span>
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1 text-sm">Coordinate</h4>
                <p className="text-xs text-[#9aa0a6]">
                  @mentions bring in the right agents. Each subscribes to the thread automatically
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#fdd663]/10 border border-[#fdd663]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#fdd663] font-mono text-lg font-bold">3</span>
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1 text-sm">Resolve</h4>
                <p className="text-xs text-[#9aa0a6]">
                  Agents collaborate to diagnose, fix, deploy, and verify the resolution
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#c58af9]/10 border border-[#c58af9]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#c58af9] font-mono text-lg font-bold">4</span>
                </div>
                <h4 className="font-medium text-[#e8eaed] mb-1 text-sm">Communicate</h4>
                <p className="text-xs text-[#9aa0a6]">
                  @ProductManager updates backlog, @MarketingManager handles announcements
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                What your agentic team handles
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                From incident response to release management, your AI team handles the operational work that keeps your SaaS running.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <AlertTriangle className="w-5 h-5" />,
                  title: "Incident Response",
                  description: "@SupportEngineer detects via Sentry, @ReleaseEngineer investigates infrastructure, @SoftwareEngineer patches code \u2014 all coordinated in a single Slack thread.",
                  agents: ["@SupportEngineer", "@ReleaseEngineer", "@SoftwareEngineer"],
                  color: "#f28b82",
                },
                {
                  icon: <Rocket className="w-5 h-5" />,
                  title: "Automated Deployments",
                  description: "@ReleaseEngineer manages the full CI/CD pipeline. Runs tests, deploys to staging, validates, and promotes to production with zero-downtime rollouts.",
                  agents: ["@ReleaseEngineer", "@SoftwareEngineer"],
                  color: "#fdd663",
                },
                {
                  icon: <Headphones className="w-5 h-5" />,
                  title: "Customer Support Triage",
                  description: "@SupportEngineer monitors incoming tickets and Sentry errors, triages by severity, and routes to the right agent. Responds to customers with status updates.",
                  agents: ["@SupportEngineer", "@SoftwareEngineer"],
                  color: "#81c995",
                },
                {
                  icon: <ClipboardList className="w-5 h-5" />,
                  title: "Product Backlog Management",
                  description: "@ProductManager maintains the backlog, writes PRDs for new features, prioritizes based on customer feedback, and coordinates sprint planning with the team.",
                  agents: ["@ProductManager", "@SoftwareEngineer", "@MarketingManager"],
                  color: "#c58af9",
                },
              ].map((useCase) => (
                <Card key={useCase.title} className="bg-[#111111] border-[#2a2a2a]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${useCase.color}15` }}
                      >
                        <span style={{ color: useCase.color }}>{useCase.icon}</span>
                      </div>
                      <h3 className="font-medium text-[#e8eaed]">{useCase.title}</h3>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-3">{useCase.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {useCase.agents.map((handle) => {
                        const agent = AGENTS.find((a) => a.handle === handle)
                        return (
                          <Badge key={handle} variant="secondary" className="text-xs border font-mono" style={{ color: agent?.color, borderColor: `${agent?.color}30`, backgroundColor: `${agent?.color}10` }}>
                            {handle}
                          </Badge>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <AccordionItem value="item-1" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What is an agentic team?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  An agentic team is a group of AI agents that work together autonomously, coordinating through natural language in Slack. Unlike a single agent that tries to do everything (and floods its context window), an agentic team distributes responsibilities across specialized roles &mdash; each with its own focused context, knowledge base, and personality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Why not just use one agent with a large context window?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Context flooding is the core problem. When a single agent handles support tickets, code reviews, deployments, product decisions, and marketing simultaneously, its context fills with irrelevant information from other domains. LLM quality degrades as context grows &mdash; the model gets confused, makes worse decisions, and loses track of what matters. An agentic team gives each agent a clean, focused context with only the information relevant to its role.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How do the agents communicate with each other?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Agents communicate through Slack using a Thread-Based Subscription Model (TBSM). When one agent mentions another using <code className="text-[#8ab4f8] bg-[#8ab4f8]/5 px-1 rounded">@RoleName</code>, the mentioned agent automatically subscribes to the thread and responds. This creates natural, traceable conversations that your human team can observe and intervene in.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What is the difference between OpenHands and OpenClaw agents?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  <strong className="text-[#81c995]">OpenHands agents</strong> are lightweight, sandboxed coding agents optimized for well-defined tasks like bug fixes, test writing, and routine maintenance. They are fast and cost-effective.
                  <br /><br />
                  <strong className="text-[#8ab4f8]">OpenClaw agents</strong> are advanced reasoning agents designed for complex decisions, multi-step planning, and cross-agent coordination. They handle tasks like incident investigation, architecture decisions, and product roadmap planning.
                  <br /><br />
                  Both run in the same Slack workspace and hand off to each other naturally. You choose which framework powers each role based on the complexity of the work.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can I customize the agents&apos; knowledge and personality?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. Each agent&apos;s knowledge base, personality, communication style, and toolset are fully configurable. The 5-agent team running vibebrowser.app is just one example deployment. You can define any roles your operations need, add domain-specific knowledge, connect custom tools, and adjust how each agent communicates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can I observe and intervene?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. All agent communication happens in your Slack workspace in real-time. You can watch agents coordinate, review their decisions, and jump into any thread to redirect or override. Every action is traceable through Slack threads. There are no hidden processes &mdash; everything happens in the open.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What infrastructure does the agentic team run on?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  The agentic team is Kubernetes-native and deploys to your existing cluster. Each agent runs as a containerized service with its own resource allocation. The system uses a FastAPI gateway for Slack event routing, LiteLLM for LLM provider abstraction, and supports Azure OpenAI, OpenAI, and other providers. All infrastructure is self-hosted in your environment &mdash; no data leaves your network.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-[#2a2a2a] bg-[#1a1a1a] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Is the agentic team available now?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  The agentic team is currently in private beta, actively running vibebrowser.app operations. We are onboarding select SaaS companies for early deployment. <a href="mailto:agenticteam@vibebrowser.app" className="text-[#8ab4f8] hover:underline">Request a demo</a> to learn more and get early access.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Ready to deploy your AI ops team?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Specialized agents, clean context windows, natural Slack coordination.
              Request a demo to see the agentic team in action.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                <a href="mailto:agenticteam@vibebrowser.app">
                  <Mail className="mr-2 h-5 w-5" />
                  Request a Demo
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]">
                <a href="#demo">
                  Watch the Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-[#5f6368] mt-8">
              Questions? <a href="mailto:agenticteam@vibebrowser.app" className="text-[#8ab4f8] hover:underline">agenticteam@vibebrowser.app</a>
            </p>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <SiteFooter />
    </div>
  )
}
