import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CreditCard, Wallet, Building2, DollarSign, ShieldCheck, Lock } from 'lucide-react';

export function PaymentMethodsPage() {
  const { language } = useLanguage();

  const paymentMethods = [
    {
      icon: CreditCard,
      titleAr: 'بطاقات الائتمان',
      titleEn: 'Credit Cards',
      descriptionAr: 'نقبل جميع البطاقات الرئيسية مثل فيزا وماستركارد',
      descriptionEn: 'We accept all major cards including Visa and Mastercard',
    },
    {
      icon: Wallet,
      titleAr: 'الدفع النقدي',
      titleEn: 'Cash Payment',
      descriptionAr: 'الدفع نقداً عند تسجيل الوصول',
      descriptionEn: 'Pay in cash upon check-in',
    },
    {
      icon: Building2,
      titleAr: 'التحويل البنكي',
      titleEn: 'Bank Transfer',
      descriptionAr: 'تحويل مباشر إلى حسابنا البنكي',
      descriptionEn: 'Direct transfer to our bank account',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      titleAr: 'دفع آمن',
      titleEn: 'Secure Payment',
      descriptionAr: 'جميع المعاملات مشفرة ومؤمنة',
      descriptionEn: 'All transactions are encrypted and secure',
    },
    {
      icon: Lock,
      titleAr: 'حماية البيانات',
      titleEn: 'Data Protection',
      descriptionAr: 'بياناتك المالية محمية بالكامل',
      descriptionEn: 'Your financial data is fully protected',
    },
    {
      icon: DollarSign,
      titleAr: 'أسعار شفافة',
      titleEn: 'Transparent Pricing',
      descriptionAr: 'لا رسوم خفية أو تكاليف إضافية',
      descriptionEn: 'No hidden fees or additional costs',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'ar' ? 'طرق الدفع' : 'Payment Methods'}
            </h1>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'نوفر لك مجموعة متنوعة من طرق الدفع الآمنة والمريحة لتناسب احتياجاتك'
                : 'We provide a variety of secure and convenient payment methods to suit your needs'
              }
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? method.titleAr : method.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? method.descriptionAr : method.descriptionEn}
                </p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl border p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'ar' ? 'مميزات الدفع' : 'Payment Features'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === 'ar' ? feature.titleAr : feature.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'ar' ? feature.descriptionAr : feature.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Process */}
          <div className="bg-white rounded-xl border p-8">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'ar' ? 'عملية الدفع' : 'Payment Process'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  titleAr: 'اختيار طريقة الدفع',
                  titleEn: 'Select Payment Method',
                  descriptionAr: 'اختر طريقة الدفع المفضلة لديك من الخيارات المتاحة',
                  descriptionEn: 'Choose your preferred payment method from the available options',
                },
                {
                  step: '2',
                  titleAr: 'تأكيد الحجز',
                  titleEn: 'Confirm Booking',
                  descriptionAr: 'راجع تفاصيل حجزك وتأكد من صحة جميع المعلومات',
                  descriptionEn: 'Review your booking details and verify all information',
                },
                {
                  step: '3',
                  titleAr: 'إتمام الدفع',
                  titleEn: 'Complete Payment',
                  descriptionAr: 'أكمل عملية الدفع بشكل آمن وسريع',
                  descriptionEn: 'Complete the payment process securely and quickly',
                },
                {
                  step: '4',
                  titleAr: 'تأكيد الحجز',
                  titleEn: 'Booking Confirmation',
                  descriptionAr: 'ستصلك رسالة تأكيد الحجز عبر البريد الإلكتروني',
                  descriptionEn: 'You will receive a booking confirmation email',
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-semibold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {language === 'ar' ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'ar' ? step.descriptionAr : step.descriptionEn}
                    </p>
                  </div>
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