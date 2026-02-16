import PrivacyPolicy from "../../privacy-policy"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Vibe AI Browser Co-Pilot privacy policy. Learn how we handle your data with privacy-first design.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Vibe AI Browser Co-Pilot',
    description: 'Learn how Vibe AI Browser Co-Pilot handles your data with privacy-first design.',
    url: 'https://www.vibebrowser.app/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Vibe AI Browser Co-Pilot',
    description: 'Learn how Vibe AI Browser Co-Pilot handles your data with privacy-first design.',
    creator: '@vibebrowserapp',
  },
}

export default function Page() {
  return <PrivacyPolicy />
}
