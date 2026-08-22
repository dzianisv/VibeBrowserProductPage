"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, XCircle, Scale, MessageCircle } from "lucide-react"

export default function RefundPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/vibebrowser-logo.png" alt="Vibe Co-Pilot" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vibe Co-Pilot
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/pricing" className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Refund &amp; Cancellation Policy</h1>
            <p className="text-muted-foreground">Last updated: August 2026 | Provider: Vibe Technologies, LLC</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">How billing works</h2>
                  <p className="text-muted-foreground">
                    Pro and Max plans are recurring monthly subscriptions billed in advance through Stripe. Your
                    subscription automatically renews each billing period until you cancel. We do not currently offer
                    annual plans.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Cancellation</h2>
                  <p className="text-muted-foreground mb-2">
                    You can cancel your subscription at any time from your account/billing settings, or by emailing{" "}
                    <a href="mailto:support@vibebrowser.app" className="text-purple-600 hover:underline">support@vibebrowser.app</a>.
                  </p>
                  <p className="text-muted-foreground">
                    Cancellation takes effect at the end of your current billing period. You keep access to your paid
                    plan until then. We do not charge a cancellation fee.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Refunds</h2>
                  <p className="text-muted-foreground mb-2">
                    <strong>General rule:</strong> charges already billed for the current period are non-refundable,
                    and we do not prorate refunds for a partial month when you cancel or downgrade mid-cycle. You will
                    not be billed again after cancellation takes effect.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Billing errors:</strong> if you were charged in error — duplicate charge, charged after a
                    cancellation you made before the renewal date, or charged for a plan you did not select — email{" "}
                    <a href="mailto:support@vibebrowser.app" className="text-purple-600 hover:underline">support@vibebrowser.app</a>{" "}
                    and we will correct it, including a full refund of the erroneous charge.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>EU/UK consumers:</strong> where applicable law grants you a statutory right of withdrawal
                    for digital services purchased online (e.g. the EU Consumer Rights Directive's 14-day withdrawal
                    period), that right is not waived by this policy and continues to apply on top of it. Contact{" "}
                    <a href="mailto:support@vibebrowser.app" className="text-purple-600 hover:underline">support@vibebrowser.app</a>{" "}
                    to exercise it.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Discretionary exceptions:</strong> outside of the above, refunds are not guaranteed but may
                    be granted case by case — for example, if the product did not work for you shortly after signing
                    up. Email support and we will look at it; this is a discretionary courtesy, not a contractual
                    entitlement.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">How to request a refund or dispute a charge</h2>
                  <p className="text-muted-foreground">
                    Email <a href="mailto:support@vibebrowser.app" className="text-purple-600 hover:underline">support@vibebrowser.app</a>{" "}
                    with your account email and the charge date. See our{" "}
                    <Link href="/telemetry" className="text-purple-600 hover:underline">Support page</Link> for our
                    response target. Please contact us before filing a chargeback with your bank or card issuer — we
                    can usually resolve a billing issue faster than a chargeback dispute, and a chargeback may result
                    in immediate suspension of your account pending resolution.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center text-sm text-muted-foreground pt-4">
              <p>
                Questions? Email <a href="mailto:support@vibebrowser.app" className="text-purple-600 hover:underline">support@vibebrowser.app</a>.
                See also our <Link href="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full border-t bg-white py-8">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto text-center">
          <p className="text-sm text-muted-foreground">© 2026 Vibe Technologies, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
