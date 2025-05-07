export const HALL_PURPOSES = [
  { id: 'wedding', labelAr: 'حفلات زفاف', labelEn: 'Weddings' },
  { id: 'meeting', labelAr: 'اجتماعات', labelEn: 'Meetings' },
  { id: 'conference', labelAr: 'مؤتمرات', labelEn: 'Conferences' },
  { id: 'party', labelAr: 'حفلات', labelEn: 'Parties' },
  { id: 'graduation', labelAr: 'حفلات تخرج', labelEn: 'Graduation Ceremonies' },
];

export const HALLS_DATA = [
  {
    id: 1,
    titleAr: 'قاعة الملكية',
    titleEn: 'Royal Hall',
    descriptionAr: 'قاعة فاخرة مجهزة لجميع المناسبات مع خدمات متكاملة',
    descriptionEn: 'Luxury hall equipped for all occasions with comprehensive services',
    locationAr: 'صنعاء',
    locationEn: 'Sanaa',
    addressAr: 'صنعاء - شارع حدة - أمام مسجد النور - بجوار مركز التسوق',
    addressEn: 'Sanaa - Hadda Street - In front of Al-Noor Mosque - Next to Shopping Center',
    price: 2000,
    currency: 'SAR',
    capacity: 500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    purposes: ['wedding', 'party', 'graduation'],
    features: [
      { id: 'parking', labelAr: 'موقف سيارات', labelEn: 'Parking' },
      { id: 'catering', labelAr: 'خدمة ضيافة', labelEn: 'Catering' },
      { id: 'sound', labelAr: 'نظام صوت', labelEn: 'Sound System' },
      { id: 'decoration', labelAr: 'خدمة تزيين', labelEn: 'Decoration Service' },
    ],
  },
  {
    id: 2,
    titleAr: 'قاعة الأميرة',
    titleEn: 'Princess Hall',
    descriptionAr: 'قاعة أنيقة مع ديكورات عصرية وخدمات راقية',
    descriptionEn: 'Elegant hall with modern decor and premium services',
    locationAr: 'عدن',
    locationEn: 'Aden',
    addressAr: 'عدن - المنصورة - شارع الخمسين - بجوار حديقة الشعب',
    addressEn: 'Aden - Al-Mansoura - 50th Street - Next to People\'s Park',
    price: 50000,
    currency: 'YER',
    capacity: 400,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    purposes: ['wedding', 'party'],
    features: [
      { id: 'parking', labelAr: 'موقف سيارات', labelEn: 'Parking' },
      { id: 'catering', labelAr: 'خدمة ضيافة', labelEn: 'Catering' },
      { id: 'sound', labelAr: 'نظام صوت', labelEn: 'Sound System' },
      { id: 'wifi', labelAr: 'واي فاي', labelEn: 'WiFi' },
    ],
  },
  {
    id: 3,
    titleAr: 'قاعة المؤتمرات الكبرى',
    titleEn: 'Grand Conference Hall',
    descriptionAr: 'قاعة مجهزة للمؤتمرات والفعاليات الكبرى',
    descriptionEn: 'Hall equipped for conferences and major events',
    locationAr: 'المكلا',
    locationEn: 'Mukalla',
    addressAr: 'المكلا - شارع الكورنيش - بجوار فندق المكلا بلازا - مقابل البحر',
    addressEn: 'Mukalla - Corniche Street - Next to Mukalla Plaza Hotel - Facing the Sea',
    price: 250,
    currency: 'USD',
    capacity: 800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    purposes: ['conference', 'meeting'],
    features: [
      { id: 'translation', labelAr: 'خدمة ترجمة', labelEn: 'Translation Service' },
      { id: 'av', labelAr: 'نظام صوت ومرئيات', labelEn: 'AV System' },
      { id: 'wifi', labelAr: 'واي فاي', labelEn: 'WiFi' },
      { id: 'catering', labelAr: 'خدمة ضيافة', labelEn: 'Catering' },
    ],
  },
];

