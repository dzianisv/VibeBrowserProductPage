"use client"

import React from "react"
import Link from "next/link"
import { Shield, Lock, Eye, Database, Globe, MessageSquare, ArrowLeft, CheckCircle, XCircle } from "lucide-react"

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 2026 | Provider: Vibe Technologies, LLC</p>
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
                    Vibe Co-Pilot is designed with privacy as a core principle. This Privacy Policy describes how Vibe Technologies, LLC collects, uses, and protects information when you use our Extension. By using Vibe, you consent to the data practices described in this policy.
                  </p>
                </div>
              </div>
            </section>

            {/* What We Collect - Local Storage */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Information Stored Locally</h2>
                  <p className="text-muted-foreground mb-4">
                    The following information is stored locally in your browser storage only - never on our servers:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>API Keys:</strong> Third-party AI service API keys (OpenAI, Anthropic, Google Gemini, OpenRouter)</li>
                    <li><strong>User Settings:</strong> Extension configuration preferences (model selection, feature toggles)</li>
                    <li><strong>OAuth Tokens:</strong> Authentication tokens for supported OAuth providers</li>
                    <li><strong>Browser Data:</strong> Tab URLs, page content, browser history, bookmarks (processed locally for AI analysis)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Transmitted to Third Parties */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Information Transmitted to Third Parties</h2>
                  <p className="text-muted-foreground mb-4">When you use the Extension, the following data may be transmitted to third-party services:</p>

                  <h3 className="font-semibold text-base mt-4 mb-2">To AI Service Providers (OpenAI, Anthropic, Google, OpenRouter):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>User queries and prompts</li>
                    <li>Page content and DOM structure</li>
                    <li>Browser tab information</li>
                    <li>Automation task context</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Sentry.io (Error Tracking):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Error logs and stack traces</li>
                    <li>Browser version and extension version</li>
                    <li>Anonymized usage context</li>
                    <li><strong>No API keys or personal data</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* What We Do NOT Collect */}
            <section className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 shadow-sm border border-red-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">What We Do NOT Collect</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>We do not store your API keys on our servers</li>
                    <li>We do not track your browsing history on our servers</li>
                    <li>We do not collect personally identifiable information</li>
                    <li>We do not sell or share your data with third parties for marketing</li>
                    <li>We do not monitor your extension usage beyond error tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Data Storage and Security</h2>

                  <h3 className="font-semibold text-base mt-4 mb-2">Local Storage</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>API keys are stored in Chrome's local storage</li>
                    <li>Storage is isolated to your browser profile</li>
                    <li>No cloud synchronization of API keys</li>
                    <li>You can clear data by uninstalling the extension</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Transmission Security</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>All API communications use HTTPS</li>
                    <li>API keys are transmitted securely to AI providers</li>
                    <li>OAuth tokens use industry-standard protocols</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Your Responsibility</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Securing your browser and computer</li>
                    <li>Protecting your API keys from unauthorized access</li>
                    <li>Monitoring API usage and costs</li>
                    <li>Keeping your browser and extension updated</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">AI Service Providers</h3>
                  <p className="text-sm text-muted-foreground mb-2">The Extension integrates with third-party AI services. Their privacy policies apply:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li><a href="https://openai.com/privacy" className="text-purple-600 hover:underline">OpenAI Privacy Policy</a></li>
                    <li><a href="https://www.anthropic.com/privacy" className="text-purple-600 hover:underline">Anthropic Privacy Policy</a></li>
                    <li><a href="https://policies.google.com/privacy" className="text-purple-600 hover:underline">Google Privacy Policy</a></li>
                    <li><a href="https://openrouter.ai/privacy" className="text-purple-600 hover:underline">OpenRouter Privacy Policy</a></li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">We are not responsible for third-party privacy practices.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">Error Tracking Service</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Sentry.io:</strong> Error data is subject to <a href="https://sentry.io/privacy/" className="text-purple-600 hover:underline">Sentry's privacy policy</a>. We configure Sentry to minimize data collection and exclude sensitive information.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Your Rights and Choices</h2>

                  <h3 className="font-semibold text-base mt-4 mb-2">Data Access and Control</h3>
                  <p className="text-muted-foreground mb-3">You can:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>View stored settings in the extension settings page</li>
                    <li>Delete API keys at any time</li>
                    <li>Clear all extension data by uninstalling</li>
                    <li>Disable error tracking if the option is provided</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Opt-Out Options</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li><strong>Error Tracking:</strong> Available in extension settings</li>
                    <li><strong>AI Services:</strong> You control which AI services to use via API key configuration</li>
                    <li><strong>Extension Features:</strong> You can disable specific features in settings</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Browser Permissions */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Browser Permissions</h2>
              <p className="text-muted-foreground mb-4">The Extension requests the following browser permissions:</p>
              <div className="space-y-3">
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">activeTab</p>
                  <p className="text-sm text-muted-foreground">Access current tab for automation</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">storage</p>
                  <p className="text-sm text-muted-foreground">Store settings and API keys locally</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">scripting</p>
                  <p className="text-sm text-muted-foreground">Execute scripts for automation</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">tabs</p>
                  <p className="text-sm text-muted-foreground">Manage browser tabs and identify active pages</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">webNavigation</p>
                  <p className="text-sm text-muted-foreground">Monitor page navigation and detect page loads</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">history</p>
                  <p className="text-sm text-muted-foreground">Access history for context and suggestions</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">bookmarks</p>
                  <p className="text-sm text-muted-foreground">Access bookmarks for organization and AI analysis</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">sidePanel</p>
                  <p className="text-sm text-muted-foreground">Display the extension's side panel interface</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">identity</p>
                  <p className="text-sm text-muted-foreground">OAuth authentication</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">Host Permissions (&lt;all_urls&gt;)</p>
                  <p className="text-sm text-muted-foreground">Execute automation tasks on any user-directed website</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">These permissions are necessary for extension functionality and are not used for tracking.</p>
            </section>

            {/* Data Collection Categories */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Data Collection Categories</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Category</th>
                      <th className="text-left py-2 px-3 font-semibold">Collected?</th>
                      <th className="text-left py-2 px-3 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3">Personally identifiable information</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Not collected</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Health information</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Not collected</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Financial information</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Payments handled externally; no financial data stored</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Authentication information</td>
                      <td className="py-2 px-3 text-green-600 font-medium">YES</td>
                      <td className="py-2 px-3 text-muted-foreground">API keys and OAuth tokens stored locally for AI provider access</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Personal communications</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Agent may read content during tasks but processed transiently, not stored</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Location</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Not collected</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Web history</td>
                      <td className="py-2 px-3 text-green-600 font-medium">YES</td>
                      <td className="py-2 px-3 text-muted-foreground">Used to provide context for user queries and suggestions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">User activity</td>
                      <td className="py-2 px-3 text-green-600 font-medium">YES</td>
                      <td className="py-2 px-3 text-muted-foreground">Error logs and usage metrics for service improvement</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Website content</td>
                      <td className="py-2 px-3 text-green-600 font-medium">YES</td>
                      <td className="py-2 px-3 text-muted-foreground">Page content extracted during task execution for AI analysis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Privacy Questions?</h2>
                  <p className="text-muted-foreground mb-4">
                    For privacy questions or concerns, please contact us:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Vibe Technologies, LLC</strong></li>
                    <li>Email: <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a></li>
                    <li>Website: <a href="https://vibebrowser.app" className="text-purple-600 hover:underline">https://vibebrowser.app</a></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="text-center text-sm text-muted-foreground pt-8 border-t">
              <p>
                We may update this privacy policy at any time. Changes will be effective immediately upon posting.
                Continued use of the Extension constitutes acceptance of the updated policy.
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
