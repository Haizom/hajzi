import { useTranslation } from 'react-i18next';
import { Shield, Clock, CreditCard, HeadphonesIcon, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/store/useLanguage';

const services = [
  {
    icon: Shield,
    titleAr: 'حجز آمن',
    titleEn: 'Secure Booking',
    descriptionAr: 'نضمن لك حجزًا آمنًا وموثوقًا به مع حماية كاملة لبياناتك',
    descriptionEn: 'We ensure secure and reliable booking with complete data protection',
  },
  {
    icon: Clock,
    titleAr: 'حجز سريع',
    titleEn: 'Quick Booking',
    descriptionAr: 'احجز بسهولة وسرعة في أقل من 5 دقائق',
    descriptionEn: 'Book easily and quickly in less than 5 minutes',
  },
  {
    icon: CreditCard,
    titleAr: 'دفع آمن',
    titleEn: 'Secure Payment',
    descriptionAr: 'طرق دفع متعددة وآمنة لراحتك',
    descriptionEn: 'Multiple secure payment methods for your convenience',
  },
  {
    icon: HeadphonesIcon,
    titleAr: 'دعم على مدار الساعة',
    titleEn: '24/7 Support',
    descriptionAr: 'فريق دعم متخصص متاح على مدار الساعة لمساعدتك',
    descriptionEn: 'Dedicated support team available 24/7 to assist you',
  },
  {
    icon: MapPin,
    titleAr: 'مواقع مميزة',
    titleEn: 'Prime Locations',
    descriptionAr: 'اختر من بين أفضل المواقع في جميع أنحاء المملكة',
    descriptionEn: 'Choose from the best locations across the Kingdom',
  },
  {
    icon: Calendar,
    titleAr: 'حجز مرن',
    titleEn: 'Flexible Booking',
    descriptionAr: 'سياسات إلغاء مرنة تناسب احتياجاتك',
    descriptionEn: 'Flexible cancellation policies to suit your needs',
  },
];

export function Services() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'خدماتنا المميزة' : 'Our Premium Services'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'نقدم لك مجموعة من الخدمات المميزة لضمان تجربة حجز مثالية وإقامة لا تُنسى'
              : 'We offer a range of premium services to ensure a perfect booking experience and unforgettable stay'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'ar' ? service.titleAr : service.titleEn}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? service.descriptionAr : service.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}