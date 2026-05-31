import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — OpenCode Mobile",
  description:
    "Privacy policy for OpenCode Mobile (cc.agentlabs.opencode). We do not collect your code, prompts, or AI responses. Anonymous crash diagnostics via Sentry, opt-in only.",
  alternates: {
    canonical: "https://www.vibebrowser.app/opencode/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function OpenCodePrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
      {/* Nav */}
      <header className="border-b border-[#3c4043] bg-[#202124]/95 backdrop-blur supports-[backdrop-filter]:bg-[#202124]/80 sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="font-semibold tracking-tight text-[#e8eaed] hover:text-white">
            Agent Labs
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/opencode" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
              OpenCode
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-20">
        {/* Header */}
        <div className="mb-10 border-b border-[#3c4043] pb-8">
          <h1 className="text-3xl font-bold text-[#e8eaed] mb-3">
            OpenCode Mobile — Privacy Policy
          </h1>
          <p className="text-sm text-[#9aa0a6]">
            Effective date: 2026-05-24 &nbsp;·&nbsp; Operator: VIBE TECHNOLOGIES, LLC &nbsp;·&nbsp;
            App: OpenCode Mobile (<code className="text-[#81c995]">cc.agentlabs.opencode</code>)
          </p>
        </div>

        {/* Summary callout */}
        <div className="rounded-xl border border-[#81c995]/20 bg-[#81c995]/5 p-6 mb-10">
          <p className="text-sm text-[#e8eaed] leading-relaxed">
            <strong className="text-[#81c995]">Summary:</strong> OpenCode Mobile does not collect
            your code, prompts, AI responses, server URLs, or any chat content. All AI traffic goes
            directly from the app to your own opencode server. We use Sentry only for anonymous
            crash diagnostics, and only with your consent.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-[#9aa0a6]">

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">1.</span> Who We Are
            </h2>
            <p className="leading-relaxed mb-3">
              OpenCode Mobile is developed and distributed by <strong className="text-[#e8eaed]">VIBE TECHNOLOGIES, LLC</strong>,
              a Washington State limited liability company.
            </p>
            <p className="leading-relaxed mb-3">
              Address: 519 S Henderson St, Seattle, WA 98108-4522, USA<br />
              Contact:{" "}
              <a href="mailto:support@vibebrowser.app" className="text-[#8ab4f8] hover:text-[#aecbfa]">
                support@vibebrowser.app
              </a>
            </p>
            <p className="leading-relaxed">
              The app is open-source (MIT license). Source code:{" "}
              <a
                href="https://github.com/dzianisv/opencode-mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8ab4f8] hover:text-[#aecbfa]"
              >
                github.com/dzianisv/opencode-mobile
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">2.</span> Data We Do NOT Collect
            </h2>
            <p className="leading-relaxed mb-4">
              We want to be explicit about what we never collect, transmit to our servers, or share
              with third parties:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Your code, files, or repository content",
                "Your prompts, chat messages, or AI responses",
                "Your opencode server URL, IP address, or hostname",
                "Authentication tokens, API keys, or credentials you enter",
                "Account information, email addresses, or names",
                "Location data",
                "Photos, microphone recordings, or camera data (unless you attach them to a message, in which case they go only to your own server)",
                "Contacts, calendar, or any other personal data",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed mt-4">
              All communication between the app and your AI coding agent travels directly between
              your device and your self-hosted opencode server. VIBE TECHNOLOGIES, LLC never sees
              this traffic.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">3.</span> Data We Do Collect (Crash Diagnostics)
            </h2>
            <p className="leading-relaxed mb-6">
              With your explicit consent (shown at first launch), we collect anonymous crash
              diagnostic data via <strong className="text-[#e8eaed]">Sentry</strong> to help us
              identify and fix bugs.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-[#3c4043] bg-[#1a1a1a] p-3 text-left text-[#e8eaed] font-semibold">
                      Data type
                    </th>
                    <th className="border border-[#3c4043] bg-[#1a1a1a] p-3 text-left text-[#e8eaed] font-semibold">
                      What is captured
                    </th>
                    <th className="border border-[#3c4043] bg-[#1a1a1a] p-3 text-left text-[#e8eaed] font-semibold">
                      What is NOT captured
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Device info",
                      captured: "Device model (e.g. Pixel 7), OS version, screen resolution, app version",
                      notCaptured: "Device serial number, IMEI, advertising ID",
                    },
                    {
                      type: "Crash / error reports",
                      captured: "Stack traces, exception types and messages, source file names and line numbers",
                      notCaptured: "Variable values at time of crash, no user data in scope",
                    },
                    {
                      type: "Breadcrumbs",
                      captured: "Screen names and function call sequence leading to the crash",
                      notCaptured: "Message bodies, server URLs, prompt text — all stripped before upload",
                    },
                    {
                      type: "App version",
                      captured: "Version string and build number",
                      notCaptured: "—",
                    },
                  ].map((row) => (
                    <tr key={row.type} className="even:bg-[#111111]">
                      <td className="border border-[#3c4043] p-3 text-[#e8eaed] font-medium align-top">
                        {row.type}
                      </td>
                      <td className="border border-[#3c4043] p-3 align-top">{row.captured}</td>
                      <td className="border border-[#3c4043] p-3 align-top">{row.notCaptured}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="leading-relaxed mt-4 text-sm">
              URL scrubbing: before any event is sent to Sentry, our code strips all server URLs,
              authentication tokens, and query parameters. No server hostname or port number ever
              leaves your device via Sentry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">4.</span> Consent and Control
            </h2>
            <p className="leading-relaxed mb-3">
              Crash reporting is <strong className="text-[#e8eaed]">opt-in and off by default</strong>.
              The first time you launch the app you will see a consent prompt. You can change this
              at any time:
            </p>
            <ul className="space-y-2 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                Open the app → <strong className="text-[#e8eaed]">Settings</strong> →{" "}
                <strong className="text-[#e8eaed]">Privacy</strong> →{" "}
                <strong className="text-[#e8eaed]">Crash reporting</strong> toggle.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                When the toggle is off, Sentry is never initialised and no data leaves your device.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">5.</span> Third-Party Services
            </h2>
            <p className="leading-relaxed mb-3">We use one third-party service for diagnostics:</p>
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] p-5 text-sm">
              <p className="font-semibold text-[#e8eaed] mb-1">Sentry — crash and error monitoring</p>
              <p className="mb-1">
                Privacy policy:{" "}
                <a
                  href="https://sentry.io/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:text-[#aecbfa]"
                >
                  sentry.io/privacy
                </a>
              </p>
              <p>
                Data is sent to Sentry's US-based servers and retained for approximately 90 days per
                Sentry's default data-retention policy.
              </p>
            </div>
            <p className="leading-relaxed mt-4 text-sm">
              We use no advertising networks, analytics platforms, social SDKs, or any other
              third-party data collection services. The app contains no ads and no ad SDKs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">6.</span> Data Retention
            </h2>
            <p className="leading-relaxed">
              Crash reports sent to Sentry are retained for approximately 90 days, after which they
              are automatically deleted per Sentry's retention defaults. We do not operate our own
              servers that store your data; there is no VIBE TECHNOLOGIES back end involved in
              normal app usage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">7.</span> Your Rights
            </h2>
            <p className="leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  <strong className="text-[#e8eaed]">Opt out</strong> — disable crash reporting at
                  any time in Settings → Privacy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  <strong className="text-[#e8eaed]">Request deletion</strong> — email{" "}
                  <a href="mailto:support@vibebrowser.app" className="text-[#8ab4f8] hover:text-[#aecbfa]">
                    support@vibebrowser.app
                  </a>{" "}
                  with subject "Data deletion request" and we will request deletion of any crash
                  events associated with your device from Sentry.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  <strong className="text-[#e8eaed]">Access</strong> — request a summary of what
                  diagnostic data (if any) we hold about your device by emailing the same address.
                </span>
              </li>
            </ul>
            <p className="leading-relaxed mt-4 text-sm">
              Residents of the EU/EEA/UK may exercise rights under GDPR/UK GDPR. California
              residents may exercise rights under the CCPA. To do so, contact us at the email above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">8.</span> Children
            </h2>
            <p className="leading-relaxed">
              OpenCode Mobile is a developer tool intended for users aged 18 and over. We do not
              knowingly collect any data from children under 13 (or under 16 in the EU). If you
              believe a child has submitted data, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">9.</span> Security
            </h2>
            <p className="leading-relaxed">
              All diagnostic data is transmitted over HTTPS (TLS 1.2+) to Sentry. We do not
              transmit any data over unencrypted connections. Your opencode server traffic uses
              whatever transport security your server provides — we recommend HTTPS for all
              self-hosted deployments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">10.</span> Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              If we make material changes to this policy, we will update the effective date at the
              top of this page and, where feasible, notify users via an in-app notice. The latest
              version is always available at{" "}
              <Link href="/opencode/privacy" className="text-[#8ab4f8] hover:text-[#aecbfa]">
                www.vibebrowser.app/opencode/privacy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">11.</span> Contact
            </h2>
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] p-5 text-sm">
              <p className="text-[#e8eaed] font-semibold mb-2">VIBE TECHNOLOGIES, LLC</p>
              <p>519 S Henderson St</p>
              <p>Seattle, WA 98108-4522</p>
              <p>USA</p>
              <p className="mt-2">
                Email:{" "}
                <a href="mailto:support@vibebrowser.app" className="text-[#8ab4f8] hover:text-[#aecbfa]">
                  support@vibebrowser.app
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] bg-[#202124] mt-16">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 text-sm text-[#9aa0a6] md:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p>
            &copy; 2026 VIBE TECHNOLOGIES, LLC. OpenCode Mobile is MIT-licensed open-source software.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/opencode" className="hover:text-[#e8eaed] transition-colors">
              OpenCode
            </Link>
            <Link href="/" className="hover:text-[#e8eaed] transition-colors">
              Agent Labs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
