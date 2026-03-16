import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const recruitersConfig: ProfessionConfig = {
  slug: 'recruiters',
  name: 'Recruiters',
  title: 'LinkedIn Automation & Skills-Based Recruiting',
  subtitle: 'Automate LinkedIn recruiting with skills-based outreach',
  gradient: 'from-blue-900 via-blue-800 to-blue-900',
  gradientFrom: 'from-blue-900',
  gradientVia: 'via-blue-800',
  gradientTo: 'to-blue-900',
  accentColor: 'text-blue-300',
  accentBg: 'bg-blue-100 text-blue-800',
  rotatingWords: ['Tech Recruiting', 'Sales', 'Executive Search', 'Healthcare', 'Finance', 'Engineering', 'Marketing', 'HR'],
  description: 'Find the right candidates faster. Vibe searches LinkedIn, matches skills, drafts personalized outreach, and manages your CRM.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownloadButtons: true,
  features: [
    { icon: 'Search', title: 'Skills-Based Sourcing', description: 'Define a skills rubric and Vibe finds matching candidates.' },
    { icon: 'MessageSquare', title: 'Personalized Outreach', description: 'Draft messages referencing specific projects and experience.' },
    { icon: 'Users', title: 'CRM Integration', description: 'Automatically log outreach in Greenhouse, Lever, Bullhorn.' },
    { icon: 'CheckCircle', title: 'Human-in-the-Loop', description: 'All messages queue for your approval before sending.' },
    { icon: 'Linkedin', title: 'LinkedIn Automation', description: 'Work inside authenticated LinkedIn sessions.' },
    { icon: 'Target', title: 'Skills Matrix', description: 'Define requirements. Vibe scores candidates against criteria.' },
  ],
  workflows: [
    'Find senior engineers with React and Node experience open to hybrid work',
    'Draft personalized messages referencing specific achievements',
    'Update CRM status and schedule follow-ups automatically',
    'Research salary ranges and competitor teams',
  ],
  stats: [],
  tools: ['LinkedIn', 'Greenhouse', 'Lever', 'Bullhorn', 'Indeed', 'Glassdoor', 'Ashby', 'JazzHR'],
  testimonials: [],
  faqs: [
    { question: 'Can Vibe send LinkedIn messages automatically?', answer: 'Vibe drafts and queues messages for your approval before sending.' },
    { question: 'Does Vibe work with my ATS/CRM?', answer: 'Yes. Integrates with Greenhouse, Lever, Bullhorn, Ashby, and most major platforms.' },
    { question: 'How should teams use this with platform policies?', answer: 'Teams should review each workflow against the policies of the platforms they use. Vibe supports human approval before sensitive actions.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={recruitersConfig} />
}
