import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe Browser for Agents | Hosted Remote MCP (Streamable HTTP)',
  description: 'Connect Claude Code, Codex CLI, GitHub Copilot, Cursor, OpenCode, and other Streamable HTTP MCP clients to your real browser over a hosted relay endpoint. No local install, no port forwarding, no VPN.',
  keywords: [
    // Primary MCP keywords
    'browser mcp server',
    'browser mcp',
    'mcp browser automation',
    'model context protocol browser',
    'remote mcp server',
    'hosted mcp server',
    'streamable http mcp',
    'browser automation mcp',

    // Competitor / alternative keywords
    'browser mcp alternative',
    'browsermcp alternative',
    'browsermcp.io alternative',
    'playwright mcp alternative',
    'chrome devtools mcp alternative',
    'playwright mcp vs vibe mcp',
    'chrome devtools mcp vs vibe mcp',
    'playwright mcp vs browser mcp',
    'best browser mcp server',
    'mcp server for chrome',

    // Agent-specific keywords
    'claude code remote mcp',
    'codex cli remote mcp',
    'cursor remote mcp',
    'github copilot mcp',
    'opencode remote mcp',
    'copilot cli mcp',

    // Feature keywords
    'multi agent browser control',
    'mcp browser tools',
    'ai browser automation',
    'no local mcp server',
    'mcp google workspace',
    'mcp gmail integration',
    'mcp credential management',
    'mcp skills library',
    'mcp secrets vault',
    'claude max mcp',
    'byok mcp',

    // Technical keywords
    'relay.api.vibebrowser.app',
    '@vibebrowser/mcp',
    'vibebrowser-mcp',
    'x-remote-session header',
    'ai coding agent browser',
    'browser control ai agent',

    // Use case keywords
    'ai end to end testing',
    'ai web scraping mcp',
    'ai form filling browser',
    'ai browser task automation',

    // Brand
    'vibe browser mcp',
    'vibe mcp server',
  ],
  authors: [{ name: 'Vibe Technologies' }],
  creator: 'Vibe Technologies',
  publisher: 'Vibe Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibebrowser.app/mcp',
    siteName: 'Vibe Browser',
    title: 'Vibe Browser for Agents | Hosted Remote MCP (Streamable HTTP)',
    description: 'Hosted · Streamable HTTP. Connect any remote MCP client to your real browser — no local process, no port forwarding, no VPN.',
    images: [
      {
        url: '/og/mcp',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser for Agents - Hosted Remote MCP (Streamable HTTP)',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser for Agents | Hosted Remote MCP (Streamable HTTP)',
    description: 'Hosted · Streamable HTTP. Connect any remote MCP client to your real browser from anywhere.',
    images: [
      {
        url: '/og/mcp-twitter',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser for Agents - Hosted Remote MCP (Streamable HTTP)',
        type: 'image/png',
      },
    ],
    creator: '@vibebrowserapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vibebrowser.app/mcp',
  },
  category: 'technology',
  classification: 'Developer Tools',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser for Agents',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, macOS, Windows, Linux',
  description: 'Hosted remote MCP endpoint (Streamable HTTP) that exposes your real browser to AI agents over the internet — no local process required.',
  url: 'https://www.vibebrowser.app/mcp',
  downloadUrl: 'https://www.npmjs.com/package/@vibebrowser/mcp',
  installUrl: 'https://docs.vibebrowser.app/getting-started/extension',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free hosted MCP endpoint for browser automation',
  },
  featureList: [
    'Hosted Streamable HTTP MCP endpoint — no local process',
    'Multi-agent simultaneous browser control',
    '25+ browser automation and workspace tools',
    'Google Workspace integration (Gmail, Calendar)',
    'Skills library for reusable workflows',
    'Secure credential vault',
    'Password fill tool that hides secrets from the LLM',
    'No Chrome debug permissions required',
    'Markdown-indexed page content',
    'Sub-agent orchestration',
    'Parallel tool execution',
    'Index-based interaction for low token usage',
  ],
  softwareRequirements: 'Chrome browser',
  softwareHelp: {
    '@type': 'CreativeWork',
    url: 'https://docs.vibebrowser.app/mcp-integration',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies',
  url: 'https://www.vibebrowser.app',
  logo: 'https://www.vibebrowser.app/vibebrowser-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@vibebrowser.app',
    contactType: 'technical support',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://twitter.com/vibebrowserapp',
    'https://linkedin.com/company/vibebrowser',
    'https://github.com/VibeTechnologies',
  ],
}

