import {
  Bot,
  Briefcase,
  Code2,
  Cpu,
  Globe,
  Lightbulb,
  Linkedin,
  Mail,
  MessageCircle,
  Plug,
  Shield,
  Users,
  Wrench,
  Zap,
} from "lucide-react"

import type { CompanyProfileConfig } from "./types"

const baseCompanyProfileConfig: CompanyProfileConfig = {
  rotatingWords: ["write code", "design AI systems", "ship products", "create AI agents"],
  desktopNav: [
    { href: "/", label: "Browser Co-Pilot" },
    { href: "/agentic-team", label: "Agentic Team" },
    { href: "/enterprise", label: "Enterprise" },
    { href: "/teams", label: "Team" },
  ],
  mobileNav: [
    { href: "/", label: "Co-Pilot" },
    { href: "/agentic-team", label: "Agentic" },
    { href: "/enterprise", label: "Enterprise" },
  ],
  teamMembers: [
    {
      name: "Dzianis Vashchuk",
      role: "Founder",
      photo: "/images/dennis-vashchuk.jpg",
      linkedin: "https://www.linkedin.com/in/dzianisv/",
      icon: Code2,
      color: "#8ab4f8",
    },
    {
      name: "Dzmitry Dalenka",
      role: "ML Engineer",
      photo: "/images/dzmitry-dalenka.jpg",
      linkedin: "https://www.linkedin.com/in/dzmitry-dalenka/",
      icon: Cpu,
      color: "#81c995",
    },
    {
      name: "Dzmitry Kastsenich",
      role: "Software Engineer",
      photo: "/images/dima-kostenich.jpg",
      linkedin: "https://www.linkedin.com/in/dima-kostenich/",
      icon: Wrench,
      color: "#f6aea9",
    },
    {
      name: "Alexander Dzerakh",
      role: "Product Consultant",
      photo: "/images/alexander-dzerakh.jpg",
      linkedin: "https://www.linkedin.com/in/alexander-dzerakh",
      icon: Lightbulb,
      color: "#fdd663",
    },
  ],
  products: [
    {
      title: "Vibe Co-Pilot",
      badge: "Personal - Teams - Enterprise",
      description:
        "AI-powered browser automation for everyone. Available as a Chrome extension or standalone browser. Tell it what you need in plain English - it navigates sites, fills forms, drafts messages, and researches across dozens of tabs. Supports any LLM including fully local AI via Gemini Nano. Teams get shared workflows and admin controls. Enterprises get TEE-oriented deployment paths, SSO, and dedicated onboarding support.",
      tags: [
        "Chrome Extension",
        "Chromium Fork",
        "Deep Research",
        "Web Automation",
        "Any LLM",
        "Local AI",
        "SSO",
        "TEE Security",
        "Audit Logs",
      ],
      icon: Globe,
      iconColor: "text-[#8ab4f8]",
      iconBg: "bg-[#8ab4f8]/10",
      borderHoverClass: "hover:border-[#8ab4f8]/40",
      actions: [
        { href: "/", label: "Personal", colorClass: "text-[#8ab4f8]" },
        { href: "/teams", label: "Teams", colorClass: "text-[#81c995]" },
        { href: "/enterprise", label: "Enterprise", colorClass: "text-[#f6aea9]" },
      ],
    },
    {
      title: "Vibe Agentic Team",
      badge: "Multi-Agent",
      description:
        "A team of specialized AI agents that collaborate over Slack. Each agent has its own role, tools, and context window - solving the #1 problem with single-agent systems: context flooding. Fully configurable roles for any workflow.",
      tags: ["Slack Integration", "OpenHands", "OpenClaw", "Configurable Roles"],
      icon: Users,
      iconColor: "text-[#81c995]",
      iconBg: "bg-[#81c995]/10",
      borderHoverClass: "hover:border-[#81c995]/40",
      actions: [{ href: "/agentic-team", label: "Learn More", colorClass: "text-[#81c995]" }],
    },
    {
      title: "VibeBrowser Cloud",
      badge: "Infrastructure - Agents",
      description:
        "Chrome-DevTools compatible MCP working in the cloud. We deploy Chrome instances across different regions so your agents can control browsers securely over HTTPS. Comes with a web console, API, and CLI to manage instances, transfer credentials safely, and connect your AI agents seamlessly.",
      tags: ["Chrome-DevTools MCP", "Global Regions", "Web Console", "API & CLI", "Open Source"],
      icon: Globe,
      iconColor: "text-[#8ab4f8]",
      iconBg: "bg-[#8ab4f8]/10",
      borderHoverClass: "hover:border-[#8ab4f8]/40",
      actions: [{ href: "/cloud", label: "Learn More", colorClass: "text-[#8ab4f8]" }],
    },
    {
      title: "OpenClaw Bot",
      badge: "Telegram Bot",
      description:
        "AI-powered Telegram bot for task automation and intelligent conversations. Access powerful AI models directly from Telegram - research, summarize, translate, code, and more without leaving your chat.",
      tags: ["Telegram", "Multi-Model", "Research", "Code Generation"],
      icon: MessageCircle,
      iconColor: "text-[#fdd663]",
      iconBg: "bg-[#fdd663]/10",
      borderHoverClass: "hover:border-[#fdd663]/40",
      actions: [
        {
          href: "https://oclawbox.com",
          label: "Visit oclawbox.com",
          colorClass: "text-[#fdd663]",
          external: true,
        },
      ],
    },
    {
      title: "LaMooM",
      badge: "Built on OpenClaw",
      description:
        "AI assistant widget that embeds directly into B2B SaaS products. Shows users a plain-language plan before any action runs - they approve, then LaMooM does the work. Built on top of OpenClaw's browser automation engine.",
      tags: ["B2B SaaS Widget", "OpenClaw Powered", "User Approval Flow", "In Development"],
      icon: MessageCircle,
      iconColor: "text-[#c58af9]",
      iconBg: "bg-[#c58af9]/10",
      borderHoverClass: "hover:border-[#c58af9]/40",
      actions: [
        {
          href: "https://dev.lamoom.com",
          label: "Visit dev.lamoom.com",
          colorClass: "text-[#c58af9]",
          external: true,
        },
      ],
    },
    {
      title: "QuantArena",
      badge: "AI-Native Hedge Fund",
      description:
        "Public performance leaderboard for AlphaVibe, our AI-native hedge fund. Tracks a multi-model trading arena and publishes live P&L charts, model results, and waitlist access.",
      tags: ["Live Leaderboard", "Multi-Model Arena", "P&L Charts", "Crypto Perps"],
      icon: Cpu,
      iconColor: "text-[#8ab4f8]",
      iconBg: "bg-[#8ab4f8]/10",
      borderHoverClass: "hover:border-[#8ab4f8]/30",
      actions: [
        {
          href: "https://quantarena.xyz",
          label: "Visit quantarena.xyz",
          colorClass: "text-[#8ab4f8]",
          external: true,
        },
      ],
    },
    {
      title: "Vibe Co-Pilot MCP",
      badge: "Open Source",
      description:
        "Open-source MCP server with 25+ tools that connects AI coding agents to your real browser. Control Chrome, automate workflows, access Google Workspace, and manage credentials - all from Claude, Cursor, or VS Code.",
      tags: ["Open Source", "25+ Tools", "Multi-Agent", "Claude", "Cursor", "VS Code"],
      icon: Plug,
      iconColor: "text-[#c58af9]",
      iconBg: "bg-[#c58af9]/10",
      borderHoverClass: "hover:border-[#c58af9]/30",
      actions: [{ href: "/mcp", label: "Learn More", colorClass: "text-[#c58af9]" }],
      contentClassName: "p-6",
    },
    {
      title: "OpenCode Manager",
      badge: "Open Source - PWA",
      description:
        "Mobile-first web interface for OpenCode AI agents. Manage multiple agents from any device with Git integration, file management, and real-time chat in a responsive PWA. One-click deployment with Docker.",
      tags: [
        "Mobile-first",
        "Multi-Agent",
        "Git Integration",
        "File Manager",
        "Real-time Chat",
        "Docker",
      ],
      icon: Code2,
      iconColor: "text-[#f6aea9]",
      iconBg: "bg-[#f6aea9]/10",
      borderHoverClass: "hover:border-[#f6aea9]/40",
      actions: [
        {
          href: "https://github.com/dzianisv/opencode-manager",
          label: "View on GitHub",
          colorClass: "text-[#f6aea9]",
          external: true,
        },
      ],
    },
    {
      title: "Opencode Mobile",
      badge: "Open Source - Mobile App",
      description:
        "Open-source iOS and Android app for controlling your self-hosted Opencode AI coding agent. Connect over LAN, Cloudflare Tunnel, ngrok, or Tailscale to manage sessions, stream responses, review diffs, and approve tool calls from your phone while keeping credentials in the device keystore.",
      tags: [
        "iOS + Android",
        "Self-Hosted Opencode",
        "Streaming Chat",
        "Diff Viewer",
        "Tool Approval",
        "Biometric Unlock",
      ],
      icon: Bot,
      iconColor: "text-[#81c995]",
      iconBg: "bg-[#81c995]/10",
      borderHoverClass: "hover:border-[#81c995]/40",
      actions: [
        {
          href: "https://github.com/dzianisv/opencode-mobile",
          label: "View on GitHub",
          colorClass: "text-[#81c995]",
          external: true,
        },
      ],
    },
  ],
  principles: [
    {
      title: "Privacy First",
      description:
        "Local AI, TEE enclaves, and zero-knowledge architectures. Your data stays yours. We build for trust, not lock-in.",
      icon: Shield,
      iconClassName: "text-[#8ab4f8]",
    },
    {
      title: "Model Agnostic",
      description:
        "Every product works with multiple AI providers. GPT, Claude, Gemini, Grok, DeepSeek - use what works best for your task and budget.",
      icon: Bot,
      iconClassName: "text-[#81c995]",
    },
    {
      title: "Human in the Loop",
      description:
        "AI proposes, humans decide. Nothing is sent, submitted, or purchased without explicit approval. Automation with guardrails.",
      icon: Zap,
      iconClassName: "text-[#fdd663]",
    },
  ],
  contacts: [
    { label: "info@vibebrowser.app", href: "mailto:info@vibebrowser.app", icon: Mail },
    { label: "sales@vibebrowser.app", href: "mailto:sales@vibebrowser.app", icon: Briefcase },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/vibebrowser",
      icon: Linkedin,
      external: true,
    },
    { label: "X", href: "https://x.com/vibebrowserapp", external: true },
    { label: "Telegram", href: "https://t.me/VibeBrowser", icon: MessageCircle, external: true },
  ],
  heroContactHref: "mailto:info@vibebrowser.app",
  footerContactHref: "mailto:info@vibebrowser.app",
}

