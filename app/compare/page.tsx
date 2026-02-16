import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Vibe vs Atlas, Comet, Composite, Strawberry - AI Browser Comparison',
  description:
    'Compare Vibe AI Browser Co-Pilot to OpenAI Atlas, Perplexity Comet, Composite, and Strawberry Browser. Privacy, workflows, and automation depth side by side.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/compare',
  },
  openGraph: {
    title: 'AI Browser Comparison: Vibe vs Atlas, Comet, Composite, Strawberry',
    description:
      'See how Vibe compares on privacy, authenticated workflows, and end-to-end automation.',
    url: 'https://www.vibebrowser.app/compare',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe AI Browser Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Browser Comparison: Vibe vs Atlas, Comet, Composite, Strawberry',
    description:
      'Compare Vibe to leading AI browsers across privacy, workflows, and automation.',
    images: ['/og/home.svg'],
  },
}

const faqItems = [
  {
    question: 'What makes Vibe different from other AI browsers?',
    answer:
      'Vibe focuses on authenticated workflows, human-in-the-loop approvals, and privacy-first execution with local or TEE options.',
  },
  {
    question: 'Does Vibe work inside logged-in apps?',
    answer:
      'Yes. Vibe runs inside real browser sessions so it can operate across portals like CRM, finance, and recruitment tools.',
  },
  {
    question: 'Is Vibe available as a browser or extension?',
    answer:
      'Vibe works as a Chrome extension today and supports standalone workflows for enterprise deployments.',
  },
  {
    question: 'Can Vibe use different AI models?',
    answer:
      'Yes. Vibe is model-agnostic and can work with GPT, Claude, Gemini, and local models.',
  },
  {
    question: 'How often is this comparison updated?',
    answer:
      'We review public product information regularly and update this page when key features or availability change.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const rows = [
  {
    feature: 'Availability',
    vibe: 'Chrome Web Store',
    atlas: 'macOS download',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Waitlist + paid skip',
  },
  {
    feature: 'Browser form factor',
    vibe: 'Extension + standalone',
    atlas: 'Standalone browser',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Unknown',
  },
  {
    feature: 'Authenticated workflows',
    vibe: 'Full browser session',
    atlas: 'Agent mode',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Yes (tabs)',
  },
  {
    feature: 'End-to-end automation',
    vibe: 'Yes',
    atlas: 'Agent mode',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Yes (companions)',
  },
  {
    feature: 'Human-in-the-loop approvals',
    vibe: 'Yes',
    atlas: 'Yes (agent prompts)',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Yes',
  },
  {
    feature: 'Local / private execution',
    vibe: 'Local + TEE options',
    atlas: 'Cloud',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Unknown',
  },
  {
    feature: 'Self-hosted / on-prem',
    vibe: 'Yes',
    atlas: 'No',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Unknown',
  },
  {
    feature: 'Model choice',
    vibe: 'Any model',
    atlas: 'ChatGPT only',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Unknown',
  },
  {
    feature: 'Workflow templates',
    vibe: 'Use cases + skills',
    atlas: 'Unknown',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Companions',
  },
  {
    feature: 'Team workflows',
    vibe: 'Built-in',
    atlas: 'Unknown',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Unknown',
  },
  {
    feature: 'Enterprise controls',
    vibe: 'SOC2 + policy controls',
    atlas: 'Business plans',
    composite: 'Unknown',
    comet: 'Unknown',
    strawberry: 'Unknown',
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="border-b border-slate-200">
        <div className="container mx-auto px-6 py-10 text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700">Comparison</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Vibe vs Atlas, Comet, Composite, and Strawberry
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Side-by-side on availability, privacy, authenticated workflows, and automation depth.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 text-slate-600 font-semibold">Feature</th>
                <th className="text-center py-4 px-3 text-purple-700 font-semibold">Vibe</th>
                <th className="text-center py-4 px-3 text-slate-600 font-semibold">Atlas</th>
                <th className="text-center py-4 px-3 text-slate-600 font-semibold">Composite</th>
                <th className="text-center py-4 px-3 text-slate-600 font-semibold">Comet</th>
                <th className="text-center py-4 px-3 text-slate-600 font-semibold">Strawberry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {row.feature}
                  </td>
                  {[row.vibe, row.atlas, row.composite, row.comet, row.strawberry].map(
                    (value, index) => (
                      <td key={index} className="py-3 px-3 text-center text-slate-700">
                        {value === 'Yes' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          value
                        )}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Why this matters</h2>
            <p className="mt-3 text-sm text-slate-600">
              Most AI browsers focus on web search. Vibe focuses on executing real
              workflows in authenticated sessions while keeping a human in control.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Next steps</h2>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/use-cases" className="text-purple-600 hover:text-purple-700">
                Explore use cases →
              </Link>
              <Link href="/teams" className="text-purple-600 hover:text-purple-700">
                Vibe for Teams →
              </Link>
              <Link href="/mcp" className="text-purple-600 hover:text-purple-700">
                Vibe MCP details →
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Sources</h2>
          <p className="mt-2 text-sm text-slate-600">
            Public product pages reviewed February 2026.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="https://openai.com/index/introducing-chatgpt-atlas/" className="text-purple-600 hover:text-purple-700">
              OpenAI Atlas
            </Link>
            <Link href="https://strawberrybrowser.com/" className="text-purple-600 hover:text-purple-700">
              Strawberry Browser
            </Link>
            <Link href="https://composite.com/" className="text-purple-600 hover:text-purple-700">
              Composite
            </Link>
            <Link href="https://www.perplexity.ai/comet" className="text-purple-600 hover:text-purple-700">
              Perplexity Comet
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-slate-100 pb-4 last:border-b-0">
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
