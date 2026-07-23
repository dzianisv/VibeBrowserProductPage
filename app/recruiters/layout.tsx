import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Recruiters | LinkedIn Automation & Skills-Based Recruiting',
  description: 'Automate LinkedIn recruiting with Vibe Co-Pilot. Includes Google Workspace (Gmail + Calendar), MCP agent access, skills, and a secrets vault for safe outreach.',
  keywords: [
    'AI recruiter',
    'LinkedIn automation',
    'recruiting automation',
    'skills-based recruiting',
    'AI recruiting tool',
    'LinkedIn outreach',
    'recruiter CRM',
    'candidate sourcing AI',
    'automated recruiting',
    'recruitment workflow',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/recruiters',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Recruiters',
    description: 'Automate recruiting with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/recruiters',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Co-Pilot for Recruiters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Recruiters',
    description: 'Automate recruiting with Google Workspace, MCP agent access, skills, and a secrets vault.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
