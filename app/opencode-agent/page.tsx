import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for OpenCode — Browser Control over MCP',
  description:
    'Connect OpenCode to your real Chrome over MCP. One entry in .opencode/config.json gives your agent navigate, click, and page-read tools.',
  keywords: [
    'opencode browser mcp',
    'opencode browser automation',
    'opencode mcp chrome',
    'vibebrowser OpenCode',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/opencode-agent' },
  openGraph: {
    title: 'VibeBrowser for OpenCode — Browser Control over MCP',
    description:
      'One entry in .opencode/config.json and your terminal agent gets a real browser, not a headless stub.',
    url: 'https://www.vibebrowser.app/opencode-agent',
  },
}

const config: ProfessionConfig = {
  slug: 'opencode-agent',
  name: 'OpenCode',
  title: 'Give OpenCode control of your browser',
  subtitle: 'Your terminal agent gets a real browser, not a headless stub',
  gradient: 'from-indigo-950 via-slate-900 to-indigo-950',
  gradientFrom: 'from-indigo-950',
  gradientVia: 'via-slate-900',
  gradientTo: 'to-indigo-950',
  accentColor: 'text-indigo-300',
  accentBg: 'bg-indigo-100 text-indigo-800',
  rotatingWords: [
    'Feature Verification',
    'Bug Reproduction',
    'Page Reads',
    'Form Testing',
    'Screenshots',
    'Staging Checks',
    'Dashboard Reads',
    'Tab Reviews',
  ],
  description:
    'Vibe MCP connects OpenCode to your real Chrome browser. Add the "vibe" server under mcp.servers in .opencode/config.json, install the Vibe extension, and OpenCode can navigate, click, fill forms, screenshot, and read content from pages you are already logged into.',
  ctaText: 'Read the setup guide',
  ctaLink: '/integrations/opencode',
  features: [
    {
      icon: 'Terminal',
      title: 'One entry in .opencode/config.json',
      description:
        'Add the "vibe" MCP server under mcp.servers — command npx, args ["-y", "@vibebrowser/mcp"] — then restart OpenCode.',
    },
    {
      icon: 'Eye',
      title: 'Verify the result in a browser',
      description:
        'OpenCode can run code but cannot verify the result in a browser on its own. With Vibe it opens the page in your Chrome and reads it back.',
    },
    {
      icon: 'Lock',
      title: 'Authenticated pages work',
      description:
        'Authenticated environments are unreachable from a clean automation browser. OpenCode drives your existing Chrome with your sessions intact.',
    },
    {
      icon: 'Users',
      title: 'Shares one browser with other agents',
      description:
        'Vibe multiplexes MCP clients through a relay daemon so several agents can drive one browser simultaneously.',
    },
    {
      icon: 'Chrome',
      title: 'Real Chrome, not a stub',
      description:
        'The extension runs in the Chrome you already use — Chrome, Brave, Edge, or any Chromium browser — with no second profile to maintain.',
    },
    {
      icon: 'Zap',
      title: 'The full Vibe tool set',
      description:
        'Navigate, click, fill forms, screenshot, and read content from pages — the same MCP server as every other client, so behavior is identical across your agents.',
    },
  ],
  workflows: [
    'Ask OpenCode to open the app it just changed and check the result',
    'Have OpenCode take a snapshot of a page and return its content',
    'Let OpenCode fill a form in your browser to test a flow',
    'Ask OpenCode to read a page behind a login for context while it codes',
  ],
  tools: ['OpenCode', 'Terminal', 'Chrome', 'GitHub', 'Vercel', 'Linear', 'Sentry'],
  faqs: [
    {
      question: 'How do I add an MCP server to OpenCode?',
      answer:
        'Add it under mcp.servers in .opencode/config.json. For Vibe, use command npx with args ["-y", "@vibebrowser/mcp"], then restart OpenCode.',
    },
    {
      question: 'Does OpenCode share the browser with other agents?',
      answer:
        'Yes. Vibe multiplexes MCP clients through a relay daemon so several agents can drive one browser simultaneously.',
    },
    {
      question: 'How do I connect the extension?',
      answer:
        'Click the Vibe icon, open Settings, and enable "MCP External Control" until the status reads Connected. Then ask your agent to open a page and take a snapshot — it should return the content of your real tab.',
    },
    {
      question: 'What do I need to install?',
      answer:
        'The Vibe extension in Chrome — add Vibe AI Browser from the Chrome Web Store (Chrome, Brave, Edge, or any Chromium browser). That is the piece that lets an agent drive the browser you are already logged into, with no second browser profile and no re-authentication.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
