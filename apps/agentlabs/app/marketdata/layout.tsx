import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "https://agentlabs.cc/agentsdata" },
}

export default function MarketDataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
