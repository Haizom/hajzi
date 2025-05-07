import { useLanguage } from '@/lib/store/useLanguage';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HOTELS_DATA } from '@/data/hotels';

type GeneralContentProps = {
  hotelData: typeof HOTELS_DATA[0] | undefined;
  setHotelData: (data: any) => void;
  handleSaveChanges: () => void;
};

export function GeneralContent({ hotelData, setHotelData, handleSaveChanges }: GeneralContentProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hotel Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'اسم الفندق (عربي)' : 'Hotel Name (Arabic)'}
          </label>
          <input
            type="text"
            defaultValue={hotelData?.titleAr}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'اسم الفندق (إنجليزي)' : 'Hotel Name (English)'}
          </label>
          <input
            type="text"
            defaultValue={hotelData?.titleEn}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
          </label>
          <textarea
            rows={4}
            defaultValue={hotelData?.descriptionAr}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
          </label>
          <textarea
            rows={4}
            defaultValue={hotelData?.descriptionEn}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'الموقع (عربي)' : 'Location (Arabic)'}
          </label>
          <input
            type="text"
            defaultValue={hotelData?.locationAr}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'الموقع (إنجليزي)' : 'Location (English)'}
          </label>
          <input
            type="text"
            defaultValue={hotelData?.locationEn}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
          </label>
          <input
            type="tel"
            defaultValue="+967 1 234 5678"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            defaultValue="info@crownplaza.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Price and Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'السعر' : 'Price'}
          </label>
          <input
            type="number"
            defaultValue={hotelData?.price}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ar' ? 'التقييم' : 'Rating'}
          </label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            defaultValue={hotelData?.rating}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
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