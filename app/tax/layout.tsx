import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Tax Preparation - AI Tax Assistant',
  description: 'AI-powered tax preparation. Login to financial institutions, download forms (1099, W2), estimate taxes, and help fill tax forms.',
  keywords: [
    'AI tax preparation',
    'tax AI assistant',
    'automate tax forms',
    '1099 download',
    'W2 download',
    'tax filing automation',
    'AI tax software',
  ],
  alternates: {
    canonical: 'https://www.vibebrowser.app/tax',
  },
  openGraph: {
    title: 'Vibe Co-Pilot for Tax Preparation',
    description: 'AI-powered tax preparation. Download 1099, W2 forms and automate tax filing.',
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
