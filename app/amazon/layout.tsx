import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Amazon Sellers | AI Amazon FBA Assistant',
  description: 'Automate your Amazon FBA business with Vibe Co-Pilot. Includes Google Workspace (Gmail + Calendar), skills, MCP agent access, and a secrets vault for secure ops.',
  keywords: [
    'AI Amazon seller',
    'Amazon FBA automation',
    'Amazon listing optimization',
    'Amazon inventory management',
    'Amazon PPC automation',
    'Amazon repricing',
    'Amazon seller tools',
    'AI for Amazon FBA',
    'Amazon product research',
    'Amazon review management',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/amazon',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Amazon Sellers',
    description: 'AI automation for Amazon FBA with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/amazon',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
    images: [
      {
        url: '/og/amazon.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Co-Pilot for Amazon Sellers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Amazon Sellers',
    description: 'AI automation for Amazon FBA with Google Workspace, MCP agent access, skills, and a secrets vault.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
