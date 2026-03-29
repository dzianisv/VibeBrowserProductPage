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
  UserCheck,
  Search,
  FileText,
  BarChart3,
  Eye,
} from "lucide-react"

const ROTATING_TITLES = [
  "Digital Workforce",
  "Autonomous Teammate",
  "Virtual Employee",
  "Digital Colleague",
  "Virtual Teammate",
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
    icon: UserCheck,
    title: "Teammate, not tool",
    description: "Your digital employee has an identity, a role, and accountability. It's not a generic prompt — it's a dedicated teammate with a handle.",
    color: "#81c995",
  },
  {
    icon: Globe,
    title: "Works in your real browser",
    description: "Your digital employee operates in a real browser with your logged-in sessions, cookies, and extensions. No fake headless browsers.",
    color: "#8ab4f8",
  },
  {
    icon: Lock,
    title: "Scoped access, vault-backed",
    description: "Each digital employee gets only what it needs. Credentials stay in the vault, never exposed to the model. Risky actions require approval.",
    color: "#fdd663",
  },
  {
    icon: BarChart3,
    title: "Measurable productivity",
    description: "Track autonomy rate, tasks completed, escalation frequency. Your digital employee is an investment with visible returns.",
    color: "#c58af9",
  },
]

const ROLE_EXAMPLES = [
  {
    title: "Research Analyst",
    handle: "@ResearchAnalyst",
    color: "#c58af9",
    description: "Monitors markets, tracks competitors, compiles briefings, and surfaces insights before you even ask.",
    capabilities: ["Web research automation", "Competitor monitoring", "Briefing generation", "Data extraction"],
  },
  {
    title: "Account Manager",
    handle: "@AccountManager",
    color: "#8ab4f8",
    description: "Keeps track of client interactions, schedules follow-ups, updates CRM, and surfaces at-risk accounts.",
    capabilities: ["CRM hygiene", "Meeting scheduling", "Risk detection", "Activity logging"],
  },
  {
    title: "Operations Lead",
    handle: "@OpsLead",
    color: "#81c995",
    description: "Runs recurring workflows, reconciles data across portals, monitors dashboards, and alerts on anomalies.",
    capabilities: ["Workflow automation", "Data reconciliation", "Alert monitoring", "Report generation"],
  },
  {
    title: "Communications Lead",
    handle: "@CommsLead",
    color: "#fdd663",
    description: "Manages inbox triage, drafts responses, schedules meetings, and coordinates across stakeholders.",
    capabilities: ["Inbox management", "Draft responses", "Calendar coordination", "Stakeholder updates"],
  },
]

const COMPARISON_POINTS = [
  {
    label: "Has a named role and identity",
    vibe: true,
    generic: false,
    detail: "Your digital teammate has @handle, focused context, and explicit ownership. Generic AI is a faceless utility.",
  },
  {
    label: "Works in your real browser",
    vibe: true,
    generic: false,
    detail: "Your sessions, cookies, and logins are preserved. Generic AI needs fresh browser contexts each time.",
  },
  {
    label: "Scoped credential management",
    vibe: true,
    generic: false,
    detail: "Vault-backed secrets never reach the model. Generic AI often exposes credentials in prompts.",
  },
  {
    label: "Productivity metrics",
    vibe: true,
    generic: false,
    detail: "Track autonomy rate, tasks completed, and escalations. Generic AI offers no measurable productivity.",
  },
  {
    label: "Escalation with evidence",
    vibe: true,
    generic: false,
    detail: "When your digital teammate escalates, it brings screenshots, logs, and a recommendation — not a vague uncertainty.",
  },
]

const WORKFLOW_EXAMPLES = [
  {
    title: "Morning Intelligence Brief",
    description: "Your digital teammate scans relevant sources, compiles market updates, and delivers a briefing to your inbox before you're online.",
    surfaces: ["Browser", "Gmail", "Memory"],
  },
  {
    title: "Client Health Check",
    description: "Your digital teammate reviews account activity, identifies at-risk signals, and drafts preemptive outreach.",
    surfaces: ["CRM", "Browser", "Gmail"],
  },
  {
    title: "Data Reconciliation",
    description: "Your digital teammate compares data across portals, flags discrepancies, and generates reconciliation reports.",
    surfaces: ["Browser", "Slack", "Memory"],
  },
  {
    title: "Meeting Prep",
    description: "Your digital teammate researches attendees, finds context from past interactions, and prepares discussion points.",
    surfaces: ["Browser", "Calendar", "Gmail"],
  },
]

