import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Browser for Teams - Shared Automation for Modern Teams',
  description:
    'AI browser automation for teams of 5-50. Build workflows once, share with your whole team, track productivity, and manage models centrally with Google Workspace, MCP agent access, and a secrets vault.',
  keywords: [
    'AI browser for teams',
    'team browser automation',
    'shared AI workflows',
    'team productivity AI',
    'browser automation team',
    'AI workflow sharing',
    'team AI copilot',
    'collaborative browser automation',
    'team dashboard AI',
    'admin controls AI browser',
    'unified billing AI',
    'Vibe Browser teams',
    'Google Workspace automation',
    'MCP server for teams',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/teams',
  },
  openGraph: {
    title: 'Vibe Browser for Teams',
    description:
      'Shared AI browser automation with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/teams',
    images: [
      {
        url: '/og/mcp',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser for Teams',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Browser for Teams',
    description:
      'Shared AI browser automation with Google Workspace, MCP agent access, skills, and a secrets vault.',
    images: ['/og/mcp'],
    creator: '@vibebrowserapp',
  },
}

// JSON-LD Structured Data
const teamsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser for Teams',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Chrome',
  description: 'AI browser automation for teams of 5-50. Build workflows once, share with your whole team, track productivity, and manage models centrally.',
  url: 'https://www.vibebrowser.app/teams',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  featureList: [
    'Shared workflow templates',
    'Team dashboards and analytics',
    'Admin controls and permissions',
    'Unified billing',
    'Centralized model management',
    'Usage tracking per team member',
    'Google Workspace integration (Gmail, Calendar)',
    'MCP server access for other agents',
    'Skills library for reusable workflows',
    'Secrets vault with password fill tool',
  ],
}

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamsJsonLd) }}
      />
      {children}
    </>
  )
}
