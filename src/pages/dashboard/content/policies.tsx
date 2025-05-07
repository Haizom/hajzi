import { useLanguage } from '@/lib/store/useLanguage';
import { 
  Clock, 
  Shield, 
  Users, 
  CreditCard,
  Plus,
  Trash2,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type PoliciesContentProps = {
  handleSaveChanges: () => void;
};

export function PoliciesContent({ handleSaveChanges }: PoliciesContentProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        {language === 'ar' ? 'إدارة السياسات' : 'Policies Management'}
      </h2>

      {/* Check-in/Check-out Times */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          {language === 'ar' ? 'مواعيد تسجيل الدخول والخروج' : 'Check-in & Check-out Times'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'وقت تسجيل الدخول' : 'Check-in Time'}
            </label>
            <input
              type="time"
              defaultValue="14:00"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'وقت تسجيل الخروج' : 'Check-out Time'}
            </label>
            <input
              type="time"
              defaultValue="12:00"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          {language === 'ar' ? 'سياسة الإلغاء' : 'Cancellation Policy'}
        </h3>
        <div className="space-y-4">
          {/* Free Cancellation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'فترة الإلغاء المجاني' : 'Free Cancellation Period'}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                defaultValue={24}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="hours">{language === 'ar' ? 'ساعات' : 'Hours'}</option>
                <option value="days">{language === 'ar' ? 'أيام' : 'Days'}</option>
              </select>
            </div>
          </div>

          {/* Partial Refund */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'نسبة الاسترداد الجزئي' : 'Partial Refund Percentage'}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                defaultValue={50}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="12">{language === 'ar' ? '12 ساعة' : '12 Hours'}</option>
                <option value="24">{language === 'ar' ? '24 ساعة' : '24 Hours'}</option>
              </select </div>
          </div>
        </div>
      </div>

      {/* Hotel Rules */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          {language === 'ar' ? 'قواعد الفندق' : 'Hotel Rules'}
        </h3>
        <div className="space-y-4">
          {/* Not Allowed Rules */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الممنوعات' : 'Not Allowed'}
            </label>
            <div className="space-y-2">
              {['smoking', 'pets', 'parties'].map((rule, index) => (
                <div key={rule} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    defaultValue={
                      language === 'ar'
                        ? rule === 'smoking' ? 'التدخين في الغرف'
                          : rule === 'pets' ? 'الحيوانات الأليفة'
                          : 'الحفلات'
                        : rule === 'smoking' ? 'Smoking in rooms'
                          : rule === 'pets' ? 'Pets'
                          : 'Parties'
                    }
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'إضافة قاعدة' : 'Add Rule'}
              </Button>
            </div>
          </div>

          {/* Important Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
            </label>
            <div className="space-y-2">
              {['id', 'deposit'].map((info, index) => (
                <div key={info} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    defaultValue={
                      language === 'ar'
                        ? info === 'id' ? 'مطلوب بطاقة هوية سارية المفعول'
                        : 'تأمين نقدي مطلوب عند تسجيل الدخول'
                        : info === 'id' ? 'Valid ID required'
                        : 'Cash deposit required at check-in'
                    }
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'إضافة معلومة' : 'Add Information'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Policy */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary-600" />
          {language === 'ar' ? 'سياسة الدفع' : 'Payment Policy'}
        </h3>
        <div className="space-y-4">
          {/* Payment Methods */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'طرق الدفع المقبولة' : 'Accepted Payment Methods'}
            </label>
            <div className="space-y-2">
              {['credit-card', 'cash', 'bank-transfer'].map((method) => (
                <div key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    {language === 'ar'
                      ? method === 'credit-card' ? 'بطاقات الائتمان'
                        : method === 'cash' ? 'الدفع النقدي'
                        : 'التحويل البنكي'
                      : method === 'credit-card' ? 'Credit Cards'
                        : method === 'cash' ? 'Cash Payment'
                        : 'Bank Transfer'
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'شروط الدفع' : 'Payment Terms'}
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {language === 'ar' ? 'نسبة الدفعة المقدمة' : 'Deposit Percentage'}
                </label>
                <input
                  type="number"
                  defaultValue={20}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {language === 'ar' ? 'موعد دفع المبلغ المتبقي' : 'Remaining Balance Due'}
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="check-in">
                    {language === 'ar' ? 'عند تسجيل الدخول' : 'At check-in'}
                  </option>
                  <option value="before-24h">
                    {language === 'ar' ? 'قبل 24 ساعة من الوصول' : '24 hours before arrival'}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>
          <Save className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}