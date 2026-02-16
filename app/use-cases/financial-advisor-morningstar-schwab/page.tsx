import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Morningstar Schwab research automation for financial advisors | Vibe',
  description:
    'Automate Morningstar research inside Schwab. Vibe AI Browser Co-Pilot extracts fund data, builds comparison tables, and drafts advisor-ready recommendations.',
  alternates: {
    canonical:
      'https://www.vibebrowser.app/use-cases/financial-advisor-morningstar-schwab',
  },
  openGraph: {
    title: 'Morningstar Schwab research automation for financial advisors',
    description:
      'Vibe automates Morningstar research inside Schwab, builds fund comparison tables, and drafts client-ready recommendations.',
    url: 'https://www.vibebrowser.app/use-cases/financial-advisor-morningstar-schwab',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Financial advisor Morningstar research with Vibe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morningstar Schwab research automation for financial advisors',
    description:
      'Vibe automates Morningstar research inside Schwab, builds fund comparison tables, and drafts client-ready recommendations.',
    images: ['/og/home.svg'],
  },
}

const storyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Morningstar Schwab research automation for financial advisors',
  description:
    'A financial advisor uses Vibe AI Browser Co-Pilot to pull Morningstar data from Schwab, build a comparison table, and draft a decision memo.',
  url: 'https://www.vibebrowser.app/use-cases/financial-advisor-morningstar-schwab',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
  },
}

const howToSteps = [
  'Open Schwab and navigate to Morningstar reports for target funds.',
  'Extract fee, risk, and 1/3/5-year performance data.',
  'Normalize metrics into a comparison table.',
  'Draft a recommendation memo with tradeoffs and citations.',
  'Review and approve the memo before sharing with clients.',
]

const faqItems = [
  {
    question: 'Can Vibe access Morningstar data inside Schwab?',
    answer:
      'Yes. Vibe works inside your authenticated Schwab session and can open Morningstar reports directly in the portal.',
  },
  {
    question: 'Does Vibe make the investment decision?',
    answer:
      'No. Vibe gathers data and drafts analysis, but the advisor reviews and approves every recommendation.',
  },
  {
    question: 'Is the output client-ready?',
    answer:
      'Vibe produces a clean comparison table and a recommendation memo that you can edit and send.',
  },
  {
    question: 'How is this different from AI search tools?',
    answer:
      'Vibe works inside authenticated portals like Schwab. Search-only tools cannot access or act inside those sessions.',
  },
]

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Automate Morningstar research inside Schwab',
  description:
    'Use Vibe AI Browser Co-Pilot to extract Morningstar fund data in Schwab and draft advisor-ready recommendations.',
  step: howToSteps.map((text, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: text,
    text,
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function FinancialAdvisorUseCase() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="border-b border-slate-200">
        <div className="container mx-auto px-6 py-10">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700">Finance</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Financial advisor accelerates Morningstar research inside Schwab
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Vibe AI Browser Co-Pilot pulls Morningstar data from Schwab, builds a
            clean comparison table, and drafts a client-ready recommendation memo.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-10">
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Goal',
              text: 'Compare three funds across risk, fees, and trailing performance before a client call.',
            },
            {
              title: 'Tooling',
              text: 'Schwab portal + Morningstar reports + Vibe AI Browser Co-Pilot.',
            },
            {
              title: 'Outcome',
              text: 'Research prep cut from 2 hours to 15 minutes with a ready-to-share summary.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-sm font-semibold text-slate-500 uppercase">
                {item.title}
              </h2>
              <p className="mt-3 text-slate-700 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-4 max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900">Workflow story</h2>
          <p className="text-slate-600">
            The advisor opens Schwab and asks Vibe: "Pull Morningstar data for
            VFINX, VTSAX, and SWPPX. Compare fees, 1/3/5-year performance, and
            risk metrics. Summarize tradeoffs for a conservative client." Vibe
            navigates the reports, extracts the relevant tables, and normalizes
            them into a single comparison view.
          </p>
          <p className="text-slate-600">
            Next, Vibe drafts a memo with a clear recommendation, citing the
            lowest expense ratio, volatility, and performance consistency. The
            advisor reviews the memo, adds a personal note, and sends it to the
            client ahead of the meeting.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">How it works</h3>
            <ol className="mt-4 space-y-2 text-sm text-slate-600 list-decimal list-inside">
              {howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Why Vibe vs Atlas, Comet, Composite, or Strawberry
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Works inside authenticated Schwab sessions and Morningstar reports.</li>
              <li>• Keeps the advisor in control with human approval before sending.</li>
              <li>• Supports privacy-first and self-hosted workflows for regulated teams.</li>
              <li>• Executes full workflows instead of just summarizing search results.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">What Vibe handled</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Logged into Schwab and located Morningstar PDFs.</li>
              <li>• Extracted fees, risk scores, and trailing returns.</li>
              <li>• Built a comparison table formatted for client review.</li>
              <li>• Drafted a recommendation memo with sources.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Advisor review</h3>
            <p className="mt-4 text-sm text-slate-600">
              The advisor verified the numbers, adjusted the risk profile notes,
              and approved the final recommendation. Vibe left the decision in
              the advisor's hands, but removed the repetitive reporting work.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-900">Result</h3>
          <p className="mt-3 text-sm text-slate-600">
            The advisor walked into the meeting with a polished, defensible
            comparison backed by Morningstar data, and spent the call on client
            goals instead of spreadsheet prep.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {faqItems.map((item) => (
              <div key={item.question}>
                <p className="font-medium text-slate-900">{item.question}</p>
                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6 bg-white">
          <h3 className="text-lg font-semibold text-slate-900">Related use cases</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/use-cases/privacy-first-legal-research" className="text-purple-600 hover:text-purple-700">
              Privacy-first legal research in self-hosted case systems
            </Link>
            <Link href="/use-cases/recruiter-linkedin-automation" className="text-purple-600 hover:text-purple-700">
              LinkedIn recruiter automation with skills-based outreach
            </Link>
            <Link href="/mcp" className="text-purple-600 hover:text-purple-700">
              See how Vibe MCP controls authenticated browsers
            </Link>
            <Link href="/teams" className="text-purple-600 hover:text-purple-700">
              Explore Vibe for Teams workflows
            </Link>
          </div>
        </section>

        <Link href="/use-cases" className="text-sm text-purple-600 hover:text-purple-700">
          ← Back to use cases
        </Link>
      </main>
    </div>
  )
}
