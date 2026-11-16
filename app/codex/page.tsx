import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'VibeBrowser for Codex CLI — Give OpenAI Codex Your Real Chrome',
  description:
    'Connect OpenAI Codex CLI to your real, logged-in Chrome via MCP. Navigate, click, fill forms, and get markdown snapshots — not raw HTML. Free $0, Pro $25/mo, Max $99/mo.',
  keywords: [
    'Codex CLI browser MCP',
    'OpenAI Codex browser automation',
    'Codex MCP browser',
    'Codex CLI browser control',
    'OpenAI Codex browser extension',
    'Codex authenticated browser',
    'Codex real Chrome browser',
    'vibebrowser Codex',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/codex' },
  openGraph: {
    title: 'VibeBrowser for Codex CLI — Give OpenAI Codex Your Real Chrome',
    description:
      'Connect Codex CLI to your real, logged-in Chrome in one command. Markdown snapshots, not raw HTML. Free $0, Pro $25/mo, Max $99/mo.',
    url: 'https://www.vibebrowser.app/codex',
  },
}

const config: ProfessionConfig = {
  slug: 'codex',
  name: 'Codex CLI Users',
  title: 'Give Codex a Real Browser',
  subtitle: 'Codex CLI + your real Chrome = agent that ships end-to-end',
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
    'Codex CLI can write and run code — but the moment it needs to log into GitHub, read an internal dashboard, or navigate a staging environment, it\'s stuck. VibeBrowser connects Codex to your real, logged-in Chrome over MCP — the extension runs in your Chrome, and the relay connects Codex to it. One command. No CDP plumbing. Markdown output that keeps context small.',
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
        'Codex works with the logins already in your Chrome. It reaches GitHub, your CI dashboard, staging environments, and internal tooling — no re-auth, no CAPTCHA interruptions.',
    },
    {
      icon: 'FileText',
      title: 'Markdown snapshots, not raw HTML',
      description:
        'Codex gets clean structured markdown instead of raw HTML. Faster agent loops, less context spent on markup, no context overflow on multi-step tasks.',
    },
    {
      icon: 'Chrome',
      title: 'Your real, logged-in Chrome',
      description:
        'The extension runs in the Chrome you already use, and the relay connects Codex to it — your tabs, your logins, your machine.',
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
  cliDemo: {
    title: 'codex-cli',
    scripts: {
      Install: [
        { kind: 'output', text: '# Connect VibeBrowser to Codex CLI', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'codex mcp add vibebrowser -- npx @vibebrowser/mcp --remote f8a2-91cd-4b3e' },
        { kind: 'output', text: '✓ Added MCP server "vibebrowser"\n✓ Tools: navigate, snapshot, click, fill, scroll, new_tab' },
        { kind: 'pause', ms: 600 },
        { kind: 'type', text: 'codex "open the failing CI run and tell me what broke"' },
        { kind: 'output', text: '⟡ Using vibebrowser tools...' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: 'Connecting to your Chrome via the VibeBrowser relay...', lineKind: 'info' },
        { kind: 'output', text: '✓ Connected to your real Chrome\n✓ Navigated to github.com/alice/api/actions/runs/12847' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# GitHub Actions — Run #12847 ❌\n\n**test-suite** · failed after 3m 42s\n\n```\nFAIL src/auth/oauth.test.ts\n  ✕ should refresh expired token (48ms)\n    Expected: 200\n    Received: 401\n    at src/auth/oauth.test.ts:47\n```\n\n**2 passed** · **1 failed** · 0 skipped' },
        { kind: 'output', text: '→ 520 B markdown (raw HTML was 195 KB)', lineKind: 'info' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
      Use: [
        { kind: 'output', text: '# Codex builds, deploys, and verifies', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'type', text: 'codex "fix the OAuth test, push, and verify the deploy"' },
        { kind: 'output', text: '⟡ Analyzing oauth.test.ts:47...' },
        { kind: 'pause', ms: 600 },
        { kind: 'output', text: '✓ Fixed: token refresh was missing retry logic\n✓ Committed: fix(auth): add retry to token refresh\n✓ Pushed to feat/oauth-fix' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '⟡ Using vibebrowser to verify deploy...' },
        { kind: 'output', text: '✓ Navigated to staging.myapp.com · CI passing' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', lineKind: 'md', text: '# Vercel Deploy — staging.myapp.com\n\n**Status:** ✅ Ready\n**Branch:** feat/oauth-fix\n**Commit:** fix(auth): add retry to token refresh\n**Build:** 34s · 0 errors · 0 warnings\n\n[Visit] [Logs] [Redeploy]' },
        { kind: 'output', text: '→ 380 B markdown', lineKind: 'info' },
        { kind: 'pause', ms: 2800 },
      ] as Step[],
    },
  },
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
        'Yes. Run npx @vibebrowser/mcp without --remote and VibeBrowser connects to your local Chrome, which can reach localhost.',
    },
    {
      question: 'Why not just use Playwright with Codex?',
      answer:
        'Playwright needs page-specific selectors, handles authentication separately, and returns full DOM/HTML. VibeBrowser is model-first: it works in your logged-in Chrome, returns markdown output, zero selector boilerplate. Codex describes what it wants to see — VibeBrowser handles the rest.',
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
