import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser for ChatGPT — Give ChatGPT a Real Cloud Browser',
  description:
    'Connect ChatGPT or OpenAI agents to a real, pre-authenticated browser via MCP. Navigate, click, fill forms, and get markdown snapshots — not 400 KB of raw HTML. $9/mo cloud or free local.',
  keywords: [
    'ChatGPT browser extension',
    'ChatGPT browser agent',
    'ChatGPT browser automation',
    'OpenAI browser MCP',
    'GPT browser extension',
    'ChatGPT MCP browser',
    'OpenAI browser agent',
    'ChatGPT web agent',
    'GPT-4o browser automation',
    'vibebrowser ChatGPT',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/chatgpt' },
  openGraph: {
    title: 'VibeBrowser for ChatGPT — Give ChatGPT a Real Cloud Browser',
    description:
      'Connect ChatGPT or OpenAI agents to a pre-authenticated cloud browser in one command. Markdown snapshots, not raw HTML. $9/mo.',
    url: 'https://www.vibebrowser.app/chatgpt',
  },
}

const config: ProfessionConfig = {
  slug: 'chatgpt',
  name: 'ChatGPT Users',
  title: 'Give ChatGPT a Real Browser',
  subtitle: 'ChatGPT + cloud browser = agent that operates your web workflows end-to-end',
  gradient: 'from-green-950 via-emerald-900 to-green-950',
  gradientFrom: 'from-green-950',
  gradientVia: 'via-emerald-900',
  gradientTo: 'to-green-950',
  accentColor: 'text-emerald-300',
  accentBg: 'bg-emerald-100 text-emerald-800',
  rotatingWords: [
    'Gmail Drafts',
    'CRM Updates',
    'LinkedIn Outreach',
    'Slack Messages',
    'Form Filling',
    'Research Tasks',
    'Price Monitoring',
    'Dashboard Checks',
  ],
  description:
    'ChatGPT reasons well — but it hits a wall the moment it needs to log into a site, fill a form, or navigate a real SaaS dashboard. VibeBrowser connects ChatGPT or any OpenAI-powered agent to a pre-authenticated cloud browser over MCP. One command, zero Playwright boilerplate, markdown output that keeps context lean.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'Terminal',
      title: 'One-command MCP setup',
      description:
        'npx @vibebrowser/mcp --remote YOUR_UUID. Any OpenAI-model agent that routes tool calls through MCP discovers the browser tools immediately — navigate, snapshot, click, fill, scroll.',
    },
    {
      icon: 'Globe',
      title: 'Pre-authenticated sessions',
      description:
        'Transfer your logins once. ChatGPT reaches Gmail, LinkedIn, Salesforce, HubSpot, and any site you\'re already signed into — without re-auth or CAPTCHA interruptions.',
    },
    {
      icon: 'FileText',
      title: 'Markdown snapshots, not raw HTML',
      description:
        'Every page snapshot returns clean markdown (~1–2 KB) instead of raw HTML (200–400 KB). ChatGPT\'s context window stays focused on reasoning; token costs drop by 99%+.',
    },
    {
      icon: 'Cloud',
      title: 'Cloud browser, always on',
      description:
        'Sessions run in the cloud 24/7. ChatGPT workflows keep running overnight, on a schedule, or while your machine is off — without needing your laptop open.',
    },
    {
      icon: 'Code',
      title: 'Works with OpenAI Agents SDK',
      description:
        'Drop VibeBrowser into any agent built on the OpenAI Agents SDK or any custom GPT-4o workflow that supports MCP tool calls. Full tool surface: navigate, snapshot, click, fill, scroll, tabs.',
    },
    {
      icon: 'Lock',
      title: 'Your accounts, your data',
      description:
        'Passwords are never transmitted. VibeBrowser transfers your browser session state — cookies and tokens — not credentials. Your prompts go directly to OpenAI; VibeBrowser never sees them.',
    },
  ],
  workflows: [
    'Ask ChatGPT to summarise your unread Gmail and draft replies for your review',
    'Have ChatGPT update your CRM with notes from a call and schedule a follow-up',
    'Let ChatGPT research a prospect across LinkedIn, their website, and news — in one session',
    'Give ChatGPT a list of forms to fill and have it work through them automatically',
    'Ask ChatGPT to monitor a competitor pricing page and alert you when prices change',
    'Have ChatGPT navigate your project management tool and generate a weekly status report',
  ],
  tools: ['ChatGPT', 'OpenAI Agents SDK', 'Gmail', 'LinkedIn', 'Salesforce', 'HubSpot', 'Notion', 'Slack', 'Jira', 'Google Workspace'],
  cliDemo: {
    title: 'openai-agents',
    scripts: {
      Install: [
        { kind: 'output', text: '# Connect VibeBrowser to an OpenAI agent', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'npx @vibebrowser/mcp --remote f8a2-91cd-4b3e' },
        { kind: 'output', text: '✓ VibeBrowser MCP server running\n✓ Tools: navigate, snapshot, click, fill, scroll, new_tab\n✓ Add to your agent config: { "mcpServers": { "vibebrowser": { "command": "npx", "args": ["@vibebrowser/mcp", "--remote", "f8a2-91cd-4b3e"] } } }' },
        { kind: 'pause', ms: 600 },
        { kind: 'type', text: '# agent prompt: "summarize my unread Gmail and draft replies"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: 'Connecting to VibeBrowser Cloud...', lineKind: 'info' },
        { kind: 'output', text: '✓ Session f8a2-91cd · IP 45.91.12.34 (us-east-1)\n✓ Navigated to mail.google.com · logged in as alice@example.com' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# Gmail — Inbox\n\n**6 unread messages**\n\n- **Acme Corp** · Proposal feedback — ready to discuss · 11:30am\n- **GitHub** · PR #42 approved · 10:15am\n- **Stripe** · Invoice #3091 paid ($1,200) · 9:02am\n\n[Compose] [Inbox 6] [Sent]' },
        { kind: 'output', text: '→ 940 B markdown (raw HTML was 355 KB — 99.7% smaller)', lineKind: 'info' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
      Use: [
        { kind: 'output', text: '# ChatGPT navigates your accounts, you stay in control', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: '# agent prompt: "update Salesforce lead status for Acme Corp"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 300 },
        { kind: 'output', text: '✓ Navigated to salesforce.com/leads · logged in as alice@company.com' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# Salesforce — Acme Corp Lead\n\n**Status:** Qualified → Proposal\n**Contact:** Bob Smith · VP Engineering\n**Last activity:** 3 days ago\n**Next step:** Send revised SOW\n\n[Edit] [Convert] [Log Call]' },
        { kind: 'output', text: '→ 610 B markdown', lineKind: 'info' },
        { kind: 'pause', ms: 600 },
        { kind: 'output', text: '✓ Updated lead status to "Proposal Sent"\n✓ Added note: "Proposal discussed on call, sending SOW by EOD"' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
    },
  },
  faqs: [
    {
      question: 'Does this work with ChatGPT directly, or only the API?',
      answer:
        'VibeBrowser is a standard MCP server, so it works with any OpenAI-model agent that supports MCP tool calls — including custom agents built on the OpenAI Agents SDK, GPT-4o via API, and any framework that exposes MCP to an OpenAI model. Direct ChatGPT.com browser control requires the API/SDK path.',
    },
    {
      question: 'How is this different from ChatGPT\'s built-in browsing?',
      answer:
        'ChatGPT\'s built-in web browsing fetches public pages — it can\'t log into your Gmail, navigate your Salesforce account, or fill forms on your behalf. VibeBrowser adds real, pre-authenticated browser control over your personal accounts and SaaS tools.',
    },
    {
      question: 'Will ChatGPT / OpenAI see my passwords?',
      answer:
        'No. VibeBrowser transfers your browser session state (cookies and session tokens) — not your credentials. ChatGPT sees what a logged-in browser sees, not your keychain. Your prompts go directly to OpenAI; VibeBrowser never reads them.',
    },
    {
      question: 'How do I add VibeBrowser to an OpenAI agent?',
      answer:
        'Add to your MCP config: { "mcpServers": { "vibebrowser": { "command": "npx", "args": ["@vibebrowser/mcp", "--remote", "YOUR_UUID"] } } }. The agent discovers the browser tools (navigate, snapshot, click, fill, scroll) automatically. Full guide at vibebrowser.app/mcp.',
    },
    {
      question: 'What OpenAI models work best with VibeBrowser?',
      answer:
        'GPT-4o is the recommended model — it handles tool calls reliably and reasons well about page content. GPT-4o-mini works for simpler tasks. Any model that supports function/tool calling in the OpenAI API will work.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
