import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const investorsConfig: ProfessionConfig = {
  slug: 'investors',
  name: 'Investors',
  title: 'AI Investment Research',
  subtitle: 'Your AI assistant for investment research',
  gradient: 'from-emerald-700 via-green-600 to-emerald-700',
  gradientFrom: 'from-emerald-700',
  gradientVia: 'via-green-600',
  gradientTo: 'to-emerald-700',
  accentColor: 'text-emerald-300',
  accentBg: 'bg-emerald-100 text-emerald-700',
  rotatingWords: ['Stocks', 'ETFs', 'Funds', 'Portfolios', 'Dividends', 'Analysis', 'Reports', 'Research'],
  description: 'Your AI investment assistant that researches stocks, downloads Morningstar reports, analyzes portfolios, and helps you make better investment decisions.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownload: true,
  features: [
    { icon: 'Search', title: 'Stock Research', description: 'Research any stock with natural language. Get analysis, compare to competitors, and find undervalued opportunities.' },
    { icon: 'Download', title: 'Morningstar Reports', description: 'Download and analyze Morningstar reports. Extract key insights and compare metrics across companies.' },
    { icon: 'TrendingUp', title: 'Portfolio Analysis', description: 'Analyze your portfolio composition. Identify concentration risks and diversification opportunities.' },
    { icon: 'DollarSign', title: 'Dividend Tracking', description: 'Track dividend payments, yields, and ex-dividend dates. Never miss a payment.' },
    { icon: 'BarChart3', title: 'Performance Comparison', description: 'Compare fund performance against benchmarks. Analyze risk-adjusted returns.' },
    { icon: 'Bookmark', title: 'Watchlist Management', description: 'Build and monitor watchlists. Get alerts on price movements and news.' },
    { icon: 'FileText', title: 'SEC Filings', description: 'Read and summarize SEC filings. Extract key information from 10-Ks, 10-Qs, and 8-Ks.' },
    { icon: 'Globe', title: 'Market News', description: 'Stay updated with market news. Get summaries and sentiment analysis on companies you follow.' },
  ],
  workflows: [
    'Research stocks with natural language queries',
    'Download and analyze Morningstar reports',
    'Compare ETFs and mutual funds',
    'Track dividend payments and schedules',
    'Analyze portfolio concentration and risk',
    'Monitor watchlist and get alerts',
  ],
  tools: ['Morningstar', 'Yahoo Finance', 'SEC EDGAR', 'Bloomberg', 'Finviz', 'Seeking Alpha'],
}

export default function Page() {
  return <ProfessionTemplate config={investorsConfig} />
}
