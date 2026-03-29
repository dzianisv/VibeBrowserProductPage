"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
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
import {
  ArrowRight,
  Bot,
  Users,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Brain,
  Globe,
  Mail,
  Calendar,
  Lock,
  GitBranch,
  Code2,
  Terminal,
  ChevronRight,
  Layers,
  Target,
  TrendingUp,
} from "lucide-react"

const ROTATING_TITLES = [
  "AI Employee",
  "Digital Employee",
  "Autonomous Teammate",
  "Virtual Worker",
  "AI Staff",
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

const DIFFERENTIATORS = [
  {
    icon: Globe,
    title: "Real browser, real work",
    description: "Your AI employee operates in a real browser with your logged-in sessions, cookies, and extensions intact. Not a fake headless browser.",
    color: "#8ab4f8",
  },
  {
    icon: Lock,
    title: "Scoped credentials, safe execution",
    description: "Give each AI employee only what it needs. Vault-backed passwords never reach the model. Approvals gate risky actions.",
    color: "#81c995",
  },
  {
    icon: Mail,
    title: "Inbox + calendar as first-class tools",
    description: "Gmail and Calendar work natively, not through fragile DOM clicking. Your AI employee can actually schedule and email reliably.",
    color: "#fdd663",
  },
  {
    icon: Brain,
    title: "Focused context per role",
    description: "No context flooding. Each AI employee gets exactly what it needs: codebase for engineers, inbox for support, portal for ops.",
    color: "#c58af9",
  },
]

const ROLE_EXAMPLES = [
  {
    title: "Support Rep",
    handle: "@SupportRep",
    color: "#81c995",
    description: "Triages tickets, verifies issues in the browser, drafts responses, escalates when needed.",
    capabilities: ["Ticket triage from Gmail", "Live browser repro", "Canned response drafting", "SLA monitoring"],
  },
  {
    title: "Sales Development",
    handle: "@SDR",
    color: "#8ab4f8",
    description: "Researches leads, enriches profiles, drafts outreach, books meetings on your calendar.",
    capabilities: ["Lead research", "Email sequence drafting", "Calendar hold booking", "CRM data entry"],
  },
  {
    title: "Research Analyst",
    handle: "@Researcher",
    color: "#c58af9",
    description: "Browses the web, extracts findings, compiles briefings, monitors competitors.",
    capabilities: ["Web research", "Data extraction", "Briefing generation", "Competitive monitoring"],
  },
  {
    title: "Operations Manager",
    handle: "@OpsManager",
    color: "#fdd663",
    description: "Runs recurring workflows, updates records, monitors dashboards, alerts on anomalies.",
    capabilities: ["Portal hygiene", "Data reconciliation", "Alert monitoring", "Report generation"],
  },
]

const COMPARISON_POINTS = [
  {
    label: "Uses your real browser session",
    vibe: true,
    generic: false,
    detail: "Vibe reuses your logged-in tabs, cookies, and extensions. Generic agents spin up isolated browsers that need fresh logins.",
  },
  {
    label: "Native Gmail + Calendar tools",
    vibe: true,
    generic: false,
    detail: "Vibe calls the API directly. Generic agents click through the UI, which breaks constantly.",
  },
  {
    label: "Vault-backed credentials",
    vibe: true,
    generic: false,
    detail: "Secrets stay hidden from the model. Generic agents often leak credentials in prompts.",
  },
  {
    label: "Role-scoped context",
    vibe: true,
    generic: "partial",
    detail: "Each AI employee gets focused context. Generic agents flood the context window with everything.",
  },
  {
    label: "Approval gates on risky actions",
    vibe: true,
    generic: false,
    detail: "Configurable guardrails let humans approve before external emails, payments, or deployments.",
  },
]

const WORKFLOW_EXAMPLES = [
  {
    title: "Morning Brief",
    description: "AI employee checks your inbox, reviews your calendar, researches meeting prep, and drafts your daily briefing — before you even log in.",
    surfaces: ["Gmail", "Calendar", "Browser", "Memory"],
  },
  {
    title: "Lead Follow-Up",
    description: "Inbound lead hits your site. AI employee researches the company, drafts personalized outreach, and books a hold on your calendar.",
    surfaces: ["Browser", "Gmail", "Calendar", "CRM"],
  },
  {
    title: "Support Triage",
    description: "Customer email arrives. AI employee reproduces the issue in the browser, drafts a response, and escalates only if it cannot resolve.",
    surfaces: ["Gmail", "Browser", "Knowledge Base"],
  },
  {
    title: "Recurring Ops",
    description: "Weekly portal reconciliation, dashboard monitoring, data hygiene. AI employee runs it on schedule and alerts on anomalies.",
    surfaces: ["Browser", "Slack", "Memory"],
  },
]

const FAQ_ITEMS = [
  {
    question: "What is an AI employee?",
    answer: "An AI employee is an autonomous agent with a defined role, scoped access to your tools (browser, inbox, calendar), and guardrails that keep it safe. Unlike a generic chatbot, it can actually do the job — not just talk about it.",
  },
  {
    question: "How is this different from Claude, GPT, or other chatbots?",
    answer: "Those are general-purpose assistants. Vibe AI employees are purpose-built for operational roles with real tool access: your logged-in browser, Gmail, Calendar, and vault-backed credentials. They work while you sleep.",
  },
  {
    question: "Can I limit what the AI employee can access?",
    answer: "Yes. Each role gets scoped credentials, approval rules, and confidence thresholds. Want your support AI to email customers but not access billing? Configure that. Approvals required for external sends? Configurable.",
  },
  {
    question: "Does this replace humans?",
    answer: "AI employees handle the repetitive, high-volume work that burns out your team: inbox triage, lead research, portal hygiene. Humans stay for judgment, relationships, and exceptions. The math is usually 0.5-2 FTE returned, not a headcount replacement.",
  },
  {
    question: "What's the difference between this and /agentic-team?",
    answer: "/agentic-team shows how multiple AI agents coordinate in Slack with visible identities. This page focuses on the individual AI employee concept: one bot, one role, focused context. They are complementary — a team is just multiple AI employees working together.",
  },
]

export default function AIEmployeePage() {
  const rotatingTitle = useTypewriter(ROTATING_TITLES, 100, 60, 2500)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#8ab4f8]/10 text-[#8ab4f8] border-[#8ab4f8]/20">
                <Bot className="w-4 h-4 mr-2" />
                AI Employee Platform
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Your
                  <br className="hidden sm:block" />
                  <span className="text-[#8ab4f8]"> {rotatingTitle}</span>
                  <span className="animate-pulse text-[#8ab4f8]">|</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  Hire an AI employee with a real role, real browser access, and real tools.
                  It works while you sleep, escalates when it should, and never forgets what it learned.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="mailto:aiemployee@vibebrowser.app">
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                    <Users className="mr-2 h-5 w-5" />
                    Request Early Access
                  </Button>
                </Link>
                <Link href="/agentic-team">
                  <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]">
                    <Eye className="mr-2 h-5 w-5" />
                    See Agentic Team Demo
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8ab4f8]" />
                  Real browser sessions
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Native Gmail + Calendar
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Vault-backed secrets
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Approval guardrails
                </span>
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Focused role context
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Vibe Different */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Why an AI employee beats a generic chatbot
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Most AI assistants can talk. Vibe AI employees can actually do the work — with real tool access, scoped permissions, and operational memory.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {DIFFERENTIATORS.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title} className="bg-[#0a0a0a] border-[#2a2a2a]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                        <h3 className="text-lg font-medium text-[#e8eaed]">{item.title}</h3>
                      </div>
                      <p className="text-sm text-[#9aa0a6]">{item.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Role Examples */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Roles you can hire today
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Each AI employee comes with focused context, scoped tools, and the skills to do the job — not a generic prompt you have to micromanage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ROLE_EXAMPLES.map((role) => (
                <Card key={role.handle} className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: role.color }}
                      >
                        <Bot className="w-5 h-5 text-[#0a0a0a]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#e8eaed] font-mono text-sm">{role.handle}</h3>
                        <p className="text-xs" style={{ color: role.color }}>{role.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-4">{role.description}</p>
                    <div className="space-y-2">
                      {role.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: role.color }} />
                          <span className="text-xs text-[#9aa0a6]">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Vibe AI Employee vs. Generic AI Assistants
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                The difference between an AI that talks and an AI that works.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-4 px-3 text-[#9aa0a6] font-medium">Capability</th>
                    <th className="text-center py-4 px-3 text-[#8ab4f8] font-medium">Vibe AI Employee</th>
                    <th className="text-center py-4 px-3 text-[#9aa0a6] font-medium">Generic AI</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_POINTS.map((row, i) => (
                    <tr key={i} className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-3 px-3">
                        <span className="text-[#e8eaed]">{row.label}</span>
                        {row.detail && <p className="text-xs text-[#5f6368] mt-0.5">{row.detail}</p>}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {row.vibe === true ? (
                          <CheckCircle className="w-5 h-5 text-[#81c995] mx-auto" />
                        ) : row.vibe === false ? (
                          <span className="text-[#f28b82]">—</span>
                        ) : (
                          <span className="text-[#fdd663]">{row.vibe}</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center text-[#9aa0a6]">
                        {row.generic === true ? (
                          <CheckCircle className="w-5 h-5 text-[#81c995] mx-auto" />
                        ) : row.generic === false ? (
                          <span className="text-[#f28b82]">—</span>
                        ) : (
                          <span className="text-[#fdd663]">{row.generic}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Workflow Examples */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                What your AI employee actually does
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Real workflows, not hypotheticals. These are the jobs Vibe AI employees handle today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {WORKFLOW_EXAMPLES.map((workflow) => (
                <Card key={workflow.title} className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#8ab4f8]" />
                      </div>
                      <h3 className="text-lg font-medium text-[#e8eaed]">{workflow.title}</h3>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-4">{workflow.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.surfaces.map((surface) => (
                        <Badge key={surface} variant="secondary" className="bg-[#111111] text-[#9aa0a6] border-[#2a2a2a] text-xs">
                          {surface}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics / Results */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#8ab4f8] mb-2">57%</div>
                <p className="text-sm text-[#9aa0a6]">Tasks completed autonomously</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#81c995] mb-2">12%</div>
                <p className="text-sm text-[#9aa0a6]">Escalation rate to humans</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#fdd663] mb-2">162h</div>
                <p className="text-sm text-[#9aa0a6]">Human hours saved / month</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#c58af9] mb-2">93%</div>
                <p className="text-sm text-[#9aa0a6]">Task success rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                How to hire your first AI employee
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                From zero to operational in four steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Define the role",
                  description: "Choose Support, SDR, Researcher, or build your own with specific context and tools.",
                  icon: Code2,
                  color: "#8ab4f8",
                },
                {
                  step: "02",
                  title: "Scope access",
                  description: "Connect Gmail, Calendar, and browser. Set vault credentials. Define approval rules.",
                  icon: Lock,
                  color: "#81c995",
                },
                {
                  step: "03",
                  title: "Shadow mode",
                  description: "AI employee watches and suggests for a week. Approve or tune the guardrails.",
                  icon: Eye,
                  color: "#fdd663",
                },
                {
                  step: "04",
                  title: "Go live",
                  description: "Flip the switch. AI employee works autonomously. Escalate only when confidence is low.",
                  icon: Zap,
                  color: "#c58af9",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="text-xs text-[#5f6368] mb-2">{item.step}</div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9aa0a6]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Common questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-[#2a2a2a]">
                  <AccordionTrigger className="text-left text-[#e8eaed] hover:text-[#d8dcff]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-[#9aa0a6]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Hire your first AI employee
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Join the waitlist. We'll help you define the role, set up the guardrails, and get your AI employee working.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:aiemployee@vibebrowser.app">
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  <Users className="mr-2 h-5 w-5" />
                  Request Early Access
                </Button>
              </Link>
              <Link href="/mcp">
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#8ab4f8]">
                  <Terminal className="mr-2 h-5 w-5" />
                  Developer Setup
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

function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
