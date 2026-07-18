import type { Metadata } from 'next'
import { InstallClient } from './install-client'

export const metadata: Metadata = {
  title: 'Installing Vibe…',
  // Transient redirect page — keep it out of search indexes.
  robots: { index: false, follow: false },
}

// This is a redirect bridge, not real content. Render nothing heavy so it is
// fast, avoids CLS, and hands off to the Chrome Web Store in well under a second.
export default function InstallPage() {
  return <InstallClient />
}
