import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Music,
  Utensils,
  Palette,
  Calendar,
  Star,
  CheckCircle2,
  Coffee,
  Wifi,
  Car,
  UtensilsCrossed,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Camera,
  Sun,
  Sofa
} from 'lucide-react';
import { HALL_PURPOSES_DETAILS } from '@/data/wedding-halls';
import { useState, useEffect, useRef } from 'react';

type BookingProps = {
  hall: any;
  selectedPurpose: string | null;
  setSelectedPurpose: (purpose: string | null) => void;
};

const getFeatureIcon = (featureId: string) => {
  const icons: Record<string, any> = {
    'decoration': Palette,
    'catering': Utensils,
    'parking': Car,
    'sound': Music,
    'coffee': Coffee,
    'wifi': Wifi,
    'stage': Building2,
    'photo': Camera,
    'lighting': Sun,
    'seating': Sofa,
  };
  return icons[featureId] || CheckCircle2;
};

export function HallBooking({ hall, selectedPurpose, setSelectedPurpose }: BookingProps) {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ purposeId: string; index: number } | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (selectedPurpose) {
      autoPlayRef.current = setInterval(() => {
        const purpose = HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS];
        if (!purpose) return;
        
        setCurrentImageIndexes(prev => ({
          ...prev,
          [selectedPurpose]: ((prev[selectedPurpose] || 0) + 1) % purpose.images.length
        }));
      }, 5000);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [selectedPurpose, currentImageIndexes]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = (purposeId: string) => {
    const purpose = HALL_PURPOSES_DETAILS[purposeId as keyof typeof HALL_PURPOSES_DETAILS];
    if (!purpose) return;

    if (touchStart - touchEnd > 75) {
      setCurrentImageIndexes(prev => ({
        ...prev,
        [purposeId]: ((prev[purposeId] || 0) + 1) % purpose.images.length
      }));
    }

    if (touchStart - touchEnd < -75) {
      setCurrentImageIndexes(prev => ({
        ...prev,
        [purposeId]: ((prev[purposeId] || 0) - 1 + purpose.images.length) % purpose.images.length
      }));
    }
  };

  const handleNextImage = (purposeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const purpose = HALL_PURPOSES_DETAILS[purposeId as keyof typeof HALL_PURPOSES_DETAILS];
    if (!purpose) return;
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [purposeId]: ((prev[purposeId] || 0) + 1) % purpose.images.length
    }));
  };

  const handlePrevImage = (purposeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const purpose = HALL_PURPOSES_DETAILS[purposeId as keyof typeof HALL_PURPOSES_DETAILS];
    if (!purpose) return;
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [purposeId]: ((prev[purposeId] || 0) - 1 + purpose.images.length) % purpose.images.length
    }));
  };

  const getCurrencyLabel = (currency: string) => {
    if (language === 'ar') {
      switch (currency) {
        case 'YER':
          return 'ريال يمني';
        case 'SAR':
          return 'ريال سعودي';
        case 'USD':
          return 'دولار';
        default:
          return currency;
      }
    }
    return currency;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Event Type Filter */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-6">
          {language === 'ar' ? 'اختر نوع المناسبة' : 'Choose Event Type'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(HALL_PURPOSES_DETAILS).map(([key, purpose]) => (
            <button
              key={key}
              onClick={() => setSelectedPurpose(selectedPurpose === key ? null : key)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedPurpose === key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? purpose.titleAr : purpose.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Purpose Details */}
      {selectedPurpose && (
        <div 
          className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${
            showMoreDetails 
              ? 'ring-2 ring-primary-500 shadow-lg transform scale-[1.02]' 
              : 'hover:border-primary-200 hover:shadow-md'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Gallery */}
            <div className="relative h-64 lg:h-full lg:col-span-1 group">
              <div 
                className="relative h-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(selectedPurpose)}
              >
                <img
                  src={HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].images[currentImageIndexes[selectedPurpose] || 0]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Navigation Arrows */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handlePrevImage(selectedPurpose, e)}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleNextImage(selectedPurpose, e)}
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
                  {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndexes(prev => ({ ...prev, [selectedPurpose]: index }))}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        (currentImageIndexes[selectedPurpose] || 0) === index
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Expand Button */}
                <button
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage({ 
                      purposeId: selectedPurpose, 
                      index: currentImageIndexes[selectedPurpose] || 0 
                    });
                  }}
                >
                  <Expand className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:col-span-2">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">
                    {language === 'ar' 
                      ? HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].titleAr 
                      : HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar'
                      ? HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].descriptionAr
                      : HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].descriptionEn}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-primary-600" />
                    <span>
                      {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].capacity} 
                      {' '}{language === 'ar' ? 'شخص' : 'guests'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span>
                      {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].period}
                      {' '}{language === 'ar' ? 'ساعات' : 'hours'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Maximize2 className="w-5 h-5 text-primary-600" />
                    <span>
                      {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].size}
                      {' '}{language === 'ar' ? 'م²' : 'm²'}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    {language === 'ar' ? 'المميزات' : 'Features'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].features.map((feature) => {
                      const FeatureIcon = getFeatureIcon(feature.id);
                      return (
                        <div
                          key={feature.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <FeatureIcon className="w-4 h-4" />
                          <span>
                            {language === 'ar' ? feature.labelAr : feature.labelEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price and Buttons Section */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  {/* Price Section */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {language === 'ar' ? 'السعر:' : 'Price:'}
                    </span>
                    <span className="text-base font-semibold text-primary-600">
                      {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].price[hall.currency]} {getCurrencyLabel(hall.currency)}
                    </span>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex gap-2">
                    <Button>
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                    >
                      {language === 'ar' ? 'تفاصيل أكثر' : 'More Details'}
                    </Button>
                  </div>
                </div>

                {/* Additional Details Section */}
                {showMoreDetails && (
                  <div className="w-full mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-4">
                      {language === 'ar' ? 'تفاصيل إضافية' : 'Additional Details'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* سعة الصالة */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-primary-600" />
                        <span>
                          {language === 'ar' ? 'سعة الصالة' : 'Hall Capacity'}:{' '}
                          {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].capacity}{' '}
                          {language === 'ar' ? 'شخص' : 'guests'}
                        </span>
                      </div>

                      {/* مساحة الصالة */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Maximize2 className="w-5 h-5 text-primary-600" />
                        <span>
                          {language === 'ar' ? 'مساحة الصالة' : 'Hall Size'}:{' '}
                          {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].size}{' '}
                          {language === 'ar' ? 'م²' : 'm²'}
                        </span>
                      </div>

                      {/* الإطلالة */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-5 h-5 text-primary-600" />
                        <span>
                          {language === 'ar' ? 'الإطلالة' : 'View'}:{' '}
                          {language === 'ar' ? 'إطلالة على المدينة' : 'City View'}
                        </span>
                      </div>

                      {/* الخدمات الإضافية */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-primary-600" />
                        <span>
                          {language === 'ar' ? 'الخدمات الإضافية' : 'Additional Services'}:{' '}
                          {language === 'ar' ? 'تزيين، تصوير، صوتيات، إضاءة' : 'Decoration, Photography, Sound, Lighting'}
                        </span>
                      </div>

                      {/* سياسة الإلغاء */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-5 h-5 text-primary-600" />
                        <span>
                          {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}:{' '}
                          {language === 'ar' ? 'إلغاء مجاني حتى 24 ساعة قبل الحدث' : 'Free cancellation up to 24 hours before the event'}
                        </span>
                      </div>

                      {/* المدة */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-primary-600" />
                        <span>
                          {language === 'ar' ? 'المدة' : 'Duration'}:{' '}
                          {HALL_PURPOSES_DETAILS[selectedPurpose as keyof typeof HALL_PURPOSES_DETAILS].period}{' '}
                          {language === 'ar' ? 'ساعات' : 'hours'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
              const purpose = HALL_PURPOSES_DETAILS[selectedImage.purposeId as keyof typeof HALL_PURPOSES_DETAILS];
              if (!purpose) return;
              setSelectedImage({
                purposeId: selectedImage.purposeId,
                index: (selectedImage.index - 1 + purpose.images.length) % purpose.images.length
              });
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              const purpose = HALL_PURPOSES_DETAILS[selectedImage.purposeId as keyof typeof HALL_PURPOSES_DETAILS];
              if (!purpose) return;
              setSelectedImage({
                purposeId: selectedImage.purposeId,
                index: (selectedImage.index + 1) % purpose.images.length
              });
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={HALL_PURPOSES_DETAILS[selectedImage.purposeId as keyof typeof HALL_PURPOSES_DETAILS].images[selectedImage.index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}