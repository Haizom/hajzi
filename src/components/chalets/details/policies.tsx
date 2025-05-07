import { useLanguage } from '@/lib/store/useLanguage';
import { 
  Clock, 
  Calendar,
  Shield,
  Users,
  Ban,
  CreditCard,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  DollarSign,
  Percent,
  BadgeCheck,
  Clock4
} from 'lucide-react';

export function ChaletPolicies() {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Check-in/Check-out Card */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Clock className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-primary-900">
            {language === 'ar' ? 'مواعيد تسجيل الدخول والخروج' : 'Check-in & Check-out Times'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Check-in */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {language === 'ar' ? 'تسجيل الدخول' : 'Check-in'}
                </div>
                <div className="text-sm text-primary-600">
                  {language === 'ar' ? 'من الساعة 3:00 مساءً' : 'From 3:00 PM'}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'استقبال على مدار الساعة' : '24/7 reception'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'مفاتيح إلكترونية' : 'Electronic keys'}
                </span>
              </div>
            </div>
          </div>

          {/* Check-out */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {language === 'ar' ? 'تسجيل الخروج' : 'Check-out'}
                </div>
                <div className="text-sm text-primary-600">
                  {language === 'ar' ? 'حتى الساعة 12:00 ظهراً' : 'Until 12:00 PM'}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'تسليم المفاتيح للحارس' : 'Key drop-off to security'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock4 className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">
                  {language === 'ar' 
                    ? 'تمديد الإقامة حسب التوفر' 
                    : 'Extended stay based on availability'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-green-900">
                {language === 'ar' ? 'إلغاء مجاني' : 'Free Cancellation'}
              </div>
              <div className="text-sm text-green-700">
                {language === 'ar' 
                  ? 'حتى 48 ساعة قبل موعد الوصول' 
                  : 'Up to 48 hours before check-in'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-yellow-900">
                {language === 'ar' ? 'استرداد جزئي' : 'Partial Refund'}
              </div>
              <div className="text-sm text-yellow-700">
                {language === 'ar'
                  ? 'استرداد 50% من المبلغ حتى 24 ساعة قبل موعد الوصول'
                  : '50% refund up to 24 hours before check-in'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-red-900">
                {language === 'ar' ? 'لا يوجد استرداد' : 'No Refund'}
              </div>
              <div className="text-sm text-red-700">
                {language === 'ar'
                  ? 'خلال آخر 24 ساعة قبل موعد الوصول'
                  : 'Within 24 hours of check-in'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chalet Rules */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'قواعد الشاليه' : 'Chalet Rules'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'غير مسموح' : 'Not Allowed'}
            </h4>
            <div className="space-y-2">
              {[
                { icon: Ban, label: { ar: 'الحفلات الصاخبة', en: 'Loud parties' } },
                { icon: Ban, label: { ar: 'الحيوانات الأليفة', en: 'Pets' } },
                { icon: Ban, label: { ar: 'التدخين داخل الشاليه', en: 'Smoking inside' } }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? item.label.ar : item.label.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
            </h4>
            <div className="space-y-2">
              {[
                { 
                  icon: Info, 
                  label: { 
                    ar: 'تأمين نقدي مسترد: 500 ريال', 
                    en: 'Refundable deposit: 500 SAR' 
                  } 
                },
                { 
                  icon: Info, 
                  label: { 
                    ar: 'وقت الهدوء من 11 مساءً', 
                    en: 'Quiet hours from 11 PM' 
                  } 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? item.label.ar : item.label.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Policy */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'سياسة الدفع' : 'Payment Policy'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'طرق الدفع المقبولة' : 'Accepted Payment Methods'}
            </h4>
            <div className="space-y-2">
              {[
                { 
                  icon: CreditCard, 
                  label: { ar: 'بطاقات الائتمان', en: 'Credit Cards' } 
                },
                { 
                  icon: Wallet, 
                  label: { ar: 'الدفع النقدي', en: 'Cash Payment' } 
                },
                { 
                  icon: DollarSign, 
                  label: { ar: 'التحويل البنكي', en: 'Bank Transfer' } 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? item.label.ar : item.label.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'شروط الدفع' : 'Payment Terms'}
            </h4>
            <div className="space-y-2">
              {[
                { 
                  icon: Percent, 
                  label: { 
                    ar: 'دفعة مقدمة: 50% عند الحجز', 
                    en: 'Deposit: 50% upon booking' 
                  } 
                },
                { 
                  icon: DollarSign, 
                  label: { 
                    ar: 'المبلغ المتبقي: عند الوصول', 
                    en: 'Remaining balance: at arrival' 
                  } 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? item.label.ar : item.label.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}