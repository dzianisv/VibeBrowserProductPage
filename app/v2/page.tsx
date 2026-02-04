"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Download,
  CheckCircle,
  Building2,
  Scale,
  Calculator,
  Server,
  Cpu,
  Cloud,
  ArrowRight,
  Globe,
  Brain,
  Zap,
  Users,
  BadgeCheck,
  KeyRound,
  HardDrive,
  ShieldCheck,
  FileCheck,
  Briefcase,
  ChevronRight,
} from "lucide-react"

export default function PrivacyProfessionalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hidden sm:inline">
            Vibe Professional
          </span>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 ml-2">
            Privacy-First
          </Badge>
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Consumer Version
          </Link>
          <Link href="/tee" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            TEE Research
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          
          <div className="container max-w-7xl px-4 md:px-6 mx-auto relative">
            <div className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-slate-800/50 text-emerald-400 border-emerald-500/30">
                <Shield className="w-4 h-4 mr-2" />
                Confidential Computing for Professionals
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                AI That Keeps Your
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Clients' Secrets</span>
              </h1>

              <p className="max-w-3xl text-lg text-slate-300 md:text-xl leading-relaxed">
                The only AI browser co-pilot built for <strong className="text-white">financial advisors</strong>, <strong className="text-white">lawyers</strong>, and <strong className="text-white">tax professionals</strong>. 
                TEE-protected models, self-hosted options, and zero-trust architecture ensure your clients' sensitive data never leaves your control.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4">
                <WaitlistDialog>
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-8 py-6 h-auto">
                    <Shield className="mr-2 h-5 w-5" />
                    Request Enterprise Access
                  </Button>
                </WaitlistDialog>
                <Link href="/tee">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-slate-600 h-auto bg-slate-800/50 hover:bg-slate-700/50 text-white">
                    <FileText className="mr-2 h-5 w-5" />
                    Read TEE Research Paper
                  </Button>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6 justify-center items-center text-sm text-slate-400 mt-8">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Hardware-encrypted memory</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>Self-hosted option</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Zero data retention</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Remote attestation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="w-full py-16 md:py-24 bg-slate-800/50">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Your Clients Trust You. <span className="text-emerald-400">Your AI Should Too.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-300">
                Current AI tools send sensitive data to third-party servers. Vibe Professional keeps everything under your control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* The Problem */}
              <Card className="bg-red-950/30 border-red-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 text-xl">✕</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-400">Traditional AI Tools</h3>
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Client data sent to OpenAI, Anthropic servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>No guarantee data isn't used for training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Potential attorney-client privilege violations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>HIPAA, GLBA, SEC compliance risks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>No audit trail for regulatory requirements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* The Solution */}
              <Card className="bg-emerald-950/30 border-emerald-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Vibe Professional</h3>
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>TEE-protected inference with Intel TDX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>Self-hosted models on your infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>Cryptographic proof of secure execution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>Complete audit logging for compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>Data never leaves your control</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Professional Use Cases */}
        <section className="w-full py-16 md:py-24">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Built for <span className="text-emerald-400">Regulated Industries</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-300">
                Autonomous workflows that handle your most sensitive client work
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Tax Professionals */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Calculator className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Tax Preparation</h3>
                  <p className="text-slate-400 mb-4">
                    Replace expensive tax software with an AI that understands the tax code.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Auto-download 1099s, W2s from IRS, brokerages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Parse and reconcile tax documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Generate tax planning recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Prepare returns with CPA oversight</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      Replaces $499/year tax services
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Professionals */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Scale className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Legal Practice</h3>
                  <p className="text-slate-400 mb-4">
                    AI-powered legal research and document analysis without privilege risks.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Research case law across multiple databases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Draft contracts with clause suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Document review and summarization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Deadline tracking and filing reminders</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      Attorney-client privilege protected
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Advisors */}
              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Financial Advisory</h3>
                  <p className="text-slate-400 mb-4">
                    Wealth management automation with fiduciary-grade privacy.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Aggregate client accounts securely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Portfolio analysis and rebalancing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Tax-loss harvesting opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Client reporting and communications</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      SEC/FINRA compliant architecture
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Architecture */}
        <section className="w-full py-16 md:py-24 bg-slate-800/50">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-slate-800/50 text-emerald-400 border-emerald-500/30 mb-4">
                <Cpu className="w-4 h-4 mr-2" />
                Privacy Architecture
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Three Levels of <span className="text-emerald-400">Data Protection</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-300">
                Choose the security level that matches your compliance requirements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Level 1: Local AI */}
              <Card className="bg-slate-900/50 border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <HardDrive className="w-6 h-6 text-blue-400" />
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      Included
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Local AI</h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    Gemini Nano runs entirely in your browser. Zero network requests.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span>100% on-device processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span>No API keys needed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span>Works offline</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Level 2: Self-Hosted */}
              <Card className="bg-slate-900/50 border-emerald-500/50 relative overflow-hidden shadow-lg shadow-emerald-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Server className="w-6 h-6 text-emerald-400" />
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      Professional
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Self-Hosted Models</h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    Run DeepSeek, Llama, or any open model on your own servers.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Your infrastructure, your control</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Any open-source model</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Full audit logging</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Level 3: TEE */}
              <Card className="bg-slate-900/50 border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-400" />
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      Enterprise
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">TEE-Protected</h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    Hardware-encrypted execution with cryptographic attestation.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <span>Intel TDX / AMD SEV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <span>Remote attestation API</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <span>150+ tokens/sec on GPU TEE</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Link href="/tee">
                <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  <FileText className="mr-2 h-4 w-4" />
                  Read Our TEE Research Paper
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Document Automation Feature */}
        <section className="w-full py-16 md:py-24">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-slate-800/50 text-cyan-400 border-cyan-500/30 mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  Autonomous Document Handling
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  From Raw Documents to
                  <span className="text-cyan-400"> Completed Returns</span>
                </h2>
                <p className="text-lg text-slate-300 mb-6">
                  Vibe doesn't just read documents — it navigates to the source, downloads them, parses the data, and prepares your work. All while keeping everything encrypted.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Auto-Download Tax Forms</h4>
                      <p className="text-sm text-slate-400">
                        Vibe navigates to IRS, brokerages, and payroll systems to download 1099s, W2s, and K-1s automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Parse & Reconcile</h4>
                      <p className="text-sm text-slate-400">
                        AI extracts data from documents, cross-references against bank statements, and flags discrepancies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Generate Insights</h4>
                      <p className="text-sm text-slate-400">
                        Proactive tax planning advice, deduction opportunities, and strategic recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual representation */}
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-bold">1</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-700" />
                    <span>Navigate to Schwab</span>
                  </div>
                  
                  <div className="ml-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <code className="text-xs text-slate-400">
                      → Logging into Charles Schwab...<br/>
                      → Navigating to Tax Documents...<br/>
                      → <span className="text-emerald-400">Found 3 1099-DIV forms</span><br/>
                      → Downloading 2024 tax documents...
                    </code>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-bold">2</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-700" />
                    <span>Parse & Extract</span>
                  </div>

                  <div className="ml-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <code className="text-xs text-slate-400">
                      → Extracting dividend income: <span className="text-cyan-400">$12,450</span><br/>
                      → Qualified dividends: <span className="text-cyan-400">$9,200</span><br/>
                      → Foreign tax paid: <span className="text-cyan-400">$342</span><br/>
                      → <span className="text-emerald-400">Ready for Schedule B</span>
                    </code>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-bold">3</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-700" />
                    <span>Tax Planning Insight</span>
                  </div>

                  <div className="ml-4 p-4 bg-emerald-950/30 rounded-lg border border-emerald-500/30">
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-emerald-400 mt-1" />
                      <p className="text-sm text-slate-300">
                        <strong className="text-emerald-400">Recommendation:</strong> Client has $342 in foreign tax credit available. 
                        At their marginal rate, Form 1116 would recover an additional $127 vs. the standard deduction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison vs Deduction/Traditional */}
        <section className="w-full py-16 md:py-24 bg-slate-800/50">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why Professionals Choose <span className="text-emerald-400">Vibe</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-300">
                Compare Vibe Professional to specialized AI tax services
              </p>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto">
              <div className="bg-slate-900/50 rounded-xl border border-slate-700">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-400">
                        <div className="flex items-center justify-center gap-2">
                          Vibe Professional
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">AI Tax Services</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Traditional Software</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr>
                      <td className="px-6 py-4 text-sm text-slate-300">Auto-download forms</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-yellow-400">Limited</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-400">✕</span>
                      </td>
                    </tr>
                    <tr className="bg-slate-800/30">
                      <td className="px-6 py-4 text-sm text-slate-300">Data stays private</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs text-emerald-400 mt-1">TEE/Self-hosted</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-400">✕</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-yellow-400">Varies</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-slate-300">AI tax advice</td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-400">✕</span>
                      </td>
                    </tr>
                    <tr className="bg-slate-800/30">
                      <td className="px-6 py-4 text-sm text-slate-300">Works beyond tax</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs text-slate-400 mt-1">Legal, finance, any site</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-400">✕</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-400">✕</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-slate-300">Model choice</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs text-slate-400 mt-1">Any LLM</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-400">Vendor-locked</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-400">N/A</span>
                      </td>
                    </tr>
                    <tr className="bg-slate-800/30">
                      <td className="px-6 py-4 text-sm text-slate-300">Pricing</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-emerald-400 font-semibold">$20/mo</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-300">$499/year</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-300">$100-500/year</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10" />
          <div className="container max-w-5xl px-4 md:px-6 mx-auto relative">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to Protect Your Clients' Data?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8">
                Join the waitlist for Vibe Professional. Early access includes white-glove onboarding, 
                custom model deployment assistance, and priority support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <WaitlistDialog>
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-8 py-6 h-auto">
                    <Shield className="mr-2 h-5 w-5" />
                    Request Enterprise Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </WaitlistDialog>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                Questions? Email us at <a href="mailto:enterprise@vibebrowser.app" className="text-emerald-400 hover:underline">enterprise@vibebrowser.app</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-700 bg-slate-900">
        <div className="container max-w-7xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-8 h-8 object-contain" />
              <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Vibe Professional
              </span>
            </div>
            <p className="text-sm text-slate-400">
              © 2026 Vibe Technologies, LLC. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/tee" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                TEE Research
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
