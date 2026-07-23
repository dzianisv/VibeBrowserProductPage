import type { Metadata } from 'next'
import Component from '../landing-page'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot | AI Browser Automation for Real Browser Sessions',
  description:
    'Vibe Co-Pilot automates browsing tasks with Google Workspace (Gmail + Calendar), MCP agent access, reusable skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, Ollama self-hosted models, and BYOK providers. Run AI locally for complete privacy.',
  alternates: {
    canonical: 'https://www.vibebrowser.app',
  },
  openGraph: {
    title: 'Vibe Co-Pilot | Real Browser AI Automation',
    description:
      'Agentic AI browser extension with Google Workspace (Gmail + Calendar), MCP agent access, skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, Ollama self-hosted LLMs, and BYOK providers.',
    url: 'https://www.vibebrowser.app',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser - AI Browser Co-Pilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot | Real Browser AI Automation',
    description:
      'AI browser co-pilot with Google Workspace, MCP agent access, skills, and a secrets vault. Works with Vibe AI, Anthropic Claude Max, GitHub Copilot, Ollama local models, and BYOK providers. Self-hosted AI for complete privacy.',
    images: ['/og/home'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Co-Pilot',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Windows, macOS, Linux',
  description:
    'AI browser co-pilot extension that completes tasks autonomously with Google Workspace (Gmail + Calendar), MCP agent access, reusable skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app',
  author: {
    '@type': 'Organization',
    name: 'Vibe Co-Pilot',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: [
    'Autonomous task completion',
    'Multi-site navigation',
    'Decision-making AI agent',
    'Complete workflow automation',
    'Zero-click task execution',
    'Self-directed research',
    'Hands-free operation',
    'Google Workspace integration (Gmail, Calendar)',
    'MCP server access for other agents',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
    'Works with Vibe AI and BYOK providers',
    'Self-hosted local LLM via Ollama integration',
    'Private AI — no data leaves your machine',
  ],
  screenshot: 'https://www.vibebrowser.app/og/home',
  softwareVersion: '1.0',
  datePublished: '2025-01-01',
  dateModified: '2026-02-15',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Co-Pilot',
  url: 'https://www.vibebrowser.app',
  logo: 'https://www.vibebrowser.app/logo.png',
  description: 'Creators of the revolutionary AI Browser Co-Pilot',
  sameAs: [
    'https://x.com/vibebrowserapp',
    'https://github.com/vibebrowser',
    'https://www.linkedin.com/company/vibebrowser',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@vibebrowser.app',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Vibe Browser | AI Browser Workflows for Real Websites',
  description:
    'Vibe turns repetitive browser work into reusable workflows with real-browser execution, MCP access, reusable skills, and model-flexible execution.',
  url: 'https://www.vibebrowser.app',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Vibe Browser',
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
      name: 'Is my data safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Vibe supports local and self-hosted models for workflows that should stay on your device or infrastructure. If you choose a cloud model, task data is sent only to that provider for the run you initiate, and you stay in control of which model powers the browser agent.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe offers a free tier for local and bring-your-own-model workflows, plus paid Pro and Max plans for higher-end reasoning models and more demanding browser automation use cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Vibe different from OpenAI Atlas and other AI browsers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenAI Atlas locks you to GPT models. Perplexity Comet locks you to their stack. Vibe gives you real model freedom — run Grok 4, GPT-5, Claude, DeepSeek, Kimi, or any local model. Switch instantly without re-platforming. Vibe also runs inside your existing Chrome session, so your logins and context are always available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are we locked into Vibe? Can we switch to other tools later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Vibe is designed to avoid vendor lock-in. You can switch model providers over time, keep using your existing Chrome or Chromium setup, and keep your workflows portable instead of depending on a proprietary browser fork.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Vibe suitable for enterprises with strict privacy requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vibe supports local processing, self-hosted deployments, and policy-friendly workflows for teams with strict privacy requirements. Organizations can keep sensitive work on their own infrastructure while still using browser automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vibe compare to Manus and other competitors on vendor lock-in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vibe is not tied to one model vendor, one browser surface, or one pricing path. Teams can choose local, self-hosted, or cloud models and keep operating inside familiar Chrome environments instead of migrating to a closed browser stack.',
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
