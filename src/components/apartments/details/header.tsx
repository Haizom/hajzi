import { useLanguage } from '@/lib/store/useLanguage';
import { Star, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

type HeaderProps = {
  apartment: any;
  images: string[];
  selectedImage: number | null;
  setSelectedImage: (index: number | null) => void;
  selectedTab: 'overview' | 'sections' | 'reviews' | 'policies';
  setSelectedTab: (tab: 'overview' | 'sections' | 'reviews' | 'policies') => void;
};

export function ApartmentHeader({ 
  apartment, 
  images, 
  selectedImage, 
  setSelectedImage, 
  selectedTab, 
  setSelectedTab 
}: HeaderProps) {
  const { language } = useLanguage();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setSelectedImage(selectedImage === null ? 1 : selectedImage < images.length - 1 ? selectedImage + 1 : 0);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [selectedImage, images.length, setSelectedImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setSelectedImage(selectedImage === null ? 1 : selectedImage < images.length - 1 ? selectedImage + 1 : 0);
    }

    if (touchStart - touchEnd < -75) {
      setSelectedImage(selectedImage === null ? images.length - 1 : selectedImage > 0 ? selectedImage - 1 : images.length - 1);
    }
  };

  return (
    <>
      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <div 
            className="aspect-[16/9] overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[selectedImage ?? 0]}
              alt="Apartment"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedImage === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        {/* Title and Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {language === 'ar' ? apartment.titleAr : apartment.titleEn}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-primary-600 fill-current" />
                <span className="font-medium">{apartment.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{language === 'ar' ? apartment.locationAr : apartment.locationEn}</span>
              </div>
            </div>
            <div className="text-gray-600">
              {language === 'ar' ? apartment.addressAr : apartment.addressEn}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto whitespace-nowrap gap-2">
            {[
              { id: 'overview', labelAr: 'نظرة عامة', labelEn: 'Overview' },
              { id: 'sections', labelAr: 'الشقة', labelEn: 'Apartment' },
              { id: 'reviews', labelAr: 'التقييمات', labelEn: 'Reviews' },
              { id: 'policies', labelAr: 'السياسات', labelEn: 'Policies' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}