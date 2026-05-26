"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Globe,
  Bot,
  MessageCircle,
  Users,
  Zap,
  Shield,
  ExternalLink,
  Code2,
  Cpu,
  Wrench,
  Lightbulb,
  Plug,
  Mail,
  Briefcase,
  TrendingUp,
  Network,
} from "lucide-react"
import Image from "next/image"

const ROTATING_WORDS = [
  "build AI agents",
  "automate the web",
  "ship agentic infra",
  "run AI hedge funds",
]

function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000
) {
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

const teamMembers = [
  {
    name: "Dzianis Vashchuk",
    role: "Founder",
    photo: "/images/dennis-vashchuk.jpg",
    linkedin: "https://www.linkedin.com/in/dzianisv/",
    icon: Code2,
    color: "#8ab4f8",
  },
  {
    name: "Dzmitry Dalenka",
    role: "ML Engineer",
    photo: "/images/dzmitry-dalenka.jpg",
    linkedin: "https://www.linkedin.com/in/dzmitry-dalenka/",
    icon: Cpu,
    color: "#81c995",
  },
  {
    name: "Dzmitry Kastsenich",
    role: "Software Engineer",
    photo: "/images/dima-kostenich.jpg",
    linkedin: "https://www.linkedin.com/in/dima-kostenich/",
    icon: Wrench,
    color: "#f6aea9",
  },
  {
    name: "Alexander Dzerakh",
    role: "Product Consultant",
    photo: "/images/alexander-dzerakh.jpg",
    linkedin: "https://www.linkedin.com/in/alexander-dzerakh",
    icon: Lightbulb,
    color: "#fdd663",
  },
]

const products = [
  {
    icon: Network,
    color: "#8ab4f8",
    name: "OpenClaw Infra",
    badge: "Agentic AI Platform",
    badgeBg: "#8ab4f8",
    description:
      "The backbone of our agentic AI stack. OpenClaw is a self-hosted multi-agent infrastructure platform that routes tasks across specialized AI agents, manages context windows, and connects to any tool via MCP. Powers our browser automation, hedge fund, and SaaS products.",
    tags: ["Multi-Agent", "MCP", "Self-Hosted", "Slack Integration", "Configurable Roles", "Open Source"],
    cta: { label: "OpenClaw Bot", href: "https://oclawbox.com", external: true, textColor: "#8ab4f8" },
  },
  {
    icon: TrendingUp,
    color: "#81c995",
    name: "QuantArena",
    badge: "AI-Native Hedge Fund",
    badgeBg: "#81c995",
    description:
      "AlphaVibe is our AI-native agentic hedge fund. QuantArena is its public leaderboard — a multi-model trading arena where AI strategies compete live. Tracks P&L charts, model rankings, and publishes results in real time.",
    tags: ["Live Leaderboard", "Multi-Model Arena", "P&L Charts", "Crypto Perps", "Agentic Trading"],
    cta: { label: "Visit quantarena.xyz", href: "https://quantarena.xyz", external: true, textColor: "#81c995" },
  },
  {
    icon: Globe,
    color: "#8ab4f8",
    name: "Vibe Browser Co-Pilot",
    badge: "Personal • Teams • Enterprise",
    badgeBg: "#8ab4f8",
    description:
      "AI-powered browser automation that works inside your real Chrome session. Tell it what you need in plain English — it navigates sites, fills forms, drafts messages, and researches across dozens of tabs. Available as Chrome extension or standalone browser.",
    tags: ["Chrome Extension", "Web Automation", "Any LLM", "Local AI", "TEE Security", "SSO"],
    cta: { label: "vibebrowser.app", href: "https://www.vibebrowser.app", external: true, textColor: "#8ab4f8" },
  },
  {
    icon: Users,
    color: "#81c995",
    name: "Vibe Agentic Team",
    badge: "Multi-Agent",
    badgeBg: "#81c995",
    description:
      "A team of specialized AI agents that collaborate over Slack. Each agent has its own role, tools, and context window — solving the #1 problem with single-agent systems: context flooding. Fully configurable roles for any workflow.",
    tags: ["Slack Integration", "OpenHands", "OpenClaw", "Configurable Roles"],
    cta: { label: "Learn More", href: "https://www.vibebrowser.app/agentic-team", external: true, textColor: "#81c995" },
  },
  {
    icon: Plug,
    color: "#c58af9",
    name: "Vibe Co-Pilot MCP",
    badge: "Open Source",
    badgeBg: "#c58af9",
    description:
      "Open-source MCP server with 25+ tools that connects AI coding agents to your real browser. Control Chrome, automate workflows, access Google Workspace, and manage credentials — all from Claude, Cursor, or VS Code.",
    tags: ["Open Source", "25+ Tools", "Multi-Agent", "Claude", "Cursor", "VS Code"],
    cta: { label: "GitHub", href: "https://github.com/VibeTechnologies/vibe-mcp", external: true, textColor: "#c58af9" },
  },
  {
    icon: Code2,
    color: "#f6aea9",
    name: "OpenCode Manager",
    badge: "Open Source • PWA",
    badgeBg: "#f6aea9",
    description:
      "Mobile-first web interface for OpenCode AI agents. Manage multiple agents from any device with Git integration, file management, and real-time chat in a responsive PWA. One-click deployment with Docker.",
    tags: ["Mobile-first", "Multi-Agent", "Git Integration", "File Manager", "Docker"],
    cta: { label: "View on GitHub", href: "https://github.com/dzianisv/opencode-manager", external: true, textColor: "#f6aea9" },
  },
]

export default function AgentLabsPage() {
  const rotatingWord = useTypewriter(ROTATING_WORDS, 100, 60, 2500)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#3c4043] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/60">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/vibebrowser-logo.png"
              alt="Agent Labs"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-[#e8eaed]">
              Agent Labs
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="https://www.vibebrowser.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              Vibe Browser
            </Link>
            <Link
              href="https://oclawbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              OpenClaw
            </Link>
            <Link
              href="https://quantarena.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              QuantArena
            </Link>
            <a
              href="mailto:info@vibebrowser.app"
              className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              Contact
            </a>
          </nav>
          <nav className="flex md:hidden gap-3">
            <Link
              href="https://www.vibebrowser.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              Vibe
            </Link>
            <Link
              href="https://oclawbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              OpenClaw
            </Link>
            <Link
              href="https://quantarena.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
            >
              QuantArena
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-20 md:py-32">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 rounded-full px-4 py-1.5 mb-8">
              <Bot className="w-4 h-4 text-[#8ab4f8]" />
              <span className="text-sm text-[#8ab4f8]">Vibe Technologies LLC</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              We{" "}
              <span className="text-[#8ab4f8]">{rotatingWord}</span>
              <span className="animate-pulse text-[#8ab4f8]">|</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#9aa0a6] mb-10">
              Agent Labs is the home of Vibe Technologies LLC — a team of engineers building agentic AI infrastructure, autonomous trading systems, and multi-agent browser automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://oclawbox.com" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-[#8ab4f8] text-[#0a0a0a] hover:bg-[#aecbfa] font-medium px-8 py-6 h-auto rounded-full"
                >
                  Explore OpenClaw
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#3c4043] bg-transparent hover:bg-[#1a1a1a] text-[#e8eaed] font-medium px-8 py-6 h-auto rounded-full"
              >
                <a href="mailto:info@vibebrowser.app">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-[#9aa0a6] leading-relaxed max-w-3xl mx-auto">
              We believe agentic AI will transform how software gets built, how markets are traded, and how work gets done. Agent Labs is where we ship that future — from self-hosted multi-agent infrastructure (OpenClaw) to AI-native hedge funds (AlphaVibe) to browser automation that works inside your real sessions. Every product keeps humans in control: agents propose, humans approve.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
              <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto">
                Agentic AI infrastructure, autonomous trading, and browser automation
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {products.map((product) => {
                const IconComponent = product.icon
                return (
                  <Card
                    key={product.name}
                    className="bg-[#1a1a1a] border-[#2a2a2a] transition-all duration-300"
                    style={{
                      ["--hover-border" as string]: product.color + "66",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = product.color + "66")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#2a2a2a")
                    }
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: product.color + "1a" }}
                        >
                          <IconComponent
                            className="w-6 h-6"
                            style={{ color: product.color }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#e8eaed]">
                            {product.name}
                          </h3>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              color: product.badgeBg,
                              backgroundColor: product.badgeBg + "1a",
                            }}
                          >
                            {product.badge}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#9aa0a6] mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {product.cta.external ? (
                        <a
                          href={product.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            className="border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] w-full"
                            style={{ color: product.cta.textColor }}
                          >
                            {product.cta.label}{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      ) : (
                        <Link href={product.cta.href}>
                          <Button
                            variant="outline"
                            className="border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] w-full"
                            style={{ color: product.cta.textColor }}
                          >
                            {product.cta.label}{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
              <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto">
                The humans behind the agents
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => {
                const IconComponent = member.icon
                return (
                  <div key={member.name} className="group text-center">
                    <div className="relative w-36 h-36 mx-auto mb-5 rounded-2xl overflow-hidden border-2 border-[#2a2a2a] group-hover:border-[#8ab4f8]/40 transition-all duration-300">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[#e8eaed] mb-1">
                      {member.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mb-3">
                      <IconComponent
                        className="w-3.5 h-3.5"
                        style={{ color: member.color }}
                      />
                      <span className="text-sm" style={{ color: member.color }}>
                        {member.role}
                      </span>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Build</h2>
              <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto">
                Principles behind every product we ship
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <Shield className="w-8 h-8 text-[#8ab4f8] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Local AI, TEE enclaves, and zero-knowledge architectures. Your data stays yours. We build for trust, not lock-in.
                </p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <Bot className="w-8 h-8 text-[#81c995] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Model Agnostic</h3>
                <p className="text-sm text-[#9aa0a6]">
                  Every product works with multiple AI providers. GPT, Claude, Gemini, Grok, DeepSeek — use what works best for your task and budget.
                </p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <Zap className="w-8 h-8 text-[#fdd663] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Human in the Loop</h3>
                <p className="text-sm text-[#9aa0a6]">
                  AI proposes, humans decide. Nothing is sent, submitted, or purchased without explicit approval. Automation with guardrails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Interested in agentic AI, OpenClaw, or partnering with us?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:info@vibebrowser.app"
                className="flex items-center gap-2 text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@vibebrowser.app
              </a>
              <a
                href="mailto:sales@vibebrowser.app"
                className="flex items-center gap-2 text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
              >
                <Briefcase className="w-5 h-5" />
                sales@vibebrowser.app
              </a>
              <a
                href="https://linkedin.com/company/vibebrowser"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://x.com/vibebrowserapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
              >
                X / Twitter
              </a>
              <a
                href="https://t.me/VibeBrowser"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#3c4043] bg-[#0a0a0a]">
        <div className="container max-w-5xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
            <div className="flex items-center gap-2">
              <img
                src="/vibebrowser-logo.png"
                alt="Agent Labs"
                className="w-6 h-6 object-contain"
              />
              <span>Agent Labs — Vibe Technologies LLC</span>
            </div>
            <p className="text-[#5f6368]">
              &copy; 2026 Vibe Technologies, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a
                href="https://linkedin.com/company/vibebrowser"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e8eaed] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/vibebrowserapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e8eaed] transition-colors"
              >
                X
              </a>
              <a
                href="mailto:info@vibebrowser.app"
                className="hover:text-[#e8eaed] transition-colors"
              >
                Contact
              </a>
              <a
                href="https://www.vibebrowser.app/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e8eaed] transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