export const HALL_PURPOSES_DETAILS = {
  wedding: {
    titleAr: 'حفلات الزفاف',
    titleEn: 'Wedding Ceremonies',
    descriptionAr: 'قاعة مثالية لحفلات الزفاف مع خدمات متكاملة وديكورات فاخرة',
    descriptionEn: 'Perfect venue for weddings with comprehensive services and luxury decorations',
    capacity: 500,
    period: 6,
    size: 400,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    ],
    features: [
      { id: 'decoration', labelAr: 'ديكورات فاخرة', labelEn: 'Luxury Decorations' },
      { id: 'catering', labelAr: 'خدمة ضيافة كاملة', labelEn: 'Full Catering Service' },
      { id: 'parking', labelAr: 'موقف سيارات خاص', labelEn: 'Private Parking' },
      { id: 'sound', labelAr: 'نظام صوت متطور', labelEn: 'Advanced Sound System' },
    ],
    price: {
      YER: 300000,
      SAR: 3000,
      USD: 800
    }
  },
  meeting: {
    titleAr: 'الاجتماعات',
    titleEn: 'Meetings',
    descriptionAr: 'مساحة مثالية للاجتماعات المهنية مع تجهيزات تقنية حديثة',
    descriptionEn: 'Ideal space for professional meetings with modern technical equipment',
    capacity: 50,
    period: 4,
    size: 100,
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    ],
    features: [
      { id: 'projector', labelAr: 'جهاز عرض', labelEn: 'Projector' },
      { id: 'wifi', labelAr: 'انترنت عالي السرعة', labelEn: 'High-Speed WiFi' },
      { id: 'coffee', labelAr: 'خدمة القهوة', labelEn: 'Coffee Service' },
      { id: 'board', labelAr: 'لوح للكتابة', labelEn: 'Whiteboard' },
    ],
    price: {
      YER: 100000,
      SAR: 1000,
      USD: 250
    }
  },
  conference: {
    titleAr: 'المؤتمرات',
    titleEn: 'Conferences',
    descriptionAr: 'قاعة مجهزة للمؤتمرات الكبيرة مع تقنيات متطورة',
    descriptionEn: 'Equipped hall for large conferences with advanced technology',
    capacity: 300,
    period: 8,
    size: 300,
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    ],
    features: [
      { id: 'av', labelAr: 'نظام صوت ومرئيات', labelEn: 'AV System' },
      { id: 'translation', labelAr: 'خدمة ترجمة فورية', labelEn: 'Translation Service' },
      { id: 'stage', labelAr: 'منصة رئيسية', labelEn: 'Main Stage' },
      { id: 'tech', labelAr: 'دعم تقني', labelEn: 'Technical Support' },
    ],
    price: {
      YER: 200000,
      SAR: 2000,
      USD: 500
    }
  },
  party: {
    titleAr: 'الحفلات',
    titleEn: 'Parties',
    descriptionAr: 'قاعة مناسبة للحفلات والمناسبات المتنوعة',
    descriptionEn: 'Suitable venue for various parties and events',
    capacity: 150,
    period: 5,
    size: 150,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    ],
    features: [
      { id: 'catering', labelAr: 'خدمة ضيافة', labelEn: 'Catering Service' },
      { id: 'music', labelAr: 'نظام موسيقى', labelEn: 'Music System' },
      { id: 'lighting', labelAr: 'إضاءة خاصة', labelEn: 'Special Lighting' },
      { id: 'seating', labelAr: 'جلسات مريحة', labelEn: 'Comfortable Seating' },
    ],
    price: {
      YER: 150000,
      SAR: 1500,
      USD: 400
    }
  },
  graduation: {
    titleAr: 'حفلات التخرج',
    titleEn: 'Graduation Ceremonies',
    descriptionAr: 'قاعة مثالية لحفلات التخرج مع منصة وخدمات متكاملة',
    descriptionEn: 'Perfect venue for graduation ceremonies with stage and comprehensive services',
    capacity: 400,
    period: 4,
    size: 350,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    ],
    features: [
      { id: 'stage', labelAr: 'منصة للخريجين', labelEn: 'Graduate Stage' },
      { id: 'photo', labelAr: 'خدمة تصوير', labelEn: 'Photography Service' },
      { id: 'sound', labelAr: 'نظام صوت', labelEn: 'Sound System' },
      { id: 'decoration', labelAr: 'ديكورات', labelEn: 'Decorations' },
    ],
    price: {
      YER: 180000,
      SAR: 1800,
      USD: 450
    }
  },
};