"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { WaitlistDialogIncognito } from '@/components/waitlist-dialog-incognito'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  Server,
  ArrowRight,
  HardDrive,
  ChevronRight,
  Download,
  Brain,
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileCheck,
  LineChart,
  Gavel,
  Receipt,
  Users,
  Settings,
  CreditCard,
  Building2,
  Key,
  BarChart3,
  Share2,
  Globe,
  EyeOff,
  Mail,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Shield, Lock, CheckCircle, XCircle, Server, ArrowRight, HardDrive, ChevronRight, Download, Brain, Zap, AlertTriangle, ShieldCheck, FileCheck, LineChart, Gavel, Receipt, Users, Settings, CreditCard, Building2, Key, BarChart3, Share2, Globe, EyeOff, Mail
}

interface EnterpriseFeature {
  icon: string
  title: string
  description: string
}

interface EnterpriseTestimonial {
  quote: string
  author: string
  practice: string
}

interface EnterpriseFAQ {
  question: string
  answer: string
}

export interface EnterpriseConfig {
  slug: string
  name: string
  subtitle: string
  gradient: string
  gradientFrom: string
  gradientVia: string
  gradientTo: string
  accentColor: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  rotatingWords: string[]
  ctaText: string
  ctaLink: string
  ctaIsMailto?: boolean
  ctaIsWaitlist?: boolean
  contactEmail?: string
  features: EnterpriseFeature[]
  demoType?: 'terminal' | 'dashboard'
  demoDashboard?: {
    users: { name: string; email: string; role: string; status: 'online' | 'offline' }[]
    sharedSkills: { name: string; users: number }[]
    vaultSecrets: { name: string; type: string; shared: boolean }[]
  }
  demoLines?: { type: 'input' | 'success' | 'info' | 'brain'; text: string; highlight?: string }[]
  workflows?: string[]
  stats?: { value: string; label: string }[]
  testimonials?: EnterpriseTestimonial[]
  faqs?: EnterpriseFAQ[]
  showSecurity?: boolean
  showPricing?: boolean
  customPricing?: {
    price: string
    perSeat?: boolean
    tokenUsage?: boolean
    description: string
  }
}

interface EnterpriseTemplateProps {
  config: EnterpriseConfig
}

const ECOSYSTEM_ADVANTAGES: EnterpriseFeature[] = [
  {
    icon: 'Mail',
    title: 'Google Workspace Native',
    description: 'Gmail + Calendar actions built in for secure workflows.',
  },
  {
    icon: 'Server',
    title: 'MCP Server Ready',
    description: 'Expose Vibe as an MCP server so other AI agents can drive your browser.',
  },
  {
    icon: 'Globe',
    title: 'Remote Agent Relay',
    description: 'Securely connect remote agents to your logged-in browser without VPNs.',
  },
  {
    icon: 'Share2',
    title: 'Skills Library',
    description: 'Reusable skills shared org-wide with governance and approvals.',
  },
  {
    icon: 'Key',
    title: 'Secrets Vault + Type-In',
    description: 'Internal vault with a password-fill tool that never exposes secrets to the LLM.',
  },
  {
    icon: 'Zap',
    title: 'Model & Agent Choice',
    description: 'Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
  },
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

function Icon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Shield
  return <IconComponent className={className} />
}

