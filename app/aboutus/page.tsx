"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Bot, Building2, MessageCircle, Users, Zap, Shield, Linkedin, Code2, Cpu, Wrench, Lightbulb } from "lucide-react"
import Image from "next/image"

const ROTATING_WORDS = [
  "write code",
  "design AI systems",
  "ship products",
  "create AI agents",
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

export default function AboutUsPage() {
  const rotatingWord = useTypewriter(ROTATING_WORDS, 100, 60, 2500)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#3c4043] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/60">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/aboutus" className="flex items-center gap-3">
            <img src="/vibebrowser-logo.png" alt="Vibe Technologies" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-[#e8eaed]">
              Vibe Technologies
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Browser Co-Pilot
            </Link>
            <Link href="/agentic-team" className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Agentic Team
            </Link>
            <Link href="/v2" className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Enterprise
            </Link>
            <Link href="/teams" className="text-sm font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Team
            </Link>
          </nav>
          <nav className="flex md:hidden gap-3">
            <Link href="/" className="text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Co-Pilot
            </Link>
            <Link href="/agentic-team" className="text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Agentic
            </Link>
            <Link href="/v2" className="text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              Enterprise
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-20 md:py-32">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#8ab4f8]/10 border border-[#8ab4f8]/20 rounded-full px-4 py-1.5 mb-8">
              <Users className="w-4 h-4 text-[#8ab4f8]" />
              <span className="text-sm text-[#8ab4f8]">About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              We{" "}
              <span className="text-[#8ab4f8]">{rotatingWord}</span>
              <span className="animate-pulse text-[#8ab4f8]">|</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#9aa0a6] mb-10">
              A small team of engineers building AI tools that actually do the work. We automate the boring stuff so you can focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-[#8ab4f8] text-[#0a0a0a] hover:bg-[#aecbfa] font-medium px-8 py-6 h-auto rounded-full">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:info@vibebrowser.app">
                <Button size="lg" variant="outline" className="border-[#3c4043] bg-transparent hover:bg-[#1a1a1a] text-[#e8eaed] font-medium px-8 py-6 h-auto rounded-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-[#9aa0a6] leading-relaxed max-w-3xl mx-auto">
              Knowledge workers spend 28% of their workweek on repetitive browser tasks (McKinsey). We build AI agents that take over that work &mdash; browsing, clicking, filling forms, drafting messages &mdash; so humans focus on decisions, not mechanics. Every agent we ship keeps the human in control: nothing is sent, submitted, or purchased without your explicit approval.
            </p>
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
                    <h3 className="text-lg font-semibold text-[#e8eaed] mb-1">{member.name}</h3>
                    <div className="flex items-center justify-center gap-1.5 mb-3">
                      <IconComponent className="w-3.5 h-3.5" style={{ color: member.color }} />
                      <span className="text-sm" style={{ color: member.color }}>{member.role}</span>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
              <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto">
                A suite of AI agents for individuals, teams, and enterprises
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Vibe AI Browser Co-Pilot */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#8ab4f8]/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#8ab4f8]/10 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#8ab4f8]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#e8eaed]">Vibe AI Browser Co-Pilot</h3>
                      <span className="text-xs text-[#8ab4f8] bg-[#8ab4f8]/10 px-2 py-0.5 rounded-full">Flagship</span>
                    </div>
                  </div>
                  <p className="text-[#9aa0a6] mb-6 leading-relaxed">
                    Chrome extension that autonomously operates the web. Tell it what you need in plain English &mdash; it navigates sites, fills forms, drafts messages, and researches across dozens of tabs. Supports any LLM including fully local AI via Gemini Nano.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">LinkedIn Outreach</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Deep Research</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Web Automation</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Any LLM</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Local AI</span>
                  </div>
                  <Link href="/">
                    <Button variant="outline" className="border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] text-[#8ab4f8] w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Vibe Agentic Team */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#81c995]/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#81c995]/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#81c995]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#e8eaed]">Vibe Agentic Team</h3>
                      <span className="text-xs text-[#81c995] bg-[#81c995]/10 px-2 py-0.5 rounded-full">Multi-Agent</span>
                    </div>
                  </div>
                  <p className="text-[#9aa0a6] mb-6 leading-relaxed">
                    A team of specialized AI agents that collaborate over Slack. Each agent has its own role, tools, and context window &mdash; solving the #1 problem with single-agent systems: context flooding. Fully configurable roles for any workflow.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Slack Integration</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">OpenHands</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">OpenClaw</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Configurable Roles</span>
                  </div>
                  <Link href="/agentic-team">
                    <Button variant="outline" className="border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] text-[#81c995] w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Vibe for Enterprise */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#f6aea9]/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#f6aea9]/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#f6aea9]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#e8eaed]">Vibe for Enterprise</h3>
                      <span className="text-xs text-[#f6aea9] bg-[#f6aea9]/10 px-2 py-0.5 rounded-full">Enterprise</span>
                    </div>
                  </div>
                  <p className="text-[#9aa0a6] mb-6 leading-relaxed">
                    Enterprise-grade web automation with Trusted Execution Environment (TEE) security. Credentials never leave secure hardware enclaves. SOC 2 compliance path, SSO, audit logs, and dedicated support for regulated industries.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">TEE Security</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">SOC 2 Path</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">SSO</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Audit Logs</span>
                  </div>
                  <Link href="/v2">
                    <Button variant="outline" className="border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] text-[#f6aea9] w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* OClawBox Telegram Bot */}
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#fdd663]/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#fdd663]/10 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-[#fdd663]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#e8eaed]">OClawBox</h3>
                      <span className="text-xs text-[#fdd663] bg-[#fdd663]/10 px-2 py-0.5 rounded-full">Telegram Bot</span>
                    </div>
                  </div>
                  <p className="text-[#9aa0a6] mb-6 leading-relaxed">
                    AI-powered Telegram bot for task automation and intelligent conversations. Access powerful AI models directly from Telegram &mdash; research, summarize, translate, code, and more without leaving your chat.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Telegram</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Multi-Model</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Research</span>
                    <span className="text-xs bg-[#2a2a2a] text-[#9aa0a6] px-2 py-1 rounded">Code Generation</span>
                  </div>
                  <Link href="https://oclawbox.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] text-[#fdd663] w-full">
                      Visit oclawbox.com <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
                  Every product works with multiple AI providers. GPT, Claude, Gemini, Grok, DeepSeek &mdash; use what works best for your task and budget.
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

        {/* Contact CTA */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Building something that needs AI agents? Want to partner, invest, or just chat about the future of web automation?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:info@vibebrowser.app">
                <Button size="lg" className="bg-[#8ab4f8] text-[#0a0a0a] hover:bg-[#aecbfa] font-medium px-8 py-6 h-auto rounded-full">
                  info@vibebrowser.app
                </Button>
              </Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-[#3c4043] bg-transparent hover:bg-[#1a1a1a] text-[#e8eaed] font-medium px-8 py-6 h-auto rounded-full">
                  Telegram Community
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#3c4043] bg-[#0a0a0a]">
        <div className="container max-w-5xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe Technologies" className="w-6 h-6 object-contain" />
              <span>Vibe Technologies</span>
            </div>
            <p className="text-[#5f6368]">
              &copy; 2025 Vibe Technologies, LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-[#e8eaed] transition-colors">Browser</Link>
              <Link href="/agentic-team" className="hover:text-[#e8eaed] transition-colors">Agentic Team</Link>
              <Link href="/teams" className="hover:text-[#e8eaed] transition-colors">Team</Link>
              <Link href="/privacy" className="hover:text-[#e8eaed] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#e8eaed] transition-colors">Terms</Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8eaed] transition-colors">Telegram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
