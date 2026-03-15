import type { Metadata } from 'next'
import Component from '../landing-page'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot - Automate Your Browsing',
  description:
    'Vibe Co-Pilot automates browsing tasks with Google Workspace (Gmail + Calendar), MCP agent access, reusable skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
  alternates: {
    canonical: 'https://www.vibebrowser.app',
  },
  openGraph: {
    title: 'Vibe Co-Pilot',
    description:
      'Agentic AI browser extension with Google Workspace (Gmail + Calendar), MCP agent access, skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
    url: 'https://www.vibebrowser.app',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser - AI Browser Co-Pilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot',
    description:
      'AI browser co-pilot with Google Workspace, MCP agent access, skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, and BYOK providers.',
    images: ['/og/home.svg'],
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Vibe Co-Pilot - Automate Your Browsing',
  description:
    'Experience the AI Browser Co-Pilot with Google Workspace (Gmail + Calendar), MCP access for other agents, skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Vibe Co-Pilot',
    url: 'https://www.vibebrowser.app',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vibebrowser.app',
      },
    ],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Vibe Co-Pilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe Co-Pilot is an autonomous browser extension that completes entire tasks for you. Unlike AI chatbots or assistants, Vibe takes full control - researching across multiple sites, making decisions, and executing complete workflows without you clicking a single button.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe Co-Pilot work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vibe uses an autonomous AI agent with Plan-Execute-Reflect architecture. You give it a goal like 'book the cheapest flight to Paris next month' and it autonomously researches options, compares prices across airlines, and completes the booking - all without your intervention.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Vibe Co-Pilot free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vibe Co-Pilot is free during beta. After launch, it's $20/month. Join our waitlist to be notified when it becomes available.",
      },
    },
    {
      '@type': 'Question',
      name: 'What platforms does Vibe Co-Pilot support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe Co-Pilot works as a Chrome extension on Windows, macOS, and Linux.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vibe integrate with Google Workspace and MCP agents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vibe includes native Gmail and Calendar tools for Google Workspace, and it can be exposed as an MCP server so other AI agents can drive your real browser sessions securely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data safe with Vibe Co-Pilot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Vibe Co-Pilot prioritizes user privacy and security. All processing happens locally using Chrome's built-in AI (Gemini Nano), and we never sell your data to third parties.",
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Component />
    </>
  )
}
