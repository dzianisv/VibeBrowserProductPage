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
  Search,
  Send,
  UserPlus,
  FileText,
  BarChart3,
  Eye,
  MousePointerClick,
  RefreshCw,
} from "lucide-react"

const ROTATING_TITLES = [
  "Pipeline Generator",
  "Prospect Researcher",
  "Outbound Specialist",
  "SDR Automator",
  "Lead Enricher",
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

const CAPABILITIES = [
  {
    icon: Search,
    title: "Prospect research",
    description: "Your AI outbound teammate researches prospects in real browser — checks LinkedIn, reads company pages, finds recent news, and builds context.",
    color: "#8ab4f8",
  },
  {
    icon: UserPlus,
    title: "Lead enrichment",
    description: "Enriches profiles with firmographic data, technographic signals, and intent indicators. All pulled from live sources, not stale databases.",
    color: "#81c995",
  },
  {
    icon: FileText,
    title: "Personalized outreach",
    description: "Drafts highly personalized emails based on real research — not templates. Each message references specific context about the prospect.",
    color: "#fdd663",
  },
  {
    icon: RefreshCw,
    title: "Smart follow-up",
    description: "Follows up at optimal times, adapts messaging based on prospect behavior, and knows when to stop without burning the lead.",
    color: "#c58af9",
  },
  {
    icon: MousePointerClick,
    title: "Human handoff",
    description: "Hands qualified replies to you with full context, research summary, and recommended next step. You close, not the bot.",
    color: "#f28b82",
  },
]

const ROLE_EXAMPLES = [
  {
    title: "Inbound Lead Handler",
    handle: "@InboundSDR",
    color: "#81c995",
    description: "Responds to inbound leads within minutes with personalized research, qualifies urgency, and books meetings on your calendar.",
    capabilities: ["Instant lead research", "Qualification scoring", "Meeting booking", "CRM data entry"],
  },
  {
    title: "Outbound Prospector",
    handle: "@OutboundSDR",
    color: "#8ab4f8",
    description: "Builds target accounts lists, researches decision makers, and runs personalized outreach sequences at scale.",
    capabilities: ["Account research", "Decision maker mapping", "Sequence drafting", "Reply handling"],
  },
  {
    title: "Pipeline Warmer",
    handle: "@PipelineWarmer",
    color: "#fdd663",
    description: "Monitors existing opportunities, identifies re-engagement signals, and drafts personalized outreach to keep deals moving.",
    capabilities: ["Opportunity monitoring", "Signal detection", "Re-engagement drafts", "Meeting recovery"],
  },
  {
    title: "Event Lead Follow-up",
    handle: "@EventFollowUp",
    color: "#c58af9",
    description: "After events, researches attendees, scores fit, and runs personalized outreach to maximize event ROI.",
    capabilities: ["Attendee research", "Fit scoring", "Personalized sequences", "Meeting qualification"],
  },
]

const WORKFLOW_EXAMPLES = [
  {
    title: "Inbound Lead Response",
    description: "New lead hits your site. AI researches the company and prospect, scores fit, drafts personalized response, and books a meeting — all within 10 minutes.",
    steps: ["Lead arrives → Research → Score → Draft → Book"],
    metric: "85% faster response time",
  },
  {
    title: "Outbound Sequence",
    description: "You define target accounts. AI researches each prospect, finds trigger events, drafts personalized outreach, and manages the follow-up sequence.",
    steps: ["Target list → Research → Personalize → Send → Follow-up → Qualify"],
    metric: "3x more meetings booked",
  },
  {
    title: "Pipeline Re-engagement",
    description: "Stalled opportunity detected. AI researches recent company news, identifies re-engagement angle, drafts personalized outreach, and hands qualified replies to you.",
    steps: ["Signal detected → Research → Angle → Draft → Handoff"],
    metric: "23% of stalled deals reopened",
  },
]

const COMPARISON_POINTS = [
  {
    label: "Real-time prospect research",
    vibe: true,
    generic: false,
    detail: "Your AI outbound teammate researches in a real browser, checking current information — not stale database records.",
  },
  {
    label: "Personalized at scale",
    vibe: true,
    generic: false,
    detail: "Each message references real research. Generic tools use templates with simple name insertion.",
  },
  {
    label: "Human handoff with context",
    vibe: true,
    generic: false,
    detail: "Qualified replies come with full context, research summary, and recommended next step. You close the deal.",
  },
  {
    label: "Browser-based research",
    vibe: true,
    generic: false,
    detail: "Your AI can navigate LinkedIn, company sites, news, and tools directly. Generic tools rely on APIs that miss context.",
  },
  {
    label: "Optimal timing",
    vibe: true,
    generic: false,
    detail: "Your AI knows when to follow up based on prospect behavior, not arbitrary schedules.",
  },
]

const FAQ_ITEMS = [
  {
    question: "How is this different from outreach tools like Outreach.io or HubSpot?",
    answer: "Those tools manage sequences and templates. This is the actual worker doing the research, drafting, and follow-up. It researches each prospect in real browser, writes personalized messages (not templates), and handles the back-and-forth until a meeting is booked or the lead is qualified out.",
  },
  {
    question: "Does this replace my SDR team?",
    answer: "No. This automates the research, enrichment, and initial outreach that burns out SDRs. Your team stays for relationship building, complex negotiations, and closing. Most teams see 2-4x output without adding headcount.",
  },
  {
    question: "What happens when a prospect replies?",
    answer: "Your AI qualifies the reply — if it's a booking request or qualified interest, it hands it to you with full context and a recommended next step. If it's a 'not interested' or spam, it handles gracefully or marks for your review.",
  },
  {
    question: "Can it work with my CRM?",
    answer: "Yes. Your AI outbound teammate updates CRM records, logs activities, and syncs engagement data. It works with your existing stack, not around it.",
  },
  {
    question: "Is this safe for my brand?",
    answer: "Every outbound message is reviewed before sending (configurable). Your AI can also work in 'suggest' mode — drafts responses for your team to review and send. You control the risk profile.",
  },
]

export default function AIOutboundPage() {
  const rotatingTitle = useTypewriter(ROTATING_TITLES, 100, 60, 2500)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-[#f28b82]/10 text-[#f28b82] border-[#f28b82]/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                AI Outbound Sales
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Your
                  <br className="hidden sm:block" />
                  <span className="text-[#f28b82]"> {rotatingTitle}</span>
                  <span className="animate-pulse text-[#f28b82]">|</span>
                </h1>
                <p className="text-xl text-[#9aa0a6] max-w-2xl mx-auto">
                  An AI teammate that researches prospects, drafts personalized outreach, follows up intelligently, and hands qualified leads to you.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="mailto:aioutbound@vibebrowser.app">
                  <Button size="lg" className="bg-[#f28b82] hover:bg-[#f5a99d] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                    <Send className="mr-2 h-5 w-5" />
                    Request Early Access
                  </Button>
                </Link>
                <Link href="/sales">
                  <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#f28b82]">
                    <Eye className="mr-2 h-5 w-5" />
                    See Sales Page
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-sm text-[#5f6368]">Related:</span>
                <Link href="/aiemployee" className="text-sm text-[#f28b82] hover:underline">
                  AI Employee
                </Link>
                <span className="text-[#2a2a2a]">|</span>
                <Link href="/digitalemployee" className="text-sm text-[#f28b82] hover:underline">
                  Digital Employee
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#1e1e1e]">
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#f28b82]" />
                  Real-time research
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Personalized drafts
                </span>
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Smart follow-up
                </span>
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Human handoff
                </span>
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Pipeline metrics
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What AI Outbound Does */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                What AI outbound actually does
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                This isn't a template engine. Your AI outbound teammate researches, drafts, follows up, and hands qualified leads to you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAPABILITIES.map((item) => {
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
                Outbound roles you can deploy
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Each AI outbound teammate specializes in a specific motion — inbound, outbound, pipeline recovery, or event follow-up.
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

        {/* Workflow Examples */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Real outbound workflows
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                These aren't hypotheticals. These are the workflows our AI outbound teammates run today.
              </p>
            </div>

            <div className="space-y-6">
              {WORKFLOW_EXAMPLES.map((workflow, i) => (
                <Card key={workflow.title} className="bg-[#0a0a0a] border-[#2a2a2a]">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f28b82]/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-[#f28b82]" />
                        </div>
                        <h3 className="text-lg font-medium text-[#e8eaed]">{workflow.title}</h3>
                      </div>
                      <Badge variant="secondary" className="bg-[#81c995]/10 text-[#81c995] border-[#81c995]/20 self-start md:self-center">
                        {workflow.metric}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-4">{workflow.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.steps.map((step, j) => (
                        <React.Fragment key={j}>
                          <Badge variant="outline" className="border-[#2a2a2a] text-[#9aa0a6] text-xs">
                            {step}
                          </Badge>
                          {j < workflow.steps.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-[#2a2a2a] self-center" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                AI Outbound vs. Traditional Outreach Tools
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                The difference between a template manager and an actual SDR teammate.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-4 px-3 text-[#9aa0a6] font-medium">Capability</th>
                    <th className="text-center py-4 px-3 text-[#f28b82] font-medium">AI Outbound</th>
                    <th className="text-center py-4 px-3 text-[#9aa0a6] font-medium">Outreach Tools</th>
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

        {/* Results */}
        <section className="w-full py-16 md:py-24 border-t border-[#1e1e1e] bg-[#111111]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#f28b82] mb-2">85%</div>
                <p className="text-sm text-[#9aa0a6]">Faster lead response</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#81c995] mb-2">3x</div>
                <p className="text-sm text-[#9aa0a6]">More meetings booked</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#fdd663] mb-2">23%</div>
                <p className="text-sm text-[#9aa0a6]">Stalled deals reopened</p>
              </div>
              <div className="text-center p-6">
                <div className="text-3xl font-semibold text-[#8ab4f8] mb-2">12%</div>
                <p className="text-sm text-[#9aa0a6]">Human handoff rate</p>
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
              Build your outbound engine
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Hire an AI outbound teammate. It researches, drafts, follows up, and hands qualified leads to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:aioutbound@vibebrowser.app">
                <Button size="lg" className="bg-[#f28b82] hover:bg-[#f5a99d] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full">
                  <Send className="mr-2 h-5 w-5" />
                  Request Early Access
                </Button>
              </Link>
              <Link href="/sales">
                <Button size="lg" variant="outline" className="px-8 py-6 h-auto rounded-full border-[#2a2a2a] bg-transparent hover:bg-[#1a1a1a] text-[#f28b82]">
                  <Eye className="mr-2 h-5 w-5" />
                  See Sales Page
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8 pt-8 border-t border-[#1e1e1e]">
              <span className="text-sm text-[#5f6368]">Explore related concepts:</span>
              <Link href="/aiemployee" className="text-sm text-[#f28b82] hover:underline">
                AI Employee
              </Link>
              <span className="text-[#2a2a2a]">|</span>
              <Link href="/digitalemployee" className="text-sm text-[#f28b82] hover:underline">
                Digital Employee
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
