import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { Stats } from '@/components/sections/Stats'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ParallaxProjects } from '@/components/sections/ParallaxProjects'
import { MarqueeText } from '@/components/sections/MarqueeText'
import { TextRevealSection } from '@/components/sections/TextRevealSection'
import { GuaranteeSection } from '@/components/sections/GuaranteeSection'
import { TextReveal } from '@/components/sections/TextReveal'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      {/* Hero with exploding images on scroll */}
      <Hero />

      {/* Services cards */}
      <ServiceCards />

      {/* Stats section */}
      <Stats />

      {/* Featured projects grid */}
      <FeaturedProjects />

      {/* Fullscreen parallax projects */}
      <ParallaxProjects />

      {/* Marquee text */}
      <MarqueeText text="Future by Studio Meyer® — Digitale Exzellenz" speed={40} />

      {/* Text reveal with parallax images */}
      <TextRevealSection />

      {/* Guarantee cards */}
      <GuaranteeSection />

      {/* Final CTA text reveal */}
      <TextReveal />
    </>
  )
}
