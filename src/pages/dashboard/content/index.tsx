import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Edit3, Building2, Coffee, Image, Shield } from 'lucide-react';
import { HOTELS_DATA } from '@/data/hotels';
import { GeneralContent } from './general';
import { RoomsContent } from './rooms';
import { AmenitiesContent } from './amenities';
import { GalleryContent } from './gallery';
import { PoliciesContent } from './policies';

export function DashboardContentPage() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<'general' | 'rooms' | 'amenities' | 'gallery' | 'policies'>('general');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  // Get the Crown Plaza Hotel data
  const hotel = HOTELS_DATA.find(h => h.id === 3); // Crown Plaza Hotel ID
  const [hotelData, setHotelData] = useState(hotel);

  const sections = [
    { id: 'general', icon: Edit3, labelAr: 'معلومات عامة', labelEn: 'General Info' },
    { id: 'rooms', icon: Building2, labelAr: 'الغرف', labelEn: 'Rooms' },
    { id: 'amenities', icon: Coffee, labelAr: 'المرافق', labelEn: 'Amenities' },
    { id: 'gallery', icon: Image, labelAr: 'معرض الصور', labelEn: 'Gallery' },
    { id: 'policies', icon: Shield, labelAr: 'السياسات', labelEn: 'Policies' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image upload logic here
    console.log('Image upload:', event.target.files);
  };

  const handleSaveChanges = () => {
    // Handle saving changes logic here
    console.log('Saving changes:', hotelData);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <GeneralContent 
            hotelData={hotelData}
            setHotelData={setHotelData}
            handleSaveChanges={handleSaveChanges}
          />
        );
      case 'rooms':
        return (
          <RoomsContent
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            handleSaveChanges={handleSaveChanges}
            handleImageUpload={handleImageUpload}
          />
        );
      case 'amenities':
        return (
          <AmenitiesContent
            hotelData={hotelData}
            handleSaveChanges={handleSaveChanges}
          />
        );
      case 'gallery':
        return (
          <GalleryContent
            hotelData={hotelData}
            handleImageUpload={handleImageUpload}
            handleSaveChanges={handleSaveChanges}
          />
        );
      case 'policies':
        return (
          <PoliciesContent
            handleSaveChanges={handleSaveChanges}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Edit3 className="w-7 h-7 text-primary-600" />
            {language === 'ar' ? 'إدارة المحتوى' : 'Content Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' 
              ? 'تحديث وتعديل محتوى الفندق'
              : 'Update and modify hotel content'
            }
          </p>
        </div>

        {/* Content Management Interface */}
        <div className="bg-white rounded-xl border">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as typeof activeSection)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeSection === section.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  {language === 'ar' ? section.labelAr : section.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}