import { useLanguage } from '@/lib/store/useLanguage';
import { Save, Plus, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AMENITIES } from '@/data/hotels';
import { useState } from 'react';
import { IconSelector } from '@/components/ui/icon-selector';
import { getIconComponent } from '@/lib/icons/amenity-icons';

type AmenitiesContentProps = {
  hotelData: any;
  handleSaveChanges: () => void;
};

type NewAmenity = {
  id: string;
  labelAr: string;
  labelEn: string;
  icon: string;
};

export function AmenitiesContent({ hotelData, handleSaveChanges }: AmenitiesContentProps) {
  const { language } = useLanguage();
  const [amenities, setAmenities] = useState(AMENITIES);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAmenity, setNewAmenity] = useState<NewAmenity>({
    id: '',
    labelAr: '',
    labelEn: '',
    icon: 'wifi'
  });

  const handleAddAmenity = () => {
    if (!newAmenity.labelAr || !newAmenity.labelEn || !newAmenity.icon) return;

    const id = newAmenity.labelEn.toLowerCase().replace(/\s+/g, '-');
    const amenityToAdd = {
      ...newAmenity,
      id
    };

    setAmenities([...amenities, amenityToAdd]);
    setNewAmenity({ id: '', labelAr: '', labelEn: '', icon: 'wifi' });
    setIsAddingNew(false);
  };

  const handleEditAmenity = (amenity: typeof AMENITIES[0]) => {
    setEditingId(amenity.id);
    setNewAmenity({
      id: amenity.id,
      labelAr: amenity.labelAr,
      labelEn: amenity.labelEn,
      icon: amenity.id
    });
  };

  const handleUpdateAmenity = () => {
    if (!editingId) return;

    setAmenities(amenities.map(amenity => 
      amenity.id === editingId 
        ? { ...newAmenity, id: editingId }
        : amenity
    ));
    setEditingId(null);
    setNewAmenity({ id: '', labelAr: '', labelEn: '', icon: 'wifi' });
  };

  const handleDeleteAmenity = (id: string) => {
    setAmenities(amenities.filter(amenity => amenity.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewAmenity({ id: '', labelAr: '', labelEn: '', icon: 'wifi' });
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {language === 'ar' ? 'إدارة المرافق' : 'Amenities Management'}
        </h2>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew || editingId !== null}>
          <Plus className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إضافة مرفق' : 'Add Amenity'}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="font-medium mb-4">
            {editingId 
              ? language === 'ar' ? 'تعديل المرفق' : 'Edit Amenity'
              : language === 'ar' ? 'إضافة مرفق جديد' : 'Add New Amenity'
            }
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الأيقونة' : 'Icon'}
              </label>
              <IconSelector
                selectedIcon={newAmenity.icon}
                onSelect={(iconId) => setNewAmenity(prev => ({ ...prev, icon: iconId }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}
              </label>
              <input
                type="text"
                value={newAmenity.labelAr}
                onChange={(e) => setNewAmenity(prev => ({ ...prev, labelAr: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder={language === 'ar' ? 'أدخل الاسم بالعربية' : 'Enter name in Arabic'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}
              </label>
              <input
                type="text"
                value={newAmenity.labelEn}
                onChange={(e) => setNewAmenity(prev => ({ ...prev, labelEn: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder={language === 'ar' ? 'أدخل الاسم بالإنجليزية' : 'Enter name in English'}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCancelEdit}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button 
              onClick={editingId ? handleUpdateAmenity : handleAddAmenity}
              disabled={!newAmenity.labelAr || !newAmenity.labelEn || !newAmenity.icon}
            >
              {editingId 
                ? language === 'ar' ? 'تحديث' : 'Update'
                : language === 'ar' ? 'إضافة' : 'Add'
              }
            </Button>
          </div>
        </div>
      )}

      {/* Amenities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div 
            key={amenity.id} 
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                {React.createElement(getIconComponent(amenity.id), {
                  className: "w-5 h-5 text-primary-600"
                })}
              </div>
              <div>
                <h3 className="font-medium">
                  {language === 'ar' ? amenity.labelAr : amenity.labelEn}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? amenity.labelEn : amenity.labelAr}
                </p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleEditAmenity(amenity)}
                className="p-1 hover:bg-gray-100 rounded-full"
                disabled={isAddingNew || editingId !== null}
              >
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={() => handleDeleteAmenity(amenity.id)}
                className="p-1 hover:bg-gray-100 rounded-full"
                disabled={isAddingNew || editingId !== null}
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Changes */}
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>
          <Save className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}