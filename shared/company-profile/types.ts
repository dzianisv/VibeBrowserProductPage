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
}
