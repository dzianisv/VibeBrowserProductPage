import type { Metadata } from 'next'
import MobileClawPage from './MobileClawPage'

export const metadata: Metadata = {
  title: 'MobileClaw - Your AI Personal Assistant on Mobile | Vibe',
  description: 'A hosted OpenClaw-style personal assistant that lives on your phone. Android first, iOS coming soon. AI that acts on your behalf, from anywhere.',
  keywords: ['AI assistant', 'mobile AI', 'Android AI assistant', 'OpenClaw', 'AI personal assistant', 'autonomous mobile agent'],
  openGraph: {
    title: 'MobileClaw - Your AI Personal Assistant on Mobile',
    description: 'A hosted OpenClaw-style personal assistant that lives on your phone. Android first, iOS coming soon.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MobileClaw - Your AI Personal Assistant on Mobile',
    description: 'A hosted OpenClaw-style personal assistant that lives on your phone.',
  },
}

export default function Page() {
  return <MobileClawPage />
}
