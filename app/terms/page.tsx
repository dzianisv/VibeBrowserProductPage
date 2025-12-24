import TermsOfService from "../../terms-of-service"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Vibe AI Browser Co-Pilot Terms of Service. Read our terms, conditions, and legal agreements.',
}

export default function Page() {
  return <TermsOfService />
}
