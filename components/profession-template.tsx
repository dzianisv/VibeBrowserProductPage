"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SiteNav } from '@/components/site-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { WaitlistDialogIncognito } from '@/components/waitlist-dialog-incognito'
import { SiteFooter } from '@/components/site-footer'
import { ArrowRight, CheckCircle, Shield, Lock, FileText, Scale, Eye, Server, Building2, Clock, Globe, Mail, Calendar, Search, Database, BookOpen, Bookmark, TrendingUp, Users, UserPlus, Target, Bell, Code, Terminal, Plug, Cloud, Workflow, DollarSign, Microscope, Library, Zap, MessageSquare, Linkedin, ShoppingCart, Briefcase, Plane, UserMinus, Phone, Stethoscope, Headphones, Building, RefreshCw, Wallet, Download, Smartphone, Chrome, Calculator } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Shield, Lock, FileText, Scale, Eye, Server, Building2, Clock, Globe, Mail, Calendar, Search, Database, BookOpen, Bookmark, TrendingUp, Users, UserPlus, Target, Bell, Code, Terminal, Plug, Cloud, Workflow, DollarSign, Microscope, Library, Zap, MessageSquare, Linkedin, ShoppingCart, Briefcase, Plane, UserMinus, Phone, Stethoscope, Headphones, Building, RefreshCw, Wallet, Download, Smartphone, Chrome, Calculator
}

export interface ProfessionFeature {
  icon: string
  title: string
  description: string
}

export interface ProfessionTestimonial {
  quote: string
  author: string
  practice: string
}

export interface ProfessionFAQ {
  question: string
  answer: string
}

export interface ProfessionConfig {
  slug: string
  name: string
  title: string
  subtitle: string
  gradient: string
  gradientFrom: string
  gradientVia: string
  gradientTo: string
  accentColor: string
  accentBg: string
  rotatingWords: string[]
  description: string
  ctaText?: string
  ctaLink?: string
  ctaIsMailto?: boolean
  ctaIsWaitlist?: boolean
  showDownload?: boolean
  showDownloadButtons?: boolean
  contactEmail?: string
  features: ProfessionFeature[]
  workflows?: string[]
  tools?: string[]
  stats?: { value: string; label: string }[]
  testimonials?: ProfessionTestimonial[]
  faqs?: ProfessionFAQ[]
}

interface ProfessionTemplateProps {
  config: ProfessionConfig
}

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState(words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        } else {
          setDisplayText(displayText.slice(0, -1))
        }
      } else {
        const nextWord = words[wordIndex]
        if (displayText === nextWord) {
          setIsPaused(true)
        } else {
          setDisplayText(nextWord.slice(0, displayText.length + 1))
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}

function Icon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Shield
  return <IconComponent className={className} />
}

