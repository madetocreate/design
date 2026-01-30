import { Header } from '@/components/Header';
import { Hero } from '@/components/sections/Hero';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Stats } from '@/components/sections/Stats';
import { TextReveal, AboutSection } from '@/components/sections/TextReveal';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ServiceCards />
        <Stats />
        <FeaturedProjects />
        <TextReveal />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
