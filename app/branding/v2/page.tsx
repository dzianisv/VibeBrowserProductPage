import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Image as ImageIcon, MoonStar, Shapes, SwatchBook } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mallow — Brand v2',
  description:
    'The Mallow brand kit v2: the plush marshmallow character, its variations, the dark set, and downloadable icons.',
}

const IMG = '/images/mallow-branding'

type BrandImage = { src: string; alt: string; caption: string }

const CHARACTER: BrandImage[] = [
  {
    src: `${IMG}/mallow-merged-avatar.jpg`,
    alt: 'Mallow merged avatar — plush square marshmallow, front view',
    caption: 'Primary avatar — the main profile-photo candidate',
  },
  {
    src: `${IMG}/mallow-merged-full-body.jpg`,
    alt: 'Mallow full-body plush mascot',
    caption: 'Full-body mascot — website, stickers, character moments',
  },
  {
    src: `${IMG}/mallow-merged-smart-glasses.jpg`,
    alt: 'Mallow with round smart glasses, raised eyebrow and smirk',
    caption: 'Smart glasses — the thinking / working state',
  },
]

const VARIATIONS: BrandImage[] = [
  { src: `${IMG}/mallow-var-red-cap.jpg`, alt: 'Mallow wearing a red cap', caption: 'Red cap' },
  { src: `${IMG}/mallow-var-cowboy-hat.jpg`, alt: 'Mallow wearing a cowboy hat', caption: 'Cowboy hat' },
  { src: `${IMG}/mallow-var-headphones.jpg`, alt: 'Mallow wearing headphones with music notes', caption: 'Headphones + music' },
  { src: `${IMG}/mallow-var-laptop.jpg`, alt: 'Mallow typing on a laptop', caption: 'On a laptop' },
  { src: `${IMG}/mallow-var-floating.jpg`, alt: 'Mallow floating over a beige surface', caption: 'Floating' },
  { src: `${IMG}/mallow-var-wizard-hat.jpg`, alt: 'Mallow wearing a wizard hat', caption: 'Wizard hat' },
  { src: `${IMG}/mallow-var-phone.jpg`, alt: 'Mallow holding a phone', caption: 'With a phone' },
]

const DARK_SET: BrandImage[] = [
  { src: `${IMG}/mallow-dark-avatar.jpg`, alt: 'Mallow avatar on a dark espresso background', caption: 'Dark — avatar' },
  { src: `${IMG}/mallow-dark-full-body.jpg`, alt: 'Mallow full-body mascot on a dark background', caption: 'Dark — full-body' },
  { src: `${IMG}/mallow-dark-smart-glasses.jpg`, alt: 'Mallow with smart glasses on a dark background', caption: 'Dark — smart glasses' },
  { src: `${IMG}/mallow-dark-red-cap.jpg`, alt: 'Mallow with a red cap on a dark background', caption: 'Dark — red cap' },
  { src: `${IMG}/mallow-dark-cowboy-hat.jpg`, alt: 'Mallow with a cowboy hat on a dark background', caption: 'Dark — cowboy hat' },
  { src: `${IMG}/mallow-dark-headphones.jpg`, alt: 'Mallow with headphones on a dark background', caption: 'Dark — headphones' },
  { src: `${IMG}/mallow-dark-laptop.jpg`, alt: 'Mallow on a laptop, dark background', caption: 'Dark — laptop' },
  { src: `${IMG}/mallow-dark-floating.jpg`, alt: 'Mallow floating, dark background', caption: 'Dark — floating' },
  { src: `${IMG}/mallow-dark-wizard-hat.jpg`, alt: 'Mallow with a wizard hat on a dark background', caption: 'Dark — wizard hat' },
]

const ICONS = [128, 48, 32, 16]

const PALETTE = [
  { name: 'Marshmallow white', hex: '#FFF8F3' },
  { name: 'Blush pink', hex: '#F6B8C4' },
  { name: 'Peach', hex: '#F7B98B' },
  { name: 'Warm beige', hex: '#EFE3D3' },
  { name: 'Ink black', hex: '#1A1A1A' },
]

const USAGE_RULES = [
  'Keep the character centred — Telegram crops profile photos to a circle.',
  'Never put text inside the artwork.',
  'Warm cream backgrounds are preferred; the dark set is for contrast moments.',
  'No old Clawly / OpenClaw names customer-facing — the bot is Mallow.',
]

