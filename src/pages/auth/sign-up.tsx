import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '@/components/ui/button';
import { User, Mail, Lock, MapPin, Phone, Loader2, AlertCircle, Building2, Eye, EyeOff } from 'lucide-react';
import { PasswordStrength } from '@/components/auth/password-strength';
import { SocialLogin } from '@/components/auth/social-login';
import { TermsPrivacy } from '@/components/auth/terms-privacy';

export function SignUpPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    state: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    }
    if (!formData.country) {
      newErrors.country = language === 'ar' ? 'الدولة مطلوبة' : 'Country is required';
    }
    if (!formData.state) {
      newErrors.state = language === 'ar' ? 'المحافظة مطلوبة' : 'Governorate is required';
    }
    if (!formData.phone) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    }
    if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف غير صالح' : 'Invalid phone number';
    }
    if (!formData.email) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    }
    if (formData.password.length < 6) {
      newErrors.password = language === 'ar' 
        ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
        : 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'ar' 
        ? 'كلمة المرور غير متطابقة'
        : 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/verify-account');
      } catch (error) {
        setErrors({
          form: language === 'ar'
            ? 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.'
            : 'An error occurred while creating your account. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary-600 mb-8">
            <Building2 className="h-12 w-12" />
            <span>{language === 'ar' ? 'حجزي' : 'Hajzi'}</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أنشئ حسابك للوصول إلى جميع الميزات'
              : 'Create your account to access all features'
            }
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl shadow-primary-100/10 sm:rounded-xl sm:px-10 border border-gray-100">
            {errors.form && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{errors.form}</p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.fullName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Country and Governorate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'الدولة' : 'Country'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      required
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.country ? 'border-red-300' : 'border-gray-300'
                      }`}
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>
                  {errors.country && (
                    <p className="mt-2 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'المحافظة' : 'Governorate'}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.state ? 'border-red-300' : 'border-gray-300'
                      }`}
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  {errors.state && (
                    <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`block w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
                <PasswordStrength password={formData.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className={`block w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {language === 'ar' ? 'أو' : 'Or'}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <SocialLogin />
              </div>

              <div className="mt-6 text-center">
                <Link 
                  to="/sign-in" 
                  className="text-primary-600 hover:text-primary-500 transition-colors"
                >
                  {language === 'ar' ? 'لديك حساب بالفعل؟ سجل دخول' : 'Already have an account? Sign in'}
                </Link>
              </div>

              <div className="mt-6">
                <TermsPrivacy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}