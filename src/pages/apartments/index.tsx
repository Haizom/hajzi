import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Star, MapPin, BedDouble, Bath, Maximize2, Filter } from 'lucide-react';
import { APARTMENTS_DATA } from '@/data/apartments';
import { useNavigate } from 'react-router-dom';
import { CityFilter } from '@/components/apartments/city-filter';
import { ApartmentsFilters } from '@/components/apartments/filters';

type Currency = 'YER' | 'SAR' | 'USD';

export type ApartmentFilters = {
  priceRange: {
    min: number | null;
    max: number | null;
  };
  features: string[];
  location: string;
  searchTerm: string;
  type: string | null;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
  rentalType: string | null;
  currency: Currency | null;
};

export function ApartmentsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ApartmentFilters>({
    priceRange: {
      min: null,
      max: null,
    },
    features: [],
    location: '',
    searchTerm: '',
    type: null,
    sortBy: null,
    rentalType: null,
    currency: null,
  });

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setFilters(prev => ({
      ...prev,
      location: city === 'all' ? '' : city
    }));
  };

  // Filter apartments
  const filteredApartments = APARTMENTS_DATA.filter((apartment) => {
    // Location filter
    const matchesLocation = selectedCity === 'all' || 
      apartment.locationEn.toLowerCase() === selectedCity.toLowerCase() ||
      apartment.locationAr === selectedCity;
    
    // Search filter
    const matchesSearch = !filters.searchTerm || 
      apartment.titleEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      apartment.titleAr.includes(filters.searchTerm) ||
      apartment.descriptionEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      apartment.descriptionAr.includes(filters.searchTerm);

    // Type filter
    const matchesType = !filters.type || apartment.type === filters.type;

    // Currency and price filter
    let matchesCurrencyAndPrice = true;
    if (filters.currency) {
      // If currency is selected but no price range, just match currency
      if (filters.priceRange.min === null || filters.priceRange.max === null) {
        matchesCurrencyAndPrice = apartment.currency === filters.currency;
      } else {
        // If both currency and price range are selected, match both
        matchesCurrencyAndPrice = apartment.currency === filters.currency &&
          apartment.price >= filters.priceRange.min &&
          apartment.price <= filters.priceRange.max;
      }
    }

    // Features filter
    const matchesFeatures = filters.features.length === 0 ||
      filters.features.every(feature => apartment.features.includes(feature));

    // Rental type filter
    const matchesRentalType = !filters.rentalType || apartment.rentalType === filters.rentalType;

    return matchesLocation && matchesSearch && matchesType && 
           matchesCurrencyAndPrice && matchesFeatures && matchesRentalType;
  });

  // Sort apartments if needed
  let sortedApartments = [...filteredApartments];
  if (filters.sortBy) {
    sortedApartments.sort((a, b) => {
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
              backgroundImage: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {language === 'ar' ? 'شقق فندقية وسكنية' : 'Hotel & Residential Apartments'}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {language === 'ar'
                  ? 'اكتشف أفضل الشقق الفندقية والسكنية في اليمن'
                  : 'Discover the best hotel and residential apartments in Yemen'
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
            <ApartmentsFilters
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            {/* Apartments List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedApartments.map((apartment) => (
                <div
                  key={apartment.id}
                  onClick={() => navigate(`/apartments/${apartment.id}`)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    {/* Rental Type Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-lg bg-primary-600 text-white`}>
                        {apartment.rentalType === 'daily' 
                          ? language === 'ar' ? 'إيجار يومي' : 'Daily Rental'
                          : language === 'ar' ? 'إيجار شهري' : 'Monthly Rental'
                        }
                      </div>
                    </div>

                    <img
                      src={apartment.image}
                      alt={language === 'ar' ? apartment.titleAr : apartment.titleEn}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                      <Star className="w-4 h-4 text-white fill-current" />
                      <span className="ml-1 text-sm font-medium">{apartment.rating}</span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                        {apartment.price} {apartment.currency}
                        <span className="text-xs opacity-75">
                          {' '}{apartment.rentalType === 'daily' 
                            ? language === 'ar' ? '/ يوم' : '/ day'
                            : language === 'ar' ? '/ شهر' : '/ month'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {language === 'ar' ? apartment.locationAr : apartment.locationEn}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? apartment.titleAr : apartment.titleEn}
                    </h3>

                    <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4" />
                        <span>{apartment.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{apartment.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-4 h-4" />
                        <span>{apartment.size} {language === 'ar' ? 'م²' : 'm²'}</span>
                      </div>
                    </div>

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