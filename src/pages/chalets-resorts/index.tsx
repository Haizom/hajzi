import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChaletsHero } from '@/components/chalets/hero';
import { ChaletsList } from '@/components/chalets/list';
import { ChaletsFilters } from '@/components/chalets/filters';
import { CityFilter } from '@/components/chalets/city-filter';

export type ChaletFilters = {
  priceRange: {
    min: number | null;
    max: number | null;
  };
  rating: number | null;
  amenities: string[];
  location: string;
  searchTerm: string;
  type: 'chalet' | 'rest-house' | null;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
  features: string[];
  currency: 'YER' | 'SAR' | 'USD' | null;
};

export function ChaletsResortsPage() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('all');
  const [filters, setFilters] = useState<ChaletFilters>({
    priceRange: {
      min: null,
      max: null,
    },
    rating: null,
    amenities: [],
    location: '',
    searchTerm: '',
    type: null,
    sortBy: null,
    features: [],
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
        <ChaletsHero />
        <div className="container mx-auto px-4 py-8">
          <CityFilter selectedCity={selectedCity} onCityChange={handleCityChange} />
          <div className="lg:grid lg:grid-cols-[300px_1fr] gap-8">
            <button
              className="lg:hidden w-full mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2"
              onClick={() => setShowFilters(true)}
            >
              {language === 'ar' ? 'عرض الفلترة' : 'Show Filters'}
            </button>

            <ChaletsFilters
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            <ChaletsList filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}