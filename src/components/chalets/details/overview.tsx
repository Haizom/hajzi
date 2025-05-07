import { useLanguage } from '@/lib/store/useLanguage';
import { CHALET_FEATURES } from '@/data/chalets';
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
  Shield,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type OverviewProps = {
  chalet: any; // Replace with proper type
  onBookNowClick?: () => void;
};

const QUICK_INFO = [
  { 
    icon: Home, 
    labelAr: 'نوع العقار',
    labelEn: 'Property Type',
    valueAr: 'شاليه فاخر',
    valueEn: 'Luxury Chalet'
  },
  {
    icon: Users,
    labelAr: 'السعة',
    labelEn: 'Capacity',
    valueAr: 'حتى 8 أشخاص',
    valueEn: 'Up to 8 people'
  },
  {
    icon: MapPin,
    labelAr: 'الموقع',
    labelEn: 'Location',
    valueAr: 'شاطئ خاص',
    valueEn: 'Private Beach'
  },
  {
    icon: Maximize2,
    labelAr: 'المساحة',
    labelEn: 'Area',
    valueAr: '200 متر مربع',
    valueEn: '200 sqm'
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
    titleAr: 'موقف خاص',
    titleEn: 'Private Parking',
  },
  {
    icon: Coffee,
    titleAr: 'مطبخ مجهز',
    titleEn: 'Equipped Kitchen',
  },
  {
    icon: Shield,
    titleAr: 'أمن وحماية',
    titleEn: 'Security',
  }
];

export function ChaletOverview({ chalet, onBookNowClick }: OverviewProps) {
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

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Phone className="w-6 h-6 text-primary-600" />
          {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
              </div>
              <a href="tel:+967500000000" className="font-medium hover:text-primary-600">
                +967 50 000 0000
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </div>
              <a href="mailto:info@chalet.com" className="font-medium hover:text-primary-600">
                info@chalet.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
              </div>
              <a href="https://chalet.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary-600">
                www.chalet.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-primary-600" />
          {language === 'ar' ? 'المميزات' : 'Features'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chalet.features.map((feature: string) => {
            const featureInfo = CHALET_FEATURES.find((f) => f.id === feature);
            return (
              <div 
                key={feature} 
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-600" />
                </div>
                <span className="font-medium">
                  {language === 'ar' ? featureInfo?.labelAr : featureInfo?.labelEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-primary-600" />
          {language === 'ar' ? 'المرافق' : 'Amenities'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chalet.amenities.map((amenity: string) => {
            const amenityInfo = AMENITIES.find((a) => a.id === amenity);
            return (
              <div 
                key={amenity} 
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  {amenity === 'wifi' && <Wifi className="w-5 h-5 text-primary-600" />}
                  {amenity === 'parking' && <Car className="w-5 h-5 text-primary-600" />}
                  {amenity === 'kitchen' && <UtensilsCrossed className="w-5 h-5 text-primary-600" />}
                  {!['wifi', 'parking', 'kitchen'].includes(amenity) && (
                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                  )}
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
            ? 'استمتع بإقامة لا تُنسى في شاليه فاخر'
            : 'Enjoy an unforgettable stay at our luxury chalet'
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