import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser for Muse — Give Muse (Meta AI) Control of Your Real Browser',
  description:
    'Connect Muse to your real Chrome with the VibeBrowser MCP connector: send Muse one prompt, paste your session ID on the secure card, and find the connector in Settings → Connectors → Custom connectors.',
  keywords: [
    'muse mcp connector',
    'meta muse browser',
    'connect muse to browser',
    'muse custom connector',
    'muse ai browser control',
    'vibebrowser Muse',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/muse' },
  openGraph: {
    title: 'VibeBrowser for Muse — Give Muse (Meta AI) Control of Your Real Browser',
    description:
      'Send Muse one prompt, paste your session ID on the secure card, and Muse works in your real logged-in Chrome.',
    url: 'https://www.vibebrowser.app/muse',
  },
}

const config: ProfessionConfig = {
  slug: 'muse',
  name: 'Muse',
  title: 'Give Muse control of your browser',
  subtitle: 'One prompt in chat, your session ID on a secure card — Muse works in your real Chrome',
  gradient: 'from-blue-950 via-sky-900 to-blue-950',
  gradientFrom: 'from-blue-950',
  gradientVia: 'via-sky-900',
  gradientTo: 'to-blue-950',
  accentColor: 'text-sky-300',
  accentBg: 'bg-sky-100 text-sky-800',
  rotatingWords: [
    'Tab Summaries',
    'Page Reading',
    'Form Filling',
    'Web Research',
    'Inbox Checks',
    'Dashboard Reads',
    'Screenshots',
    'Link Checking',
  ],
  description:
    'You connect Vibe Browser to Muse from chat: send Muse the setup prompt — it contains no secret — then paste your session ID, the part at the end of the MCP connector URL in the extension, on the secure card Muse shows you. Muse adds Vibe Browser as a custom connector. It then lives in the Muse app under Settings → Connectors → Custom connectors, and Muse can open, read, and act on pages in your real Chrome.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'MessageSquare',
      title: 'Built from one chat prompt',
      description:
        'Muse lists connectors in Settings, but there is no add form. Send Muse one prompt — it contains no secret — and Muse creates the Vibe Browser custom connector for you.',
    },
    {
      icon: 'Lock',
      title: 'Session ID stays off chat',
      description:
        'Your session ID is a key to your browser. It goes only on Muse\'s secure credential card, never into a chat message — that is why the setup prompt contains no URL and no key.',
    },
    {
      icon: 'Layers',
      title: 'Lives in Custom connectors',
      description:
        'After setup, Vibe Browser sits in the Muse app under Settings → Connectors → Custom connectors, where you can view and manage it.',
    },
    {
      icon: 'Chrome',
      title: 'Your real, logged-in Chrome',
      description:
        'Muse works inside the Chrome you are already logged into — not a fresh browser with no sessions.',
    },
    {
      icon: 'Globe',
      title: 'Full browser toolset',
      description:
        'Once connected, Muse can list your tabs, open and read pages, click, type, fill forms, and take screenshots in your real Chrome.',
    },
    {
      icon: 'Shield',
      title: 'Revoke in one step',
      description:
        'If the session ID ever leaks, open the Vibe extension settings → AI Agent Control, click Regenerate session, and the old ID stops working — then send Muse the prompt again.',
    },
  ],
  workflows: [
    'Ask Muse to list your open tabs and summarize the page you are reading',
    'Have Muse open a dashboard you are logged into and pull the numbers you need',
    'Ask Muse to fill a web form from details you give it in chat',
    'Let Muse check a page behind a login and report what it says',
    'Ask Muse for a screenshot of a page in your browser',
  ],
  tools: ['Muse', 'Chrome', 'Gmail', 'Google Docs', 'Notion', 'GitHub', 'YouTube', 'LinkedIn'],
  cliDemo: {
    title: 'muse',
    scripts: {
      Install: [
        { kind: 'output', text: '# 1 · Install the Vibe Browser extension', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'Chrome Web Store → Add Vibe Browser to Chrome' },
        { kind: 'output', text: '✓ Extension installed — click the Vibe icon in the toolbar so it is active' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '# 2 · Turn on Remote in the extension', lineKind: 'info' },
        { kind: 'type', text: 'Vibe icon → Settings → AI Agent Control → Remote (internet)' },
        { kind: 'output', text: '✓ External AI agent control on\n✓ Your session ID is at the end of the MCP connector URL, after /mcp/' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
      Use: [
        { kind: 'output', text: '# 3 · Send Muse one prompt — it contains no secret', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'Add a custom connector named "Vibe Browser" — ask me for the session ID on the secure credential card' },
        { kind: 'output', text: 'Muse → shows the "Add custom connector" card for Vibebrowser' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '# 4 · Paste the session ID on the card — never in chat', lineKind: 'info' },
        { kind: 'type', text: 'Paste session ID → Add' },
        { kind: 'output', text: '✓ Connector added — find it in Settings → Connectors → Custom connectors' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '# 5 · Muse checks the connection', lineKind: 'info' },
        { kind: 'type', text: 'List my open browser tabs' },
        { kind: 'output', lineKind: 'md', text: '# Your open tabs\n\n- **Inbox** — mail.google.com\n- **GitHub** — github.com/notifications\n- **Settings** — Vibe extension, AI Agent Control' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
    },
  },
  faqs: [
    {
      question: 'Where does the connector live in Muse?',
      answer:
        'In the Muse app: Settings → Connectors → Custom connectors. There is no add form in Settings — the prompt creates the connector, and it appears in that list, where you can view and manage it.',
    },
    {
      question: 'Is the MCP connector URL a secret?',
      answer:
        'Yes — the session ID is a key to your browser, so it only ever goes on Muse\'s secure credential card, never into a chat. That is why the setup prompt contains no URL and no key. If the ID ever leaks, open the Vibe extension settings → AI Agent Control, click Regenerate session, and send Muse the prompt again.',
    },
    {
      question: 'What can Muse do once it is connected?',
      answer:
        'List your tabs, open and read pages, click, type, fill forms, and take screenshots — in your real Chrome, including pages where you are logged in. A good first task is a read-only one: ask Muse to summarize the page you have open.',
    },
    {
      question: 'Where do I find my session ID?',
      answer:
        'In the extension: Vibe icon → Settings → AI Agent Control. In the Relay access box, find "MCP connector URL (HTTPS)" — your session ID is the part at the end of that URL, after /mcp/. Keep the settings page open and paste the ID once, on Muse\'s secure card.',
    },
    {
      question: 'Is the Muse connection verified end to end?',
      answer:
        'Not yet. The steps follow the Muse app as it works today — one prompt in chat, the session ID pasted on the secure Add custom connector card, then the connector listed under Settings → Connectors → Custom connectors — and the screenshots come from the real app and the real extension settings. A full end-to-end run with a live Muse account is still being verified, so treat this page as a guide.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
