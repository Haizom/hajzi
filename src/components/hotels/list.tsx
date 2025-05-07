import { useLanguage } from '@/lib/store/useLanguage';
import { Star, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { HOTELS_DATA } from '@/data/hotels';
import { useNavigate } from 'react-router-dom';

type ListProps = {
  filters: {
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

export function HotelsList({ filters }: ListProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [randomizedHotels, setRandomizedHotels] = useState(HOTELS_DATA);
  const itemsPerPage = 9;

  // Randomize hotels on initial load
  useEffect(() => {
    setRandomizedHotels(shuffleArray(HOTELS_DATA));
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

  // Apply filters to randomized hotels
  const filteredHotels = randomizedHotels.filter((hotel) => {
    const matchesLocation = !filters.location || filters.location === 'all' || 
      hotel.locationEn.toLowerCase() === filters.location.toLowerCase() ||
      hotel.locationAr === filters.location;
    
    const matchesSearch = !filters.searchTerm || 
      hotel.titleEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      hotel.titleAr.includes(filters.searchTerm) ||
      hotel.descriptionEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      hotel.descriptionAr.includes(filters.searchTerm);

    const matchesCurrency = !filters.currency || hotel.currency === filters.currency;
    const matchesPrice = !filters.priceRange.min || !filters.priceRange.max || 
      (hotel.price >= filters.priceRange.min && hotel.price <= filters.priceRange.max);

    const matchesRating = filters.rating ? hotel.officialRating === filters.rating : true;

    const matchesAmenities = filters.amenities.length === 0 ||
      filters.amenities.every((amenity) => hotel.amenities.includes(amenity));

    return matchesLocation && matchesSearch && matchesCurrency && matchesPrice && matchesRating && matchesAmenities;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedHotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => navigate(`/hotels/${hotel.id}`)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Image Section */}
            <div className="relative h-48">
              <img
                src={hotel.image}
                alt={language === 'ar' ? hotel.titleAr : hotel.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                <Star className="w-4 h-4 text-white fill-current" />
                <span className="ml-1 text-sm font-medium">
                  {hotel.officialRating} {language === 'ar' ? 'نجوم' : 'Stars'}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                {hotel.price} {getCurrencyLabel(hotel.currency)}
                <span className="text-xs opacity-75">
                  {' '}{language === 'ar' ? '/ ليلة' : '/ night'}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {language === 'ar' ? hotel.locationAr : hotel.locationEn}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? hotel.titleAr : hotel.titleEn}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {language === 'ar' ? hotel.descriptionAr : hotel.descriptionEn}
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