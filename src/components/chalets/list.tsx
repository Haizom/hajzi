import { useLanguage } from '@/lib/store/useLanguage';
import { Star, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { CHALETS_DATA } from '@/data/chalets';
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
    rating: number | null;
    amenities: string[];
    location: string;
    searchTerm: string;
    type: 'chalet' | 'rest-house' | null;
    sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
    features: string[];
    currency: 'YER' | 'SAR' | 'USD' | null;
  };
};

export function ChaletsList({ filters }: ListProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [randomizedChalets, setRandomizedChalets] = useState(CHALETS_DATA);
  const itemsPerPage = 9;

  // Randomize chalets on initial load
  useEffect(() => {
    setRandomizedChalets(shuffleArray(CHALETS_DATA));
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

  // Apply filters to randomized chalets
  const filteredChalets = randomizedChalets.filter((chalet) => {
    const matchesLocation = !filters.location || filters.location === 'all' || 
      chalet.locationEn.toLowerCase() === filters.location.toLowerCase() ||
      chalet.locationAr === filters.location;
    
    const matchesSearch = !filters.searchTerm || 
      chalet.titleEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      chalet.titleAr.includes(filters.searchTerm) ||
      chalet.descriptionEn.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      chalet.descriptionAr.includes(filters.searchTerm);

    const matchesType = !filters.type || chalet.type === filters.type;

    const matchesCurrency = !filters.currency || chalet.currency === filters.currency;
    const matchesPrice = !filters.priceRange.min || !filters.priceRange.max || 
      (chalet.price >= filters.priceRange.min && chalet.price <= filters.priceRange.max);

    const matchesRating = filters.rating ? chalet.rating >= filters.rating : true;

    const matchesFeatures = filters.features.length === 0 ||
      filters.features.every(feature => chalet.features.includes(feature));

    return matchesLocation && matchesSearch && matchesType && matchesCurrency && 
           matchesPrice && matchesRating && matchesFeatures;
  });

  // Pagination
  const totalPages = Math.ceil(filteredChalets.length / itemsPerPage);
  const paginatedChalets = filteredChalets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      {/* Chalets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedChalets.map((chalet) => (
          <div
            key={chalet.id}
            onClick={() => navigate(`/chalets-resorts/${chalet.id}`)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-48">
              <img
                src={chalet.image}
                alt={language === 'ar' ? chalet.titleAr : chalet.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                <Star className="w-4 h-4 text-white fill-current" />
                <span className="ml-1 text-sm font-medium">{chalet.rating}</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                {chalet.price} {getCurrencyLabel(chalet.currency)}
                <span className="text-xs opacity-75">
                  {' '}{language === 'ar' ? '/ ليلة' : '/ night'}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {language === 'ar' ? chalet.locationAr : chalet.locationEn}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? chalet.titleAr : chalet.titleEn}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {language === 'ar' ? chalet.descriptionAr : chalet.descriptionEn}
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