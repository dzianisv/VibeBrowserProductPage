"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const pageNames: Record<string, string> = {
  '/aboutus': '',
  '/copilot': 'for Copilot Users',
  '/people': 'for People',
  '/lawyers': 'for Lawyers',
  '/recruiters': 'for Recruiters',
  '/sales': 'for Sales',
  '/amazon': 'for Amazon Sellers',
  '/researchers': 'for Researchers',
  '/developers': 'for Developers',
  '/investors': 'for Investors',
  '/crypto': 'for Crypto & DeFi',
  '/tax': 'for Tax',
}

const forPages = [
  { href: '/copilot', label: 'Copilot Users' },
  { href: '/people', label: 'People' },
  { href: '/lawyers', label: 'Lawyers' },
  { href: '/recruiters', label: 'Recruiters' },
  { href: '/sales', label: 'Sales' },
  { href: '/amazon', label: 'Amazon' },
  { href: '/researchers', label: 'Researchers' },
  { href: '/developers', label: 'Developers' },
  { href: '/investors', label: 'Investors' },
  { href: '/crypto', label: 'Crypto & DeFi' },
  { href: '/tax', label: 'Tax' },
]

const darkPages = ['/teams', '/enterprise']

export function SiteNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const currentPage = forPages.find(p => p.href === pathname)
  const isDark = darkPages.includes(pathname)

  return (
    <nav className={`w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b sticky top-0 z-50 ${
      isDark 
        ? 'bg-[#202124]/95 backdrop-blur-sm border-[#3c4043]' 
        : 'bg-white/80 backdrop-blur-sm border-slate-200'
    }`}>
      <div className="flex items-center gap-1">
        <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-10 h-10 object-contain" />
        <Link href="/">
          <span className={`text-xl font-bold bg-clip-text text-transparent ${
            isDark 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          }`}>
            Vibe Co-Pilot
          </span>
        </Link>
        
        {/* Inline dropdown for "for" pages */}
        {currentPage && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-1 text-xl font-bold transition-colors ${
                isDark 
                  ? 'text-[#9aa0a6] hover:text-[#e8eaed]' 
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              <span>for</span>
              <span className={isDark ? 'text-[#e8eaed]' : 'text-slate-700'}>{currentPage.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <>
                <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
                <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 rounded-lg shadow-lg border py-2 z-50 ${
                  isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'
                }`}>
                  {forPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === page.href 
                          ? (isDark ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium')
                          : (isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed] hover:bg-[#3c4043]' : 'text-slate-600 hover:bg-slate-100')
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
          isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-slate-600 hover:text-purple-600'
        }`}>
          Blog
        </Link>
        <Link href="/aboutus" className={`text-sm font-medium transition-colors ${
          isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'hover:text-purple-600'
        }`}>
          About Us
        </Link>
      </div>
      {/* Mobile navigation */}
      <div className="flex items-center gap-4 md:hidden">
        <Link href="/blog" className={`text-[11px] font-medium transition-colors whitespace-nowrap ${
          isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'text-slate-600 hover:text-purple-600'
        }`}>
          Blog
        </Link>
        <Link href="/aboutus" className={`text-[11px] font-medium transition-colors whitespace-nowrap ${
          isDark ? 'text-[#9aa0a6] hover:text-[#e8eaed]' : 'hover:text-purple-600'
        }`}>
          About Us
        </Link>
      </div>
    </nav>
  )
}
