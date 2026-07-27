"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { track } from "@/lib/analytics"
import { Check, Smartphone } from "lucide-react"

/**
 * Google Play internal-test opt-in link backing the `beta-testers@agentlabs.cc`
 * Google Group. `/api/play-tester` returns this same URL in its response, so the
 * constant is only the fallback when the API response omits it.
 */
export const PLAY_OPT_IN_URL = "https://play.google.com/apps/internaltest/4701574809387172305"

export type FormState = "idle" | "loading" | "ok" | "error"

/**
 * Shared email-capture hook for the site's two funnels (`/api/waitlist` and
 * `/api/play-tester`). Extracted from app/mobile/page.tsx so the tester
 * enrollment funnel can be surfaced on product pages too.
 */
export function useEmailForm(endpoint: string, successEvent?: string, page = "/mobile") {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<FormState>("idle")
  const [message, setMessage] = useState<string>("")
  const [optInUrl, setOptInUrl] = useState<string>("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "loading") return
    setState("loading")
    setMessage("")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        optInUrl?: string
      }
      if (res.ok && data.ok) {
        setState("ok")
        if (data.optInUrl) setOptInUrl(data.optInUrl)
        if (successEvent) track(successEvent, { page })
      } else {
        setState("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setState("error")
      setMessage("Network error. Please try again.")
    }
  }

  return { email, setEmail, state, message, optInUrl, submit }
}

type PlayTesterSignupProps = {
  /** Analytics page label for the `play_tester_submitted` event. */
  page: string
  title?: string
  blurb?: string
  className?: string
}

/**
 * Internal-test enrollment card: POST /api/play-tester adds the address to the
 * Google Group that backs the Play closed-test track (and to Brevo), then shows
 * the Play opt-in link as the final step.
 *
 * ⚠️ AGENTPOD MOBILE ONLY. `/api/play-tester` is hard-coded to AgentPod's Brevo
 * list and AgentPod's internal-test track, so rendering this card on another
 * product's page enrolls that product's visitors into AgentPod. Do not mount it
 * outside /mobile until the route takes a product key. The `page` prop is an
 * analytics label — it does NOT scope the enrollment.
 */
export function PlayTesterSignup({
  page,
  title = "Become an early tester",
  blurb = "Join the Android internal test track. Enter your Google account email — we add you to the tester list, then you finish installing from Google Play.",
  className = "border border-[#3c4043] bg-[#141414] shadow-none",
}: PlayTesterSignupProps) {
  const tester = useEmailForm("/api/play-tester", "play_tester_submitted", page)

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <Smartphone size={16} className="text-[#fdd663]" />
          <h3 className="font-semibold text-base text-[#e8eaed]">{title}</h3>
        </div>
        <p className="text-sm text-[#9aa0a6] mb-5 leading-relaxed">{blurb}</p>
        {tester.state === "ok" ? (
          <div className="rounded-lg border border-[#81c995]/30 bg-[#81c995]/5 p-4">
            <div className="flex items-center gap-2 text-[#81c995] mb-2">
              <Check size={16} />
              <span className="text-sm font-medium">You&apos;re on the tester list.</span>
            </div>
            <p className="text-sm text-[#9aa0a6] mb-3">
              Final step: open the Play opt-in link on the same Google account to install.
            </p>
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium w-full"
            >
              <a
                href={tester.optInUrl || PLAY_OPT_IN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Play opt-in
              </a>
            </Button>
          </div>
        ) : (
          <form onSubmit={tester.submit} className="space-y-3">
            <input
              type="email"
              required
              value={tester.email}
              onChange={(e) => tester.setEmail(e.target.value)}
              placeholder="you@gmail.com"
              className="w-full rounded-md border border-[#3c4043] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#fdd663]/50 focus:outline-none focus:ring-1 focus:ring-[#fdd663]/30"
            />
            <Button
              type="submit"
              disabled={tester.state === "loading"}
              className="bg-[#fdd663] hover:bg-[#ffe28a] text-[#0a0a0a] font-medium w-full"
            >
              {tester.state === "loading" ? "Adding you…" : "Join the test track"}
            </Button>
            {tester.state === "error" && (
              <p className="text-sm text-[#f28b82]">{tester.message}</p>
            )}
            <p className="text-xs text-[#5f6368]">
              Use a Google account email — the Play test track is tied to your Google login.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
