"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const pageNames: Record<string, string> = {
  '/aboutus': '',
  '/mcp': 'for Agents',
  '/openclaw': 'for OpenClaw',
  '/copilot': 'for Copilot Users',
  '/people': 'for People',
  '/lawyers': 'for Lawyers',
  '/recruiters': 'for Recruiters',
  '/sales': 'for Sales',
  '/researchers': 'for Researchers',
  '/developers': 'for Developers',
  '/investors': 'for Investors',
  '/crypto': 'for Crypto & DeFi',
  '/tax': 'for Tax',
}

const forPages = [
  { href: '/mcp', label: 'Agents' },
  { href: '/openclaw', label: 'OpenClaw' },
  { href: '/copilot', label: 'Copilot Users' },
  { href: '/people', label: 'People' },
  { href: '/lawyers', label: 'Lawyers' },
  { href: '/recruiters', label: 'Recruiters' },
  { href: '/sales', label: 'Sales' },
  { href: '/researchers', label: 'Researchers' },
  { href: '/developers', label: 'Developers' },
  { href: '/investors', label: 'Investors' },
  { href: '/crypto', label: 'Crypto & DeFi' },
  { href: '/tax', label: 'Tax' },
]

const darkPages = ['/mcp', '/openclaw', '/teams', '/enterprise', '/providers/ollama']

export function SiteNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const currentPage = forPages.find(p => p.href === pathname)
  const isBlog = pathname?.startsWith('/blog')
  const isDark = darkPages.includes(pathname) || isBlog
  const isOpenClaw = pathname === '/openclaw'

  return (
    <nav className={`w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b sticky top-0 z-50 ${
      isOpenClaw
        ? 'bg-[#050810]/95 backdrop-blur-sm border-[rgba(136,146,176,0.15)]'
        : isDark
        ? 'bg-[#202124]/95 backdrop-blur-sm border-[#3c4043]' 
        : 'bg-white/80 backdrop-blur-sm border-slate-200'
    }`}>
      <div className="flex items-center gap-1">
        <img src="/vibebrowser-logo.png" alt="VibeBrowser Co-Pilot" className="w-10 h-10 object-contain" />
        <Link href="/">
          <span className={`text-xl font-bold ${
            isOpenClaw
              ? 'text-[#f0f4ff]'
              : isDark 
              ? 'text-[#e8eaed]' // plain white-ish text for dark mode, no pink gradient
              : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
          }`}>
            VibeBrowser Co-Pilot
          </span>
        </Link>
        
        {/* Inline dropdown for "for" pages */}
        {currentPage && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-1 text-xl font-bold transition-colors ${
                isOpenClaw
                  ? 'text-[#aeb7d4] hover:text-[#f0f4ff]'
                  : isDark 
                  ? 'text-[#9aa0a6] hover:text-[#e8eaed]' 
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              <span>for</span>
              <span className={isOpenClaw ? 'text-[#f0f4ff]' : isDark ? 'text-[#e8eaed]' : 'text-slate-700'}>{currentPage.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <>
                <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
                <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 rounded-lg shadow-lg border py-2 z-50 ${
                  isOpenClaw ? 'bg-[#050810] border-[rgba(136,146,176,0.15)]' : isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'
                }`}>
                  {forPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === page.href 
                          ? (isOpenClaw ? 'text-[#ff6b6b] font-medium' : isDark ? 'text-[#8ab4f8] font-medium' : 'text-purple-600 font-medium')
                          : (isOpenClaw ? 'text-[#aeb7d4] hover:text-[#f0f4ff] hover:bg-[rgba(158,158,255,0.08)]' : isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed] hover:bg-[#3c4043]' : 'text-slate-600 hover:bg-slate-100')
                      }`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link href="/blog" className={`text-sm font-medium transition-colors ${
          isOpenClaw ? 'text-[#aeb7d4] hover:text-[#f0f4ff]' : isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-slate-600 hover:text-purple-600'
        }`}>
          Blog
        </Link>
        <Link href="/aboutus" className={`text-sm font-medium transition-colors ${
          isOpenClaw ? 'text-[#aeb7d4] hover:text-[#f0f4ff]' : isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'hover:text-purple-600'
        }`}>
          About Us
        </Link>
      </div>
      {/* Mobile navigation */}
      <div className="flex items-center gap-4 md:hidden">
        <Link href="/blog" className={`text-[11px] font-medium transition-colors whitespace-nowrap ${
          isOpenClaw ? 'text-[#aeb7d4] hover:text-[#f0f4ff]' : isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-slate-600 hover:text-purple-600'
        }`}>
          Blog
        </Link>
        <Link href="/aboutus" className={`text-[11px] font-medium transition-colors whitespace-nowrap ${
          isOpenClaw ? 'text-[#aeb7d4] hover:text-[#f0f4ff]' : isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'hover:text-purple-600'
        }`}>
          About Us
        </Link>
      </div>
    </nav>
  )
}
