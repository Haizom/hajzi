import { Wifi, Car, UtensilsCrossed, Coffee, Waves, Dumbbell, Heart, Umbrella, Bed, Tv, Bath, Wind, Utensils, Phone, ParkingMeter as Parking, Shirt, Wine, Music, Sun, Snowflake, Baby, Briefcase, Laptop, Printer, Key, DivideIcon as LucideIcon } from 'lucide-react';

export type AmenityIcon = {
  id: string;
  icon: LucideIcon;
  labelAr: string;
  labelEn: string;
  category: 'basic' | 'comfort' | 'business' | 'leisure';
};

export const AMENITY_ICONS: AmenityIcon[] = [
  // Basic Amenities
  { id: 'wifi', icon: Wifi, labelAr: 'واي فاي', labelEn: 'WiFi', category: 'basic' },
  { id: 'parking', icon: Parking, labelAr: 'موقف سيارات', labelEn: 'Parking', category: 'basic' },
  { id: 'ac', icon: Snowflake, labelAr: 'تكييف', labelEn: 'Air Conditioning', category: 'basic' },
  { id: 'heating', icon: Sun, labelAr: 'تدفئة', labelEn: 'Heating', category: 'basic' },
  { id: 'phone', icon: Phone, labelAr: 'هاتف', labelEn: 'Phone', category: 'basic' },
  { id: 'key-card', icon: Key, labelAr: 'بطاقة مفتاح', labelEn: 'Key Card', category: 'basic' },

  // Comfort Amenities
  { id: 'bed', icon: Bed, labelAr: 'سرير مريح', labelEn: 'Comfortable Bed', category: 'comfort' },
  { id: 'tv', icon: Tv, labelAr: 'تلفاز', labelEn: 'TV', category: 'comfort' },
  { id: 'bath', icon: Bath, labelAr: 'حمام خاص', labelEn: 'Private Bath', category: 'comfort' },
  { id: 'minibar', icon: Wine, labelAr: 'ميني بار', labelEn: 'Minibar', category: 'comfort' },
  { id: 'room-service', icon: UtensilsCrossed, labelAr: 'خدمة الغرف', labelEn: 'Room Service', category: 'comfort' },
  { id: 'laundry', icon: Shirt, labelAr: 'خدمة غسيل', labelEn: 'Laundry', category: 'comfort' },

  // Leisure Amenities
  { id: 'pool', icon: Waves, labelAr: 'مسبح', labelEn: 'Pool', category: 'leisure' },
  { id: 'gym', icon: Dumbbell, labelAr: 'صالة رياضية', labelEn: 'Gym', category: 'leisure' },
  { id: 'spa', icon: Heart, labelAr: 'سبا', labelEn: 'Spa', category: 'leisure' },
  { id: 'restaurant', icon: Utensils, labelAr: 'مطعم', labelEn: 'Restaurant', category: 'leisure' },
  { id: 'coffee-shop', icon: Coffee, labelAr: 'كافيه', labelEn: 'Coffee Shop', category: 'leisure' },
  { id: 'entertainment', icon: Music, labelAr: 'ترفيه', labelEn: 'Entertainment', category: 'leisure' },

  // Business Amenities
  { id: 'business-center', icon: Briefcase, labelAr: 'مركز أعمال', labelEn: 'Business Center', category: 'business' },
  { id: 'meeting-rooms', icon: Laptop, labelAr: 'قاعات اجتماعات', labelEn: 'Meeting Rooms', category: 'business' },
  { id: 'printer', icon: Printer, labelAr: 'طابعة', labelEn: 'Printer', category: 'business' }
];

export const getIconComponent = (iconId: string): LucideIcon => {
  return AMENITY_ICONS.find(icon => icon.id === iconId)?.icon || Wifi;
};

export const getIconLabel = (iconId: string, language: 'ar' | 'en'): string => {
  const icon = AMENITY_ICONS.find(icon => icon.id === iconId);
  return language === 'ar' ? icon?.labelAr || '' : icon?.labelEn || '';
};

export const getIconsByCategory = (category: AmenityIcon['category']): AmenityIcon[] => {
  return AMENITY_ICONS.filter(icon => icon.category === category);
};

export const getAllCategories = (): { id: AmenityIcon['category']; labelAr: string; labelEn: string; }[] => {
  return [
    { id: 'basic', labelAr: 'أساسي', labelEn: 'Basic' },
    { id: 'comfort', labelAr: 'راحة', labelEn: 'Comfort' },
    { id: 'leisure', labelAr: 'ترفيه', labelEn: 'Leisure' },
    { id: 'business', labelAr: 'أعمال', labelEn: 'Business' }
  ];
};