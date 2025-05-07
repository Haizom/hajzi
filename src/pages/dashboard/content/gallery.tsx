import { useLanguage } from '@/lib/store/useLanguage';
import { Upload, Plus, Edit3, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROOMS } from '@/data/rooms';

type GalleryContentProps = {
  hotelData: any;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChanges: () => void;
};

export function GalleryContent({ hotelData, handleImageUpload, handleSaveChanges }: GalleryContentProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {language === 'ar' ? 'إدارة معرض الصور' : 'Gallery Management'}
        </h2>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'رفع صور جديدة' : 'Upload New Images'}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[hotelData?.image, ...ROOMS.map(room => room.images[0])].map((image, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-500">
          <input type="file" className="hidden" onChange={handleImageUpload} multiple />
          <Plus className="w-6 h-6 text-gray-400" />
        </label>
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