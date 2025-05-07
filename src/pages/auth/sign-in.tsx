import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { useAuth } from '@/lib/store/useAuth';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2, AlertCircle, Building2, Eye, EyeOff } from 'lucide-react';
import { SocialLogin } from '@/components/auth/social-login';
import { TermsPrivacy } from '@/components/auth/terms-privacy';

export function SignInPage() {
  const { language } = useLanguage();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      
      try {
        await signIn(formData.email, formData.password);
        navigate('/');
      } catch (error) {
        setErrors({
          form: language === 'ar'
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            : 'Invalid email or password'
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
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </h2>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة'
              : 'Welcome back! Please sign in to continue'
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
                    autoComplete="current-password"
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {language === 'ar' ? 'تذكرني' : 'Remember me'}
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                    {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
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
                  to="/sign-up" 
                  className="text-primary-600 hover:text-primary-500 transition-colors"
                >
                  {language === 'ar' ? 'ليس لديك حساب؟ سجل الآن' : 'Don\'t have an account? Sign up'}
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