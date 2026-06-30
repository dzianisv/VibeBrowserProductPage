import type { Metadata } from "next"

const CANONICAL = "https://agentlabs.cc/agentsdata"

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AgentLabs Agents Data",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  url: CANONICAL,
  description:
    "Real-time stock and crypto prices, RSI/SMA/MACD indicators, and programmable alerts via MCP, HTTP API, and CLI. Built for AI agents.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "MIT licensed, self-hostable. Hosted instance by request.",
  },
  author: {
    "@type": "Organization",
    name: "Vibe Technologies LLC",
    url: "https://agentlabs.cc",
  },
  codeRepository: "https://github.com/dzianisv/mkt-alerts",
  license: "https://opensource.org/licenses/MIT",
  keywords: "market data API, price alerts, MCP server, AI agent, stock prices, crypto prices, RSI, MACD",
}

export const metadata: Metadata = {
  title: {
    absolute: "Market Data & Alerts API for AI Agents | AgentLabs",
  },
  description:
    "Real-time stock and crypto prices, RSI/SMA/MACD indicators, and programmable alerts via MCP, HTTP API, and CLI. Built for AI agents.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Market Data & Alerts API for AI Agents",
    description:
      "Real-time prices and indicators for 10,000+ stocks and crypto. MCP server, REST API, CLI. Set alerts programmatically.",
    url: CANONICAL,
    siteName: "Agent Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market Data & Alerts API for AI Agents",
    description: "Real-time prices and indicators for 10,000+ stocks and crypto. MCP server, REST API, CLI.",
    creator: "@vibebrowserapp",
  },
  keywords: [
    "market data API",
    "price alerts API",
    "MCP server finance",
    "AI agent market data",
    "stock price API",
    "crypto price API",
    "RSI alerts",
    "programmatic alerts",
  ],
}

export default function MarketDataLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      {children}
    </>
  )
}
