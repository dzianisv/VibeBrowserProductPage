import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const lawyersConfig: ProfessionConfig = {
  slug: 'lawyers',
  name: 'Lawyers',
  title: 'Legal Research AI with TEE Privacy',
  subtitle: 'Automate legal research while keeping client data secure',
  gradient: 'from-slate-900 via-slate-800 to-slate-900',
  gradientFrom: 'from-slate-900',
  gradientVia: 'via-slate-800', 
  gradientTo: 'to-slate-900',
  accentColor: 'text-purple-400',
  accentBg: 'bg-purple-100 text-purple-700',
  rotatingWords: ['Corporate Law', 'Litigation', 'IP Law', 'M&A', 'Healthcare Law', 'Real Estate', 'Tax Law', 'Immigration'],
  description: 'Automate case research while keeping client data in your secure environment. TEE and on-premise deployments protect attorney-client privilege.',
  ctaText: 'Explore Enterprise',
  ctaLink: '/enterprise',
  showDownloadButtons: true,
  features: [
    { icon: 'Shield', title: 'TEE Privacy', description: 'Run AI in Trusted Execution Environment with cryptographic isolation.' },
    { icon: 'Lock', title: 'Privilege Protected', description: 'On-premise and TEE deployments maintain attorney-client privilege.' },
    { icon: 'FileText', title: 'Legal Research', description: 'Search case databases, extract precedent, draft summaries.' },
    { icon: 'Scale', title: 'Compliance-Ready', description: 'SOC 2 path, audit logs, human-in-the-loop approvals.' },
    { icon: 'Server', title: 'Self-Hosted', description: 'Run entirely on your infrastructure. Data never leaves.' },
    { icon: 'Building2', title: 'CRM Integration', description: 'Works with Clio, NetDocuments, iManage, and more.' },
  ],
  workflows: [
    'Search case databases across jurisdictions for precedent',
    'Cross-check precedent notes in private CRM',
    'Draft redaction-safe summaries for client review',
    'Automate due diligence research',
  ],
  tools: ['Clio', 'NetDocuments', 'iManage', 'Rocket Matter', 'LexisNexis', 'Westlaw'],
  testimonials: [
    { quote: "Vibe's TEE deployment let us use AI for case research without risking privilege.", author: "Robert Williams", practice: "Partner, AmLaw 100 Firm - Corporate Litigation" },
    { quote: "We reduced research time by 65% while keeping all client data on-premise.", author: "Amanda Foster", practice: "General Counsel, Regional Healthcare System" },
  ],
  faqs: [
    { question: 'How does TEE protect attorney-client privilege?', answer: 'TEE creates hardware-enclave where data is encrypted during processing. No third party can access.' },
    { question: 'Can Vibe work with our existing legal software?', answer: 'Yes. Integrates with Clio, NetDocuments, iManage, and custom systems.' },
    { question: 'Is Vibe SOC 2 compliant?', answer: 'Compliance roadmap to SOC 2 Type II. TEE option provides additional security controls.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={lawyersConfig} />
}
