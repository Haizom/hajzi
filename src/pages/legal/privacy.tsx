import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Lock, Shield, Eye, UserCheck, Database, Bell } from 'lucide-react';

export function PrivacyPolicyPage() {
  const { language } = useLanguage();

  const sections = [
    {
      icon: UserCheck,
      titleAr: 'المعلومات التي نجمعها',
      titleEn: 'Information We Collect',
      contentAr: 'نجمع معلومات شخصية مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف عند إنشاء حساب أو إجراء حجز. كما نجمع معلومات غير شخصية مثل بيانات التصفح وإحصائيات الاستخدام.',
      contentEn: 'We collect personal information such as name, email address, and phone number when you create an account or make a booking. We also collect non-personal information such as browsing data and usage statistics.',
    },
    {
      icon: Database,
      titleAr: 'استخدام المعلومات',
      titleEn: 'Use of Information',
      contentAr: 'نستخدم المعلومات التي نجمعها لتوفير وتحسين خدماتنا، ومعالجة الحجوزات، والتواصل معك بشأن حجوزاتك وعروضنا.',
      contentEn: 'We use the information we collect to provide and improve our services, process bookings, and communicate with you about your bookings and our offers.',
    },
    {
      icon: Shield,
      titleAr: 'حماية المعلومات',
      titleEn: 'Information Protection',
      contentAr: 'نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به والتعديل والإفصاح.',
      contentEn: 'We implement appropriate security measures to protect your information from unauthorized access, modification, and disclosure.',
    },
    {
      icon: Eye,
      titleAr: 'مشاركة المعلومات',
      titleEn: 'Information Sharing',
      contentAr: 'لا نشارك معلوماتك الشخصية مع أطراف ثالثة إلا بموافقتك أو عندما يكون ذلك ضرورياً لتقديم خدماتنا.',
      contentEn: 'We do not share your personal information with third parties except with your consent or when necessary to provide our services.',
    },
    {
      icon: Bell,
      titleAr: 'الاتصالات التسويقية',
      titleEn: 'Marketing Communications',
      contentAr: 'يمكنك اختيار تلقي أو إلغاء الاشتراك في الاتصالات التسويقية في أي وقت.',
      contentEn: 'You can choose to receive or unsubscribe from marketing communications at any time.',
    },
  ];

  const rights = [
    {
      titleAr: 'الوصول إلى بياناتك',
      titleEn: 'Access Your Data',
      descriptionAr: 'يمكنك طلب نسخة من بياناتك الشخصية التي نحتفظ بها',
      descriptionEn: 'You can request a copy of your personal data that we hold',
    },
    {
      titleAr: 'تصحيح البيانات',
      titleEn: 'Correct Your Data',
      descriptionAr: 'يمكنك طلب تصحيح أي معلومات غير دقيقة',
      descriptionEn: 'You can request correction of any inaccurate information',
    },
    {
      titleAr: 'حذف البيانات',
      titleEn: 'Delete Your Data',
      descriptionAr: 'يمكنك طلب حذف بياناتك الشخصية',
      descriptionEn: 'You can request deletion of your personal data',
    },
    {
      titleAr: 'نقل البيانات',
      titleEn: 'Data Portability',
      descriptionAr: 'يمكنك طلب نقل بياناتك إلى خدمة أخرى',
      descriptionEn: 'You can request transfer of your data to another service',
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
              <Lock className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </h1>
            </div>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'نحن نأخذ خصوصيتك على محمل الجد. اقرأ كيف نحمي معلوماتك الشخصية'
                : 'We take your privacy seriously. Read about how we protect your personal information'
              }
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Last Updated */}
          <div className="max-w-3xl mx-auto text-sm text-gray-500 mb-8">
            {language === 'ar' 
              ? 'آخر تحديث: 1 مارس 2024'
              : 'Last updated: March 1, 2024'
            }
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Privacy Sections */}
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {language === 'ar' ? section.titleAr : section.titleEn}
                    </h2>
                    <p className="text-gray-600">
                      {language === 'ar' ? section.contentAr : section.contentEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Your Rights */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'ar' ? 'حقوقك' : 'Your Rights'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rights.map((right, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">
                      {language === 'ar' ? right.titleAr : right.titleEn}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? right.descriptionAr : right.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary-50 rounded-xl p-6">
              <h2 className="font-semibold mb-2">
                {language === 'ar' ? 'للاستفسارات' : 'For Inquiries'}
              </h2>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا على:'
                  : 'If you have any questions about our privacy policy, please contact us at:'
                }
              </p>
              <p className="text-primary-600 mt-2">privacy@hajzi.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}