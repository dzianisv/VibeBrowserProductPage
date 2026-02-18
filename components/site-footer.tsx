"use client"

import Link from 'next/link'
import { MailingListSubscribe } from './mailing-list-subscribe'

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container max-w-7xl px-4 md:px-6 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-8 h-8 object-contain" />
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Vibe Co-Pilot
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The agentic browser that doesn't just answer — it operates the web for you.
            </p>
          </div>

          {/* Vibe Co-Pilot for */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Vibe Co-Pilot for</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/people" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                People
              </Link>
              <Link href="/teams" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Teams
              </Link>
              <Link href="/enterprise" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Enterprise
              </Link>
              <Link href="/lawyers" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Lawyers
              </Link>
              <Link href="/recruiters" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Recruiters
              </Link>
              <Link href="/sales" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Sales
              </Link>
              <Link href="/researchers" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Researchers
              </Link>
              <Link href="/developers" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Developers
              </Link>
              <Link href="/investors" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Investors
              </Link>
              <Link href="/crypto" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Crypto & DeFi
              </Link>
              <Link href="/tax" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Tax
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="https://docs.vibebrowser.app" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Documentation
              </Link>
              <Link href="/mcp" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                MCP Server
              </Link>
              <Link href="/agentic-team" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Agentic Team
              </Link>
              <Link href="https://docs.vibebrowser.app/getting-started/extension" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Developer Install
              </Link>
              <Link href="/tee" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                TEE Research Paper
              </Link>
              <Link href="/aboutus" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Contact</h3>
            <div className="flex flex-col gap-3">
              <Link href="mailto:info@vibebrowser.app" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                info@vibebrowser.app
              </Link>
              <Link href="https://linkedin.com/company/vibebrowser" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                LinkedIn
              </Link>
              <Link href="https://x.com/vibebrowserapp" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                X (Twitter)
              </Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
                Telegram Community
              </Link>
            </div>
          </div>

          {/* Dev Mailing List */}
          <div className="space-y-4">
            <MailingListSubscribe />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-xs text-center text-muted-foreground">
            © 2026 Vibe Co-Pilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
