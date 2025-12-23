import PrivacyPolicy from "../../privacy-policy"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Vibe AI Browser Co-Pilot privacy policy. Learn how we handle your data with privacy-first design.',
}

export default function Page() {
  return <PrivacyPolicy />
}
