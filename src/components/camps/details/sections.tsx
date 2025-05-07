import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock,
  Maximize2, 
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Star,
  Coffee,
  Wifi,
  Car,
  UtensilsCrossed,
  Mountain,
  Sofa,
  Sunset
} from 'lucide-react';
import { TERMANAT_FEATURES } from '@/data/termanat';

type SectionsProps = {
  termanah: any;
  selectedSection: string | null;
  setSelectedSection: (id: string | null) => void;
};

const getFeatureIcon = (feature: string) => {
  const icons: Record<string, any> = {
    'view': Mountain,
    'privacy': Info,
    'seating': Sofa,
    'parking': Car,
    'tv': Info,
    'sound': Info,
    'lighting': Info,
    'service': UtensilsCrossed,
  };
  return icons[feature] || Info;
};

export function TermanahSections({ termanah, selectedSection, setSelectedSection }: SectionsProps) {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ sectionId: string; index: number } | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});

  const handleNextImage = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const section = TERMANAT_FEATURES.find(f => f.id === sectionId);
    if (!section) return;
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [sectionId]: ((prev[sectionId] || 0) + 1) % termanah.images.length
    }));
  };

  const handlePrevImage = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const section = TERMANAT_FEATURES.find(f => f.id === sectionId);
    if (!section) return;
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [sectionId]: ((prev[sectionId] || 0) - 1 + termanah.images.length) % termanah.images.length
    }));
  };

  const formatPrice = (price: number, currency: string) => {
    const currencyLabel = language === 'ar'
      ? currency === 'YER' ? 'يمني'
        : currency === 'SAR' ? 'سعودي'
        : 'دولار'
      : currency;

    return language === 'ar'
      ? `${price} ${currencyLabel}`
      : `${price} ${currency}`;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {termanah.features.map((feature: string) => {
        const featureInfo = TERMANAT_FEATURES.find(f => f.id === feature);
        if (!featureInfo) return null;

        return (
          <div
            key={feature}
            className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${
              selectedSection === feature 
                ? 'ring-2 ring-primary-500 shadow-lg transform scale-[1.02]' 
                : 'hover:border-primary-200 hover:shadow-md'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image Gallery */}
              <div className="relative h-64 lg:h-full lg:col-span-1 group">
                <img
                  src={termanah.images[currentImageIndexes[feature] || 0]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Navigation Arrows */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handlePrevImage(feature, e)}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleNextImage(feature, e)}
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>

                {/* Expand Button */}
                <button
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage({ 
                      sectionId: feature, 
                      index: currentImageIndexes[feature] || 0 
                    });
                  }}
                >
                  <Expand className="w-5 h-5 text-gray-800" />
                </button>

                {/* Navigation Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {termanah.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        (currentImageIndexes[feature] || 0) === index
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndexes(prev => ({ ...prev, [feature]: index }));
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
                      {language === 'ar' ? featureInfo.labelAr : featureInfo.labelEn}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'ar' ? termanah.descriptionAr : termanah.descriptionEn}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-primary-600" />
                      <span>
                        {termanah.capacity} {language === 'ar' ? 'شخص' : 'people'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span>
                        {language === 'ar' ? 'صباحي ومسائي' : 'Morning & Evening'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Maximize2 className="w-5 h-5 text-primary-600" />
                      <span>
                        {termanah.size} {language === 'ar' ? 'م²' : 'm²'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">
                      {language === 'ar' ? 'المميزات' : 'Features'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {termanah.features.map((f: string) => {
                        const fInfo = TERMANAT_FEATURES.find((feat) => feat.id === f);
                        const FeatureIcon = getFeatureIcon(f);
                        return (
                          <div
                            key={f}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            <FeatureIcon className="w-4 h-4" />
                            <span>
                              {language === 'ar' ? fInfo?.labelAr : fInfo?.labelEn}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    {/* Price Section */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {language === 'ar' ? 'السعر في الجلسة:' : 'Price per session:'}
                      </span>
                      <span className="text-base font-semibold text-primary-600">
                        {formatPrice(termanah.price, termanah.currency)}
                      </span>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex gap-2">
                      <Button>
                        {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedSection(selectedSection === feature ? null : feature)}
                      >
                        {language === 'ar' ? 'تفاصيل أكثر' : 'More Details'}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedSection === feature && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">
                            {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
                          </h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary-600" />
                              {language === 'ar' ? 'خدمة ضيافة متكاملة' : 'Full hospitality service'}
                            </li>
                            <li className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary-600" />
                              {language === 'ar' ? 'إطلالة مميزة' : 'Premium view'}
                            </li>
                            <li className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary-600" />
                              {language === 'ar' ? 'خدمة تنظيف' : 'Cleaning service'}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">
                            {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
                          </h4>
                          <p className="text-gray-600">
                            {language === 'ar'
                              ? 'إلغاء مجاني حتى ساعتين قبل موعد الجلسة'
                              : 'Free cancellation up to 2 hours before the session'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

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
              const purpose = TERMANAT_FEATURES[selectedImage.sectionId as keyof typeof TERMANAT_FEATURES];
              if (!purpose) return;
              setSelectedImage({
                sectionId: selectedImage.sectionId,
                index: (selectedImage.index - 1 + termanah.images.length) % termanah.images.length
              });
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              const purpose = TERMANAT_FEATURES[selectedImage.sectionId as keyof typeof TERMANAT_FEATURES];
              if (!purpose) return;
              setSelectedImage({
                sectionId: selectedImage.sectionId,
                index: (selectedImage.index + 1) % termanah.images.length
              });
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={termanah.images[selectedImage.index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}