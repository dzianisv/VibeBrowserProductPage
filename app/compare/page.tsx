import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SiteNav } from '@/components/site-nav'

export const metadata: Metadata = {
  title: 'Vibe vs OpenAI Operator, Perplexity Comet, Strawberry, Browser MCP',
  description:
    'Research-based AI browser comparison across Vibe, OpenAI Operator, Perplexity Comet, Strawberry, and Browser MCP, using official product documentation only.',
  keywords: [
    'AI browser comparison',
    'Vibe vs Operator',
    'Vibe vs Comet',
    'Vibe vs Strawberry',
    'Vibe vs Browser MCP',
    'browser automation comparison',
    'agentic browser tools',
    'GitHub Copilot browser automation',
    'MCP browser comparison',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/compare',
  },
  openGraph: {
    title: 'AI Browser Comparison: Vibe vs Operator, Comet, Strawberry, Browser MCP',
    description:
      'Side-by-side comparison using only publicly documented product claims and technical docs.',
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
    title: 'AI Browser Comparison: Vibe vs Operator, Comet, Strawberry, Browser MCP',
    description:
      'Research-based comparison across automation capability, architecture, and deployment model.',
    images: ['/og/home.svg'],
    creator: '@vibebrowserapp',
  },
}

type SourceId =
  | 'S1'
  | 'S2'
  | 'S3'
  | 'S4'
  | 'S5'
  | 'S6'
  | 'S7'
  | 'S8'
  | 'S9'
  | 'S10'
  | 'S11'
  | 'S12'
  | 'S13'
  | 'S14'
  | 'S15'

const sources: Record<SourceId, { label: string; href: string }> = {
  S1: {
    label: 'Vibe AI Browser Co-Pilot (Chrome Web Store)',
    href: 'https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado',
  },
  S2: {
    label: 'Vibe MCP GitHub README',
    href: 'https://github.com/VibeTechnologies/vibe-mcp',
  },
  S3: {
    label: 'OpenAI – Introducing Operator',
    href: 'https://openai.com/index/introducing-operator/',
  },
  S4: {
    label: 'OpenAI API – Computer use guide',
    href: 'https://developers.openai.com/api/docs/guides/tools-computer-use',
  },
  S5: {
    label: 'Perplexity – The Internet is Better on Comet',
    href: 'https://www.perplexity.ai/hub/blog/comet-is-now-available-to-everyone-worldwide',
  },
  S6: {
    label: 'Comet Help – Installing Comet',
    href: 'https://comet-help.perplexity.ai/en/articles/11583748-installing-comet',
  },
  S7: {
    label: 'Comet Help – Extensions',
    href: 'https://comet-help.perplexity.ai/en/articles/11734716-extensions',
  },
  S8: {
    label: 'Strawberry – What Strawberry Is',
    href: 'https://strawberrybrowser.com/tutorials/getting-started/what-strawberry-is',
  },
  S9: {
    label: 'Strawberry – Set Up Strawberry',
    href: 'https://strawberrybrowser.com/tutorials/getting-started/setup',
  },
  S10: {
    label: 'Strawberry – Pricing',
    href: 'https://strawberrybrowser.com/pricing',
  },
  S11: {
    label: 'Strawberry – Security Whitepaper',
    href: 'https://strawberrybrowser.com/security',
  },
  S12: {
    label: 'Browser MCP homepage',
    href: 'https://browsermcp.io/',
  },
  S13: {
    label: 'Browser MCP docs – Set up extension',
    href: 'https://docs.browsermcp.io/setup-extension',
  },
  S14: {
    label: 'Browser MCP docs – Set up MCP server',
    href: 'https://docs.browsermcp.io/setup-server',
  },
  S15: {
    label: 'Browser MCP GitHub README',
    href: 'https://github.com/BrowserMCP/mcp',
  },
}

const lastVerifiedDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  dateStyle: 'long',
}).format(new Date())

type ProductKey = 'vibe' | 'operator' | 'comet' | 'strawberry' | 'browsermcp'

interface CellData {
  text: string
  ids: SourceId[]
  muted?: boolean
}

interface ComparisonRow {
  feature: string
  values: Record<ProductKey, CellData>
}

