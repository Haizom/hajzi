import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight, Shield, CreditCard, HelpCircle, Tag } from 'lucide-react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '../ui/button';

export function Footer() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleHowToBookClick = () => {
    window.open('https://www.youtube.com/watch?v=your-video-id', '_blank');
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {language === 'ar' 
                  ? 'اشترك في نشرتنا الإخبارية'
                  : 'Subscribe to Our Newsletter'
                }
              </h3>
              <p className="text-primary-700 mb-6">
                {language === 'ar'
                  ? 'احصل على أحدث العروض والتحديثات مباشرة إلى بريدك الإلكتروني'
                  : 'Get the latest offers and updates straight to your inbox'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                  className="flex-1 px-4 py-2 rounded-lg bg-white border border-primary-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button>
                  {language === 'ar' ? 'اشترك' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600 mb-4">
              <Building2 className="h-8 w-8" />
              <span>{language === 'ar' ? 'حجزي' : 'Hajzi'}</span>
            </Link>
            <p className="text-sm text-gray-600 mb-6">
              {language === 'ar' 
                ? 'منصة حجز الفنادق والشاليهات والاستراحات الأولى في المملكة'
                : 'The leading booking platform for hotels, chalets, and resorts in the Kingdom'
              }
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span>
                  {language === 'ar'
                    ? 'الرياض، المملكة العربية السعودية'
                    : 'Riyadh, Saudi Arabia'
                  }
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-primary-500" />
                <a href="tel:+966500000000" className="text-gray-600 hover:text-primary-600 transition-colors">
                  +966 50 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-primary-500" />
                <a href="mailto:support@hajzi.sa" className="text-gray-600 hover:text-primary-600 transition-colors">
                  support@hajzi.sa
                </a>
              </div>
            </div>
          </div>

          {/* For Travelers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {language === 'ar' ? 'للمسافرين' : 'For Travelers'}
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={handleHowToBookClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  {language === 'ar' ? 'كيفية الحجز' : 'How to Book'}
                </button>
              </li>
              <li>
                <Link to="/payment-methods" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <CreditCard className="h-4 w-4" />
                  {language === 'ar' ? 'طرق الدفع' : 'Payment Methods'}
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Shield className="h-4 w-4" />
                  {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
                </Link>
              </li>
              <li>
                <Link to="/offers" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Tag className="h-4 w-4" />
                  {language === 'ar' ? 'العروض' : 'Offers'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {language === 'ar' ? 'معلومات قانونية' : 'Legal'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {language === 'ar' ? 'سياسة ملفات الارتباط' : 'Cookie Policy'}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {language === 'ar' ? 'إخلاء المسؤولية' : 'Disclaimer'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {language === 'ar' ? 'أنواع العقارات' : 'Property Types'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/hotels" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {t('nav.hotels')}
                </Link>
              </li>
              <li>
                <Link to="/chalets-resorts" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {t('nav.chaletsResorts')}
                </Link>
              </li>
              <li>
                <Link to="/wedding-halls" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {t('nav.weddingHalls')}
                </Link>
              </li>
              <li>
                <Link to="/apartments" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {t('nav.apartments')}
                </Link>
              </li>
              <li>
                <Link to="/camps" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {t('nav.camps')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {language === 'ar'
                ? `© ${currentYear} حجزي. جميع الحقوق محفوظة`
                : `© ${currentYear} Hajzi. All rights reserved`
              }
            </p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}