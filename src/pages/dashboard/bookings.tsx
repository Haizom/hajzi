import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { CalendarCheck, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DashboardBookingsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const bookings = [
    {
      id: 1,
      guestAr: 'أحمد محمد',
      guestEn: 'Ahmed Mohammed',
      dateAr: '15 مارس 2024',
      dateEn: 'March 15, 2024',
      checkInAr: '15 مارس 2024',
      checkInEn: 'March 15, 2024',
      checkOutAr: '17 مارس 2024',
      checkOutEn: 'March 17, 2024',
      statusAr: 'مؤكد',
      statusEn: 'Confirmed',
      amountAr: '500 ريال',
      amountEn: '500 SAR',
      guestsCount: 2,
      roomAr: 'غرفة ديلوكس',
      roomEn: 'Deluxe Room'
    },
    {
      id: 2,
      guestAr: 'سارة علي',
      guestEn: 'Sarah Ali',
      dateAr: '18 مارس 2024',
      dateEn: 'March 18, 2024',
      checkInAr: '18 مارس 2024',
      checkInEn: 'March 18, 2024',
      checkOutAr: '20 مارس 2024',
      checkOutEn: 'March 20, 2024',
      statusAr: 'قيد الانتظار',
      statusEn: 'Pending',
      amountAr: '750 ريال',
      amountEn: '750 SAR',
      guestsCount: 3,
      roomAr: 'جناح جونيور',
      roomEn: 'Junior Suite'
    },
    {
      id: 3,
      guestAr: 'محمد العمري',
      guestEn: 'Mohammed Al-Amri',
      dateAr: '20 مارس 2024',
      dateEn: 'March 20, 2024',
      checkInAr: '20 مارس 2024',
      checkInEn: 'March 20, 2024',
      checkOutAr: '22 مارس 2024',
      checkOutEn: 'March 22, 2024',
      statusAr: 'ملغي',
      statusEn: 'Cancelled',
      amountAr: '600 ريال',
      amountEn: '600 SAR',
      guestsCount: 2,
      roomAr: 'غرفة ديلوكس',
      roomEn: 'Deluxe Room'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      (language === 'ar' ? booking.guestAr : booking.guestEn).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (language === 'ar' ? booking.statusAr : booking.statusEn).toLowerCase() === 
      (filterStatus === 'pending' 
        ? (language === 'ar' ? 'قيد الانتظار' : 'pending').toLowerCase()
        : filterStatus === 'confirmed'
        ? (language === 'ar' ? 'مؤكد' : 'confirmed').toLowerCase()
        : (language === 'ar' ? 'ملغي' : 'cancelled').toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <CalendarCheck className="w-7 h-7 text-primary-600" />
              {language === 'ar' ? 'إدارة الحجوزات' : 'Manage Bookings'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' 
                ? 'عرض وإدارة جميع الحجوزات'
                : 'View and manage all bookings'
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'ar' ? 'البحث عن حجز...' : 'Search bookings...'}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {[
                { value: 'all', labelAr: 'الكل', labelEn: 'All' },
                { value: 'pending', labelAr: 'قيد الانتظار', labelEn: 'Pending' },
                { value: 'confirmed', labelAr: 'مؤكد', labelEn: 'Confirmed' },
                { value: 'cancelled', labelAr: 'ملغي', labelEn: 'Cancelled' }
              ].map((status) => (
                <Button
                  key={status.value}
                  variant={filterStatus === status.value ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(status.value as typeof filterStatus)}
                >
                  {language === 'ar' ? status.labelAr : status.labelEn}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الضيف' : 'Guest'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الغرفة' : 'Room'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Check-in'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'تسجيل الخروج' : 'Check-out'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'عدد الضيوف' : 'Guests'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {language === 'ar' ? booking.guestAr : booking.guestEn}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {language === 'ar' ? booking.roomAr : booking.roomEn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {language === 'ar' ? booking.checkInAr : booking.checkInEn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {language === 'ar' ? booking.checkOutAr : booking.checkOutEn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {booking.guestsCount}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {language === 'ar' ? booking.amountAr : booking.amountEn}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (language === 'ar' ? booking.statusAr : booking.statusEn).toLowerCase() === 
                        (language === 'ar' ? 'مؤكد' : 'confirmed').toLowerCase()
                          ? 'bg-green-100 text-green-800'
                          : (language === 'ar' ? booking.statusAr : booking.statusEn).toLowerCase() === 
                            (language === 'ar' ? 'قيد الانتظار' : 'pending').toLowerCase()
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {language === 'ar' ? booking.statusAr : booking.statusEn}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm">
                          {language === 'ar' ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {language === 'ar' ? 'تعديل' : 'Edit'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}