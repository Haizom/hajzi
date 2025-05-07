import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HotelsHero } from '@/components/hotels/hero';
import { HotelsList } from '@/components/hotels/list';
import { HotelsFilters } from '@/components/hotels/filters';
import { CityFilter } from '@/components/hotels/city-filter';
import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';

export type HotelFilters = {
  priceRange: {
    min: number | null;
    max: number | null;
  };
  rating: number | null;
  amenities: string[];
  location: string;
  searchTerm: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
  currency: 'YER' | 'SAR' | 'USD' | null;
};

export function HotelsPage() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('all');
  const [filters, setFilters] = useState<HotelFilters>({
    priceRange: {
      min: null,
      max: null,
    },
    rating: null,
    amenities: [],
    location: '',
    searchTerm: '',
    sortBy: null,
    currency: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setFilters(prev => ({
      ...prev,
      location: city === 'all' ? '' : city
    }));
  };

  return (
    <>
      <Navbar />
      <main>
        <HotelsHero />
        <div className="container mx-auto px-4 py-8">
          {/* City Filter */}
          <CityFilter selectedCity={selectedCity} onCityChange={handleCityChange} />

          <div className="lg:grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Mobile Filters Button */}
            <button
              className="lg:hidden w-full mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2"
              onClick={() => setShowFilters(true)}
            >
              {language === 'ar' ? 'عرض الفلترة' : 'Show Filters'}
            </button>

            {/* Filters */}
            <HotelsFilters
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            {/* Hotels List */}
            <HotelsList filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}