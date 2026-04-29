import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser for Claude — Give Claude Code a Real Cloud Browser',
  description:
    'Connect Claude Code or Claude Desktop to a real, pre-authenticated browser via MCP. Navigate, click, fill forms, and get markdown snapshots — not 400 KB of raw HTML. $9/mo cloud or free local.',
  keywords: [
    'Claude browser MCP',
    'Claude Code browser extension',
    'Claude browser automation',
    'Claude MCP browser control',
    'Claude for Chrome alternative',
    'Claude authenticated browser',
    'Claude cloud browser',
    'vibebrowser Claude',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/claude' },
  openGraph: {
    title: 'VibeBrowser for Claude — Give Claude Code a Real Cloud Browser',
    description:
      'Connect Claude Code to a pre-authenticated cloud browser in one command. Markdown snapshots, not raw HTML. $9/mo.',
    url: 'https://www.vibebrowser.app/claude',
  },
}

const config: ProfessionConfig = {
  slug: 'claude',
  name: 'Claude Users',
  title: 'Give Claude a Real Browser',
  subtitle: 'Claude Code + cloud browser = agent that actually ships work',
  gradient: 'from-orange-950 via-amber-900 to-orange-950',
  gradientFrom: 'from-orange-950',
  gradientVia: 'via-amber-900',
  gradientTo: 'to-orange-950',
  accentColor: 'text-amber-300',
  accentBg: 'bg-amber-100 text-amber-800',
  rotatingWords: [
    'Gmail Triage',
    'GitHub PRs',
    'Salesforce Updates',
    'Notion Pages',
    'Jira Tickets',
    'Google Docs',
    'Linear Issues',
    'Slack Channels',
  ],
  description:
    'Claude Code is powerful — but it hits a wall when it needs to log in somewhere, read your inbox, or navigate a real SaaS dashboard. VibeBrowser gives Claude an always-on, pre-authenticated cloud browser accessible over MCP. One command, zero CDP plumbing.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'Terminal',
      title: 'One-command MCP setup',
      description:
        'npx @vibebrowser/mcp --remote YOUR_UUID. Claude Code picks it up immediately — no SDK, no session management, no CDP connection code.',
    },
    {
      icon: 'Globe',
      title: 'Pre-authenticated sessions',
      description:
        'Transfer your logins once. Claude reaches Gmail, GitHub, Notion, Salesforce — any site you\'re already logged into — without re-auth or CAPTCHA pauses.',
    },
    {
      icon: 'FileText',
      title: 'Markdown snapshots, not raw HTML',
      description:
        'Every page snapshot returns clean markdown (~1–2 KB) instead of raw HTML (200–400 KB). Claude\'s context window stays focused; token costs drop by 99%+.',
    },
    {
      icon: 'Cloud',
      title: 'Cloud browser, always on',
      description:
        'Sessions live in the cloud, not your laptop. Claude can run long workflows overnight, on a schedule, or while your machine is off.',
    },
    {
      icon: 'Code',
      title: 'Works with Claude Code & Desktop',
      description:
        'Drop VibeBrowser into your claude_desktop_config.json or Claude Code MCP config. Full tool surface: navigate, snapshot, click, fill, scroll, tabs.',
    },
    {
      icon: 'Lock',
      title: 'Your accounts, your data',
      description:
        'Passwords are never transmitted. VibeBrowser transfers your browser session state — cookies and tokens — not credentials. You stay in control.',
    },
  ],
  workflows: [
    'Ask Claude to summarise your unread Gmail and draft replies for review',
    'Have Claude check open GitHub PRs and write a status update to Slack',
    'Let Claude read your Jira backlog and propose a sprint plan',
    'Give Claude a Salesforce account page and ask for a call prep brief',
    'Ask Claude to file a Notion doc from a meeting transcript it just read',
    'Have Claude monitor a web dashboard and alert when a metric changes',
  ],
  tools: ['Claude Code', 'Claude Desktop', 'Gmail', 'GitHub', 'Notion', 'Salesforce', 'Jira', 'Linear', 'Google Docs', 'Slack'],
  cliDemo: {
    title: 'claude-code',
    scripts: {
      Install: [
        { kind: 'output', text: '# Connect VibeBrowser to Claude Code', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'claude mcp add vibebrowser -- npx @vibebrowser/mcp --remote f8a2-91cd-4b3e' },
        { kind: 'output', text: '✓ Added MCP server "vibebrowser"\n✓ Tools: navigate, snapshot, click, fill, scroll, new_tab' },
        { kind: 'pause', ms: 600 },
        { kind: 'type', text: 'claude "summarize my unread Gmail and draft replies"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: 'Connecting to VibeBrowser Cloud...', lineKind: 'info' },
        { kind: 'output', text: '✓ Session f8a2-91cd · IP 45.91.12.34 (us-east-1)\n✓ Navigated to mail.google.com · logged in as alice@example.com' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# Gmail — Inbox\n\n**8 unread messages**\n\n- **Team Standup** · Notes from today\'s sync · 10:15am\n- **GitHub** · PR #87 ready for review · 9:30am\n- **Stripe** · Invoice #2048 paid ($450) · 8:12am\n\n[Compose] [Inbox 8] [Sent]' },
        { kind: 'output', text: '→ 1.2 KB markdown (raw HTML was 380 KB — 99.7% smaller)', lineKind: 'info' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
      Use: [
        { kind: 'output', text: '# Claude reads your browser, you stay in control', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'claude "check open GitHub PRs and write a status update"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 300 },
        { kind: 'output', text: '✓ Navigated to github.com/notifications · logged in as @alice' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# GitHub — Open Pull Requests\n\n**3 PRs need review**\n\n- **feat: add OAuth flow** · alice/backend#42 · +180 −12 · 2 approvals\n- **fix: rate limiter** · alice/api#91 · +24 −8 · CI passing\n- **docs: API reference** · alice/docs#15 · +340 −0 · draft\n\n[Review] [Merge] [Close]' },
        { kind: 'output', text: '→ 890 B markdown', lineKind: 'info' },
        { kind: 'pause', ms: 600 },
        { kind: 'type', text: 'claude "now post a summary to #engineering in Slack"' },
        { kind: 'output', text: '✓ Navigated to app.slack.com/client · #engineering channel' },
        { kind: 'output', text: '✓ Posted message: "PR Status: 3 open — OAuth flow ready to merge, rate limiter CI green, API docs still draft"' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
    },
  },
  faqs: [
    {
      question: 'How is this different from Claude for Chrome (Anthropic\'s extension)?',
      answer:
        'Claude for Chrome runs your local browser — Chrome must be open on your laptop. VibeBrowser runs a cloud browser that stays on 24/7, returns markdown snapshots (99% smaller than raw HTML), and works from any machine. Claude for Chrome is great for interactive local work; VibeBrowser is for always-on, token-efficient, scheduled, or team-shared workflows.',
    },
    {
      question: 'What Claude plan do I need?',
      answer:
        'Any Claude plan that supports Claude Code or Claude Desktop with MCP (Pro, Max, Team, or Enterprise). VibeBrowser is $9/mo separately — or free if you use the local extension.',
    },
    {
      question: 'How do I add VibeBrowser to Claude Code?',
      answer:
        'Add to your MCP config: { "mcpServers": { "vibebrowser": { "command": "npx", "args": ["@vibebrowser/mcp", "--remote", "YOUR_UUID"] } } }. That\'s it. Claude Code will discover the tools automatically.',
    },
    {
      question: 'Will Claude see my passwords?',
      answer:
        'No. VibeBrowser transfers your browser session (cookies and session tokens) — not your credentials. Claude sees what a logged-in browser sees, not your keychain.',
    },
    {
      question: 'Can I use this with Claude Desktop as well as Claude Code?',
      answer:
        'Yes. The same MCP server config works in both claude_desktop_config.json and Claude Code. One VibeBrowser subscription, all your Claude surfaces.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
