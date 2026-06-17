import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser for Grok — Give xAI Grok a Real Cloud Browser',
  description:
    'Connect xAI Grok to a real, pre-authenticated browser via MCP. Navigate, click, fill forms, and get markdown snapshots — not 400 KB of raw HTML. $9/mo cloud or free local.',
  keywords: [
    'Grok browser extension',
    'Grok browser automation',
    'xAI Grok browser agent',
    'Grok MCP browser',
    'Grok browser control',
    'Grok web agent',
    'xAI browser automation',
    'Grok AI browser extension',
    'vibebrowser Grok',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/grok' },
  openGraph: {
    title: 'VibeBrowser for Grok — Give xAI Grok a Real Cloud Browser',
    description:
      'Connect Grok to a pre-authenticated cloud browser in one command. Markdown snapshots, not raw HTML. $9/mo.',
    url: 'https://www.vibebrowser.app/grok',
  },
}

const config: ProfessionConfig = {
  slug: 'grok',
  name: 'Grok Users',
  title: 'Give Grok a Real Browser',
  subtitle: 'Grok + cloud browser = agent that acts on the web, not just talks about it',
  gradient: 'from-gray-950 via-zinc-900 to-gray-950',
  gradientFrom: 'from-gray-950',
  gradientVia: 'via-zinc-900',
  gradientTo: 'to-gray-950',
  accentColor: 'text-zinc-300',
  accentBg: 'bg-zinc-100 text-zinc-800',
  rotatingWords: [
    'Real-time Research',
    'Market Monitoring',
    'X / Twitter Data',
    'News Aggregation',
    'Price Tracking',
    'Competitor Checks',
    'Form Automation',
    'Dashboard Reads',
  ],
  description:
    'Grok has real-time reasoning and strong web awareness — but it can\'t log into your accounts, click through portals, or automate authenticated workflows. VibeBrowser connects Grok to a pre-authenticated cloud browser over MCP. One command, no Playwright boilerplate, and markdown snapshots that keep agent context lean.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'Terminal',
      title: 'One-command MCP setup',
      description:
        'npx @vibebrowser/mcp --remote YOUR_UUID. Any Grok-powered agent that supports MCP tool calls picks up the browser tools immediately — navigate, snapshot, click, fill, scroll.',
    },
    {
      icon: 'Globe',
      title: 'Pre-authenticated sessions',
      description:
        'Transfer your logins once. Grok reaches your SaaS tools, internal dashboards, and any site you\'re already signed into — without re-auth delays or CAPTCHA interruptions.',
    },
    {
      icon: 'FileText',
      title: 'Markdown snapshots, not raw HTML',
      description:
        'Every page snapshot returns structured markdown (~1–2 KB) instead of raw HTML (200–400 KB). Grok\'s context stays on reasoning, not parsing DOM noise — and token costs drop by 99%+.',
    },
    {
      icon: 'Cloud',
      title: 'Cloud browser, always on',
      description:
        'Sessions run in the cloud 24/7. Grok workflows keep running after your laptop closes — ideal for real-time monitoring, scheduled research, and long-horizon tasks.',
    },
    {
      icon: 'Search',
      title: 'Real browser on live pages',
      description:
        'Point Grok at live authenticated pages — not just public web. Combine Grok\'s real-time reasoning with actual browser control over your accounts and dashboards.',
    },
    {
      icon: 'Lock',
      title: 'Your accounts, your data',
      description:
        'Passwords are never transmitted. VibeBrowser transfers session state — cookies and tokens — not credentials. You stay in control of every account Grok accesses.',
    },
  ],
  workflows: [
    'Ask Grok to monitor industry news across multiple sites and compile a daily briefing',
    'Have Grok track competitor pricing pages and alert you when prices change',
    'Let Grok research a topic across live web sources and save a summary to Notion',
    'Ask Grok to check your analytics dashboard and flag any unusual metric changes',
    'Have Grok navigate vendor portals to extract contract or invoice data automatically',
    'Give Grok a list of leads to research across LinkedIn and company websites',
  ],
  tools: ['Grok API', 'xAI SDK', 'Gmail', 'Notion', 'LinkedIn', 'Slack', 'Google Analytics', 'HubSpot', 'Airtable', 'Google Workspace'],
  cliDemo: {
    title: 'grok-agent',
    scripts: {
      Install: [
        { kind: 'output', text: '# Connect VibeBrowser to a Grok-powered agent', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'npx @vibebrowser/mcp --remote f8a2-91cd-4b3e' },
        { kind: 'output', text: '✓ VibeBrowser MCP server running\n✓ Tools: navigate, snapshot, click, fill, scroll, new_tab\n✓ Add to your agent config: { "mcpServers": { "vibebrowser": { "command": "npx", "args": ["@vibebrowser/mcp", "--remote", "f8a2-91cd-4b3e"] } } }' },
        { kind: 'pause', ms: 600 },
        { kind: 'type', text: '# agent prompt: "research Acme Corp across web and compile a brief"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: 'Connecting to VibeBrowser Cloud...', lineKind: 'info' },
        { kind: 'output', text: '✓ Session f8a2-91cd · IP 45.91.12.34 (us-east-1)\n✓ Navigated to acme.com' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# Acme Corp — Homepage\n\n**Enterprise automation platform · Series B**\n\n$42M raised · 200+ employees\n\nRecent news:\n- Launched Acme Analytics v3 (May 2026)\n- Partnership with DataBridge announced\n- 50% YoY revenue growth\n\n[Products] [Pricing] [Blog] [Careers]' },
        { kind: 'output', text: '→ 720 B markdown (raw HTML was 310 KB)', lineKind: 'info' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
      Use: [
        { kind: 'output', text: '# Grok monitors live pages, you get the signal', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: '# agent prompt: "check competitor pricing and flag any changes"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 300 },
        { kind: 'output', text: '✓ Navigated to competitor.com/pricing' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# Competitor Pricing — Updated\n\n**⚠ Change detected vs last check**\n\n| Plan | Previous | Current |\n|---|---|---|\n| Starter | $29/mo | $39/mo (+34%) |\n| Pro | $79/mo | $79/mo |\n| Enterprise | Custom | Custom |\n\nPro tier unchanged. Starter raised $10.' },
        { kind: 'output', text: '→ 480 B markdown', lineKind: 'info' },
        { kind: 'pause', ms: 600 },
        { kind: 'output', text: '✓ Saved diff to Notion · Notified via Slack #competitive-intel' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
    },
  },
  faqs: [
    {
      question: 'How do I connect Grok to VibeBrowser?',
      answer:
        'Add VibeBrowser to your MCP config and run npx @vibebrowser/mcp --remote YOUR_UUID. Any Grok-powered agent that supports MCP tool calls will discover the browser tools (navigate, snapshot, click, fill, scroll) automatically. Full guide at vibebrowser.app/mcp.',
    },
    {
      question: 'Does Grok already have real-time web access?',
      answer:
        'Grok has real-time awareness of public web content — but it can\'t log into your accounts, navigate authenticated portals, fill forms, or click through multi-step web UIs. VibeBrowser adds that authenticated browser control layer on top of Grok\'s reasoning.',
    },
    {
      question: 'What\'s the difference between Grok web search and VibeBrowser?',
      answer:
        'Grok web search retrieves public pages. VibeBrowser gives Grok a real browser session with your logins — so it can access your Gmail, internal dashboards, SaaS tools, and any page that requires authentication. It also enables clicking, form filling, and multi-step automation, not just reading.',
    },
    {
      question: 'Will Grok or xAI see my credentials?',
      answer:
        'No. VibeBrowser transfers your browser session state (cookies and session tokens), not your passwords. Grok sees what a logged-in browser sees. Your credentials stay in your browser; xAI\'s API never touches them.',
    },
    {
      question: 'What Grok model works best with browser automation?',
      answer:
        'Grok-3 or Grok-2 via the xAI API work well for browser automation — both handle tool calls reliably. Use the model that best fits your reasoning needs; VibeBrowser works with any model that supports function/tool calling through MCP.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
