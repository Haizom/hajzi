import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FileText } from 'lucide-react';

export function TermsPage() {
  const { language } = useLanguage();

  const sections = [
    {
      titleAr: 'مقدمة',
      titleEn: 'Introduction',
      contentAr: 'تحدد هذه الشروط والأحكام القواعد والأنظمة الخاصة باستخدام خدماتنا. باستخدام موقعنا وخدماتنا، فإنك توافق على الالتزام بهذه الشروط.',
      contentEn: 'These terms and conditions outline the rules and regulations for the use of our services. By accessing our website and using our services, you agree to these terms.',
    },
    {
      titleAr: 'الحجوزات',
      titleEn: 'Bookings',
      contentAr: 'عند إجراء الحجز، يجب تقديم معلومات دقيقة وصحيحة. نحتفظ بالحق في رفض أو إلغاء أي حجز في حالة تقديم معلومات غير صحيحة.',
      contentEn: 'When making a booking, you must provide accurate and truthful information. We reserve the right to refuse or cancel any booking if incorrect information is provided.',
    },
    {
      titleAr: 'الدفع',
      titleEn: 'Payment',
      contentAr: 'يجب دفع المبلغ المطلوب بالكامل عند الحجز أو حسب سياسة الدفع المحددة. جميع الأسعار تشمل الضرائب والرسوم المطبقة.',
      contentEn: 'Payment must be made in full at the time of booking or according to the specified payment policy. All prices include applicable taxes and fees.',
    },
    {
      titleAr: 'الإلغاء',
      titleEn: 'Cancellation',
      contentAr: 'تخضع عمليات الإلغاء لسياسة الإلغاء المحددة لكل حجز. يرجى مراجعة سياسة الإلغاء قبل إجراء الحجز.',
      contentEn: 'Cancellations are subject to the specific cancellation policy for each booking. Please review the cancellation policy before making a booking.',
    },
    {
      titleAr: 'المسؤولية',
      titleEn: 'Liability',
      contentAr: 'لا نتحمل المسؤولية عن أي خسائر أو أضرار تنتج عن استخدام خدماتنا، باستثناء ما ينص عليه القانون.',
      contentEn: 'We are not liable for any losses or damages resulting from the use of our services, except as required by law.',
    },
    {
      titleAr: 'التعديلات',
      titleEn: 'Modifications',
      contentAr: 'نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية.',
      contentEn: 'We reserve the right to modify these terms and conditions at any time. Users will be notified of any material changes.',
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
              <FileText className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </h1>
            </div>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا'
                : 'Please read these terms and conditions carefully before using our services'
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

            {/* Terms Sections */}
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

            {/* Contact Information */}
            <div className="mt-8 bg-primary-50 rounded-xl p-6">
              <h2 className="font-semibold mb-2">
                {language === 'ar' ? 'للاستفسارات' : 'For Inquiries'}
              </h2>
              <p className="text-gray-600">
                {language === 'ar'
                  ? 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا على:'
                  : 'If you have any questions about these terms and conditions, please contact us at:'
                }
              </p>
              <p className="text-primary-600 mt-2">support@hajzi.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}