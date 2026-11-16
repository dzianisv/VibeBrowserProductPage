import type { Metadata } from 'next'
import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

export const metadata: Metadata = {
  title: 'VibeBrowser for Dots — Connect ChatGPT Dots to Your Real Browser',
  description:
    'Dots are OpenAI\'s always-on agents in ChatGPT. They use the apps you connect in ChatGPT — so connect Vibe once in ChatGPT and your dot can use your browser.',
  keywords: [
    'openai dots',
    'dots agent browser',
    'connect dots to browser',
    'dots mcp',
    'dots custom connector',
    'vibebrowser Dots',
  ],
  alternates: { canonical: 'https://www.vibebrowser.app/dots' },
  openGraph: {
    title: 'VibeBrowser for Dots — Connect ChatGPT Dots to Your Real Browser',
    description:
      'There is no separate Dots setup. Connect Vibe once in ChatGPT and your dot can open, read, and act on pages in your real Chrome.',
    url: 'https://www.vibebrowser.app/dots',
  },
}

const config: ProfessionConfig = {
  slug: 'dots',
  name: 'Dots',
  title: 'Connect Dots to your browser',
  subtitle: 'There is no separate Dots setup — dots use your ChatGPT apps',
  gradient: 'from-teal-950 via-cyan-900 to-teal-950',
  gradientFrom: 'from-teal-950',
  gradientVia: 'via-cyan-900',
  gradientTo: 'to-teal-950',
  accentColor: 'text-cyan-300',
  accentBg: 'bg-cyan-100 text-cyan-800',
  rotatingWords: [
    'Page Monitoring',
    'Inbox Checks',
    'Research Tasks',
    'Morning Briefs',
    'Dashboard Reads',
    'Form Filling',
    'Tab Summaries',
    'Link Checking',
  ],
  description:
    'Dots are always-on agents inside ChatGPT, launched by OpenAI on September 29, 2026. A dot runs on its own cloud computer and uses the same apps and connectors you add in ChatGPT — there is no separate Dots connector setup. So the whole setup is the ChatGPT one: add Vibe at chatgpt.com/plugins as a custom MCP server with your connector URL, and your dot can open, read, and act on pages in your real Chrome. Dots need a ChatGPT Pro or Business Premium plan.',
  ctaText: 'Read the setup guide',
  ctaLink: '/integrations/dots',
  features: [
    {
      icon: 'Plug',
      title: 'No separate Dots setup',
      description:
        'People look for a Dots settings page or a Dots connector form. There is none — dots use the apps connected to your ChatGPT account.',
    },
    {
      icon: 'Zap',
      title: 'Always-on agents',
      description:
        'Each dot has its own cloud computer and keeps working between chats. Connect Vibe in ChatGPT once and that dot can use your browser.',
    },
    {
      icon: 'Chrome',
      title: 'Your real Chrome',
      description:
        'A dot works on its own, in the cloud. Through the Vibe app it reaches your real browser and your logged-in pages — dashboards, inbox, admin pages.',
    },
    {
      icon: 'MessageSquare',
      title: 'Just ask your dot',
      description:
        'Open chatgpt.com/dots and pick your dot (or make one). Ask it to open a page or check a site for you — it uses the Vibe app you connected, and your Chrome does the work.',
    },
    {
      icon: 'Clock',
      title: 'Set up once, in ChatGPT',
      description:
        'Go to chatgpt.com/plugins, click Add → Add custom MCP server, name it "Vibe Browser", paste your connector URL, and set Authentication to No Auth. There is nothing else to set up in Dots.',
    },
    {
      icon: 'Lock',
      title: 'One switch cuts access',
      description:
        'You stay in control: remove the app in ChatGPT, or turn off external control in the extension, and every dot loses browser access at once.',
    },
  ],
  workflows: [
    'Ask your dot to open a page you are logged into and summarize it',
    'Have your dot check a dashboard and report the latest numbers',
    'Let your dot research a topic across pages in your browser',
    'Ask your dot to read a long article and give you the key points',
    'Have your dot fill in a web form with details you provide',
  ],
  tools: ['ChatGPT', 'Dots', 'Chrome', 'Gmail', 'Google Drive', 'Notion', 'GitHub', 'Slack'],
  faqs: [
    {
      question: 'What is Dots?',
      answer:
        'Dots are always-on personal agents inside ChatGPT, launched by OpenAI on September 29, 2026. Each dot has its own cloud computer and browser, keeps working between chats, and uses the apps and connectors on your ChatGPT account.',
    },
    {
      question: 'How do I connect Vibe to Dots?',
      answer:
        'You do not connect it in Dots — you connect it in ChatGPT. Add Vibe at chatgpt.com/plugins as a custom MCP server (one URL, Authentication: No Auth), and your dots can use it right away. The setup guide on this site has the screenshots.',
    },
    {
      question: 'Which plan do I need for Dots?',
      answer:
        'Dots are a ChatGPT Pro and Business Premium feature at launch. The Vibe connection itself also needs a paid ChatGPT plan — on a free account the custom MCP server form never opens.',
    },
    {
      question: 'Is there anything to set up inside Dots itself?',
      answer:
        'No. There is no Dots connector setup — the whole setup is the ChatGPT one. Add Vibe in ChatGPT once, keep Chrome open with the extension running, and ask your dot to do the task.',
    },
    {
      question: 'Has a dot been run against Vibe end to end?',
      answer:
        'Not yet. Dots reuse the apps connected in ChatGPT — that connection path is confirmed from OpenAI\'s launch material and hands-on reports, and the ChatGPT setup itself is checked on this site. We have not yet run a dot against Vibe end to end.',
    },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={config} />
}
