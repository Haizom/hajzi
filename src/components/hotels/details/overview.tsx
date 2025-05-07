import { useLanguage } from '@/lib/store/useLanguage';
import { AMENITIES } from '@/data/hotels';
import { 
  Users, 
  Bed, 
  Bath, 
  Maximize2, 
  Clock, 
  Calendar,
  CheckCircle2,
  Star,
  Coffee,
  Wifi,
  Car,
  UtensilsCrossed,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield
} from 'lucide-react';
import { AmenityIcon } from '@/components/ui/amenity-icon';
import { Button } from '@/components/ui/button';

type OverviewProps = {
  hotel: any; // Replace with proper type
  onBookNowClick: () => void;
};

const QUICK_INFO = [
  { 
    icon: Building2, 
    labelAr: 'نوع الفندق',
    labelEn: 'Hotel Type',
    valueAr: '5 نجوم',
    valueEn: '5 Stars'
  },
  {
    icon: Users,
    labelAr: 'عدد الغرف',
    labelEn: 'Rooms',
    valueAr: '120 غرفة',
    valueEn: '120 Rooms'
  },
  {
    icon: MapPin,
    labelAr: 'الموقع',
    labelEn: 'Location',
    valueAr: 'وسط المدينة',
    valueEn: 'City Center'
  },
  {
    icon: Globe,
    labelAr: 'المسافة',
    labelEn: 'Distance',
    valueAr: '2 كم من المطار',
    valueEn: '2 km from airport'
  }
];

const SERVICES = [
  {
    icon: Clock,
    titleAr: 'خدمة 24/7',
    titleEn: '24/7 Service',
  },
  {
    icon: Car,
    titleAr: 'خدمة صف السيارات',
    titleEn: 'Valet Parking',
  },
  {
    icon: Coffee,
    titleAr: 'إفطار مجاني',
    titleEn: 'Free Breakfast',
  },
  {
    icon: Shield,
    titleAr: 'أمن وحماية',
    titleEn: 'Security',
  }
];

export function HotelOverview({ hotel, onBookNowClick }: OverviewProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_INFO.map((info, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <info.icon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="font-medium text-gray-900">
              {language === 'ar' ? info.labelAr : info.labelEn}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {language === 'ar' ? info.valueAr : info.valueEn}
            </div>
          </div>
        ))}
      </div>

      {/* Premium Services */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-primary-600" />
          {language === 'ar' ? 'خدمات مميزة' : 'Premium Services'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                <service.icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-medium text-gray-900">
                {language === 'ar' ? service.titleAr : service.titleEn}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-primary-600" />
          {language === 'ar' ? 'المرافق' : 'Amenities'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotel.amenities.map((amenity: string) => {
            const amenityInfo = AMENITIES.find((a) => a.id === amenity);
            return (
              <div 
                key={amenity} 
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <AmenityIcon id={amenity} className="w-5 h-5 text-primary-600" />
                </div>
                <span className="font-medium">
                  {language === 'ar' ? amenityInfo?.labelAr : amenityInfo?.labelEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ar' ? 'احجز إقامتك الآن' : 'Book Your Stay Now'}
        </h2>
        <p className="text-primary-100 mb-6">
          {language === 'ar' 
            ? 'استمتع بإقامة لا تُنسى في فندقنا الفاخر'
            : 'Enjoy an unforgettable stay at our luxury hotel'
          }
        </p>
        <Button 
          size="lg" 
          className="bg-white text-primary-900 hover:bg-primary-50"
          onClick={onBookNowClick}
        >
          {language === 'ar' ? 'احجز الآن' : 'Book Now'}
        </Button>
      </div>
    </div>
  );
}