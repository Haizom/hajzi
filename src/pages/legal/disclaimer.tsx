import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerPage() {
  const { language } = useLanguage();

  const sections = [
    {
      titleAr: 'إخلاء المسؤولية العام',
      titleEn: 'General Disclaimer',
      contentAr: 'المعلومات المقدمة على موقعنا هي لأغراض عامة فقط. نحن نبذل قصارى جهدنا لضمان دقة وحداثة المعلومات، ولكننا لا نقدم أي ضمانات بشأن اكتمالها أو دقتها.',
      contentEn: 'The information provided on our website is for general purposes only. While we make every effort to keep the information up-to-date and accurate, we make no warranties about the completeness or accuracy of this information.',
    },
    {
      titleAr: 'المسؤولية',
      titleEn: 'Liability',
      contentAr: 'لن نكون مسؤولين عن أي خسارة أو ضرر ينشأ عن استخدام موقعنا أو الاعتماد على المعلومات المقدمة فيه.',
      contentEn: 'We will not be liable for any loss or damage arising from the use of our website or reliance on the information provided therein.',
    },
    {
      titleAr: 'دقة المعلومات',
      titleEn: 'Information Accuracy',
      contentAr: 'على الرغم من جهودنا للحفاظ على دقة المعلومات، قد تتغير التفاصيل مثل الأسعار والتوفر دون إشعار مسبق.',
      contentEn: 'Despite our efforts to maintain accurate information, details such as prices and availability may change without notice.',
    },
    {
      titleAr: 'الروابط الخارجية',
      titleEn: 'External Links',
      contentAr: 'قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن محتوى أو ممارسات الخصوصية لهذه المواقع.',
      contentEn: 'Our website may contain links to external sites. We are not responsible for the content or privacy practices of these sites.',
    },
    {
      titleAr: 'حقوق الملكية الفكرية',
      titleEn: 'Intellectual Property',
      contentAr: 'جميع المحتويات على موقعنا محمية بموجب حقوق الملكية الفكرية. لا يجوز نسخ أو توزيع المحتوى دون إذن.',
      contentEn: 'All content on our website is protected by intellectual property rights. Content may not be copied or distributed without permission.',
    },
  ];

  const importantNotes = [
    {
      titleAr: 'التغييرات في الخدمات',
      titleEn: 'Changes to Services',
      contentAr: 'نحتفظ بالحق في تغيير أو إيقاف أي من خدماتنا في أي وقت دون إشعار مسبق.',
      contentEn: 'We reserve the right to change or discontinue any of our services at any time without prior notice.',
    },
    {
      titleAr: 'القوة القاهرة',
      titleEn: 'Force Majeure',
      contentAr: 'لن نكون مسؤولين عن أي تأخير أو فشل في الأداء بسبب ظروف خارجة عن إرادتنا المعقولة.',
      contentEn: 'We will not be liable for any delay or failure in performance due to circumstances beyond our reasonable control.',
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
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'إخلاء المسؤولية' : 'Disclaimer'}
              </h1>
            </div>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'يرجى قراءة إخلاء المسؤولية هذا بعناية قبل استخدام موقعنا وخدماتنا'
                : 'Please read this disclaimer carefully before using our website and services'
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

            {/* Main Content */}
            <div className="bg-white rounded-xl border mb-8">
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

            {/* Important Notes */}
            <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'ar' ? 'ملاحظات هامة' : 'Important Notes'}
              </h2>
              <div className="space-y-4">
                {importantNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">
                        {language === 'ar' ? note.titleAr : note.titleEn}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {language === 'ar' ? note.contentAr : note.contentEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-primary-50 rounded-xl p-6">
              <h2 className="font-semibold mb-2">
                {language === 'ar' ? 'للاستفسارات' : 'For Inquiries'}
              </h2>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'إذا كان لديك أي أسئلة حول إخلاء المسؤولية، يرجى التواصل معنا على:'
                  : 'If you have any questions about this disclaimer, please contact us at:'
                }
              </p>
              <p className="text-primary-600 mt-2">legal@hajzi.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}