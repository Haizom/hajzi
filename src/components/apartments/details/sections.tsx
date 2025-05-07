// Update the sections component to handle booking
import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Star
} from 'lucide-react';
import { APARTMENT_FEATURES } from '@/data/apartments';
import { useParams } from 'react-router-dom';
import { APARTMENTS_DATA } from '@/data/apartments';
import { ApartmentBookingModal } from './booking-modal';

type SectionsProps = {
  apartment: any;
  selectedSection: string | null;
  setSelectedSection: (id: string | null) => void;
};

export function ApartmentSections({ apartment, selectedSection, setSelectedSection }: SectionsProps) {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ sectionId: string; index: number } | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingSection, setSelectedBookingSection] = useState<any>(null);

  const handleNextImage = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndexes(prev => ({
      ...prev,
      [sectionId]: ((prev[sectionId] || 0) + 1) % apartment.images.length
    }));
  };

  const handlePrevImage = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndexes(prev => ({
      ...prev,
      [sectionId]: ((prev[sectionId] || 0) - 1 + apartment.images.length) % apartment.images.length
    }));
  };

  const handleBookNow = (section: any) => {
    setSelectedBookingSection(section);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div
        className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${
          selectedSection === 'main' 
            ? 'ring-2 ring-primary-500 shadow-lg transform scale-[1.02]' 
            : 'hover:border-primary-200 hover:shadow-md'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Gallery */}
          <div className="relative h-64 lg:h-full lg:col-span-1 group">
            <img
              src={apartment.images?.[currentImageIndexes['main'] || 0] || apartment.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handlePrevImage('main', e)}
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleNextImage('main', e)}
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>

            {/* Expand Button */}
            <button
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage({ 
                  sectionId: 'main', 
                  index: currentImageIndexes['main'] || 0 
                });
              }}
            >
              <Expand className="w-5 h-5 text-gray-800" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {(apartment.images || [apartment.image]).map((_: any, index: number) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    (currentImageIndexes['main'] || 0) === index
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndexes(prev => ({ ...prev, main: index }));
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:col-span-2">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? apartment.titleAr : apartment.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? apartment.descriptionAr : apartment.descriptionEn}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <BedDouble className="w-5 h-5 text-primary-600" />
                  <span>{apartment.bedrooms} {language === 'ar' ? 'غرف نوم' : 'bedrooms'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bath className="w-5 h-5 text-primary-600" />
                  <span>{apartment.bathrooms} {language === 'ar' ? 'حمام' : 'bathrooms'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span>{apartment.capacity || 4} {language === 'ar' ? 'أشخاص' : 'people'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Maximize2 className="w-5 h-5 text-primary-600" />
                  <span>{apartment.size} {language === 'ar' ? 'م²' : 'm²'}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">
                  {language === 'ar' ? 'المميزات' : 'Features'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {apartment.features.map((feature: string) => {
                    const featureInfo = APARTMENT_FEATURES.find((f) => f.id === feature);
                    return (
                      <div
                        key={feature}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        <span>
                          {language === 'ar' ? featureInfo?.labelAr : featureInfo?.labelEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' 
                      ? apartment.rentalType === 'daily' ? 'السعر في اليوم:' : 'السعر في الشهر:'
                      : apartment.rentalType === 'daily' ? 'Price per day:' : 'Price per month:'
                    }
                  </span>
                  <span className="text-base font-semibold text-primary-600">
                    {apartment.price} {apartment.currency}
                    <span className="text-xs opacity-75">
                      {' '}{apartment.rentalType === 'daily' 
                        ? language === 'ar' ? '/ يوم' : '/ day'
                        : language === 'ar' ? '/ شهر' : '/ month'
                      }
                    </span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleBookNow(apartment)}>
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSection(selectedSection === 'main' ? null : 'main')}
                  >
                    {language === 'ar' ? 'تفاصيل أكثر' : 'More Details'}
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedSection === 'main' && (
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">
                        {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-primary-600" />
                          {language === 'ar' ? 'مطبخ مجهز بالكامل' : 'Fully equipped kitchen'}
                        </li>
                        <li className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-primary-600" />
                          {language === 'ar' ? 'تكييف مركزي' : 'Central AC'}
                        </li>
                        <li className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-primary-600" />
                          {language === 'ar' ? 'خدمة تنظيف يومية' : 'Daily cleaning service'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">
                        {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'ar'
                          ? 'إلغاء مجاني حتى 24 ساعة قبل موعد الوصول'
                          : 'Free cancellation up to 24 hours before check-in'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
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
              setSelectedImage({
                sectionId: selectedImage.sectionId,
                index: (selectedImage.index - 1 + apartment.images.length) % apartment.images.length
              });
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage({
                sectionId: selectedImage.sectionId,
                index: (selectedImage.index + 1) % apartment.images.length
              });
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={apartment.images[selectedImage.index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && selectedBookingSection && (
        <ApartmentBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedBookingSection(null);
          }}
          apartment={apartment}
        />
      )}
    </div>
  );
}