import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { Camera, ChevronLeft, ChevronRight, X, Landmark, Hotel, Home, MapPin, Star } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

const CITIES_DATA = {
  'old-sanaa': {
    titleAr: 'صنعاء القديمة',
    titleEn: 'Old Sanaa',
    descriptionAr: 'تعد صنعاء القديمة من أقدم المدن المأهولة في العالم وهي مدرجة في قائمة التراث العالمي لليونسكو. تتميز بعمارتها الفريدة وبيوتها التاريخية المزينة وأسواقها العتيقة التي تعكس تاريخاً عريقاً يمتد لآلاف السنين.',
    descriptionEn: 'Old Sanaa is one of the oldest continuously inhabited cities in the world and a UNESCO World Heritage site. Known for its unique architecture, decorated historical houses, and ancient markets that reflect a rich history spanning thousands of years.',
    mainImage: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
    ],
    landmarks: [
      {
        titleAr: 'باب اليمن',
        titleEn: 'Bab Al-Yemen',
        descriptionAr: 'بوابة تاريخية تعد المدخل الرئيسي للمدينة القديمة، بنيت في القرن الثامن عشر',
        descriptionEn: 'A historic gate serving as the main entrance to the old city, built in the 18th century',
      },
      {
        titleAr: 'جامع الكبير',
        titleEn: 'Great Mosque',
        descriptionAr: 'أقدم مسجد في صنعاء، بني في عهد الرسول محمد ﷺ، يتميز بعمارته الإسلامية الفريدة',
        descriptionEn: 'The oldest mosque in Sanaa, built during Prophet Muhammad\'s time, featuring unique Islamic architecture',
      },
      {
        titleAr: 'سوق الملح',
        titleEn: 'Salt Market',
        descriptionAr: 'سوق تقليدي يعرض المنتجات اليمنية التقليدية والحرف اليدوية',
        descriptionEn: 'A traditional market showcasing Yemeni traditional products and handicrafts',
      },
      {
        titleAr: 'دار الحجر',
        titleEn: 'Dar Al-Hajar',
        descriptionAr: 'قصر صخري مميز يقع على قمة صخرة، بني في ثلاثينيات القرن العشرين',
        descriptionEn: 'A distinctive rock palace perched atop a rock formation, built in the 1930s',
      },
    ],
    hotels: [
      {
        titleAr: 'فندق تاج سبأ',
        titleEn: 'Taj Sheba Hotel',
        rating: 4.5,
        priceAr: 'يبدأ من 200 دولار',
        priceEn: 'Starting from $200',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleAr: 'فندق قصر صنعاء',
        titleEn: 'Sanaa Palace Hotel',
        rating: 4.2,
        priceAr: 'يبدأ من 150 دولار',
        priceEn: 'Starting from $150',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      },
    ],
    chalets: [
      {
        titleAr: 'شاليهات وادي ظهر',
        titleEn: 'Wadi Dhahr Chalets',
        rating: 4.7,
        priceAr: 'يبدأ من 180 دولار',
        priceEn: 'Starting from $180',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleAr: 'شاليهات روضة صنعاء',
        titleEn: 'Rawdah Sanaa Chalets',
        rating: 4.4,
        priceAr: 'يبدأ من 160 دولار',
        priceEn: 'Starting from $160',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
};

export function CityPage() {
  const { cityId } = useParams();
  const { language } = useLanguage();
  const city = CITIES_DATA[cityId as keyof typeof CITIES_DATA];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${city.mainImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {language === 'ar' ? city.titleAr : city.titleEn}
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                {language === 'ar' ? city.descriptionAr : city.descriptionEn}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Photo Gallery */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary-600" />
              {language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {city.gallery.map((imageUrl, index) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Landmarks */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Landmark className="w-6 h-6 text-primary-600" />
              {language === 'ar' ? 'المعالم السياحية' : 'Tourist Landmarks'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.landmarks.map((landmark, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'ar' ? landmark.titleAr : landmark.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? landmark.descriptionAr : landmark.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Hotels */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Hotel className="w-6 h-6 text-primary-600" />
              {language === 'ar' ? 'الفنادق' : 'Hotels'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.hotels.map((hotel, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={hotel.image}
                      alt={language === 'ar' ? hotel.titleAr : hotel.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? hotel.titleAr : hotel.titleEn}
                    </h3>
                    <p className="text-primary-600 font-bold">
                      {language === 'ar' ? hotel.priceAr : hotel.priceEn}
                    </p>
                    <Button className="w-full mt-4">
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chalets */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Home className="w-6 h-6 text-primary-600" />
              {language === 'ar' ? 'الشاليهات' : 'Chalets'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.chalets.map((chalet, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={chalet.image}
                      alt={language === 'ar' ? chalet.titleAr : chalet.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{chalet.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? chalet.titleAr : chalet.titleEn}
                    </h3>
                    <p className="text-primary-600 font-bold">
                      {language === 'ar' ? chalet.priceAr : chalet.priceEn}
                    </p>
                    <Button className="w-full mt-4">
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Image Modal */}
          {selectedImage !== null && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage > 0 ? selectedImage - 1 : city.gallery.length - 1);
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage < city.gallery.length - 1 ? selectedImage + 1 : 0);
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <img
                src={city.gallery[selectedImage]}
                alt=""
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}