"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { joinWaitlist } from "../actions/waitlist-supabase"
import { CheckCircle, Loader2, Sparkles, Mail, Zap, Gift } from "lucide-react"
import { trackWaitlistSignup, trackDialogOpen } from "@/components/google-analytics"
import { getStoredReferralData, clearReferralData, type ReferralData } from "@/lib/referral-tracking"

interface WaitlistDialogProps {
  children: React.ReactNode
  tier?: "free" | "pro" | "cloud" | string
}

export function WaitlistDialog({ children, tier = "free" }: WaitlistDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [referralData, setReferralData] = useState<ReferralData | null>(null)

  // Load referral data when dialog opens
  useEffect(() => {
    if (open) {
      // Get stored referral data (captured on page load by ReferralTracker)
      const stored = getStoredReferralData()
      if (stored) {
        setReferralData(stored)
      } else {
        // Fallback: capture current data if nothing stored (shouldn't happen normally)
        const currentData: ReferralData = {
          referral_source: 'direct',
          utm_source: null,
          utm_medium: null,
          utm_campaign: null,
          utm_term: null,
          utm_content: null,
          landing_page: typeof window !== 'undefined' ? window.location.pathname : null,
        }
        
        // Try to get UTM params from URL
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search)
          currentData.utm_source = params.get('utm_source')
          currentData.utm_medium = params.get('utm_medium')
          currentData.utm_campaign = params.get('utm_campaign')
          currentData.utm_term = params.get('utm_term')
          currentData.utm_content = params.get('utm_content')
          
          // Update referral source if UTM source present
          if (currentData.utm_source) {
            currentData.referral_source = currentData.utm_source
          }
        }
        
        setReferralData(currentData)
      }
      
      // Track dialog open
      trackDialogOpen('waitlist_dialog')
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await joinWaitlist(email, tier, referralData ? {
        referral_source: referralData.referral_source || undefined,
        utm_source: referralData.utm_source || undefined,
        utm_medium: referralData.utm_medium || undefined,
        utm_campaign: referralData.utm_campaign || undefined,
        landing_page: referralData.landing_page || undefined,
      } : undefined)

      if (result.success) {
        setSuccess(true)
        setEmail("")
        
        // Track successful signup in GA
        trackWaitlistSignup({
          tier,
          referral_source: referralData?.referral_source,
          utm_source: referralData?.utm_source,
          utm_medium: referralData?.utm_medium,
          utm_campaign: referralData?.utm_campaign,
        })
        
        // Clear stored referral data
        clearReferralData()
        
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
          <DialogTitle className="text-center">Subscribe to Vibe Browser</DialogTitle>
          <DialogDescription className="text-center">
            Stay in the loop and get exclusive benefits
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">You're subscribed!</h3>
              <p className="text-muted-foreground">Check your inbox for a welcome email.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Benefits list */}
            <div className="space-y-3 py-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Developer Updates</p>
                  <p className="text-xs text-muted-foreground">Get notified about new features and releases</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Early Access</p>
                  <p className="text-xs text-muted-foreground">Be first to try the latest features</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Promotion Credits</p>
                  <p className="text-xs text-muted-foreground">Receive free credits and exclusive offers</p>
                </div>
              </div>
            </div>

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
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                No spam, unsubscribe anytime.
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
          <DialogTitle className="text-center">Join the Waitlist</DialogTitle>
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
              We're putting the finishing touches on our interactive demo. In the meantime, subscribe to get notified when it's ready.
            </p>
          </div>

          <WaitlistDialog>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Subscribe for Updates
            </Button>
          </WaitlistDialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}
