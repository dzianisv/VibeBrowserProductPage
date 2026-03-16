import EnterpriseTemplate, { EnterpriseConfig } from '@/components/enterprise-template'

const enterpriseConfig: EnterpriseConfig = {
  slug: 'enterprise',
  name: 'Enterprise',
  subtitle: 'Private AI for Enterprise',
  gradient: 'from-slate-900 via-slate-800 to-slate-900',
  gradientFrom: 'from-slate-900',
  gradientVia: 'via-slate-800',
  gradientTo: 'to-slate-900',
  accentColor: 'text-slate-300',
  heroTitle: 'Private AI Co-Pilot for',
  heroSubtitle: 'Private AI browser automation for regulated workflows',
  heroDescription: 'Built for professionals in finance, law, healthcare, and other regulated industries who need stronger privacy controls. Run models locally, self-host on your infrastructure, or evaluate TEE-oriented deployment paths. Includes Google Workspace (Gmail + Calendar), skills library, MCP server access for other agents, and an internal secrets vault with password fill. Works with Vibe AI or BYOK providers.',
  rotatingWords: ['Financial', 'Investment', 'Legal', 'Healthcare', 'Insurance', 'Accounting', 'Tax', 'Compliance'],
  ctaText: 'Contact Sales',
  ctaLink: 'mailto:sales@vibebrowser.app',
  ctaIsMailto: true,
  contactEmail: 'sales@vibebrowser.app',
  demoType: 'dashboard',
  demoDashboard: {
    users: [
      { name: 'Admin User', email: 'admin@enterprise.com', role: 'Admin', status: 'online' },
      { name: 'Compliance Officer', email: 'compliance@enterprise.com', role: 'Admin', status: 'online' },
      { name: 'Analyst', email: 'analyst@enterprise.com', role: 'Member', status: 'offline' },
      { name: 'Researcher', email: 'research@enterprise.com', role: 'Member', status: 'online' },
    ],
    sharedSkills: [
      { name: 'SEC Filing Search', users: 4 },
      { name: 'Compliance Check', users: 4 },
      { name: 'Client Data Redaction', users: 2 },
      { name: 'Audit Report Generator', users: 3 },
    ],
    vaultSecrets: [
      { name: 'Bloomberg Terminal', type: 'API Key', shared: true },
      { name: 'SEC EDGAR', type: 'OAuth Token', shared: true },
      { name: 'Internal CRM', type: 'API Key', shared: false },
      { name: 'Client Portal', type: 'Session', shared: true },
    ],
  },
  features: [
    { icon: 'Shield', title: 'TEE-Ready Architecture', description: 'Support TEE-oriented deployment paths for teams that need stronger infrastructure isolation.' },
    { icon: 'Server', title: 'Self-Hosted', description: 'Run DeepSeek, Llama, or any model on your own infrastructure. Complete data control.' },
    { icon: 'Cpu', title: 'NVIDIA Jetson Orin', description: 'Works with self-hosted LLMs on NVIDIA Jetson Orin Nano Super. Full AI privacy on-premise.' },
    { icon: 'Key', title: 'SSO / SAML', description: 'Enterprise identity integration with Okta, Azure AD, and other SAML providers.' },
    { icon: 'HardDrive', title: 'On-Premise', description: 'Deploy entirely within your data center for tighter control over sensitive workflows.' },
    { icon: 'FileCheck', title: 'Audit Logging', description: 'Complete audit trails for regulatory examinations. Built to support your compliance needs.' },
    { icon: 'BarChart3', title: 'Admin Dashboard', description: 'Control model quotas, user access, and usage across your organization.' },
    { icon: 'Lock', title: 'Data Residency', description: 'Choose where your data is stored. US, EU, or your own cloud.' },
    { icon: 'Users', title: 'Role-Based Access', description: 'Fine-grained permissions. Control what each user can access and automate.' },
    { icon: 'FileText', title: 'DLP Integration', description: 'Integrates with existing Data Loss Prevention tools. Protect sensitive data.' },
    { icon: 'Zap', title: 'Enterprise Support', description: 'Deployment guidance, onboarding help, and support for enterprise rollouts.' },
  ],
  workflows: [
    'Deploy in your cloud or on-premise',
    'Configure SSO and user permissions',
    'Set model quotas and usage limits',
    'Monitor compliance with audit logs',
  ],
  stats: [],
  testimonials: [],
  faqs: [
    { question: "How does TEE protect my data?", answer: "Trusted Execution Environments use hardware-level isolation to protect code and data in memory. Vibe supports TEE-oriented deployment paths for teams that need stronger infrastructure controls." },
    { question: "What models can I self-host?", answer: "Any model that exposes an OpenAI-compatible API. Popular choices include DeepSeek, Llama 3, Mistral, and Qwen." },
    { question: "Can this be used in regulated industries?", answer: "Yes. Teams can use local, self-hosted, or TEE-oriented deployment paths and pair them with audit logs and approval workflows that support their own compliance programs." },
    { question: "Does using AI waive attorney-client privilege?", answer: "Organizations with privilege or confidentiality concerns typically prefer local or self-hosted deployments so work stays inside their environment. Specific legal conclusions depend on your counsel and operating model." },
    { question: "Can I use GPT-4 or Claude with Vibe?", answer: "Yes, but only for non-sensitive tasks. For sensitive data, we recommend using local AI, self-hosted models, or TEE-protected inference." },
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
  return <EnterpriseTemplate config={enterpriseConfig} />
}
