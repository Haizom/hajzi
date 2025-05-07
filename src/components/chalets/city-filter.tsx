import { useLanguage } from '@/lib/store/useLanguage';
import { MapPin, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const YEMEN_CITIES = [
  { id: 'all', nameAr: 'كل المدن', nameEn: 'All Cities' },
  { id: 'sanaa', nameAr: 'صنعاء', nameEn: 'Sanaa' },
  { id: 'aden', nameAr: 'عدن', nameEn: 'Aden' },
  { id: 'mukalla', nameAr: 'المكلا', nameEn: 'Mukalla' },
  { id: 'taiz', nameAr: 'تعز', nameEn: 'Taiz' },
  { id: 'hodeidah', nameAr: 'الحديدة', nameEn: 'Hodeidah' },
  { id: 'ibb', nameAr: 'إب', nameEn: 'Ibb' },
];

type CityFilterProps = {
  selectedCity: string;
  onCityChange: (city: string) => void;
};

export function CityFilter({ selectedCity, onCityChange }: CityFilterProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCityName = YEMEN_CITIES.find(city => city.id === selectedCity)?.[language === 'ar' ? 'nameAr' : 'nameEn'];

  return (
    <div className="mb-8 bg-white shadow-sm border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary-600" />
        </div>
        <h3 className="font-semibold text-lg">
          {language === 'ar' ? 'تصفية حسب المدينة' : 'Filter by City'}
        </h3>
      </div>

      {/* Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between text-gray-700 transition-colors"
        >
          <span>{selectedCityName}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 max-h-60 overflow-y-auto">
            {YEMEN_CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  onCityChange(city.id);
                  setIsOpen(false);
                }}
                className={`w-full text-start px-4 py-2 hover:bg-primary-50 transition-colors ${
                  selectedCity === city.id
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {language === 'ar' ? city.nameAr : city.nameEn}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}