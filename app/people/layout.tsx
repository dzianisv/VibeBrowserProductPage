import { Metadata } from 'next'
import Page from './page'

export const metadata: Metadata = {
  title: 'Vibe Co-Pilot for People - Personal AI Assistant',
  description: 'Your personal AI assistant that handles everyday tasks. Includes Google Workspace (Gmail + Calendar), skills, MCP agent access, and a secrets vault with password fill.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
