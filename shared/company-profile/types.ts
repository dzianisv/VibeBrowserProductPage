import type { LucideIcon } from "lucide-react"

export type CompanyProfileNavLink = {
  href: string
  label: string
}

export type CompanyProfileTeamMember = {
  name: string
  role: string
  photo: string
  linkedin: string
  icon: LucideIcon
  color: string
}

export type CompanyProfileProductAction = {
  href: string
  label: string
  colorClass: string
  external?: boolean
}

export type CompanyProfileProduct = {
  title: string
  badge: string
  description: string
  tags: string[]
  icon: LucideIcon
  iconColor: string
  iconBg: string
  borderHoverClass: string
  actions: CompanyProfileProductAction[]
  contentClassName?: string
}

export type CompanyProfilePrinciple = {
  title: string
  description: string
  icon: LucideIcon
  iconClassName: string
}

export type CompanyProfileContact = {
  label: string
  href: string
  icon?: LucideIcon
  external?: boolean
}

// A second, hero-weight product highlight rendered near the top of the page
// (right after the page hero, above the products grid), for a product we
// want to feature as prominently as the main hero rather than as just one
// card among many in the grid.
export type CompanyProfileSpotlightProduct = {
  eyebrow: string
  title: string
  headline: string
  description: string
  tags: string[]
  icon: LucideIcon
  iconColor: string
  iconBg: string
  borderClassName: string
  accentBgClass: string
  primaryAction: CompanyProfileProductAction
  secondaryAction?: CompanyProfileProductAction
}

export type CompanyProfileConfig = {
  rotatingWords: string[]
  desktopNav: CompanyProfileNavLink[]
  mobileNav: CompanyProfileNavLink[]
  teamMembers: CompanyProfileTeamMember[]
  products: CompanyProfileProduct[]
  principles: CompanyProfilePrinciple[]
  contacts: CompanyProfileContact[]
  heroContactHref: string
  footerContactHref: string
  headerBackgroundClassName?: string
  spotlightProduct?: CompanyProfileSpotlightProduct
}
