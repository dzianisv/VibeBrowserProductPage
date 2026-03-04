import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const copilotConfig: ProfessionConfig = {
  slug: 'copilot',
  name: 'Copilot Users',
  title: 'GitHub Copilot for Real-World Work',
  subtitle: 'Use your Copilot subscription beyond code',
  gradient: 'from-sky-950 via-indigo-900 to-sky-950',
  gradientFrom: 'from-sky-950',
  gradientVia: 'via-indigo-900',
  gradientTo: 'to-sky-950',
  accentColor: 'text-sky-300',
  accentBg: 'bg-sky-100 text-sky-800',
  rotatingWords: ['Inbox Triage', 'Recruiting Ops', 'CRM Updates', 'Vendor Portals', 'Calendar Coordination', 'Expense Reconciliation', 'Support Routing'],
  description: 'Already paying for GitHub Copilot? Keep your existing subscription and run it inside your browser with Vibe. Vibe can click, type, navigate, and automate routine workflows for non-software teams.',
  showDownloadButtons: true,
  features: [
    { icon: 'Code', title: 'Bring Your Copilot Subscription', description: 'Use your existing GitHub Copilot subscription as your AI backend.' },
    { icon: 'Globe', title: 'Runs in Your Real Browser', description: 'Automates work in the tabs and tools you already use every day.' },
    { icon: 'Workflow', title: 'Routine Task Automation', description: 'Turn repetitive browser work into reusable flows your team can run on demand.' },
    { icon: 'Mail', title: 'Inbox and Follow-Ups', description: 'Draft, triage, and send email follow-ups with context from real web activity.' },
    { icon: 'Calendar', title: 'Calendar Coordination', description: 'Schedule meetings, align stakeholders, and handle rescheduling automatically.' },
    { icon: 'Building2', title: 'Ops Across Portals', description: 'Move data between CRMs, ticketing systems, and vendor portals without manual copy-paste.' },
    { icon: 'Users', title: 'Built for Non-Engineers', description: 'Designed for recruiters, sales, operations, finance, and support teams.' },
    { icon: 'Shield', title: 'Human-in-the-Loop Control', description: 'Stay in control with approvals and visibility before important actions are executed.' },
  ],
  workflows: [
    'Run inbound inbox triage and draft responses for review',
    'Source leads and draft personalized LinkedIn outreach',
    'Update CRM records after calls and email threads',
    'Collect invoices from vendor portals and prepare reconciliation notes',
    'Coordinate interviews and calendar invites across multiple stakeholders',
    'Route support tickets and classify urgency before handoff',
  ],
  tools: ['GitHub Copilot', 'Gmail', 'Google Calendar', 'LinkedIn', 'HubSpot', 'Salesforce', 'Jira', 'Zendesk', 'BYOK Providers'],
  demos: [
    {
      id: 'linkedin-warm-outreach',
      title: 'LinkedIn Warm Outreach',
      subtitle: 'Copilot-powered personalized outreach',
      description: 'Vibe navigates LinkedIn profiles, gathers context, and drafts warm outreach for your approval.',
      badges: ['Recruiting', 'Sales', 'Outreach', 'Automation'],
      videoSrc: '/linkedin-warm-outreach-demo',
    },
    {
      id: 'gmail-inbox-summary',
      title: 'Gmail Inbox Summary',
      subtitle: 'Copilot-powered daily inbox briefing',
      description: 'Vibe scans your inbox in-browser and produces concise summaries with action recommendations.',
      badges: ['Gmail', 'Productivity', 'Prioritization', 'Automation'],
      videoSrc: '/gmail-inbox-summary-demo',
    },
  ],
  faqs: [
    { question: 'Do I need to be a software engineer?', answer: 'No. This page is built for non-engineering workflows in recruiting, sales, operations, finance, and support.' },
    { question: 'Do I need another AI subscription?', answer: 'Not necessarily. If you already have GitHub Copilot, you can use that subscription as your model backend in Vibe.' },
    { question: 'How is this different from using Copilot chat directly?', answer: 'Copilot chat helps with content and reasoning, while Vibe adds browser control so your agent can actually operate websites and complete repetitive tasks.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={copilotConfig} />
}
