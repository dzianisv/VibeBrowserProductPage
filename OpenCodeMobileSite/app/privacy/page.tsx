import type { Metadata } from 'next'
import { readFileSync } from 'node:fs'
import path from 'node:path'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'OpenCode Mobile privacy policy. We do not collect your code, prompts, or AI responses. Crash diagnostics via Sentry are opt-in only.',
  alternates: { canonical: 'https://opencode.agentlabs.cc/privacy' },
  openGraph: {
    title: 'Privacy Policy | OpenCode Mobile',
    description: 'OpenCode Mobile privacy policy — minimal data collection, opt-in crash reporting.',
    url: 'https://opencode.agentlabs.cc/privacy',
  },
}

export default function PrivacyPage() {
  const policyPath = path.join(process.cwd(), 'content/privacy-policy.html')
  const policyHtml = readFileSync(policyPath, 'utf8')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Override the inline HTML colors from the standalone file with dark theme */}
      <style>{`
        .privacy-content body { color: inherit; background: transparent; }
        .privacy-content header { border-bottom-color: #3B82F6; }
        .privacy-content header h1 { color: #F1F5F9; }
        .privacy-content .meta { color: #94A3B8; }
        .privacy-content h2 { color: #F1F5F9; border-left-color: #3B82F6; }
        .privacy-content h3 { color: #F1F5F9; margin: 24px 0 10px; }
        .privacy-content p, .privacy-content li { color: #CBD5E1; }
        .privacy-content a { color: #3B82F6; }
        .privacy-content .highlight-box { background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.4); }
        .privacy-content .highlight-box strong { color: #93C5FD; }
        .privacy-content table { display: block; max-width: 100%; overflow-x: auto; }
        .privacy-content th { background: #1E293B; border-color: #334155; color: #F1F5F9; }
        .privacy-content td { border-color: #334155; color: #CBD5E1; }
        .privacy-content tr:nth-child(even) td { background: rgba(30,41,59,0.5); }
        .privacy-content footer { border-top-color: #334155; color: #64748B; }
        .privacy-content code { color: #94A3B8; font-size: 0.85em; }
      `}</style>
      <div
        className="privacy-content"
        dangerouslySetInnerHTML={{ __html: policyHtml }}
      />
    </div>
  )
}
