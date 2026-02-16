import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Browser for Teams - Shared Automation for Modern Teams',
  description:
    'AI browser automation for teams of 5-50. Build workflows once, share with your whole team, track productivity, and manage models centrally.',
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
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/teams',
  },
  openGraph: {
    title: 'Vibe Browser for Teams',
    description:
      'Shared AI browser automation with team dashboards, admin controls, and unified billing.',
    url: 'https://www.vibebrowser.app/teams',
    images: [
      {
        url: '/og/teams.svg',
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
      'Shared AI browser automation with team dashboards, admin controls, and unified billing.',
    images: ['/og/teams.svg'],
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
