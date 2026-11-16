import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for Cowork — Claude Cowork with Your Real Browser',
  description:
    'Add Vibe as a custom connector in Claude and let Claude on the web, in Cowork, and on mobile drive your real Chrome — logged-in pages included. One URL, no local install.',
  keywords: [
    'claude cowork browser',
    'claude custom connector',
    'claude cowork mcp',
    'connect claude to browser',
    'claude connectors chrome',
    'vibebrowser Cowork',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/cowork' },
  openGraph: {
    title: 'VibeBrowser for Cowork — Claude Cowork with Your Real Browser',
    description:
      'One connector URL and a Cowork session reaches the Chrome on your machine — logged-in pages included.',
    url: 'https://www.vibebrowser.app/cowork',
  },
}

const config: ProfessionConfig = {
  slug: 'cowork',
  name: 'Cowork',
  title: 'Give Claude Cowork control of your browser',
  subtitle: 'Desktop agent work plus your real browser — one connector URL',
  gradient: 'from-amber-950 via-yellow-900 to-amber-950',
  gradientFrom: 'from-amber-950',
  gradientVia: 'via-yellow-900',
  gradientTo: 'to-amber-950',
  accentColor: 'text-amber-300',
  accentBg: 'bg-amber-100 text-amber-800',
  rotatingWords: [
    'Document Research',
    'Inbox Triage',
    'Dashboard Reads',
    'Form Filling',
    'Page Summaries',
    'Web Research',
    'Tab Reviews',
    'Data Gathering',
  ],
  description:
    'Claude supports custom connectors backed by a remote MCP server. Open Settings → Connectors → Add → Add custom connector and paste your Vibe connector URL, https://relay.api.vibebrowser.app/mcp/ followed by the routing UUID from the extension. Claude can then navigate, click, type, scroll, screenshot, and read your real Chrome — including pages behind a login. Because the connector is brokered by your Claude account, it works in Cowork and on mobile, not just Claude Desktop.',
  ctaText: 'Read the setup guide',
  ctaLink: '/integrations/claude-connector',
  features: [
    {
      icon: 'Plug',
      title: 'One URL, no local install',
      description:
        'Claude Desktop can run a local MCP server; Claude on the web, in a Cowork session, or on your phone cannot. A custom connector is just a URL — no npx, no local server, no second browser profile.',
    },
    {
      icon: 'Workflow',
      title: 'Built for Cowork sessions',
      description:
        'A custom connector is brokered through your Claude account rather than tied to one machine, so a Cowork session reaches it the same way a Desktop chat does. A local Desktop Extension would not — that is scoped to the desktop app on that one computer.',
    },
    {
      icon: 'Chrome',
      title: 'Your real Chrome',
      description:
        'The Vibe relay bridges the connection to the Chrome extension on your machine, so Claude acts in the browser you are already signed into.',
    },
    {
      icon: 'Eye',
      title: 'Logged-in pages included',
      description:
        'Web search sees the anonymous public internet, not your dashboards, your inbox, or your admin panels. Through Vibe, a Cowork session reads and acts on those pages directly.',
    },
    {
      icon: 'Zap',
      title: 'Toggle per conversation',
      description:
        'In a chat, tap + → Connectors and turn Vibe on. Toggle it per conversation, so a chat only reaches your browser when you want it to.',
    },
    {
      icon: 'Lock',
      title: 'Nothing beyond the URL to configure',
      description:
        'No client id, no secret, no consent screen, and no domain verification or allowlist request — you paste the connector URL and that is the whole setup. Custom connectors need a paid Claude plan.',
    },
  ],
  workflows: [
    'Ask a Cowork session to research across pages in your logged-in browser',
    'Have Cowork read a dashboard and draft a summary from the real numbers',
    'Let Cowork gather information from several sites into one document',
    'Ask Cowork to check your inbox page for a specific message',
    'Have Cowork fill a web form from a brief you give it',
  ],
  tools: ['Claude', 'Cowork', 'Chrome', 'Gmail', 'Google Drive', 'Notion', 'Slack', 'GitHub'],
  faqs: [
    {
      question: 'Does this work in a Cowork session?',
      answer:
        'Yes. A custom connector is brokered through your Claude account rather than tied to one machine, so a Cowork session reaches it the same way a Desktop chat does. A local Desktop Extension would not — that is scoped to the desktop app on that one computer.',
    },
    {
      question: 'How do I add a custom connector in Claude?',
      answer:
        'Open Settings → Connectors, click Add, then Add custom connector. Give it a name, paste https://relay.api.vibebrowser.app/mcp/ followed by your routing UUID, and click Add. Then in a chat use the + button → Connectors and toggle it on for that conversation.',
    },
    {
      question: 'Can Claude control my browser from claude.ai, not just Claude Desktop?',
      answer:
        'Yes, via a custom connector. Claude Desktop can launch a local MCP server, but claude.ai, Cowork, and mobile cannot — they need a remote MCP server reachable over the public internet. The Vibe relay is exactly that, so one connector URL covers every Claude surface.',
    },
    {
      question: 'Claude says "You are not connected to Vibe Browser yet" — did it fail?',
      answer:
        'No. Claude reports a custom connector as not connected until the first time a conversation actually calls one of its tools. Send a prompt that requires the browser — for example asking it to open a page — and the status resolves.',
    },
    {
      question: 'Do I still need to install anything?',
      answer:
        'Only the Vibe Chrome extension. On the remote-connector path there is no npx command and no local MCP server — the hosted assistant talks to the Vibe relay over HTTPS, and the relay forwards to your extension.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
