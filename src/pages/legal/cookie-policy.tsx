import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Cookie, Shield, Settings, Clock, Info } from 'lucide-react';

export function CookiePolicyPage() {
  const { language } = useLanguage();

  const cookieTypes = [
    {
      icon: Shield,
      titleAr: 'ملفات تعريف الارتباط الضرورية',
      titleEn: 'Essential Cookies',
      descriptionAr: 'ضرورية لتشغيل الموقع بشكل صحيح وتمكين الميزات الأساسية مثل تسجيل الدخول والتنقل',
      descriptionEn: 'Necessary for the website to function properly and enable basic features like login and navigation',
    },
    {
      icon: Settings,
      titleAr: 'ملفات تعريف الارتباط الوظيفية',
      titleEn: 'Functional Cookies',
      descriptionAr: 'تساعد في تحسين تجربة المستخدم من خلال تذكر التفضيلات واختيارات اللغة',
      descriptionEn: 'Help improve user experience by remembering preferences and language choices',
    },
    {
      icon: Clock,
      titleAr: 'ملفات تعريف الارتباط التحليلية',
      titleEn: 'Analytics Cookies',
      descriptionAr: 'تساعدنا في فهم كيفية استخدام الزوار لموقعنا وتحسين أدائه',
      descriptionEn: 'Help us understand how visitors use our site and improve its performance',
    },
  ];

  const sections = [
    {
      titleAr: 'ما هي ملفات تعريف الارتباط؟',
      titleEn: 'What are Cookies?',
      contentAr: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا. تساعدنا هذه الملفات في توفير تجربة أفضل لك وتحسين خدماتنا.',
      contentEn: 'Cookies are small text files stored on your device when you visit our website. These files help us provide you with a better experience and improve our services.',
    },
    {
      titleAr: 'كيف نستخدم ملفات تعريف الارتباط',
      titleEn: 'How We Use Cookies',
      contentAr: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح، وتحليل حركة المرور، وتخصيص المحتوى، وتذكر تفضيلاتك.',
      contentEn: 'We use cookies to improve browsing experience, analyze traffic, personalize content, and remember your preferences.',
    },
    {
      titleAr: 'إدارة ملفات تعريف الارتباط',
      titleEn: 'Managing Cookies',
      contentAr: 'يمكنك التحكم في ملفات تعريف الارتباط أو حذفها من خلال إعدادات متصفحك. يرجى ملاحظة أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على تجربتك.',
      contentEn: 'You can control or delete cookies through your browser settings. Please note that disabling certain cookies may affect your experience.',
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
              <Cookie className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'سياسة ملفات الارتباط' : 'Cookie Policy'}
              </h1>
            </div>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'تعرف على كيفية استخدامنا لملفات تعريف الارتباط لتحسين تجربتك'
                : 'Learn about how we use cookies to improve your experience'
              }
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Last Updated */}
            <div className="text-sm text-gray-500 mb-8">
              {language === 'ar' 
                ? 'آخر تحديث: 1 مارس 2024'
                : 'Last updated: March 1, 2024'
              }
            </div>

            {/* Cookie Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {cookieTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border hover:border-primary-200 transition-colors">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'ar' ? type.titleAr : type.titleEn}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? type.descriptionAr : type.descriptionEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl border">
              {sections.map((section, index) => (
                <div key={index} className="p-6 border-b last:border-0">
                  <h2 className="text-xl font-semibold mb-4">
                    {language === 'ar' ? section.titleAr : section.titleEn}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'ar' ? section.contentAr : section.contentEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-primary-600 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold mb-2">
                    {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar'
                      ? 'لمزيد من المعلومات حول كيفية استخدامنا لملفات تعريف الارتباط أو لتغيير تفضيلاتك، يرجى التواصل معنا على:'
                      : 'For more information about how we use cookies or to change your preferences, please contact us at:'
                    }
                  </p>
                  <p className="text-primary-600 mt-2">cookies@hajzi.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}