import Link from 'next/link'

export function AgentlabsBlogFooter() {
  return (
    <footer className="border-t border-[#3c4043] bg-[#202124]">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 text-sm text-[#9aa0a6] md:px-6">
        <p>
          Built by{' '}
          <Link href="/" className="font-medium text-[#8ab4f8] hover:text-[#aecbfa]">
            Agent Labs
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
