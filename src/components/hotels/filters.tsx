import { useLanguage } from '@/lib/store/useLanguage';
import { Search, X, Star, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { AMENITIES } from '@/data/amenities';
import { useState, useRef, useEffect } from 'react';

type Currency = 'YER' | 'SAR' | 'USD';

type PriceRange = {
  min: number;
  max: number;
  labelAr: string;
  labelEn: string;
};

const CURRENCIES = [
  { id: 'YER', labelAr: 'يمني', labelEn: 'Yemeni Rial' },
  { id: 'SAR', labelAr: 'سعودي', labelEn: 'Saudi Riyal' },
  { id: 'USD', labelAr: 'دولار', labelEn: 'US Dollar' },
];

const PRICE_RANGES: Record<Currency, PriceRange[]> = {
  YER: [
    { min: 0, max: 50000, labelAr: '0 - 50,000', labelEn: '0 - 50,000' },
    { min: 50000, max: 100000, labelAr: '50,000 - 100,000', labelEn: '50,000 - 100,000' },
    { min: 100000, max: 150000, labelAr: '100,000 - 150,000', labelEn: '100,000 - 150,000' },
    { min: 150000, max: 999999999, labelAr: '150,000+', labelEn: '150,000+' },
  ],
  SAR: [
    { min: 0, max: 500, labelAr: '0 - 500', labelEn: '0 - 500' },
    { min: 500, max: 1000, labelAr: '500 - 1,000', labelEn: '500 - 1,000' },
    { min: 1000, max: 1500, labelAr: '1,000 - 1,500', labelEn: '1,000 - 1,500' },
    { min: 1500, max: 999999999, labelAr: '1,500+', labelEn: '1,500+' },
  ],
  USD: [
    { min: 0, max: 150, labelAr: '0 - 150', labelEn: '0 - 150' },
    { min: 150, max: 300, labelAr: '150 - 300', labelEn: '150 - 300' },
    { min: 300, max: 450, labelAr: '300 - 450', labelEn: '300 - 450' },
    { min: 450, max: 999999999, labelAr: '450+', labelEn: '450+' },
  ],
};

type FiltersProps = {
  filters: {
    priceRange: {
      min: number | null;
      max: number | null;
    };
    rating: number | null;
    amenities: string[];
    location: string;
    searchTerm: string;
    sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
    currency: Currency | null;
  };
  setFilters: (filters: any) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

export function HotelsFilters({ filters, setFilters, showFilters, setShowFilters }: FiltersProps) {
  const { language } = useLanguage();
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const ratingDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target as Node)) {
        setIsRatingDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (currency: Currency | null) => {
    if (currency === filters.currency) {
      // If clicking the same currency, remove the currency filter
      setFilters({
        ...filters,
        currency: null,
        priceRange: {
          min: null,
          max: null,
        },
      });
    } else {
      // Set new currency but keep price range null
      setFilters({
        ...filters,
        currency,
        priceRange: {
          min: null,
          max: null,
        },
      });
    }
  };

  const handlePriceRangeSelect = (min: number, max: number) => {
    if (filters.priceRange.min === min && filters.priceRange.max === max) {
      // If clicking the same range, remove the price range filter
      setFilters({
        ...filters,
        priceRange: {
          min: null,
          max: null,
        },
      });
    } else {
      // Set new price range
      setFilters({
        ...filters,
        priceRange: { min, max },
      });
    }
  };

  const handleRatingChange = (rating: number | null) => {
    setFilters({ ...filters, rating });
    setIsRatingDropdownOpen(false);
  };

  const handleAmenityChange = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter((id) => id !== amenityId)
      : [...filters.amenities, amenityId];
    setFilters({ ...filters, amenities: newAmenities });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: {
        min: null,
        max: null,
      },
      rating: null,
      amenities: [],
      location: '',
      searchTerm: '',
      sortBy: null,
      currency: null,
    });
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {language === 'ar' ? 'الفلترة' : 'Filters'}
        </h2>
        <button
          className="text-primary-600 text-sm hover:underline"
          onClick={clearFilters}
        >
          {language === 'ar' ? 'مسح الكل' : 'Clear All'}
        </button>
      </div>

      {/* Search */}
      <div>
        <h3 className="font-medium mb-4">
          {language === 'ar' ? 'البحث' : 'Search'}
        </h3>
        <div className="relative">
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            placeholder={language === 'ar' ? 'ابحث عن فندق...' : 'Search for a hotel...'}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Star Rating Dropdown */}
      <div>
        <h3 className="font-medium mb-4">
          {language === 'ar' ? 'تصنيف النجوم' : 'Star Rating'}
        </h3>
        <div className="relative" ref={ratingDropdownRef}>
          <button
            onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between text-gray-700 transition-colors border"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary-600" />
              <span>
                {filters.rating 
                  ? language === 'ar' 
                    ? `${filters.rating} نجوم` 
                    : `${filters.rating} Stars`
                  : language === 'ar' 
                    ? 'اختر التصنيف' 
                    : 'Select Rating'
                }
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isRatingDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isRatingDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
              <button
                onClick={() => handleRatingChange(null)}
                className={`w-full text-start px-4 py-2 hover:bg-primary-50 transition-colors ${
                  filters.rating === null
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {language === 'ar' ? 'الكل' : 'All'}
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`w-full text-start px-4 py-2 hover:bg-primary-50 transition-colors ${
                    filters.rating === rating
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary-600" />
                    <span>
                      {language === 'ar' ? `${rating} نجوم` : `${rating} Stars`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Currency Selection */}
      <div>
        <h3 className="font-medium mb-4">
          {language === 'ar' ? 'العملة' : 'Currency'}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.id}
              onClick={() => handleCurrencyChange(currency.id as Currency)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.currency === currency.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? currency.labelAr : currency.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Price Ranges */}
      {filters.currency && (
        <div>
          <h3 className="font-medium mb-4">
            {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
          </h3>
          <div className="space-y-2">
            {PRICE_RANGES[filters.currency].map((range) => (
              <button
                key={`${range.min}-${range.max}`}
                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  filters.priceRange.min === range.min && filters.priceRange.max === range.max
                    ? 'bg-primary-50 text-primary-600 border border-primary-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <span>{language === 'ar' ? range.labelAr : range.labelEn}</span>
                <span className="text-sm text-primary-600">
                  {filters.currency}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      <div>
        <h3 className="font-medium mb-4">
          {language === 'ar' ? 'المرافق' : 'Amenities'}
        </h3>
        <div className="space-y-2">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity.id}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity.id)}
                onChange={() => handleAmenityChange(amenity.id)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">
                {language === 'ar' ? amenity.labelAr : amenity.labelEn}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6 bg-white rounded-lg border">
        <FiltersContent />
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'الفلترة' : 'Filters'}
                </h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FiltersContent />
              <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t">
                <Button className="w-full" onClick={() => setShowFilters(false)}>
                  {language === 'ar' ? 'تطبيق' : 'Apply'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}