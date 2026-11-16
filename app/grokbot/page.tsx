import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for GrokBot — Connect Grok & Grok Bots to Your Browser',
  description:
    'Add Vibe to Grok as a custom connector and let Grok use your real Chrome. One URL, plain steps, no code. For Grok on the web and Grok-powered bots.',
  keywords: [
    'grok mcp connector',
    'grok custom connector',
    'grok browser control',
    'grok bots browser',
    'xai grok mcp',
    'connect grok to browser',
    'vibebrowser GrokBot',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/grokbot' },
  openGraph: {
    title: 'VibeBrowser for GrokBot — Connect Grok & Grok Bots to Your Browser',
    description:
      'grok.com/connectors → New Connector → Custom. Paste one URL and Grok works in your real Chrome.',
    url: 'https://www.vibebrowser.app/grokbot',
  },
}

const config: ProfessionConfig = {
  slug: 'grokbot',
  name: 'GrokBot',
  title: 'Give Grok control of your browser',
  subtitle: 'grok.com/connectors → New Connector → Custom. Paste one URL. Done.',
  gradient: 'from-neutral-950 via-stone-900 to-neutral-950',
  gradientFrom: 'from-neutral-950',
  gradientVia: 'via-stone-900',
  gradientTo: 'to-neutral-950',
  accentColor: 'text-stone-300',
  accentBg: 'bg-stone-100 text-stone-800',
  rotatingWords: [
    'Page Reading',
    'Dashboard Reads',
    'Form Filling',
    'Web Research',
    'Screenshots',
    'Tab Summaries',
    'Price Checks',
    'News Checks',
  ],
  description:
    'Grok can connect to outside tools with custom connectors. Open grok.com/connectors, choose New Connector, then Custom, and paste your Vibe URL: https://relay.api.vibebrowser.app/mcp/ plus your routing UUID from the Vibe extension. Grok can then open pages, click, type, and read your real Chrome — even on sites where you are logged in.',
  ctaText: 'Read the setup guide',
  ctaLink: '/integrations/grokbots',
  features: [
    {
      icon: 'Plug',
      title: 'One-URL setup',
      description:
        'A custom connector is one URL, so setup takes about a minute: grok.com/connectors → New Connector → Custom, name it "Vibe Browser", paste your whole connector URL, save.',
    },
    {
      icon: 'Chrome',
      title: 'Your real Chrome',
      description:
        'Grok can chat about the web, but on its own it cannot open your pages. Through Vibe it opens, reads, and acts on pages in the browser you are already signed into.',
    },
    {
      icon: 'Lock',
      title: 'Grok never sees your passwords',
      description:
        'Grok sends tool calls to the Vibe relay, and the extension acts inside your Chrome. Your logins stay in your browser — Grok gets tools, not your passwords.',
    },
    {
      icon: 'MessageSquare',
      title: 'Works for Grok bots too',
      description:
        'Bots built on Grok use the same connector idea: a tool server the bot can call. If your bot setup accepts a custom connector URL, the same Vibe URL works.',
    },
    {
      icon: 'Smartphone',
      title: 'Grok Bot desktop app',
      description:
        'Grok Bot is a separate desktop app from xAI and Cursor. Once your plan is active, bots in the app use connectors the same way — give the bot your Vibe URL and it can work in your browser.',
    },
    {
      icon: 'Eye',
      title: 'Watch it work',
      description:
        'Ask Grok to check a page you are logged into and watch your own tab move — open and read pages, click, type, fill forms, scroll, and take screenshots.',
    },
  ],
  workflows: [
    'Ask Grok to open a page behind a login and summarize it',
    'Have Grok check a dashboard and report the latest numbers',
    'Ask Grok to fill a form on a site you use',
    'Let a Grok bot open pages and gather information for a task',
    'Ask Grok for a screenshot of a page in your browser',
  ],
  tools: ['Grok', 'Grok Bot', 'X', 'Chrome', 'Gmail', 'Notion', 'GitHub', 'Google Drive'],
  faqs: [
    {
      question: 'Does Grok need my browser password?',
      answer:
        'No. Grok never sees your passwords. It sends tool calls to the Vibe relay, and the extension acts inside the Chrome you are already signed into. The connector URL itself is a secret — treat it like a password and regenerate it in the extension if it leaks.',
    },
    {
      question: 'What can Grok do once it is connected?',
      answer:
        'Open and read pages, click, type, fill forms, scroll, and take screenshots — in your real browser, with your sessions. Ask it to check a page you are logged into and watch your own tab move.',
    },
    {
      question: 'What if Grok asks for a token or a key?',
      answer:
        'Stop there. The confirmed setup is URL-only. A token prompt means that screen is not covered by our test yet — tell us what you saw and we will update the guide.',
    },
    {
      question: 'Does this work for Grok bots too?',
      answer:
        'Bots built on Grok use the same connector idea: a tool server the bot can call. If your bot setup accepts a custom connector URL, the same Vibe URL works. Bot platforms differ, so check what yours accepts before you paste it anywhere.',
    },
    {
      question: 'Does the Grok Bot desktop app work the same way?',
      answer:
        'Mostly — but it needs a paid plan first. Grok Bot is a separate desktop app from xAI and Cursor, not the grok.com web page. The app itself is free to open, but it will not run until you add Cursor Pro or link a SuperGrok plan. Once your plan is active, bots in the app use connectors the same way. The steps on this page come from xAI\'s official connector docs; a full end-to-end test in a live Grok account is still in progress.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
