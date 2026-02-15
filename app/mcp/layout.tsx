import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe MCP Server - Control Your Browser from Claude, Cursor, VS Code & More',
  description: 'Connect AI coding agents to your real browser via Model Context Protocol. Multi-agent support, 25+ tools, Google Workspace integration, credential vault, zero debug permissions required. The best Browser MCP alternative.',
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

    // Technical keywords
    'npx vibebrowser mcp',
    '@vibebrowser/mcp',
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
    siteName: 'Vibe AI Browser Co-Pilot',
    title: 'Vibe MCP Server - Control Your Browser from Any AI Agent',
    description: 'Multi-agent browser automation via MCP. 25+ tools, Google Workspace, credential vault, no debug permissions. Works with Claude, Cursor, VS Code, Windsurf, OpenCode, Gemini CLI.',
    images: [
      {
        url: '/og-mcp.png',
        width: 1200,
        height: 630,
        alt: 'Vibe MCP Server - Browser Automation for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe MCP Server - Control Your Browser from Any AI Agent',
    description: 'Multi-agent browser automation via MCP. 25+ tools, Google Workspace, credential vault. Works with Claude, Cursor, VS Code & more.',
    images: ['/twitter-mcp.png'],
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
  name: 'Vibe MCP Server',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, macOS, Windows, Linux',
  description: 'MCP server that exposes your browser as a tool for AI coding agents. Multi-agent support, 25+ browser tools, Google Workspace integration, credential vault.',
  url: 'https://www.vibebrowser.app/mcp',
  downloadUrl: 'https://www.npmjs.com/package/@vibebrowser/mcp',
  installUrl: 'https://docs.vibebrowser.app/getting-started/extension',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free and open source MCP server for browser automation',
  },
  featureList: [
    'Multi-agent simultaneous browser control',
    '25+ browser automation tools',
    'Google Workspace integration (Gmail, Calendar)',
    'Secure credential vault',
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
    url: 'https://docs.vibebrowser.app/mcp',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies',
  url: 'https://vibebrowser.app',
  logo: 'https://vibebrowser.app/logo.png',
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
      name: 'How is Vibe MCP different from Browser MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe MCP supports multiple AI agents controlling the same browser simultaneously via a relay daemon, offers 25+ tools (vs ~12), includes native Google Workspace integration, provides a secure credential vault, and uses markdown-indexed page content instead of raw accessibility trees for lower token usage. It also does not require Chrome debug permissions.',
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
      name: 'Does Vibe MCP require Chrome debug permissions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Vibe MCP uses content scripts and the Chrome Extensions API to interact with pages. It does not require --remote-debugging-port or any special Chrome launch flags. This means it works with your normal browser profile without security downgrades.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI agents work with Vibe MCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe MCP works with any MCP-compatible AI client including Claude Desktop, Cursor, VS Code (GitHub Copilot), OpenCode, Claude Code, Windsurf, and Gemini CLI. Setup requires adding one JSON config block.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the markdown-indexed page content work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instead of sending raw DOM or accessibility tree snapshots, Vibe extracts page content as clean markdown with interactive elements labeled as [index:score]. Agents use these indices to click, fill, and interact with elements. This drastically reduces token usage and context pollution compared to full page snapshots.',
      },
    },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to set up Vibe MCP Server',
  description: 'Connect your AI coding agent to your browser using Vibe MCP Server in under 2 minutes.',
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
      name: 'Add MCP server config to your AI client',
      text: 'Add {"mcpServers":{"vibe":{"command":"npx","args":["-y","@vibebrowser/mcp"]}}} to your AI client\'s MCP configuration file.',
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
