import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Browser for Teams - Shared Automation for Modern Teams',
  description:
    'AI browser automation for teams of 5-50. Build workflows once, share with your whole team, track productivity, and manage models centrally.',
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
  },
}

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
