import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '../ui/button';
import { Chrome, Facebook } from 'lucide-react';

export function SocialLogin() {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-3"
        onClick={() => {
          // Implement Google login
        }}
      >
        <Chrome className="w-5 h-5" />
        <span>{language === 'ar' ? 'تسجيل الدخول عبر Google' : 'Continue with Google'}</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-3"
        onClick={() => {
          // Implement Facebook login
        }}
      >
        <Facebook className="w-5 h-5" />
        <span>{language === 'ar' ? 'تسجيل الدخول عبر Facebook' : 'Continue with Facebook'}</span>
      </Button>
    </div>
  );
}