import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for Claude Code — Browser Automation from the Terminal',
  description:
    'Let Claude Code open, click, and read your real logged-in Chrome from the terminal. One MCP config, works next to your other agents, no headless browser.',
  keywords: [
    'claude code browser automation',
    'claude code mcp browser',
    'claude code chrome control',
    'claude code playwright alternative',
    'claude mcp add browser',
    'vibebrowser Claude Code',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/claude-code' },
  openGraph: {
    title: 'VibeBrowser for Claude Code — Browser Automation from the Terminal',
    description:
      'Register the Vibe MCP server once and Claude Code verifies what it shipped in your real Chrome.',
    url: 'https://www.vibebrowser.app/claude-code',
  },
}

const config: ProfessionConfig = {
  slug: 'claude-code',
  name: 'Claude Code',
  title: 'Give Claude Code control of your browser',
  subtitle: 'Verify the feature you just shipped, reproduce a bug, or read a dashboard — from the same terminal session',
  gradient: 'from-orange-950 via-red-900 to-orange-950',
  gradientFrom: 'from-orange-950',
  gradientVia: 'via-red-900',
  gradientTo: 'to-orange-950',
  accentColor: 'text-orange-300',
  accentBg: 'bg-orange-100 text-orange-800',
  rotatingWords: [
    'Feature Verification',
    'Bug Reproduction',
    'Staging Checks',
    'Dashboard Reads',
    'Screenshot Checks',
    'Form Testing',
    'Deploy Checks',
    'Page Reads',
  ],
  description:
    'Vibe MCP gives Claude Code browser tools through the Model Context Protocol. Register the @vibebrowser/mcp server once and Claude Code can navigate to a URL, click elements, fill forms, screenshot, and read page content in your real Chrome — including pages behind a login.',
  ctaText: 'Read the setup guide',
  ctaLink: '/integrations/claude-code',
  features: [
    {
      icon: 'Terminal',
      title: 'One MCP command',
      description:
        'Run claude mcp add vibe -- npx -y @vibebrowser/mcp, then start a new session so the tools are picked up. Claude Code gets navigate, click, type, screenshot, and page-content tools.',
    },
    {
      icon: 'Eye',
      title: 'Close the verify loop',
      description:
        'Claude Code can write and run code but cannot see the running app. With Vibe it opens your real Chrome, hits the page, and reads it back — closing the write-run-verify loop without extra tooling.',
    },
    {
      icon: 'Lock',
      title: 'Your logins, already there',
      description:
        'Authenticated staging environments, admin panels, and internal tools just work because the session is already yours — no re-authentication.',
    },
    {
      icon: 'Code',
      title: 'No Playwright plumbing',
      description:
        'Wiring Playwright or CDP into every project is plumbing you rewrite each time, and the resulting browser has none of your logins. One MCP server replaces it.',
    },
    {
      icon: 'Users',
      title: 'Shares the browser with other agents',
      description:
        'Vibe multiplexes agents through a relay daemon, so several MCP clients can control the same browser at once — and the same server behaves identically across your agents.',
    },
    {
      icon: 'Globe',
      title: 'Windows and Linux too',
      description:
        'The MCP server runs anywhere Node.js runs, and the extension works in Chrome, Brave, Edge, and other Chromium browsers on macOS, Windows, and Linux.',
    },
  ],
  workflows: [
    'Ask Claude Code to open the feature it just shipped and verify it works',
    'Have Claude Code reproduce a bug on a staging URL and report what it sees',
    'Ask Claude Code to read a dashboard and bring the numbers into your session',
    'Let Claude Code screenshot a page and check the layout after a change',
    'Have Claude Code fill a form in your browser to test a flow end to end',
  ],
  tools: ['Claude Code', 'Terminal', 'Chrome', 'GitHub', 'Vercel', 'Linear', 'Jira', 'Sentry'],
  faqs: [
    {
      question: 'How do I give Claude Code browser access?',
      answer:
        'Install the Vibe Chrome extension, then register the Vibe MCP server with Claude Code using: claude mcp add vibe -- npx -y @vibebrowser/mcp. Start a new session and Claude Code will have navigate, click, type, screenshot, and page-content tools.',
    },
    {
      question: 'Is this better than Playwright MCP for Claude Code?',
      answer:
        'For anything behind a login, yes. Playwright launches a fresh browser with no cookies, so authenticated flows fail. Vibe uses your existing Chrome profile and sessions, and unlike Playwright MCP it does not break when a second agent connects.',
    },
    {
      question: 'Can Claude Code use the browser while Claude Desktop is connected?',
      answer:
        'Yes. Vibe multiplexes agents through a relay daemon, so several MCP clients can control the same browser at once.',
    },
    {
      question: 'Does it work on Windows and Linux?',
      answer:
        'Yes. The MCP server runs anywhere Node.js runs, and the extension works in Chrome, Brave, Edge, and other Chromium browsers on macOS, Windows, and Linux.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
