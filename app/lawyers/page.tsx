import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const lawyersConfig: ProfessionConfig = {
  slug: 'lawyers',
  name: 'Lawyers',
  title: 'AI for Legal Practice Without Waiving Privilege',
  subtitle: 'Research and automate without the Heppner ruling risk',
  gradient: 'from-slate-900 via-slate-800 to-slate-900',
  gradientFrom: 'from-slate-900',
  gradientVia: 'via-slate-800', 
  gradientTo: 'to-slate-900',
  accentColor: 'text-purple-400',
  accentBg: 'bg-purple-100 text-purple-700',
  rotatingWords: ['Corporate Law', 'Litigation', 'IP Law', 'M&A', 'Healthcare Law', 'Real Estate', 'Tax Law', 'Immigration'],
  description: 'After the Heppner ruling, using consumer AI can waive attorney-client privilege. Vibe runs locally or on-premise—so client data never touches third-party servers. Research, draft, and automate without the privilege risk.',
  ctaText: 'Explore Enterprise',
  ctaLink: '/enterprise',
  showDownloadButtons: true,
  features: [
    { icon: 'Shield', title: 'Local-First', description: 'All processing happens on your machine. Client data never leaves your environment.' },
    { icon: 'Lock', title: 'Privilege Protected', description: 'On-premise and self-hosted deployments don\'t share data with third parties—preserving privilege.' },
    { icon: 'FileText', title: 'Legal Research', description: 'Search case databases, extract precedent, draft summaries—all in your secure environment.' },
    { icon: 'Scale', title: 'No Third-Party Risk', description: 'No consumer AI terms to accept. No data sent to Anthropic, OpenAI, or anyone else.' },
    { icon: 'Server', title: 'Self-Hosted', description: 'Deploy entirely on your infrastructure. Run DeepSeek, Llama, or any model you choose.' },
    { icon: 'Cpu', title: 'NVIDIA Jetson Orin', description: 'Full AI privacy on-premise with NVIDIA Jetson Orin Nano Super.' },
    { icon: 'Building2', title: 'CRM Integration', description: 'Works with Clio, NetDocuments, iManage, and your existing legal tools.' },
  ],
  workflows: [
    'Research case law without sending client matters to cloud AI',
    'Draft documents in your secure environment',
    'Cross-reference with private CRM data safely',
    'Maintain complete audit trails for compliance',
  ],
  tools: ['Clio', 'NetDocuments', 'iManage', 'Rocket Matter', 'LexisNexis', 'Westlaw'],
  testimonials: [],
  faqs: [
    { question: 'Can using AI waive attorney-client privilege?', answer: 'After the Heppner ruling, yes—consumer AI tools that train on your inputs or have broad privacy policies can compromise privilege. Vibe\'s local and self-hosted options avoid this by keeping all data in your environment.' },
    { question: 'How does Vibe protect privilege differently than consumer AI?', answer: 'Consumer AI (free ChatGPT, Claude) trains on inputs and has broad privacy policies. Vebe runs entirely locally or on your servers—so there\'s no third party, no data sharing, and no privilege risk.' },
    { question: 'What deployment options are available?', answer: 'Run locally on your Mac/PC, self-host on your infrastructure, or use TEE-oriented cloud deployments. All keep client data under your control.' },
    { question: 'Can Vibe work with our existing legal software?', answer: 'Yes. Integrates with Clio, NetDocuments, iManage, and custom systems.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={lawyersConfig} />
}
