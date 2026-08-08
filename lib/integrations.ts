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
  language: 'json' | 'bash' | 'toml' | 'url'
  code: string
}

export type Faq = {
  q: string
  a: string
}

/**
 * Prominent credential warning. The connector URL embeds the routing UUID, and
 * that UUID is a bearer capability over the user's logged-in browser — so this
 * renders ABOVE the fold-adjacent install steps, never buried in the FAQ.
 */
export type SecurityCallout = {
  heading: string
  body: string
  bullets: string[]
}

/**
 * A self-service smoke test the reader can run to prove the connector actually
 * reached their browser. Must have a deterministic, checkable answer.
 */
export type VerifyCheck = {
  prompt: string
  expect: string
  note: string
}

export type Troubleshoot = {
  symptom: string
  cause: string
  fix: string
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
  /** Credential warning rendered as a callout directly under the steps. */
  security?: SecurityCallout
  /** What the client's UI shows once the connector is saved and working. */
  connectedLooksLike?: string[]
  /** Self-service smoke test with a deterministic expected answer. */
  verify?: VerifyCheck
  /** Symptom → cause → fix table. */
  troubleshooting?: Troubleshoot[]
  /** Human-readable date this click path was last walked end to end. */
  verifiedOn?: string
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

const toml = (location: string, code: string): ConfigBlock => ({
  location,
  language: 'toml',
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

/**
 * Codex stores MCP servers in TOML, NOT JSON.
 * Source: https://developers.openai.com/codex/extend/mcp — "Codex stores MCP
 * configuration in config.toml ... Configure each MCP server with a
 * [mcp_servers.<server-name>] table in the configuration file."
 * Shared by the ChatGPT desktop app, Codex CLI, and the Codex IDE extension.
 */
const CODEX_TOML = `[mcp_servers.vibe]
command = "npx"
args = ["-y", "@vibebrowser/mcp"]`

const CODEX_ADD_CMD = `codex mcp add vibe -- npx -y @vibebrowser/mcp`

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

/**
 * REMOTE-CONNECTOR PATH (relay, no local install).
 *
 * Everything above this line is the STDIO path: the client runs
 * `npx @vibebrowser/mcp` on the user's machine. Hosted clients (Claude on the
 * web / Cowork / mobile, ChatGPT connectors) cannot spawn a local process, so
 * they connect to the public relay over HTTPS instead — the Chrome extension
 * is the only thing installed locally.
 *
 * The relay accepts the extension UUID as a path segment
 * (`/mcp/<uuid>`) precisely because those UIs take a bare URL and cannot send
 * a custom header — see VibeTechnologies/platform#63. Do not "simplify" these
 * pages back to a header-based snippet: it does not work in either product.
 */
const RELAY_MCP_URL = 'https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>'

const remoteUrlStep = {
  title: 'Copy your agent connection URL from the extension',
  body:
    'Click the Vibe icon → Settings → turn on "Enable external AI agent control" → choose Remote (internet) → copy the Agent connection URL. The last path segment is your routing UUID. The connector URL is https://relay.api.vibebrowser.app/mcp/ followed by that UUID. Leave the extension running and remote control on — the connector talks to this browser, so if it is closed there is nothing on the other end.',
  config: {
    location: 'Vibe extension → Settings → Agent connection URL',
    language: 'url' as const,
    code: RELAY_MCP_URL,
  },
}

/**
 * The connector URL is a bearer capability: possession alone grants live
 * control of the user's logged-in browser. There is no second factor, no
 * per-request signature, and no origin check — the relay routes on the UUID.
 * This is why the warning is a first-class page section, not an FAQ row.
 */
const CONNECTOR_SECURITY: SecurityCallout = {
  heading: 'Your connector URL is a password. Treat it like one.',
  body:
    'That URL is a bearer capability for your real, logged-in browser. There is no second factor: anyone who holds it can open your tabs, read the pages you are signed into, and act as you. Nothing else is needed to use it.',
  bullets: [
    'Never paste it into a shared chat, a ticket, a README, a screenshot, or a support thread. Redact the UUID before sharing anything.',
    'Never commit it to a repo or write it into a config file that gets committed. Keep it out of shell history and CI logs.',
    'If it leaks — or you are unsure — open the Vibe extension settings and regenerate the connection URL. The old UUID stops routing immediately, and you re-paste the new URL into the connector.',
    'Turn "Enable external AI agent control" off when you are not using it. With it off, the URL routes nowhere.',
  ],
}

/** Deterministic smoke test: the answer is a fact the agent must fetch. */
const CONNECTOR_VERIFY: VerifyCheck = {
  prompt: 'Go to duckduckgo.com and find out when the first GPT model was released.',
  expect: '2018',
  note:
    'Pick this over "open google.com" because a wrong answer is unmistakable: the assistant cannot satisfy it from memory-free small talk, and you can watch the tab actually navigate. If the answer comes back as 2018 and you saw your browser move, the connector is wired end to end. If the assistant answers 2018 without your browser doing anything, it answered from its own knowledge — ask it again and require it to cite the page it opened.',
}

/** Shared FAQ entries for the two hosted-connector pages. */
const REMOTE_CONNECTOR_FAQS: Faq[] = [
  {
    q: 'Do I still need to install anything?',
    a: 'Only the Vibe Chrome extension. On the remote-connector path there is no npx command and no local MCP server — the hosted assistant talks to the Vibe relay over HTTPS, and the relay forwards to your extension.',
  },
  {
    q: 'Do I need domain verification, an allowlist, or OAuth?',
    a: 'No. Neither Claude nor ChatGPT requires domain verification, an allowlist entry, or an OAuth flow for this connector. You paste a URL and save. The routing UUID inside the URL is the only credential involved.',
  },
  {
    q: 'Is the UUID in the URL a secret?',
    a: 'Yes. That UUID is the credential that routes an agent to your browser — anyone who has it can drive your logged-in session. Treat the connector URL like a password: never post it in a shared chat, screenshot, README, or issue. If it leaks, regenerate it in the Vibe extension settings and paste the new URL into the connector.',
  },
  {
    q: 'What is the difference between this and the local MCP server?',
    a: 'The local path (npx @vibebrowser/mcp) runs on your machine and suits desktop clients that can spawn a process — Claude Desktop, Cursor, VS Code, Codex CLI. The remote path suits hosted assistants that only accept a URL. Both end up driving the same Chrome tab through the same extension.',
  },
  {
    q: 'Does my page content go through your servers on this path?',
    a: 'Yes — unlike the local STDIO path, tool calls and their results traverse the Vibe relay, because the assistant is running in the vendor cloud and cannot reach your machine directly. If you need page content to never leave your machine, use the local MCP server with a desktop client instead.',
  },
]

/** Symptom → cause → fix rows shared by both connector pages. */
const CONNECTOR_TROUBLESHOOTING: Troubleshoot[] = [
  {
    symptom: 'The client rejects the URL with a 401, or tool calls fail with 401 Unauthorized.',
    cause: 'The routing UUID in the URL is wrong, mistyped, or no longer valid — usually because it was regenerated in the extension after you pasted it.',
    fix: 'Re-copy the Agent connection URL from the Vibe extension settings and re-paste the whole URL. Check you kept the /mcp/ path segment and did not drop or duplicate a character at either end.',
  },
  {
    symptom: 'The connector saved fine and tools are listed, but every tool call errors or hangs.',
    cause: 'Nothing is on the other end of the relay: the browser with the Vibe extension is closed, or external agent control is switched off, or the mode is set to Local instead of Remote (internet).',
    fix: 'Open the browser that has the Vibe extension, click the Vibe icon → Settings, confirm "Enable external AI agent control" is on and the mode is Remote (internet). Then retry the prompt.',
  },
  {
    symptom: 'No tools show up at all after saving the connector.',
    cause: 'The URL points at the plain relay root rather than your routing path, so there is no session to enumerate tools for.',
    fix: 'The URL must be https://relay.api.vibebrowser.app/mcp/<your-routing-uuid> — with the UUID as the last path segment. Remove the connector, re-add it with the full URL, and reload the page.',
  },
  {
    symptom: 'The assistant answers the question but your browser never moved.',
    cause: 'It answered from its own knowledge instead of calling a tool. This is a prompt problem, not a connection problem.',
    fix: 'Re-ask and require evidence: "Use your browser tools to open duckduckgo.com, then tell me which page you read." If it still refuses, check the connector is toggled on for that specific conversation.',
  },
]

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
        title: 'Add Vibe to ~/.codex/config.toml',
        body:
          'Codex keeps MCP servers in TOML, not JSON. Append the block below to ~/.codex/config.toml (or a project-scoped .codex/config.toml), then restart Codex. Prefer one command? Run codex mcp add vibe -- npx -y @vibebrowser/mcp and Codex writes the same entry for you. Verify with codex mcp list, or type /mcp inside the TUI.',
        config: toml('~/.codex/config.toml', CODEX_TOML),
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Does OpenAI Codex CLI support MCP servers?',
        a: 'Yes. Codex loads MCP servers from ~/.codex/config.toml, which is how Vibe adds browser tools. Add a [mcp_servers.vibe] table with command = "npx" and args = ["-y", "@vibebrowser/mcp"], then restart Codex. The config is TOML, not JSON.',
      },
      {
        q: 'Where is the Codex MCP config file?',
        a: 'Codex reads ~/.codex/config.toml by default. You can also scope servers to a single trusted project with .codex/config.toml in the repo root. The ChatGPT desktop app, Codex CLI, and the Codex IDE extension all share this same file.',
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
    slug: 'chatgpt-desktop',
    name: 'ChatGPT desktop app',
    vendor: 'OpenAI',
    featured: true,
    title: 'ChatGPT Desktop App Browser Control — Vibe MCP',
    description:
      'Add an MCP server to the ChatGPT desktop app and let ChatGPT drive your real Chrome — click, type, and read pages you are already logged into. No headless browser.',
    h1: 'Give the ChatGPT desktop app control of your browser',
    tagline:
      'Settings → MCP servers → Add server. ChatGPT works in the Chrome you are already signed into.',
    answerBlock:
      'The ChatGPT desktop app supports MCP servers. Add @vibebrowser/mcp as a STDIO server under Settings → MCP servers, and ChatGPT can navigate, click, type, scroll, screenshot, and extract content from your real Chrome — including pages behind a login. The desktop app, Codex CLI, and Codex IDE extension share one config at ~/.codex/config.toml.',
    problem: [
      'ChatGPT on the web cannot touch your browser: it cannot open your dashboard, read a page behind SSO, or finish a task on a site you are logged into.',
      'The built-in browsing tool fetches public pages as an anonymous visitor, so anything gated behind your account is invisible to it.',
      'Copy-pasting page content into the chat by hand defeats the point of an assistant.',
    ],
    solution: [
      'One STDIO entry in Settings → MCP servers and ChatGPT drives the Chrome you already use, with your sessions intact.',
      'Structured page snapshots keep the context small so ChatGPT acts on the right element instead of guessing.',
      'Everything runs locally on your machine — the MCP server and relay never ship your pages to us.',
      'Configure once and the same server is available in Codex CLI and the Codex IDE extension, because they share ~/.codex/config.toml.',
    ],
    steps: [
      extensionStep,
      {
        title: 'Add Vibe under Settings → MCP servers',
        body:
          'In the ChatGPT desktop app open Settings, select MCP servers, then Add server. Name it "vibe", choose the STDIO transport, and set the command to npx -y @vibebrowser/mcp. Save, then select Restart. Prefer the terminal? Run the command below — the desktop app reads the same ~/.codex/config.toml file.',
        config: {
          location: 'Terminal (writes ~/.codex/config.toml, shared with the desktop app)',
          language: 'bash',
          code: CODEX_ADD_CMD,
        },
      },
      connectStep,
    ],
    faqs: [
      {
        q: 'Does the ChatGPT desktop app support MCP servers?',
        a: 'Yes. OpenAI documents that the ChatGPT desktop app, Codex CLI, and the Codex IDE extension all support MCP servers and share the same configuration. Add one under Settings → MCP servers → Add server, choosing STDIO or Streamable HTTP.',
      },
      {
        q: 'How do I add an MCP server to the ChatGPT desktop app?',
        a: 'Open Settings, select MCP servers, then Add server. Enter a name, choose STDIO, and provide the command — for Vibe that is npx with args -y @vibebrowser/mcp. Save the server and select Restart. Type /mcp in the composer to confirm it connected.',
      },
      {
        q: 'Can ChatGPT control my real Chrome, with my logins?',
        a: 'Yes. With the Vibe extension installed and MCP External Control enabled, ChatGPT drives your existing Chrome profile — same tabs, same cookies, same authenticated sessions. There is no second browser and no re-login.',
      },
      {
        q: 'Does this work in ChatGPT on the web?',
        a: 'No. OpenAI states that ChatGPT web does not read local Codex configuration files. Vibe is a local MCP server, so it works in the desktop app, Codex CLI, and the IDE extension — the surfaces that run on your machine.',
      },
      {
        q: 'Where does the ChatGPT desktop app store MCP configuration?',
        a: 'In ~/.codex/config.toml, as a [mcp_servers.vibe] TOML table. You can also scope a server to one trusted project with .codex/config.toml. Adding it through the Settings UI writes to the same file.',
      },
      {
        q: 'Does my browsing data go to a server?',
        a: 'No. The MCP server and relay run locally on your machine. Page content goes only to the agent you connected.',
      },
    ],
    keywords: [
      'chatgpt desktop app mcp',
      'chatgpt desktop mcp server',
      'chatgpt control browser',
      'chatgpt desktop browser automation',
      'add mcp server to chatgpt',
      'chatgpt chrome control mcp',
    ],
  },
  {
    slug: 'claude-connector',
    name: 'Claude (web, Cowork & mobile)',
    vendor: 'Anthropic',
    featured: true,
    title: 'Claude Custom Connector for Browser Control — Vibe',
    description:
      'Add Vibe as a custom connector in Claude and let Claude on the web, in Cowork, and on mobile drive your real Chrome — logged-in pages included. One URL, no local install.',
    h1: 'Give Claude on the web control of your browser',
    tagline:
      'Settings → Connectors → Add → Add custom connector. One URL, 27 browser tools — works in claude.ai chats, Cowork sessions, and the mobile apps.',
    answerBlock:
      'Claude supports custom connectors backed by a remote MCP server. Open Settings → Connectors → Add → Add custom connector, paste your Vibe relay URL, and Claude can navigate, click, type, scroll, screenshot, and read your real Chrome — including pages behind a login. No domain verification, no allowlist, no OAuth. Because the connector is brokered by your Claude account, it works in Cowork and on mobile, not just Claude Desktop.',
    problem: [
      'Claude Desktop can run a local MCP server; Claude on the web, in a Cowork session, or on your phone cannot — it has no way to spawn a process on your machine.',
      'So the moment you leave the desktop app, Claude loses access to your browser and to everything behind your logins.',
      'Web search is not a substitute: it sees the anonymous public internet, not your dashboards, your inbox, or your admin panels.',
    ],
    solution: [
      'A custom connector is just a URL, so it works from every Claude surface at once — web, Cowork, desktop, mobile.',
      'The Vibe relay bridges that URL to the Chrome extension on your machine, so Claude acts in the browser you are already signed into.',
      'Nothing to install beyond the extension: no npx, no local server, no second browser profile.',
      'Toggle it per conversation, so a chat only reaches your browser when you want it to.',
    ],
    steps: [
      extensionStep,
      remoteUrlStep,
      {
        title: 'Add it under Settings → Connectors → Add → Add custom connector',
        body:
          'In Claude on the web, open Settings → Connectors. Click Add, then Add custom connector. Give it a name (for example "Vibe Browser"), paste the URL from the previous step into the URL field, and click Add. Claude connects and discovers the tool list — 27 browser tools at the time of writing. There is no domain verification, no allowlist, and no OAuth step: the URL is the whole configuration. Custom connectors are a paid-plan feature; check your plan if the option is missing.',
      },
    ],
    security: CONNECTOR_SECURITY,
    connectedLooksLike: [
      'The connector appears in the Settings → Connectors list with its name and a tool count — 27 tools on the current extension build.',
      'Right after you add it, Claude shows "You are not connected to Vibe Browser yet". This is expected and does not mean the setup failed. Claude only marks a connector as connected once a chat has actually invoked one of its tools — send a prompt first, then re-check.',
      'In a chat, the + button → Connectors lists Vibe with a toggle. Turn it on for that conversation.',
      'On the first real request you will see Claude call tools such as New page and Take snapshot, and your own browser will visibly navigate.',
    ],
    verify: CONNECTOR_VERIFY,
    troubleshooting: CONNECTOR_TROUBLESHOOTING,
    verifiedOn: 'August 2026',
    faqs: [
      {
        q: 'Can Claude control my browser from claude.ai, not just Claude Desktop?',
        a: 'Yes, via a custom connector. Claude Desktop can launch a local MCP server, but claude.ai, Cowork, and mobile cannot — they need a remote MCP server reachable over the public internet. The Vibe relay is exactly that, so one connector URL covers every Claude surface.',
      },
      {
        q: 'How do I add a custom connector in Claude?',
        a: 'Open Settings → Connectors, click Add, then Add custom connector. Give it a name, paste the remote MCP server URL, and click Add. Then in a chat use the + button → Connectors and toggle it on for that conversation.',
      },
      {
        q: 'Claude says "You are not connected to Vibe Browser yet" — did it fail?',
        a: 'No. Claude reports a custom connector as not connected until the first time a conversation actually calls one of its tools. Send a prompt that requires the browser — for example asking it to open a page — and the status resolves. If tool calls then fail, see the troubleshooting table.',
      },
      {
        q: 'Do I need to verify a domain or get allowlisted?',
        a: 'No. Adding a custom connector in Claude needs nothing but the URL — no domain verification, no allowlist request, and no OAuth configuration.',
      },
      {
        q: 'Does this work in a Cowork session?',
        a: 'Yes. A custom connector is brokered through your Claude account rather than tied to one machine, so a Cowork session reaches it the same way a Desktop chat does. A local Desktop Extension would not — that is scoped to the desktop app on that one computer.',
      },
      {
        q: 'Why does the URL end in my routing UUID?',
        a: 'The connector UI accepts a bare URL and cannot attach a custom request header, so the relay reads the routing UUID from the URL path instead. It is the same credential that CLI clients pass in the X-Remote-Session header.',
      },
      ...REMOTE_CONNECTOR_FAQS,
    ],
    keywords: [
      'claude custom connector',
      'claude browser control',
      'claude remote mcp server',
      'claude cowork connector',
      'claude.ai control chrome',
      'add custom connector claude',
    ],
  },
  {
    slug: 'chatgpt-connector',
    name: 'ChatGPT connectors',
    vendor: 'OpenAI',
    featured: false,
    title: 'ChatGPT Connector for Browser Control — Vibe',
    description:
      'Add Vibe as a ChatGPT connector and let ChatGPT drive your real Chrome from the web app — logged-in pages included. One remote MCP URL, no local install.',
    h1: 'Give ChatGPT on the web control of your browser',
    tagline:
      'Settings → Security and login → Developer mode → Plugins → Create app. A remote MCP URL, so it works where a local server cannot.',
    answerBlock:
      'ChatGPT supports custom apps backed by a remote MCP server. Turn on Developer mode under Settings → Security and login, then go to Plugins → Create app and paste your Vibe relay URL. ChatGPT can then navigate, click, type, scroll, screenshot, and read your real Chrome, including pages behind a login — from the web app, with no local MCP server running and no domain verification or OAuth setup.',
    problem: [
      'The ChatGPT desktop app can run a local MCP server; ChatGPT on the web cannot read local config or spawn a process, so it has no route to your browser.',
      'The built-in browsing tool fetches public pages as an anonymous visitor — anything behind your account is invisible to it.',
      'That leaves the most useful half of the web (your dashboards, tickets, admin panels) permanently out of reach.',
    ],
    solution: [
      'A connector is a URL, so ChatGPT on the web can reach your browser without anything running locally besides the extension.',
      'The Vibe relay forwards to the Chrome you are already signed into — same tabs, same cookies, same sessions.',
      'Enable it per conversation, so a chat only touches your browser when you say so.',
    ],
    steps: [
      extensionStep,
      remoteUrlStep,
      {
        title: 'Turn on Developer mode under Settings → Security and login',
        body:
          'In ChatGPT on the web, open Settings → Security and login and switch Developer mode ON. This is the step people miss: the create-an-app surface does not appear anywhere until Developer mode is enabled, and it lives under Security and login rather than under Connectors.',
      },
      {
        title: 'Plugins → Create app, then paste the URL',
        body:
          'Still in Settings, go to Plugins and click Create app. Give it a name, paste the connector URL from step 2 into the MCP server URL field, and create it. ChatGPT connects and discovers the actions. There is no domain verification, no allowlist, and no OAuth step. Then enable the app for a conversation before asking ChatGPT to open a page. Connectors and apps are a paid-plan feature, and the developer-mode surface moves around between releases — if you cannot find it, the ChatGPT desktop app path works today with no relay.',
      },
    ],
    security: CONNECTOR_SECURITY,
    connectedLooksLike: [
      'The app appears in the Plugins list with its name, and opening it shows the discovered actions rather than an error.',
      'In a conversation, the app is selectable from the tools/apps menu and can be toggled on for that chat.',
      'On the first real request, ChatGPT shows a sequence of tool calls — expect several, including Navigate page — and your own browser visibly navigates while it works. Six tool calls for a simple lookup is normal, not a fault.',
    ],
    verify: CONNECTOR_VERIFY,
    troubleshooting: CONNECTOR_TROUBLESHOOTING,
    verifiedOn: 'August 2026',
    faqs: [
      {
        q: 'Can ChatGPT on the web control my browser?',
        a: 'Yes, through a custom app pointed at a remote MCP server. ChatGPT web cannot read local Codex config or run a local process, so the local STDIO path does not apply there — the Vibe relay URL does.',
      },
      {
        q: 'Where is developer mode in ChatGPT?',
        a: 'Settings → Security and login. Not under Connectors, which is where most guides send you. Switch Developer mode on there, and the Plugins → Create app surface becomes available.',
      },
      {
        q: 'Do I need to verify a domain or set up OAuth?',
        a: 'No. Creating the app needs nothing but the URL — no domain verification, no allowlist request, and no OAuth configuration.',
      },
      {
        q: 'Should I use this or the ChatGPT desktop app integration?',
        a: 'Prefer the desktop app if you are on it: that path is local STDIO, so page content never leaves your machine. Use the connector when you are in ChatGPT on the web, where a local server is not an option.',
      },
      {
        q: 'Does this work with Codex CLI?',
        a: 'Codex CLI can use either path — it can spawn the local MCP server, and it can also point at a remote MCP URL with headers. The local path is simpler there; see the Codex CLI page.',
      },
      ...REMOTE_CONNECTOR_FAQS,
    ],
    keywords: [
      'chatgpt connector mcp',
      'chatgpt remote mcp server',
      'chatgpt browser control',
      'chatgpt custom connector',
      'chatgpt web control chrome',
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
