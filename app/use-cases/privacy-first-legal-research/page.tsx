import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SiteNav } from '@/components/site-nav'

export const metadata: Metadata = {
  title: 'Private legal research automation in a self-hosted CRM | Vibe',
  description:
    'Run private legal research inside a self-hosted case database. Vibe keeps data on-prem, extracts precedent notes, and drafts redaction-safe summaries.',
  keywords: [
    'private legal research AI',
    'self-hosted CRM automation',
    'on-premise legal AI',
    'legal research automation',
    'AI for law firms',
    'Vibe Browser legal research',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/use-cases/privacy-first-legal-research',
  },
  openGraph: {
    title: 'Private legal research automation in a self-hosted CRM',
    description:
      'Vibe runs on-prem inside a private case system, keeps data local, and drafts redaction-safe summaries.',
    url: 'https://www.vibebrowser.app/use-cases/privacy-first-legal-research',
    images: [
      {
        url: '/og/tee.svg',
        width: 1200,
        height: 630,
        alt: 'Private legal research with Vibe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private legal research automation in a self-hosted CRM',
    description:
      'Vibe runs on-prem inside a private case system, keeps data local, and drafts redaction-safe summaries.',
    images: ['/og/tee.svg'],
    creator: '@vibebrowserapp',
  },
}

const storyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Private legal research automation in a self-hosted CRM',
  description:
    'A legal team runs Vibe on-prem to research cases inside a private CRM, keep data local, and generate redaction-safe summaries.',
  url: 'https://www.vibebrowser.app/use-cases/privacy-first-legal-research',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
  },
  datePublished: '2025-06-01',
  dateModified: '2025-09-25',
}

const howToSteps = [
  'Open the self-hosted case database and authenticate locally.',
  'Search for precedent matters by tags, statutes, or jurisdictions.',
  'Extract key outcomes, citations, and settlement ranges.',
  'Draft a redaction-safe summary for internal review.',
  'Approve and share the summary with the legal team.',
]

const faqItems = [
  {
    question: 'Does Vibe keep client data on-prem?',
    answer:
      'Yes. Vibe can run in a self-hosted environment so case data stays inside your private infrastructure.',
  },
  {
    question: 'Can Vibe redact sensitive details automatically?',
    answer:
      'Vibe flags sensitive fields and prepares a redaction-safe draft for lawyer approval.',
  },
  {
    question: 'How is this different from AI search tools?',
    answer:
      'Vibe works inside private CRMs and document stores; AI search tools cannot access those systems.',
  },
  {
    question: 'Is there an audit trail?',
    answer:
      'Yes. Vibe logs the workflow steps so compliance teams can review actions and sources.',
  },
]

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Run private legal research inside a self-hosted case system',
  description:
    'Use Vibe AI Browser Co-Pilot to research cases in a private CRM and draft redaction-safe summaries.',
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Use Cases',
      item: 'https://www.vibebrowser.app/use-cases',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Private legal research automation in a self-hosted CRM',
      item: 'https://www.vibebrowser.app/use-cases/privacy-first-legal-research',
    },
  ],
}

export default function LegalResearchUseCase() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="border-b border-slate-200">
        <div className="container mx-auto px-6 py-10">
          <Badge className="mb-4 bg-slate-100 text-slate-700">Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Lawyer keeps research private inside a self-hosted case database
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Vibe runs on-prem, searches internal case files, and drafts
            redaction-safe summaries without sending data to third parties.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-10">
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Goal',
              text: 'Summarize precedent notes across 60 internal matters without exposing sensitive data.',
            },
            {
              title: 'Tooling',
              text: 'Self-hosted CRM, private document store, Vibe running with on-prem models.',
            },
            {
              title: 'Outcome',
              text: 'Research time reduced by 65% with auditable, redaction-safe summaries.',
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
            The lawyer asks Vibe: "Search our case database for prior matters
            related to multi-state data breaches. Summarize outcomes, cited
            statutes, and settlement ranges. Keep client names masked." Vibe
            navigates the internal CRM and document store, extracts relevant
            notes, and compiles a structured summary.
          </p>
          <p className="text-slate-600">
            Because Vibe runs in a self-hosted environment, no data leaves the
            firm. The lawyer reviews the results, approves the redaction list,
            and forwards the summary to the team.
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
              <li>• Runs inside private, self-hosted CRMs and document stores.</li>
              <li>• Keeps data on-prem with privacy-first deployment options.</li>
              <li>• Provides audit trails and human approval before sharing.</li>
              <li>• Automates end-to-end research rather than just summarizing search.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">What Vibe handled</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Queried the internal CRM for relevant matter tags.</li>
              <li>• Opened related documents and extracted key citations.</li>
              <li>• Generated a redaction-safe summary with traceable sources.</li>
              <li>• Logged the workflow for audit review.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Why privacy mattered</h3>
            <p className="mt-4 text-sm text-slate-600">
              The firm cannot send case details to external AI vendors. Vibe's
              local or self-hosted mode lets them keep client data on-prem while
              still benefiting from automation.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-900">Result</h3>
          <p className="mt-3 text-sm text-slate-600">
            The team delivered a defensible research packet within hours,
            without risking confidentiality or compliance exposure.
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
            <Link href="/use-cases/financial-advisor-morningstar-schwab" className="text-purple-600 hover:text-purple-700">
              Morningstar Schwab research automation for advisors
            </Link>
            <Link href="/use-cases/recruiter-linkedin-automation" className="text-purple-600 hover:text-purple-700">
              LinkedIn recruiter automation with skills-based outreach
            </Link>
            <Link href="/enterprise" className="text-purple-600 hover:text-purple-700">
              Explore enterprise privacy controls
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