const rows: ComparisonRow[] = [
  {
    feature: 'Product category',
    values: {
      vibe: { text: 'Browser extension + MCP server bridge', ids: ['S1', 'S2'] },
      operator: { text: 'ChatGPT agent with its own browser', ids: ['S3'] },
      comet: { text: 'AI-native desktop browser', ids: ['S5', 'S6'] },
      strawberry: { text: 'AI browser with companion agents', ids: ['S8'] },
      browsermcp: { text: 'MCP server + Chrome extension connector', ids: ['S12', 'S15'] },
    },
  },
  {
    feature: 'Public availability status',
    values: {
      vibe: { text: 'Listed on Chrome Web Store.', ids: ['S1'] },
      operator: {
        text: 'Research preview at launch; OpenAI later updated the page to say it is bringing Operator capabilities into ChatGPT agentic features and beginning a transition from the original research preview.',
        ids: ['S3'],
      },
      comet: {
        text: 'Perplexity announced worldwide availability and free download on Oct 2, 2025.',
        ids: ['S5'],
      },
      strawberry: {
        text: 'Public setup guide documents download and account onboarding.',
        ids: ['S9'],
      },
      browsermcp: { text: 'Public install + docs flow for extension and MCP server.', ids: ['S12', 'S13', 'S14'] },
    },
  },
  {
    feature: 'Documented browser action capability',
    values: {
      vibe: {
        text: 'Listing describes navigation, form filling, and multi-step workflows.',
        ids: ['S1'],
      },
      operator: {
        text: 'Official page says Operator can type, click, and scroll in its own browser.',
        ids: ['S3'],
      },
      comet: {
        text: 'Official Comet release post describes assistant actions and task execution while browsing.',
        ids: ['S5'],
      },
      strawberry: {
        text: 'Docs explicitly state it can click, scroll, fill forms, and automate recurring tasks.',
        ids: ['S8'],
      },
      browsermcp: {
        text: 'Docs describe automation for tasks such as form fill and navigation.',
        ids: ['S12'],
      },
    },
  },
  {
    feature: 'Runtime / install requirements called out in docs',
    values: {
      vibe: {
        text: 'Chromium browser extension + MCP config via npx.',
        ids: ['S2'],
      },
      operator: {
        text: 'OpenAI positions it through ChatGPT product flow rather than local browser install.',
        ids: ['S3'],
      },
      comet: {
        text: 'Windows 10+ and macOS 11+ requirements are documented.',
        ids: ['S6'],
      },
      strawberry: {
        text: 'Windows 10+ and macOS 11+ requirements are documented.',
        ids: ['S9'],
      },
      browsermcp: {
        text: 'Node.js prerequisite + extension tab connection flow are documented.',
        ids: ['S13', 'S14'],
      },
    },
  },
  {
    feature: 'Chrome extension ecosystem compatibility',
    values: {
      vibe: {
        text: 'N/A (this product is itself a Chrome extension).',
        ids: ['S1'],
        muted: true,
      },
      operator: {
        text: 'Not publicly documented in cited sources.',
        ids: ['S3'],
        muted: true,
      },
      comet: {
        text: 'Comet help docs say it supports most Chrome Web Store extensions.',
        ids: ['S7'],
      },
      strawberry: {
        text: 'Docs describe full browser behavior including extensions.',
        ids: ['S8'],
      },
      browsermcp: {
        text: 'N/A (uses your existing browser + extension bridge, not a standalone browser shell).',
        ids: ['S12', 'S13'],
        muted: true,
      },
    },
  },
  {
    feature: 'Open-source automation server component',
    values: {
      vibe: {
        text: 'Public MCP server repository available.',
        ids: ['S2'],
      },
      operator: {
        text: 'No open-source Operator server component is documented in cited sources.',
        ids: ['S3', 'S4'],
        muted: true,
      },
      comet: {
        text: 'No open-source Comet server component is documented in cited sources.',
        ids: ['S5', 'S6'],
        muted: true,
      },
      strawberry: {
        text: 'No open-source Strawberry server component is documented in cited sources.',
        ids: ['S8', 'S9'],
        muted: true,
      },
      browsermcp: {
        text: 'Public MCP server repository available (Apache-2.0).',
        ids: ['S15'],
      },
    },
  },
  {
    feature: 'Signal for GitHub Copilot / VS Code MCP interoperability',
    values: {
      vibe: {
        text: 'README includes explicit VS Code (GitHub Copilot) MCP config block.',
        ids: ['S2'],
      },
      operator: {
        text: 'No MCP-client integration pattern documented in cited sources.',
        ids: ['S3'],
        muted: true,
      },
      comet: {
        text: 'No MCP-client integration pattern documented in cited sources.',
        ids: ['S5', 'S6'],
        muted: true,
      },
      strawberry: {
        text: 'No MCP-client integration pattern documented in cited sources.',
        ids: ['S8', 'S9'],
        muted: true,
      },
      browsermcp: {
        text: 'Docs include VS Code MCP server setup.',
        ids: ['S14'],
      },
    },
  },
]

