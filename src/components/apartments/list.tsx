import { useLanguage } from '@/lib/store/useLanguage';
import { Star, MapPin, BedDouble, Bath, Maximize2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { APARTMENTS_DATA } from '@/data/apartments';
import { useNavigate } from 'react-router-dom';

type ListProps = {
  filters: {
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
    currency: 'YER' | 'SAR' | 'USD' | null;
  };
};

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function ApartmentsList({ filters }: ListProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [randomizedApartments, setRandomizedApartments] = useState(APARTMENTS_DATA);
  const itemsPerPage = 9;

  // Randomize apartments on initial load
  useEffect(() => {
    setRandomizedApartments(shuffleArray(APARTMENTS_DATA));
  }, []);

  const formatPrice = (apartment: any) => {
    const currency = language === 'ar' 
      ? apartment.currency === 'YER' ? 'يمني'
        : apartment.currency === 'SAR' ? 'سعودي'
        : 'دولار'
      : apartment.currency;

    const period = apartment.rentalType === 'daily' ? 'يوم' : 'شهر';

    return language === 'ar'
      ? `${apartment.price} ${currency} / ${period}`
      : `${apartment.price} ${apartment.currency} / ${apartment.rentalType === 'daily' ? 'day' : 'month'}`;
  };

  // Apply filters to randomized apartments
  const filteredApartments = randomizedApartments.filter((apartment) => {
    const matchesLocation = !filters.location || filters.location === 'all' || 
      apartment.locationEn.toLowerCase() === filters.location.toLowerCase() ||
      apartment.locationAr === filters.location;
    
    const matchesSearch = !filters.searchTerm || 
      apartment.titleEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      apartment.titleAr.includes(filters.searchTerm) ||
      apartment.descriptionEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      apartment.descriptionAr.includes(filters.searchTerm);

    const matchesType = !filters.type || apartment.type === filters.type;

    let matchesCurrencyAndPrice = true;
    if (filters.currency) {
      if (filters.priceRange.min === null || filters.priceRange.max === null) {
        matchesCurrencyAndPrice = apartment.currency === filters.currency;
      } else {
        matchesCurrencyAndPrice = apartment.currency === filters.currency &&
          apartment.price >= filters.priceRange.min &&
          apartment.price <= filters.priceRange.max;
      }
    }

    const matchesFeatures = filters.features.length === 0 ||
      filters.features.every(feature => apartment.features.includes(feature));

    const matchesRentalType = !filters.rentalType || apartment.rentalType === filters.rentalType;

    return matchesLocation && matchesSearch && matchesType && 
           matchesCurrencyAndPrice && matchesFeatures && matchesRentalType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const paginatedApartments = filteredApartments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      {/* Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedApartments.map((apartment) => (
          <div
            key={apartment.id}
            onClick={() => navigate(`/apartments/${apartment.id}`)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-48">
              {/* Rental Type Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-lg bg-primary-600 text-white`}>
                  {language === 'ar' 
                    ? apartment.rentalType === 'daily' ? 'إيجار يومي' : 'إيجار شهري'
                    : apartment.rentalType === 'daily' ? 'Daily Rental' : 'Monthly Rental'
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
              <div className="absolute bottom-3 left-3">
                <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  {formatPrice(apartment)}
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