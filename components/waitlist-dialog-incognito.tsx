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
import { CheckCircle, Loader2, Mail, Zap, Gift, EyeOff, Shield, Lock } from "lucide-react"
import { trackWaitlistSignup, trackDialogOpen } from "@/components/google-analytics"
import { getStoredReferralData, clearReferralData, type ReferralData } from "@/lib/referral-tracking"

interface WaitlistDialogIncognitoProps {
  children: React.ReactNode
  tier?: "free" | "pro" | "enterprise" | "mobile"
}

export function WaitlistDialogIncognito({ children, tier = "enterprise" }: WaitlistDialogIncognitoProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [referralData, setReferralData] = useState<ReferralData | null>(null)

  // Load referral data when dialog opens
  useEffect(() => {
    if (open) {
      const stored = getStoredReferralData()
      if (stored) {
        setReferralData(stored)
      } else {
        const currentData: ReferralData = {
          referral_source: 'direct',
          utm_source: null,
          utm_medium: null,
          utm_campaign: null,
          utm_term: null,
          utm_content: null,
          landing_page: typeof window !== 'undefined' ? window.location.pathname : null,
        }
        
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search)
          currentData.utm_source = params.get('utm_source')
          currentData.utm_medium = params.get('utm_medium')
          currentData.utm_campaign = params.get('utm_campaign')
          currentData.utm_term = params.get('utm_term')
          currentData.utm_content = params.get('utm_content')
          
          if (currentData.utm_source) {
            currentData.referral_source = currentData.utm_source
          }
        }
        
        setReferralData(currentData)
      }
      
      trackDialogOpen('waitlist_dialog_incognito')
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
        
        trackWaitlistSignup({
          tier,
          referral_source: referralData?.referral_source,
          utm_source: referralData?.utm_source,
          utm_medium: referralData?.utm_medium,
          utm_campaign: referralData?.utm_campaign,
        })
        
        clearReferralData()
        
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
      setEmail("")
      setError("")
      setSuccess(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#202124] border-[#3c4043] text-[#e8eaed]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#3c4043] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#8ab4f8]" />
            </div>
          </div>
          <DialogTitle className="text-center text-[#e8eaed]">Request Enterprise Access</DialogTitle>
          <DialogDescription className="text-center text-[#9aa0a6]">
            Get early access to Vibe AI Browser · Private Enterprise
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-12 h-12 bg-[#81c995]/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-[#81c995]" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg text-[#e8eaed]">You're on the list!</h3>
              <p className="text-[#9aa0a6]">We'll be in touch shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Benefits list - Incognito themed */}
            <div className="space-y-3 py-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8ab4f8]/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-[#8ab4f8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e8eaed]">Privacy-First AI</p>
                  <p className="text-xs text-[#9aa0a6]">Local AI, self-hosted, or TEE-protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#81c995]/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-[#81c995]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e8eaed]">Compliance Ready</p>
                  <p className="text-xs text-[#9aa0a6]">Audit logs, review steps, and flexible deployment options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#fdd663]/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-[#fdd663]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e8eaed]">Priority Onboarding</p>
                  <p className="text-xs text-[#9aa0a6]">Dedicated support and custom integration</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#9aa0a6]">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="bg-[#292a2d] border-[#3c4043] text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#8ab4f8] focus:ring-[#8ab4f8]"
              />
              {error && <p className="text-sm text-[#f28b82]">{error}</p>}
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Access"
                )}
              </Button>

              <p className="text-xs text-[#5f6368] text-center">
                No spam. We respect your privacy.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
