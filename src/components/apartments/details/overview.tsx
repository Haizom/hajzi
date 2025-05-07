import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Info,
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
} from 'lucide-react';
import { APARTMENT_FEATURES } from '@/data/apartments';

type OverviewProps = {
  apartment: any;
  onBookNowClick: () => void;
};

export function ApartmentOverview({ apartment, onBookNowClick }: OverviewProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <BedDouble className="w-6 h-6 text-primary-600" />
          </div>
          <div className="font-medium text-gray-900">
            {language === 'ar' ? 'غرف النوم' : 'Bedrooms'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {apartment.bedrooms} {language === 'ar' ? 'غرف' : 'rooms'}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <Bath className="w-6 h-6 text-primary-600" />
          </div>
          <div className="font-medium text-gray-900">
            {language === 'ar' ? 'الحمامات' : 'Bathrooms'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {apartment.bathrooms} {language === 'ar' ? 'حمام' : 'bathrooms'}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <Maximize2 className="w-6 h-6 text-primary-600" />
          </div>
          <div className="font-medium text-gray-900">
            {language === 'ar' ? 'المساحة' : 'Area'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {apartment.size} {language === 'ar' ? 'م²' : 'm²'}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <div className="font-medium text-gray-900">
            {language === 'ar' ? 'نوع الإيجار' : 'Rental Type'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {apartment.rentalType === 'daily' 
              ? language === 'ar' ? 'إيجار يومي' : 'Daily Rental'
              : language === 'ar' ? 'إيجار شهري' : 'Monthly Rental'
            }
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-primary-600" />
          {language === 'ar' ? 'المميزات' : 'Features'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {apartment.features.map((feature: string) => {
            const featureInfo = APARTMENT_FEATURES.find((f) => f.id === feature);
            return (
              <div 
                key={feature} 
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary-600" />
                </div>
                <span className="font-medium">
                  {language === 'ar' ? featureInfo?.labelAr : featureInfo?.labelEn}
                </span>
              </div>
            );
          })}
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
              <a href="mailto:info@apartments.com" className="font-medium hover:text-primary-600">
                info@apartments.com
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
              <a href="https://apartments.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary-600">
                www.apartments.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ar' ? 'احجز شقتك الآن' : 'Book Your Apartment Now'}
        </h2>
        <p className="text-primary-100 mb-6">
          {language === 'ar' 
            ? 'استمتع بإقامة مريحة في شقتنا الفاخرة'
            : 'Enjoy a comfortable stay in our luxury apartment'
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