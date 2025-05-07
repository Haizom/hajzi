import { Hero } from '@/components/home/hero';
import { FeaturedAd } from '@/components/home/featured-ad';
import { FeaturedProperties } from '@/components/home/featured-properties';
import { PopularDestinations } from '@/components/home/popular-destinations';
import { Services } from '@/components/home/services';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedAd />
        <FeaturedProperties />
        <PopularDestinations />
        <Services />
      </main>
      <Footer />
    </>
  );
}