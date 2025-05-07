import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { ArrowRight, Hotel as HotelIcon, Home, Building2, Castle, Tent } from 'lucide-react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Link } from 'react-router-dom';

type PropertyType = 'hotels' | 'chalets' | 'halls' | 'apartments' | 'camps';

const FEATURED_ADS = {
  hotels: {
    titleAr: 'فندق الريتز كارلتون',
    titleEn: 'The Ritz-Carlton Hotel',
    descriptionAr: 'استمتع بإقامة فاخرة مع إطلالات خلابة على البحر. احجز الآن واحصل على خصم 20% على الإقامات الطويلة.',
    descriptionEn: 'Enjoy a luxurious stay with stunning sea views. Book now and get 20% off on extended stays.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80',
    tagAr: 'عرض خاص',
    tagEn: 'Special Offer',
  },
  chalets: {
    titleAr: 'شاليهات البحيرة',
    titleEn: 'Lake View Chalets',
    descriptionAr: 'شاليهات فاخرة مع إطلالة مباشرة على البحيرة. عرض خاص لنهاية الأسبوع مع خصم 15%.',
    descriptionEn: 'Luxury chalets with direct lake views. Special weekend offer with 15% discount.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80',
    tagAr: 'عرض نهاية الأسبوع',
    tagEn: 'Weekend Offer',
  },
  halls: {
    titleAr: 'قاعة الملكية',
    titleEn: 'Royal Hall',
    descriptionAr: 'قاعة فاخرة للمناسبات والأفراح. احجز الآن واحصل على باقة الضيافة مجاناً.',
    descriptionEn: 'Luxury hall for events and weddings. Book now and get the hospitality package for free.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80',
    tagAr: 'عرض العروس',
    tagEn: 'Bridal Offer',
  },
  apartments: {
    titleAr: 'شقق السلام الفندقية',
    titleEn: 'Al Salam Hotel Apartments',
    descriptionAr: 'شقق فندقية فاخرة في قلب المدينة. خصم 25% على الإقامات الشهرية.',
    descriptionEn: 'Luxury hotel apartments in the heart of the city. 25% off on monthly stays.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80',
    tagAr: 'إقامة طويلة',
    tagEn: 'Long Stay',
  },
  camps: {
    titleAr: 'مخيم النجوم',
    titleEn: 'Stars Camp',
    descriptionAr: 'تجربة تخييم فريدة تحت النجوم. باقة عائلية تشمل جميع الأنشطة.',
    descriptionEn: 'Unique camping experience under the stars. Family package includes all activities.',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=2000&q=80',
    tagAr: 'مغامرة عائلية',
    tagEn: 'Family Adventure',
  },
};

const PROPERTY_TYPES = [
  { id: 'hotels', icon: HotelIcon, labelAr: 'فنادق', labelEn: 'Hotels' },
  { id: 'chalets', icon: Home, labelAr: 'شاليهات واستراحات', labelEn: 'Chalets & Resorts' },
  { id: 'halls', icon: Castle, labelAr: 'صالات أفراح', labelEn: 'Wedding Halls' },
  { id: 'apartments', icon: Building2, labelAr: 'شقق', labelEn: 'Apartments' },
  { id: 'camps', icon: Tent, labelAr: 'طيرامانات', labelEn: 'Camps' },
];

export function FeaturedAd() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<PropertyType>('hotels');
  const selectedAd = FEATURED_ADS[selectedType];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-600 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            {language === 'ar' ? 'استمتع بأجمل العروض' : 'Enjoy Our Best Offers'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-primary-600 mx-auto rounded-full" />
        </div>

        {/* Property Type Filters */}
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-2 md:gap-4">
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as PropertyType)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  selectedType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <type.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{language === 'ar' ? type.labelAr : type.labelEn}</span>
              </button>
            ))}
          </div>

          {/* View All Offers Link */}
          <div className="text-center">
            <Link 
              to="/offers" 
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              {language === 'ar' ? 'كل العروض' : 'View All Offers'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Ad */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
            style={{
              backgroundImage: `url("${selectedAd.image}")`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
          </div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                {language === 'ar' ? selectedAd.tagAr : selectedAd.tagEn}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? selectedAd.titleAr : selectedAd.titleEn}
              </h2>
              <p className="text-white/90 text-sm md:text-base max-w-xl">
                {language === 'ar' ? selectedAd.descriptionAr : selectedAd.descriptionEn}
              </p>
            </div>

            <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90 w-full md:w-auto">
              {t('common.book')}
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}