const FAQ_ITEMS = [
  {
    question: "What's the difference between a digital employee and an AI chatbot?",
    answer: "A chatbot is a utility — you prompt it, it responds. A digital employee is a teammate — it has a role, identity, memory, and works autonomously between prompts. It can access your tools, escalate with evidence, and build institutional knowledge.",
  },
  {
    question: "How is this different from hiring a human employee?",
    answer: "A digital employee costs a fraction (typically 10-20% of a human FTE), works 24/7, doesn't burn out on repetitive tasks, and scales instantly. It handles the high-volume, repetitive work that humans dread. You still own judgment, relationships, and exceptions.",
  },
  {
    question: "Can I have multiple digital employees?",
    answer: "Yes. You can deploy a digital workforce with multiple teammates, each with its own role, context, and tools. They can coordinate through Slack, share knowledge through a common memory, and escalate to you independently.",
  },
  {
    question: "Is this secure?",
    answer: "Security is foundational. Credentials are vault-backed and never exposed to the model. Each digital employee has scoped access — it can only do what you explicitly allow. External actions, sensitive data, and risky operations can require human approval before execution.",
  },
  {
    question: "How do I know it's actually working?",
    answer: "Every digital employee publishes a public scorecard: autonomy rate, tasks completed, success rate, and escalations. You see exactly what it did, when it escalated, and why. Productivity is measurable, not aspirational.",
  },
]

export default function DigitalEmployeePage() {
  const rotatingTitle = useTypewriter(ROTATING_TITLES, 100, 60, 2500)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#81c995]/10 text-[#81c995] border-[#81c995]/20">
                <UserCheck className="w-4 h-4 mr-2" />
                Digital Workforce Platform
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Your
                  <br className="hidden sm:block" />
                  <span className="text-[#81c995]"> {rotatingTitle}</span>
                  <span className="animate-pulse text-[#81c995]">|</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  Hire a digital teammate with a real role, real browser access, and real ownership.
                  It works autonomously, escalates with evidence, and builds institutional memory.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="mailto:digitalemployee@vibebrowser.app">
                  <Button size="lg" className="bg-[#81c995] hover:bg-[#a7d6b0] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                    <Users className="mr-2 h-5 w-5" />
                    Request Early Access
                  </Button>
                </Link>
                <Link href="/aiemployee">
                  <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#81c995]">
                    <Eye className="mr-2 h-5 w-5" />
                    See AI Employee Overview
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-sm text-[#5f6368]">Related:</span>
                <Link href="/aiemployee" className="text-sm text-[#81c995] hover:underline">
                  AI Employee
                </Link>
                <span className="text-[#2a2a2a]">|</span>
                <Link href="/aioutbound" className="text-sm text-[#81c995] hover:underline">
                  AI Outbound
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#81c995]" />
                  Named teammate identity
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Real browser sessions
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Vault-backed secrets
                </span>
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Productivity metrics
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Scoped permissions
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Digital Employees Different */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Why a digital teammate beats a generic assistant
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Most AI assistants are utilities — you prompt them, they respond. A digital employee is a teammate with identity, ownership, and measurable productivity.
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
                Digital teammates you can hire today
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Each digital employee comes with focused context, scoped tools, and measurable productivity. Not a generic prompt — a dedicated teammate.
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
                Digital Employee vs. Generic AI Assistant
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                The difference between a teammate and a utility.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-4 px-3 text-[#9aa0a6] font-medium">Capability</th>
                    <th className="text-center py-4 px-3 text-[#81c995] font-medium">Digital Employee</th>
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
                What your digital teammate actually does
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Real workflows, not hypotheticals. These are jobs digital employees handle today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {WORKFLOW_EXAMPLES.map((workflow) => (
                <Card key={workflow.title} className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#81c995]/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#81c995]" />
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
                <div className="text-3xl font-semibold text-[#81c995] mb-2">57%</div>
                <p className="text-sm text-[#9aa0a6]">Autonomy rate</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#8ab4f8] mb-2">12%</div>
                <p className="text-sm text-[#9aa0a6]">Escalation rate</p>
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
              Hire your first digital teammate
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Join the waitlist. We'll help you define the role, set up permissions, and get your digital employee working.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:digitalemployee@vibebrowser.app">
                <Button size="lg" className="bg-[#81c995] hover:bg-[#a7d6b0] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  <Users className="mr-2 h-5 w-5" />
                  Request Early Access
                </Button>
              </Link>
              <Link href="/aiemployee">
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#81c995]">
                  <Eye className="mr-2 h-5 w-5" />
                  AI Employee Overview
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8 pt-8 border-t border-[#1e1e1e]">
              <span className="text-sm text-[#5f6368]">Explore related concepts:</span>
              <Link href="/aiemployee" className="text-sm text-[#81c995] hover:underline">
                AI Employee
              </Link>
              <span className="text-[#2a2a2a]">|</span>
              <Link href="/aioutbound" className="text-sm text-[#81c995] hover:underline">
                AI Outbound Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
