"use client"

import React from "react"
import Link from "next/link"
import { Shield, AlertTriangle, Gavel, Lock, AlertCircle, BookOpen, Zap, Scale, ArrowLeft, Info } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe Co-Pilot
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: February 6, 2026 | Provider: Vibe Technologies, LLC</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">

            {/* Acceptance of Terms */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By installing, accessing, or using Vibe Co-Pilot ("Extension"), a product of Vibe Technologies, LLC ("we", "us", "our", "Company"), you ("User", "you", "your") agree to be bound by these Terms of Service ("Terms", "Agreement"). If you do not agree to these Terms, do not install or use the Extension.
                  </p>
                </div>
              </div>
            </section>

            {/* Description of Service */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Description of Service</h2>
                  <p className="text-muted-foreground">
                    Vibe Co-Pilot is a browser extension that provides AI-powered browser automation and natural language processing capabilities. The Extension interacts with third-party AI services and may access web pages, browser tabs, and user data as permitted by your browser and configured settings.
                  </p>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">You agree to:</p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Use the Extension in compliance with all applicable laws and regulations</li>
                    <li>Provide and maintain the security of your own API keys and credentials</li>
                    <li>Not use the Extension for any illegal, harmful, or malicious purposes</li>
                    <li>Not attempt to reverse engineer, decompile, or disassemble the Extension beyond what is permitted by law</li>
                    <li>Not use the Extension to violate the terms of service of any third-party websites or services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* API Keys and Third-Party Services */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">API Keys and Third-Party Services</h2>
                  <p className="text-muted-foreground mb-4">The Extension requires API keys for third-party AI services (OpenAI, Anthropic, Google Gemini, OpenRouter, etc.). You are responsible for:</p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Obtaining and managing your own API keys</li>
                    <li>All costs associated with API usage</li>
                    <li>Compliance with third-party service terms</li>
                    <li>Securing your API keys and preventing unauthorized access</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limited Liability Disclaimer */}
            <section className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 shadow-sm border border-red-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Limited Liability Disclaimer</h2>
                  <p className="text-muted-foreground font-semibold mb-4">THE EXTENSION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.</p>

                  <h3 className="font-semibold text-base mt-4 mb-2">No Warranties</h3>
                  <p className="text-muted-foreground text-sm mb-3">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm mb-4">
                    <li>MERCHANTABILITY</li>
                    <li>FITNESS FOR A PARTICULAR PURPOSE</li>
                    <li>NON-INFRINGEMENT</li>
                    <li>ACCURACY OR RELIABILITY OF RESULTS</li>
                    <li>UNINTERRUPTED OR ERROR-FREE OPERATION</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Limitation of Liability</h3>
                  <p className="text-muted-foreground text-sm mb-3">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VIBE TECHNOLOGIES, LLC, ITS DEVELOPERS, CONTRIBUTORS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR COPYRIGHT HOLDERS BE LIABLE FOR ANY:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm mb-4">
                    <li>DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES</li>
                    <li>LOSS OF PROFITS, DATA, USE, OR GOODWILL</li>
                    <li>SERVICE INTERRUPTION</li>
                    <li>COMPUTER DAMAGE OR SYSTEM FAILURE</li>
                    <li>COST OF SUBSTITUTE SERVICES</li>
                    <li>API USAGE COSTS OR CHARGES</li>
                    <li>DAMAGES RESULTING FROM AUTOMATED ACTIONS TAKEN BY THE EXTENSION</li>
                  </ul>
                  <p className="text-muted-foreground text-sm mb-3">THIS LIMITATION APPLIES EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

                  <h3 className="font-semibold text-base mb-2">Maximum Liability</h3>
                  <p className="text-muted-foreground text-sm">IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID FOR THE EXTENSION (WHICH IS ZERO FOR FREE VERSIONS).</p>
                </div>
              </div>
            </section>

            {/* AI-Generated Content Disclaimer */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">AI-Generated Content Disclaimer</h2>
                  <p className="text-muted-foreground mb-4">The Extension uses AI services to generate content and perform automated actions. You acknowledge that:</p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>AI-generated content may be inaccurate, incomplete, or inappropriate</li>
                    <li>You are solely responsible for reviewing and validating all AI-generated content</li>
                    <li>We are not liable for any damages resulting from AI-generated content or automated actions</li>
                    <li>AI services may have their own limitations, biases, and errors</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Privacy */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Data Privacy</h2>

                  <h3 className="font-semibold text-base mt-4 mb-2">Data Collection</h3>
                  <p className="text-muted-foreground text-sm mb-3">The Extension may collect and process:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm mb-4">
                    <li>Browser tab information and URLs</li>
                    <li>Page content for AI analysis</li>
                    <li>User interactions with the Extension</li>
                    <li>API keys stored locally in your browser</li>
                    <li>Error logs and diagnostic information</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Data Storage</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm mb-4">
                    <li>API keys and settings are stored locally in your browser storage</li>
                    <li>Error tracking data may be sent to Sentry.io for debugging purposes</li>
                    <li>We do not store or have access to your API keys on our servers</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Third-Party Services</h3>
                  <p className="text-muted-foreground text-sm">When you use the Extension, data is transmitted to third-party AI services according to their privacy policies. We are not responsible for how third-party services handle your data.</p>
                </div>
              </div>
            </section>

            {/* Automated Actions */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-pink-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Automated Actions</h2>
                  <p className="text-muted-foreground mb-4">The Extension performs automated browser actions including:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Clicking elements</li>
                    <li>Filling forms</li>
                    <li>Navigating pages</li>
                    <li>Reading page content</li>
                    <li>Accessing browser history and bookmarks</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">You acknowledge that:</p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Automated actions may have unintended consequences</li>
                    <li>You are responsible for monitoring and supervising automated actions</li>
                    <li>We are not liable for damages caused by automated actions</li>
                    <li>Some websites may prohibit automated access</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Additional Legal Sections */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Additional Terms</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">Modifications to Service</h3>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to modify, suspend, or discontinue the Extension at any time, update these Terms at any time, and change features, functionality, or supported services. Continued use of the Extension after changes constitutes acceptance of the modified Terms.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">Termination</h3>
                  <p className="text-sm text-muted-foreground">
                    You may stop using the Extension at any time by uninstalling it from your browser. We reserve the right to terminate or restrict access to the Extension for any reason.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">Intellectual Property</h3>
                  <p className="text-sm text-muted-foreground">
                    The Extension and its original content, features, and functionality are owned by Vibe Technologies, LLC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. "Vibe", "Vibe Technologies", and the Vibe logo are trademarks of Vibe Technologies, LLC. All other trademarks, service marks, and logos are property of their respective owners.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">Indemnification</h3>
                  <p className="text-sm text-muted-foreground">
                    You agree to indemnify, defend, and hold harmless Vibe Technologies, LLC, its officers, directors, employees, agents, licensors, developers, contributors, and copyright holders from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from your use of the Extension, violation of these Terms, violation of third-party rights, or API usage costs incurred through your API keys.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">Governing Law & Dispute Resolution</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these Terms or use of the Extension shall be resolved through good faith negotiation, binding arbitration if negotiation fails, or in the courts of competent jurisdiction if arbitration is not available.
                  </p>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gavel className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Acknowledgment</h2>
                  <p className="text-muted-foreground">
                    BY USING THIS EXTENSION, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE, INCLUDING THE LIMITED LIABILITY DISCLAIMERS.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Questions About These Terms?</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Vibe Technologies, LLC</strong></li>
                <li>Email: <a href="mailto:legal@vibebrowser.app" className="text-purple-600 hover:underline">legal@vibebrowser.app</a></li>
                <li>Website: <a href="https://vibebrowser.app" className="text-purple-600 hover:underline">https://vibebrowser.app</a></li>
              </ul>
            </section>

            {/* Updates */}
            <section className="text-center text-sm text-muted-foreground pt-8 border-t">
              <p>
                We may update these Terms of Service at any time. Changes will be effective immediately upon posting.
                Continued use of the Extension constitutes acceptance of the updated Terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-8">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Vibe Technologies, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
