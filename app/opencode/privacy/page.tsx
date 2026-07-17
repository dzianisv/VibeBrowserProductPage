import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — OpenCode Mobile",
  description:
    "Privacy policy for OpenCode Mobile (cc.agentlabs.opencode). We do not collect your code, prompts, or AI responses. Anonymous crash diagnostics via Sentry, opt-in only. Beta/newsletter signup email is collected only if you opt in.",
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
                "Account information, email addresses, or names — except when you explicitly sign up for the closed beta or mailing list at opencode.agentlabs.cc/beta (see Section 3, \"Beta Program & Mailing List Signups\")",
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
              <span className="text-[#81c995]">3.</span> Beta Program &amp; Mailing List Signups
            </h2>
            <p className="leading-relaxed mb-4">
              The closed-beta and news-list signup form at{" "}
              <a
                href="https://opencode.agentlabs.cc/beta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8ab4f8] hover:text-[#aecbfa]"
              >
                opencode.agentlabs.cc/beta
              </a>{" "}
              is a separate, opt-in flow from the app itself. Submitting the form is your consent
              to the collection described here.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-[#3c4043] bg-[#1a1a1a] p-3 text-left text-[#e8eaed] font-semibold">
                      Data type
                    </th>
                    <th className="border border-[#3c4043] bg-[#1a1a1a] p-3 text-left text-[#e8eaed] font-semibold">
                      Why we collect it
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Email address",
                      why: "Required. Used to send your Google Play beta invite (closed beta) or news updates (mailing list), and to add you to the corresponding Brevo mailing list. Beta signups are also added to a Google Group used solely to manage the Play closed-testing tester list.",
                    },
                    {
                      type: "IP address, browser user agent",
                      why: "Collected at signup for spam/duplicate-signup prevention only. Server logs never contain the raw address — logged values are hashed (email) or truncated (IP) so they cannot identify you from the logs alone. The raw values are stored only in our access-controlled database (see Section 8, Access Controls).",
                    },
                  ].map((row) => (
                    <tr key={row.type} className="even:bg-[#111111]">
                      <td className="border border-[#3c4043] p-3 text-[#e8eaed] font-medium align-top">
                        {row.type}
                      </td>
                      <td className="border border-[#3c4043] p-3 align-top">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mt-4 text-sm">
              See Section 7 (Data Retention) for how long this data is kept, Section 8 (Access
              Controls) for who can read it, and Section 9 (Your Rights) for how to request
              deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">4.</span> Data We Do Collect (Crash Diagnostics)
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
              <span className="text-[#81c995]">5.</span> Consent and Control
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
              <span className="text-[#81c995]">6.</span> Third-Party Services
            </h2>
            <p className="leading-relaxed mb-3">We use these third-party services:</p>
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] p-5 text-sm mb-4">
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
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] p-5 text-sm mb-4">
              <p className="font-semibold text-[#e8eaed] mb-1">
                Brevo — mailing list &amp; transactional email (beta/news signups only)
              </p>
              <p>
                Privacy policy:{" "}
                <a
                  href="https://www.brevo.com/legal/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:text-[#aecbfa]"
                >
                  brevo.com/legal/privacypolicy
                </a>
              </p>
            </div>
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] p-5 text-sm mb-4">
              <p className="font-semibold text-[#e8eaed] mb-1">
                Supabase — signup database (beta/news signups only)
              </p>
              <p>
                Privacy policy:{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:text-[#aecbfa]"
                >
                  supabase.com/privacy
                </a>
              </p>
            </div>
            <div className="rounded-xl border border-[#3c4043] bg-[#111111] p-5 text-sm">
              <p className="font-semibold text-[#e8eaed] mb-1">
                Google Groups — closed-beta tester list (beta signups only)
              </p>
              <p>
                Used exclusively to manage the Google Play closed-testing tester list. Privacy
                policy:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:text-[#aecbfa]"
                >
                  policies.google.com/privacy
                </a>
              </p>
            </div>
            <p className="leading-relaxed mt-4 text-sm">
              We use no advertising networks, analytics platforms, social SDKs, or any other
              third-party data collection services. The app itself contains no ads and no ad SDKs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">7.</span> Data Retention
            </h2>
            <p className="leading-relaxed mb-3">
              Crash reports sent to Sentry are retained for approximately 90 days, after which they
              are automatically deleted per Sentry's retention defaults. We do not operate our own
              servers that store your data as part of normal app usage.
            </p>
            <p className="leading-relaxed">
              Beta/mailing-list signup rows (email, IP, user agent) are retained in our database for
              as long as your signup is active. Inactive (`pending`, never enrolled) rows older than
              roughly 24 months are purged in a periodic manual review — there is no automated purge
              job yet. You can request earlier deletion at any time (see Section 9, Your Rights).
              Removing yourself from the Brevo list (unsubscribe link in any email) or leaving the
              Google Group also removes you from that respective system immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">8.</span> Access Controls
            </h2>
            <p className="leading-relaxed mb-3">
              Beta/mailing-list signup data is protected as follows:
            </p>
            <ul className="space-y-2 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  The database table has row-level security enabled. The public API can only insert
                  a new row or update the status of the row it just created — there is no public
                  read (SELECT) policy. Reading the table requires our Supabase service_role key,
                  which is never shipped to the app or the browser.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  All API keys used by the signup backend (Supabase, Brevo, Google service account)
                  are server-only environment variables — none are exposed as `NEXT_PUBLIC_*` or
                  otherwise sent to the client.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  Server logs never contain your raw email or full IP address — see Section 3.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">9.</span> Your Rights
            </h2>
            <p className="leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2 pl-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  <strong className="text-[#e8eaed]">Opt out</strong> — disable crash reporting at
                  any time in Settings → Privacy, or unsubscribe from beta/news emails via the link
                  in any email we send.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  <strong className="text-[#e8eaed]">Request deletion</strong> — email{" "}
                  <a href="mailto:support@vibebrowser.app" className="text-[#8ab4f8] hover:text-[#aecbfa]">
                    support@vibebrowser.app
                  </a>{" "}
                  with subject "Data deletion request" and we will delete your crash events from
                  Sentry and/or your beta/news signup row, Brevo contact, and Google Group
                  membership, as applicable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#81c995] mt-0.5 shrink-0">·</span>
                <span>
                  <strong className="text-[#e8eaed]">Access</strong> — request a summary of what
                  data (diagnostic or signup) we hold about you by emailing the same address.
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
              <span className="text-[#81c995]">10.</span> Children
            </h2>
            <p className="leading-relaxed">
              OpenCode Mobile is a developer tool intended for users aged 18 and over. We do not
              knowingly collect any data from children under 13 (or under 16 in the EU). If you
              believe a child has submitted data, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">11.</span> Security
            </h2>
            <p className="leading-relaxed">
              All diagnostic data is transmitted over HTTPS (TLS 1.2+) to Sentry, and all signup
              data is transmitted over HTTPS to our backend. We do not transmit any data over
              unencrypted connections. Your opencode server traffic uses whatever transport
              security your server provides — we recommend HTTPS for all self-hosted deployments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#e8eaed] mb-4 flex items-center gap-2">
              <span className="text-[#81c995]">12.</span> Changes to This Policy
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
              <span className="text-[#81c995]">13.</span> Contact
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
