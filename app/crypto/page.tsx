import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const cryptoConfig: ProfessionConfig = {
  slug: 'crypto',
  name: 'Crypto & DeFi',
  title: 'DeFi Portfolio Management',
  subtitle: 'Your AI assistant for crypto and DeFi',
  gradient: 'from-purple-700 via-violet-600 to-purple-700',
  gradientFrom: 'from-purple-700',
  gradientVia: 'via-violet-600',
  gradientTo: 'to-purple-700',
  accentColor: 'text-purple-300',
  accentBg: 'bg-purple-100 text-purple-700',
  rotatingWords: ['DeFi', 'Yield', 'Staking', 'Liquidity', 'Pools', 'Tokens', 'Portfolio', 'APY'],
  description: 'Your AI crypto assistant that researches DeFi pools, compares APY across protocols, rebalances your portfolio, and tracks yields across multiple chains.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownload: true,
  features: [
    { icon: 'Search', title: 'DeFi Research', description: 'Research DeFi protocols, compare yields, and find the best opportunities across chains.' },
    { icon: 'TrendingUp', title: 'APY Comparison', description: 'Compare APY across different pools and protocols. Find the highest yields with acceptable risk.' },
    { icon: 'RefreshCw', title: 'Portfolio Rebalancing', description: 'Analyze your portfolio and suggest rebalancing strategies. Optimize for yield and risk.' },
    { icon: 'Globe', title: 'Cross-Chain', description: 'Manage assets across multiple chains. Track positions on Ethereum, Solana, Arbitrum, and more.' },
    { icon: 'Shield', title: 'Security Analysis', description: 'Audit DeFi protocols before investing. Check for vulnerabilities and rug pull risks.' },
    { icon: 'DollarSign', title: 'Yield Tracking', description: 'Track yields across all your positions. Get notified of APY changes and opportunities.' },
    { icon: 'Wallet', title: 'Portfolio Overview', description: 'See your complete crypto portfolio in one place. Track PnL across all chains.' },
    { icon: 'Bell', title: 'Alerts', description: 'Set price, yield, and wallet alerts. Get notified of important changes.' },
  ],
  workflows: [
    'Research DeFi protocols and compare yields',
    'Find best APY across different pools',
    'Rebalance portfolio based on strategy',
    'Track yields across multiple chains',
    'Monitor for security risks',
    'Set alerts for price and yield changes',
  ],
  tools: ['Uniswap', 'Aave', 'Compound', 'Curve', 'Yearn', 'Lido', 'Raydium', 'Jupiter'],
}

export default function Page() {
  return <ProfessionTemplate config={cryptoConfig} />
}
