import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Sales | AI Sales Assistant with Gmail & CRM',
  description: 'Automate sales outreach with Vibe Co-Pilot. Google Workspace (Gmail + Calendar), CRM automation, MCP agent access, skills, and a secrets vault for safe email workflows.',
  keywords: [
    'AI sales assistant',
    'sales automation',
    'Gmail sales tool',
    'CRM automation',
    'lead research AI',
    'sales outreach',
    'email automation',
    'sales productivity',
    'AI for sales',
    'sales workflow',
    'google workspace automation',
    'mcp server',
    'skills library',
    'secrets vault',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/sales',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Sales',
    description: 'AI sales assistant with Google Workspace, MCP agent access, skills, and a secrets vault.',
    url: 'https://www.vibebrowser.app/sales',
    siteName: 'Vibe Co-Pilot',
    type: 'website',
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: 'Vibe Co-Pilot for Sales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Co-Pilot for Sales',
    description: 'AI sales assistant with Google Workspace, MCP agent access, skills, and a secrets vault.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
