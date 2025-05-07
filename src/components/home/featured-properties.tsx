import { useRef } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HOTELS_DATA } from '@/data/hotels';
import { CHALETS_DATA } from '@/data/chalets';
import { HALLS_DATA } from '@/data/wedding-halls';
import { APARTMENTS_DATA } from '@/data/apartments';
import { TERMANAT_DATA } from '@/data/termanat';

// Format price with currency
function formatPrice(item: any, language: string) {
  const currency = language === 'ar'
    ? item.currency === 'YER' ? 'يمني'
      : item.currency === 'SAR' ? 'سعودي'
      : 'دولار'
    : item.currency;

  return `${item.price} ${currency}`;
}

export function FeaturedProperties() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get first item from each type
  const featuredProperties = [
    { ...HOTELS_DATA[0], type: 'hotel', route: 'hotels' },
    { ...CHALETS_DATA[0], type: 'chalet', route: 'chalets-resorts' },
    { ...HALLS_DATA[0], type: 'hall', route: 'wedding-halls' },
    { ...APARTMENTS_DATA[0], type: 'apartment', route: 'apartments' },
    { ...TERMANAT_DATA[0], type: 'camp', route: 'camps' }
  ];

  const handlePropertyClick = (route: string, id: number) => {
    navigate(`/${route}/${id}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          {language === 'ar' ? 'العقارات المميزة' : 'Featured Properties'}
        </h2>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar gap-4 cursor-grab pb-4 -mx-4 px-4 snap-x snap-mandatory md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
        >
          {featuredProperties.map((property) => (
            <div 
              key={`${property.type}-${property.id}`} 
              onClick={() => handlePropertyClick(property.route, property.id)}
              className="flex-none w-[280px] sm:w-[320px] md:w-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow snap-start cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                  <Star className="w-4 h-4 text-white fill-current" />
                  <span className="ml-1 text-sm font-medium">{property.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  {formatPrice(property, language)}
                  {'rentalType' in property && (
                    <span className="text-xs opacity-75">
                      {' '}{property.rentalType === 'daily' 
                        ? language === 'ar' ? '/ يوم' : '/ day'
                        : language === 'ar' ? '/ شهر' : '/ month'
                      }
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {language === 'ar' ? property.locationAr : property.locationEn}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {language === 'ar' ? property.titleAr : property.titleEn}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {language === 'ar' ? property.descriptionAr : property.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}