function cloneCompanyProfileConfig(config: CompanyProfileConfig): CompanyProfileConfig {
  return {
    ...config,
    desktopNav: [...config.desktopNav],
    mobileNav: [...config.mobileNav],
    teamMembers: [...config.teamMembers],
    products: [...config.products],
    principles: [...config.principles],
    contacts: [...config.contacts],
  }
}

export const vibebrowserCompanyProfileConfig = cloneCompanyProfileConfig(baseCompanyProfileConfig)

export const agentlabsCompanyProfileConfig = cloneCompanyProfileConfig(baseCompanyProfileConfig)

agentlabsCompanyProfileConfig.contacts = [
  { label: "info@agentlabs.cc", href: "mailto:info@agentlabs.cc", icon: Mail },
  { label: "sales@agentlabs.cc", href: "mailto:sales@agentlabs.cc", icon: Briefcase },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/vibebrowser",
    icon: Linkedin,
    external: true,
  },
  { label: "X", href: "https://x.com/vibebrowserapp", external: true },
  { label: "Telegram", href: "https://t.me/VibeBrowser", icon: MessageCircle, external: true },
]
agentlabsCompanyProfileConfig.heroContactHref = "mailto:info@agentlabs.cc"
agentlabsCompanyProfileConfig.footerContactHref = "mailto:info@agentlabs.cc"
agentlabsCompanyProfileConfig.headerBackgroundClassName =
  "bg-[#2f2f2f]/95 supports-[backdrop-filter]:bg-[#2f2f2f]/80"

// Add internal "Learn More" link for the Opencode Mobile product card on agentlabs.cc
agentlabsCompanyProfileConfig.products = agentlabsCompanyProfileConfig.products.map((product) => {
  if (product.title === "Opencode Mobile") {
    return {
      ...product,
      actions: [
        { href: "/opencode-mobile", label: "Learn More", colorClass: "text-[#81c995]" },
        ...product.actions,
      ],
    }
  }
  return product
})
