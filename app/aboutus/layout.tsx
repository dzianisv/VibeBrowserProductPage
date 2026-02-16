import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Vibe Technologies",
  description: "Meet the team behind Vibe Technologies. We write code, design systems, and ship AI-powered products that automate the web.",
  alternates: {
    canonical: "https://www.vibebrowser.app/aboutus",
  },
  openGraph: {
    title: "About Us - Vibe Technologies",
    description: "A small team of engineers building AI tools that actually do the work. Meet the humans behind the agents.",
    url: "https://www.vibebrowser.app/aboutus",
    siteName: "Vibe AI Browser Co-Pilot",
    type: "website",
    images: [
      {
        url: "/og/home.svg",
        width: 1200,
        height: 630,
        alt: "About Vibe Technologies - The Team Behind the AI Browser Co-Pilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Vibe Technologies",
    description: "A small team of engineers building AI tools that actually do the work. Meet the humans behind the agents.",
    images: ["/og/home.svg"],
    creator: "@vibebrowserapp",
  },
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Vibe Technologies",
  description:
    "Meet the team behind Vibe Technologies. We write code, design systems, and ship AI-powered products that automate the web.",
  url: "https://www.vibebrowser.app/aboutus",
  mainEntity: {
    "@type": "Organization",
    name: "Vibe Technologies",
    url: "https://www.vibebrowser.app",
    sameAs: [
      "https://x.com/vibebrowserapp",
      "https://github.com/nicepkg/vibe",
    ],
    description:
      "A small team of engineers building AI tools that actually do the work.",
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  )
}
