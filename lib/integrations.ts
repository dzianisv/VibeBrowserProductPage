/**
 * Integration catalog for /integrations and /integrations/[slug].
 *
 * GROUND TRUTH: every config snippet below is copied from the vibe-mcp README
 * (https://github.com/VibeTechnologies/vibe-mcp#2-configure-your-ai-application).
 * Do NOT add a client here unless @vibebrowser/mcp actually documents support
 * for it — invented integrations break trust and rank for nothing.
 */

export type ConfigBlock = {
  /** Where the user pastes this (file path or UI location). */
  location: string
  language: 'json' | 'bash'
  code: string
}

export type Faq = {
  q: string
  a: string
}

export type Integration = {
  slug: string
  /** Product name exactly as the vendor writes it. */
  name: string
  /** Short label used in tables/cards. */
  vendor: string
  /** Featured clients get a dedicated landing page in the hub's top grid. */
  featured: boolean
  /** <title> — under 60 chars where possible. */
  title: string
  /** meta description — 150-160 chars. */
  description: string
  /** H1 — targets the real search intent. */
  h1: string
  /** One-sentence deck under the H1. */
  tagline: string
  /**
   * 40-60 word self-contained answer block. AI search engines extract this
   * verbatim, so it must make sense with zero surrounding context.
   */
  answerBlock: string
  /** The pain this integration removes. */
  problem: string[]
  /** What changes once Vibe MCP is wired in. */
  solution: string[]
  /** 3-step install. */
  steps: { title: string; body: string; config?: ConfigBlock }[]
  faqs: Faq[]
  keywords: string[]
}

export const RELAY_NOTE =
  'Your relay URL / extension UUID grants live control of your browser session. Treat it like a password: never commit it or paste it into a shared chat.'

const stdio = (location: string, code: string): ConfigBlock => ({
  location,
  language: 'json',
  code,
})

const CLAUDE_DESKTOP_JSON = `{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`

const CURSOR_JSON = `{
  "vibe": {
    "command": "npx",
    "args": ["-y", "@vibebrowser/mcp"]
  }
}`

const CODEX_JSON = `{
  "mcp": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`

const COPILOT_JSON = `{
  "github.copilot.chat.mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "@vibebrowser/mcp"]
    }
  }
}`

const WINDSURF_JSON = CLAUDE_DESKTOP_JSON

const OPENCODE_JSON = `{
  "mcp": {
    "servers": {
      "vibe": {
        "command": "npx",
        "args": ["-y", "@vibebrowser/mcp"]
      }
    }
  }
}`

const GEMINI_JSON = CLAUDE_DESKTOP_JSON

const extensionStep = {
  title: 'Install the Vibe extension in Chrome',
  body:
    'Add Vibe AI Browser from the Chrome Web Store (Chrome, Brave, Edge, or any Chromium browser). This is the piece that lets an agent drive the browser you are already logged into — no second browser profile, no re-authentication.',
}

const connectStep = {
  title: 'Connect the extension and run your first command',
  body:
    'Click the Vibe icon, open Settings, and enable "MCP External Control" until the status reads Connected. Then ask your agent to open a page and take a snapshot — it should return the content of your real tab.',
}