export default function EnterpriseTemplate({ config }: EnterpriseTemplateProps) {
  const rotatingWord = useTypewriter(config.rotatingWords, 100, 60, 2500)

  return (
    <div className="flex flex-col min-h-screen bg-[#202124] text-[#e8eaed] overflow-x-hidden">
      {/* Header */}
      <SiteNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  {config.heroTitle}
                  <br className="hidden sm:block" />
                  <span className="inline-block min-w-[180px] sm:min-w-[220px] md:min-w-[280px] text-left">
                    <span className="text-[#8ab4f8]">{rotatingWord}</span>
                    <span className="animate-pulse text-[#8ab4f8]">|</span>
                  </span>
                </h1>
                <p className="text-xl text-[#9aa0a6]">{config.heroSubtitle}</p>
              </div>

              <p className="max-w-2xl text-[#9aa0a6] leading-relaxed">
                {config.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {config.ctaIsMailto ? (
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                    <a href={config.ctaLink} className="flex items-center">
                      {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                ) : config.ctaIsWaitlist ? (
                  <WaitlistDialogIncognito>
                    <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                      {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </WaitlistDialogIncognito>
                ) : (
                  <WaitlistDialogIncognito>
                    <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                      {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </WaitlistDialogIncognito>
                )}
              </div>

              {/* Deployment indicators */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#3c4043]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#81c995]" />
                  Audit logs
                </span>
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  On-Premise Ready
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  TEE-Ready
                </span>
                <span className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  Human approvals
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Built for {config.name}
              </h2>
              <p className="text-[#9aa0a6]">
                Everything your team needs to automate securely
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.features.map((feature) => (
                <div key={feature.title} className="bg-[#202124] rounded-lg border border-[#3c4043] p-6 hover:border-[#5f6368] transition-colors">
                  <Icon name={feature.icon} className="w-8 h-8 text-[#8ab4f8] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#9aa0a6]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Advantages */}
        <section className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#1c1d20]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Integrations & Agent Ecosystem
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Google Workspace, MCP access for other agents, reusable skills, and a secure secrets vault.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ECOSYSTEM_ADVANTAGES.map((item) => (
                <div key={item.title} className="bg-[#202124] rounded-lg border border-[#3c4043] p-6 hover:border-[#5f6368] transition-colors">
                  <Icon name={item.icon} className="w-8 h-8 text-[#8ab4f8] mb-3" />
                  <h3 className="font-medium text-[#e8eaed] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9aa0a6]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflows */}
        {config.workflows && config.workflows.length > 0 && (
          <section className="w-full py-16 md:py-24 border-t border-[#3c4043]">
            <div className="container max-w-5xl px-4 md:px-6 mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                    Common Workflows
                  </h2>
                  <div className="space-y-4 mt-6">
                    {config.workflows.map((workflow, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                        <span className="text-[#9aa0a6]">{workflow}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Dashboard Demo */}
                {config.demoType === 'dashboard' && config.demoDashboard ? (
                  <div className="bg-[#1a1b1e] rounded-lg border border-[#3c4043] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#292a2d] border-b border-[#3c4043]">
                      <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                      <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                      <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                      <span className="text-xs text-[#9aa0a6] ml-2">Admin Dashboard - {config.name}</span>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Users Section */}
                      <div>
                        <h4 className="text-xs font-medium text-[#9aa0a6] uppercase tracking-wider mb-2">Team Members</h4>
                        <div className="space-y-2">
                          {config.demoDashboard.users.map((user, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#292a2d] rounded px-3 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#8ab4f8]/20 flex items-center justify-center text-[#8ab4f8] text-xs font-medium">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="text-sm text-[#e8eaed]">{user.name}</p>
                                  <p className="text-xs text-[#9aa0a6]">{user.email}</p>
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded ${user.role === 'Admin' ? 'bg-[#8ab4f8]/20 text-[#8ab4f8]' : 'bg-[#3c4043] text-[#9aa0a6]'}`}>{user.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Shared Skills */}
                      <div>
                        <h4 className="text-xs font-medium text-[#9aa0a6] uppercase tracking-wider mb-2">Shared Skills</h4>
                        <div className="space-y-2">
                          {config.demoDashboard.sharedSkills.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#292a2d] rounded px-3 py-2">
                              <span className="text-sm text-[#e8eaed]">{skill.name}</span>
                              <span className="text-xs text-[#9aa0a6]">{skill.users} users</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Vault */}
                      <div>
                        <h4 className="text-xs font-medium text-[#9aa0a6] uppercase tracking-wider mb-2">Encrypted Vault</h4>
                        <div className="space-y-2">
                          {config.demoDashboard.vaultSecrets.map((secret, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#292a2d] rounded px-3 py-2">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#81c995]" />
                                <span className="text-sm text-[#e8eaed]">{secret.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#9aa0a6]">{secret.type}</span>
                                {secret.shared && <span className="text-xs px-1.5 py-0.5 rounded bg-[#81c995]/20 text-[#81c995]">shared</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Default Terminal Demo */
                  <div className="bg-[#292a2d] rounded-lg border border-[#3c4043] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#3c4043] border-b border-[#3c4043]">
                      <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                      <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                      <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                      <span className="text-xs text-[#9aa0a6] ml-2">vibe-{config.slug}</span>
                    </div>
                    <div className="p-4 font-mono text-sm space-y-3">
                      {config.demoLines ? (
                        config.demoLines.map((line, i) => (
                          <div key={i} className={line.type === 'brain' ? 'pt-2 border-t border-[#3c4043]' : ''}>
                            {line.type === 'input' && (
                              <div className="text-[#9aa0a6]">
                                <span className="text-[#81c995]">→</span> {line.text}
                              </div>
                            )}
                            {line.type === 'success' && (
                              <div className="text-[#9aa0a6]">
                                <span className="text-[#81c995]">✓</span> {line.text}
                                {line.highlight && <span className="text-[#8ab4f8]"> {line.highlight}</span>}
                              </div>
                            )}
                            {line.type === 'info' && (
                              <div className="text-[#9aa0a6]">
                                <span className="text-[#fdd663]">ℹ</span> {line.text}
                                {line.highlight && <span className="text-[#8ab4f8]"> {line.highlight}</span>}
                              </div>
                            )}
                            {line.type === 'brain' && (
                              <div className="flex items-start gap-2">
                                <Brain className="w-4 h-4 text-[#8ab4f8] mt-0.5" />
                                <span className="text-[#9aa0a6]">
                                  <span className="text-[#8ab4f8]">{line.text}</span>
                                  {line.highlight && <> {line.highlight}</>}
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="text-[#9aa0a6]">
                            <span className="text-[#81c995]">→</span> Starting Vibe Co-Pilot...
                          </div>
                          <div className="text-[#9aa0a6]">
                            <span className="text-[#81c995]">✓</span> Connected to <span className="text-[#8ab4f8]">{config.name}</span> workspace
                          </div>
                          <div className="text-[#9aa0a6]">
                            <span className="text-[#81c995]">→</span> Loading team skills...
                          </div>
                          <div className="text-[#9aa0a6]">
                            <span className="text-[#81c995]">✓</span> Found <span className="text-[#8ab4f8]">12</span> shared skills
                          </div>
                          <div className="text-[#9aa0a6]">
                            <span className="text-[#81c995]">✓</span> Admin dashboard ready
                          </div>
                          <div className="pt-2 border-t border-[#3c4043]">
                            <div className="flex items-start gap-2">
                              <Brain className="w-4 h-4 text-[#8ab4f8] mt-0.5" />
                              <span className="text-[#9aa0a6]">
                                <span className="text-[#8ab4f8]">Ready:</span> {config.name} automation at your service.
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Stats */}
        {config.stats && config.stats.length > 0 && (
          <section className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
            <div className="container max-w-5xl px-4 md:px-6 mx-auto">
              <div className="grid gap-8 md:grid-cols-3 text-center">
                {config.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-4xl font-bold text-[#e8eaed] mb-2">{stat.value}</p>
                    <p className="text-[#9aa0a6]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Security Section */}
        {config.showSecurity !== false && (
          <section id="security" className="w-full py-16 md:py-24 border-t border-[#3c4043]">
            <div className="container max-w-5xl px-4 md:px-6 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  Four ways to run AI
                </h2>
                <p className="text-[#9aa0a6]">
                  Choose the deployment model that matches your privacy and governance requirements
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#292a2d] border-[#3c4043]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <HardDrive className="w-6 h-6 text-[#9aa0a6]" />
                      <span className="text-xs px-2 py-1 rounded bg-[#3c4043] text-[#9aa0a6]">Standard</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Local AI</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">
                      Gemini Nano runs entirely in your browser. Zero network requests.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6]">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        100% on-device processing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Works offline
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        No API keys required
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#292a2d] border-[#3c4043]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Server className="w-6 h-6 text-[#9aa0a6]" />
                      <span className="text-xs px-2 py-1 rounded bg-[#3c4043] text-[#9aa0a6]">Self-Hosted</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Self-Hosted LLM</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">
                      Connect to your own servers running open-source models.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6]">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        DeepSeek, Llama, Qwen, Mistral
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Your servers, your control
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Full audit logging
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#292a2d] border-[#8ab4f8]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="w-6 h-6 text-[#8ab4f8]" />
                      <span className="text-xs px-2 py-1 rounded bg-[#8ab4f8]/20 text-[#8ab4f8]">Popular</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Vibe AI API</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">
                      Run using our API with Grok and GPT models.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6]">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Grok-4, Grok-4-Fast
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        GPT-5.2, GPT-5.2-codex, GPT-5.1, GPT-4.1
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        DeepSeek V3.2, DeepSeek R1
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Managed model access
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#292a2d] border-[#3c4043]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Shield className="w-6 h-6 text-[#9aa0a6]" />
                      <span className="text-xs px-2 py-1 rounded bg-[#3c4043] text-[#9aa0a6]">Enterprise</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-2">TEE Deployment Path</h3>
                    <p className="text-sm text-[#9aa0a6] mb-4">
                      Run using our API with a variety of models.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6]">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        DeepSeek, Llama, Qwen, Mistral
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Minimax-m2.5, Kimi-k2.5
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        TEE-oriented deployment path
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Intel TDX / AMD SEV
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Remote attestation API
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#9aa0a6] max-w-2xl mx-auto">
                  Deployment choices, audit logs, and approval workflows can help teams fit Vibe into stricter privacy and governance environments.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Pricing */}
        {config.showPricing && (
          <section id="pricing" className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
            <div className="container max-w-5xl px-4 md:px-6 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  Simple pricing
                </h2>
                {config.customPricing ? (
                  <p className="text-[#9aa0a6]">
                    {config.customPricing.description}
                  </p>
                ) : (
                  <p className="text-[#9aa0a6]">
                    Start free, scale as you grow
                  </p>
                )}
              </div>

              {config.customPricing ? (
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <Card className="bg-[#202124] border-[#8ab4f8]">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl font-medium text-[#e8eaed] mb-4">{config.name}</h3>
                      <div className="mb-4">
                        <span className="text-5xl font-normal text-[#e8eaed]">{config.customPricing.price}</span>
                        {config.customPricing.perSeat && <span className="text-[#9aa0a6]">/seat</span>}
                      </div>
                      {config.customPricing.tokenUsage && (
                        <p className="text-sm text-[#9aa0a6] mb-6">
                          + pay for token use
                        </p>
                      )}
                      <ul className="space-y-3 text-sm text-[#9aa0a6] mb-8">
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          All features
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          Dedicated support
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          SSO / SAML
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          Audit logging
                        </li>
                      </ul>
                      {config.ctaIsMailto ? (
                        <Button className="w-full bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124]">
                          <a href={config.ctaLink}>{config.ctaText}</a>
                        </Button>
                      ) : (
                        <WaitlistDialogIncognito>
                          <Button className="w-full bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124]">
                            {config.ctaText}
                          </Button>
                        </WaitlistDialogIncognito>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-[#202124] border-[#3c4043]">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl font-medium text-[#e8eaed] mb-4">100+ Seats</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-normal text-[#e8eaed]">Custom</span>
                      </div>
                      <p className="text-sm text-[#9aa0a6] mb-6">
                        Volume discounts for large organizations
                      </p>
                      <ul className="space-y-3 text-sm text-[#9aa0a6] mb-8">
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          Everything in {config.name}
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          Volume discounts
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          Dedicated success manager
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-[#81c995]" />
                          Custom integrations
                        </li>
                      </ul>
                      {config.ctaIsMailto ? (
                        <Button variant="outline" className="w-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]">
                          <a href={config.ctaLink}>Contact Sales</a>
                        </Button>
                      ) : (
                        <WaitlistDialogIncognito>
                          <Button variant="outline" className="w-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]">
                            Contact Sales
                          </Button>
                        </WaitlistDialogIncognito>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="bg-[#202124] border-[#3c4043]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-1">Starter</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-normal text-[#e8eaed]">$0</span>
                      <span className="text-[#9aa0a6]">/month</span>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-6">
                      Local AI only. Perfect for trying out.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6] mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Gemini Nano (on-device)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Basic automation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Community support
                      </li>
                    </ul>
                    <Link href="https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado" target="_blank">
                      <Button variant="outline" className="w-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]">
                        Download
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-[#202124] border-[#8ab4f8]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-1">Professional</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-normal text-[#e8eaed]">$49</span>
                      <span className="text-[#9aa0a6]">/month</span>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-6">
                      Self-hosted models. Full control.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6] mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Everything in Starter
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Self-hosted model support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Advanced workflows
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Audit logging
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Priority support
                      </li>
                    </ul>
                    <WaitlistDialogIncognito>
                      <Button className="w-full bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124]">
                        Get Started
                      </Button>
                    </WaitlistDialogIncognito>
                  </CardContent>
                </Card>

                <Card className="bg-[#202124] border-[#3c4043]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-[#e8eaed] mb-1">Enterprise</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-normal text-[#e8eaed]">$10</span>
                      <span className="text-[#9aa0a6]">/seat</span>
                    </div>
                    <p className="text-sm text-[#9aa0a6] mb-6">
                      Pay per token use. Dedicated support.
                    </p>
                    <ul className="space-y-2 text-sm text-[#9aa0a6] mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Everything in Professional
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        TEE-protected inference
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Remote attestation API
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        SSO / SAML
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#81c995]" />
                        Dedicated account manager
                      </li>
                    </ul>
                    {config.ctaIsMailto ? (
                      <Button variant="outline" className="w-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]">
                        <a href={config.ctaLink}>Contact Sales</a>
                      </Button>
                    ) : (
                      <WaitlistDialogIncognito>
                        <Button variant="outline" className="w-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]">
                          Contact Sales
                        </Button>
                      </WaitlistDialogIncognito>
                    )}
                  </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {config.testimonials && config.testimonials.length > 0 && (
          <section className="w-full py-16 md:py-24 border-t border-[#3c4043]">
            <div className="container max-w-5xl px-4 md:px-6 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  Trusted by {config.name} teams
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {config.testimonials.map((testimonial) => (
                  <div key={testimonial.author} className="bg-[#292a2d] rounded-lg border border-[#3c4043] p-6">
                    <p className="text-lg mb-4 italic text-[#9aa0a6]">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div>
                      <p className="font-medium text-[#e8eaed]">{testimonial.author}</p>
                      <p className="text-sm text-[#9aa0a6]">{testimonial.practice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {config.faqs && config.faqs.length > 0 && (
          <section id="faq" className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
            <div className="container max-w-3xl px-4 md:px-6 mx-auto">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-8 text-center">
                Frequently asked questions
              </h2>

              <Accordion type="single" collapsible className="space-y-2">
                {config.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-[#3c4043] bg-[#202124] rounded-lg px-4">
                    <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#9aa0a6]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="w-full py-20 border-t border-[#3c4043] bg-[#292a2d]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Ready to get started?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Talk with us about your deployment, workflow, and privacy requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {config.ctaIsMailto ? (
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                  <a href={config.ctaLink} className="flex items-center">
                    {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <WaitlistDialogIncognito>
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                    <span className="flex items-center">
                      {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </WaitlistDialogIncognito>
              )}
            </div>
            {config.contactEmail && (
              <p className="text-xs text-[#5f6368] mt-8">
                Questions? <a href={`mailto:${config.contactEmail}`} className="text-[#8ab4f8] hover:underline">{config.contactEmail}</a>
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <SiteFooter />
    </div>
  )
}
