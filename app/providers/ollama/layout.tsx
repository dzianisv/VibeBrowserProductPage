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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ollama — Private Local AI | Vibe Co-Pilot',
    description:
      'Run Vibe Browser with 100% private, local models via Ollama. Zero data leaves your machine.',
    creator: '@vibebrowserapp',
  },
  alternates: {
    canonical: 'https://www.vibebrowser.app/providers/ollama',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vibe Browser with Ollama',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, macOS, Windows, Linux',
  description: 'Run Vibe Browser with 100% private, local AI models via Ollama. Zero data leaves your machine.',
  url: 'https://www.vibebrowser.app/providers/ollama',
  installUrl: 'https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado',
  author: {
    '@type': 'Organization',
    name: 'Vibe Technologies',
    url: 'https://www.vibebrowser.app',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free offline automation',
  },
  featureList: [
    'Absolute Privacy - zero data leaves the local machine',
    'Offline Automation without active internet',
    'Zero API Costs - run unlimited automation tasks',
    'Native Integration with local Ollama API',
    'Automatic model discovery from /api/tags',
  ],
  softwareRequirements: 'Chrome browser, Ollama',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why use Ollama with Vibe Browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Using Ollama with Vibe Browser ensures absolute privacy. Your browsing history, DOM snapshots, and prompts never leave your local machine. It also enables offline automation and completely eliminates API costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Ollama model is recommended for browser automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend Qwen 3.5 for the best experience, as browser automation requires strong reasoning and tool-use capabilities. Good alternatives include Llama 3.1 8B, Gemma 3 4B, and SmolLM 2 1.7B.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I do if Vibe Browser cannot connect to Ollama?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First, ensure the Ollama service is running by executing "curl http://localhost:11434". If it is not running, run "ollama serve" to start it. If you are running Ollama on a different machine, you may need to configure CORS by setting OLLAMA_ORIGINS="*".',
      },
    },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to setup Ollama with Vibe Browser',
  description: 'Connect Vibe Browser to local LLMs via Ollama in 3 simple steps.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Install Ollama',
      text: 'Download and install Ollama from ollama.com/download. It operates as a single binary with no Docker or Python needed.',
      url: 'https://ollama.com/download',
    },
    {
      '@type': 'HowToStep',
      name: 'Pull a Model',
      text: 'Open your terminal and run "ollama pull qwen3.5" to download the recommended model for browser automation.',
    },
    {
      '@type': 'HowToStep',
      name: 'Connect Vibe Browser',
      text: 'Open Vibe Browser Settings, select "Ollama (Self-Hosted)" as your provider. It auto-connects to localhost:11434 and shows all your installed models.',
    },
  ],
  totalTime: 'PT5M',
}

export default function OllamaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {children}
    </>
  )
}
