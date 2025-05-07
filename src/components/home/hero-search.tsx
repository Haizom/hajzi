import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Calendar as CalendarIcon, MapPin, Search, Users, X } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useLanguage } from '@/lib/store/useLanguage';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Location = {
  id: number;
  name: {
    ar: string;
    en: string;
  };
};

const LOCATIONS: Location[] = [
  { id: 1, name: { ar: 'الرياض', en: 'Riyadh' } },
  { id: 2, name: { ar: 'جدة', en: 'Jeddah' } },
  { id: 3, name: { ar: 'الدمام', en: 'Dammam' } },
  { id: 4, name: { ar: 'مكة المكرمة', en: 'Makkah' } },
  { id: 5, name: { ar: 'المدينة المنورة', en: 'Madinah' } },
];

export function HeroSearch() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [location, setLocation] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const dateLocale = language === 'ar' ? ar : enUS;

  const filteredLocations = location
    ? LOCATIONS.filter((loc) => {
        const searchValue = location.toLowerCase();
        const locationName = loc.name[language as keyof typeof loc.name].toLowerCase();
        return locationName.includes(searchValue);
      })
    : LOCATIONS;

  const handleLocationSelect = (loc: Location) => {
    setLocation(loc.name[language as keyof typeof loc.name]);
    setShowLocations(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd MMM yyyy', { locale: dateLocale });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('search.locationPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowLocations(true);
            }}
            onFocus={() => setShowLocations(true)}
          />
          {location && (
            <button
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => {
                setLocation('');
                setShowLocations(false);
              }}
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {showLocations && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  className="w-full text-start px-4 py-2 hover:bg-primary-50"
                  onClick={() => handleLocationSelect(loc)}
                >
                  {loc.name[language as keyof typeof loc.name]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <button
            type="button"
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-start focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onClick={() => {
              setShowCheckInCalendar(!showCheckInCalendar);
              setShowCheckOutCalendar(false);
            }}
          >
            {checkIn ? formatDate(checkIn) : t('common.checkIn')}
          </button>
          {showCheckInCalendar && (
            <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border p-2">
              <DayPicker
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);
                  setShowCheckInCalendar(false);
                }}
                locale={dateLocale}
                fromDate={new Date()}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className={language === 'ar' ? 'font-arabic' : 'font-english'}
              />
            </div>
          )}
        </div>

        {/* Check-out Date */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <button
            type="button"
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-start focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onClick={() => {
              setShowCheckOutCalendar(!showCheckOutCalendar);
              setShowCheckInCalendar(false);
            }}
          >
            {checkOut ? formatDate(checkOut) : t('common.checkOut')}
          </button>
          {showCheckOutCalendar && (
            <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border p-2">
              <DayPicker
                mode="single"
                selected={checkOut}
                onSelect={(date) => {
                  setCheckOut(date);
                  setShowCheckOutCalendar(false);
                }}
                locale={dateLocale}
                fromDate={checkIn || new Date()}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className={language === 'ar' ? 'font-arabic' : 'font-english'}
              />
            </div>
          )}
        </div>

        {/* Guests */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {t(num === 1 ? 'search.guest' : 'search.guests')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Button className="w-full sm:w-auto">
          <Search className="h-5 w-5 mr-2" />
          {t('common.search')}
        </Button>
      </div>
    </div>
  );
}