import RefundPolicy from "../../refund-policy"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'How billing, cancellation, and refunds work for VibeBrowser Co-Pilot Pro and Max subscriptions.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/refund',
  },
}

export default function Page() {
  return <RefundPolicy />
}
