import Link from 'next/link'

export function SiteNav() {
  return (
    <nav className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/vibebrowser-logo.png" alt="Vibe AI Browser Co-Pilot" className="w-10 h-10 object-contain" />
        <Link href="/">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
            Vibe AI Browser Co-Pilot
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent sm:hidden">
            Vibe
          </span>
        </Link>
      </div>
      <div className="hidden md:flex gap-6">
        <Link href="/teams" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Co-Pilot for Teams
        </Link>
        <Link href="/enterprise" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Co-Pilot for Enterprise
        </Link>
        <Link href="/mcp" className="text-sm font-medium hover:text-purple-600 transition-colors">
          MCP
        </Link>
        <Link href="/compare" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Compare
        </Link>
        <Link href="/use-cases" className="text-sm font-medium hover:text-purple-600 transition-colors">
          Use Cases
        </Link>
        <span className="text-slate-300">|</span>
        <Link href="/aboutus" className="text-sm font-medium hover:text-purple-600 transition-colors">
          About Us
        </Link>
      </div>
      {/* Mobile navigation */}
      <div className="flex md:hidden flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[11px]">
        <Link href="/teams" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
          Teams
        </Link>
        <Link href="/enterprise" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
          Enterprise
        </Link>
        <Link href="/mcp" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
          MCP
        </Link>
        <Link href="/compare" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
          Compare
        </Link>
        <Link href="/use-cases" className="font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
          Use Cases
        </Link>
      </div>
    </nav>
  )
}
