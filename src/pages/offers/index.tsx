import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Hotel as HotelIcon, 
  Home, 
  Building2, 
  Castle, 
  Tent, 
  MapPin 
} from 'lucide-react';
import { CityFilter } from '@/components/hotels/city-filter';
import { useNavigate } from 'react-router-dom';

type PropertyType = 'hotels' | 'chalets' | 'halls' | 'apartments' | 'camps';

const FEATURED_ADS = {
  hotels: [
    {
      id: 1,
      titleAr: 'فندق الريتز كارلتون',
      titleEn: 'The Ritz-Carlton Hotel',
      descriptionAr: 'استمتع بإقامة فاخرة مع إطلالات خلابة على البحر. احجز الآن واحصل على خصم 20% على الإقامات الطويلة.',
      descriptionEn: 'Enjoy a luxurious stay with stunning sea views. Book now and get 20% off on extended stays.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض خاص',
      tagEn: 'Special Offer',
      locationAr: 'صنعاء',
      locationEn: 'Sanaa',
    },
    {
      id: 2,
      titleAr: 'فندق جراند بلازا',
      titleEn: 'Grand Plaza Hotel',
      descriptionAr: 'إقامة مميزة في قلب المدينة. خصم 15% على حجوزات نهاية الأسبوع.',
      descriptionEn: 'Distinguished stay in the heart of the city. 15% discount on weekend bookings.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض نهاية الأسبوع',
      tagEn: 'Weekend Offer',
      locationAr: 'عدن',
      locationEn: 'Aden',
    },
    {
      id: 3,
      titleAr: 'فندق المكلا بلازا',
      titleEn: 'Mukalla Plaza Hotel',
      descriptionAr: 'إطلالات بحرية خلابة. احجز 3 ليالي واحصل على الليلة الرابعة مجاناً.',
      descriptionEn: 'Stunning sea views. Book 3 nights and get the 4th night free.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'الليلة الرابعة مجاناً',
      tagEn: '4th Night Free',
      locationAr: 'المكلا',
      locationEn: 'Mukalla',
    },
    {
      id: 4,
      titleAr: 'فندق تعز الدولي',
      titleEn: 'Taiz International Hotel',
      descriptionAr: 'باقة شهر العسل. تشمل إفطار مجاني وجلسة سبا للزوجين.',
      descriptionEn: 'Honeymoon package. Includes free breakfast and couples spa session.',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'باقة شهر العسل',
      tagEn: 'Honeymoon Package',
      locationAr: 'تعز',
      locationEn: 'Taiz',
    },
  ],
  chalets: [
    {
      id: 1,
      titleAr: 'شاليهات البحيرة',
      titleEn: 'Lake View Chalets',
      descriptionAr: 'شاليهات فاخرة مع إطلالة مباشرة على البحيرة. عرض خاص لنهاية الأسبوع مع خصم 15%.',
      descriptionEn: 'Luxury chalets with direct lake views. Special weekend offer with 15% discount.',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض نهاية الأسبوع',
      tagEn: 'Weekend Offer',
      locationAr: 'صنعاء',
      locationEn: 'Sanaa',
    },
    {
      id: 2,
      titleAr: 'شاليهات الشاطئ',
      titleEn: 'Beach Chalets',
      descriptionAr: 'إطلالة مباشرة على البحر. خصم 25% على الإقامات الطويلة.',
      descriptionEn: 'Direct sea view. 25% discount on extended stays.',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'إقامة طويلة',
      tagEn: 'Long Stay',
      locationAr: 'عدن',
      locationEn: 'Aden',
    },
    {
      id: 3,
      titleAr: 'شاليهات الجبل',
      titleEn: 'Mountain Chalets',
      descriptionAr: 'شاليهات جبلية مع إطلالات بانورامية. باقة عائلية تشمل وجبة إفطار.',
      descriptionEn: 'Mountain chalets with panoramic views. Family package includes breakfast.',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'باقة عائلية',
      tagEn: 'Family Package',
      locationAr: 'إب',
      locationEn: 'Ibb',
    },
    {
      id: 4,
      titleAr: 'شاليهات الواحة',
      titleEn: 'Oasis Chalets',
      descriptionAr: 'واحة من الهدوء والاسترخاء. احجز ليلتين واحصل على الثالثة مجاناً.',
      descriptionEn: 'An oasis of peace and relaxation. Book 2 nights get 3rd free.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'الليلة الثالثة مجاناً',
      tagEn: '3rd Night Free',
      locationAr: 'المكلا',
      locationEn: 'Mukalla',
    },
  ],
  halls: [
    {
      id: 1,
      titleAr: 'قاعة الملكية',
      titleEn: 'Royal Hall',
      descriptionAr: 'قاعة فاخرة للمناسبات والأفراح. احجز الآن واحصل على باقة الضيافة مجاناً.',
      descriptionEn: 'Luxury hall for events and weddings. Book now and get the hospitality package for free.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض العروس',
      tagEn: 'Bridal Offer',
      locationAr: 'صنعاء',
      locationEn: 'Sanaa',
    },
    {
      id: 2,
      titleAr: 'قاعة الأميرة',
      titleEn: 'Princess Hall',
      descriptionAr: 'قاعة مثالية للأعراس. خصم 20% على حجوزات الأيام العادية.',
      descriptionEn: 'Perfect venue for weddings. 20% off on weekday bookings.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'خصم الأيام العادية',
      tagEn: 'Weekday Discount',
      locationAr: 'عدن',
      locationEn: 'Aden',
    },
    {
      id: 3,
      titleAr: 'قاعة المؤتمرات',
      titleEn: 'Conference Hall',
      descriptionAr: 'قاعة مجهزة للمؤتمرات والفعاليات. باقة خاصة تشمل خدمات الصوت والفيديو.',
      descriptionEn: 'Equipped hall for conferences and events. Special package includes AV services.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'باقة المؤتمرات',
      tagEn: 'Conference Package',
      locationAr: 'المكلا',
      locationEn: 'Mukalla',
    },
    {
      id: 4,
      titleAr: 'قاعة الحفلات',
      titleEn: 'Events Hall',
      descriptionAr: 'قاعة متعددة الاستخدامات. خصم 30% على حجوزات المناسبات الخاصة.',
      descriptionEn: 'Multi-purpose hall. 30% off on special events bookings.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'خصم المناسبات',
      tagEn: 'Events Discount',
      locationAr: 'تعز',
      locationEn: 'Taiz',
    },
  ],
  apartments: [
    {
      id: 1,
      titleAr: 'شقق السلام الفندقية',
      titleEn: 'Al Salam Hotel Apartments',
      descriptionAr: 'شقق فندقية فاخرة في قلب المدينة. خصم 25% على الإقامات الشهرية.',
      descriptionEn: 'Luxury hotel apartments in the heart of the city. 25% off on monthly stays.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'إقامة طويلة',
      tagEn: 'Long Stay',
      locationAr: 'صنعاء',
      locationEn: 'Sanaa',
    },
    {
      id: 2,
      titleAr: 'شقق البحر',
      titleEn: 'Sea View Apartments',
      descriptionAr: 'شقق مطلة على البحر. خصم 15% على الحجوزات الأسبوعية.',
      descriptionEn: 'Sea view apartments. 15% off on weekly bookings.',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض الأسبوع',
      tagEn: 'Weekly Offer',
      locationAr: 'عدن',
      locationEn: 'Aden',
    },
    {
      id: 3,
      titleAr: 'شقق المدينة',
      titleEn: 'City Apartments',
      descriptionAr: 'شقق وسط المدينة. الليلة الرابعة مجاناً عند حجز 3 ليالي.',
      descriptionEn: 'Downtown apartments. 4th night free when booking 3 nights.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'الليلة الرابعة مجاناً',
      tagEn: '4th Night Free',
      locationAr: 'المكلا',
      locationEn: 'Mukalla',
    },
    {
      id: 4,
      titleAr: 'شقق الجبل',
      titleEn: 'Mountain Apartments',
      descriptionAr: 'شقق بإطلالة جبلية. باقة شهر العسل تشمل وجبة إفطار مجانية.',
      descriptionEn: 'Mountain view apartments. Honeymoon package includes free breakfast.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'باقة شهر العسل',
      tagEn: 'Honeymoon Package',
      locationAr: 'إب',
      locationEn: 'Ibb',
    },
  ],
  camps: [
    {
      id: 1,
      titleAr: 'طيرمانة الأصالة',
      titleEn: 'Al-Asalah Termanah',
      descriptionAr: 'طيرمانة تقليدية مع إطلالة رائعة. خصم 20% على الجلسات الصباحية.',
      descriptionEn: 'Traditional Termanah with amazing view. 20% off on morning sessions.',
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض الصباح',
      tagEn: 'Morning Offer',
      locationAr: 'صنعاء',
      locationEn: 'Sanaa',
    },
    {
      id: 2,
      titleAr: 'طيرمانة النخبة',
      titleEn: 'Elite Termanah',
      descriptionAr: 'طيرمانة فاخرة مع خدمات VIP. خصم 15% على الجلسات المسائية.',
      descriptionEn: 'Luxury Termanah with VIP services. 15% off on evening sessions.',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض المساء',
      tagEn: 'Evening Offer',
      locationAr: 'عدن',
      locationEn: 'Aden',
    },
    {
      id: 3,
      titleAr: 'طيرمانة الجبل',
      titleEn: 'Mountain Termanah',
      descriptionAr: 'طيرمانة جبلية مع إطلالة بانورامية. باقة خاصة للمجموعات.',
      descriptionEn: 'Mountain Termanah with panoramic view. Special group package.',
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'باقة المجموعات',
      tagEn: 'Group Package',
      locationAr: 'إب',
      locationEn: 'Ibb',
    },
    {
      id: 4,
      titleAr: 'طيرمانة السلطان',
      titleEn: 'Sultan Termanah',
      descriptionAr: 'طيرمانة VIP مع خدمات استثنائية. خصم 25% للحجوزات المتكررة.',
      descriptionEn: 'VIP Termanah with exceptional services. 25% off for repeat bookings.',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=2000&q=80',
      tagAr: 'عرض الولاء',
      tagEn: 'Loyalty Offer',
      locationAr: 'المكلا',
      locationEn: 'Mukalla',
    },
  ],
};

