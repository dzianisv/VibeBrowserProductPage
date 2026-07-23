import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vibebrowser.app'),
  title: 'Agentic Team - Autonomous AI Ops Team Powered by OpenClaw | Vibe',
  description: 'Deploy 5 specialized AI agents that coordinate autonomously over Slack to run your SaaS operations 24/7. Integrates with Google Workspace, MCP browser access, skills, and a secrets vault.',
  keywords: [
    // Primary keywords
    'agentic team',
    'agentic teams',
    'ai operations team',
    'autonomous saas operations',
    'ai agents slack',
    'openclaw agents',
    'openclaw',

    // Agent-specific keywords
    'ai support engineer',
    'ai software engineer agent',
    'ai release engineer',
    'ai product manager agent',
    'ai marketing manager agent',
    'autonomous devops',
    'ai incident response',

    // Use case keywords
    'ai team automation',
    'autonomous ops team',
    'ai sre team',
    'ai devops team',
    'multi agent coordination',
    'agent to agent communication',
    'ai team slack integration',
    'mcp browser access',
    'google workspace automation',
    'skills library',
    'secrets vault',

    // Technical keywords
    'multi agent system',
    'thread based subscription model',
    'ai agent orchestration',
    'autonomous deployment',
    'ai ci cd pipeline',
    'kubernetes ai agents',

    // Competitor/alternative keywords
    'agentic workforce',
    'ai workforce automation',
    'autonomous engineering team',
    'virtual sre team',
    'ai ops automation',

    // Brand
    'vibe agentic team',
    'vibe team',
    'vibeteam',
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
    url: 'https://www.vibebrowser.app/agentic-team',
    siteName: 'Vibe Co-Pilot',
    title: 'Agentic Team - Your Autonomous AI Ops Team',
    description: '5 specialized AI agents coordinate over Slack to run your SaaS operations autonomously, with Google Workspace, MCP browser access, skills, and a secrets vault.',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Agentic Team - AI Operations Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Team - Autonomous AI Ops Team Powered by OpenClaw',
    description: '5 AI agents coordinate over Slack to run your SaaS with Google Workspace, MCP browser access, skills, and a secrets vault.',
    images: ['/og/home'],
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
    canonical: 'https://www.vibebrowser.app/agentic-team',
  },
  category: 'technology',
  classification: 'AI Operations',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Agentic Team',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Kubernetes, Linux, macOS',
  description: 'A multi-agent AI system that deploys 5 specialized agents to autonomously run SaaS operations. Integrates with Google Workspace, MCP browser access, skills, and a secrets vault.',
  url: 'https://www.vibebrowser.app/agentic-team',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Request a demo to get started with your autonomous AI ops team',
  },
  featureList: [
    '5 specialized AI agents with configurable roles',
    'Natural Slack communication between agents',
    'Thread-based subscription model for coordination',
    'Dual framework: OpenHands + OpenClaw agents',
    'Clean, focused context per agent — no context flooding',
    'Autonomous incident response and deployment',
    'Customer support triage and resolution',
    'Automated code review, testing, and deployment',
    'Product backlog management and PRDs',
    'Marketing content creation and announcements',
    'Kubernetes-native deployment',
    'Fully configurable roles, knowledge, and toolsets',
    'Google Workspace integration (Gmail, Calendar)',
    'MCP browser access for other agents',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vibe Technologies',
  url: 'https://www.vibebrowser.app',
  logo: 'https://www.vibebrowser.app/vibebrowser-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'agenticteam@vibebrowser.app',
    contactType: 'sales',
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
      name: 'What is an agentic team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An agentic team is a group of AI agents that work together autonomously, coordinating through natural language in Slack. Unlike a single agent that tries to do everything (and floods its context window), an agentic team distributes responsibilities across specialized roles — each with its own focused context, knowledge base, and personality.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why not just use one agent with a large context window?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Context flooding is the core problem. When a single agent handles support tickets, code reviews, deployments, product decisions, and marketing simultaneously, its context fills with irrelevant information from other domains. LLM quality degrades as context grows — the model gets confused, makes worse decisions, and loses track of what matters. An agentic team gives each agent a clean, focused context with only the information relevant to its role.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do the agents communicate with each other?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agents communicate through Slack using a Thread-Based Subscription Model (TBSM). When one agent mentions another using @RoleName, the mentioned agent automatically subscribes to the thread and responds. This creates natural, traceable conversations that your human team can observe and intervene in.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between OpenHands and OpenClaw agents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenHands agents are lightweight, sandboxed coding agents optimized for well-defined tasks like bug fixes, test writing, and routine maintenance. They are fast and cost-effective. OpenClaw agents are advanced reasoning agents designed for complex decisions, multi-step planning, and cross-agent coordination. Both run in the same Slack workspace and hand off to each other naturally. You choose which framework powers each role based on the complexity of the work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the agents\' knowledge and personality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Each agent\'s knowledge base, personality, communication style, and toolset are fully configurable. The 5-agent team running vibebrowser.app is just one example deployment. You can define any roles your operations need, add domain-specific knowledge, connect custom tools, and adjust how each agent communicates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I observe and intervene?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All agent communication happens in your Slack workspace in real-time. You can watch agents coordinate, review their decisions, and jump into any thread to redirect or override. Every action is traceable through Slack threads. There are no hidden processes — everything happens in the open.',
      },
    },
    {
      '@type': 'Question',
      name: 'What infrastructure does the agentic team run on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The agentic team is Kubernetes-native and deploys to your existing cluster. Each agent runs as a containerized service with its own resource allocation. The system uses a FastAPI gateway for Slack event routing, LiteLLM for LLM provider abstraction, and supports Azure OpenAI, OpenAI, and other providers. All infrastructure is self-hosted in your environment — no data leaves your network.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the agentic team available now?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The agentic team is currently in private beta, actively running vibebrowser.app operations. We are onboarding select SaaS companies for early deployment. Request a demo at agenticteam@vibebrowser.app to learn more and get early access.',
      },
    },
  ],
}

export default function AgenticTeamLayout({
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
      {children}
    </>
  )
}
