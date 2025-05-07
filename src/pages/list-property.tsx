import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  Crown, 
  Star, 
  Shield, 
  Users, 
  Globe,
  TrendingUp,
  CheckCircle2,
  Home
} from 'lucide-react';

type PropertyType = 'hotel' | 'chalet' | 'hall' | 'apartment' | 'camp';

export function ListPropertyPage() {
  const { language } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: '' as PropertyType,
    ownerName: '',
    taxNumber: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
  });

  const propertyTypes = [
    { value: 'hotel', labelAr: 'فندق', labelEn: 'Hotel', icon: Building2 },
    { value: 'chalet', labelAr: 'شاليه', labelEn: 'Chalet', icon: Home },
    { value: 'hall', labelAr: 'قاعة أفراح', labelEn: 'Wedding Hall', icon: Users },
    { value: 'apartment', labelAr: 'شقة', labelEn: 'Apartment', icon: Building2 },
    { value: 'camp', labelAr: 'طيرمانة', labelEn: 'Camp', icon: Users },
  ];

  const benefits = [
    {
      icon: Globe,
      titleAr: 'وصول عالمي',
      titleEn: 'Global Reach',
      descriptionAr: 'اعرض عقارك لآلاف العملاء المحتملين',
      descriptionEn: 'Showcase your property to thousands of potential customers',
    },
    {
      icon: TrendingUp,
      titleAr: 'زيادة الإيرادات',
      titleEn: 'Increased Revenue',
      descriptionAr: 'احصل على المزيد من الحجوزات وزيادة في الأرباح',
      descriptionEn: 'Get more bookings and increase your profits',
    },
    {
      icon: Shield,
      titleAr: 'إدارة آمنة',
      titleEn: 'Secure Management',
      descriptionAr: 'أدر عقارك بكل سهولة وأمان من خلال لوحة التحكم',
      descriptionEn: 'Manage your property easily and securely through the dashboard',
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyName) {
      newErrors.propertyName = language === 'ar' ? 'اسم العقار مطلوب' : 'Property name is required';
    }
    if (!formData.propertyType) {
      newErrors.propertyType = language === 'ar' ? 'نوع العقار مطلوب' : 'Property type is required';
    }
    if (!formData.ownerName) {
      newErrors.ownerName = language === 'ar' ? 'اسم المالك مطلوب' : 'Owner name is required';
    }
    if (!formData.phone) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    }
    if (!formData.whatsapp) {
      newErrors.whatsapp = language === 'ar' ? 'رقم الواتساب مطلوب' : 'WhatsApp number is required';
    }
    if (!formData.email) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email format';
    }
    if (!formData.address) {
      newErrors.address = language === 'ar' ? 'عنوان العقار مطلوب' : 'Property address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form data:', formData);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {language === 'ar' ? 'انضم إلى عائلة حجزي' : 'Join the Hajzi Family'}
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'كن جزءاً من أكبر منصة حجوزات في اليمن وانمِ أعمالك معنا'
                  : 'Be part of Yemen\'s largest booking platform and grow your business with us'
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">
                    {language === 'ar' ? '1000+ عقار مسجل' : '1000+ Listed Properties'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-5 h-5 text-primary-200" />
                  <span className="text-sm">
                    {language === 'ar' ? '10,000+ حجز شهرياً' : '10,000+ Monthly Bookings'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm">
                    {language === 'ar' ? 'دعم على مدار الساعة' : '24/7 Support'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? benefit.titleAr : benefit.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? benefit.descriptionAr : benefit.descriptionEn}
                </p>
              </div>
            ))}
          </div>

          {/* Form Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? 'سجل عقارك الآن' : 'List Your Property Now'}
                </h2>
                <p className="text-primary-100">
                  {language === 'ar'
                    ? 'املأ النموذج التالي وسنتواصل معك في أقرب وقت'
                    : 'Fill out the form below and we\'ll contact you shortly'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Property Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'اسم العقار' : 'Property Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'مثال: فندق حجزي' : 'Example: Hajzi Hotel'}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.propertyName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  />
                  {errors.propertyName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.propertyName}
                    </p>
                  )}
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'نوع العقار' : 'Property Type'}
                  </label>
                  <select
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.propertyType ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                  >
                    <option value="">
                      {language === 'ar' ? 'اختر نوع العقار' : 'Select property type'}
                    </option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === 'ar' ? type.labelAr : type.labelEn}
                      </option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.propertyType}
                    </p>
                  )}
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'اسم المالك' : 'Owner Name'}
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.ownerName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                  {errors.ownerName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.ownerName}
                    </p>
                  )}
                </div>

                {/* Tax Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الرقم الضريبي (اختياري)' : 'Tax Number (Optional)'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={formData.taxNumber}
                    onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        required
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'رقم الواتساب' : 'WhatsApp Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        required
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.whatsapp ? 'border-red-300' : 'border-gray-300'
                        }`}
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      />
                    </div>
                    {errors.whatsapp && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'عنوان العقار' : 'Property Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      required
                      rows={3}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                  >
                    {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}