"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const pageNames: Record<string, string> = {
  '/aboutus': '',
  '/people': 'for People',
  '/teams': 'for Teams',
  '/enterprise': 'for Enterprise',
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
  { href: '/people', label: 'People' },
  { href: '/teams', label: 'Teams' },
  { href: '/enterprise', label: 'Enterprise' },
  { href: '/lawyers', label: 'Lawyers' },
  { href: '/recruiters', label: 'Recruiters' },
  { href: '/sales', label: 'Sales' },
  { href: '/researchers', label: 'Researchers' },
  { href: '/developers', label: 'Developers' },
  { href: '/investors', label: 'Investors' },
  { href: '/crypto', label: 'Crypto & DeFi' },
  { href: '/tax', label: 'Tax' },
]

export function SiteNav() {
  const pathname = usePathname()
  const pageSuffix = pageNames[pathname] || ''
  const [isOpen, setIsOpen] = useState(false)

  const currentPage = forPages.find(p => p.href === pathname)

  return (
    <nav className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-10 h-10 object-contain" />
        <Link href="/">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe Co-Pilot {pageSuffix && <span className="text-slate-500">{pageSuffix}</span>}
          </span>
        </Link>
      </div>

      {/* Center: Vertical slider/dropdown for "for" pages */}
      {currentPage && (
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
          >
            {currentPage.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                {forPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-slate-100 transition-colors ${
                      pathname === page.href ? 'text-purple-600 font-medium' : 'text-slate-600'
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

      <div className="hidden md:flex gap-6">
        <Link href="/aboutus" className="text-sm font-medium hover:text-purple-600 transition-colors">
          About Us
        </Link>
      </div>
      {/* Mobile navigation */}
      <div className="flex md:hidden">
        <Link href="/aboutus" className="text-[11px] font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
          About Us
        </Link>
      </div>
    </nav>
  )
}
