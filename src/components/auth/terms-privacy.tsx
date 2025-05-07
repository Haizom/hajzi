import { useLanguage } from '@/lib/store/useLanguage';
import { Link } from 'react-router-dom';

export function TermsPrivacy() {
  const { language } = useLanguage();

  return (
    <p className="text-sm text-gray-500 text-center">
      {language === 'ar' ? (
        <>
          بالتسجيل، أنت توافق على{' '}
          <Link to="/terms" className="text-primary-600 hover:text-primary-500">
            شروط الاستخدام
          </Link>
          {' '}و{' '}
          <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
            سياسة الخصوصية
          </Link>
        </>
      ) : (
        <>
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-primary-600 hover:text-primary-500">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
            Privacy Policy
          </Link>
        </>
      )}
    </p>
  );
}