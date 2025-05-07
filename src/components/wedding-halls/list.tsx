import { useLanguage } from '@/lib/store/useLanguage';
import { Star, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { HALLS_DATA } from '@/data/wedding-halls';
import { useNavigate } from 'react-router-dom';

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

type ListProps = {
  filters: {
    priceRange: {
      min: number | null;
      max: number | null;
    };
    purposes: string[];
    location: string;
    searchTerm: string;
    sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
    currency: 'YER' | 'SAR' | 'USD' | null;
  };
};

export function WeddingHallsList({ filters }: ListProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [randomizedHalls, setRandomizedHalls] = useState(HALLS_DATA);
  const itemsPerPage = 9;

  // Randomize halls on initial load
  useEffect(() => {
    setRandomizedHalls(shuffleArray(HALLS_DATA));
  }, []);

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

  // Apply filters to randomized halls
  const filteredHalls = randomizedHalls.filter((hall) => {
    const matchesLocation = !filters.location || filters.location === 'all' || 
      hall.locationEn.toLowerCase() === filters.location.toLowerCase() ||
      hall.locationAr === filters.location;
    
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

    return matchesLocation && matchesSearch && matchesPurpose && 
           (filters.currency ? (matchesCurrency && matchesPrice) : true);
  });

  // Pagination
  const totalPages = Math.ceil(filteredHalls.length / itemsPerPage);
  const paginatedHalls = filteredHalls.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      {/* Halls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedHalls.map((hall) => (
          <div
            key={hall.id}
            onClick={() => navigate(`/wedding-halls/${hall.id}`)}
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
              <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                {hall.price} {getCurrencyLabel(hall.currency)}
                <span className="text-xs opacity-75">
                  {' '}{language === 'ar' ? '/ يوم' : '/ day'}
                </span>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded-md ${
                page === index + 1
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}