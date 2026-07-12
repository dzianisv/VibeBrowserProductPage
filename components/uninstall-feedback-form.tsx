"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { trackUninstallFeedback } from "@/components/google-analytics"

const REASONS = [
  { value: "too_expensive", label: "Too expensive" },
  { value: "didnt_work", label: "Didn't work on my sites" },
  { value: "usage_limits", label: "Hit usage limits" },
  { value: "found_alternative", label: "Found an alternative" },
  { value: "privacy_concerns", label: "Privacy concerns" },
  { value: "other", label: "Other" },
] as const

interface UninstallFeedbackFormProps {
  v: string | null
  src: string | null
}

export function UninstallFeedbackForm({ v, src }: UninstallFeedbackFormProps) {
  const [reason, setReason] = useState("")
  const [otherReason, setOtherReason] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      return
    }

    trackUninstallFeedback({
      reason,
      otherReason: reason === "other" ? otherReason : undefined,
      v,
      src,
      email: email || undefined,
    })

    setSubmitted(true)
  }

  const handleSkip = () => {
    trackUninstallFeedback({ reason: "skipped", v, src })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle className="h-10 w-10 text-purple-600" />
        <h2 className="text-xl font-bold">Thanks for letting us know</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          We read every response. If you ever want to give Vibe another try, we&apos;ll be here.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm text-left">
      <fieldset>
        <legend className="text-sm font-semibold mb-4">What made you uninstall?</legend>
        <div className="space-y-3">
          {REASONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50"
            >
              <input
                type="radio"
                name="reason"
                value={option.value}
                checked={reason === option.value}
                onChange={(e) => setReason(e.target.value)}
                required
                className="h-4 w-4 accent-purple-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {reason === "other" && (
        <div className="mt-4">
          <Label htmlFor="other-reason" className="mb-1.5 block text-sm">
            Tell us more (optional)
          </Label>
          <textarea
            id="other-reason"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="What happened?"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      )}

      <div className="mt-6">
        <Label htmlFor="email" className="mb-1.5 block text-sm">
          Email (optional — if you&apos;d like us to follow up)
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          disabled={!reason}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Send Feedback
        </Button>
        <Button type="button" variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>
    </form>
  )
}
