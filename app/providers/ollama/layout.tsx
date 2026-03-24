import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ollama — Private Local AI for Browser Automation',
  description:
    'Run Vibe Browser with 100% private, local AI via Ollama. Zero data leaves your machine. Free, offline, unlimited.',
  keywords: [
    'Ollama',
    'local LLM',
    'private AI',
    'self-hosted AI',
    'Vibe Browser Ollama',
    'offline AI browser',
    'local browser automation',
  ],
  openGraph: {
    title: 'Ollama — Private Local AI | Vibe Co-Pilot',
    description:
      'Run Vibe Browser with 100% private, local models via Ollama. Zero data leaves your machine.',
    url: 'https://www.vibebrowser.app/providers/ollama',
    type: 'website',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Vibe Browser + Ollama — Private Local AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ollama — Private Local AI | Vibe Co-Pilot',
    description:
      'Run Vibe Browser with 100% private, local models via Ollama. Zero data leaves your machine.',
    images: ['/og/home.svg'],
    creator: '@vibebrowserapp',
  },
  alternates: {
    canonical: 'https://www.vibebrowser.app/providers/ollama',
  },
}

export default function OllamaLayout({ children }: { children: React.ReactNode }) {
  return children
}
