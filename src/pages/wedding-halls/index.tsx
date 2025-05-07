import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Users, Filter } from 'lucide-react';
import { HALLS_DATA } from '@/data/wedding-halls';
import { useNavigate } from 'react-router-dom';
import { CityFilter } from '@/components/wedding-halls/city-filter';
import { WeddingHallsFilters } from '@/components/wedding-halls/filters';

type Currency = 'YER' | 'SAR' | 'USD';

export function WeddingHallsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: {
      min: null,
      max: null,
    },
    rating: null,
    purposes: [],
    location: '',
    searchTerm: '',
    sortBy: null,
    currency: null as Currency | null,
  });

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setFilters(prev => ({
      ...prev,
      location: city === 'all' ? '' : city
    }));
  };

  const getCurrencyLabel = (currency: string) => {
    if (language === 'ar') {
      switch (currency) {
        case 'YER':
          return 'يمني';
        case 'SAR':
          return 'سعودي';
        case 'USD':
          return 'دولار';
        default:
          return currency;
      }
    }
    return currency;
  };

  const filteredHalls = HALLS_DATA.filter((hall) => {
    const matchesCity = selectedCity === 'all' || 
      hall.locationEn.toLowerCase() === selectedCity.toLowerCase() ||
      hall.locationAr === selectedCity;
    
    const matchesSearch = !filters.searchTerm || 
      hall.titleEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      hall.titleAr.includes(filters.searchTerm) ||
      hall.descriptionEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      hall.descriptionAr.includes(filters.searchTerm);

    const matchesPurpose = filters.purposes.length === 0 ||
      filters.purposes.some(purpose => hall.purposes.includes(purpose));

    const matchesCurrency = !filters.currency || hall.currency === filters.currency;
    const matchesPrice = !filters.priceRange.min || !filters.priceRange.max || 
      (hall.price >= filters.priceRange.min && hall.price <= filters.priceRange.max);

    const matchesRating = filters.rating ? hall.rating >= filters.rating : true;

    return matchesCity && matchesSearch && matchesPurpose && 
           (filters.currency ? (matchesCurrency && matchesPrice) : true) && 
           matchesRating;
  });

  const handleHallClick = (hallId: number) => {
    navigate(`/wedding-halls/${hallId}`);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {language === 'ar' ? 'صالات الأفراح والمناسبات' : 'Wedding & Event Halls'}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {language === 'ar'
                  ? 'اكتشف أفضل صالات الأفراح والمناسبات في اليمن'
                  : 'Discover the best wedding and event halls in Yemen'
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
            <WeddingHallsFilters
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            {/* Halls List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHalls.map((hall) => (
                <div
                  key={hall.id}
                  onClick={() => handleHallClick(hall.id)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={hall.image}
                      alt={language === 'ar' ? hall.titleAr : hall.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                      <Star className="w-4 h-4 text-white fill-current" />
                      <span className="ml-1 text-sm font-medium">{hall.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                        {hall.price} {getCurrencyLabel(hall.currency)}
                        <span className="text-xs opacity-75">
                          {' '}{language === 'ar' ? '/ يوم' : '/ day'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {language === 'ar' ? hall.locationAr : hall.locationEn}
                      </span>
                      <span className="mx-2">•</span>
                      <Users className="w-4 h-4" />
                      <span>{hall.capacity}</span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? hall.titleAr : hall.titleEn}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {language === 'ar' ? hall.descriptionAr : hall.descriptionEn}
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