// FAQPage entries mirror the remote-focused subset visible on /mcp (see
// app/mcp/page.tsx's FAQ section) — the local-stdio subset lives in
// app/mcp-stdio/layout.tsx instead, so the two routes never ship duplicate
// FAQPage structured data.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is Vibe Browser MCP different from Playwright MCP, Chrome DevTools MCP, and BrowserMCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playwright MCP and Chrome DevTools MCP launch a separate browser by default. Playwright MCP can connect to your existing browser either through its Chrome extension mode or through an explicit --cdp-endpoint when Chrome remote debugging is already enabled, but that is still manual setup and it still lacks multi-agent support, Google Workspace tools, credential vault, and sub-agent orchestration. Chrome DevTools MCP requires --remote-debugging-port and sends telemetry to Google. BrowserMCP is a Chrome extension like Vibe but only supports a single agent, has ~13 tools, and its extension is closed-source. Vibe Browser MCP supports multiple agents simultaneously, offers 25+ tools, includes Google Workspace integration, a credential vault, sub-agent orchestration, and uses indexed markdown snapshots for lower token usage.',
      },
    },
    {
      '@type': 'Question',
      name: "I don't want my browser traffic to touch the internet — what should I use instead?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use local stdio MCP — it runs as a process on your machine and never sends browser-control traffic over the internet. See vibebrowser.app/mcp-stdio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can multiple AI agents control the browser at the same time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Each agent sends its own X-Remote-Session header value to the hosted endpoint independently — there's no local daemon or port to share, so multiple direct HTTP clients (or a mix of direct HTTP and local stdio agents) can drive the browser without conflicting.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vibe Browser MCP require Chrome debug permissions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Vibe Browser MCP uses content scripts and the Chrome Extensions API — no --remote-debugging-port or CDP required. Playwright MCP\'s extension mode also avoids debug ports, and it can manually attach via --cdp-endpoint if Chrome is already exposing CDP, but its default mode still launches a separate browser. Chrome DevTools MCP requires debug ports. Vibe works with your normal browser profile without any special launch flags.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI agents work with Vibe Browser MCP over the hosted remote endpoint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any MCP client that supports the Streamable HTTP transport. Verified remote configs are published for Claude Code, Codex CLI, GitHub Copilot (VS Code and CLI), Cursor, and OpenCode, plus a generic JSON contract for any other Streamable HTTP client.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the credential vault work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The secrets_manager tool lets agents list and read credentials by domain. The typein_secret tool fills form fields directly from the vault — the actual password value is never exposed to the LLM.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Vibe Browser MCP open source?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Partially. The npm package (@vibebrowser/mcp) is open source on GitHub and published on npm with the vibebrowser-mcp binary. The Vibe Browser extension itself is not open source.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do indexed markdown snapshots work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instead of sending raw DOM or accessibility tree snapshots, Vibe captures indexed markdown snapshots with interactive elements labeled as [index:score]. Agents use these indices to click, fill, and interact with elements. This drastically reduces token usage and context pollution compared to full page snapshots.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does it matter that Vibe uses my real browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playwright MCP and Chrome DevTools MCP launch a fresh, separate browser by default with no sessions, cookies, or extensions. Vibe Browser MCP connects directly to the browser you are already using with zero configuration, so agents can interact with Gmail, Slack, GitHub, Jira, or any logged-in site without re-authenticating.',
      },
    },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to connect an AI agent to Vibe Browser over the hosted remote MCP endpoint',
  description: 'Connect any Streamable HTTP MCP client to your real browser using the hosted relay.api.vibebrowser.app endpoint — no local process required.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Install the Vibe Browser extension',
      text: 'Install the Vibe AI Browser extension from the Chrome Web Store or developer docs.',
      url: 'https://docs.vibebrowser.app/getting-started/extension',
    },
    {
      '@type': 'HowToStep',
      name: 'Turn on external AI agent control and select Remote (internet)',
      text: 'Click the Vibe extension icon, open Settings, go to AI Agent Control, turn on Enable external AI agent control, select Remote (internet) as the connection mode, then copy the UUID/relay URL shown under Relay access.',
    },
    {
      '@type': 'HowToStep',
      name: 'Point your MCP client at the hosted endpoint',
      text: 'Add {"mcpServers":{"vibebrowser":{"type":"http","url":"https://relay.api.vibebrowser.app/mcp","headers":{"X-Remote-Session":"<uuid>"}}}} to your AI client\'s MCP configuration — sent as an HTTP header, never in the URL.',
    },
  ],
  totalTime: 'PT2M',
}

export default function McpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {children}
    </>
  )
}
