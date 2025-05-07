import { useLanguage } from '@/lib/store/useLanguage';
import { 
  Users, 
  MapPin, 
  Star,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Shield,
  Calendar,
  Music,
  Utensils,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type OverviewProps = {
  hall: any;
};

const SERVICES = [
  {
    icon: Calendar,
    titleAr: 'حجز مرن',
    titleEn: 'Flexible Booking',
  },
  {
    icon: Music,
    titleAr: 'نظام صوت متكامل',
    titleEn: 'Sound System',
  },
  {
    icon: Utensils,
    titleAr: 'خدمة ضيافة',
    titleEn: 'Catering Service',
  },
  {
    icon: Palette,
    titleAr: 'خدمة تزيين',
    titleEn: 'Decoration Service',
  }
];

export function HallOverview({ hall }: OverviewProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            icon: Users, 
            labelAr: 'السعة',
            labelEn: 'Capacity',
            valueAr: `${hall.capacity} شخص`,
            valueEn: `${hall.capacity} people`,
          },
          {
            icon: MapPin,
            labelAr: 'الموقع',
            labelEn: 'Location',
            valueAr: hall.locationAr,
            valueEn: hall.locationEn,
          }
        ].map((info, index) => (
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
              <a href="mailto:info@hall.com" className="font-medium hover:text-primary-600">
                info@hall.com
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
              <a href="https://hall.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary-600">
                www.hall.com
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
          {hall.features.map((feature: any) => (
            <div 
              key={feature.id} 
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium">
                {language === 'ar' ? feature.labelAr : feature.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ar' ? 'احجز القاعة الآن' : 'Book the Hall Now'}
        </h2>
        <p className="text-primary-100 mb-6">
          {language === 'ar' 
            ? 'احجز قاعتك المثالية لمناسبتك القادمة'
            : 'Book your perfect venue for your next event'
          }
        </p>
        <Button 
          size="lg" 
          className="bg-white text-primary-900 hover:bg-primary-50"
        >
          {language === 'ar' ? 'احجز الآن' : 'Book Now'}
        </Button>
      </div>
    </div>
  );
}