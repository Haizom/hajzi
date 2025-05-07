import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQsPage() {
  const { language } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqSections = [
    {
      id: 'booking',
      titleAr: 'الحجز',
      titleEn: 'Booking',
      questions: [
        {
          id: 'booking-1',
          questionAr: 'كيف يمكنني إجراء حجز؟',
          questionEn: 'How can I make a booking?',
          answerAr: 'يمكنك إجراء الحجز بسهولة من خلال موقعنا الإلكتروني. اختر نوع الإقامة المناسب، وتاريخ الوصول والمغادرة، ثم اتبع خطوات الحجز البسيطة.',
          answerEn: 'You can easily make a booking through our website. Choose your preferred accommodation type, select check-in and check-out dates, then follow the simple booking steps.',
        },
        {
          id: 'booking-2',
          questionAr: 'هل يمكنني إلغاء حجزي؟',
          questionEn: 'Can I cancel my booking?',
          answerAr: 'نعم، يمكنك إلغاء حجزك وفقاً لسياسة الإلغاء الخاصة بنا. يرجى مراجعة سياسة الإلغاء للحصول على التفاصيل الكاملة.',
          answerEn: 'Yes, you can cancel your booking according to our cancellation policy. Please review the cancellation policy for full details.',
        },
      ],
    },
    {
      id: 'payment',
      titleAr: 'الدفع',
      titleEn: 'Payment',
      questions: [
        {
          id: 'payment-1',
          questionAr: 'ما هي طرق الدفع المقبولة؟',
          questionEn: 'What payment methods are accepted?',
          answerAr: 'نقبل البطاقات الائتمانية الرئيسية (فيزا، ماستركارد)، والدفع النقدي عند الوصول، والتحويل البنكي.',
          answerEn: 'We accept major credit cards (Visa, Mastercard), cash payment upon arrival, and bank transfer.',
        },
        {
          id: 'payment-2',
          questionAr: 'هل الأسعار تشمل الضرائب؟',
          questionEn: 'Do prices include taxes?',
          answerAr: 'نعم، جميع الأسعار المعروضة تشمل الضرائب والرسوم.',
          answerEn: 'Yes, all displayed prices include taxes and fees.',
        },
      ],
    },
    {
      id: 'checkin',
      titleAr: 'تسجيل الدخول والخروج',
      titleEn: 'Check-in & Check-out',
      questions: [
        {
          id: 'checkin-1',
          questionAr: 'ما هي مواعيد تسجيل الدخول والخروج؟',
          questionEn: 'What are the check-in and check-out times?',
          answerAr: 'تسجيل الدخول من الساعة 2:00 مساءً، وتسجيل الخروج حتى الساعة 12:00 ظهراً.',
          answerEn: 'Check-in is from 2:00 PM, and check-out is until 12:00 PM.',
        },
        {
          id: 'checkin-2',
          questionAr: 'هل يمكنني تسجيل الدخول المبكر أو الخروج المتأخر؟',
          questionEn: 'Can I request early check-in or late check-out?',
          answerAr: 'نعم، يمكن طلب ذلك حسب التوفر. قد تطبق رسوم إضافية.',
          answerEn: 'Yes, this can be requested subject to availability. Additional charges may apply.',
        },
      ],
    },
    {
      id: 'amenities',
      titleAr: 'المرافق والخدمات',
      titleEn: 'Amenities & Services',
      questions: [
        {
          id: 'amenities-1',
          questionAr: 'هل يوجد واي فاي مجاني؟',
          questionEn: 'Is there free WiFi?',
          answerAr: 'نعم، نوفر خدمة واي فاي مجانية عالية السرعة في جميع المرافق.',
          answerEn: 'Yes, we provide free high-speed WiFi in all facilities.',
        },
        {
          id: 'amenities-2',
          questionAr: 'هل يوجد موقف سيارات؟',
          questionEn: 'Is parking available?',
          answerAr: 'نعم، نوفر موقف سيارات مجاني لجميع النزلاء.',
          answerEn: 'Yes, we provide free parking for all guests.',
        },
      ],
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
              <HelpCircle className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h1>
            </div>
            <p className="text-primary-100 max-w-2xl">
              {language === 'ar'
                ? 'اعثر على إجابات لأكثر الأسئلة شيوعاً حول خدماتنا'
                : 'Find answers to the most common questions about our services'
              }
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* FAQ Sections */}
          <div className="max-w-3xl mx-auto space-y-6">
            {faqSections.map((section) => (
              <div key={section.id} className="bg-white rounded-xl border">
                {/* Section Header */}
                <button
                  onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg font-semibold">
                    {language === 'ar' ? section.titleAr : section.titleEn}
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openSection === section.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Questions */}
                {openSection === section.id && (
                  <div className="border-t">
                    {section.questions.map((question) => (
                      <div key={question.id} className="border-b last:border-0">
                        <button
                          onClick={() => setOpenQuestion(openQuestion === question.id ? null : question.id)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-left font-medium">
                            {language === 'ar' ? question.questionAr : question.questionEn}
                          </h3>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openQuestion === question.id ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openQuestion === question.id && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600">
                              {language === 'ar' ? question.answerAr : question.answerEn}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}