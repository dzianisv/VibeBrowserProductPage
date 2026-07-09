"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Linkedin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import type { CompanyProfileConfig } from "./types"

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

export function CompanyProfilePage({ config }: { config: CompanyProfileConfig }) {
  const rotatingWord = useTypewriter(config.rotatingWords, 100, 60, 2500)
  const headerBackgroundClassName =
    config.headerBackgroundClassName ?? "bg-[#0a0a0a]/95 supports-[backdrop-filter]:bg-[#0a0a0a]/60"

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8eaed]">
      <header className={`sticky top-0 z-50 w-full border-b border-[#3c4043] backdrop-blur ${headerBackgroundClassName}`}>
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/aboutus" className="flex items-center gap-3">
            <img src="/vibebrowser-logo.png" alt="Vibe Technologies" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-[#e8eaed]">Vibe Technologies</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {config.desktopNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-[#9aa0a6] transition-colors hover:text-[#e8eaed]">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="flex gap-3 md:hidden">
            {config.mobileNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs font-medium text-[#9aa0a6] transition-colors hover:text-[#e8eaed]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto max-w-5xl px-4 text-center md:px-6">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#8ab4f8]/20 bg-[#8ab4f8]/10 px-4 py-1.5">
              <Users className="h-4 w-4 text-[#8ab4f8]" />
              <span className="text-sm text-[#8ab4f8]">About Us</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              We <span className="text-[#8ab4f8]">{rotatingWord}</span>
              <span className="animate-pulse text-[#8ab4f8]">|</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-[#9aa0a6] md:text-xl">
              A small team of engineers building AI tools that actually do the work. We automate the boring stuff so you can focus on what matters.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/">
                <Button size="lg" className="h-auto rounded-full bg-[#8ab4f8] px-8 py-6 font-medium text-[#0a0a0a] hover:bg-[#aecbfa]">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button asChild size="lg" variant="outline" className="h-auto rounded-full border-[#3c4043] bg-transparent px-8 py-6 font-medium text-[#e8eaed] hover:bg-[#1a1a1a]">
                <a href={config.heroContactHref}>Contact Us</a>
              </Button>
            </div>
          </div>
        </section>

        {config.spotlightProduct ? (
          <section className="w-full border-t border-[#1e1e1e] bg-[#111111] py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
              <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl md:mx-0 ${config.spotlightProduct.iconBg}`}
                >
                  <config.spotlightProduct.icon className={`h-10 w-10 ${config.spotlightProduct.iconColor}`} />
                </div>
                <div className="text-center md:text-left">
                  <div
                    className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${config.spotlightProduct.borderClassName} ${config.spotlightProduct.iconBg}`}
                  >
                    <span className={`text-sm ${config.spotlightProduct.iconColor}`}>
                      {config.spotlightProduct.eyebrow}
                    </span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                    {config.spotlightProduct.headline}
                  </h2>
                  <p className="mx-auto mb-6 max-w-2xl text-lg text-[#9aa0a6] md:mx-0 md:text-xl">
                    {config.spotlightProduct.description}
                  </p>
                  <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
                    {config.spotlightProduct.tags.map((tag) => (
                      <span key={tag} className="rounded bg-[#2a2a2a] px-2 py-1 text-xs text-[#9aa0a6]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                    <Link
                      href={config.spotlightProduct.primaryAction.href}
                      target={config.spotlightProduct.primaryAction.external ? "_blank" : undefined}
                      rel={config.spotlightProduct.primaryAction.external ? "noopener noreferrer" : undefined}
                    >
                      <Button
                        size="lg"
                        className={`h-auto rounded-full px-8 py-6 font-medium text-[#0a0a0a] ${config.spotlightProduct.accentBgClass} hover:opacity-90`}
                      >
                        {config.spotlightProduct.primaryAction.label}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    {config.spotlightProduct.secondaryAction ? (
                      <Link
                        href={config.spotlightProduct.secondaryAction.href}
                        target={config.spotlightProduct.secondaryAction.external ? "_blank" : undefined}
                        rel={config.spotlightProduct.secondaryAction.external ? "noopener noreferrer" : undefined}
                      >
                        <Button
                          size="lg"
                          variant="outline"
                          className="h-auto rounded-full border-[#3c4043] bg-transparent px-8 py-6 font-medium text-[#e8eaed] hover:bg-[#1a1a1a]"
                        >
                          {config.spotlightProduct.secondaryAction.label}
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="w-full border-t border-[#1e1e1e] py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Our Mission</h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#9aa0a6]">
              Knowledge workers spend 28% of their workweek on repetitive browser tasks (McKinsey). We build AI agents that take over that work - browsing, clicking, filling forms, drafting messages - so humans focus on decisions, not mechanics. Every agent we ship keeps the human in control: nothing is sent, submitted, or purchased without your explicit approval.
            </p>
          </div>
        </section>

        <section className="w-full border-t border-[#1e1e1e] py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet the Team</h2>
              <p className="mx-auto max-w-2xl text-lg text-[#9aa0a6]">The humans behind the agents</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {config.teamMembers.map((member) => {
                const IconComponent = member.icon

                return (
                  <div key={member.name} className="group text-center">
                    <div className="relative mx-auto mb-5 h-36 w-36 overflow-hidden rounded-2xl border-2 border-[#2a2a2a] transition-all duration-300 group-hover:border-[#8ab4f8]/40">
                      <Image src={member.photo} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-[#e8eaed]">{member.name}</h3>
                    <div className="mb-3 flex items-center justify-center gap-1.5">
                      <IconComponent className="h-3.5 w-3.5" style={{ color: member.color }} />
                      <span className="text-sm" style={{ color: member.color }}>
                        {member.role}
                      </span>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#9aa0a6] transition-colors hover:text-[#8ab4f8]"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full border-t border-[#1e1e1e] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Products & Projects</h2>
              <p className="mx-auto max-w-2xl text-lg text-[#9aa0a6]">A suite of AI agents and open-source tooling for individuals, teams, and enterprises</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {config.products.map((product) => {
                const ProductIcon = product.icon
                return (
                  <Card
                    key={product.title}
                    className={`border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 ${product.borderHoverClass}`}
                  >
                    <CardContent className={product.contentClassName ?? "p-8"}>
                      <div className="mb-6 flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${product.iconBg}`}>
                          <ProductIcon className={`h-6 w-6 ${product.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#e8eaed]">{product.title}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-xs ${product.iconBg} ${product.iconColor}`}>
                            {product.badge}
                          </span>
                        </div>
                      </div>
                      <p className="mb-6 leading-relaxed text-[#9aa0a6]">{product.description}</p>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span key={tag} className="rounded bg-[#2a2a2a] px-2 py-1 text-xs text-[#9aa0a6]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {product.actions.map((action) => {
                          if (action.external) {
                            return (
                              <Link key={`${product.title}-${action.href}`} href={action.href} target="_blank" rel="noopener noreferrer" className={product.actions.length > 1 ? "flex-1" : "w-full"}>
                                <Button variant="outline" className={`w-full border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] ${action.colorClass}`}>
                                  {action.label}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            )
                          }

                          return (
                            <Link key={`${product.title}-${action.href}`} href={action.href} className={product.actions.length > 1 ? "flex-1" : "w-full"}>
                              <Button variant="outline" className={`w-full border-[#3c4043] bg-transparent hover:bg-[#2a2a2a] ${action.colorClass}`}>
                                {action.label}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full border-t border-[#1e1e1e] py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">How We Build</h2>
              <p className="mx-auto max-w-2xl text-lg text-[#9aa0a6]">Principles behind every product we ship</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {config.principles.map((principle) => {
                const PrincipleIcon = principle.icon

                return (
                  <div key={principle.title} className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6">
                    <PrincipleIcon className={`mb-4 h-8 w-8 ${principle.iconClassName}`} />
                    <h3 className="mb-2 text-lg font-semibold">{principle.title}</h3>
                    <p className="text-sm text-[#9aa0a6]">{principle.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full border-t border-[#1e1e1e] py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Get in Touch</h2>
            <p className="mx-auto mb-8 max-w-xl text-[#9aa0a6]">Have questions? We'd love to hear from you.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {config.contacts.map((contact) => {
                const ContactIcon = contact.icon
                return (
                  <a
                    key={contact.href}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-[#9aa0a6] transition-colors hover:text-[#8ab4f8]"
                  >
                    {ContactIcon ? <ContactIcon className="h-5 w-5" /> : null}
                    {contact.label}
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#3c4043] bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#9aa0a6] md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/vibebrowser-logo.png" alt="Vibe Technologies" className="h-6 w-6 object-contain" />
              <span>Vibe Technologies</span>
            </div>
            <p className="text-[#5f6368]">&copy; 2026 Vibe Technologies, LLC. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="https://linkedin.com/company/vibebrowser" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e8eaed]">
                LinkedIn
              </Link>
              <Link href="https://x.com/vibebrowserapp" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e8eaed]">
                X
              </Link>
              <Link href={config.footerContactHref} className="transition-colors hover:text-[#e8eaed]">
                Contact Us
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-[#e8eaed]">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-[#e8eaed]">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
