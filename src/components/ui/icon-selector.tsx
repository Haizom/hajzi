import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { ChevronDown, Search } from 'lucide-react';
import { AMENITY_ICONS, getAllCategories, AmenityIcon } from '@/lib/icons/amenity-icons';

type IconSelectorProps = {
  selectedIcon: string;
  onSelect: (iconId: string) => void;
  className?: string;
};

export function IconSelector({ selectedIcon, onSelect, className = '' }: IconSelectorProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AmenityIcon['category'] | 'all'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = getAllCategories();

  const filteredIcons = AMENITY_ICONS.filter(icon => {
    const matchesSearch = searchTerm === '' || 
      icon.labelEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.labelAr.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedIconInfo = AMENITY_ICONS.find(icon => icon.id === selectedIcon);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border rounded-lg flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {selectedIconInfo && (
            <>
              {React.createElement(selectedIconInfo.icon, {
                className: "w-5 h-5 text-primary-600"
              })}
              <span>
                {language === 'ar' ? selectedIconInfo.labelAr : selectedIconInfo.labelEn}
              </span>
            </>
          )}
          {!selectedIconInfo && (
            <span className="text-gray-500">
              {language === 'ar' ? 'اختر أيقونة' : 'Select an icon'}
            </span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100">
          {/* Search */}
          <div className="p-2 border-b">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Categories */}
          <div className="p-2 border-b flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'All'}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? category.labelAr : category.labelEn}
              </button>
            ))}
          </div>

          {/* Icons List */}
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => {
                  onSelect(icon.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-50 transition-colors ${
                  selectedIcon === icon.id ? 'bg-primary-50 text-primary-600' : ''
                }`}
              >
                {React.createElement(icon.icon, {
                  className: selectedIcon === icon.id ? "w-5 h-5 text-primary-600" : "w-5 h-5 text-gray-600"
                })}
                <span>
                  {language === 'ar' ? icon.labelAr : icon.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}