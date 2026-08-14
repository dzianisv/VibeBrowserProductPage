import PrivacyPolicy from "../../privacy-policy"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Vibe handles your data across the browser extension, the local MCP server, and the hosted relay connector — what transits, what is logged, retention, and how to revoke access.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Vibe Co-Pilot',
    description: 'How Vibe handles your data across the extension, local MCP server, and hosted relay connector.',
    url: 'https://www.vibebrowser.app/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Vibe Co-Pilot',
    description: 'How Vibe handles your data across the extension, local MCP server, and hosted relay connector.',
    creator: '@vibebrowserapp',
  },
}

export default function Page() {
  return <PrivacyPolicy />
}