const faqItems = [
  {
    question: 'What changed on this comparison page?',
    answer:
      'We removed speculative rows and rebuilt the table using first-party product docs only. Every table cell now points to source IDs in the Sources section.',
  },
  {
    question: 'What does "Not publicly documented" mean?',
    answer:
      `It means we did not find that specific capability explicitly stated in the official sources listed on this page as of ${lastVerifiedDate}.`,
  },
  {
    question: 'How often is this page updated?',
    answer:
      'We update when product docs materially change, and we show the verification date directly on this page for traceability.',
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

const sourceIds = Object.keys(sources) as SourceId[]

function SourceRefs({ ids }: { ids: SourceId[] }) {
  return (
    <span className="ml-1 inline-flex flex-wrap gap-1 align-middle">
      {ids.map((id) => (
        <Link
          key={id}
          href={`#source-${id}`}
          className="text-xs text-slate-500 hover:text-slate-700 underline"
        >
          [{id}]
        </Link>
      ))}
    </span>
  )
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="border-b border-slate-200">
        <div className="container mx-auto px-6 py-10 text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700">Research-Based Comparison</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Vibe vs OpenAI Operator, Perplexity Comet, Strawberry, and Browser MCP
          </h1>
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
            Updated {lastVerifiedDate}. This table uses only official product pages, help docs, and
            first-party repositories. If a capability is not explicitly documented there, it is
            marked as not publicly documented.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          <strong>Method:</strong> First-party sources only (vendor sites/docs/repos), no third-party
          benchmark claims, no inferred capabilities. Each cell includes source IDs.
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm align-top">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Capability</th>
                <th className="text-left py-4 px-4 text-purple-700 font-semibold min-w-[220px]">Vibe</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">OpenAI Operator</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Perplexity Comet</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Strawberry</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Browser MCP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-medium text-slate-900">{row.feature}</td>
                  {(
                    ['vibe', 'operator', 'comet', 'strawberry', 'browsermcp'] as ProductKey[]
                  ).map((product) => {
                    const cell = row.values[product]
                    return (
                      <td
                        key={`${row.feature}-${product}`}
                        className={`py-4 px-4 leading-6 ${cell.muted ? 'text-slate-500' : 'text-slate-700'}`}
                      >
                        {cell.text}
                        <SourceRefs ids={cell.ids} />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Interpretation guidance</h2>
            <p className="mt-3 text-sm text-slate-600">
              This matrix intentionally distinguishes between documented behavior and implied behavior.
              "Not publicly documented" means absent from official sources we reviewed, not necessarily
              impossible.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Next steps</h2>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/copilot" className="text-purple-600 hover:text-purple-700">
                GitHub Copilot for people →
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
            Last verified: {lastVerifiedDate} (America/Los_Angeles).
          </p>
          <div className="mt-4 grid gap-2 text-sm">
            {sourceIds.map((id) => (
              <div key={id} id={`source-${id}`} className="text-slate-700">
                <span className="font-semibold">[{id}]</span>{' '}
                <Link href={sources[id].href} className="text-purple-600 hover:text-purple-700" target="_blank" rel="noopener noreferrer">
                  {sources[id].label}
                </Link>
              </div>
            ))}
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