export const INTEGRATIONS: Integration[] = [
  {
    slug: 'claude-desktop',
    name: 'Claude Desktop',
    vendor: 'Anthropic',
    featured: true,
    title: 'Claude Desktop Browser Control — Vibe MCP',
    description:
      'Give Claude Desktop control of your real, logged-in Chrome in about two minutes. Copy-paste MCP config, no second browser, no re-login, works alongside other agents.',
    h1: 'Give Claude Desktop control of your browser',
    tagline:
      'Claude Desktop can read and act on the pages you are already logged into — Gmail, GitHub, Notion, your internal dashboards.',
    answerBlock:
      'Vibe MCP connects Claude Desktop to your real Chrome browser through the Model Context Protocol. Add one entry to claude_desktop_config.json, install the Vibe extension, and Claude can navigate, click, fill forms, read pages, and manage tabs in the browser where you are already signed in.',
    problem: [
      'Claude Desktop has no browser. It can reason about a page you paste in, but it cannot open one, click through a flow, or read what is behind a login.',
      'Headless automation tools spin up a clean browser with no cookies, so every task stalls at a login screen or a CAPTCHA.',
      'Copying page content back and forth by hand defeats the point of having an agent.',
    ],
    solution: [
      'Claude drives the Chrome profile you already use, with your sessions intact — no credentials are ever handed to the model.',
      'Page content comes back as compact structured text instead of hundreds of kilobytes of raw HTML, so Claude keeps context for the actual task.',
      'Other agents (Cursor, Codex CLI, Copilot) can stay connected to the same browser at the same time via the Vibe relay.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe to your Claude Desktop config',
        body:
          'Open your Claude Desktop config file and add the "vibe" MCP server, then restart Claude Desktop. macOS: ~/Library/Application Support/Claude/claude_desktop_config.json — Windows: %APPDATA%\\Claude\\claude_desktop_config.json.',
        config: stdio('claude_desktop_config.json', CLAUDE_DESKTOP_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Does Claude Desktop support MCP browser control?',
        a: 'Yes. Claude Desktop supports the Model Context Protocol, so any MCP server listed in claude_desktop_config.json becomes available as tools. Vibe MCP exposes browser tools — navigate, click, type, scroll, screenshot, page content, and tab management.',
      },
      {
        q: 'Do I need a separate browser for Claude to use?',
        a: 'No. That is the point of Vibe. Claude drives the Chrome you already have open, using your existing profile and logged-in sessions, instead of launching a clean headless browser with no cookies.',
      },
      {
        q: 'Does Claude get my passwords?',
        a: 'No. Vibe never transmits credentials. The extension acts inside the browser session you already authenticated, so the model sees pages and can act on them, but never receives your passwords.',
      },
      {
        q: 'Can Claude Desktop and Cursor use the browser at the same time?',
        a: 'Yes. Vibe MCP multiplexes multiple agents through a local relay daemon, so Claude Desktop, Cursor, VS Code Copilot, and CLI agents can all be connected to the same browser simultaneously without port conflicts.',
      },
      {
        q: 'Is it free?',
        a: 'The extension and the @vibebrowser/mcp server are free to install and run locally. Everything happens on your machine — automation does not round-trip through a cloud browser.',
      },
    ],
    keywords: [
      'claude desktop browser control',
      'claude desktop mcp browser',
      'claude desktop browser automation',
      'claude mcp chrome',
      'give claude access to my browser',
      'claude desktop mcp server',
    ],
  },
  {
    slug: 'claude-code',
    name: 'Claude Code',
    vendor: 'Anthropic',
    featured: true,
    title: 'Claude Code Browser Automation — Vibe MCP',
    description:
      'Let Claude Code open, click, and read your real logged-in Chrome from the terminal. One MCP config, works next to your other agents, no headless browser.',
    h1: 'Give Claude Code control of your browser',
    tagline:
      'Verify the feature you just shipped, reproduce a bug on a staging URL, or read a dashboard — from the same terminal session.',
    answerBlock:
      'Vibe MCP gives Claude Code browser tools through the Model Context Protocol. Register the @vibebrowser/mcp server once and Claude Code can navigate to a URL, click elements, fill forms, screenshot, and read page content in your real Chrome — including pages behind a login.',
    problem: [
      'Claude Code can write and run code but cannot see the running app in a browser, so "it builds" is as far as verification goes.',
      'Wiring Playwright or CDP into every project is plumbing you rewrite each time, and the resulting browser has none of your logins.',
      'Screenshotting by hand and pasting images back into the terminal is slow and lossy.',
    ],
    solution: [
      'Claude Code opens your real Chrome, hits the page, and reads it back — closing the write-run-verify loop without extra tooling.',
      'Authenticated staging environments, admin panels, and internal tools just work because the session is already yours.',
      'Same MCP server as every other client, so behavior is identical across your agents.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Register the MCP server with Claude Code',
        body:
          'Claude Code reads MCP servers from its own config. Add the "vibe" server the same way you add any stdio MCP server, then start a new session so the tools are picked up.',
        config: {
          location: 'terminal',
          language: 'bash',
          code: 'claude mcp add vibe -- npx -y @vibebrowser/mcp',
        },
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'How do I give Claude Code browser access?',
        a: 'Install the Vibe Chrome extension, then register the Vibe MCP server with Claude Code using: claude mcp add vibe -- npx -y @vibebrowser/mcp. Start a new session and Claude Code will have navigate, click, type, screenshot, and page-content tools.',
      },
      {
        q: 'Is this better than Playwright MCP for Claude Code?',
        a: 'For anything behind a login, yes. Playwright launches a fresh browser with no cookies, so authenticated flows fail. Vibe uses your existing Chrome profile and sessions, and unlike Playwright MCP it does not break when a second agent connects.',
      },
      {
        q: 'Can Claude Code use the browser while Claude Desktop is connected?',
        a: 'Yes. Vibe multiplexes agents through a relay daemon, so several MCP clients can control the same browser at once.',
      },
      {
        q: 'Does it work on Windows and Linux?',
        a: 'Yes. The MCP server runs anywhere Node.js runs, and the extension works in Chrome, Brave, Edge, and other Chromium browsers on macOS, Windows, and Linux.',
      },
    ],
    keywords: [
      'claude code browser automation',
      'claude code mcp browser',
      'claude code chrome control',
      'claude code playwright alternative',
      'claude mcp add browser',
    ],
  },
  {
    slug: 'openai-codex-cli',
    name: 'OpenAI Codex CLI',
    vendor: 'OpenAI',
    featured: true,
    title: 'OpenAI Codex CLI Browser Control — Vibe MCP',
    description:
      'Connect OpenAI Codex CLI to your real Chrome over MCP. Codex can open pages, click, fill forms, and read authenticated sites — no headless browser, no re-login.',
    h1: 'Give OpenAI Codex CLI control of your browser',
    tagline:
      'Codex gets eyes on the running app: real pages, real sessions, real verification.',
    answerBlock:
      'Vibe MCP adds browser tools to OpenAI Codex CLI over the Model Context Protocol. Add the @vibebrowser/mcp server to your Codex configuration and Codex can navigate, click, type, scroll, screenshot, and extract content from your real Chrome, including pages that require a login.',
    problem: [
      'Codex CLI edits code and runs commands, but has no way to look at the app it just changed.',
      'A throwaway headless browser cannot reach your staging dashboard, your admin panel, or anything gated behind SSO.',
      'Building a bespoke browser harness per repo is wasted effort.',
    ],
    solution: [
      'One MCP entry and Codex can drive the Chrome you already use, with your logins intact.',
      'Structured page snapshots keep Codex context small and its actions targeted.',
      'Runs locally — the automation never leaves your machine.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe to your Codex configuration',
        body:
          'Add the "vibe" MCP server to your Codex CLI configuration and restart Codex so it picks up the new tools.',
        config: stdio('Codex CLI configuration', CODEX_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Does OpenAI Codex CLI support MCP servers?',
        a: 'Yes. Codex CLI can load MCP servers from its configuration, which is how Vibe adds browser tools. Add the "vibe" entry with command npx and args ["-y", "@vibebrowser/mcp"], then restart Codex.',
      },
      {
        q: 'Can Codex CLI control my real Chrome?',
        a: 'Yes. With the Vibe extension installed and MCP External Control enabled, Codex drives your existing Chrome profile — same tabs, same cookies, same logged-in sessions.',
      },
      {
        q: 'Can I run Codex CLI and Claude Code on the browser together?',
        a: 'Yes. Vibe is built for multi-agent use: a shared relay daemon multiplexes connections so multiple agents can control one browser without conflicts.',
      },
      {
        q: 'Does my browsing data go to a server?',
        a: 'No. The MCP server and relay run locally on your machine. Page content goes only to the agent you connected.',
      },
    ],
    keywords: [
      'openai codex cli browser',
      'codex cli mcp browser',
      'codex browser automation',
      'codex cli chrome control',
      'codex mcp server browser',
    ],
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    featured: true,
    title: 'Cursor Browser Control — Vibe MCP for Cursor',
    description:
      'Give Cursor control of your real logged-in Chrome via MCP. Cursor can open your app, click through flows, and read pages behind auth — without a headless browser.',
    h1: 'Give Cursor control of your browser',
    tagline:
      'Cursor writes the change, opens your app, and checks it — in your real browser, with your real session.',
    answerBlock:
      'Vibe MCP gives Cursor browser tools through the Model Context Protocol. Add the "vibe" server in Cursor Settings or ~/.cursor/mcp.json, install the Vibe Chrome extension, and Cursor can navigate, click, fill forms, screenshot, and read page content in the browser you are already signed into.',
    problem: [
      'Cursor can change your code but cannot see the result in a browser, so you become the manual QA step.',
      'Headless browsers have no session, so any authenticated page is out of reach.',
      'Other browser MCP servers break as soon as a second agent connects.',
    ],
    solution: [
      'Cursor drives your real Chrome — localhost, staging, or a production dashboard you are logged into.',
      'Snapshots come back as compact structured content, not megabytes of HTML.',
      'Multi-agent by design: keep Cursor and your CLI agents connected at once.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add the Vibe MCP server in Cursor',
        body:
          'Open Cursor Settings (Cmd/Ctrl + ,), go to Features → MCP Servers, click Add Server, and paste the config below. You can also edit ~/.cursor/mcp.json directly.',
        config: stdio('~/.cursor/mcp.json', CURSOR_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'How do I add a browser MCP server to Cursor?',
        a: 'In Cursor, open Settings → Features → MCP Servers → Add Server and add an entry named "vibe" with command npx and args ["-y", "@vibebrowser/mcp"]. Or edit ~/.cursor/mcp.json directly and reload Cursor.',
      },
      {
        q: 'Can Cursor use my logged-in browser sessions?',
        a: 'Yes. Vibe works through a Chrome extension in your existing profile, so Cursor acts inside sessions you have already authenticated instead of a clean automation browser.',
      },
      {
        q: 'How is this different from Playwright MCP in Cursor?',
        a: 'Playwright MCP launches an isolated browser with no cookies and fails on authenticated flows and multi-agent setups. Vibe uses your real Chrome and supports multiple agents on the same browser at once.',
      },
      {
        q: 'Does Cursor need to be restarted?',
        a: 'Reload or restart Cursor after editing the MCP config so the new tools are registered.',
      },
    ],
    keywords: [
      'cursor browser mcp',
      'cursor browser automation',
      'cursor mcp chrome',
      'cursor control browser',
      'cursor playwright mcp alternative',
    ],
  },
  {
    slug: 'vs-code-github-copilot',
    name: 'VS Code (GitHub Copilot)',
    vendor: 'Microsoft / GitHub',
    featured: false,
    title: 'GitHub Copilot Browser Control in VS Code — Vibe MCP',
    description:
      'Add browser tools to GitHub Copilot Chat in VS Code with Vibe MCP. Copilot can open, click, and read your real logged-in Chrome from the editor.',
    h1: 'Give GitHub Copilot in VS Code control of your browser',
    tagline: 'Copilot Chat stops guessing what the page looks like and just opens it.',
    answerBlock:
      'Vibe MCP adds browser tools to GitHub Copilot Chat in VS Code. Add the "vibe" server under github.copilot.chat.mcpServers in settings.json, install the Vibe Chrome extension, and Copilot can navigate, click, type, screenshot, and read pages in your real Chrome session.',
    problem: [
      'Copilot Chat is confined to your editor and has no view of the running application.',
      'Anything behind a login is invisible to standard automation tooling.',
    ],
    solution: [
      'Copilot gets first-class browser tools that operate on your existing Chrome profile.',
      'Works alongside other MCP clients connected to the same browser.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe to VS Code settings.json',
        body:
          'Open your VS Code settings.json and register the Vibe MCP server under Copilot Chat MCP servers, then reload the window.',
        config: stdio('VS Code settings.json', COPILOT_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Can GitHub Copilot control a browser?',
        a: 'Yes, through MCP. Adding the Vibe MCP server to github.copilot.chat.mcpServers in VS Code settings.json gives Copilot Chat browser tools that operate on your real Chrome.',
      },
      {
        q: 'Does it use my normal Chrome profile?',
        a: 'Yes. The Vibe extension runs in your existing browser, so Copilot acts inside sessions you are already logged into.',
      },
    ],
    keywords: [
      'github copilot browser control',
      'vs code copilot mcp browser',
      'copilot chat browser automation',
    ],
  },
  {
    slug: 'windsurf',
    name: 'Windsurf',
    vendor: 'Codeium',
    featured: false,
    title: 'Windsurf Browser Control — Vibe MCP',
    description:
      'Connect Windsurf to your real Chrome over MCP. One entry in mcp_config.json and Windsurf can navigate, click, and read authenticated pages.',
    h1: 'Give Windsurf control of your browser',
    tagline: 'Windsurf gets real browser tools in one config edit.',
    answerBlock:
      'Vibe MCP connects Windsurf to your real Chrome browser. Add the "vibe" server to ~/.codeium/windsurf/mcp_config.json, install the Vibe extension, and Windsurf can navigate, click, fill forms, screenshot, and extract content from pages you are already logged into.',
    problem: [
      'Windsurf can edit code but cannot open and inspect the running app.',
      'Clean automation browsers cannot reach authenticated environments.',
    ],
    solution: [
      'Windsurf drives your existing Chrome profile with sessions intact.',
      'Multi-agent safe — other MCP clients can stay connected.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe to Windsurf MCP config',
        body: 'Edit ~/.codeium/windsurf/mcp_config.json, add the "vibe" server, and restart Windsurf.',
        config: stdio('~/.codeium/windsurf/mcp_config.json', WINDSURF_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Where is the Windsurf MCP config file?',
        a: 'Windsurf reads MCP servers from ~/.codeium/windsurf/mcp_config.json. Add a "vibe" entry with command npx and args ["-y", "@vibebrowser/mcp"], then restart Windsurf.',
      },
      {
        q: 'Does Windsurf need its own browser?',
        a: 'No. Vibe uses the Chrome you already run, including your logged-in sessions.',
      },
    ],
    keywords: ['windsurf browser mcp', 'windsurf browser automation', 'windsurf mcp chrome'],
  },
  {
    slug: 'gemini-cli',
    name: 'Gemini CLI',
    vendor: 'Google',
    featured: false,
    title: 'Gemini CLI Browser Control — Vibe MCP',
    description:
      'Give Gemini CLI control of your real Chrome via MCP. Add one server to ~/.gemini/settings.json and Gemini can browse authenticated pages for you.',
    h1: 'Give Gemini CLI control of your browser',
    tagline: 'Gemini reads and acts on the pages you are already signed into.',
    answerBlock:
      'Vibe MCP gives Gemini CLI browser tools through the Model Context Protocol. Add the "vibe" server to ~/.gemini/settings.json, install the Vibe Chrome extension, and Gemini can navigate, click, type, screenshot, and read content from your real Chrome session.',
    problem: [
      'Gemini CLI has no persistent browser and cannot reach logged-in pages.',
      'Fetching a URL is not the same as operating an app.',
    ],
    solution: [
      'Gemini drives your real Chrome, with your sessions.',
      'Same tool surface as every other Vibe MCP client.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe to ~/.gemini/settings.json',
        body: 'Add the "vibe" MCP server to your Gemini CLI settings file and restart the CLI.',
        config: stdio('~/.gemini/settings.json', GEMINI_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Does Gemini CLI support MCP?',
        a: 'Yes. Gemini CLI loads MCP servers from ~/.gemini/settings.json. Adding the Vibe server there gives Gemini browser tools backed by your real Chrome.',
      },
      {
        q: 'Can Gemini read pages behind a login?',
        a: 'Yes, because it acts inside your existing browser session rather than a fresh automation profile.',
      },
    ],
    keywords: ['gemini cli browser mcp', 'gemini cli browser automation', 'gemini mcp chrome'],
  },
  {
    slug: 'opencode',
    name: 'OpenCode',
    vendor: 'OpenCode',
    featured: false,
    title: 'OpenCode Browser Control — Vibe MCP',
    description:
      'Connect OpenCode to your real Chrome over MCP. One entry in .opencode/config.json gives your agent navigate, click, and page-read tools.',
    h1: 'Give OpenCode control of your browser',
    tagline: 'Your terminal agent gets a real browser, not a headless stub.',
    answerBlock:
      'Vibe MCP connects OpenCode to your real Chrome browser. Add the "vibe" server under mcp.servers in .opencode/config.json, install the Vibe extension, and OpenCode can navigate, click, fill forms, screenshot, and read content from pages you are already logged into.',
    problem: [
      'OpenCode can run code but cannot verify the result in a browser.',
      'Authenticated environments are unreachable from a clean automation browser.',
    ],
    solution: [
      'OpenCode drives your existing Chrome with your sessions intact.',
      'Shares the browser with other connected agents.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe to .opencode/config.json',
        body: 'Register the "vibe" MCP server in your OpenCode config and restart OpenCode.',
        config: stdio('.opencode/config.json', OPENCODE_JSON),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'How do I add an MCP server to OpenCode?',
        a: 'Add it under mcp.servers in .opencode/config.json. For Vibe, use command npx with args ["-y", "@vibebrowser/mcp"], then restart OpenCode.',
      },
      {
        q: 'Does OpenCode share the browser with other agents?',
        a: 'Yes. Vibe multiplexes MCP clients through a relay daemon so several agents can drive one browser simultaneously.',
      },
    ],
    keywords: ['opencode browser mcp', 'opencode browser automation', 'opencode mcp chrome'],
  },
]

