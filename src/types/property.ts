export interface Property {
  _id: string;
  owner: string;
  type: 'hotel' | 'chalet' | 'hall' | 'apartment' | 'camp';
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  locationAr: string;
  locationEn: string;
  addressAr: string;
  addressEn: string;
  price: number;
  currency: 'YER' | 'SAR' | 'USD';
  rating: number;
  image: string;
  images: string[];
  features: string[];
  amenities: string[];
  capacity?: number;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  rentalType?: 'daily' | 'monthly';
  isActive: boolean;
  createdAt: string;
}