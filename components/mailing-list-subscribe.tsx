"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToMailingList } from "../actions/waitlist-supabase"
import { CheckCircle, Loader2, Mail } from "lucide-react"

export function MailingListSubscribe() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await subscribeToMailingList(email)
      if (result.success) {
        setSuccess(true)
        setEmail("")
      } else {
        setError(result.message)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <CheckCircle className="w-4 h-4" />
        <span>Subscribed! Check your inbox.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
        className="h-9 text-sm bg-[#303134] border-[#5f6368] text-[#e8eaed] placeholder:text-[#9aa0a6]"
      />
      <Button
        type="submit"
        size="sm"
        disabled={isLoading}
        className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] h-9 px-4 whitespace-nowrap font-medium"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </Button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  )
}
