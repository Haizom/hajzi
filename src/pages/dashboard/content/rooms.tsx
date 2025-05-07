import { useLanguage } from '@/lib/store/useLanguage';
import { Edit3, Trash2, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROOMS } from '@/data/rooms';
import { useState } from 'react';

type RoomsContentProps = {
  selectedRoom: number | null;
  setSelectedRoom: (id: number | null) => void;
  handleSaveChanges: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RoomsContent({ 
  selectedRoom, 
  setSelectedRoom, 
  handleSaveChanges,
  handleImageUpload 
}: RoomsContentProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {language === 'ar' ? 'إدارة الغرف' : 'Rooms Management'}
        </h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إضافة غرفة' : 'Add Room'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROOMS.map((room) => (
          <div 
            key={room.id}
            className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
              selectedRoom === room.id ? 'ring-2 ring-primary-500' : 'hover:border-primary-200'
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={room.images[0]}
                alt={language === 'ar' ? room.titleAr : room.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <h3 className="font-medium mb-2">
              {language === 'ar' ? room.titleAr : room.titleEn}
            </h3>
            <div className="text-sm text-gray-500">
              {room.price} {language === 'ar' ? 'ريال' : 'SAR'}
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6">
            {language === 'ar' ? 'تعديل الغرفة' : 'Edit Room'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'اسم الغرفة (عربي)' : 'Room Name (Arabic)'}
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.titleAr}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'اسم الغرفة (إنجليزي)' : 'Room Name (English)'}
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.titleEn}
              />
            </div>

            {/* Room Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.descriptionAr}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.descriptionEn}
              />
            </div>

            {/* Room Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'السعر' : 'Price'}
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.price}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'السعة' : 'Capacity'}
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.capacity}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'عدد الأسرّة' : 'Number of Beds'}
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.beds}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'المساحة (م²)' : 'Size (m²)'}
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={ROOMS.find(r => r.id === selectedRoom)?.size}
              />
            </div>

            {/* Room Features */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'المميزات' : 'Features'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['wifi', 'breakfast', 'tv', 'minibar', 'lounge', 'bathtub', 'kitchen', 'balcony'].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={ROOMS.find(r => r.id === selectedRoom)?.features.includes(feature)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {language === 'ar' 
                        ? {
                            wifi: 'واي فاي',
                            breakfast: 'فطور',
                            tv: 'تلفاز',
                            minibar: 'ميني بار',
                            lounge: 'صالة جلوس',
                            bathtub: 'حوض استحمام',
                            kitchen: 'مطبخ',
                            balcony: 'شرفة'
                          }[feature]
                        : feature.charAt(0).toUpperCase() + feature.slice(1)
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Room Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'صور الغرفة' : 'Room Images'}
              </label>
              <div className="grid grid-cols-4 gap-4">
                {ROOMS.find(r => r.id === selectedRoom)?.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-500">
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                  <Plus className="w-6 h-6 text-gray-400" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <Button variant="outline" onClick={() => setSelectedRoom(null)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}