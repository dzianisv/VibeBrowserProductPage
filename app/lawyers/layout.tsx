import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Lawyers | AI Legal Research with TEE Privacy',
  description: 'Automate legal research while keeping client data secure. Vibe Co-Pilot runs in TEE or on-premise and includes Google Workspace tools, MCP agent access, skills, and a secrets vault.',
  keywords: [
    'AI for lawyers',
    'legal research automation',
    'TEE legal',
    'trusted execution environment law',
    'attorney AI assistant',
    'legal tech privacy',
    'on-premise legal AI',
    'secure legal research',
    'law firm automation',
    'AI paralegal',
    'legal CRM automation',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/lawyers',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Lawyers',
    description: 'Automate legal research with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/lawyers',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Co-Pilot for Lawyers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Lawyers',
    description: 'AI legal research with Google Workspace, MCP agent access, skills, and a secrets vault.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
