export const TERMANAT_FEATURES = [
  { id: 'view', labelAr: 'إطلالة بانورامية', labelEn: 'Panoramic View' },
  { id: 'privacy', labelAr: 'خصوصية تامة', labelEn: 'Complete Privacy' },
  { id: 'seating', labelAr: 'جلسات مريحة', labelEn: 'Comfortable Seating' },
  { id: 'parking', labelAr: 'موقف سيارات', labelEn: 'Parking' },
  { id: 'tv', labelAr: 'تلفاز', labelEn: 'TV' },
  { id: 'sound', labelAr: 'نظام صوتي', labelEn: 'Sound System' },
  { id: 'lighting', labelAr: 'إضاءة خاصة', labelEn: 'Special Lighting' },
  { id: 'service', labelAr: 'خدمة ضيافة', labelEn: 'Hospitality Service' },
];

export const TERMANAT_TYPES = [
  { id: 'traditional', labelAr: 'تقليدي', labelEn: 'Traditional' },
  { id: 'modern', labelAr: 'عصري', labelEn: 'Modern' },
  { id: 'vip', labelAr: 'VIP', labelEn: 'VIP' },
];

export const TERMANAT_DATA = [
  {
    id: 1,
    type: 'traditional',
    titleAr: 'طيرمانة الأصالة',
    titleEn: 'Al-Asalah Termanah',
    descriptionAr: 'طيرمانة تقليدية تعكس الطابع اليمني الأصيل مع إطلالة رائعة على المدينة',
    descriptionEn: 'Traditional Termanah reflecting authentic Yemeni style with stunning city views',
    locationAr: 'صنعاء القديمة',
    locationEn: 'Old Sanaa',
    price: 50000,
    currency: 'YER',
    capacity: 15,
    size: 100,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['view', 'privacy', 'seating', 'parking', 'service'],
  },
  {
    id: 2,
    type: 'modern',
    titleAr: 'طيرمانة النخبة',
    titleEn: 'Elite Termanah',
    descriptionAr: 'طيرمانة عصرية مجهزة بأحدث التقنيات مع خدمات فاخرة',
    descriptionEn: 'Modern Termanah equipped with latest technology and luxury services',
    locationAr: 'صنعاء',
    locationEn: 'Sanaa',
    price: 500,
    currency: 'SAR',
    capacity: 20,
    size: 150,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['view', 'privacy', 'seating', 'parking', 'tv', 'sound', 'lighting', 'service'],
  },
  {
    id: 3,
    type: 'vip',
    titleAr: 'طيرمانة السلطان',
    titleEn: 'Sultan Termanah',
    descriptionAr: 'طيرمانة VIP مع خدمات استثنائية وإطلالة بانورامية على المدينة القديمة',
    descriptionEn: 'VIP Termanah with exceptional services and panoramic views of the old city',
    locationAr: 'صنعاء القديمة',
    locationEn: 'Old Sanaa',
    price: 150,
    currency: 'USD',
    capacity: 25,
    size: 200,
    rating: 5.0,
    images: [
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['view', 'privacy', 'seating', 'parking', 'tv', 'sound', 'lighting', 'service'],
  },
];

export const TERMANAT_PURPOSES = [
  { id: 'qat', labelAr: 'مجالس القات', labelEn: 'Qat Sessions' },
  { id: 'meetings', labelAr: 'اجتماعات', labelEn: 'Meetings' },
  { id: 'events', labelAr: 'مناسبات خاصة', labelEn: 'Special Events' },
  { id: 'social', labelAr: 'جلسات اجتماعية', labelEn: 'Social Gatherings' },
];

export const TERMANAT_PERIODS = [
  { id: 'morning', labelAr: 'الفترة الصباحية', labelEn: 'Morning Period', timeAr: '9:00 ص - 3:00 م', timeEn: '9:00 AM - 3:00 PM' },
  { id: 'evening', labelAr: 'الفترة المسائية', labelEn: 'Evening Period', timeAr: '4:00 م - 10:00 م', timeEn: '4:00 PM - 10:00 PM' },
  { id: 'full', labelAr: 'يوم كامل', labelEn: 'Full Day', timeAr: '9:00 ص - 10:00 م', timeEn: '9:00 AM - 10:00 PM' },
];