function SectionHeading({ icon, kicker, title, lede }: { icon: React.ReactNode; kicker: string; title: string; lede: string }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        <span>{kicker}</span>
      </div>
      <h2 className="font-serif text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{lede}</p>
    </div>
  )
}

function ImageCard({ image, dark }: { image: BrandImage; dark?: boolean }) {
  return (
    <Card className={dark ? 'overflow-hidden border-white/10 bg-[#1a0f0a]' : 'overflow-hidden'}>
      <CardContent className="p-0">
        <Image
          src={image.src}
          alt={image.alt}
          width={768}
          height={768}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <p className={`px-4 py-3 text-sm ${dark ? 'text-[#e8d9cf]' : 'text-muted-foreground'}`}>
          {image.caption}
        </p>
      </CardContent>
    </Card>
  )
}

export default function MallowBrandV2Page() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <Badge className="mb-4">Brand kit</Badge>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Mallow — Brand v2
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              A soft, rounded-square marshmallow plush with felt texture, in a
              white → pink → peach gradient. Curious, clever, friendly — the
              face of your AI assistant.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`${IMG}/mallow-brand-v2-full-set.zip`}
                download
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download full set (.zip)
              </a>
              <a
                href="#icons"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <ImageIcon className="h-4 w-4" />
                Get the icons
              </a>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={`${IMG}/mallow-merged-avatar.jpg`}
                alt="Mallow merged avatar — the primary brand mark"
                width={768}
                height={768}
                priority
                className="aspect-square w-full object-cover"
              />
            </CardContent>
          </Card>
        </section>

        {/* Character */}
        <section className="py-10">
          <SectionHeading
            icon={<Shapes className="h-4 w-4" />}
            kicker="Character"
            title="One character, three reads"
            lede="The merged v2 character combines the square-marshmallow silhouette with long plush fur, tiny arms and feet."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {CHARACTER.map((image) => (
              <ImageCard key={image.src} image={image} />
            ))}
          </div>
        </section>

        {/* Variations */}
        <section className="py-10">
          <SectionHeading
            icon={<ImageIcon className="h-4 w-4" />}
            kicker="Variations"
            title="The rotation set"
            lede="Playful variants for avatars, stickers, and status states — all on the warm cream background."
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {VARIATIONS.map((image) => (
              <ImageCard key={image.src} image={image} />
            ))}
          </div>
        </section>

        {/* Dark set */}
        <section className="py-10">
          <SectionHeading
            icon={<MoonStar className="h-4 w-4" />}
            kicker="Dark set"
            title="After dark"
            lede="The same character on a deep warm espresso backdrop with a cinematic glow — for contrast moments."
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {DARK_SET.map((image) => (
              <ImageCard key={image.src} image={image} dark />
            ))}
          </div>
        </section>

        {/* Icons */}
        <section id="icons" className="py-10">
          <SectionHeading
            icon={<Download className="h-4 w-4" />}
            kicker="Icons"
            title="App & extension icons"
            lede="The dark Mallow avatar, exported for product surfaces. Click any size to download the PNG."
          />
          <Card>
            <CardContent className="flex flex-wrap items-end gap-8 p-6">
              {ICONS.map((size) => (
                <a
                  key={size}
                  href={`${IMG}/icons/icon${size}.png`}
                  download
                  className="group flex flex-col items-center gap-2"
                  title={`Download ${size}×${size} PNG`}
                >
                  <Image
                    src={`${IMG}/icons/icon${size}.png`}
                    alt={`Mallow icon, ${size} by ${size} pixels`}
                    width={size}
                    height={size}
                    loading="lazy"
                    className="rounded-[22%] transition-transform group-hover:scale-105"
                  />
                  <span className="text-xs text-muted-foreground group-hover:underline">
                    {size}×{size}
                  </span>
                </a>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Usage */}
        <section className="py-10">
          <SectionHeading
            icon={<SwatchBook className="h-4 w-4" />}
            kicker="Usage"
            title="Palette & rules"
            lede="The colours and the few rules that keep Mallow looking like Mallow."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4">
                  {PALETTE.map((color) => (
                    <div key={color.hex} className="flex flex-col items-center gap-2">
                      <span
                        className="h-14 w-14 rounded-full border"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      <span className="text-center text-xs">
                        <span className="block font-medium">{color.name}</span>
                        <span className="block text-muted-foreground">{color.hex}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {USAGE_RULES.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
