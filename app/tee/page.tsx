"use client"

import React from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  FileText, 
  Shield, 
  Lock, 
  Download,
  ExternalLink,
  Github,
  EyeOff,
  Cpu,
  Server,
  CheckCircle,
} from "lucide-react"

export default function TeePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#202124] text-[#e8eaed]">
      {/* Header - Incognito style */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#3c4043] bg-[#202124]/95 backdrop-blur-sm sticky top-0 z-50" role="banner">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#3c4043] rounded-full flex items-center justify-center" aria-hidden="true">
            <EyeOff className="w-4 h-4 text-[#9aa0a6]" />
          </div>
          <span className="text-lg font-medium text-[#e8eaed]">
            Vibe<span className="text-[#9aa0a6]">Incognito</span>
          </span>
        </div>
        <nav className="flex gap-4 items-center" aria-label="TEE page navigation">
          <Link href="/enterprise" className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Incognito
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16" aria-label="TEE whitepaper overview">
          <div className="container max-w-5xl px-4 md:px-6 mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3c4043] text-[#81c995] text-sm font-medium mb-6">
                <Shield className="w-4 h-4" aria-hidden="true" />
                Security Whitepaper
              </div>
              
              <h1 className="text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#e8eaed]">
                Privacy-Preserving LLM Inference with
                <span className="text-[#8ab4f8]"> Hardware-Attested TEEs</span>
              </h1>
              
              <p className="max-w-3xl mx-auto text-lg text-[#9aa0a6] mb-6">
                Our research on deploying Large Language Model inference within Trusted Execution Environments 
                with cryptographic remote attestation. Running DeepSeek models on Azure Confidential VMs with Intel TDX.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center mb-8" role="list" aria-label="Key features">
                <div className="flex items-center gap-2 text-sm text-[#9aa0a6]" role="listitem">
                  <Lock className="w-4 h-4 text-[#81c995]" aria-hidden="true" />
                  <span>Hardware-enforced encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#9aa0a6]" role="listitem">
                  <Shield className="w-4 h-4 text-[#8ab4f8]" aria-hidden="true" />
                  <span>Remote attestation API</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#9aa0a6]" role="listitem">
                  <FileText className="w-4 h-4 text-[#f28b82]" aria-hidden="true" />
                  <span>Open-source infrastructure</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium rounded-full"
                  onClick={() => window.open('/tee-research-paper.pdf', '_blank')}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]"
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
            <div className="bg-[#292a2d] rounded-lg border border-[#3c4043] overflow-hidden">
              <div className="bg-[#3c4043] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#9aa0a6]" />
                  <span className="text-[#e8eaed] font-medium">TEE Security Whitepaper</span>
                </div>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-[#5f6368] hover:bg-[#80868b] text-[#e8eaed] border-0"
                  onClick={() => window.open('/tee-research-paper.pdf', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in New Tab
                </Button>
              </div>
              <div className="w-full bg-[#1a1a1a]" style={{ height: '80vh' }}>
                <iframe 
                  src="/tee-research-paper.pdf" 
                  className="w-full h-full border-0"
                  title="Privacy-Preserving LLM Inference with Hardware-Attested TEEs — Full Research Paper PDF"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Paper Abstract/Summary */}
        <section className="w-full py-12 md:py-16 border-t border-[#3c4043] bg-[#292a2d]" aria-label="Paper abstract and key contributions">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-normal text-[#e8eaed] mb-6">Abstract</h2>
            <div className="bg-[#202124] rounded-lg p-6 border border-[#3c4043]">
              <p className="text-[#9aa0a6] leading-relaxed mb-4">
                We present an open-source infrastructure for deploying Large Language Model (LLM) inference 
                within Trusted Execution Environments (TEEs) with cryptographic remote attestation. Our 
                implementation runs self-hosted DeepSeek models on Azure Confidential VMs with Intel TDX, 
                providing hardware-enforced memory encryption and verifiable privacy guarantees.
              </p>
              <p className="text-[#9aa0a6] leading-relaxed mb-4">
                We introduce a remote attestation API that enables clients to cryptographically verify TEE 
                execution before submitting sensitive prompts. Our production deployment demonstrates practical 
                feasibility with <strong className="text-[#e8eaed]">12 tokens/second on CPU TEE</strong> and projects <strong className="text-[#e8eaed]">150+ tokens/second 
                on GPU TEE</strong> with NVIDIA H100 Confidential Computing.
              </p>
              <p className="text-[#9aa0a6] leading-relaxed">
                The complete infrastructure, including Terraform configurations and attestation services, 
                is available at{' '}
                <a 
                  href="https://github.com/VibeTechnologies/TrustedGenAi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:underline"
                >
                  github.com/AiAgenteq/TrustedGenAi
                </a>.
              </p>
            </div>
            
            <h3 className="text-xl font-normal text-[#e8eaed] mt-10 mb-6">Key Contributions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#202124] rounded-lg p-5 border border-[#3c4043]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#81c995]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5 text-[#81c995]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#e8eaed] mb-1">Production TEE-LLM Infrastructure</h4>
                    <p className="text-sm text-[#9aa0a6]">
                      End-to-end LLM inference on Azure Confidential VMs with Intel TDX
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#202124] rounded-lg p-5 border border-[#3c4043]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#8ab4f8]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#8ab4f8]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#e8eaed] mb-1">Remote Attestation API</h4>
                    <p className="text-sm text-[#9aa0a6]">
                      Cryptographic proof of TEE execution for client verification
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#202124] rounded-lg p-5 border border-[#3c4043]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#c58af9]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Github className="w-5 h-5 text-[#c58af9]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#e8eaed] mb-1">Open-Source Implementation</h4>
                    <p className="text-sm text-[#9aa0a6]">
                      Complete Terraform configs, attestation services, and examples
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#202124] rounded-lg p-5 border border-[#3c4043]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#fdd663]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5 text-[#fdd663]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#e8eaed] mb-1">Performance Benchmarks</h4>
                    <p className="text-sm text-[#9aa0a6]">
                      Empirical measurements on CPU TEE and GPU TEE projections
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why TEE Section */}
        <section className="w-full py-12 md:py-16 border-t border-[#3c4043]" aria-label="Benefits of Trusted Execution Environments">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-normal text-[#e8eaed] mb-6">Why Trusted Execution Environments?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#e8eaed] mb-1">Hardware-Level Isolation</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    TEEs create isolated memory regions that even the cloud provider cannot access. Your prompts and model outputs remain encrypted in memory.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#e8eaed] mb-1">Cryptographic Verification</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    Remote attestation allows clients to verify the exact code running inside the TEE before sending sensitive data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#e8eaed] mb-1">Stronger Privacy Controls</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    Teams can combine TEE infrastructure with their own legal, privacy, and compliance review processes for sensitive AI workloads.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-[#292a2d] rounded-lg border border-[#3c4043]">
                <CheckCircle className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#e8eaed] mb-1">Zero Trust Architecture</h4>
                  <p className="text-sm text-[#9aa0a6]">
                    Trust is established through cryptographic proofs, not contractual promises. The math guarantees privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 border-t border-[#3c4043] bg-[#292a2d]" aria-label="Call to action">
          <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl font-normal text-[#e8eaed] mb-4">
              Ready to deploy privacy-preserving AI?
            </h2>
            <p className="text-[#9aa0a6] mb-8">
              Contact us about enterprise TEE deployment for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enterprise">
                <Button size="lg" className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-6 h-auto rounded-full">
                  Explore Vibe Incognito
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 h-auto rounded-full border-[#5f6368] bg-transparent hover:bg-[#3c4043] text-[#e8eaed]"
                onClick={() => window.open('https://github.com/VibeTechnologies/TrustedGenAi', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View Source Code
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <SiteFooter />
    </div>
  )
}
