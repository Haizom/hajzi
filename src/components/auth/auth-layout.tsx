import { useLanguage } from '@/lib/store/useLanguage';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}