import { Building2 } from 'lucide-react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Link } from 'react-router-dom';

export function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const { language } = useLanguage();
  
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 font-bold text-primary-600 ${
        size === 'large' ? 'text-4xl' : 'text-2xl'
      }`}
    >
      <Building2 className={size === 'large' ? 'h-12 w-12' : 'h-8 w-8'} />
      <span>{language === 'ar' ? 'حجزي' : 'Hajzi'}</span>
    </Link>
  );
}