export default function ProfessionTemplate({ config }: ProfessionTemplateProps) {
  const rotatingWord = useTypewriter(config.rotatingWords, 100, 60, 2500)

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      
      {/* Hero */}
      <header className={`bg-gradient-to-br ${config.gradient} text-white`}>
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className={`mb-6 ${config.accentBg} hover:${config.accentBg}`}>
              Vibe Co-Pilot for {config.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              AI for <span className={config.accentColor}>{rotatingWord}</span>
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              {config.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {config.showDownloadButtons ? (
                <>
                  <Button size="lg" className={`${config.gradientFrom.replace('from-', 'bg-')} hover:opacity-90 text-white rounded-full px-8 font-semibold`}>
                    <a href="https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado" target="_blank" className="flex items-center">
                      <Chrome className="mr-2 h-5 w-5" />
                      Chrome Extension
                    </a>
                  </Button>
                  <WaitlistDialogIncognito tier="mobile">
                    <Button size="lg" variant="outline" className={`border-2 rounded-full px-8 font-semibold ${config.accentColor.replace('text-', 'border-').replace('300', '500')} ${config.accentColor} hover:opacity-80`}>
                      <Smartphone className="mr-2 h-5 w-5" />
                      Mobile App
                    </Button>
                  </WaitlistDialogIncognito>
                </>
              ) : config.ctaIsMailto ? (
                <Button size="lg" className={`${config.gradientFrom.replace('from-', 'bg-')} hover:opacity-90 text-white rounded-full px-8 font-semibold`}>
                  <a href={config.ctaLink}>
                    {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : config.ctaIsWaitlist ? (
                <WaitlistDialogIncognito>
                  <Button size="lg" className={`${config.gradientFrom.replace('from-', 'bg-')} hover:opacity-90 text-white rounded-full px-8 font-semibold cursor-pointer`}>
                    {config.ctaText || 'Get Started'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </WaitlistDialogIncognito>
              ) : config.ctaLink ? (
                <Button asChild size="lg" className={`${config.accentColor.replace('text-', 'bg-').replace('400', '500')} hover:opacity-90 text-white rounded-full px-8 font-semibold`}>
                  <Link href={config.ctaLink}>
                    {config.ctaText || 'Get Started'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Download Buttons (Rabby-style) */}
      {config.showDownload && (
        <section className="py-8 border-b border-slate-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={`${config.gradientFrom.replace('from-', 'bg-')} hover:opacity-90 text-white rounded-full px-8 font-semibold`}>
                <Chrome className="mr-2 h-5 w-5" />
                Download for Chrome
              </Button>
              <WaitlistDialogIncognito>
                <Button size="lg" variant="outline" className={`border-2 rounded-full px-8 font-semibold ${config.accentColor.replace('text-', 'border-').replace('300', '500')} ${config.accentColor} hover:opacity-80`}>
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download for Mobile
                </Button>
              </WaitlistDialogIncognito>
            </div>
          </div>
        </section>
      )}

      {/* Benefits/Features */}
      <section className="py-16 md:py-24 border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why {config.name} Choose Vibe
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {config.features.slice(0, 4).map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <Icon name={feature.icon} className={`w-10 h-10 ${config.accentColor} mb-4`} />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Key Capabilities
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                <Icon name={feature.icon} className={`w-8 h-8 ${config.accentColor} mb-4`} />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      {config.workflows && config.workflows.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Common Workflows
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {config.workflows.map((workflow, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm">{workflow}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      {config.stats && config.stats.length > 0 && (
        <section className={`py-16 md:py-24 ${config.gradient}`}>
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              {config.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      {config.tools && config.tools.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Works With Your Tools
              </h2>
            </div>
            <div className="flex flex-wrap gap-8 justify-center items-center opacity-70">
              {config.tools.map((tool) => (
                <div key={tool} className="text-xl font-semibold text-slate-400">{tool}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {config.testimonials && config.testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by {config.name} Professionals</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {config.testimonials.map((testimonial) => (
                <div key={testimonial.author} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <p className="text-lg mb-4 italic text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-slate-500 text-sm">{testimonial.practice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {config.faqs.map((faq) => (
                  <div key={faq.question} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={`py-16 md:py-24 ${config.gradient}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to automate your {config.name.toLowerCase()} work?
          </h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">
            Join {config.name.toLowerCase()} professionals using Vibe Co-Pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {config.ctaIsMailto ? (
              <Button size="lg" className={`bg-white hover:bg-slate-100 rounded-full px-8 ${config.gradientFrom.replace('from-', 'text-')}`}>
                <a href={config.ctaLink}>
                  {config.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              ) : config.ctaIsWaitlist ? (
                <WaitlistDialogIncognito>
                  <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-700 rounded-full px-8 font-semibold cursor-pointer">
                    {config.ctaText || 'Get Started'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </WaitlistDialogIncognito>
              ) : config.ctaLink ? (
                <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-700 rounded-full px-8 font-semibold">
                  <Link href={config.ctaLink}>
                    {config.ctaText || 'Get Started'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : null}
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <SiteFooter />
    </div>
  )
}
