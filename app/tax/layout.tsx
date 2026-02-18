import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for Tax Preparation - AI Tax Assistant',
  description: 'AI-powered tax preparation. Login to financial institutions, download forms (1099, W2), estimate taxes, and help fill tax forms.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
