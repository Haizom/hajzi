import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Settings, User, Building2, Bell, Globe, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DashboardSettingsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'property' | 'notifications' | 'security' | 'billing'>('profile');

  const tabs = [
    { id: 'profile', icon: User, labelAr: 'الملف الشخصي', labelEn: 'Profile' },
    { id: 'property', icon: Building2, labelAr: 'معلومات العقار', labelEn: 'Property' },
    { id: 'notifications', icon: Bell, labelAr: 'الإشعارات', labelEn: 'Notifications' },
    { id: 'security', icon: Lock, labelAr: 'الأمان', labelEn: 'Security' },
    { id: 'billing', icon: CreditCard, labelAr: 'الفوترة', labelEn: 'Billing' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-7 h-7 text-primary-600" />
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' 
              ? 'إدارة إعدادات حسابك وعقارك'
              : 'Manage your account and property settings'
            }
          </p>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-xl border">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
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

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      defaultValue="Crown Plaza Hotel"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      defaultValue="crown.plaza@example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      defaultValue="+967 1 234 5678"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'اللغة المفضلة' : 'Preferred Language'}
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="ar">{language === 'ar' ? 'العربية' : 'Arabic'}</option>
                      <option value="en">{language === 'ar' ? 'الإنجليزية' : 'English'}</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'property' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'معلومات العقار' : 'Property Information'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'اسم العقار' : 'Property Name'}
                    </label>
                    <input
                      type="text"
                      defaultValue="Crown Plaza Hotel"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'نوع العقار' : 'Property Type'}
                    </label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="hotel">{language === 'ar' ? 'فندق' : 'Hotel'}</option>
                      <option value="apartment">{language === 'ar' ? 'شقة' : 'Apartment'}</option>
                      <option value="chalet">{language === 'ar' ? 'شاليه' : 'Chalet'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'العنوان' : 'Address'}
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Main Street, Sanaa, Yemen"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
                    </label>
                    <input
                      type="url"
                      defaultValue="https://crownplaza.com"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الوصف' : 'Description'}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    defaultValue="A luxury hotel in the heart of Sanaa..."
                  />
                </div>
                <div className="flex justify-end">
                  <Button>
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 'bookings', labelAr: 'إشعارات الحجوزات الجديدة', labelEn: 'New Booking Notifications' },
                    { id: 'reviews', labelAr: 'إشعارات التقييمات الجديدة', labelEn: 'New Review Notifications' },
                    { id: 'messages', labelAr: 'إشعارات الرسائل', labelEn: 'Message Notifications' },
                    { id: 'updates', labelAr: 'تحديثات النظام', labelEn: 'System Updates' }
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">
                        {language === 'ar' ? notification.labelAr : notification.labelEn}
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button>
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
                </h2>
                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-4">
                      {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
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
                    </div>
                    <div className="mt-4">
                      <Button>
                        {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                      </Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {language === 'ar'
                            ? 'أضف طبقة إضافية من الأمان لحسابك'
                            : 'Add an extra layer of security to your account'
                          }
                        </p>
                      </div>
                      <Button variant="outline">
                        {language === 'ar' ? 'تفعيل' : 'Enable'}
                      </Button>
                    </div>
                  </div>

                  {/* Login History */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-4">
                      {language === 'ar' ? 'سجل تسجيل الدخول' : 'Login History'}
                    </h3>
                    <div className="space-y-2">
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
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  {language === 'ar' ? 'إعدادات الفوترة' : 'Billing Settings'}
                </h2>
                
                {/* Current Plan */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-4">
                    {language === 'ar' ? 'الباقة الحالية' : 'Current Plan'}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {language === 'ar' ? 'الباقة المميزة' : 'Premium Plan'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === 'ar' ? '50 دولار شهرياً' : '$50/month'}
                      </div>
                    </div>
                    <Button variant="outline">
                      {language === 'ar' ? 'ترقية الباقة' : 'Upgrade Plan'}
                    </Button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-4">
                    {language === 'ar' ? 'طرق الدفع' : 'Payment Methods'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-white rounded border flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {language === 'ar' ? 'فيزا تنتهي في 1234' : 'Visa ending in 1234'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {language === 'ar' ? 'تنتهي في 12/24' : 'Expires 12/24'}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {language === 'ar' ? 'تعديل' : 'Edit'}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>
                      {language === 'ar' ? 'إضافة طريقة دفع' : 'Add Payment Method'}
                    </Button>
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-4">
                    {language === 'ar' ? 'سجل الفواتير' : 'Billing History'}
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        dateAr: '1 مارس 2024',
                        dateEn: 'March 1, 2024',
                        amountAr: '50 دولار',
                        amountEn: '$50',
                        statusAr: 'مدفوع',
                        statusEn: 'Paid'
                      },
                      {
                        dateAr: '1 فبراير 2024',
                        dateEn: 'February 1, 2024',
                        amountAr: '50 دولار',
                        amountEn: '$50',
                        statusAr: 'مدفوع',
                        statusEn: 'Paid'
                      }
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <div className="font-medium">
                            {language === 'ar' ? invoice.dateAr : invoice.dateEn}
                          </div>
                          <div className="text-sm text-gray-500">
                            {language === 'ar' ? invoice.amountAr : invoice.amountEn}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600">
                            {language === 'ar' ? invoice.statusAr : invoice.statusEn}
                          </span>
                          <Button variant="outline" size="sm">
                            {language === 'ar' ? 'تحميل' : 'Download'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}