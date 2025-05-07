import { useLanguage } from '@/lib/store/useLanguage';
import { useAuth } from '@/lib/store/useAuth';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Building2,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Edit3,
  Save,
  Lock,
  Bell,
  Globe,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export function ProfilePage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'personal' | 'security' | 'notifications'>('personal');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data that matches registration form
  const [userData, setUserData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '+967 123 456 789',
    country: 'اليمن',
    state: 'صنعاء',
    language: language,
    notifications: {
      email: true,
      sms: false,
      bookings: true,
      offers: true,
      newsletter: false
    }
  });

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      propertyAr: 'فندق كراون بلازا',
      propertyEn: 'Crowne Plaza Hotel',
      typeAr: 'غرفة ديلوكس',
      typeEn: 'Deluxe Room',
      checkInAr: '15 مارس 2024',
      checkInEn: 'March 15, 2024',
      checkOutAr: '17 مارس 2024',
      checkOutEn: 'March 17, 2024',
      statusAr: 'مؤكد',
      statusEn: 'Confirmed',
      priceAr: '500 ريال',
      priceEn: '500 SAR',
      rating: 4.5,
      type: 'upcoming'
    },
    {
      id: 2,
      propertyAr: 'شاليه البحيرة',
      propertyEn: 'Lake View Chalet',
      typeAr: 'شاليه كامل',
      typeEn: 'Entire Chalet',
      checkInAr: '20 مارس 2024',
      checkInEn: 'March 20, 2024',
      checkOutAr: '22 مارس 2024',
      checkOutEn: 'March 22, 2024',
      statusAr: 'قيد الانتظار',
      statusEn: 'Pending',
      priceAr: '800 ريال',
      priceEn: '800 SAR',
      rating: null,
      type: 'upcoming'
    },
    {
      id: 3,
      propertyAr: 'قاعة الملكية',
      propertyEn: 'Royal Hall',
      typeAr: 'قاعة أفراح',
      typeEn: 'Wedding Hall',
      checkInAr: '10 فبراير 2024',
      checkInEn: 'February 10, 2024',
      checkOutAr: '10 فبراير 2024',
      checkOutEn: 'February 10, 2024',
      statusAr: 'مكتمل',
      statusEn: 'Completed',
      priceAr: '2000 ريال',
      priceEn: '2000 SAR',
      rating: 5,
      type: 'past'
    },
    {
      id: 4,
      propertyAr: 'شقة فاخرة',
      propertyEn: 'Luxury Apartment',
      typeAr: 'شقة كاملة',
      typeEn: 'Entire Apartment',
      checkInAr: '5 فبراير 2024',
      checkInEn: 'February 5, 2024',
      checkOutAr: '7 فبراير 2024',
      checkOutEn: 'February 7, 2024',
      statusAr: 'ملغي',
      statusEn: 'Cancelled',
      priceAr: '300 ريال',
      priceEn: '300 SAR',
      rating: null,
      type: 'cancelled'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = bookingFilter === 'all' || booking.type === bookingFilter;
    const matchesSearch = searchTerm === '' || 
      (language === 'ar' ? booking.propertyAr : booking.propertyEn)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSaveChanges = () => {
    // Here you would typically save the changes to the backend
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    // Handle password change logic
    console.log('Change password');
  };

  const handleNotificationChange = (key: keyof typeof userData.notifications) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'personal', icon: User, labelAr: 'المعلومات الشخصية', labelEn: 'Personal Information' },
                    { id: 'bookings', icon: Calendar, labelAr: 'الحجوزات', labelEn: 'Bookings' },
                    { id: 'security', icon: Lock, labelAr: 'الأمان', labelEn: 'Security' },
                    { id: 'notifications', icon: Bell, labelAr: 'الإشعارات', labelEn: 'Notifications' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary-600 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {language === 'ar' ? tab.labelAr : tab.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    {/* Personal Information Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          value={userData.fullName}
                          onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الدولة' : 'Country'}
                        </label>
                        <input
                          type="text"
                          value={userData.country}
                          onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'المحافظة / المنطقة' : 'State / Region'}
                        </label>
                        <input
                          type="text"
                          value={userData.state}
                          onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'اللغة المفضلة' : 'Preferred Language'}
                        </label>
                        <select
                          value={userData.language}
                          onChange={(e) => setUserData({ ...userData, language: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        >
                          <option value="ar">{language === 'ar' ? 'العربية' : 'Arabic'}</option>
                          <option value="en">{language === 'ar' ? 'الإنجليزية' : 'English'}</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            {language === 'ar' ? 'إلغاء' : 'Cancel'}
                          </Button>
                          <Button onClick={handleSaveChanges}>
                            <Save className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          {language === 'ar' ? 'تعديل المعلومات' : 'Edit Information'}
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="space-y-6">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder={language === 'ar' ? 'البحث في الحجوزات...' : 'Search bookings...'}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex gap-2">
                        {[
                          { value: 'all', labelAr: 'الكل', labelEn: 'All' },
                          { value: 'upcoming', labelAr: 'القادمة', labelEn: 'Upcoming' },
                          { value: 'past', labelAr: 'السابقة', labelEn: 'Past' },
                          { value: 'cancelled', labelAr: 'الملغية', labelEn: 'Cancelled' }
                        ].map((filter) => (
                          <Button
                            key={filter.value}
                            variant={bookingFilter === filter.value ? 'default' : 'outline'}
                            onClick={() => setBookingFilter(filter.value as typeof bookingFilter)}
                          >
                            {language === 'ar' ? filter.labelAr : filter.labelEn}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4">
                      {filteredBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="bg-white rounded-lg border p-6 hover:border-primary-200 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-5 h-5 text-primary-600" />
                                <h3 className="font-semibold">
                                  {language === 'ar' ? booking.propertyAr : booking.propertyEn}
                                </h3>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {language === 'ar' ? booking.typeAr : booking.typeEn}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                              <div>
                                <div className="text-sm text-gray-500 mb-1">
                                  <Clock className="w-4 h-4 inline mr-1" />
                                  {language === 'ar' ? 'تسجيل الدخول' : 'Check-in'}
                                </div>
                                <div className="font-medium">
                                  {language === 'ar' ? booking.checkInAr : booking.checkInEn}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500 mb-1">
                                  <Clock className="w-4 h-4 inline mr-1" />
                                  {language === 'ar' ? 'تسجيل الخروج' : 'Check-out'}
                                </div>
                                <div className="font-medium">
                                  {language === 'ar' ? booking.checkOutAr : booking.checkOutEn}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500 mb-1">
                                  <DollarSign className="w-4 h-4 inline mr-1" />
                                  {language === 'ar' ? 'السعر' : 'Price'}
                                </div>
                                <div className="font-medium">
                                  {language === 'ar' ? booking.priceAr : booking.priceEn}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                (language === 'ar' ? booking.statusAr : booking.statusEn) === 
                                (language === 'ar' ? 'مؤكد' : 'Confirmed')
                                  ? 'bg-green-100 text-green-800'
                                  : (language === 'ar' ? booking.statusAr : booking.statusEn) === 
                                    (language === 'ar' ? 'ملغي' : 'Cancelled')
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {(language === 'ar' ? booking.statusAr : booking.statusEn) === 
                                 (language === 'ar' ? 'مؤكد' : 'Confirmed') ? (
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                ) : (language === 'ar' ? booking.statusAr : booking.statusEn) === 
                                   (language === 'ar' ? 'ملغي' : 'Cancelled') ? (
                                  <XCircle className="w-4 h-4 mr-1" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 mr-1" />
                                )}
                                {language === 'ar' ? booking.statusAr : booking.statusEn}
                              </div>
                              {booking.rating && (
                                <div className="flex items-center gap-1 mt-2">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="font-medium">{booking.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    {/* Password Change */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium mb-4">
                        {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 max-w-md">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <Button onClick={handlePasswordChange}>
                            {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Login History */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium mb-4">
                        {language === 'ar' ? 'سجل تسجيل الدخول' : 'Login History'}
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            deviceAr: 'متصفح كروم - ويندوز 10',
                            deviceEn: 'Chrome Browser - Windows 10',
                            locationAr: 'صنعاء، اليمن',
                            locationEn: 'Sanaa, Yemen',
                            dateAr: 'اليوم، 10:30 صباحاً',
                            dateEn: 'Today, 10:30 AM'
                          },
                          {
                            deviceAr: 'تطبيق الجوال - آيفون',
                            deviceEn: 'Mobile App - iPhone',
                            locationAr: 'صنعاء، اليمن',
                            locationEn: 'Sanaa, Yemen',
                            dateAr: 'أمس، 3:45 مساءً',
                            dateEn: 'Yesterday, 3:45 PM'
                          }
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <div>
                              <div className="font-medium">
                                {language === 'ar' ? session.deviceAr : session.deviceEn}
                              </div>
                              <div className="text-sm text-gray-500">
                                {language === 'ar' ? session.locationAr : session.locationEn}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {language === 'ar' ? session.dateAr : session.dateEn}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    {/* Notification Preferences */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium mb-4">
                        {language === 'ar' ? 'تفضيلات الإشعارات' : 'Notification Preferences'}
                      </h3>
                      <div className="space-y-4">
                        {[
                          { 
                            key: 'email', 
                            labelAr: 'إشعارات البريد الإلكتروني', 
                            labelEn: 'Email Notifications',
                            descriptionAr: 'تلقي الإشعارات عبر البريد الإلكتروني',
                            descriptionEn: 'Receive notifications via email'
                          },
                          { 
                            key: 'sms', 
                            labelAr: 'إشعارات الرسائل النصية', 
                            labelEn: 'SMS Notifications',
                            descriptionAr: 'تلقي الإشعارات عبر الرسائل النصية',
                            descriptionEn: 'Receive notifications via SMS'
                          },
                          { 
                            key: 'bookings', 
                            labelAr: 'تحديثات الحجوزات', 
                            labelEn: 'Booking Updates',
                            descriptionAr: 'إشعارات حول حالة الحجوزات والتغييرات',
                            descriptionEn: 'Notifications about booking status and changes'
                          },
                          { 
                            key: 'offers', 
                            labelAr: 'العروض والخصومات', 
                            labelEn: 'Offers & Discounts',
                            descriptionAr: 'إشعارات حول العروض الخاصة والخصومات',
                            descriptionEn: 'Notifications about special offers and discounts'
                          },
                          { 
                            key: 'newsletter', 
                            labelAr: 'النشرة الإخبارية', 
                            labelEn: 'Newsletter',
                            descriptionAr: 'آخر الأخبار والتحديثات',
                            descriptionEn: 'Latest news and updates'
                          }
                        ].map((notification) => (
                          <div key={notification.key} className="flex items-center justify-between py-2">
                            <div>
                              <div className="font-medium">
                                {language === 'ar' ? notification.labelAr : notification.labelEn}
                              </div>
                              <div className="text-sm text-gray-500">
                                {language === 'ar' ? notification.descriptionAr : notification.descriptionEn}
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={userData.notifications[notification.key as keyof typeof userData.notifications]}
                                onChange={() => handleNotificationChange(notification.key as keyof typeof userData.notifications)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}