"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Sparkles, Star } from "lucide-react"
import { trackCTAClick } from "@/components/google-analytics"

// Purchase entry point. The portal reads `?plan=`, signs the visitor in
// (OAuth or magic link — a cold visitor can create an account), then creates a
// Stripe Checkout session and redirects. This MUST stay a plain top-level
// navigation (anchor), never a fetch: marketing and portal are different
// origins and cannot share a session.
const PORTAL_AUTH_URL = 'https://portal.vibebrowser.app/auth.html'

// utm_source mirrors the Install CTA above so paid-plan clicks are attributable
// to the same surface.
function planCheckoutUrl(plan: 'pro' | 'max') {
  return `${PORTAL_AUTH_URL}?plan=${plan}&utm_source=pricing_section&utm_medium=cta&utm_campaign=plan_${plan}`
}

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
                <p className="text-xs opacity-75 mb-4">Free, no card required</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Unlimited local AI (Gemma 4 on your device or BYOM)</span>
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
                <p className="text-xs opacity-75 mb-4">Cloud AI usage cap: $7/mo (resets each billing period)</p>
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
                <Button
                  asChild
                  className="w-full mt-6 bg-white text-purple-600 hover:bg-slate-100 font-bold shadow-lg"
                >
                  <a
                    href={planCheckoutUrl('pro')}
                    onClick={() => trackCTAClick('get_pro', 'pricing_section')}
                  >
                    Get Pro
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <h4 className="text-xl font-bold mb-2">Max</h4>
                <p className="text-sm opacity-90 mb-1"><span className="text-2xl font-bold">$99</span>/month</p>
                <p className="text-xs opacity-75 mb-1">Premium AI with reasoning</p>
                <p className="text-xs opacity-75 mb-4">Cloud AI usage cap: $28/mo (resets each billing period)</p>
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
                <Button
                  asChild
                  className="w-full mt-6 bg-white/20 text-white border border-white/40 hover:bg-white/30 font-bold"
                >
                  <a
                    href={planCheckoutUrl('max')}
                    onClick={() => trackCTAClick('get_max', 'pricing_section')}
                  >
                    Get Max
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-8 mx-auto max-w-3xl rounded-xl bg-white p-5 text-left text-slate-800 shadow-lg">
              <h4 className="text-base font-bold text-slate-900 mb-3">How the cloud AI allowance works</h4>
              <ul className="text-sm space-y-1.5 mb-3">
                <li><span className="font-semibold">Free:</span> $0 — $0.25 of cloud AI usage per 24 hours.</li>
                <li><span className="font-semibold">Pro:</span> $25/mo — includes $7/mo of cloud AI usage.</li>
                <li><span className="font-semibold">Max:</span> $99/mo — includes $28/mo of cloud AI usage.</li>
              </ul>
              <p className="text-sm leading-relaxed text-slate-700">
                When the allowance runs out, Vibe&apos;s cloud models stop for the rest of the period and the extension tells you so. Free resets after 24 hours; Pro and Max reset each billing period. You can upgrade, or keep working right away with your own API key (OpenAI, Anthropic, Google, and others) or a local model via Ollama — those don&apos;t count against the allowance.
              </p>
            </div>
            <p className="text-xs opacity-75 text-center mt-6 max-w-3xl mx-auto">
              Cloud AI usage caps cover metered calls to hosted models (OpenAI, xAI, DeepSeek, etc.) and are a separate spend limit from your subscription price. Free resets every 24 hours. Pro and Max reset on your own billing date, each time your subscription renews, not on the 1st of the month. On-device AI (Gemma 4) usage is unlimited on every tier and never counts against your cap.
            </p>
            <p className="text-xs opacity-75 text-center mt-2 max-w-3xl mx-auto">
              Cancel anytime. See our <a href="/refund" className="underline">Refund &amp; Cancellation Policy</a> before you subscribe.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
