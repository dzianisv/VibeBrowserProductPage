import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const salesConfig: ProfessionConfig = {
  slug: 'sales',
  name: 'Sales',
  title: 'AI Sales Assistant with Gmail & CRM Integration',
  subtitle: 'Automate outreach, research, and follow-ups',
  gradient: 'from-green-900 via-green-800 to-green-900',
  gradientFrom: 'from-green-900',
  gradientVia: 'via-green-800',
  gradientTo: 'to-green-900',
  accentColor: 'text-green-300',
  accentBg: 'bg-green-100 text-green-800',
  rotatingWords: ['Outreach', 'Research', 'Follow-ups', 'Demo Prep', 'CRM Updates', 'Lead Gen', 'Pipeline', 'Closing'],
  description: 'Automate your sales workflow with Gmail, CRM, and lead research. Find prospects, draft emails, and close more deals.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownloadButtons: true,
  features: [
    { icon: 'Mail', title: 'Gmail Integration', description: 'Send emails, schedule follow-ups, and manage inbox from Vibe.' },
    { icon: 'Building2', title: 'CRM Automation', description: 'Update Salesforce, HubSpot automatically. No more manual entry.' },
    { icon: 'Search', title: 'Lead Research', description: 'Find company info, news, and contacts with one click.' },
    { icon: 'MessageSquare', title: 'Email Personalization', description: 'Draft unique emails based on prospect research.' },
    { icon: 'Calendar', title: 'Meeting Scheduling', description: 'Find availability and book meetings automatically.' },
    { icon: 'TrendingUp', title: 'Pipeline Management', description: 'Track deals and get alerts on important changes.' },
  ],
  workflows: [
    'Research prospects and enrich with company data',
    'Draft personalized outreach emails with relevant context',
    'Schedule follow-ups and send sequences',
    'Update CRM with meeting notes and next steps',
  ],
  stats: [
    { value: '15hrs', label: 'Saved per week' },
    { value: '35%', label: 'More emails sent' },
    { value: '3x', label: 'More meetings booked' },
  ],
  tools: ['Gmail', 'Google Calendar', 'Salesforce', 'HubSpot', 'LinkedIn', 'Zoom', 'Calendly'],
  testimonials: [
    { quote: "Vibe handles my prospecting research while I focus on selling.", author: "James Mitchell", practice: "Account Executive, Enterprise SaaS" },
    { quote: "Cut my admin time in half. More time for actual conversations.", author: "Rachel Green", practice: "Sales Director, Professional Services" },
  ],
  faqs: [
    { question: 'Is Gmail integration secure?', answer: 'Yes. Uses OAuth. Credentials stored securely, never leave your control.' },
    { question: 'Does it work with my CRM?', answer: 'Salesforce, HubSpot, Pipedrive, and more supported.' },
    { question: 'Can I personalize emails?', answer: 'Yes. Vibe researches each prospect and crafts unique messages.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={salesConfig} />
}
