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
import { ROOMS } from '@/data/rooms';
import { useParams } from 'react-router-dom';
import { HOTELS_DATA } from '@/data/hotels';
import { HotelBookingModal } from './booking-modal';

type RoomsProps = {
  selectedRoom: string | null;
  setSelectedRoom: (id: string | null) => void;
};

const getFeatureIcon = (feature: string) => {
  const icons: Record<string, any> = {
    'wifi': Info,
    'breakfast': Info,
    'tv': Info,
    'minibar': Info,
    'lounge': Info,
    'bathtub': Info,
    'kitchen': Info,
    'balcony': Info,
  };
  return icons[feature] || Info;
};

export function HotelRooms({ selectedRoom, setSelectedRoom }: RoomsProps) {
  const { language } = useLanguage();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<{ roomId: number; index: number } | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<number, number>>({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingRoom, setSelectedBookingRoom] = useState<any>(null);

  // Get the hotel to match room currency
  const hotel = HOTELS_DATA.find(h => h.id === Number(id));
  if (!hotel) return null;

  // Filter rooms to match hotel currency
  const hotelRooms = ROOMS.filter(room => room.currency === hotel.currency);

  const handleNextImage = (roomId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const room = hotelRooms.find(r => r.id === roomId);
    if (!room) return;
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % room.images.length
    }));
  };

  const handlePrevImage = (roomId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const room = hotelRooms.find(r => r.id === roomId);
    if (!room) return;
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + room.images.length) % room.images.length
    }));
  };

  const handleBookNow = (room: any) => {
    setSelectedBookingRoom(room);
    setIsBookingModalOpen(true);
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
      {hotelRooms.map((room) => (
        <div
          key={room.id}
          className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${
            selectedRoom === String(room.id) 
              ? 'ring-2 ring-primary-500 shadow-lg transform scale-[1.02]' 
              : 'hover:border-primary-200 hover:shadow-md'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Gallery */}
            <div className="relative h-64 lg:h-full lg:col-span-1 group">
              <img
                src={room.images[currentImageIndexes[room.id] || 0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Navigation Arrows */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handlePrevImage(room.id, e)}
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleNextImage(room.id, e)}
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              {/* Expand Button */}
              <button
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage({ 
                    roomId: room.id, 
                    index: currentImageIndexes[room.id] || 0 
                  });
                }}
              >
                <Expand className="w-5 h-5 text-gray-800" />
              </button>

              {/* Navigation Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {room.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      (currentImageIndexes[room.id] || 0) === index
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndexes(prev => ({ ...prev, [room.id]: index }));
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
                    {language === 'ar' ? room.titleAr : room.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? room.descriptionAr : room.descriptionEn}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-primary-600" />
                    <span>
                      {room.capacity} {language === 'ar' ? 'ضيوف' : 'guests'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BedDouble className="w-5 h-5 text-primary-600" />
                    <span>
                      {room.beds} {language === 'ar' ? 'سرير' : 'beds'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bath className="w-5 h-5 text-primary-600" />
                    <span>
                      {room.bathrooms} {language === 'ar' ? 'حمام' : 'bath'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Maximize2 className="w-5 h-5 text-primary-600" />
                    <span>
                      {room.size} {language === 'ar' ? 'م²' : 'm²'}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    {language === 'ar' ? 'المميزات' : 'Features'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => {
                      const FeatureIcon = getFeatureIcon(feature);
                      return (
                        <div
                          key={feature}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <FeatureIcon className="w-4 h-4" />
                          <span>
                            {language === 'ar'
                              ? {
                                  wifi: 'واي فاي',
                                  breakfast: 'فطور',
                                  tv: 'تلفاز',
                                  minibar: 'ميني بار',
                                  lounge: 'صالة جلوس',
                                  bathtub: 'حوض استحمام',
                                  kitchen: 'مطبخ',
                                  balcony: 'شرفة'
                                }[feature]
                              : feature.charAt(0).toUpperCase() + feature.slice(1)
                            }
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
                      {language === 'ar' ? 'السعر في الليلة:' : 'Price per night:'}
                    </span>
                    <span className="text-base font-semibold text-primary-600">
                      {room.price} {getCurrencyLabel(room.currency)}
                    </span>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex gap-2">
                    <Button onClick={() => handleBookNow(room)}>
                      {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedRoom(selectedRoom === String(room.id) ? null : String(room.id))}
                    >
                      {language === 'ar' ? 'تفاصيل أكثر' : 'More Details'}
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedRoom === String(room.id) && (
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
      ))}

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
              const room = hotelRooms.find(r => r.id === selectedImage.roomId);
              if (!room) return;
              setSelectedImage({
                roomId: selectedImage.roomId,
                index: (selectedImage.index - 1 + room.images.length) % room.images.length
              });
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              const room = hotelRooms.find(r => r.id === selectedImage.roomId);
              if (!room) return;
              setSelectedImage({
                roomId: selectedImage.roomId,
                index: (selectedImage.index + 1) % room.images.length
              });
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={hotelRooms.find(r => r.id === selectedImage.roomId)?.images[selectedImage.index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && selectedBookingRoom && hotel && (
        <HotelBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedBookingRoom(null);
          }}
          hotel={hotel}
          room={selectedBookingRoom}
        />
      )}
    </div>
  );
}