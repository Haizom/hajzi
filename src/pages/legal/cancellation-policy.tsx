import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Shield, Clock, AlertTriangle, CheckCircle2, XCircle, Calendar } from 'lucide-react';

export function CancellationPolicyPage() {
  const { language } = useLanguage();

  const policies = [
    {
      icon: CheckCircle2,
      type: 'success',
      titleAr: 'إلغاء مجاني',
      titleEn: 'Free Cancellation',
      descriptionAr: 'إلغاء مجاني حتى 24 ساعة قبل موعد الوصول',
      descriptionEn: 'Free cancellation up to 24 hours before check-in',
      periodAr: 'قبل 24 ساعة من الوصول',
      periodEn: '24 hours before check-in',
      refundAr: 'استرداد كامل المبلغ',
      refundEn: 'Full refund',
    },
    {
      icon: AlertTriangle,
      type: 'warning',
      titleAr: 'استرداد جزئي',
      titleEn: 'Partial Refund',
      descriptionAr: 'استرداد 50% من المبلغ حتى 12 ساعة قبل موعد الوصول',
      descriptionEn: '50% refund up to 12 hours before check-in',
      periodAr: 'قبل 12 ساعة من الوصول',
      periodEn: '12 hours before check-in',
      refundAr: 'استرداد 50% من المبلغ',
      refundEn: '50% refund',
    },
    {
      icon: XCircle,
      type: 'danger',
      titleAr: 'لا يوجد استرداد',
      titleEn: 'No Refund',
      descriptionAr: 'لا يوجد استرداد خلال آخر 12 ساعة قبل موعد الوصول',
      descriptionEn: 'No refund within 12 hours of check-in',
      periodAr: 'آخر 12 ساعة قبل الوصول',
      periodEn: 'Last 12 hours before check-in',
      refundAr: 'لا يوجد استرداد',
      refundEn: 'No refund',
    },
  ];

  const additionalInfo = [
    {
      titleAr: 'تغيير موعد الحجز',
      titleEn: 'Booking Date Change',
      descriptionAr: 'يمكن تغيير موعد الحجز مجاناً حتى 24 ساعة قبل موعد الوصول، حسب التوفر',
      descriptionEn: 'Booking dates can be changed free of charge up to 24 hours before check-in, subject to availability',
    },
    {
      titleAr: 'إلغاء الحجز من قبل المنشأة',
      titleEn: 'Property Cancellation',
      descriptionAr: 'في حال إلغاء الحجز من قبل المنشأة، سيتم استرداد كامل المبلغ',
      descriptionEn: 'If the property cancels the booking, a full refund will be provided',
    },
    {
      titleAr: 'الظروف الاستثنائية',
      titleEn: 'Exceptional Circumstances',
      descriptionAr: 'قد يتم استرداد كامل المبلغ في حالات القوة القاهرة أو الظروف الاستثنائية',
      descriptionEn: 'Full refund may be provided in cases of force majeure or exceptional circumstances',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
              </h1>
            </div>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'نحن نتفهم أن الخطط قد تتغير. تعرف على سياسة الإلغاء المرنة لدينا'
                : 'We understand that plans can change. Learn about our flexible cancellation policy'
              }
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Cancellation Periods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {policies.map((policy, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-6 border ${
                  policy.type === 'success' ? 'hover:border-green-200'
                    : policy.type === 'warning' ? 'hover:border-yellow-200'
                    : 'hover:border-red-200'
                } transition-colors`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  policy.type === 'success' ? 'bg-green-50'
                    : policy.type === 'warning' ? 'bg-yellow-50'
                    : 'bg-red-50'
                }`}>
                  <policy.icon className={`w-6 h-6 ${
                    policy.type === 'success' ? 'text-green-600'
                      : policy.type === 'warning' ? 'text-yellow-600'
                      : 'text-red-600'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? policy.titleAr : policy.titleEn}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' ? policy.descriptionAr : policy.descriptionEn}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {language === 'ar' ? policy.periodAr : policy.periodEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {language === 'ar' ? policy.refundAr : policy.refundEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl border p-8">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
            </h2>
            <div className="space-y-6">
              {additionalInfo.map((info, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <h3 className="font-semibold mb-2">
                    {language === 'ar' ? info.titleAr : info.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? info.descriptionAr : info.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}