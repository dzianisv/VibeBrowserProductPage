"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WaitlistDialogIncognito } from "@/components/waitlist-dialog-incognito"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
} from "lucide-react"

// Rotating words for the hero animation
const ROTATING_WORDS = [
  "Financial",
  "Investment",
  "Legal",
  "Healthcare",
  "Insurance",
  "Accounting",
  "Tax",
  "Compliance",
]

// Typewriter hook with delete and retype animation
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState(words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    const currentWord = words[wordIndex]
    
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

export default function EnterpriseProductPage() {
  const rotatingWord = useTypewriter(ROTATING_WORDS, 100, 60, 2500)
  return (
    <div className="flex flex-col min-h-screen bg-[#202124] text-[#e8eaed] overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#3c4043] bg-[#202124]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-9 h-9 object-contain" />
          <span className="text-lg font-medium text-[#e8eaed]">
            Vibe AI Browser<span className="text-[#9aa0a6]"> · Private Enterprise</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#solutions" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Solutions</a>
          <a href="#security" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Security</a>
          <a href="#pricing" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">Pricing</a>
          <a href="#faq" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">FAQ</a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors hidden sm:block">
            Consumer & Teams →
          </Link>
          <WaitlistDialogIncognito>
            <Button size="sm" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium rounded-full">
              Get Access
            </Button>
          </WaitlistDialogIncognito>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                  Private AI Co-Pilot for{" "}
                  <br className="hidden sm:block" />
                  <span className="inline-block min-w-[180px] sm:min-w-[220px] md:min-w-[280px] text-left">
                    <span className="text-[#8ab4f8]">{rotatingWord}</span>
                    <span className="animate-pulse text-[#8ab4f8]">|</span>
                  </span>
                  {" "}Professionals
                </h1>
                <p className="text-xl text-[#9aa0a6]">
                  AI browser automation that never sees your client data
                </p>
              </div>

              <p className="max-w-2xl text-[#9aa0a6] leading-relaxed">
                Built for professionals in <strong className="text-[#e8eaed]">finance</strong>, <strong className="text-[#e8eaed]">law</strong>, <strong className="text-[#e8eaed]">healthcare</strong>, and other regulated industries who need AI automation without compliance risk. Run models locally, self-host on your infrastructure, or use TEE-protected cloud inference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <WaitlistDialogIncognito>
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                    Request Enterprise Access
                  </Button>
                </WaitlistDialogIncognito>
                <WaitlistDialogIncognito>
                  <Button size="lg" className="bg-[#81c995] hover:bg-[#a8dab5] text-[#202124] font-medium px-8 py-6 h-auto rounded-full flex items-center gap-2">
                    Request Demo
                  </Button>
                </WaitlistDialogIncognito>
                <Link href="/tee">
                  <Button variant="outline" size="lg" className="px-8 py-6 h-auto rounded-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#8ab4f8]">
                    Read Security Whitepaper
                  </Button>
                </Link>
              </div>

              {/* Trust indicators - Updated */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#9aa0a6] mt-8 pt-8 border-t border-[#3c4043]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#81c995]" />
                  SOC 2 Type II
                </span>
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  On-Premise Ready
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  TEE-Protected
                </span>
                <span className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  FINRA Compliant
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                The problem with AI in regulated industries
              </h2>
              <p className="text-[#9aa0a6] max-w-2xl mx-auto">
                Every time you use ChatGPT or Claude with client data, you're taking a compliance risk.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Risk Card */}
              <Card className="bg-[#202124] border-[#3c4043]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-[#f28b82]" />
                    <h3 className="font-medium text-[#e8eaed]">Current AI tools expose you to</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <XCircle className="w-4 h-4 text-[#f28b82] mt-1 flex-shrink-0" />
                      <span>Client PII sent to OpenAI/Anthropic servers in the US</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <XCircle className="w-4 h-4 text-[#f28b82] mt-1 flex-shrink-0" />
                      <span>Data potentially used to train future models</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <XCircle className="w-4 h-4 text-[#f28b82] mt-1 flex-shrink-0" />
                      <span>Attorney-client privilege violations</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <XCircle className="w-4 h-4 text-[#f28b82] mt-1 flex-shrink-0" />
                      <span>SEC, FINRA, HIPAA, GLBA compliance breaches</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <XCircle className="w-4 h-4 text-[#f28b82] mt-1 flex-shrink-0" />
                      <span>No audit trail for regulatory examinations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Solution Card */}
              <Card className="bg-[#202124] border-[#3c4043]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-[#81c995]" />
                    <h3 className="font-medium text-[#e8eaed]">Vibe AI Browser guarantees</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <CheckCircle className="w-4 h-4 text-[#81c995] mt-1 flex-shrink-0" />
                      <span>Data processed locally or on your own servers</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <CheckCircle className="w-4 h-4 text-[#81c995] mt-1 flex-shrink-0" />
                      <span>Zero retention - prompts deleted after processing</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <CheckCircle className="w-4 h-4 text-[#81c995] mt-1 flex-shrink-0" />
                      <span>Hardware-encrypted TEE execution with attestation</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <CheckCircle className="w-4 h-4 text-[#81c995] mt-1 flex-shrink-0" />
                      <span>Complete audit logs for compliance reviews</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#9aa0a6]">
                      <CheckCircle className="w-4 h-4 text-[#81c995] mt-1 flex-shrink-0" />
                      <span>Cryptographic proof of secure execution</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="w-full py-16 md:py-24 border-t border-[#3c4043]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                  AI that acts, not just answers
                </h2>
                <p className="text-[#9aa0a6] mb-6">
                  Vibe doesn't just read documents — it navigates websites, downloads files, fills forms, and executes workflows autonomously. All while keeping your data encrypted.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                    <Download className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Auto-fetch documents</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Downloads 1099s, K-1s, statements from IRS, brokerages, banks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                    <Brain className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Parse & analyze</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Extracts data, cross-references sources, flags discrepancies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                    <Zap className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#e8eaed] mb-1">Execute workflows</h4>
                      <p className="text-sm text-[#9aa0a6]">
                        Fills forms, generates reports, sends communications
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Demo */}
              <div className="bg-[#292a2d] rounded-lg border border-[#3c4043] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#3c4043] border-b border-[#3c4043]">
                  <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                  <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                  <div className="w-3 h-3 rounded-full bg-[#5f6368]" />
                  <span className="text-xs text-[#9aa0a6] ml-2">vibe-private-ai</span>
                </div>
                <div className="p-4 font-mono text-sm space-y-3">
                  <div className="text-[#9aa0a6]">
                    <span className="text-[#81c995]">→</span> Connecting to Schwab...
                  </div>
                  <div className="text-[#9aa0a6]">
                    <span className="text-[#81c995]">→</span> Navigating to Tax Center...
                  </div>
                  <div className="text-[#9aa0a6]">
                    <span className="text-[#81c995]">✓</span> Found <span className="text-[#8ab4f8]">3</span> 1099-B forms
                  </div>
                  <div className="text-[#9aa0a6]">
                    <span className="text-[#81c995]">→</span> Downloading 2024_1099B.pdf...
                  </div>
                  <div className="text-[#9aa0a6]">
                    <span className="text-[#81c995]">→</span> Extracting trade data...
                  </div>
                  <div className="pl-4 text-[#9aa0a6] border-l-2 border-[#3c4043]">
                    <div>Short-term gains: <span className="text-[#81c995]">$12,450</span></div>
                    <div>Long-term gains: <span className="text-[#81c995]">$34,200</span></div>
                    <div>Wash sales: <span className="text-[#f28b82]">$2,100</span></div>
                  </div>
                  <div className="text-[#9aa0a6]">
                    <span className="text-[#81c995]">→</span> Cross-referencing with Fidelity...
                  </div>
                  <div className="pt-2 border-t border-[#3c4043]">
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-[#8ab4f8] mt-0.5" />
                      <span className="text-[#9aa0a6]">
                        <span className="text-[#8ab4f8]">Insight:</span> $2,100 wash sale disallowed. Basis adjustment required on replacement shares purchased 1/15.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions by Industry */}
        <section id="solutions" className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Built for regulated industries
              </h2>
              <p className="text-[#9aa0a6]">
                Autonomous workflows for professionals who handle sensitive client data
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Trading */}
              <Card className="bg-[#202124] border-[#3c4043] hover:border-[#5f6368] transition-colors">
                <CardContent className="p-6">
                  <LineChart className="w-8 h-8 text-[#9aa0a6] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Trading & Wealth Management</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Portfolio analysis without exposing client positions to third parties.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Multi-custodian account aggregation
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Tax-loss harvesting analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Rebalancing recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Client reporting automation
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-[#3c4043]">
                    <span className="text-xs text-[#9aa0a6]">SEC Rule 17a-4 • FINRA 4511</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tax */}
              <Card className="bg-[#202124] border-[#3c4043] hover:border-[#5f6368] transition-colors">
                <CardContent className="p-6">
                  <Receipt className="w-8 h-8 text-[#9aa0a6] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Tax Preparation</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Automate document collection and analysis without cloud exposure.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Auto-download 1099s, W2s, K-1s
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Cost basis reconciliation
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Deduction optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Multi-state allocation
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-[#3c4043]">
                    <span className="text-xs text-[#9aa0a6]">IRS Circular 230 • AICPA Standards</span>
                  </div>
                </CardContent>
              </Card>

              {/* Legal */}
              <Card className="bg-[#202124] border-[#3c4043] hover:border-[#5f6368] transition-colors">
                <CardContent className="p-6">
                  <Gavel className="w-8 h-8 text-[#9aa0a6] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Legal Practice</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    AI-powered research and drafting without privilege waiver risks.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Case law research across databases
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Contract analysis & redlining
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Document review & summarization
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Deadline & filing management
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-[#3c4043]">
                    <span className="text-xs text-[#9aa0a6]">ABA Model Rules • State Bar Ethics</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Architecture */}
        <section id="security" className="w-full py-16 md:py-24 border-t border-[#3c4043]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Three levels of protection
              </h2>
              <p className="text-[#9aa0a6]">
                Choose the security model that matches your compliance requirements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Local */}
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

              {/* Self-Hosted */}
              <Card className="bg-[#292a2d] border-[#8ab4f8]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Server className="w-6 h-6 text-[#8ab4f8]" />
                    <span className="text-xs px-2 py-1 rounded bg-[#8ab4f8]/20 text-[#8ab4f8]">Professional</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Self-Hosted</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Run DeepSeek, Llama, or any model on your own infrastructure.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      Your servers, your control
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      Any open-source model
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      Full audit logging
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* TEE */}
              <Card className="bg-[#292a2d] border-[#3c4043]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="w-6 h-6 text-[#9aa0a6]" />
                    <span className="text-xs px-2 py-1 rounded bg-[#3c4043] text-[#9aa0a6]">Enterprise</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">TEE-Protected</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Hardware-encrypted execution with cryptographic attestation.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      Intel TDX / AMD SEV
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      Remote attestation API
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#81c995]" />
                      150+ tokens/sec
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Link href="/tee" className="text-sm text-[#8ab4f8] hover:underline">
                Read our TEE security whitepaper →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="w-full py-16 md:py-24 border-t border-[#3c4043] bg-[#292a2d]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
                Simple pricing
              </h2>
              <p className="text-[#9aa0a6]">
                Start free, scale as you grow
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Free */}
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

              {/* Professional */}
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

              {/* Enterprise */}
              <Card className="bg-[#202124] border-[#3c4043]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-1">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-normal text-[#e8eaed]">Custom</span>
                  </div>
                  <p className="text-sm text-[#9aa0a6] mb-6">
                    TEE + dedicated support.
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
                  <WaitlistDialogIncognito>
                    <Button variant="outline" className="w-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]">
                      Contact Sales
                    </Button>
                  </WaitlistDialogIncognito>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-16 md:py-24 border-t border-[#3c4043]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-8 text-center">
              Frequently asked questions
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border-[#3c4043] bg-[#292a2d] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How does local AI work without sending data to the cloud?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Vibe AI Browser uses Gemini Nano, a small language model that runs entirely in your Chrome browser. The model weights are downloaded once and all inference happens on your device. No prompts, documents, or responses ever leave your machine.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#3c4043] bg-[#292a2d] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  What models can I self-host?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Any model that exposes an OpenAI-compatible API. Popular choices include DeepSeek, Llama 3, Mistral, and Qwen. We provide Docker images and deployment guides for common setups including AWS, GCP, Azure, and on-premise servers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#3c4043] bg-[#292a2d] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  How does TEE protect my data?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Trusted Execution Environments (TEE) use hardware-level encryption to create isolated memory regions. Even the cloud provider cannot access data inside a TEE. We use Intel TDX and provide cryptographic attestation so you can verify the code running on your data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#3c4043] bg-[#292a2d] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Is this compliant with SEC/FINRA regulations?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes. With self-hosted or TEE deployment, all data remains under your control. We provide complete audit logs for regulatory examinations. Our architecture is designed to meet SEC Rule 17a-4, FINRA 4511, and similar recordkeeping requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#3c4043] bg-[#292a2d] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Does using AI waive attorney-client privilege?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  With traditional cloud AI, sharing privileged information with a third party can potentially waive privilege. Vibe AI Browser's local and self-hosted modes process everything within your own environment, avoiding third-party disclosure. For cloud TEE, the cryptographic isolation means no third party can access the data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-[#3c4043] bg-[#292a2d] rounded-lg px-4">
                <AccordionTrigger className="text-[#e8eaed] hover:no-underline">
                  Can I use GPT-4 or Claude with Vibe?
                </AccordionTrigger>
                <AccordionContent className="text-[#9aa0a6]">
                  Yes, but only for non-sensitive tasks. Vibe is model-agnostic and can connect to any AI provider. For sensitive client data, we recommend using local AI, self-hosted models, or TEE-protected inference. You can configure different models for different use cases.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 border-t border-[#3c4043] bg-[#292a2d]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal text-[#e8eaed] mb-4">
              Ready to get started?
            </h2>
            <p className="text-[#9aa0a6] mb-8 max-w-xl mx-auto">
              Join professionals at top law firms, RIAs, and accounting practices who trust Vibe with their most sensitive client work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WaitlistDialogIncognito>
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                  Request Enterprise Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </WaitlistDialogIncognito>
            </div>
            <p className="text-xs text-[#5f6368] mt-8">
              Questions? <a href="mailto:enterprise@vibebrowser.app" className="text-[#8ab4f8] hover:underline">enterprise@vibebrowser.app</a>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#3c4043] bg-[#202124]">
        <div className="container max-w-5xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe AI Browser" className="w-6 h-6 object-contain" />
              <span>Vibe Technologies</span>
            </div>
            <div className="flex gap-6">
              <Link href="/mcp" className="hover:text-[#e8eaed] transition-colors">MCP</Link>
              <Link href="/agentic-team" className="hover:text-[#e8eaed] transition-colors">Agentic Team</Link>
              <Link href="/privacy" className="hover:text-[#e8eaed] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#e8eaed] transition-colors">Terms</Link>
              <Link href="/tee" className="hover:text-[#e8eaed] transition-colors">Security</Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8eaed] transition-colors">Telegram</Link>
              <a href="mailto:enterprise@vibebrowser.app" className="hover:text-[#e8eaed] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
