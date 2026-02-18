import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const researchersConfig: ProfessionConfig = {
  slug: 'researchers',
  name: 'Researchers',
  title: 'AI Research Assistant for Academic & Market Research',
  subtitle: 'Search, summarize, and synthesize findings',
  gradient: 'from-teal-900 via-teal-800 to-teal-900',
  gradientFrom: 'from-teal-900',
  gradientVia: 'via-teal-800',
  gradientTo: 'to-teal-900',
  accentColor: 'text-teal-300',
  accentBg: 'bg-teal-100 text-teal-800',
  rotatingWords: ['Academic Research', 'Literature Review', 'Market Analysis', 'Competitive Intel', 'Due Diligence', 'Data Synthesis', 'Paper Analysis', 'Trend Research'],
  description: 'Search academic databases, summarize papers, and synthesize findings. Vibe handles the research legwork so you can focus on insights. Supports subagents and parallel execution for deep research.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownloadButtons: true,
  features: [
    { icon: 'Search', title: 'Multi-Source Search', description: 'Search arXiv, PubMed, Google Scholar, and more from one interface.' },
    { icon: 'Zap', title: 'Parallel Execution', description: 'Run multiple searches simultaneously. Deep research in a fraction of the time.' },
    { icon: 'Users', title: 'Subagents', description: 'Deploy multiple AI agents to cover different angles of your research question.' },
    { icon: 'FileText', title: 'Smart Summarization', description: 'Get AI summaries of papers, articles, and reports.' },
    { icon: 'Bookmark', title: 'Citation Management', description: 'Extract citations in APA, MLA, Chicago, or BibTeX.' },
    { icon: 'Shield', title: 'Privacy Options', description: 'TEE and on-premise for sensitive research.' },
    { icon: 'Database', title: 'Database Integration', description: 'Connect to any academic or market database.' },
    { icon: 'Library', title: 'Literature Review', description: 'Automate finding and synthesizing relevant papers.' },
  ],
  workflows: [
    'Find papers on transformer attention mechanisms since 2020',
    'Summarize key findings across multiple papers',
    'Generate literature review outlines',
    'Research companies for competitive analysis',
  ],
  stats: [
    { value: '80%', label: 'Less time on reviews' },
    { value: '50+', label: 'Sources searched' },
    { value: '10x', label: 'Faster analysis' },
  ],
  tools: ['arXiv', 'PubMed', 'Google Scholar', 'Zotero', 'EndNote', 'Notion'],
  testimonials: [
    { quote: "Vibe found papers I'd never discover with keyword searches.", author: "Dr. Alex Kim", practice: "PhD Candidate, Machine Learning" },
    { quote: "Cut literature review time from weeks to days.", author: "Maria Santos", practice: "Research Lead, Think Tank" },
  ],
  faqs: [
    { question: 'What databases does Vibe support?', answer: 'arXiv, PubMed, Google Scholar, SSRN, and any authenticated database.' },
    { question: 'Can Vibe help with literature reviews?', answer: 'Yes. Describe your research question and Vibe finds papers, extracts themes, and drafts outlines.' },
    { question: 'Is Vibe suitable for sensitive research?', answer: 'Yes. TEE and on-premise deployments available.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={researchersConfig} />
}
