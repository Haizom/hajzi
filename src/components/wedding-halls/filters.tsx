import { useLanguage } from '@/lib/store/useLanguage';
import { Search, X, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { HALL_PURPOSES } from '@/data/wedding-halls';
import { useState } from 'react';

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
    purposes: string[];
    location: string;
    searchTerm: string;
    sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | null;
    currency: Currency | null;
    type: string | null;
  };
  setFilters: (filters: any) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

export function WeddingHallsFilters({ filters, setFilters, showFilters, setShowFilters }: FiltersProps) {
  const { language } = useLanguage();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('YER');

  const handleCurrencyChange = (currency: Currency) => {
    if (currency === filters.currency) {
      // If clicking the same currency, remove the currency and price range filters
      setFilters({
        ...filters,
        currency: null,
        priceRange: {
          min: null,
          max: null,
        },
      });
    } else {
      // Set new currency but keep price range null until user selects a range
      setFilters({
        ...filters,
        currency: currency,
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

  const handlePurposeChange = (purposeId: string) => {
    const newPurposes = filters.purposes.includes(purposeId)
      ? filters.purposes.filter((id) => id !== purposeId)
      : [...filters.purposes, purposeId];
    setFilters({ ...filters, purposes: newPurposes });
  };

  const handleTypeChange = (type: string | null) => {
    setFilters({ ...filters, type: filters.type === type ? null : type });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: {
        min: null,
        max: null,
      },
      purposes: [],
      location: '',
      searchTerm: '',
      sortBy: null,
      currency: null,
      type: null,
    });
    setSelectedCurrency('YER');
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
            placeholder={language === 'ar' ? 'ابحث عن قاعة...' : 'Search for a hall...'}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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

      {/* Event Types */}
      <div>
        <h3 className="font-medium mb-4">
          {language === 'ar' ? 'نوع المناسبة' : 'Event Type'}
        </h3>
        <div className="space-y-2">
          {HALL_PURPOSES.map((purpose) => (
            <button
              key={purpose.id}
              onClick={() => handlePurposeChange(purpose.id)}
              className={`w-full text-start px-4 py-3 rounded-lg transition-colors ${
                filters.purposes.includes(purpose.id)
                  ? 'bg-primary-50 text-primary-600 border border-primary-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {language === 'ar' ? purpose.labelAr : purpose.labelEn}
            </button>
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