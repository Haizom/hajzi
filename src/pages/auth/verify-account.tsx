import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function VerifyAccountPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code.length === 6) {
      setIsLoading(true);
      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        setIsVerified(true);
        // Redirect after showing success message
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }, 1500);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(60);
    // Here you would call your API to resend the verification code
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'تم التحقق بنجاح!' : 'Successfully Verified!'}
            </h2>
            <p className="mt-2 text-gray-600">
              {language === 'ar' 
                ? 'سيتم تحويلك إلى الصفحة الرئيسية...'
                : 'Redirecting to homepage...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'التحقق من الحساب' : 'Verify Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {language === 'ar' 
            ? 'لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني'
            : 'We have sent a verification code to your email'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {language === 'ar' ? 'تحقق' : 'Verify'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={timeLeft > 0 || isLoading}
              className="text-primary-600 hover:text-primary-500"
            >
              {timeLeft > 0
                ? language === 'ar'
                  ? `إعادة إرسال الرمز (${timeLeft})`
                  : `Resend code (${timeLeft})`
                : language === 'ar'
                ? 'إعادة إرسال الرمز'
                : 'Resend code'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}