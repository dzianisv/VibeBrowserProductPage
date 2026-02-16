import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Vibe Technologies",
  description: "Meet the team behind Vibe Technologies. We write code, design systems, and ship AI-powered products that automate the web.",
  openGraph: {
    title: "About Us - Vibe Technologies",
    description: "A small team of engineers building AI tools that actually do the work. Meet the humans behind the agents.",
    url: "https://www.vibebrowser.app/aboutus",
    siteName: "Vibe Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Vibe Technologies",
    description: "A small team of engineers building AI tools that actually do the work. Meet the humans behind the agents.",
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
