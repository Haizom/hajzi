import { useLanguage } from '@/lib/store/useLanguage';
import { useAuth } from '@/lib/store/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Star, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Edit3
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { language } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      labelAr: 'لوحة التحكم',
      labelEn: 'Dashboard',
    },
    {
      path: '/dashboard/bookings',
      icon: CalendarCheck,
      labelAr: 'الحجوزات',
      labelEn: 'Bookings',
    },
    {
      path: '/dashboard/reviews',
      icon: Star,
      labelAr: 'التقييمات',
      labelEn: 'Reviews',
    },
    {
      path: '/dashboard/stats',
      icon: BarChart3,
      labelAr: 'الإحصائيات',
      labelEn: 'Statistics',
    },
    {
      path: '/dashboard/content',
      icon: Edit3,
      labelAr: 'إدارة المحتوى',
      labelEn: 'Content',
    },
    {
      path: '/dashboard/settings',
      icon: Settings,
      labelAr: 'الإعدادات',
      labelEn: 'Settings',
    },
  ];

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b h-16 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
              <Building2 className="h-8 w-8" />
              <span>{language === 'ar' ? 'حجزي' : 'Hajzi'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <div className="font-medium">{user?.fullName}</div>
              <div className="text-gray-500 text-xs">
                {language === 'ar' ? 'مالك عقار' : 'Property Owner'}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSignOut}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed top-16 bottom-0 lg:left-0 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out z-20 ${
          isSidebarOpen ? 'left-0' : '-left-64'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}