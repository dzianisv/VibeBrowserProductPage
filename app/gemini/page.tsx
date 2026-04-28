import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for Gemini CLI — Give Gemini a Real Cloud Browser',
  description:
    'Connect Gemini CLI or Gemini API to a real, pre-authenticated browser via MCP. Navigate, click, fill forms, and get markdown snapshots. $9/mo cloud or free local.',
  keywords: [
    'Gemini CLI browser MCP',
    'Gemini browser automation',
    'Gemini MCP browser',
    'Gemini CLI browser control',
    'Google Gemini browser extension',
    'Gemini authenticated browser',
    'Gemini cloud browser',
    'vibebrowser Gemini',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/gemini' },
  openGraph: {
    title: 'VibeBrowser for Gemini CLI — Give Gemini a Real Cloud Browser',
    description:
      'Connect Gemini CLI to a pre-authenticated cloud browser in one command. Markdown snapshots, not raw HTML. $9/mo.',
    url: 'https://www.vibebrowser.app/gemini',
  },
}

const config: ProfessionConfig = {
  slug: 'gemini',
  name: 'Gemini CLI Users',
  title: 'Give Gemini a Real Browser',
  subtitle: 'Gemini CLI + cloud browser = agent that operates your web workflows',
  gradient: 'from-blue-950 via-cyan-900 to-blue-950',
  gradientFrom: 'from-blue-950',
  gradientVia: 'via-cyan-900',
  gradientTo: 'to-blue-950',
  accentColor: 'text-cyan-300',
  accentBg: 'bg-cyan-100 text-cyan-800',
  rotatingWords: [
    'Gmail Summaries',
    'Google Docs',
    'Google Sheets',
    'Drive Research',
    'Calendar Ops',
    'Meet Prep',
    'Search & Extract',
    'Forms & Portals',
  ],
  description:
    'Gemini CLI has long context and deep reasoning — but it can\'t log into Google Workspace, read your inbox, or navigate a vendor portal. VibeBrowser connects Gemini to a pre-authenticated cloud browser over MCP. One command, no CDP, markdown output that fits inside any context window.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'Terminal',
      title: 'One-command MCP setup',
      description:
        'npx @vibebrowser/mcp --remote YOUR_UUID. Gemini CLI picks up the MCP server immediately — navigate, snapshot, click, fill, scroll.',
    },
    {
      icon: 'Globe',
      title: 'Pre-authenticated sessions',
      description:
        'Transfer your logins once. Gemini reaches your Google Workspace, Drive, Sheets, and any SaaS you\'re already signed into — without any re-auth.',
    },
    {
      icon: 'FileText',
      title: 'Markdown snapshots fit Gemini\'s context',
      description:
        'Gemini has a massive context window — but raw HTML still wastes it. VibeBrowser returns structured markdown (~1–2 KB per page) so Gemini spends context on reasoning, not parsing DOM noise.',
    },
    {
      icon: 'Cloud',
      title: 'Cloud browser, always on',
      description:
        'Sessions run in the cloud 24/7. Gemini workflows keep going after your laptop closes — perfect for long research tasks and scheduled automations.',
    },
    {
      icon: 'Search',
      title: 'Research across real web pages',
      description:
        'Point Gemini at live web pages, portals, and dashboards — not just documents. Combine live browsing with Gemini\'s long-context analysis.',
    },
    {
      icon: 'Lock',
      title: 'Your accounts, your data',
      description:
        'Passwords are never transmitted. VibeBrowser transfers session state — cookies and tokens — not credentials. You stay in control.',
    },
  ],
  workflows: [
    'Have Gemini summarise your Gmail inbox and draft responses to priority threads',
    'Ask Gemini to research a company across their website, LinkedIn, and news — all in one session',
    'Let Gemini read a Google Sheet, browse the linked data sources, and produce an analysis',
    'Ask Gemini to navigate a vendor portal, extract invoice data, and save it to Drive',
    'Have Gemini monitor a competitor pricing page and report changes weekly',
    'Give Gemini a list of URLs and ask for a synthesised research brief',
  ],
  tools: ['Gemini CLI', 'Google Workspace', 'Gmail', 'Google Drive', 'Google Sheets', 'Google Docs', 'Google Calendar', 'Salesforce', 'Notion', 'HubSpot'],
  faqs: [
    {
      question: 'Which Gemini products work with VibeBrowser?',
      answer:
        'Any MCP-compatible Gemini surface: Gemini CLI, Gemini API via MCP adapter, or any agent framework that routes through MCP. VibeBrowser follows the standard Model Context Protocol spec.',
    },
    {
      question: 'Doesn\'t Gemini already have Google Search grounding?',
      answer:
        'Google Search grounding gives Gemini fresh web content — but it can\'t log into your Google Workspace, navigate authenticated portals, click buttons, or fill forms. VibeBrowser adds real browser control on top of your existing sessions.',
    },
    {
      question: 'Why use markdown snapshots with Gemini\'s 1M-token context?',
      answer:
        'Even with a 1M context window, raw HTML (200–400 KB per page) burns tokens on DOM attributes, inline styles, and script tags — not information. Markdown snapshots give Gemini just the content, making multi-page workflows practical without hitting API cost cliffs.',
    },
    {
      question: 'How do I connect Gemini CLI to VibeBrowser?',
      answer:
        'Add VibeBrowser to your Gemini CLI MCP config and run npx @vibebrowser/mcp --remote YOUR_UUID. Full setup guide at vibebrowser.app/mcp.',
    },
    {
      question: 'Does it work with Google Workspace accounts?',
      answer:
        'Yes. Transfer your Google login once. Gemini can then access Gmail, Drive, Docs, Sheets, Calendar, and any other Google Workspace app you\'re signed into — no OAuth flow required each time.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