export const FEATURED_INTEGRATIONS = INTEGRATIONS.filter((i) => i.featured)

export function getIntegration(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug)
}

/** Shared tool surface — from the vibe-mcp README "Available Tools" table. */
export const MCP_TOOLS: { tool: string; description: string }[] = [
  { tool: 'navigate_to_url', description: 'Navigate to any URL' },
  { tool: 'go_back / go_forward', description: 'Browser history navigation' },
  { tool: 'click', description: 'Click elements on the page' },
  { tool: 'type / fill', description: 'Enter text into inputs' },
  { tool: 'scroll', description: 'Scroll the page' },
  { tool: 'take_screenshot', description: 'Capture screenshots' },
  { tool: 'get_page_content', description: 'Extract page text or HTML' },
  {
    tool: 'get_tabs / create_new_tab / switch_to_tab / close_tab',
    description: 'Tab management',
  },
  { tool: 'keyboard_shortcut', description: 'Press keyboard combinations' },
  { tool: 'web_search', description: 'Search the web' },
]

/** Comparison table — from the vibe-mcp README "Why Vibe MCP?" table. */
export const COMPARISON: {
  feature: string
  vibe: string
  playwright: string
  browsermcp: string
}[] = [
  { feature: 'Multi-agent support', vibe: 'Yes', playwright: 'No', browsermcp: 'No' },
  { feature: 'Uses your browser profile', vibe: 'Yes', playwright: 'No', browsermcp: 'No' },
  { feature: 'Logged-in sessions', vibe: 'Yes', playwright: 'No', browsermcp: 'No' },
  { feature: 'No separate browser', vibe: 'Yes', playwright: 'No', browsermcp: 'No' },
  { feature: 'Local & private', vibe: 'Yes', playwright: 'Yes', browsermcp: 'Partial' },
  { feature: 'Content-script based', vibe: 'Yes', playwright: 'No', browsermcp: 'No' },
]
