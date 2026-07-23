"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Sparkles, Star } from "lucide-react"
import { trackCTAClick } from "@/components/google-analytics"

// Shared pricing content — used on the homepage (#pricing anchor section)
// and on the standalone /pricing route. Keep this the single source of
// truth for tier copy so both surfaces stay in sync.
export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-8 text-center text-white">
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Turn browser-heavy work into reusable workflows
          </Badge>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
            Move recurring browser work off your team’s plate
          </h2>

          <p className="max-w-2xl text-xl opacity-90 mb-4">
            Join early teams using Vibe to reduce repetitive work across websites, Gmail, and Calendar
          </p>

          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 text-xl px-12 py-8 font-bold shadow-2xl"
            onClick={() => {
              trackCTAClick('install_extension', 'pricing_primary')
              window.open('/install?utm_source=pricing_section', '_blank')
            }}
          >
            Install Extension
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Link href="https://billing.stripe.com/p/login/9B6bJ06iPcwL9VUa4yabK00" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-4">
            Already subscribed? Manage billing
          </Link>
          <a
            href="https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('view_cws_reviews', 'pricing_section')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white underline underline-offset-4"
          >
            <Star className="w-4 h-4" />
            See reviews on the Chrome Web Store
          </a>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Free tier with cloud AI</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Setup in 60 seconds</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 w-full max-w-6xl">
            <h3 className="text-2xl font-bold mb-6">Simple Pricing</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h4 className="text-xl font-bold mb-2">Free</h4>
                <p className="text-sm opacity-90 mb-1">Perfect for getting started</p>
                <p className="text-xs opacity-75 mb-4">Includes $1/day cloud AI usage (resets daily)</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Unlimited local AI (Gemini Nano or BYOM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5-mini (quick model)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-OSS-120B (quick model)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>All core features</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left border-2 border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-bold">Pro</h4>
                  <Badge className="bg-white/20 text-white border-white/30">Popular</Badge>
                </div>
                <p className="text-sm opacity-90 mb-1"><span className="text-2xl font-bold">$25</span>/month</p>
                <p className="text-xs opacity-75 mb-1">Advanced AI models</p>
                <p className="text-xs opacity-75 mb-4">Includes $25/month cloud AI usage (resets every 30 days)</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.2-codex (medium/high reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Grok-4-fast (non-reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>DeepSeek-V3.2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h4 className="text-xl font-bold mb-2">Max</h4>
                <p className="text-sm opacity-90 mb-1"><span className="text-2xl font-bold">$99</span>/month</p>
                <p className="text-xs opacity-75 mb-1">Premium AI with reasoning</p>
                <p className="text-xs opacity-75 mb-4">Includes $99/month cloud AI usage (resets every 30 days)</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.2 (latest)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>GPT-5.2-codex (xhigh reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Grok-4 (full reasoning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Grok-4-fast-reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>DeepSeek-R1</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs opacity-75 text-center mt-6 max-w-3xl mx-auto">
              Cloud AI usage budgets cover metered calls to hosted models (OpenAI, xAI, DeepSeek, etc.) and reset on the schedule shown above. On-device AI (Gemini Nano) usage is unlimited on every tier and never counts against your budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
