import { useLanguage } from '@/lib/store/useLanguage';
import { Logo } from '../ui/logo';

type AuthHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  const { language } = useLanguage();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <Logo size="large" />
      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}