import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const momConfig: ProfessionConfig = {
  slug: 'mom',
  name: 'Everyone',
  title: 'So Simple, Even Your Mom Can Use It',
  subtitle: 'AI that just works. No setup. No API keys. No tech degree.',
  gradient: 'from-rose-700 via-pink-600 to-rose-700',
  gradientFrom: 'from-rose-700',
  gradientVia: 'via-pink-600',
  gradientTo: 'to-rose-700',
  accentColor: 'text-rose-300',
  accentBg: 'bg-rose-100 text-rose-700',
  rotatingWords: ['Book Flights', 'Compare Prices', 'Plan Meals', 'Find Dentists', 'Draft Emails', 'Track Deals', 'Fill Forms', 'Research Schools'],
  description: 'There are dozens of AI agents now. Claude Code, OpenClaw, Codex, Cursor. They\'re all incredible -- and they all need a developer to set them up. VibeBrowser is the one that doesn\'t. Install from Chrome Web Store. Type what you want. It works. No strings attached.',
  ctaText: 'Add to Chrome -- Free',
  ctaLink: 'https://chromewebstore.google.com/detail/vibebrowser/djodpgokbmobeclicaicnnidccoinado',
  ctaIsWaitlist: false,
  showDownloadButtons: true,
  features: [
    {
      icon: 'Chrome',
      title: 'One-Click Install',
      description: 'Install from the Chrome Web Store like any extension. No terminal. No downloads. No configuration. Click "Add to Chrome" and you\'re done.',
    },
    {
      icon: 'MessageSquare',
      title: 'Just Type What You Want',
      description: 'Open the sidebar and type in plain English. "Find me flights to Rome under $600." "Summarize my emails." "Compare these products." It figures out the rest.',
    },
    {
      icon: 'Shield',
      title: 'Private by Default',
      description: 'Everything happens in YOUR browser. Your logins, your tabs, your data. The free AI runs 100% on your device -- your data literally never leaves your computer.',
    },
    {
      icon: 'Globe',
      title: 'Works on Any Website',
      description: 'Google Flights, Amazon, Gmail, your bank, your kid\'s school portal -- if you can open it in Chrome, Vibe can help you with it. No special integrations needed.',
    },
    {
      icon: 'DollarSign',
      title: 'Actually Free',
      description: 'The free tier uses AI built into Chrome. No API key. No credit card. No account required. Unlimited use. If you want premium AI models, that\'s $25/mo -- but you don\'t need them to start.',
    },
    {
      icon: 'RefreshCw',
      title: 'Any AI Model',
      description: 'Free local AI. ChatGPT. Claude. Grok. DeepSeek. Bring your own key or use our subscription. Switch anytime. No lock-in to any provider.',
    },
    {
      icon: 'Lock',
      title: 'Your Passwords Stay Safe',
      description: 'Built-in secrets vault types your passwords directly into websites. The AI never sees them. Not in its memory, not in any log, not sent anywhere.',
    },
    {
      icon: 'Zap',
      title: 'Handles Complex Tasks',
      description: 'Multi-step tasks across multiple tabs. "Compare 3 laptops on Amazon" opens 3 tabs, extracts specs, and gives you a comparison table. You just watch.',
    },
  ],
  workflows: [
    '"Book me a flight from Seattle to Tokyo under $800 for next month"',
    '"Summarize my unread emails and draft replies for the important ones"',
    '"Find a good dentist near me with availability this week"',
    '"Compare the top 3 rated robot vacuums on Amazon -- which should I buy?"',
    '"Fill out this form with my information"',
    '"Plan a week of healthy dinners for a family of 4 and make a grocery list"',
  ],
  tools: ['Google Flights', 'Amazon', 'Gmail', 'Google Calendar', 'Google Maps', 'Yelp', 'Target', 'Walmart', 'Zillow', 'WebMD', 'Any Website'],
  stats: [],
  testimonials: [],
  faqs: [
    {
      question: 'Do I need to know anything about AI to use this?',
      answer: 'No. If you can type a sentence, you can use VibeBrowser. Just describe what you want in plain English -- like texting a friend for help -- and it does the rest.',
    },
    {
      question: 'Is it really free?',
      answer: 'Yes. The free tier uses AI built into Chrome (Gemini Nano) that runs entirely on your device. No credit card, no account needed. If you want more powerful AI models like ChatGPT or Claude, that\'s $25/month -- but the free version is fully functional.',
    },
    {
      question: 'Is it safe? Can it see my passwords?',
      answer: 'VibeBrowser runs in your own browser and never sends your data to external servers (when using local AI). It has a built-in secrets vault so your passwords are typed directly into websites without the AI ever seeing them.',
    },
    {
      question: 'How is this different from ChatGPT or Claude?',
      answer: 'ChatGPT and Claude can talk to you. VibeBrowser can act for you. It actually controls your browser -- navigating websites, clicking buttons, filling forms, comparing products. It doesn\'t just give you information; it does the task.',
    },
    {
      question: 'What if it makes a mistake?',
      answer: 'You\'re always in control. Vibe shows you what it\'s doing in real time. You can pause, correct, or take over at any point. It won\'t submit forms or make purchases without you watching.',
    },
    {
      question: 'Why not just use Siri or Google Assistant?',
      answer: 'Voice assistants work with a handful of supported apps. VibeBrowser works on any website you can open in Chrome -- your bank, your kid\'s school portal, airline websites, government forms. If it\'s on the web, Vibe can help.',
    },
    {
      question: 'I\'m a developer. Is there more under the hood?',
      answer: 'Yes. MCP server built-in (Claude Code, Cursor, Codex can control your browser). Skills system for reusable agent instructions. BYOK with any API key. Self-hosted model support via Ollama. But none of that is required for the core experience.',
    },
  ],
  demos: [],
}

export default function MomPage() {
  return <ProfessionTemplate config={momConfig} />
}
