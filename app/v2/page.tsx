"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  Building2,
  Scale,
  Calculator,
  Server,
  ArrowRight,
  UserX,
  HardDrive,
  FileCheck,
  ChevronRight,
} from "lucide-react"

export default function IncognitoModePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#202124] text-[#e8eaed] overflow-x-hidden">
      {/* Header - Incognito style */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#3c4043] bg-[#202124] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3c4043] rounded-full flex items-center justify-center">
            <EyeOff className="w-5 h-5 text-[#9aa0a6]" />
          </div>
          <span className="text-xl font-medium text-[#e8eaed]">
            Vibe Incognito
          </span>
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
            Consumer
          </Link>
          <Link href="/tee" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
            TEE Research
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-8 text-center">
              {/* Incognito Icon */}
              <div className="w-24 h-24 bg-[#3c4043] rounded-full flex items-center justify-center">
                <EyeOff className="w-12 h-12 text-[#9aa0a6]" />
              </div>

              <h1 className="text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl text-[#e8eaed]">
                You've gone incognito
              </h1>

              <p className="max-w-2xl text-lg text-[#9aa0a6] leading-relaxed">
                AI browser automation for professionals who handle sensitive client data. 
                Your activity isn't saved to third-party servers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <WaitlistDialog>
                  <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                    Request Access
                  </Button>
                </WaitlistDialog>
                <Link href="/tee">
                  <Button variant="outline" size="lg" className="px-8 py-6 h-auto rounded-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#8ab4f8]">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Incognito Does */}
        <section className="w-full py-16 border-t border-[#3c4043]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Now incognito won't */}
              <div>
                <h3 className="text-lg font-medium text-[#e8eaed] mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#9aa0a6]" />
                  Vibe Incognito won't
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span>Send client data to OpenAI or Anthropic servers</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span>Train AI models on your confidential documents</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span>Store browsing history or client information</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                    <span>Compromise attorney-client privilege</span>
                  </li>
                </ul>
              </div>

              {/* This won't hide */}
              <div>
                <h3 className="text-lg font-medium text-[#e8eaed] mb-6 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#9aa0a6]" />
                  How it works
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <HardDrive className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <span>Local AI (Gemini Nano) runs 100% on your device</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <Server className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <span>Self-hosted models on your own infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <Shield className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <span>TEE-protected execution with hardware encryption</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#9aa0a6]">
                    <FileCheck className="w-5 h-5 text-[#8ab4f8] mt-0.5 flex-shrink-0" />
                    <span>Cryptographic attestation for compliance audits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-16 border-t border-[#3c4043]">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-normal text-center text-[#e8eaed] mb-12">
              Built for regulated industries
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Tax */}
              <Card className="bg-[#292a2d] border-[#3c4043] hover:border-[#5f6368] transition-colors">
                <CardContent className="p-6">
                  <Calculator className="w-8 h-8 text-[#9aa0a6] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Tax Professionals</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Auto-download 1099s, W2s from IRS and brokerages. Parse documents. Generate tax planning insights.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      IRS compliance maintained
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Client data never exposed
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Legal */}
              <Card className="bg-[#292a2d] border-[#3c4043] hover:border-[#5f6368] transition-colors">
                <CardContent className="p-6">
                  <Scale className="w-8 h-8 text-[#9aa0a6] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Legal Practice</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Research case law. Draft contracts. Review documents. All without privilege risks.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Attorney-client privilege protected
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Full audit trail
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Financial */}
              <Card className="bg-[#292a2d] border-[#3c4043] hover:border-[#5f6368] transition-colors">
                <CardContent className="p-6">
                  <Building2 className="w-8 h-8 text-[#9aa0a6] mb-4" />
                  <h3 className="text-lg font-medium text-[#e8eaed] mb-2">Financial Advisory</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Aggregate accounts. Portfolio analysis. Tax-loss harvesting. Client reporting.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9aa0a6]">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      SEC/FINRA compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#5f6368]" />
                      Fiduciary-grade privacy
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Levels */}
        <section className="w-full py-16 border-t border-[#3c4043]">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-normal text-center text-[#e8eaed] mb-12">
              Three levels of protection
            </h2>

            <div className="space-y-4">
              {/* Level 1 */}
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <div className="w-10 h-10 bg-[#3c4043] rounded-full flex items-center justify-center flex-shrink-0">
                  <HardDrive className="w-5 h-5 text-[#9aa0a6]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#e8eaed]">Local AI</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    Gemini Nano runs entirely in your browser. Zero network requests. Works offline.
                  </p>
                </div>
                <span className="text-xs text-[#81c995] bg-[#81c995]/10 px-2 py-1 rounded ml-auto">Included</span>
              </div>

              {/* Level 2 */}
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <div className="w-10 h-10 bg-[#3c4043] rounded-full flex items-center justify-center flex-shrink-0">
                  <Server className="w-5 h-5 text-[#9aa0a6]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#e8eaed]">Self-Hosted</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    Run DeepSeek, Llama, or any open model on your own servers. Your infrastructure, your control.
                  </p>
                </div>
                <span className="text-xs text-[#8ab4f8] bg-[#8ab4f8]/10 px-2 py-1 rounded ml-auto">Professional</span>
              </div>

              {/* Level 3 */}
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <div className="w-10 h-10 bg-[#3c4043] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#9aa0a6]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#e8eaed]">TEE-Protected</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    Hardware-encrypted execution with Intel TDX. Cryptographic proof of secure execution. Remote attestation API.
                  </p>
                </div>
                <span className="text-xs text-[#f28b82] bg-[#f28b82]/10 px-2 py-1 rounded ml-auto">Enterprise</span>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Box - Like Chrome's incognito */}
        <section className="w-full py-16 border-t border-[#3c4043]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto">
            <div className="bg-[#292a2d] rounded-lg border border-[#3c4043] p-6">
              <div className="flex items-start gap-4">
                <UserX className="w-6 h-6 text-[#f28b82] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-[#e8eaed] mb-2">Others who might see your activity</h3>
                  <p className="text-sm text-[#9aa0a6] mb-4">
                    Going incognito doesn't hide your browsing from your employer, your internet service provider, 
                    or the websites you visit. Vibe Incognito specifically protects your <strong className="text-[#e8eaed]">AI interactions</strong> and 
                    <strong className="text-[#e8eaed]"> client data</strong> from being sent to third-party AI providers.
                  </p>
                  <Link href="/tee" className="text-sm text-[#8ab4f8] hover:underline">
                    Learn more about our privacy architecture →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 border-t border-[#3c4043]">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl font-normal text-[#e8eaed] mb-4">
              Ready to go incognito?
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Join professionals who trust Vibe with their most sensitive client work.
            </p>
            <WaitlistDialog>
              <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                Request Enterprise Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </WaitlistDialog>
            <p className="text-xs text-[#5f6368] mt-6">
              enterprise@vibebrowser.app
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#3c4043] bg-[#202124]">
        <div className="container max-w-5xl px-4 md:px-6 py-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9aa0a6]">
            <span>© 2026 Vibe Technologies</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#e8eaed] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#e8eaed] transition-colors">Terms</Link>
              <Link href="/tee" className="hover:text-[#e8eaed] transition-colors">TEE Research</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
