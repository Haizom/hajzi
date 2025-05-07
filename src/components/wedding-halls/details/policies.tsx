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
  Percent
} from 'lucide-react';

export function HallPolicies() {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Booking Times */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Clock className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-primary-900">
            {language === 'ar' ? 'مواعيد الحجز' : 'Booking Times'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Morning Period */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {language === 'ar' ? 'الفترة الصباحية' : 'Morning Period'}
                </div>
                <div className="text-sm text-primary-600">
                  {language === 'ar' ? '9:00 صباحاً - 4:00 مساءً' : '9:00 AM - 4:00 PM'}
                </div>
              </div>
            </div>
          </div>

          {/* Evening Period */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {language === 'ar' ? 'الفترة المسائية' : 'Evening Period'}
                </div>
                <div className="text-sm text-primary-600">
                  {language === 'ar' ? '5:00 مساءً - 12:00 مساءً' : '5:00 PM - 12:00 AM'}
                </div>
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
                  ? 'حتى أسبوع قبل موعد المناسبة' 
                  : 'Up to one week before the event'}
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
                  ? 'استرداد 50% من المبلغ حتى 3 أيام قبل المناسبة'
                  : '50% refund up to 3 days before the event'}
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
                  ? 'خلال آخر 3 أيام قبل المناسبة'
                  : 'Within 3 days of the event'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hall Rules */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'قواعد القاعة' : 'Hall Rules'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {language === 'ar' ? 'غير مسموح' : 'Not Allowed'}
            </h4>
            <div className="space-y-2">
              {[
                { icon: Ban, label: { ar: 'التدخين داخل القاعة', en: 'Smoking inside' } },
                { icon: Ban, label: { ar: 'المفرقعات النارية', en: 'Fireworks' } },
                { icon: Ban, label: { ar: 'الأسلحة', en: 'Weapons' } }
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
                    ar: 'تأمين نقدي مسترد: 1000 ريال', 
                    en: 'Refundable deposit: 1000 SAR' 
                  } 
                },
                { 
                  icon: Info, 
                  label: { 
                    ar: 'الالتزام بمواعيد الحجز', 
                    en: 'Strict adherence to booking times' 
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
                    ar: 'دفعة مقدمة: 30% عند الحجز', 
                    en: 'Deposit: 30% upon booking' 
                  } 
                },
                { 
                  icon: DollarSign, 
                  label: { 
                    ar: 'المبلغ المتبقي: قبل أسبوع من المناسبة', 
                    en: 'Remaining balance: one week before the event' 
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