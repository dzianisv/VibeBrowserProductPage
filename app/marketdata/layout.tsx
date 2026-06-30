import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Market Data & Alerts API for AI Agents | AgentLabs",
  description:
    "Real-time stock and crypto prices, RSI/SMA/MACD indicators, and programmable alerts via MCP, HTTP API, and CLI. Built for AI agents.",
  metadataBase: new URL("https://marketdata.agentlabs.cc"),
  alternates: { canonical: "https://marketdata.agentlabs.cc" },
  openGraph: {
    title: "Market Data & Alerts API for AI Agents",
    description:
      "Real-time prices and indicators for 10,000+ stocks and crypto. MCP server, REST API, CLI. Set alerts programmatically.",
    url: "https://marketdata.agentlabs.cc",
    siteName: "AgentLabs Market Data",
    type: "website",
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
  return children
}
