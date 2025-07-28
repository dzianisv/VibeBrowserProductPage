"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { joinWaitlist } from "../actions/waitlist"
import { CheckCircle, Loader2, Sparkles } from "lucide-react"

interface WaitlistDialogProps {
  children: React.ReactNode
  tier?: "free" | "pro"
}

export function WaitlistDialog({ children, tier = "free" }: WaitlistDialogProps) {
  const [open, setOpen] = useState(false)
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
      const result = await joinWaitlist(email)

      if (result.success) {
        setSuccess(true)
        setEmail("")
        // Close dialog after 2 seconds
        setTimeout(() => {
          setOpen(false)
          setSuccess(false)
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when dialog closes
      setEmail("")
      setError("")
      setSuccess(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Join the Vibe Browser Waitlist</DialogTitle>
          <DialogDescription className="text-center">
            {tier === "pro"
              ? "Get early access to Vibe Browser Pro with unlimited AI queries and advanced automation."
              : "Be among the first to experience AI-native browsing with 30 free AI queries daily."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">You're on the list!</h3>
              <p className="text-muted-foreground">We'll notify you as soon as Vibe Browser is ready.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We'll only use your email to notify you about Vibe Browser updates. No spam, unsubscribe anytime.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface ComingSoonDialogProps {
  children: React.ReactNode
}

export function ComingSoonDialog({ children }: ComingSoonDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Demo Coming Soon</DialogTitle>
          <DialogDescription className="text-center">
            We're working hard to bring you an amazing demo experience.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground mb-4">
              We're putting the finishing touches on our interactive demo. In the meantime, join our waitlist to be the
              first to try Vibe Browser when it launches.
            </p>
          </div>

          <WaitlistDialog>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Join Waitlist Instead
            </Button>
          </WaitlistDialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}
