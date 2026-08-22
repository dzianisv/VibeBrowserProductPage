import SubprocessorsList from "../../subprocessors-list"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subprocessors',
  description: 'Every third party that receives user data, prompt content, or page content through VibeBrowser Co-Pilot — what data, what purpose, and what region.',
  alternates: {
    canonical: 'https://www.vibebrowser.app/subprocessors',
  },
}

export default function Page() {
  return <SubprocessorsList />
}
