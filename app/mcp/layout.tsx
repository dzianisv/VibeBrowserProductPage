import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe Browser for Agents | Real Browser MCP',
  description: 'Connect Claude Code, Cursor, Codex, VS Code, OpenCode, and other MCP agents to your real browser. Published npm binaries: vibebrowser-mcp and vibe-mcp. Multi-agent relay, Google Workspace, skills, and a secrets vault.',
  keywords: [
    // Primary MCP keywords
    'browser mcp server',
    'browser mcp',
    'mcp browser automation',
    'model context protocol browser',
    'mcp server chrome',
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
    'claude browser control',
    'cursor browser automation',
    'vscode browser mcp',
    'copilot browser control',
    'windsurf browser mcp',
    'opencode browser mcp',
    'claude code browser',
    'gemini cli browser',

    // Feature keywords
    'multi agent browser control',
    'mcp browser tools',
    'ai browser automation',
    'chrome extension mcp',
    'browser mcp no debug',
    'mcp google workspace',
    'mcp gmail integration',
    'mcp credential management',
    'mcp skills library',
    'mcp secrets vault',
    'claude max mcp',
    'github copilot mcp',
    'byok mcp',

    // Technical keywords
    'npx vibebrowser mcp',
    '@vibebrowser/mcp',
    'vibebrowser-mcp',
    'mcp websocket relay',
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
    title: 'Vibe Browser for Agents | Real Browser MCP',
    description: 'Multi-agent browser automation via vibebrowser-mcp for Claude Code, Codex, Cursor, OpenCode, VS Code, and other MCP clients.',
    images: [
      {
        url: '/og/mcp.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser for Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser for Agents | Real Browser MCP',
    description: 'Multi-agent browser automation via vibebrowser-mcp for real browser sessions.',
    images: ['/og/mcp.svg'],
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
  description: 'Browser automation MCP server that exposes your real browser to AI agents. Published npm binaries: vibebrowser-mcp and vibe-mcp.',
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
    description: 'Free MCP server for browser automation',
  },
  featureList: [
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
    'Screenshot with grayscale and quality controls',
  ],
  softwareRequirements: 'Chrome browser, Node.js',
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
      name: 'Can multiple AI agents control the browser at the same time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vibe MCP uses a relay daemon architecture where multiple AI clients (Claude, Cursor, VS Code, etc.) connect via WebSocket to a shared relay, which forwards requests to the Vibe extension. Each agent gets its own stdio MCP bridge.',
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
      name: 'What AI agents work with Vibe Browser MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe Browser MCP works with any MCP-compatible AI client including Claude Desktop, Cursor, VS Code (GitHub Copilot), OpenCode, Claude Code, Windsurf, Gemini CLI, and Codex.',
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
        text: 'Playwright MCP and Chrome DevTools MCP launch a fresh, separate browser by default with no sessions, cookies, or extensions. Playwright MCP can reuse an existing browser through its extension flow or by pointing it at an explicit --cdp-endpoint, but that still requires extra setup and it still lacks multi-agent support. Vibe Browser MCP connects directly to the browser you are already using with zero configuration, so agents can interact with Gmail, Slack, GitHub, Jira, or any logged-in site without re-authenticating.',
      },
    },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to set up Vibe Browser for Agents',
  description: 'Connect your AI coding agent to your browser using vibebrowser-mcp in under 2 minutes.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Install the Vibe Browser extension',
      text: 'Install the Vibe AI Browser extension from the Chrome Web Store or developer docs.',
      url: 'https://docs.vibebrowser.app/getting-started/extension',
    },
    {
      '@type': 'HowToStep',
      name: 'Enable MCP External Control',
      text: 'Click the Vibe extension icon, go to Settings, and enable MCP External Control. Status should show Connected (green).',
    },
    {
      '@type': 'HowToStep',
      name: 'Add vibebrowser-mcp to your AI client',
      text: 'Add {"mcpServers":{"vibe":{"command":"npx","args":["-y","-p","@vibebrowser/mcp@latest","vibebrowser-mcp"]}}} to your AI client\'s MCP configuration file.',
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
