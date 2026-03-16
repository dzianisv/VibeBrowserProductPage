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
  description: 'Explore Amazon seller workflow ideas for inventory review, listing research, pricing checks, and support triage inside a real browser session.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownloadButtons: true,
  features: [
    { icon: 'Package', title: 'Inventory Review', description: 'Summarize stock position, recent velocity, and restock tasks across seller dashboards.' },
    { icon: 'FileText', title: 'Listing Research', description: 'Draft and compare listing changes while you review the final copy before publishing.' },
    { icon: 'Target', title: 'Campaign Review', description: 'Surface campaign performance changes and propose next actions for human approval.' },
    { icon: 'TrendingUp', title: 'Pricing Checks', description: 'Monitor pricing pages and flag shifts that may need manual follow-up.' },
    { icon: 'Star', title: 'Review Triage', description: 'Collect new reviews and draft response notes for your team to approve.' },
    { icon: 'Search', title: 'Product Research', description: 'Research competitors, catalog gaps, and product detail pages in one browser workflow.' },
    { icon: 'MessageSquare', title: 'Support Triage', description: 'Draft customer-service responses and organize cases for a human operator.' },
    { icon: 'Shield', title: 'Policy Monitoring', description: 'Track policy notices and account alerts so teams can review them quickly.' },
  ],
  workflows: [
    'Review inventory velocity and queue restock tasks',
    'Draft listing updates for operator approval',
    'Summarize campaign performance and next actions',
    'Monitor competitor pricing and catalog changes',
    'Draft replies for customer messages and reviews',
  ],
  stats: [],
  tools: ['Amazon Seller Central', 'Helium 10', 'Jungle Scout', 'Sellics', 'BQool', 'FeedbackExpress', 'Amazon PPC', 'Inventory Alerts'],
  testimonials: [],
  faqs: [
    { question: 'Does it work with Amazon Seller Central?', answer: 'Vibe is designed for browser-based workflows in real authenticated sessions, including Seller Central review and data-entry tasks.' },
    { question: 'Can it handle multiple Amazon accounts?', answer: 'Teams can switch between browser sessions and accounts, but setup depends on your workflow and review process.' },
    { question: 'Is it safe for my account?', answer: 'Use Vibe with human review and your own policy judgment. We do not claim Amazon policy approval for any specific automation pattern.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={amazonConfig} />
}
