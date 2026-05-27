import Link from 'next/link'

export function AgentlabsBlogNav() {
  return (
    <header className="border-b border-[#3c4043] bg-[#202124]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 md:px-6">
        <Link href="/" className="font-semibold tracking-tight text-[#e8eaed]">
          Agent Labs
        </Link>
        <Link href="/blog" className="text-sm font-medium text-[#8ab4f8] hover:text-[#aecbfa]">
          Blog
        </Link>
      </div>
    </header>
  )
}
