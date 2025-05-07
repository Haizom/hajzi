import { useLanguage } from '@/lib/store/useLanguage';
import { Check, X } from 'lucide-react';

type PasswordStrengthProps = {
  password: string;
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { language } = useLanguage();

  const requirements = [
    {
      text: language === 'ar' ? '6 أحرف على الأقل' : 'At least 6 characters',
      met: password.length >= 6,
    },
  ];

  const strength = requirements.filter(req => req.met).length;
  const strengthPercentage = (strength / requirements.length) * 100;

  return (
    <div className="mt-2 space-y-2">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            strengthPercentage === 100 ? 'bg-green-500' : 'bg-gray-300'
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>

      <div className="text-sm space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-red-500" />
            )}
            <span className={req.met ? 'text-green-700' : 'text-gray-600'}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}