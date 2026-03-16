import EnterpriseTemplate, { EnterpriseConfig } from '@/components/enterprise-template'

const teamsConfig: EnterpriseConfig = {
  slug: 'teams',
  name: 'Teams',
  subtitle: 'AI Automation for Teams',
  gradient: 'from-blue-900 via-blue-800 to-blue-900',
  gradientFrom: 'from-blue-900',
  gradientVia: 'via-blue-800',
  gradientTo: 'to-blue-900',
  accentColor: 'text-blue-300',
  heroTitle: 'AI Automation for Marketing',
  heroSubtitle: 'Build workflows once, share with your team',
  heroDescription: 'Google Workspace (Gmail + Calendar), CRM, and more—powered by secure AI that keeps your data private. Build skills once, share across the team, and expose your browser as an MCP server for other agents with a secrets vault for safe password fill. Works with Vibe AI or BYOK providers.',
  rotatingWords: ['Marketing', 'Sales', 'Recruiting', 'Operations', 'Support', 'Research'],
  ctaText: 'Contact Sales',
  ctaLink: 'mailto:sales@vibebrowser.app',
  ctaIsMailto: true,
  contactEmail: 'sales@vibebrowser.app',
  demoType: 'dashboard',
  demoDashboard: {
    users: [
      { name: 'Sarah Chen', email: 'sarah@acme.corp', role: 'Admin', status: 'online' },
      { name: 'James Wilson', email: 'james@acme.corp', role: 'Member', status: 'online' },
      { name: 'Lisa Park', email: 'lisa@acme.corp', role: 'Member', status: 'offline' },
      { name: 'Mike Johnson', email: 'mike@acme.corp', role: 'Member', status: 'online' },
    ],
    sharedSkills: [
      { name: 'Gmail Auto-Reply', users: 4 },
      { name: 'Salesforce Lead Sync', users: 3 },
      { name: 'Weekly Report Builder', users: 2 },
      { name: 'LinkedIn Outreach', users: 4 },
    ],
    vaultSecrets: [
      { name: 'Salesforce API', type: 'OAuth Token', shared: true },
      { name: 'LinkedIn Cookies', type: 'Session', shared: true },
      { name: 'Gmail OAuth', type: 'Token', shared: true },
      { name: 'Slack Webhook', type: 'API Key', shared: false },
    ],
  },
  features: [
    { icon: 'Share2', title: 'Shared Skills Library', description: 'Team members build skills once and share instantly. No more recreating workflows.' },
    { icon: 'BarChart3', title: 'Team Dashboard', description: 'See how your team uses Vibe Co-Pilot. Track productivity and identify best practices.' },
    { icon: 'Settings', title: 'Admin Dashboard', description: 'Control which skills are available, set usage limits, and manage team permissions.' },
    { icon: 'CreditCard', title: 'Unified Billing', description: 'Single bill for the whole team. Easy to track costs and manage subscriptions.' },
    { icon: 'Key', title: 'SSO / Okta', description: 'Enterprise identity integration with SAML, OAuth, and Okta for secure team access.' },
    { icon: 'EyeOff', title: 'No Traces', description: 'Local AI runs entirely in browser. No data leaves your team. Zero traces left behind.' },
  ],
  workflows: [
    'Build a skill once, share with the whole team',
    'Automate Gmail, calendar, and CRM workflows',
    'Track team usage and productivity',
    'Control access and permissions centrally',
  ],
  stats: [],
  testimonials: [],
  faqs: [
    { question: "How do team skills work?", answer: "Anyone on your team can create skills. Once shared, everyone on the team can use them." },
    { question: "Is Gmail integration secure?", answer: "Yes. Vibe uses OAuth for Gmail. Credentials are stored securely." },
    { question: "How does billing work?", answer: "Per-seat pricing. Each team member gets their own account with shared skills." },
    { question: "Does Teams support SSO?", answer: "Yes. Enterprise plans include SSO integration with Okta, Azure AD, and other SAML providers." },
  ],
  showSecurity: true,
  showPricing: true,
  customPricing: {
    price: '$10',
    perSeat: true,
    tokenUsage: true,
    description: 'per seat + pay for token use',
  },
}

export default function Page() {
  return <EnterpriseTemplate config={teamsConfig} />
}
