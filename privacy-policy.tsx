"use client"

import React from "react"
import Link from "next/link"
import { Shield, Lock, Eye, Database, Globe, MessageSquare, ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe AI Browser Co-Pilot
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">

            {/* Introduction */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Our Commitment to Privacy</h2>
                  <p className="text-muted-foreground">
                    Vibe AI Browser Co-Pilot is designed with privacy as a core principle. We believe you should have
                    full control over your data and understand exactly how it's used. This policy explains our practices
                    in plain language.
                  </p>
                </div>
              </div>
            </section>

            {/* Data We Collect */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Data We Process</h2>

                  <h3 className="font-medium mt-4 mb-2">When You Use the Extension</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>Page Content:</strong> When you initiate a task, we analyze the current webpage to understand context and execute your request</li>
                    <li><strong>Your Commands:</strong> Natural language instructions you provide via the side panel</li>
                    <li><strong>Browser Interactions:</strong> Clicks, form inputs, and navigation actions performed by the AI agent on your behalf</li>
                  </ul>

                  <h3 className="font-medium mt-4 mb-2">What We Store Locally</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>Settings:</strong> Your AI provider preference, model selection, and configuration options</li>
                    <li><strong>Chat Sessions:</strong> Serialized conversation history for session continuity</li>
                    <li><strong>API Keys:</strong> User-provided keys for AI providers (encrypted in browser storage)</li>
                    <li><strong>OAuth Tokens:</strong> Authentication tokens for services like OpenRouter</li>
                    <li><strong>Cached Data:</strong> Available AI models from providers to reduce API calls</li>
                  </ul>

                  <h3 className="font-medium mt-4 mb-2">What We Do NOT Collect</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Passwords or login credentials</li>
                    <li>Personal identification information</li>
                    <li>Browsing history when the agent is not active</li>
                    <li>Data from pages you visit without initiating a task</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Local AI Option */}
            <section className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-sm border border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">100% Local AI Option</h2>
                  <p className="text-muted-foreground mb-4">
                    When using Gemini Nano (Chrome's built-in AI) or bringing your own local model:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>All processing happens on your device</strong> - no data leaves your computer</li>
                    <li>No internet connection required for AI inference</li>
                    <li>Complete privacy - we cannot see your queries or page content</li>
                    <li>No usage limits or quotas</li>
                  </ul>
                  <p className="mt-4 text-sm text-green-700 font-medium">
                    This is our recommended option for maximum privacy.
                  </p>
                </div>
              </div>
            </section>

            {/* Cloud AI */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">When Using Cloud AI Providers</h2>
                  <p className="text-muted-foreground mb-4">
                    If you choose to use cloud AI models (OpenAI GPT-4, Anthropic Claude, Google Gemini, etc.):
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Your queries and relevant page content are sent to the selected AI provider's API</li>
                    <li>Data is transmitted over encrypted HTTPS connections</li>
                    <li>Each provider has their own privacy policy governing data retention</li>
                    <li>We do not store or log your API requests on our servers</li>
                  </ul>

                  <h3 className="font-medium mt-4 mb-2">Third-Party AI Providers</h3>
                  <p className="text-muted-foreground">
                    When using cloud AI, your data is subject to the provider's privacy policy:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                    <li><a href="https://openai.com/privacy" className="text-purple-600 hover:underline">OpenAI Privacy Policy</a></li>
                    <li><a href="https://www.anthropic.com/privacy" className="text-purple-600 hover:underline">Anthropic Privacy Policy</a></li>
                    <li><a href="https://policies.google.com/privacy" className="text-purple-600 hover:underline">Google Privacy Policy</a></li>
                    <li><a href="https://azure.microsoft.com/privacy" className="text-purple-600 hover:underline">Microsoft Azure Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>Page content and queries:</strong> Processed in real-time and discarded immediately after task completion</li>
                    <li><strong>Local settings:</strong> Stored in your browser until you clear extension data or uninstall</li>
                    <li><strong>Session history:</strong> Stored locally in your browser, not synced to any server</li>
                    <li><strong>No server-side storage:</strong> We do not maintain databases of user activity</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Permissions */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Browser Permissions Explained</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium">All URLs Access</h3>
                  <p className="text-sm text-muted-foreground">Required to execute workflows on any website you direct the agent to. Content is only accessed when you explicitly initiate a task.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium">Tabs</h3>
                  <p className="text-sm text-muted-foreground">Manages multiple tabs for multi-site workflows (e.g., comparing prices across sites).</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium">Scripting</h3>
                  <p className="text-sm text-muted-foreground">Injects scripts to analyze page content and interact with forms. Only active during task execution.</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-medium">Storage</h3>
                  <p className="text-sm text-muted-foreground">Saves your preferences locally (AI provider, model selection, settings).</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> All your data is stored locally - you have direct access</li>
                <li><strong>Deletion:</strong> Clear extension data or uninstall to remove all local data</li>
                <li><strong>Control:</strong> Choose which AI provider processes your data, or use local AI for complete privacy</li>
                <li><strong>Transparency:</strong> The extension is open-source - you can review the code</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Questions?</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Email: <a href="mailto:info@vibebrowser.app" className="text-purple-600 hover:underline">info@vibebrowser.app</a></li>
                    <li>GitHub: <a href="https://github.com/nicejazzyou/nicejazz-vibe" className="text-purple-600 hover:underline">github.com/nicejazzyou/nicejazz-vibe</a></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="text-center text-sm text-muted-foreground pt-8 border-t">
              <p>
                We may update this privacy policy from time to time. We will notify you of any significant changes
                by updating the "Last updated" date at the top of this page.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-8">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Vibe AI Browser Co-Pilot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
