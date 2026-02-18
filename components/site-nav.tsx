"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export function SiteNav() {
  const pathname = usePathname()
  const pageSuffix = pageNames[pathname] || ''

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
