import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Use Cases - Vibe AI Browser Co-Pilot',
  description:
    'Stories from teams using Vibe AI Browser Co-Pilot to automate research, compliance workflows, and outreach at scale.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/use-cases',
  },
  openGraph: {
    title: 'Vibe AI Browser Use Cases',
    description:
      'Stories from teams using Vibe AI Browser Co-Pilot to automate research, compliance workflows, and outreach.',
    url: 'https://www.vibebrowser.app/use-cases',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe AI Browser Use Cases',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe AI Browser Use Cases',
    description:
      'Stories from teams using Vibe AI Browser Co-Pilot to automate research, compliance workflows, and outreach.',
    images: ['/og/home.svg'],
  },
}

const cases = [
  {
    slug: 'financial-advisor-morningstar-schwab',
    title: 'Morningstar Schwab research automation for financial advisors',
    tag: 'Finance',
    summary:
      'Vibe pulls Morningstar data from Schwab, builds a clean comparison table, and drafts a client-ready recommendation memo.',
  },
  {
    slug: 'privacy-first-legal-research',
    title: 'Private legal research automation in a self-hosted CRM',
    tag: 'Legal',
    summary:
      'Vibe runs on-prem to cross-check precedent notes, redact sensitive details, and cite internal sources.',
  },
  {
    slug: 'recruiter-linkedin-automation',
    title: 'LinkedIn recruiter automation with skills-based messaging',
    tag: 'Recruiting',
    summary:
      'Vibe finds candidates, matches skills, drafts messages, and logs outreach into a CRM workflow.',
  },
]

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="container mx-auto px-6 py-10 text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700">Use Cases</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Real workflows, real outcomes
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            These stories highlight how teams use Vibe AI Browser Co-Pilot to
            automate research, compliance-heavy analysis, and outreach at scale.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <Card key={item.slug} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Badge className="bg-slate-100 text-slate-700 mb-3">
                  {item.tag}
                </Badge>
                <h2 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">{item.summary}</p>
                <Link
                  href={`/use-cases/${item.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Read the story →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
