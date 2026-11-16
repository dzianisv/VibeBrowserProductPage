import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser for Muse — Give Muse (Meta AI) Control of Your Real Browser',
  description:
    'Connect Muse to your real Chrome with the VibeBrowser MCP connector: one message with your full connector URL — no API key, no authorization header, no second secret. Muse for Chrome is Meta’s agent in a side panel; VibeBrowser is one browser any agent can drive — Muse, Claude, ChatGPT, Codex — plus local on-device models and no AI vendor lock-in.',
  keywords: [
    'muse mcp connector',
    'meta muse browser',
    'connect muse to browser',
    'muse custom connector',
    'muse ai browser control',
    'vibebrowser Muse',
    'claude for chrome alternative',
    'chatgpt for chrome alternative',
    'muse for chrome alternative',
    'ai browser agent',
    'mcp browser',
    'browser mcp server',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/muse' },
  openGraph: {
    title: 'VibeBrowser for Muse — Give Muse (Meta AI) Control of Your Real Browser',
    description:
      'One message with your full connector URL — no API key, no header, no second secret — and Muse works in your real logged-in Chrome.',
    url: 'https://www.vibebrowser.app/muse',
  },
}

const config: ProfessionConfig = {
  slug: 'muse',
  name: 'Muse',
  title: 'Give Muse control of your browser',
  subtitle: 'One message with your full connector URL — no API key, no header, no second secret. Muse works in your real Chrome, and the same browser stays open to any agent',
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
    'Claude for Chrome, ChatGPT for Chrome and Muse for Chrome each put one vendor’s agent in your browser. VibeBrowser is the browser any agent can drive: connect Muse from chat with one message carrying your full MCP connector URL — the session ID is already in the URL path, so there is no API key, no authorization header and no second secret. Muse adds Vibe Browser as a custom connector; it lives in the Muse app under Settings → Connectors → Custom connectors, and Muse can open, read, and act on pages in your real Chrome. Claude, ChatGPT, Codex and other MCP agents connect to the same browser, and local on-device models mean you are never locked to one AI vendor.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'MessageSquare',
      title: 'Built from one chat message',
      description:
        'Muse lists connectors in Settings, but there is no add form. Send Muse one message with your full connector URL and Muse creates the Vibe Browser custom connector for you.',
    },
    {
      icon: 'Lock',
      title: 'The URL is the whole credential',
      description:
        'Your connector URL is a key to your browser — and it is the only one. There is no API key, no authorization header and no second secret to paste anywhere. The extension masks the URL; if it ever leaks, Regenerate session in the extension settings kills it and the old URL stops working.',
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
      icon: 'Plug',
      title: 'Any agent, no vendor lock-in',
      description:
        'Muse today, Claude, ChatGPT or Codex tomorrow: every MCP agent drives the same browser. Local on-device models plus your choice of provider — Vibe AI, Claude Max sign-in, GitHub Copilot, OpenRouter, Ollama — mean no single AI vendor owns your browser.',
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
        { kind: 'output', text: '✓ External AI agent control on\n✓ Copy your full MCP connector URL — it ends with your session ID, after /mcp/' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
      Use: [
        { kind: 'output', text: '# 3 \u00b7 Send Muse one message \u2014 your full connector URL is in it', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'Add a custom connector named "Vibe Browser" using this MCP server URL: https://relay.api.vibebrowser.app/mcp/<session-id> \u2014 no API key, no authorization header, no other secret. Do not ask me for a credential.' },
        { kind: 'output', text: '\u2713 Connector added \u2014 find it in Settings \u2192 Connectors \u2192 Custom connectors' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '# 4 \u00b7 Muse checks the connection', lineKind: 'info' },
        { kind: 'type', text: 'List my open browser tabs' },
        { kind: 'output', lineKind: 'md', text: '# Your open tabs\n\n- **Inbox** \u2014 mail.google.com\n- **GitHub** \u2014 github.com/notifications\n- **Settings** \u2014 Vibe extension, AI Agent Control' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
    },
  },
  faqs: [
    {
      question: 'Where does the connector live in Muse?',
      answer:
        'In the Muse app: Settings → Connectors → Custom connectors. There is no add form in Settings — the setup message creates the connector, and it appears in that list, where you can view and manage it.',
    },
    {
      question: 'Is the MCP connector URL a secret?',
      answer:
        'Yes — the URL is the whole credential: anyone who holds it can control your browser, and there is no second secret, API key or header on top of it. That is why the extension masks the URL, and why you send it only to your own Muse. If the URL ever leaks, open the Vibe extension settings → AI Agent Control, click Regenerate session — the old URL stops working — and send Muse the message again with the new URL.',
    },
    {
      question: 'What can Muse do once it is connected?',
      answer:
        'List your tabs, open and read pages, click, type, fill forms, and take screenshots — in your real Chrome, including pages where you are logged in. A good first task is a read-only one: ask Muse to summarize the page you have open.',
    },
    {
      question: 'Where do I find my connector URL?',
      answer:
        'In the extension: Vibe icon → Settings → AI Agent Control. In the Relay access box, copy the full "MCP connector URL (HTTPS)" — your session ID is the segment at the end, after /mcp/. Paste the whole URL into the setup message, or replace <session-id> in the template with that segment.',
    },
    {
      question: 'Is the Muse connection verified end to end?',
      answer:
        'Not yet. The steps follow the Muse app as it works today — one message in chat carrying your full connector URL, then the connector listed under Settings → Connectors → Custom connectors — and the screenshots come from the real app and the real extension settings. A full end-to-end run with a live Muse account is still being verified, so treat this page as a guide.',
    },
    {
      question: 'How is VibeBrowser different from Claude for Chrome, ChatGPT for Chrome, or Muse for Chrome?',
      answer:
        'Each of those is one vendor’s agent in your browser: Claude for Chrome is Anthropic’s Claude in a Chrome side panel, ChatGPT for Chrome lets OpenAI’s ChatGPT use your browser to complete tasks, and Muse for Chrome is Meta’s personal agent in a side panel. VibeBrowser is not another agent — it is the browser itself, exposed over MCP, so any agent can drive it: Muse, Claude, ChatGPT, Codex and more, in the Chrome you are already logged into. It also runs local on-device models and lets you choose your model and provider, so you are never locked to one AI vendor.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
