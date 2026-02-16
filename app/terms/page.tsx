import TermsOfService from "../../terms-of-service"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Vibe AI Browser Co-Pilot Terms of Service. Read our terms, conditions, and legal agreements.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/terms',
  },
  openGraph: {
    title: 'Terms of Service - Vibe AI Browser Co-Pilot',
    description: 'Read the Vibe AI Browser Co-Pilot terms of service, conditions, and legal agreements.',
    url: 'https://www.vibebrowser.app/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - Vibe AI Browser Co-Pilot',
    description: 'Read the Vibe AI Browser Co-Pilot terms of service, conditions, and legal agreements.',
    creator: '@vibebrowserapp',
  },
}

export default function Page() {
  return <TermsOfService />
}
