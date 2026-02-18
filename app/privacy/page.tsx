import PrivacyPolicy from "../../privacy-policy"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Vibe Co-Pilot privacy policy. Learn how we handle your data with privacy-first design.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Vibe Co-Pilot',
    description: 'Learn how Vibe Co-Pilot handles your data with privacy-first design.',
    url: 'https://www.vibebrowser.app/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Vibe Co-Pilot',
    description: 'Learn how Vibe Co-Pilot handles your data with privacy-first design.',
    creator: '@vibebrowserapp',
  },
}

export default function Page() {
  return <PrivacyPolicy />
}
