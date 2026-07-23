import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SiteNav } from '@/components/site-nav'

export const metadata: Metadata = {
  title: 'AI Browser Comparison: Vibe vs Atlas, Comet, Claude for Chrome',
  description:
    'Research-based AI browser comparison across Vibe, Claude for Chrome, OpenAI Atlas, Perplexity Comet, Strawberry, OpenClaw, and Browser MCP, using official product documentation only.',
  keywords: [
    'AI browser comparison',
    'Vibe vs Atlas',
    'Vibe vs Comet',
    'Vibe vs Strawberry',
    'Vibe vs OpenClaw',
    'Vibe vs Browser MCP',
    'Vibe vs Claude for Chrome',
    'browser automation comparison',
    'agentic browser tools',
    'GitHub Copilot browser automation',
    'MCP browser comparison',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/compare',
  },
  openGraph: {
    title: 'AI Browser Comparison: Vibe vs Atlas, Comet, Claude for Chrome',
    description:
      'Side-by-side comparison using only publicly documented product claims and technical docs.',
    url: 'https://www.vibebrowser.app/compare',
    images: [
      {
        url: '/og/mcp',
        width: 1200,
        height: 630,
        alt: 'Vibe AI Browser Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Browser Comparison: Vibe vs Atlas, Comet, Claude for Chrome',
    description:
      'Research-based comparison across automation capability, architecture, and deployment model.',
    images: ['/og/mcp'],
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
  | 'S16'
  | 'S17'
  | 'S18'
  | 'S19'
  | 'S20'
  | 'S21'
  | 'S22'

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
    label: 'OpenAI – Introducing ChatGPT Atlas',
    href: 'https://openai.com/index/introducing-chatgpt-atlas/',
  },
  S4: {
    label: 'OpenAI – ChatGPT Atlas',
    href: 'https://openai.com/atlas/',
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
  S16: {
    label: 'OpenClaw docs – What is OpenClaw',
    href: 'https://docs.openclaw.ai/start/openclaw',
  },
  S17: {
    label: 'OpenClaw docs – Deploy on Fly',
    href: 'https://docs.openclaw.ai/install/fly',
  },
  S18: {
    label: 'OpenClaw docs – Browser tool',
    href: 'https://docs.openclaw.ai/tools/browser',
  },
  S19: {
    label: 'OpenClaw docs – Skills',
    href: 'https://docs.openclaw.ai/skills',
  },
  S20: {
    label: 'OpenClaw docs – Creating skills',
    href: 'https://docs.openclaw.ai/tools/creating-skills',
  },
  S21: {
    label: 'Anthropic – Piloting Claude in Chrome',
    href: 'https://www.anthropic.com/news/claude-for-chrome',
  },
  S22: {
    label: 'Anthropic – Claude for Chrome Help',
    href: 'https://support.anthropic.com/en/articles/12012173-getting-started-with-claude-for-chrome',
  },
}

// Keep this date explicit so "last verified" reflects manual source review, not deploy time.
const lastVerifiedDate = 'April 27, 2026'

type ProductKey = 'vibe' | 'atlas' | 'comet' | 'strawberry' | 'openclaw' | 'browsermcp' | 'claudechrome'

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
      atlas: { text: 'AI-native desktop browser (macOS app, replacing Chrome)', ids: ['S3', 'S4'] },
      comet: { text: 'AI-native desktop browser', ids: ['S5', 'S6'] },
      strawberry: { text: 'AI browser with companion agents', ids: ['S8'] },
      openclaw: { text: 'Self-hosted agent gateway with browser tooling', ids: ['S16', 'S18'] },
      browsermcp: { text: 'MCP server + Chrome extension connector', ids: ['S12', 'S15'] },
      claudechrome: { text: 'Browser extension (Chrome, Brave, Opera)', ids: ['S21', 'S22'] },
    },
  },
  {
    feature: 'Public availability status',
    values: {
      vibe: { text: 'Listed on Chrome Web Store.', ids: ['S1'] },
      atlas: {
        text: 'macOS app launched Oct 2025; Agent Mode in preview for Plus/Pro/Business. Windows, iOS, Android coming soon.',
        ids: ['S3', 'S4'],
      },
      comet: {
        text: 'Perplexity announced worldwide availability and free download on Oct 2, 2025.',
        ids: ['S5'],
      },
      strawberry: {
        text: 'Public setup guide documents download and account onboarding.',
        ids: ['S9'],
      },
      openclaw: {
        text: 'Public docs include guided setup and deployment options, including cloud-hosted setup on Fly.',
        ids: ['S16', 'S17'],
      },
      browsermcp: { text: 'Public install + docs flow for extension and MCP server.', ids: ['S12', 'S13', 'S14'] },
      claudechrome: {
        text: 'Beta available to all paid plans (Pro $20/mo, Max $100-200/mo, Team $25/seat) as of Dec 2025.',
        ids: ['S21', 'S22'],
      },
    },
  },
  {
    feature: 'Documented browser action capability',
    values: {
      vibe: {
        text: 'Listing describes navigation, form filling, and multi-step workflows.',
        ids: ['S1'],
      },
      atlas: {
        text: 'Docs describe Agent Mode can type, click, scroll, fill forms, and complete tasks autonomously in browser.',
        ids: ['S3', 'S4'],
      },
      comet: {
        text: 'Official Comet release post describes assistant actions and task execution while browsing.',
        ids: ['S5'],
      },
      strawberry: {
        text: 'Docs explicitly state it can click, scroll, fill forms, and automate recurring tasks.',
        ids: ['S8'],
      },
      openclaw: {
        text: 'Browser docs explicitly list tabs, open, navigate, click, type, scroll, screenshot, and snapshot actions.',
        ids: ['S18'],
      },
      browsermcp: {
        text: 'Docs describe automation for tasks such as form fill and navigation.',
        ids: ['S12'],
      },
      claudechrome: {
        text: 'Docs describe navigation, form filling, multi-step tasks, and multi-tab workflows.',
        ids: ['S21', 'S22'],
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
      atlas: {
        text: 'macOS app (Apple Silicon M1+). Windows, iOS, Android coming soon. Not a Chrome extension.',
        ids: ['S3', 'S4'],
      },
      comet: {
        text: 'Windows 10+ and macOS 11+ requirements are documented.',
        ids: ['S6'],
      },
      strawberry: {
        text: 'Windows 10+ and macOS 11+ requirements are documented.',
        ids: ['S9'],
      },
      openclaw: {
        text: 'Docs cover local install plus Fly deployment requirements such as machine sizing and persistent volume configuration.',
        ids: ['S17'],
      },
      browsermcp: {
        text: 'Node.js prerequisite + extension tab connection flow are documented.',
        ids: ['S13', 'S14'],
      },
claudechrome: {
        text: 'Chrome extension (also works on Brave and Opera, Chromium-based). Not Firefox, Safari, or Edge.',
        ids: ['S21'],
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
      atlas: {
        text: 'No open-source Atlas server component is documented in cited sources.',
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
      openclaw: {
        text: 'OpenClaw docs explicitly position the project as open source and self-hosted.',
        ids: ['S16'],
      },
      browsermcp: {
        text: 'Public MCP server repository available (Apache-2.0).',
        ids: ['S15'],
      },
      claudechrome: {
        text: 'No open-source Claude for Chrome server component is documented in cited sources.',
        ids: ['S21', 'S22'],
        muted: true,
      },
    },
  },
  {
    feature: 'Documented cloud-hosted deployment path',
    values: {
      vibe: {
        text: 'Cloud-hosted deployment path is not publicly documented in the cited sources for this page.',
        ids: ['S1', 'S2'],
        muted: true,
      },
      atlas: {
        text: 'SaaS browser app; no self-hosted deployment path documented in cited sources.',
        ids: ['S3', 'S4'],
        muted: true,
      },
      comet: {
        text: 'Cloud self-host deployment path is not publicly documented in cited sources.',
        ids: ['S5', 'S6'],
        muted: true,
      },
      strawberry: {
        text: 'Cloud self-host deployment path is not publicly documented in cited sources.',
        ids: ['S8', 'S9'],
        muted: true,
      },
      openclaw: {
        text: 'Docs include a first-party Fly deployment guide for running OpenClaw in the cloud.',
        ids: ['S17'],
      },
      browsermcp: {
        text: 'Cloud deployment path is not explicitly documented in cited first-party setup pages.',
        ids: ['S13', 'S14'],
        muted: true,
      },
      claudechrome: {
        text: 'Delivered via Anthropic infrastructure, not self-managed cloud deployment.',
        ids: ['S21'],
      },
    },
  },
  {
    feature: 'Documented skills authoring / extension path',
    values: {
      vibe: {
        text: 'Public MCP README focuses on tool/server integration; a formal public skills spec is not documented in cited sources.',
        ids: ['S2'],
        muted: true,
      },
      atlas: {
        text: 'No public skill-pack authoring system documented in cited sources.',
        ids: ['S3', 'S4'],
        muted: true,
      },
      comet: {
        text: 'No public skill authoring system documented in cited sources.',
        ids: ['S5', 'S6'],
        muted: true,
      },
      strawberry: {
        text: 'Docs discuss companions and workflows, but a public skill-pack authoring framework is not clearly documented in cited sources.',
        ids: ['S8', 'S9'],
        muted: true,
      },
      openclaw: {
        text: 'Docs include first-party skills system docs plus guides for creating custom skills.',
        ids: ['S19', 'S20'],
      },
      browsermcp: {
        text: 'Extension pathway is via MCP server + browser extension; skill authoring framework is not documented in cited sources.',
        ids: ['S13', 'S14', 'S15'],
        muted: true,
      },
      claudechrome: {
        text: 'Docs describe "shortcuts" for saving and reusing workflows. Claude Code integration via /chrome command.',
        ids: ['S21', 'S22'],
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
      atlas: {
        text: 'No MCP-client integration pattern documented in cited sources.',
        ids: ['S3', 'S4'],
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
      openclaw: {
        text: 'MCP-client interoperability pattern with VS Code/GitHub Copilot is not publicly documented in cited sources.',
        ids: ['S16', 'S18'],
        muted: true,
      },
      browsermcp: {
        text: 'Docs include VS Code MCP server setup.',
        ids: ['S14'],
      },
      claudechrome: {
        text: 'Claude Code integration via /chrome command. No generic MCP-client pattern documented in cited sources.',
        ids: ['S21', 'S22'],
        muted: true,
      },
    },
  },
]

const stuckSignals: Array<{ title: string; text: string; ids: SourceId[] }> = [
  {
    title: 'Model lock-in risk',
    text:
      'Across most products in this matrix, explicit user-facing model/provider selection controls are not clearly documented in the cited first-party pages.',
    ids: ['S3', 'S5', 'S8', 'S12', 'S16'],
  },
  {
    title: 'Screenshot/snapshot-heavy control loops',
    text:
      'Official computer-use/browser docs for Operator and OpenClaw explicitly describe screenshot and snapshot interaction patterns, which can increase context usage on visually dense pages.',
    ids: ['S4', 'S18'],
  },
  {
    title: 'Workflow reuse gaps',
    text:
      'Explicit skills authoring docs are clearly published for OpenClaw. For most other products here, equivalent public skills authoring frameworks are not clearly documented in cited sources.',
    ids: ['S19', 'S20', 'S3', 'S5', 'S8', 'S12'],
  },
]

const faqItems = [
  {
    question: 'What changed on this comparison page?',
    answer:
      'We added Claude for Chrome (Anthropic) as a new competitor, sourced from official Anthropic documentation. The table now covers 7 AI browser automation tools.',
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
            Vibe vs OpenAI Atlas, Perplexity Comet, Claude for Chrome, and More
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

        <section className="mb-8 rounded-2xl border border-slate-200 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Where AI Browsers Get Stuck</h2>
              <p className="mt-2 text-sm text-slate-600">
                The matrix below is documentation-first. Based on those same docs, these are recurring
                risk signals teams see on real browser workloads.
              </p>
              <ul className="mt-4 space-y-3">
                {stuckSignals.map((signal) => (
                  <li key={signal.title} className="text-sm leading-6 text-slate-700">
                    <span className="font-semibold text-slate-900">{signal.title}:</span> {signal.text}
                    <SourceRefs ids={signal.ids} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <img
                src="/compare/facebook-marketplace-demo.jpg"
                alt="Facebook Marketplace search results as a dense browser automation workload example"
                className="w-full rounded-lg border border-slate-200"
              />
              <p className="mt-2 text-xs text-slate-500">
                Example workload captured via Chrome DevTools MCP: navigating Facebook Marketplace search
                results.
              </p>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm align-top">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Capability</th>
                <th className="text-left py-4 px-4 text-purple-700 font-semibold min-w-[220px]">Vibe</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">OpenAI Atlas</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Perplexity Comet</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Strawberry</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">OpenClaw</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Browser MCP</th>
                <th className="text-left py-4 px-4 text-slate-600 font-semibold min-w-[220px]">Claude for Chrome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-medium text-slate-900">{row.feature}</td>
                  {(
                    ['vibe', 'claudechrome', 'atlas', 'comet', 'strawberry', 'openclaw', 'browsermcp'] as ProductKey[]
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
