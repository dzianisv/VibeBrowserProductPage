import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'
import type { Step } from '@/components/cli-demo'

export const metadata: Metadata = {
  title: 'Run Multiple AI Agents in One Browser — No CDP Conflicts | VibeBrowser',
  description:
    'Fix the "Target closed" error when two AI agents fight over Chrome CDP. VibeBrowser Co-Pilot multiplexes all MCP clients through a single chrome.debugger session — no port conflicts, no dropped agents.',
  keywords: [
    'multiple AI agents same browser',
    'CDP port conflict fix',
    'chrome debugger multiple agents',
    'MCP browser multiple clients',
    'playwright mcp conflict',
    'chrome devtools mcp conflict',
    'Target closed CDP error',
    'multi-agent browser automation',
    'share browser session AI agents',
    'claude code browser conflict',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/multi-agent' },
  openGraph: {
    title: 'Run Multiple AI Agents in One Browser — No CDP Conflicts | VibeBrowser',
    description:
      'Fix the "Target closed" error when two agents fight over Chrome CDP. VibeBrowser Co-Pilot multiplexes all MCP clients through one stable chrome.debugger session.',
    url: 'https://www.vibebrowser.app/multi-agent',
  },
}

const config: ProfessionConfig = {
  slug: 'multi-agent',
  name: 'Multi-Agent Builders',
  title: 'One Browser. Many AI Agents.',
  subtitle: 'No more CDP port fights. No dropped connections. No "Target closed."',
  gradient: 'from-violet-950 via-purple-900 to-violet-950',
  gradientFrom: 'from-violet-950',
  gradientVia: 'via-purple-900',
  gradientTo: 'to-violet-950',
  accentColor: 'text-violet-300',
  accentBg: 'bg-violet-100 text-violet-800',
  rotatingWords: [
    'Claude + Codex',
    'Planner + Executor',
    'Scraper + Filler',
    'Monitor + Actor',
    'Researcher + Writer',
    'Tester + Deployer',
    'Copilot + Agent',
    'MCP + Playwright',
  ],
  description:
    'Chrome exposes exactly one DevTools Protocol (CDP) debugger attachment per tab. When a second AI agent tries to attach, Chrome silently drops the first — and you get "Target closed." VibeBrowser Co-Pilot is a Chrome extension that holds the single chrome.debugger session and fans out commands to every connected MCP client. Drop it in; the conflicts disappear.',
  showDownloadButtons: true,
  features: [
    {
      icon: 'Layers',
      title: 'CDP multiplexer, inside Chrome',
      description:
        'One stable chrome.debugger session shared across all agents. Each MCP client connects to the extension — no port management, no external proxy.',
    },
    {
      icon: 'Plug',
      title: 'Drop-in for any MCP client',
      description:
        'Works with Claude Desktop, Claude Code, Codex CLI, custom agents, and any WebSocket-based automation client. No code changes to your agents.',
    },
    {
      icon: 'Lock',
      title: 'Your real browser, your sessions',
      description:
        'Agents run inside your actual Chrome profile. Cookies, logins, and auth state stay intact across all concurrent agent sessions.',
    },
    {
      icon: 'Zap',
      title: 'Zero sidecar processes',
      description:
        'Runs entirely inside Chrome via the extensions API. No extra Node server, no CDP proxy daemon, no additional ports to manage.',
    },
    {
      icon: 'RefreshCw',
      title: 'Survives agent restarts',
      description:
        'If one agent disconnects or crashes, the shared session stays open. Other agents keep working without re-attaching to Chrome.',
    },
    {
      icon: 'Eye',
      title: 'Watch all agents live',
      description:
        'Extension popup shows every connected client and active commands in real time. Debug multi-agent workflows without guessing which agent did what.',
    },
  ],
  workflows: [
    'Run Claude Code + a custom MCP scraper in the same Chrome tab without either dropping',
    'Use a planner agent and an executor agent simultaneously on the same authenticated session',
    'Attach Playwright tests alongside an AI agent without "browser already running" errors',
    'Run a monitoring agent and an action agent in the same browser 24/7',
    'Let multiple AI coding assistants share the same browser for E2E testing',
    'Connect any combination of MCP clients to one real, logged-in Chrome session',
  ],
  tools: ['Claude Desktop', 'Claude Code', 'Codex CLI', 'Cursor', 'Windsurf', 'Custom MCP servers', 'Playwright MCP', 'Chrome DevTools MCP', 'Any WebSocket client'],
  cliDemo: {
    title: 'multi-agent-setup',
    scripts: {
      Before: [
        { kind: 'output', text: '# Without VibeBrowser Co-Pilot', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: 'Agent A (Claude Code) attaches to CDP...    ✓ connected' },
        { kind: 'pause', ms: 500 },
        { kind: 'output', text: 'Agent B (custom scraper) attaches to CDP... ✓ connected' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '# Chrome silently drops Agent A', lineKind: 'info' },
        { kind: 'pause', ms: 300 },
        { kind: 'output', text: 'Agent A tries to navigate...', lineKind: 'info' },
        { kind: 'output', text: '✗ ProtocolError: Target closed' },
        { kind: 'output', text: '✗ Session invalidated — restart required' },
        { kind: 'pause', ms: 2000 },
      ] as Step[],
      After: [
        { kind: 'output', text: '# With VibeBrowser Co-Pilot installed', lineKind: 'info' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: 'VibeBrowser Co-Pilot holds chrome.debugger session...' },
        { kind: 'pause', ms: 300 },
        { kind: 'output', text: 'Agent A (Claude Code) connects to Co-Pilot...    ✓ ready' },
        { kind: 'output', text: 'Agent B (custom scraper) connects to Co-Pilot... ✓ ready' },
        { kind: 'output', text: 'Agent C (Codex CLI) connects to Co-Pilot...     ✓ ready' },
        { kind: 'pause', ms: 500 },
        { kind: 'output', text: 'Agent A navigates to github.com/issues...        ✓ 200 OK' },
        { kind: 'output', text: 'Agent B scrapes pricing table simultaneously...  ✓ done' },
        { kind: 'output', text: 'Agent C runs E2E test in parallel...             ✓ passed' },
        { kind: 'pause', ms: 400 },
        { kind: 'output', text: '✓ All 3 agents active · 0 conflicts · session stable', lineKind: 'info' },
        { kind: 'pause', ms: 2000 },
      ] as Step[],
    },
  },
  faqs: [
    {
      question: 'Why does Chrome drop the first agent when a second one connects?',
      answer:
        'Chrome\'s DevTools Protocol only allows one debugger attachment per tab at a time. When a second tool calls Target.attachToTarget (or any equivalent), Chrome silently revokes the first attachment — causing "Target closed" or "Session invalidated" errors in whatever was connected first.',
    },
    {
      question: 'How does VibeBrowser Co-Pilot fix this?',
      answer:
        'The extension claims the single chrome.debugger slot itself at startup. All MCP clients then connect to the extension\'s relay port rather than to Chrome directly. The extension proxies commands and events between all clients and Chrome — so every agent thinks it has its own connection, and none of them ever see a conflict.',
    },
    {
      question: 'Will this work with Claude Desktop + Claude Code running at the same time?',
      answer:
        'Yes. Both use MCP. Point both to the Co-Pilot relay endpoint. They\'ll share the same Chrome session without interfering with each other.',
    },
    {
      question: 'Does it work with Playwright MCP and Chrome DevTools MCP simultaneously?',
      answer:
        'Yes — as long as both connect via the extension relay. If Playwright MCP tries to launch its own Chrome instance, that\'s a separate process; to share one browser, configure Playwright MCP to connect to an existing Chrome via the extension.',
    },
    {
      question: 'Is this a cloud product or local?',
      answer:
        'Local-first. The extension runs inside your Chrome on your machine. There\'s no data leaving your browser unless you opt into the VibeBrowser Cloud relay for remote access.',
    },
    {
      question: 'Does the Chrome Web Store block sideloading?',
      answer:
        'No. Chrome supports loading unpacked extensions (Developer Mode) and .crx installs, which is how you install Co-Pilot while the Web Store review is in progress. Takes about 2 minutes.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
