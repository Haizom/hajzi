import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useLanguage } from '@/lib/store/useLanguage';
import { useAuth } from '@/lib/store/useAuth';
import { Globe, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Logo } from '../ui/logo';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/hotels" className="text-gray-600 hover:text-primary-600 transition-colors">
              {t('nav.hotels')}
            </Link>
            <Link to="/chalets-resorts" className="text-gray-600 hover:text-primary-600 transition-colors">
              {t('nav.chaletsResorts')}
            </Link>
            <Link to="/wedding-halls" className="text-gray-600 hover:text-primary-600 transition-colors">
              {t('nav.weddingHalls')}
            </Link>
            <Link to="/apartments" className="text-gray-600 hover:text-primary-600 transition-colors">
              {t('nav.apartments')}
            </Link>
            <Link to="/camps" className="text-gray-600 hover:text-primary-600 transition-colors">
              {t('nav.camps')}
            </Link>
            <Link to="/offers" className="text-gray-600 hover:text-primary-600 transition-colors">
              {language === 'ar' ? 'العروض' : 'Offers'}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="hidden sm:flex"
          >
            <Globe className="h-5 w-5" />
          </Button>
          
          {/* List Property Button - Always visible */}
          <Button 
            variant="outline" 
            className="hidden lg:flex"
            onClick={() => navigate('/list-property')}
          >
            {t('nav.listProperty')}
          </Button>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <Button 
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <span className="hidden sm:inline">{user.fullName}</span>
                {user.role === 'owner' && (
                  <span className="hidden sm:inline text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                    {language === 'ar' ? 'مالك عقار' : 'Property Owner'}
                  </span>
                )}
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </div>
                  </Link>
                  {user.role === 'owner' && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                      </div>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-start px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button 
              variant="secondary" 
              className="hidden sm:flex"
              onClick={() => navigate('/sign-in')}
            >
              {t('nav.signIn')}
            </Button>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <Link 
              to="/hotels" 
              className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.hotels')}
            </Link>
            <Link 
              to="/chalets-resorts" 
              className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.chaletsResorts')}
            </Link>
            <Link 
              to="/wedding-halls" 
              className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.weddingHalls')}
            </Link>
            <Link 
              to="/apartments" 
              className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.apartments')}
            </Link>
            <Link 
              to="/camps" 
              className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.camps')}
            </Link>
            <Link 
              to="/offers" 
              className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'ar' ? 'العروض' : 'Offers'}
            </Link>
            <div className="pt-4 border-t flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="w-full text-start px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                  </Link>
                  {user.role === 'owner' && (
                    <Link
                      to="/dashboard"
                      className="w-full text-start px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-start px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                  </button>
                </>
              ) : (
                <Button 
                  variant="secondary" 
                  className="w-full sm:hidden"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/sign-in');
                  }}
                >
                  {t('nav.signIn')}
                </Button>
              )}
              {/* List Property Button - Always visible in mobile menu */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/list-property');
                }}
              >
                {t('nav.listProperty')}
              </Button>
              <Button
                variant="ghost"
                className="w-full sm:hidden flex items-center justify-center gap-2"
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
              >
                <Globe className="h-5 w-5" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}