const PROPERTY_TYPES = [
  { id: 'hotels', icon: HotelIcon, labelAr: 'فنادق', labelEn: 'Hotels' },
  { id: 'chalets', icon: Home, labelAr: 'شاليهات واستراحات', labelEn: 'Chalets & Resorts' },
  { id: 'halls', icon: Castle, labelAr: 'صالات أفراح', labelEn: 'Wedding Halls' },
  { id: 'apartments', icon: Building2, labelAr: 'شقق', labelEn: 'Apartments' },
  { id: 'camps', icon: Tent, labelAr: 'طيرامانات', labelEn: 'Camps' },
];

const ROUTE_MAPPING = {
  hotels: 'hotels',
  chalets: 'chalets-resorts',
  halls: 'wedding-halls',
  apartments: 'apartments',
  camps: 'camps',
};

export function OffersPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleBookNow = (type: string, id: number) => {
    const route = ROUTE_MAPPING[type as keyof typeof ROUTE_MAPPING];
    navigate(`/${route}/${id}`);
  };

  // Filter offers based on selected city
  const filteredOffers = Object.entries(FEATURED_ADS).reduce((acc, [type, offers]) => {
    const filteredTypeOffers = offers.filter(offer => 
      selectedCity === 'all' || 
      offer.locationEn.toLowerCase() === selectedCity.toLowerCase() ||
      offer.locationAr === selectedCity
    );
    return { ...acc, [type]: filteredTypeOffers };
  }, {} as typeof FEATURED_ADS);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {language === 'ar' ? 'أفضل العروض والخصومات' : 'Best Offers & Discounts'}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {language === 'ar'
                  ? 'اكتشف أفضل العروض والخصومات على الفنادق والشاليهات والمزيد'
                  : 'Discover the best offers and discounts on hotels, chalets and more'
                }
              </p>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-600 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'استمتع بأجمل العروض' : 'Enjoy Our Best Offers'}
              </h2>
              <div className="mt-2 w-24 h-1 bg-primary-600 mx-auto rounded-full" />
            </div>

            {/* City Filter */}
            <CityFilter selectedCity={selectedCity} onCityChange={handleCityChange} />

            {/* Property Type Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-2 md:gap-4 mb-8">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  selectedType === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'الكل' : 'All'}
                </span>
              </button>
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
                  <span className="text-sm font-medium">
                    {language === 'ar' ? type.labelAr : type.labelEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Featured Ads */}
            {Object.entries(filteredOffers)
              .filter(([key]) => selectedType === 'all' || key === selectedType)
              .map(([key, offers]) => (
                <div key={key} className="space-y-6 mb-12">
                  {/* Section Title */}
                  <h3 className="text-2xl font-bold">
                    {language === 'ar' 
                      ? PROPERTY_TYPES.find(t => t.id === key)?.labelAr 
                      : PROPERTY_TYPES.find(t => t.id === key)?.labelEn}
                  </h3>

                  {/* Offers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {offers.map((offer) => (
                      <div key={offer.id} className="relative overflow-hidden rounded-2xl">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                          style={{
                            backgroundImage: `url("${offer.image}")`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
                        </div>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                          <div className="text-white">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                              {language === 'ar' ? offer.tagAr : offer.tagEn}
                            </span>
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                              {language === 'ar' ? offer.titleAr : offer.titleEn}
                            </h2>
                            <p className="text-white/90 text-sm md:text-base max-w-xl">
                              {language === 'ar' ? offer.descriptionAr : offer.descriptionEn}
                            </p>
                            <div className="flex items-center gap-2 mt-4 text-white/80">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">
                                {language === 'ar' ? offer.locationAr : offer.locationEn}
                              </span>
                            </div>
                          </div>

                          <Button 
                            size="lg" 
                            className="bg-white text-primary-900 hover:bg-white/90 w-full md:w-auto"
                            onClick={() => handleBookNow(key, offer.id)}
                          >
                            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                            <ArrowRight className="w-4 h-4 mr-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}