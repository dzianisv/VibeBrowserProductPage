import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Tax Preparation - AI Tax Assistant',
  description: 'AI-powered tax preparation with Google Workspace tools, MCP agent access, reusable skills, and a secrets vault for secure logins.',
  keywords: [
    'AI tax preparation',
    'tax AI assistant',
    'automate tax forms',
    '1099 download',
    'W2 download',
    'tax filing automation',
    'AI tax software',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/tax',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Tax Preparation',
    description: 'AI-powered tax prep with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/tax',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
