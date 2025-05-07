import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { 
  Building2, 
  CalendarCheck, 
  Star, 
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function DashboardPage() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Building2,
      titleAr: 'العقارات النشطة',
      titleEn: 'Active Properties',
      value: '1',
      changeAr: 'لا تغيير',
      changeEn: 'No change',
      trend: 'neutral'
    },
    {
      icon: CalendarCheck,
      titleAr: 'الحجوزات الجديدة',
      titleEn: 'New Bookings',
      value: '12',
      changeAr: 'زيادة 25%',
      changeEn: '25% increase',
      trend: 'up'
    },
    {
      icon: Star,
      titleAr: 'متوسط التقييم',
      titleEn: 'Average Rating',
      value: '4.8',
      changeAr: 'زيادة 0.2',
      changeEn: '0.2 increase',
      trend: 'up'
    },
    {
      icon: Users,
      titleAr: 'الزوار',
      titleEn: 'Visitors',
      value: '1.2K',
      changeAr: 'انخفاض 5%',
      changeEn: '5% decrease',
      trend: 'down'
    },
    {
      icon: DollarSign,
      titleAr: 'الإيرادات',
      titleEn: 'Revenue',
      value: '15.2K',
      changeAr: 'زيادة 12%',
      changeEn: '12% increase',
      trend: 'up'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      guestAr: 'أحمد محمد',
      guestEn: 'Ahmed Mohammed',
      dateAr: '15 مارس 2024',
      dateEn: 'March 15, 2024',
      statusAr: 'مؤكد',
      statusEn: 'Confirmed',
      amountAr: '500 ريال',
      amountEn: '500 SAR'
    },
    {
      id: 2,
      guestAr: 'سارة علي',
      guestEn: 'Sarah Ali',
      dateAr: '18 مارس 2024',
      dateEn: 'March 18, 2024',
      statusAr: 'قيد الانتظار',
      statusEn: 'Pending',
      amountAr: '750 ريال',
      amountEn: '750 SAR'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-white rounded-xl p-6 border">
          <h1 className="text-2xl font-bold mb-2">
            {language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Dashboard'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'هنا يمكنك إدارة عقاراتك وحجوزاتك وتتبع أداء أعمالك'
              : 'Here you can manage your properties, bookings, and track your business performance'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === 'ar' ? stat.titleAr : stat.titleEn}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{stat.value}</span>
                    <span className={`flex items-center text-sm ${
                      stat.trend === 'up' 
                        ? 'text-green-600' 
                        : stat.trend === 'down' 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                    }`}>
                      {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                      {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                      {language === 'ar' ? stat.changeAr : stat.changeEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              {language === 'ar' ? 'الحجوزات الأخيرة' : 'Recent Bookings'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الضيف' : 'Guest'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-start text-sm font-medium text-gray-500">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {language === 'ar' ? booking.guestAr : booking.guestEn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {language === 'ar' ? booking.dateAr : booking.dateEn}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (language === 'ar' ? booking.statusAr : booking.statusEn) === 'مؤكد' || 
                        (language === 'ar' ? booking.statusAr : booking.statusEn) === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {language === 'ar' ? booking.statusAr : booking.statusEn}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {language === 'ar' ? booking.amountAr : booking.amountEn}
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