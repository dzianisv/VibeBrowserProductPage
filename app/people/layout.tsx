import { Metadata } from 'next'
import Page from './page'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for People - Personal AI Assistant',
  description: 'Your personal AI assistant that handles everyday tasks. Answer emails, schedule appointments, manage calendar, apply to jobs - all automated.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
