"use client"

import React from "react"
import Link from "next/link"
import { Shield, Lock, Eye, Database, Globe, MessageSquare, ArrowLeft, CheckCircle, XCircle, Server, Key, Radio, Baby } from "lucide-react"

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
            <p className="text-muted-foreground">Last updated: August 2026 | Provider: Vibe Technologies, LLC</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">

            {/* Introduction / scope */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Scope and Commitment</h2>
                  <p className="text-muted-foreground mb-4">
                    This Privacy Policy describes how Vibe Technologies, LLC handles information across <strong>all</strong> parts
                    of the product. It covers three components, because they have genuinely different data flows:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>The Extension</strong> — the Vibe Co-Pilot browser extension running in your Chrome profile.</li>
                    <li><strong>The MCP server / CLI</strong> — <code>vibebrowser-mcp</code> and <code>vibebrowser-cli</code>, which run as
                      local processes on your own machine and let an AI client drive your browser.</li>
                    <li><strong>The hosted relay</strong> — <code>relay.api.vibebrowser.app</code>, the internet connector used when a
                      cloud assistant (Claude, ChatGPT) has no other route to your browser.</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    This product controls a <em>real, logged-in browser</em>. We would rather be blunt than reassuring: read the
                    relay and credential sections below before you connect a cloud assistant.
                  </p>
                </div>
              </div>
            </section>

            {/* Which path you're on */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Local Path vs. Relay Path</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3 font-semibold">Path</th>
                          <th className="text-left py-2 px-3 font-semibold">Where tool calls and page content travel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-3 font-medium">Local (stdio) MCP server</td>
                          <td className="py-2 px-3 text-muted-foreground">
                            Between the AI client and the Extension on <code>127.0.0.1</code>. Nothing about the tool call
                            reaches Vibe servers. The MCP server ships no analytics and no error-reporting SDK.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-medium">Hosted relay (remote connector)</td>
                          <td className="py-2 px-3 text-muted-foreground">
                            Through <code>relay.api.vibebrowser.app</code>. Tool calls and their results — which include page
                            text, DOM structure, and screenshots — transit our infrastructure. See the next section.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm">
                    If you do not want browser-control traffic to touch the internet at all, use the{" "}
                    <Link href="/mcp-stdio" className="text-purple-600 hover:underline">local stdio setup</Link>.
                  </p>
                </div>
              </div>
            </section>

            {/* Relay */}
            <section id="relay" className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Radio className="w-5 h-5 text-orange-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">The Relay: What Transits, What Is Logged, What Is Kept</h2>

                  <h3 className="font-semibold text-base mt-4 mb-2">What transits the relay</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>MCP JSON-RPC tool calls from your AI client: the tool name and its arguments.</li>
                    <li>The results your browser returns: page text, DOM structure, screenshots, tab and navigation data.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">What is <em>stored</em> vs. <em>passed through</em></h3>
                  <p className="text-muted-foreground mb-4">
                    Tool arguments, tool results, page content and screenshots are <strong>passed through</strong>. The relay
                    keeps live session state in memory only and does not write those payloads to disk or to a database.
                    Live-session state (the connection registration and its secret) is held in memory and is destroyed when
                    the session is revoked or the service restarts.
                  </p>

                  <h3 className="font-semibold text-base mb-2">What <em>is</em> logged — plainly</h3>
                  <p className="text-muted-foreground mb-2">
                    The relay writes a structured security audit record for every connection and every tool call. Each record
                    contains:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Timestamp, event type (register / attach / deny / tool call / control call) and surface.</li>
                    <li>A <strong>SHA-256 digest</strong> of the routing session identifier — never the identifier itself.</li>
                    <li>The <strong>tool name</strong>, and the argument <strong>key names with their value <em>types</em></strong>
                      (e.g. <code>url: string</code>) — never the argument values.</li>
                    <li>Client <strong>IP address</strong>, <code>Origin</code> and <code>User-Agent</code> — this is personal data,
                      and we record it deliberately, because without it a leaked connection URL cannot be investigated.</li>
                    <li>The allow/deny outcome and reason.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    Tool <em>results</em>, response payloads and page content are <strong>not</strong> written to the audit log.
                  </p>

                  <h3 className="font-semibold text-base mb-2">Retention</h3>
                  <p className="text-muted-foreground mb-4">
                    Audit records go to the service&apos;s standard output (captured as platform logs) and to a size-bounded
                    file on the host. That file rotates by size — by default up to 120 files of 16&nbsp;MB each. Records are
                    pruned only when that size/count cap is reached, which at real relay volumes retains well beyond 90 days.
                    We keep audit records for security investigation, not for profiling, and we do not use them for advertising.
                  </p>

                  <h3 className="font-semibold text-base mb-2">Honest history</h3>
                  <p className="text-muted-foreground">
                    Two separate defects previously caused live routing identifiers to appear in plaintext in logs or CI output.
                    Both were fixed. Today every log path masks the identifier as a truncated SHA-256 fingerprint
                    unconditionally, and an automated test scans the full server output on every build and fails it if any
                    credential appears. We are stating this because a policy that only lists successes is not a useful policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Credentials and revocation */}
            <section className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 shadow-sm border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Key className="w-5 h-5 text-amber-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Your Connection URL Is a Credential</h2>
                  <p className="text-muted-foreground mb-4">
                    The remote connector URL contains a routing identifier that is a <strong>bearer capability</strong>: anyone
                    who holds that string can drive your logged-in browser and act as you on any site you are signed into.
                    Treat it exactly like a password. Never commit it, paste it into a shared chat or issue, or include it in a
                    screenshot. It can also be supplied as an <code>X-Remote-Session</code> or <code>Authorization: Bearer</code>
                    header, which keeps it out of URLs, proxy logs and browser history — prefer that whenever your client can send headers.
                  </p>

                  <h3 className="font-semibold text-base mb-2">How to revoke</h3>
                  <p className="text-muted-foreground">
                    In the Extension: <strong>Settings → AI Agent Control → Remote (internet) → Relay access</strong>. Disable
                    remote access or regenerate the session. Revocation is enforced server-side: the relay tears down the live
                    browser socket, fails in-flight requests, closes every attached agent connection, and deletes the stored
                    credentials so the old identifier can never re-register. If you believe a URL has leaked, revoke first and
                    email <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Local Storage */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Information Stored Locally (Extension)</h2>
                  <p className="text-muted-foreground mb-4">
                    The following is stored in your browser profile&apos;s local storage only — never on our servers:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>API Keys:</strong> Third-party AI service API keys (OpenAI, Anthropic, Google Gemini, OpenRouter)</li>
                    <li><strong>User Settings:</strong> Extension configuration preferences (model selection, feature toggles)</li>
                    <li><strong>OAuth Tokens:</strong> Authentication tokens for supported OAuth providers</li>
                    <li><strong>Browser Data:</strong> Tab URLs, page content, browsing history, bookmarks — read on demand and
                      processed for the task you asked for</li>
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

                  <p className="text-muted-foreground mb-4 text-sm">
                    Full detail on every recipient below — including region and status — is in the{" "}
                    <Link href="/subprocessors" className="text-purple-600 hover:underline">Subprocessors list</Link>.
                  </p>

                  <h3 className="font-semibold text-base mt-4 mb-2">To AI model providers (OpenAI, Anthropic, Google, DeepSeek, OpenRouter, and any provider you configure):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Your prompts and queries</li>
                    <li>Page content and DOM structure, including screenshots when the task needs them</li>
                    <li>Browser tab information and automation task context</li>
                  </ul>
                  <p className="text-muted-foreground mb-4 text-sm">
                    When you connect a cloud assistant as a remote connector, that assistant&apos;s vendor is the model
                    provider and their privacy policy governs what they do with the content your browser returns.
                  </p>

                  <h3 className="font-semibold text-base mb-2">To Google Analytics 4 (product analytics):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Events are sent through a first-party endpoint on <code>api.vibebrowser.app</code>, which forwards them
                      to GA4. A credential-free direct fallback to Google is used only if that endpoint reports it is unconfigured.</li>
                    <li>A pseudonymous client identifier and a <strong>hashed</strong> user identifier; your plan tier.</li>
                    <li>Event names and low-cardinality properties only. For settings changes we send the setting <em>key name</em>,
                      never its value. The MCP usage event sends exactly <code>route_mode</code>, <code>surface</code> and{" "}
                      <code>tool_class</code> — no URLs, prompts, tool arguments, tool results, or raw tool names.</li>
                    <li>Analytics is gated by a consent setting in the Extension and can be turned off.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Sentry (error tracking):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Error messages, stack traces, browser and extension version, and error context.</li>
                    <li>Session replay is disabled; where the replay integration is present it masks all text and blocks all media.</li>
                    <li>Cookies and request headers are stripped, and URLs and error messages are sanitised, before sending.</li>
                    <li>Performance traces are sampled at 10% in production.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Stripe (payments):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Billing is processed by Stripe. Card numbers are entered on Stripe&apos;s systems; we do not receive or
                      store full card details. We receive subscription status and customer identifiers.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Langfuse (optional LLM tracing — off by default):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Disabled unless you supply your own Langfuse credentials. If you enable it, your prompts, model
                      inputs/outputs and page content captured in traces are sent to <strong>your</strong> Langfuse project.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Supabase (account/auth backend):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>If you sign in to the extension&apos;s portal, or sign up for the product waitlist: your account
                      email, OAuth identity, subscription/plan status, and (for the waitlist) UTM/referral metadata.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Chatwoot, self-hosted (customer support):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Only if you email <code>support@vibebrowser.app</code> or file an in-app report: the content of
                      your message and your email address, routed through a Cloudflare Email Worker into our
                      self-hosted Chatwoot support desk.</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">To Cloudflare (CDN, DNS, Workers) and Oracle Cloud Infrastructure (hosting):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Standard request metadata for traffic these providers route or host on our behalf (IP, headers,
                      the data described elsewhere in this policy at rest). Neither makes independent use of your data
                      beyond providing infrastructure to us.</li>
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
                  <h2 className="text-xl font-semibold mb-3">What We Do Not Do</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>We do not store your AI provider API keys on our servers.</li>
                    <li>We do not store page content, tool arguments, tool results or screenshots that pass through the relay.</li>
                    <li>We do not log the plaintext routing identifier that grants access to your browser.</li>
                    <li>We do not build a server-side record of the pages you visit or your browsing history.</li>
                    <li>We do not sell your data or share it with third parties for advertising.</li>
                  </ul>
                  <p className="text-muted-foreground mt-4 text-sm">
                    We do <em>not</em> claim to collect no personal data at all. The relay audit log records IP addresses, and
                    analytics records pseudonymous identifiers, as described above.
                  </p>
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
                    <li>API keys are stored in Chrome&apos;s local storage</li>
                    <li>Storage is isolated to your browser profile</li>
                    <li>No cloud synchronization of API keys</li>
                    <li>You can clear data by uninstalling the extension</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Transmission Security</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>All relay and API communications use HTTPS / WSS</li>
                    <li>Model provider calls use HTTPS</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Your Responsibility</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Keeping your connection URL secret, and revoking it if it leaks</li>
                    <li>Securing your browser and computer</li>
                    <li>Protecting your API keys and monitoring their usage and costs</li>
                    <li>Deciding which sites you are logged into while an agent is connected</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Third-Party Processors</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">AI Model Providers</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li><a href="https://openai.com/privacy" className="text-purple-600 hover:underline">OpenAI Privacy Policy</a></li>
                    <li><a href="https://www.anthropic.com/privacy" className="text-purple-600 hover:underline">Anthropic Privacy Policy</a></li>
                    <li><a href="https://policies.google.com/privacy" className="text-purple-600 hover:underline">Google Privacy Policy</a></li>
                    <li><a href="https://openrouter.ai/privacy" className="text-purple-600 hover:underline">OpenRouter Privacy Policy</a></li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">Infrastructure and Tooling</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li><strong>Sentry</strong> — error tracking (<a href="https://sentry.io/privacy/" className="text-purple-600 hover:underline">policy</a>)</li>
                    <li><strong>Google Analytics 4</strong> — product analytics (<a href="https://policies.google.com/privacy" className="text-purple-600 hover:underline">policy</a>)</li>
                    <li><strong>Stripe</strong> — payments (<a href="https://stripe.com/privacy" className="text-purple-600 hover:underline">policy</a>)</li>
                    <li><strong>Langfuse</strong> — optional, self-configured LLM tracing (<a href="https://langfuse.com/privacy" className="text-purple-600 hover:underline">policy</a>)</li>
                    <li><strong>Supabase</strong> — account/auth backend and waitlist database (<a href="https://supabase.com/privacy" className="text-purple-600 hover:underline">policy</a>)</li>
                    <li><strong>Chatwoot</strong> — self-hosted customer support desk (no third-party data processor beyond our own infrastructure)</li>
                    <li><strong>Cloudflare</strong> — CDN, DNS, and the support-email Worker (<a href="https://www.cloudflare.com/privacypolicy/" className="text-purple-600 hover:underline">policy</a>)</li>
                    <li><strong>Oracle Cloud Infrastructure</strong> — backend hosting (<a href="https://www.oracle.com/legal/privacy/" className="text-purple-600 hover:underline">policy</a>)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-3">
                    Full list with data categories, purpose and region: <Link href="/subprocessors" className="text-purple-600 hover:underline">Subprocessors</Link>.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">We are not responsible for third-party privacy practices.</p>
            </section>

            {/* Your Rights */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-3">Your Rights and Choices</h2>

                  <h3 className="font-semibold text-base mt-4 mb-2">Control</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>View and change stored settings in the Extension settings page</li>
                    <li>Delete API keys at any time</li>
                    <li>Revoke remote relay access at any time (see above)</li>
                    <li>Use the local stdio path so no browser-control traffic reaches our servers</li>
                    <li>Clear all extension data by uninstalling</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Opt-outs</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li><strong>Analytics:</strong> consent setting in the Extension — see the{" "}
                      <Link href="/telemetry" className="text-purple-600 hover:underline">Telemetry &amp; Support page</Link> for exactly what this controls and how the opt-out is enforced.</li>
                    <li><strong>Error tracking:</strong> Extension settings</li>
                    <li><strong>Model providers:</strong> you choose which ones to configure</li>
                  </ul>

                  <h3 className="font-semibold text-base mb-2">Access, correction and deletion</h3>
                  <p className="text-muted-foreground">
                    Depending on where you live (including under the GDPR and the CCPA/CPRA) you may have the right to access,
                    correct, delete, or restrict processing of your personal data, and to object to it. Email{" "}
                    <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a>{" "}
                    and we will respond within 30 days. Because relay audit records are keyed to a hashed session identifier
                    rather than to your name, you may need to supply the session identifier or the approximate time and IP of
                    use so we can locate the records.
                  </p>
                </div>
              </div>
            </section>

            {/* Children */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Baby className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Children</h2>
                  <p className="text-muted-foreground">
                    Vibe is not directed to children. It is not intended for use by anyone under 13, or under 16 in
                    jurisdictions where that is the applicable age of digital consent. We do not knowingly collect personal
                    data from children. If you believe a child has used the product and provided personal data, contact{" "}
                    <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a>{" "}
                    and we will delete it.
                  </p>
                </div>
              </div>
            </section>

            {/* Browser Permissions */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-slate-600" />
                </div>
                <div className="w-full">
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
                      <p className="text-sm text-muted-foreground">Display the extension&apos;s side panel interface</p>
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
                  <p className="text-muted-foreground mt-4 text-sm">These permissions are necessary for functionality and are not used for tracking.</p>
                </div>
              </div>
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
                      <td className="py-2 px-3 text-amber-600 font-medium">LIMITED</td>
                      <td className="py-2 px-3 text-muted-foreground">IP address, Origin and User-Agent in relay security audit records; billing identity held by Stripe</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Health information</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Not collected</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Financial information</td>
                      <td className="py-2 px-3 text-red-600 font-medium">NO</td>
                      <td className="py-2 px-3 text-muted-foreground">Payments handled by Stripe; we do not receive or store card details</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Authentication information</td>
                      <td className="py-2 px-3 text-green-600 font-medium">YES</td>
                      <td className="py-2 px-3 text-muted-foreground">API keys and OAuth tokens stored locally; relay session credentials held in memory server-side</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Personal communications</td>
                      <td className="py-2 px-3 text-amber-600 font-medium">TRANSIT ONLY</td>
                      <td className="py-2 px-3 text-muted-foreground">The agent may read page content, including messages, during a task; it transits the relay but is not stored by us</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Location</td>
                      <td className="py-2 px-3 text-amber-600 font-medium">INFERRED</td>
                      <td className="py-2 px-3 text-muted-foreground">No GPS or precise location. IP addresses in audit records imply approximate location</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Web history</td>
                      <td className="py-2 px-3 text-amber-600 font-medium">LOCAL ONLY</td>
                      <td className="py-2 px-3 text-muted-foreground">Read locally for context; not stored on our servers</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">User activity</td>
                      <td className="py-2 px-3 text-green-600 font-medium">YES</td>
                      <td className="py-2 px-3 text-muted-foreground">Error reports and consent-gated, low-cardinality analytics events; relay audit records of tool names and argument key shapes</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Website content</td>
                      <td className="py-2 px-3 text-amber-600 font-medium">TRANSIT ONLY</td>
                      <td className="py-2 px-3 text-muted-foreground">Extracted during task execution, sent to your model provider, and relayed if you use a remote connector — not stored by us</td>
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
                    Vibe Technologies, LLC is the data controller. Contact us at:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Vibe Technologies, LLC</strong></li>
                    <li>519 S Henderson St, Seattle, WA 98108-4522, United States</li>
                    <li>Email: <a href="mailto:privacy@vibebrowser.app" className="text-purple-600 hover:underline">privacy@vibebrowser.app</a></li>
                    <li>Website: <a href="https://vibebrowser.app" className="text-purple-600 hover:underline">https://vibebrowser.app</a></li>
                    <li>Support, refunds and telemetry detail: <Link href="/telemetry" className="text-purple-600 hover:underline">Telemetry &amp; Support</Link> · <Link href="/refund" className="text-purple-600 hover:underline">Refund Policy</Link> · <Link href="/subprocessors" className="text-purple-600 hover:underline">Subprocessors</Link></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="text-center text-sm text-muted-foreground pt-8 border-t">
              <p>
                We may update this privacy policy. Material changes will be reflected in the &ldquo;Last updated&rdquo; date above.
                Continued use of the Extension, the MCP server, or the relay constitutes acceptance of the updated policy.
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
