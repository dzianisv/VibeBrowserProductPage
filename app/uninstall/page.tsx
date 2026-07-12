import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { UninstallFeedbackForm } from '@/components/uninstall-feedback-form'

export const metadata: Metadata = {
  title: 'Sorry to see you go — VibeBrowser Co-Pilot',
  description: 'Quick feedback before you go — help us make VibeBrowser Co-Pilot better.',
  robots: { index: false, follow: false },
}

function firstParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null
  }
  return value ?? null
}

interface UninstallPageProps {
  searchParams: Promise<{ v?: string | string[]; src?: string | string[] }>
}

export default async function UninstallPage({ searchParams }: UninstallPageProps) {
  const params = await searchParams
  const v = firstParam(params.v)
  const src = firstParam(params.src)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-white">
      <SiteNav />
      <main className="flex-1">
        <div className="container max-w-2xl px-4 md:px-6 mx-auto py-16 md:py-24">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Sorry to see you go
            </h1>
            <p className="text-muted-foreground">
              VibeBrowser Co-Pilot has been uninstalled. Mind sharing why? It takes 10 seconds and helps us fix what&apos;s broken.
            </p>
          </div>

          <UninstallFeedbackForm v={v} src={src} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
