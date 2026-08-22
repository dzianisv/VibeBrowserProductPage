import TelemetrySupportPolicy from "../../telemetry-support-policy"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Telemetry & Support',
  description: 'What telemetry VibeBrowser Co-Pilot collects, why, how to opt out, and how to reach support.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/telemetry',
  },
}

export default function Page() {
  return <TelemetrySupportPolicy />
}
