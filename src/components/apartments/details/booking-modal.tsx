import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { useAuth } from '@/lib/store/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Calendar, 
  Users, 
  MessageSquare, 
  Send, 
  AlertCircle, 
  User, 
  UserPlus, 
  Baby, 
  Phone, 
  Mail 
} from 'lucide-react';
import { format, addDays, addMonths, isWithinInterval } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CustomSelectProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
  label: string;
  icon: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: number) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-3 py-2 border rounded-lg text-start flex items-center gap-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:bg-gray-50 text-sm"
      >
        {icon}
        <span>{value} {label}</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option} {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  apartment: any;
  section?: any;
};

export function ApartmentBookingModal({ isOpen, onClose, apartment, section }: BookingModalProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [bookingType, setBookingType] = useState<'self' | 'other'>('self');
  const [formData, setFormData] = useState({
    fullName: '',
    guestName: '',
    phone: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    adults: 1,
    children: 0,
    notes: '',
    coupon: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  useEffect(() => {
    // التحقق التلقائي من كود الخصم عند تغييره
    if (formData.coupon.trim() !== '') {
      const isValid = validateCoupon(formData.coupon.trim());
      setIsCouponValid(isValid);
      if (!isValid) {
        setErrors({ ...errors, coupon: language === 'ar' ? 'كود الخصم غير صحيح' : 'Invalid coupon code' });
      } else {
        setErrors({ ...errors, coupon: '' });
      }
    } else {
      setIsCouponValid(null);
      setErrors({ ...errors, coupon: '' });
    }
  }, [formData.coupon]);

  if (!isOpen) return null;

  const dateLocale = language === 'ar' ? ar : enUS;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'dd MMM yyyy', { locale: dateLocale });
  };

  const disabledDays = [
    { from: new Date(0), to: addDays(new Date(), -1) },
  ];

  const calendarClassNames = {
    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
    month: 'space-y-4',
    caption: 'flex justify-center pt-1 relative items-center',
    caption_label: 'text-sm font-medium',
    nav: 'space-x-1 flex items-center',
    nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex',
    head_cell: 'text-primary-600 rounded-md w-8 sm:w-9 font-normal text-[0.7rem] sm:text-[0.8rem]',
    row: 'flex w-full mt-2',
    cell: 'text-center text-[0.8rem] sm:text-sm p-0 relative [&:has([aria-selected])]:bg-primary-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
    day: 'h-8 w-8 sm:h-9 sm:w-9 p-0 font-normal aria-selected:opacity-100',
    day_selected: 'bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700',
    day_today: 'bg-gray-100',
    day_outside: 'opacity-25',
    day_disabled: 'opacity-25 cursor-not-allowed',
    day_range_middle: 'aria-selected:bg-primary-50 aria-selected:text-primary-900',
    day_hidden: 'invisible',
  };

  const isDateInRange = (date: Date) => {
    if (!formData.checkIn || !formData.checkOut) return false;
    return isWithinInterval(date, { start: formData.checkIn, end: formData.checkOut });
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const diffTime = formData.checkOut.getTime() - formData.checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (apartment.rentalType === 'monthly') {
      return section ? section.price[apartment.currency] : apartment.price;
    } else {
      const nights = calculateNights();
      return section ? section.price[apartment.currency] : apartment.price * nights;
    }
  };

  const calculateDiscount = (totalPrice: number, coupon: string) => {
    if (coupon === 'osama50') {
      return totalPrice * 0.5;
    }
    return 0;
  };

  const validateCoupon = (coupon: string) => {
    const validCoupons = ['osama50'];
    return validCoupons.includes(coupon);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = language === 'ar' ? 'يرجى إدخال الاسم' : 'Please enter name';
    }

    if (bookingType === 'other' && !formData.guestName.trim()) {
      newErrors.guestName = language === 'ar' ? 'يرجى إدخال اسم الضيف' : 'Please enter guest name';
    }

    if (!formData.phone) {
      newErrors.phone = language === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter phone number';
    }

    if (!formData.checkIn) {
      newErrors.checkIn = language === 'ar' ? 'يرجى اختيار تاريخ الوصول' : 'Please select check-in date';
    }

    if (apartment.rentalType === 'daily' && !formData.checkOut) {
      newErrors.checkOut = language === 'ar' ? 'يرجى اختيار تاريخ المغادرة' : 'Please select check-out date';
    }

    if (!agreedToPolicies) {
      newErrors.policies = language === 'ar' ? 'يرجى الموافقة على السياسات' : 'Please agree to the policies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const totalPrice = calculateTotalPrice();
    const discount = isCouponValid ? calculateDiscount(totalPrice, formData.coupon.trim()) : 0;
    const finalPrice = totalPrice - discount;

    const message = language === 'ar'
      ? `*حجز جديد*\n\n` +
        `*الشقة:* ${apartment.titleAr}\n` +
        (apartment.rentalType === 'monthly' ? 'حجز شهري\n' : '') +
        `*السعر:* ${section ? section.price[apartment.currency] : apartment.price} ${apartment.currency}\n` +
        (apartment.rentalType === 'daily' ? `*عدد الليالي:* ${calculateNights()}\n` : '') +
        (isCouponValid ? `*الإجمالي قبل الخصم:* ${totalPrice} ${apartment.currency}\n` : '') +
        (isCouponValid ? `*كود الخصم:* ${formData.coupon.trim()}\n*الخصم:* ${discount} ${apartment.currency}\n` : '') +
        `*${isCouponValid ? 'الإجمالي بعد الخصم' : 'الإجمالي'}:* ${isCouponValid ? finalPrice : totalPrice} ${apartment.currency}\n\n` +
        `*معلومات الحجز:*\n` +
        `${bookingType === 'self' 
          ? `*الاسم:* ${formData.fullName}\n`
          : `*الحاجز:* ${formData.fullName}\n*الضيف:* ${formData.guestName}\n`}` +
        `*رقم الهاتف:* ${formData.phone}\n` +
        `*تاريخ الوصول:* ${formatDate(formData.checkIn)}\n` +
        (apartment.rentalType === 'daily' ? `*تاريخ المغادرة:* ${formatDate(formData.checkOut)}\n` : '') +
        `*عدد البالغين:* ${formData.adults}\n` +
        `*عدد الأطفال:* ${formData.children}\n` +
        (formData.notes ? `\n*ملاحظات:*\n${formData.notes}` : '')
      : `*New Booking*\n\n` +
        `*Apartment:* ${apartment.titleEn}\n` +
        (apartment.rentalType === 'monthly' ? 'Monthly Booking\n' : '') +
        `*Price:* ${section ? section.price[apartment.currency] : apartment.price} ${apartment.currency}\n` +
        (apartment.rentalType === 'daily' ? `*Number of nights:* ${calculateNights()}\n` : '') +
        (isCouponValid ? `*Total before discount:* ${totalPrice} ${apartment.currency}\n` : '') +
        (isCouponValid ? `*Coupon Code:* ${formData.coupon.trim()}\n*Discount:* ${discount} ${apartment.currency}\n` : '') +
        `*${isCouponValid ? 'Total after discount' : 'Total'}:* ${isCouponValid ? finalPrice : totalPrice} ${apartment.currency}\n\n` +
        `*Booking Details:*\n` +
        `${bookingType === 'self' 
          ? `*Name:* ${formData.fullName}\n`
          : `*Booker:* ${formData.fullName}\n*Guest:* ${formData.guestName}\n`}` +
        `*Phone:* ${formData.phone}\n` +
        `*Check-in:* ${formatDate(formData.checkIn)}\n` +
        (apartment.rentalType === 'daily' ? `*Check-out:* ${formatDate(formData.checkOut)}\n` : '') +
        `*Adults:* ${formData.adults}\n` +
        `*Children:* ${formData.children}\n` +
        (formData.notes ? `\n*Notes:*\n${formData.notes}` : '');

    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/966501568522?text=${encodedMessage}`, '_blank');
    
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-3 sm:p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold text-gray-900">
            {language === 'ar' ? 'حجز شقة' : 'Book Apartment'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4 bg-gray-50 border-b">
          <h3 className="text-sm sm:text-base font-medium">
            {language === 'ar' ? apartment.titleAr : apartment.titleEn}
          </h3>
          {section && (
            <p className="text-xs sm:text-sm text-gray-600">
              {language === 'ar' ? section.titleAr : section.titleEn}
            </p>
          )}
          <div className="text-primary-600 font-medium mt-1 text-sm sm:text-base">
            {section ? section.price[apartment.currency] : apartment.price} {apartment.currency}
            <span className="text-xs sm:text-sm text-gray-500">
              {' '}{language === 'ar' 
                ? apartment.rentalType === 'daily' ? '/ يوم' : '/ شهر'
                : apartment.rentalType === 'daily' ? '/ day' : '/ month'
              }
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="flex gap-2 sm:gap-4 mb-3 sm:mb-4">
            <button
              type="button"
              onClick={() => setBookingType('self')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-colors ${
                bookingType === 'self'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              {language === 'ar' ? 'الحجز لي' : 'Book for Myself'}
            </button>
            <button
              type="button"
              onClick={() => setBookingType('other')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-colors ${
                bookingType === 'other'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              {language === 'ar' ? 'الحجز لغيري' : 'Book for Someone Else'}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
                {bookingType === 'self' 
                  ? language === 'ar' ? 'الاسم الكامل' : 'Full Name'
                  : language === 'ar' ? 'اسم الحاجز' : 'Booker Name'
                }
              </label>
              <input
                type="text"
                required
                className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.fullName ? 'border-red-300' : 'border-gray-300'
                }`}
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) {
                    setErrors({ ...errors, fullName: '' });
                  }
                }}
                placeholder={language === 'ar' ? 'يرجى إدخال الاسم' : 'Please enter name'}
              />
              {errors.fullName && (
                <p className="form-error">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {bookingType === 'other' && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
                  {language === 'ar' ? 'اسم الضيف' : 'Guest Name'}
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.guestName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={formData.guestName}
                  onChange={(e) => {
                    setFormData({ ...formData, guestName: e.target.value });
                    if (errors.guestName) {
                      setErrors({ ...errors, guestName: '' });
                    }
                  }}
                  placeholder={language === 'ar' ? 'يرجى إدخال اسم الضيف' : 'Please enter guest name'}
                />
                {errors.guestName && (
                  <p className="form-error">
                    <AlertCircle className="w-3 h-3" />
                    {errors.guestName}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
              {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
            </label>
            <div className="phone-input-container">
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="YE"
                value={formData.phone}
                onChange={(value) => {
                  setFormData({ ...formData, phone: value || '' });
                  if (errors.phone) {
                    setErrors({ ...errors, phone: '' });
                  }
                }}
                className={`w-full border rounded-lg focus-ring ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={language === 'ar' ? '777 777 777' : '777 777 777'}
              />
            </div>
            {errors.phone && (
              <p className="form-error">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? 'كود الخصم' : 'Coupon Code'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300"
                value={formData.coupon}
                onChange={(e) => {
                  setFormData({ ...formData, coupon: e.target.value });
                }}
                placeholder={language === 'ar' ? 'أدخل كود الخصم' : 'Enter coupon code'}
              />
            </div>
            {isCouponValid === false && (
              <p className="form-error">
                <AlertCircle className="w-3 h-3" />
                {language === 'ar' ? 'كود الخصم غير صحيح' : 'Invalid coupon code'}
              </p>
            )}
            {isCouponValid === true && (
              <p className="text-green-600 text-sm mt-1">
                {language === 'ar' ? 'كود الخصم صحيح' : 'Coupon code is valid'}
              </p>
            )}
          </div>

          {apartment.rentalType === 'daily' ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
                  {language === 'ar' ? 'تاريخ الوصول' : 'Check-in Date'}
                </label>
                <button
                  type="button"
                  className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-start flex items-center gap-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:bg-gray-50 text-sm ${
                    errors.checkIn ? 'border-red-300' : 'border-gray-300'
                  }`}
                  onClick={() => {
                    setShowCheckInCalendar(!showCheckInCalendar);
                    setShowCheckOutCalendar(false);
                  }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="truncate">
                    {formData.checkIn ? formatDate(formData.checkIn) : language === 'ar' ? 'اختر التاريخ' : 'Select date'}
                  </span>
                </button>
                {errors.checkIn && (
                  <p className="form-error">
                    <AlertCircle className="w-3 h-3" />
                    {errors.checkIn}
                  </p>
                )}
                {showCheckInCalendar && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="bg-white rounded-lg shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
                      <DayPicker
                        mode="single"
                        selected={formData.checkIn}
                        onSelect={(date) => {
                          setFormData({ ...formData, checkIn: date || null });
                          if (errors.checkIn) {
                            setErrors({ ...errors, checkIn: '' });
                          }
                          setShowCheckInCalendar(false);
                        }}
                        locale={dateLocale}
                        disabled={disabledDays}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                        className={`${language === 'ar' ? 'font-arabic' : 'font-english'} text-sm`}
                        classNames={calendarClassNames}
                        modifiersClassNames={{
                          selected: 'bg-primary-600 text-white hover:bg-primary-700',
                          today: 'bg-gray-100',
                          range_middle: 'bg-primary-50',
                        }}
                        modifiers={{
                          range_middle: (date) => isDateInRange(date),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
                  {language === 'ar' ? 'تاريخ المغادرة' : 'Check-out Date'}
                </label>
                <button
                  type="button"
                  className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-start flex items-center gap-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:bg-gray-50 text-sm ${
                    errors.checkOut ? 'border-red-300' : 'border-gray-300'
                  }`}
                  onClick={() => {
                    setShowCheckOutCalendar(!showCheckOutCalendar);
                    setShowCheckInCalendar(false);
                  }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="truncate">
                    {formData.checkOut ? formatDate(formData.checkOut) : language === 'ar' ? 'اختر التاريخ' : 'Select date'}
                  </span>
                </button>
                {errors.checkOut && (
                  <p className="form-error">
                    <AlertCircle className="w-3 h-3" />
                    {errors.checkOut}
                  </p>
                )}
                {showCheckOutCalendar && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="bg-white rounded-lg shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
                      <DayPicker
                        mode="single"
                        selected={formData.checkOut}
                        onSelect={(date) => {
                          setFormData({ ...formData, checkOut: date || null });
                          if (errors.checkOut) {
                            setErrors({ ...errors, checkOut: '' });
                          }
                          setShowCheckOutCalendar(false);
                        }}
                        locale={dateLocale}
                        fromDate={formData.checkIn || new Date()}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                        className={`${language === 'ar' ? 'font-arabic' : 'font-english'} text-sm`}
                        classNames={calendarClassNames}
                        modifiersClassNames={{
                          selected: 'bg-primary-600 text-white hover:bg-primary-700',
                          today: 'bg-gray-100',
                          range_middle: 'bg-primary-50',
                        }}
                        modifiers={{
                          range_middle: (date) => isDateInRange(date),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
                {language === 'ar' ? 'تاريخ بداية الحجز' : 'Booking Start Date'}
              </label>
              <button
                type="button"
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-start flex items-center gap-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:bg-gray-50 text-sm ${
                  errors.checkIn ? 'border-red-300' : 'border-gray-300'
                }`}
                onClick={() => {
                  setShowCheckInCalendar(!showCheckInCalendar);
                  setShowCheckOutCalendar(false);
                }}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="truncate">
                  {formData.checkIn ? formatDate(formData.checkIn) : language === 'ar' ? 'اختر التاريخ' : 'Select date'}
                </span>
              </button>
              {errors.checkIn && (
                <p className="form-error">
                  <AlertCircle className="w-3 h-3" />
                  {errors.checkIn}
                </p>
              )}
              {showCheckInCalendar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                  <div className="bg-white rounded-lg shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
                    <DayPicker
                      mode="single"
                      selected={formData.checkIn}
                      onSelect={(date) => {
                        setFormData({ ...formData, checkIn: date || null, checkOut: date ? addMonths(date, 1) : null });
                        if (errors.checkIn) {
                          setErrors({ ...errors, checkIn: '' });
                        }
                        setShowCheckInCalendar(false);
                      }}
                      locale={dateLocale}
                      disabled={disabledDays}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                      className={`${language === 'ar' ? 'font-arabic' : 'font-english'} text-sm`}
                      classNames={calendarClassNames}
                      modifiersClassNames={{
                        selected: 'bg-primary-600 text-white hover:bg-primary-700',
                        today: 'bg-gray-100',
                        range_middle: 'bg-primary-50',
                      }}
                      modifiers={{
                        range_middle: (date) => isDateInRange(date),
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 required-field">
                {language === 'ar' ? 'البالغين' : 'Adults'}
              </label>
              <CustomSelect
                options={[1, 2, 3, 4, 5, 6]}
                value={formData.adults}
                onChange={(value) => setFormData({ ...formData, adults: value })}
                label={language === 'ar' ? (formData.adults === 1 ? 'بالغ' : 'بالغين') : (formData.adults === 1 ? 'adult' : 'adults')}
                icon={<Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الأطفال' : 'Children'}
              </label>
              <CustomSelect
                options={[0, 1, 2, 3, 4]}
                value={formData.children}
                onChange={(value) => setFormData({ ...formData, children: value })}
                label={language === 'ar' ? (formData.children === 0 ? 'أطفال' : formData.children === 1 ? 'طفل' : 'أطفال') : (formData.children === 1 ? 'child' : 'children')}
                icon={<Baby className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? 'ملاحظات' : 'Notes'}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:h-5 text-gray-400" />
              <textarea
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={language === 'ar' ? 'أي متطلبات خاصة؟' : 'Any special requirements?'}
              />
            </div>
          </div>

          {/* Customer Service Button */}
          <button
            type="button"
            onClick={() => window.open('https://wa.me/message/GK672XLIJXB2P1', '_blank')}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            {language === 'ar' ? 'تواصل مع خدمة العملاء' : 'Contact Customer Service'}
          </button>

          {/* Policies Agreement */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="policies-agreement"
                checked={agreedToPolicies}
                onChange={(e) => {
                  setAgreedToPolicies(e.target.checked);
                  if (errors.policies) {
                    setErrors({ ...errors, policies: '' });
                  }
                }}
                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="policies-agreement" className="text-xs sm:text-sm text-gray-600">
                {language === 'ar' 
                  ? 'أوافق على سياسات الشقة وشروط الحجز. ' 
                  : 'I agree to the apartment policies and booking terms. '
                }
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/legal/policies');
                  }}
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {language === 'ar' ? 'قراءة السياسات' : 'Read policies'}
                </button>
              </label>
            </div>
            {errors.policies && (
              <p className="form-error">
                <AlertCircle className="w-3 h-3" />
                {errors.policies}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full text-sm"
          >
            <Send className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'إرسال طلب الحجز' : 'Send Booking Request'}
          </Button>
        </form>
      </div>
    </div>
  );
}