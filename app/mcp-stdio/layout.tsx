import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Vibe Browser for Agents | MCP over stdio (Local)',
  description: 'Run vibebrowser-mcp as a local stdio process for Claude Code, Cursor, Codex, VS Code, OpenCode, Windsurf, Gemini CLI, and Claude Desktop. The MCP bridge and browser-control path stay on your machine — no Vibe internet relay involved.',
  keywords: [
    // Primary MCP keywords
    'browser mcp server',
    'browser mcp',
    'mcp browser automation',
    'model context protocol browser',
    'mcp server chrome',
    'local mcp server',
    'mcp stdio',
    'browser automation mcp',

    // Competitor / alternative keywords
    'browser mcp alternative',
    'browsermcp alternative',
    'browsermcp.io alternative',
    'playwright mcp alternative',
    'chrome devtools mcp alternative',
    'playwright mcp vs vibe mcp',
    'chrome devtools mcp vs vibe mcp',
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
    url: 'https://www.vibebrowser.app/mcp-stdio',
    siteName: 'Vibe Browser',
    title: 'Vibe Browser for Agents | MCP over stdio (Local)',
    description: 'Local · stdio process. Run vibebrowser-mcp next to Claude Code, Cursor, Codex, VS Code, OpenCode, and other MCP clients — the MCP bridge stays on your machine, no Vibe internet relay involved.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser for Agents | MCP over stdio (Local)',
    description: 'Local · stdio process. No Vibe internet relay involved.',
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
    canonical: 'https://www.vibebrowser.app/mcp-stdio',
  },
  category: 'technology',
  classification: 'Developer Tools',
}

// JSON-LD Structured Data — distinct from /mcp's (app/mcp/layout.tsx): this
// route is the local-process stdio guide, not the hosted remote endpoint.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser for Agents',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, macOS, Windows, Linux',
  description: 'Local stdio MCP process (vibebrowser-mcp) that exposes your real browser to AI agents over localhost only. Published npm package: @vibebrowser/mcp.',
  url: 'https://www.vibebrowser.app/mcp-stdio',
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
    description: 'Free local MCP process for browser automation',
  },
  featureList: [
    'Local stdio MCP process — bridge and browser-control path stay on your machine',
    'Multi-agent simultaneous browser control via a local relay daemon',
    '25+ browser automation and workspace tools',
    'Google Workspace integration (Gmail, Calendar)',
    'Skills library for reusable workflows',
    'Secure credential vault',
    'Password fill tool that hides secrets from the LLM',
    'No Chrome debug permissions required',
    'Markdown-indexed page content',
    'Optional --remote flag to reach a browser on another machine via the Vibe internet relay',
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

// FAQPage entries mirror the local-only subset visible on /mcp-stdio (see
// app/mcp-stdio/page.tsx's FAQ section) — the remote-focused subset lives in
// app/mcp/layout.tsx instead, so the two routes never ship duplicate
// FAQPage structured data.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can multiple AI agents control the browser at the same time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vibe MCP uses a relay daemon architecture where multiple AI clients (Claude, Cursor, VS Code, etc.) connect via their own stdio MCP bridge to a shared local relay on port 19888, which forwards requests to the Vibe extension on port 19889. Each agent operates independently without conflicts.',
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
      name: 'Can I point my local bridge at a browser on another machine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, optionally. The same local vibebrowser-mcp bridge can add a --remote <uuid> flag to dial out to a browser on another machine through the relay, instead of talking to a browser on this machine. It is still a local process. That includes OpenClaw-style remote flows; see the dedicated OpenClaw page for that command-oriented setup.',
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
      name: 'Can Vibe Browser MCP also work as a standalone browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unlike Browser MCP which is MCP-only, Vibe also functions as a standalone AI co-pilot directly in your browser. Click the extension icon to chat, automate tasks, and get AI assistance — no external agent required.',
      },
    },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to set up Vibe Browser for Agents locally (stdio)',
  description: 'Connect your AI coding agent to your browser using the local vibebrowser-mcp stdio process in under 2 minutes.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Install the Vibe Browser extension',
      text: 'Install the Vibe AI Browser extension from the Chrome Web Store or developer docs and enable AI Agent Control in Settings. Local is the default connection mode.',
      url: 'https://docs.vibebrowser.app/getting-started/extension',
    },
    {
      '@type': 'HowToStep',
      name: 'Add vibebrowser-mcp to your AI client',
      text: 'Add {"mcpServers":{"vibe":{"command":"npx","args":["-y","-p","@vibebrowser/mcp@latest","vibebrowser-mcp"]}}} to your AI client\'s MCP configuration file.',
    },
    {
      '@type': 'HowToStep',
      name: 'Confirm the local connection',
      text: 'The vibebrowser-mcp process talks to the Vibe extension over localhost only — no internet relay, no bearer credential leaves your machine.',
    },
  ],
  totalTime: 'PT2M',
}

export default function McpStdioLayout({
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
