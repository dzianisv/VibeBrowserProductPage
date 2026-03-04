"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MailingListSubscribe } from './mailing-list-subscribe'

const darkPages = ['/teams', '/enterprise']

export function SiteFooter() {
  const pathname = usePathname()
  const isDark = darkPages.includes(pathname)

  return (
    <footer className={`w-full border-t ${
      isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'
    }`}>
      <div className="container max-w-7xl px-4 md:px-6 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-8 h-8 object-contain" />
              <span className={`font-bold text-lg bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              }`}>
                Vibe Co-Pilot
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-[#9aa0a6]' : 'text-muted-foreground'}`}>
              The agentic browser that doesn't just answer — it operates the web for you.
            </p>
          </div>

          {/* Vibe Co-Pilot for */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-sm ${isDark ? 'text-[#e8eaed]' : ''}`}>Vibe Co-Pilot for</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/copilot', label: 'Copilot Users' },
                { href: '/people', label: 'People' },
                { href: '/teams', label: 'Teams' },
                { href: '/enterprise', label: 'Enterprise' },
                { href: '/lawyers', label: 'Lawyers' },
                { href: '/recruiters', label: 'Recruiters' },
                { href: '/sales', label: 'Sales' },
                { href: '/amazon', label: 'Amazon' },
                { href: '/researchers', label: 'Researchers' },
                { href: '/developers', label: 'Developers' },
                { href: '/investors', label: 'Investors' },
                { href: '/crypto', label: 'Crypto & DeFi' },
                { href: '/tax', label: 'Tax' },
              ].map((page) => (
                <Link 
                  key={page.href} 
                  href={page.href} 
                  className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}
                >
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-sm ${isDark ? 'text-[#e8eaed]' : ''}`}>Resources</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/mcp', label: 'MCP Server' },
                { href: '/agentic-team', label: 'Agentic Team' },
                { href: 'https://docs.vibebrowser.app/getting-started/extension', label: 'Developer Install' },
                { href: '/tee', label: 'TEE Research Paper' },
                { href: 'https://docs.vibebrowser.app', label: 'Documentation' },
              ].map((page) => (
                <Link 
                  key={page.href} 
                  href={page.href} 
                  className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}
                >
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-sm ${isDark ? 'text-[#e8eaed]' : ''}`}>Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-sm ${isDark ? 'text-[#e8eaed]' : ''}`}>Contact</h3>
            <div className="flex flex-col gap-3">
              <Link href="mailto:info@vibebrowser.app" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                info@vibebrowser.app
              </Link>
              <Link href="https://linkedin.com/company/vibebrowser" target="_blank" rel="noopener noreferrer" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                LinkedIn
              </Link>
              <Link href="https://x.com/vibebrowserapp" target="_blank" rel="noopener noreferrer" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                X (Twitter)
              </Link>
              <Link href="https://t.me/VibeBrowser" target="_blank" rel="noopener noreferrer" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                Telegram Community
              </Link>
              <Link href="/aboutus" className={`text-sm transition-colors ${isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-muted-foreground hover:text-purple-600'}`}>
                About Us
              </Link>
            </div>
          </div>

          {/* Dev Mailing List - only show on non-dark pages */}
          {!isDark && (
            <div className="space-y-4">
              <MailingListSubscribe />
            </div>
          )}
        </div>

        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-[#3c4043]' : 'border-slate-200'}`}>
          <p className={`text-xs text-center ${isDark ? 'text-[#5f6368]' : 'text-muted-foreground'}`}>
            © 2026 Vibe Co-Pilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
