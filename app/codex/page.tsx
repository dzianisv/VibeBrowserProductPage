import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for Codex CLI — Give OpenAI Codex a Real Cloud Browser',
  description:
    'Connect OpenAI Codex CLI to a real, pre-authenticated browser via MCP. Navigate, click, fill forms, and get markdown snapshots — not 400 KB of raw HTML. $9/mo cloud or free local.',
  keywords: [
    'Codex CLI browser MCP',
    'OpenAI Codex browser automation',
    'Codex MCP browser',
    'Codex CLI browser control',
    'OpenAI Codex browser extension',
    'Codex authenticated browser',
    'Codex cloud browser',
    'vibebrowser Codex',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/codex' },
  openGraph: {
    title: 'VibeBrowser for Codex CLI — Give OpenAI Codex a Real Cloud Browser',
    description:
      'Connect Codex CLI to a pre-authenticated cloud browser in one command. Markdown snapshots, not raw HTML. $9/mo.',
    url: 'https://www.vibebrowser.app/codex',
  },
}

const config: ProfessionConfig = {
  slug: 'codex',
  name: 'Codex CLI Users',
  title: 'Give Codex a Real Browser',
  subtitle: 'Codex CLI + cloud browser = agent that ships end-to-end',
  gradient: 'from-emerald-950 via-teal-900 to-emerald-950',
  gradientFrom: 'from-emerald-950',
  gradientVia: 'via-teal-900',
  gradientTo: 'to-emerald-950',
  accentColor: 'text-emerald-300',
  accentBg: 'bg-emerald-100 text-emerald-800',
  rotatingWords: [
    'PR Reviews',
    'Bug Triage',
    'Docs Editing',
    'Issue Filing',
    'CI Monitoring',
    'Deploy Checks',
    'API Testing',
    'Changelog Drafts',
  ],
  description:
    'Codex CLI can write and run code — but the moment it needs to log into GitHub, read an internal dashboard, or navigate a staging environment, it\'s stuck. VibeBrowser connects Codex to a pre-authenticated cloud browser over MCP. One command. No CDP plumbing. Markdown output that keeps context small.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'Terminal',
      title: 'One-command MCP setup',
      description:
        'npx @vibebrowser/mcp --remote YOUR_UUID. Codex CLI discovers the MCP tools immediately — navigate, snapshot, click, fill, scroll, new tab.',
    },
    {
      icon: 'Code',
      title: 'End-to-end code + browser workflows',
      description:
        'Codex writes the code, VibeBrowser opens the browser to test it. Build → deploy → verify in one agent loop without switching tools.',
    },
    {
      icon: 'Globe',
      title: 'Pre-authenticated sessions',
      description:
        'Transfer your logins once. Codex reaches GitHub, your CI dashboard, staging environments, and internal tooling — no re-auth, no CAPTCHA interruptions.',
    },
    {
      icon: 'FileText',
      title: 'Markdown snapshots, not raw HTML',
      description:
        'Codex gets clean structured content (~1–2 KB) instead of raw HTML (200–400 KB). Faster agent loops, lower token cost, no context overflow on multi-step tasks.',
    },
    {
      icon: 'Cloud',
      title: 'Cloud browser, always on',
      description:
        'The cloud browser runs 24/7. Codex can monitor builds, watch for failing tests, and check deploys overnight — no laptop required.',
    },
    {
      icon: 'Lock',
      title: 'Your accounts, your data',
      description:
        'Passwords are never transmitted. VibeBrowser transfers session state — cookies and tokens — not credentials.',
    },
  ],
  workflows: [
    'Ask Codex to open a failing GitHub Actions run and diagnose the error from the log page',
    'Have Codex navigate to a staging URL, test a user flow, and file a GitHub issue if something breaks',
    'Let Codex open an open PR, read the diff, and post a review comment via the GitHub UI',
    'Ask Codex to check your Vercel deployment dashboard and confirm the latest deploy succeeded',
    'Have Codex read an internal wiki page for context, then update the related code',
    'Give Codex a list of npm packages to audit: browse each changelog and summarise breaking changes',
  ],
  tools: ['Codex CLI', 'GitHub', 'Vercel', 'Linear', 'Jira', 'Confluence', 'Notion', 'Sentry', 'Datadog', 'npm'],
  faqs: [
    {
      question: 'How does VibeBrowser complement Codex CLI?',
      answer:
        'Codex CLI is strong at writing and running code. VibeBrowser adds the browser layer: reading live web pages, clicking through UIs, testing deployed apps, and navigating authenticated portals. Together they cover the full build → test → verify loop.',
    },
    {
      question: 'How do I add VibeBrowser to Codex CLI?',
      answer:
        'Add VibeBrowser to your MCP config and run npx @vibebrowser/mcp --remote YOUR_UUID. Codex will discover the browser tools (navigate, snapshot, click, fill) automatically. Full guide at vibebrowser.app/mcp.',
    },
    {
      question: 'Can Codex use this to test a local dev server?',
      answer:
        'Yes for local mode (free tier). Run npx @vibebrowser/mcp without --remote and VibeBrowser connects to your local Chrome, which can reach localhost. Cloud mode uses a cloud IP, so it can\'t reach your local dev server directly.',
    },
    {
      question: 'Why not just use Playwright with Codex?',
      answer:
        'Playwright needs page-specific selectors, handles authentication separately, and returns full DOM/HTML. VibeBrowser is model-first: pre-authenticated, markdown output, zero selector boilerplate. Codex describes what it wants to see — VibeBrowser handles the rest.',
    },
    {
      question: 'Does it work with GPT-4o and other OpenAI models via API?',
      answer:
        'Yes. VibeBrowser is a standard MCP server — any OpenAI-model agent that routes tool calls through MCP can use it, including custom agents built on the OpenAI Agents SDK.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
