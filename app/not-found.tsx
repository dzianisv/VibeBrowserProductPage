import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold">404 — Page Not Found</h1>
        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist.
        </p>
        <div className="mt-8">
          <Link className="text-blue-600 hover:underline" href="/">
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
