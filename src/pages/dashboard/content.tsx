import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { 
  Edit3, 
  Image, 
  Type, 
  Star, 
  MapPin, 
  DollarSign,
  Plus,
  Trash2,
  Save,
  Upload,
  Coffee,
  Wifi,
  Car,
  UtensilsCrossed,
  Building2,
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
  Percent,
  BadgeCheck,
  Clock4
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { HOTELS_DATA, AMENITIES } from '@/data/hotels';
import { ROOMS } from '@/data/rooms';

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
            {/* General Information */}
            {activeSection === 'general' && (
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
            )}

            {/* Rooms Management */}
            {activeSection === 'rooms' && (
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
            )}

            {/* Amenities Management */}
            {activeSection === 'amenities' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'إدارة المرافق' : 'Amenities Management'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {AMENITIES.map((amenity) => (
                    <div key={amenity.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        defaultChecked={hotelData?.amenities.includes(amenity.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex items-center gap-2">
                        {amenity.id === 'wifi' && <Wifi className="w-5 h-5 text-primary-600" />}
                        {amenity.id === 'parking' && <Car className="w-5 h-5 text-primary-600" />}
                        {amenity.id === 'restaurant' && <UtensilsCrossed className="w-5 h-5 text-primary-600" />}
                        <span className="font-medium">
                          {language === 'ar' ? amenity.labelAr : amenity.labelEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Amenity */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">
                    {language === 'ar' ? 'إضافة مرفق جديد' : 'Add New Amenity'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'اسم المرفق (عربي)' : 'Amenity Name (Arabic)'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'اسم المرفق (إنجليزي)' : 'Amenity Name (English)'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {language === 'ar' ? 'إضافة مرفق' : 'Add Amenity'}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>
                    <Save className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {/* Gallery Management */}
            {activeSection === 'gallery' && (
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
              </div>
            )}

            {/* Policies Management */}
            {activeSection === 'policies' && (
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
                        </select>
                      </div>
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
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}