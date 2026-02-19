import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const amazonConfig: ProfessionConfig = {
  slug: 'amazon',
  name: 'Amazon Sellers',
  title: 'AI Amazon FBA Assistant with Full Automation',
  subtitle: 'Automate inventory, listings, PPC, and repricing',
  gradient: 'from-orange-900 via-orange-800 to-orange-900',
  gradientFrom: 'from-orange-900',
  gradientVia: 'via-orange-800',
  gradientTo: 'to-orange-900',
  accentColor: 'text-orange-300',
  accentBg: 'bg-orange-100 text-orange-800',
  rotatingWords: ['Inventory', 'Listings', 'PPC', 'Repricing', 'Reviews', 'Research', 'Pricing', 'Compliance'],
  description: 'Automate your entire Amazon FBA business. Vibe manages inventory forecasting, optimizes listings for SEO, runs PPC campaigns, handles repricing, and responds to customers—so you can scale without the burnout.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownloadButtons: true,
  features: [
    { icon: 'Package', title: 'Inventory Forecasting', description: 'AI predicts stock needs, prevents shortages, avoids overstocking fees. Never lose a sale due to out-of-stock again.' },
    { icon: 'FileText', title: 'Listing Optimization', description: 'AI generates SEO-optimized titles, bullet points, and descriptions. Rank higher in Amazon search.' },
    { icon: 'Target', title: 'PPC Campaign Management', description: 'AI optimizes Sponsored Products campaigns, adjusts bids, and improves ACoS automatically.' },
    { icon: 'TrendingUp', title: 'Dynamic Repricing', description: 'AI adjusts prices in real-time to win the Buy Box while maintaining profit margins.' },
    { icon: 'Star', title: 'Review Management', description: 'AI monitors reviews, drafts responses, and identifies product issues before they escalate.' },
    { icon: 'Search', title: 'Product Research', description: 'AI analyzes market data to find profitable product opportunities with low competition.' },
    { icon: 'MessageSquare', title: 'Customer Service', description: 'AI handles buyer messages, A-to-Z claims, and refunds. Protect your account health.' },
    { icon: 'Shield', title: 'Compliance Monitoring', description: 'AI watches for compliance flags, IP complaints, and policy changes. Stay ahead of suspensions.' },
  ],
  workflows: [
    'Analyze inventory velocity and create restock orders automatically',
    'Generate optimized listings with high-converting keywords',
    'Launch and optimize PPC campaigns for maximum ROAS',
    'Monitor competitor pricing and adjust in real-time',
    'Respond to customer messages and reviews instantly',
  ],
  stats: [
    { value: '20hrs', label: 'Saved per week' },
    { value: '35%', label: 'Better ACoS' },
    { value: '2x', label: 'More time for growth' },
  ],
  tools: ['Amazon Seller Central', 'Helium 10', 'Jungle Scout', 'Sellics', 'BQool', 'FeedbackExpress', 'Amazon PPC', 'Inventory Alerts'],
  testimonials: [
    { quote: "Vibe automated 80% of my seller operations. I went from 200 to 2,000 SKUs without hiring more help.", author: "Mike Chen", practice: "Amazon FBA Seller, 7-Figure Brand" },
    { quote: "The inventory forecasting alone paid for Vibe 10x over. No more lost sales from stockouts.", author: "Sarah Williams", practice: "Private Label Seller, Home & Garden" },
  ],
  faqs: [
    { question: 'Does it work with Amazon Seller Central?', answer: 'Yes. Vibe connects via API to manage inventory, listings, orders, and advertising.' },
    { question: 'Can it handle multiple Amazon accounts?', answer: 'Yes. Manage multiple seller accounts from a single dashboard.' },
    { question: 'Is it safe for my account?', answer: '100% compliant with Amazon policies. No bots, no automation that violates ToS.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={amazonConfig} />
}
