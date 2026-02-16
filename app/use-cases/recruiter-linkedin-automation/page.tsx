import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'LinkedIn recruiter automation with skills-based messaging | Vibe',
  description:
    'Automate LinkedIn recruiting with skills-based outreach. Vibe AI Browser Co-Pilot finds candidates, drafts messages, and updates your CRM.',
  alternates: {
    canonical:
      'https://www.vibebrowser.app/use-cases/recruiter-linkedin-automation',
  },
  openGraph: {
    title: 'LinkedIn recruiter automation with skills-based messaging',
    description:
      'Vibe finds candidates, matches skills, drafts outreach, and logs activity into your CRM.',
    url: 'https://www.vibebrowser.app/use-cases/recruiter-linkedin-automation',
    images: [
      {
        url: '/og/teams.svg',
        width: 1200,
        height: 630,
        alt: 'Recruiter LinkedIn automation with Vibe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn recruiter automation with skills-based messaging',
    description:
      'Vibe finds candidates, matches skills, drafts outreach, and logs activity into your CRM.',
    images: ['/og/teams.svg'],
  },
}

const storyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LinkedIn recruiter automation with skills-based messaging',
  description:
    'A recruiter uses Vibe AI Browser Co-Pilot to source LinkedIn candidates, match skills, personalize outreach, and update CRM notes.',
  url: 'https://www.vibebrowser.app/use-cases/recruiter-linkedin-automation',
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
  'Define a skills rubric and target geography for the role.',
  'Search LinkedIn and shortlist candidates matching the rubric.',
  'Draft personalized outreach referencing recent projects.',
  'Queue messages for human approval before sending.',
  'Log outreach status and follow-up reminders in the CRM.',
]

const faqItems = [
  {
    question: 'Can Vibe send LinkedIn messages automatically?',
    answer:
      'Vibe can draft and queue messages for approval. Recruiters approve before sending to stay compliant with outreach policies.',
  },
  {
    question: 'Does Vibe match candidates by skills?',
    answer:
      'Yes. Provide a skills rubric and Vibe filters profiles based on relevant keywords and experience signals.',
  },
  {
    question: 'How is this different from AI search tools?',
    answer:
      'Vibe works inside authenticated LinkedIn sessions and your CRM, not just public search results.',
  },
  {
    question: 'Can I keep a human in the loop?',
    answer:
      'Absolutely. Vibe queues drafts for approval, then logs activity to your CRM after you confirm.',
  },
]

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Automate LinkedIn recruiting with skills-based outreach',
  description:
    'Use Vibe AI Browser Co-Pilot to find candidates on LinkedIn, draft outreach, and log activity in your CRM.',
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

export default function RecruiterLinkedInUseCase() {
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
          <Badge className="mb-4 bg-blue-100 text-blue-700">Recruiting</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Recruiter automates LinkedIn outreach with skills-based messaging
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Vibe identifies qualified candidates, drafts personalized outreach,
            and logs the conversation in the recruiting CRM.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-10">
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Goal',
              text: 'Source 40 qualified candidates per week without copy-pasting outreach.',
            },
            {
              title: 'Tooling',
              text: 'LinkedIn, skills matrix, CRM, and Vibe AI Browser Co-Pilot.',
            },
            {
              title: 'Outcome',
              text: 'Response rates up 22% with consistent, skills-specific messaging.',
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
            The recruiter gives Vibe a skills rubric (React, Node, healthcare
            compliance) and asks: "Find candidates in Austin open to hybrid work.
            Draft a message referencing their most relevant project, and log the
            outreach in our CRM." Vibe searches LinkedIn, scans profiles for
            keyword matches, and drafts tailored messages.
          </p>
          <p className="text-slate-600">
            Each message is queued for review. Once approved, Vibe sends the
            outreach, updates the CRM status, and schedules a follow-up reminder.
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
              <li>• Works inside logged-in LinkedIn sessions and your CRM.</li>
              <li>• Keeps recruiters in control with approval workflows.</li>
              <li>• Automates follow-ups and status updates, not just summaries.</li>
              <li>• Supports team workflow sharing for consistent outreach.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">What Vibe handled</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Profile scanning with a skills-based rubric.</li>
              <li>• Personalized messaging with recent project context.</li>
              <li>• Status updates inside the recruiting CRM.</li>
              <li>• Follow-up reminders based on response windows.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Human in the loop</h3>
            <p className="mt-4 text-sm text-slate-600">
              The recruiter approves each message before sending, adjusts tone
              for senior roles, and uses Vibe's draft as a starting point.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-900">Result</h3>
          <p className="mt-3 text-sm text-slate-600">
            The recruiting team kept outreach quality high while doubling the
            number of active candidates in the pipeline.
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
            <Link href="/use-cases/privacy-first-legal-research" className="text-purple-600 hover:text-purple-700">
              Privacy-first legal research in self-hosted systems
            </Link>
            <Link href="/teams" className="text-purple-600 hover:text-purple-700">
              Explore Vibe for Teams workflows
            </Link>
            <Link href="/mcp" className="text-purple-600 hover:text-purple-700">
              See how Vibe MCP powers LinkedIn automation
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
