import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/store/useLanguage';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YEMEN_IMAGES = [
  {
    id: 'old-sanaa',
    url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b',
    titleAr: 'صنعاء القديمة',
    titleEn: 'Old Sanaa',
    descriptionAr: 'عاصمة اليمن التاريخية وتراثها المعماري الفريد',
    descriptionEn: 'Yemen\'s historic capital and its unique architectural heritage',
    locationAr: 'صنعاء، اليمن',
    locationEn: 'Sanaa, Yemen'
  },
  {
    id: 'socotra',
    url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88',
    titleAr: 'جزيرة سقطرى',
    titleEn: 'Socotra Island',
    descriptionAr: 'جزيرة الأساطير والطبيعة الساحرة',
    descriptionEn: 'Island of legends and enchanting nature',
    locationAr: 'سقطرى، اليمن',
    locationEn: 'Socotra, Yemen'
  },
  {
    id: 'aden',
    url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b',
    titleAr: 'شواطئ عدن',
    titleEn: 'Aden Beaches',
    descriptionAr: 'شواطئ ذهبية وأمواج زرقاء صافية',
    descriptionEn: 'Golden beaches and clear blue waves',
    locationAr: 'عدن، اليمن',
    locationEn: 'Aden, Yemen'
  },
  {
    id: 'doan',
    url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88',
    titleAr: 'وادي دوعن',
    titleEn: 'Doan Valley',
    descriptionAr: 'وادي خلاب بمناظر طبيعية مذهلة',
    descriptionEn: 'A stunning valley with breathtaking landscapes',
    locationAr: 'حضرموت، اليمن',
    locationEn: 'Hadhramaut, Yemen'
  },
  {
    id: 'sabir',
    url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b',
    titleAr: 'جبل صبر',
    titleEn: 'Sabir Mountain',
    descriptionAr: 'قمم شاهقة وإطلالات خلابة',
    descriptionEn: 'Towering peaks and scenic views',
    locationAr: 'تعز، اليمن',
    locationEn: 'Taiz, Yemen'
  },
];

export function PopularDestinations() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          {language === 'ar' ? 'الوجهات الشهيرة' : 'Popular Destinations'}
        </h2>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar gap-4 cursor-grab pb-4 -mx-4 px-4 snap-x snap-mandatory md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
        >
          {YEMEN_IMAGES.map((image, index) => (
            <div
              key={index}
              className="flex-none w-[240px] sm:w-[280px] md:w-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow snap-start cursor-pointer"
              onClick={() => navigate(`/yemen/${image.id}`)}
            >
              <div className="relative h-40">
                <img
                  src={`${image.url}?auto=format&fit=crop&w=800&h=600`}
                  alt={language === 'ar' ? image.titleAr : image.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <span className="ml-1 text-sm font-medium">
                    {language === 'ar' ? image.locationAr : image.locationEn}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold mt-1 mb-1 line-clamp-1">
                  {language === 'ar' ? image.titleAr : image.titleEn}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {language === 'ar' ? image.descriptionAr : image.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}