import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const developersConfig: ProfessionConfig = {
  slug: 'developers',
  name: 'Developers',
  title: 'Browser Automation MCP & CLI',
  subtitle: 'Build AI-powered browser automation',
  gradient: 'from-slate-900 via-slate-800 to-slate-900',
  gradientFrom: 'from-slate-900',
  gradientVia: 'via-slate-800',
  gradientTo: 'to-slate-900',
  accentColor: 'text-purple-400',
  accentBg: 'bg-purple-100 text-purple-700',
  rotatingWords: ['Web Scraping', 'E2E Testing', 'Form Automation', 'Data Extraction', 'Browser Control', 'CI/CD', 'AI Agents', 'Workflows'],
  description: 'NPM CLI tool for controlling Playwright MCP with our AI agent. Remote browser access, MCP protocol support, and self-hosted deployment.',
  showDownloadButtons: true,
  features: [
    { icon: 'Terminal', title: 'NPM CLI', description: 'Install via npm. Control your browser from the command line with our AI agent.' },
    { icon: 'Cloud', title: 'Remote Access', description: 'Access your browser from anywhere via relay.api.vibebrowser.app' },
    { icon: 'Plug', title: 'MCP Protocol', description: 'Full Model Context Protocol. Connect Claude, Cursor, Windsurf.' },
    { icon: 'Code', title: '25+ Tools', description: 'Screenshot, click, type, scroll, extract data, fill forms.' },
    { icon: 'Server', title: 'Self-Hostable', description: 'Run your own MCP server. Keep data in your infrastructure.' },
    { icon: 'Key', title: 'Credential Vault', description: 'Securely store and manage browser credentials.' },
    { icon: 'Workflow', title: 'Google Workspace', description: 'Built-in support for Gmail, Sheets, Docs.' },
  ],
  workflows: [
    'Install via npm and control browser from CLI',
    'Connect Claude or Cursor to automate browser tasks',
    'Write end-to-end tests using natural language',
    'Extract structured data from any website',
    'Run browser automation in your CI pipeline',
  ],
  tools: ['npm', 'Claude Desktop', 'Cursor', 'Windsurf', 'VS Code', 'OpenAI', 'Gemini'],
  demos: [
    {
      id: 'github-ticket',
      title: 'GitHub Ticket Automation',
      subtitle: 'AI-powered GitHub issue automation',
      description: 'Vibe AI Agent autonomously handles GitHub tasks - creating issues, updating status, and managing repositories.',
      badges: ['GitHub', 'Issue Management', 'Automation', 'AI Agent'],
      videoSrc: '/github-ticket-demo',
    },
  ],
  faqs: [
    { question: 'What is relay.api.vibebrowser.app?', answer: 'Secure WebSocket relay to connect to your browser from anywhere over HTTPS.' },
    { question: 'How does Vibe MCP differ from Playwright?', answer: 'Playwright is focused on testing. Vibe is designed for AI agent workflows.' },
    { question: 'Can I self-host?', answer: 'Yes. Open-source and can be deployed on your infrastructure.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={developersConfig} />
}
