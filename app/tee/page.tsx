"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  FileText, 
  Shield, 
  Lock, 
  Download,
  ExternalLink,
  Github
} from "lucide-react"

export default function TeePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
            Vibe AI Browser Co-Pilot
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent sm:hidden">
            Vibe
          </span>
        </div>
        <nav className="flex gap-4">
          <Link href="/" className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-green-100 text-green-700 border-green-200 mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Research Paper
              </Badge>
              
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Privacy-Preserving LLM Inference with
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Hardware-Attested TEEs</span>
              </h1>
              
              <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-6">
                Our research on deploying Large Language Model inference within Trusted Execution Environments 
                with cryptographic remote attestation. Running DeepSeek models on Azure Confidential VMs with Intel TDX.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Hardware-enforced encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Remote attestation API</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Open-source infrastructure</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => window.open('/tee-research-paper.pdf', '_blank')}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.open('https://github.com/VibeTechnologies/TrustedGenAi', '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Viewer */}
        <section className="w-full pb-12 md:pb-24">
          <div className="container max-w-6xl px-4 md:px-6 mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">TEE Research Paper</span>
                </div>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => window.open('/tee-research-paper.pdf', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in New Tab
                </Button>
              </div>
              <div className="w-full" style={{ height: '80vh' }}>
                <iframe 
                  src="/tee-research-paper.pdf" 
                  className="w-full h-full border-0"
                  title="TEE Research Paper"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Paper Abstract/Summary */}
        <section className="w-full py-12 md:py-16 bg-slate-50">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold mb-6">Abstract</h2>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We present an open-source infrastructure for deploying Large Language Model (LLM) inference 
                within Trusted Execution Environments (TEEs) with cryptographic remote attestation. Our 
                implementation runs self-hosted DeepSeek models on Azure Confidential VMs with Intel TDX, 
                providing hardware-enforced memory encryption and verifiable privacy guarantees.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We introduce a remote attestation API that enables clients to cryptographically verify TEE 
                execution before submitting sensitive prompts. Our production deployment demonstrates practical 
                feasibility with <strong>12 tokens/second on CPU TEE</strong> and projects <strong>150+ tokens/second 
                on GPU TEE</strong> with NVIDIA H100 Confidential Computing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The complete infrastructure, including Terraform configurations and attestation services, 
                is available at{' '}
                <a 
                  href="https://github.com/VibeTechnologies/TrustedGenAi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  github.com/VibeTechnologies/TrustedGenAi
                </a>.
              </p>
            </div>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Key Contributions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Production TEE-LLM Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">
                      End-to-end LLM inference on Azure Confidential VMs with Intel TDX
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Remote Attestation API</h4>
                    <p className="text-sm text-muted-foreground">
                      Cryptographic proof of TEE execution for client verification
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Open-Source Implementation</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete Terraform configs, attestation services, and examples
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Performance Benchmarks</h4>
                    <p className="text-sm text-muted-foreground">
                      Empirical measurements on CPU TEE and GPU TEE projections
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white">
        <div className="container max-w-7xl px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-8 h-8 object-contain" />
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Vibe AI Browser Co-Pilot
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Vibe Technologies, LLC. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
