import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Users, Filter } from 'lucide-react';
import { TERMANAT_DATA } from '@/data/termanat';
import { useNavigate } from 'react-router-dom';
import { CityFilter } from '@/components/wedding-halls/city-filter';
import { TermanatFiltersComponent } from '@/components/camps/filters';

type Currency = 'YER' | 'SAR' | 'USD';

export type TermanatFilters = {
  priceRange: {
    min: number | null;
    max: number | null;
  };
  rating: number | null;
  features: string[];
  location: string;
  searchTerm: string;
  type: string | null;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
  purpose: string | null;
  currency: Currency | null;
};

export function CampsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TermanatFilters>({
    priceRange: {
      min: null,
      max: null,
    },
    rating: null,
    features: [],
    location: '',
    searchTerm: '',
    type: null,
    sortBy: null,
    purpose: null,
    currency: null,
  });

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setFilters(prev => ({
      ...prev,
      location: city === 'all' ? '' : city
    }));
  };

  const formatPrice = (termanah: any) => {
    const currency = language === 'ar' 
      ? termanah.currency === 'YER' ? 'يمني'
        : termanah.currency === 'SAR' ? 'سعودي'
        : 'دولار'
      : termanah.currency;

    return language === 'ar'
      ? `${termanah.price} ${currency}`
      : `${termanah.price} ${currency}`;
  };

  // Filter termanat
  const filteredTermanat = TERMANAT_DATA.filter((termanah) => {
    // Location filter
    const matchesLocation = selectedCity === 'all' || 
      termanah.locationEn.toLowerCase() === selectedCity.toLowerCase() ||
      termanah.locationAr === selectedCity;
    
    // Search filter
    const matchesSearch = !filters.searchTerm || 
      termanah.titleEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      termanah.titleAr.includes(filters.searchTerm) ||
      termanah.descriptionEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      termanah.descriptionAr.includes(filters.searchTerm);

    // Type filter
    const matchesType = !filters.type || termanah.type === filters.type;

    // Currency and price filter
    let matchesCurrencyAndPrice = true;
    if (filters.currency) {
      if (filters.priceRange.min === null || filters.priceRange.max === null) {
        matchesCurrencyAndPrice = termanah.currency === filters.currency;
      } else {
        matchesCurrencyAndPrice = termanah.currency === filters.currency &&
          termanah.price >= filters.priceRange.min &&
          termanah.price <= filters.priceRange.max;
      }
    }

    // Rating filter
    const matchesRating = filters.rating ? termanah.rating >= filters.rating : true;

    // Features filter
    const matchesFeatures = filters.features.length === 0 ||
      filters.features.every(feature => termanah.features.includes(feature));

    return matchesLocation && matchesSearch && matchesType && 
           matchesCurrencyAndPrice && matchesRating && matchesFeatures;
  });

  // Sort termanat if needed
  let sortedTermanat = [...filteredTermanat];
  if (filters.sortBy) {
    sortedTermanat.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=80")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {language === 'ar' ? 'طيرمانات ومجالس القات' : 'Termanat & Qat Majlis'}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {language === 'ar'
                  ? 'اكتشف أفضل الطيرمانات ومجالس القات في اليمن'
                  : 'Discover the best Termanat and Qat Majlis in Yemen'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* City Filter */}
          <CityFilter selectedCity={selectedCity} onCityChange={handleCityChange} />

          <div className="lg:grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Mobile Filters Button */}
            <button
              className="lg:hidden w-full mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="w-4 h-4" />
              {language === 'ar' ? 'عرض الفلترة' : 'Show Filters'}
            </button>

            {/* Filters */}
            <TermanatFiltersComponent
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            {/* Termanat List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedTermanat.map((termanah) => (
                <div
                  key={termanah.id}
                  onClick={() => navigate(`/camps/${termanah.id}`)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={termanah.image}
                      alt={language === 'ar' ? termanah.titleAr : termanah.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                      <Star className="w-4 h-4 text-white fill-current" />
                      <span className="ml-1 text-sm font-medium">{termanah.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                        {formatPrice(termanah)}
                        <span className="text-xs opacity-75">
                          {' '}{language === 'ar' ? '/ جلسة' : '/ session'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {language === 'ar' ? termanah.locationAr : termanah.locationEn}
                      </span>
                      <span className="mx-2">•</span>
                      <Users className="w-4 h-4" />
                      <span>{termanah.capacity}</span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? termanah.titleAr : termanah.titleEn}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {language === 'ar' ? termanah.descriptionAr : termanah.descriptionEn}
                    </p>

                    <Button className="w-full">
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}