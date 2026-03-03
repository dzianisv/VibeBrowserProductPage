import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const taxConfig: ProfessionConfig = {
  slug: 'tax',
  name: 'Tax',
  title: 'AI Tax Preparation',
  subtitle: 'Automated tax preparation for professionals',
  gradient: 'from-emerald-700 via-green-600 to-emerald-700',
  gradientFrom: 'from-emerald-700',
  gradientVia: 'via-green-600',
  gradientTo: 'to-emerald-700',
  accentColor: 'text-emerald-300',
  accentBg: 'bg-emerald-100 text-emerald-700',
  rotatingWords: ['1099', 'W2', 'Tax Returns', 'Deductions', 'Estimates', 'Extensions'],
  description: 'Login to financial institutions, download tax forms, estimate taxes, and help fill returns. All credentials securely stored in encrypted vault.',
  showDownloadButtons: true,
  contactEmail: 'sales@vibebrowser.app',
  features: [
    { icon: 'Key', title: 'Credential Vault', description: 'Securely store login credentials for banks, brokerages, and financial institutions. AES-256 encrypted.' },
    { icon: 'Download', title: 'Form Downloads', description: 'Automatically download 1099, W2, 1098, and other tax forms from all your accounts.' },
    { icon: 'Calculator', title: 'Tax Estimation', description: 'LLM estimates your tax liability based on downloaded forms and income data.' },
    { icon: 'FileText', title: 'Return Filing', description: 'Help fill tax returns. Review and approve before submission.' },
    { icon: 'Clock', title: 'Extension Filing', description: 'Automatically file extensions if you need more time.' },
    { icon: 'Shield', title: 'Privacy First', description: 'Local AI processing. Credentials never leave your encrypted vault.' },
    { icon: 'Cpu', title: 'NVIDIA Jetson Orin', description: 'Works with self-hosted LLMs on NVIDIA Jetson Orin Nano Super. Full AI privacy on-premise.' },
  ],
  workflows: [
    'Connect bank/brokerage accounts via secure credential vault',
    'Download all tax forms (1099, W2, 1098)',
    'LLM analyzes forms and estimates tax liability',
    'Help fill tax returns - you review and approve',
  ],
  tools: ['Banks', 'Brokerages', 'TurboTax', 'H&R Block', 'IRS', 'State DMVs'],
}

export default function Page() {
  return <ProfessionTemplate config={taxConfig} />
}
