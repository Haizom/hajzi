export interface Booking {
  _id: string;
  user: string;
  property: string | {
    _id: string;
    titleAr: string;
    titleEn: string;
    image: string;
  };
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalPrice: number;
  currency: 'YER' | 'SAR' | 'USD';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'partial' | 'paid';
  notes?: string;
  createdAt: string;
}