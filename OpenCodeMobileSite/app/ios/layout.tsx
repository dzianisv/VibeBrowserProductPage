import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'iOS App Waitlist',
  description:
    'OpenCode Mobile for iPhone and iPad is in development. Join the waitlist to get notified when the open-source iOS app is ready.',
  alternates: {
    canonical: 'https://opencode.agentlabs.cc/ios',
  },
  openGraph: {
    title: 'OpenCode Mobile for iOS — Join the Waitlist',
    description:
      'The open-source opencode client is coming to iPhone and iPad. Join the waitlist for release updates.',
    url: 'https://opencode.agentlabs.cc/ios',
  },
}

export default function IosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
