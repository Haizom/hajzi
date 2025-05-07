import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Star,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardStatsPage() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      titleAr: 'إجمالي الزوار',
      titleEn: 'Total Visitors',
      value: '12.5K',
      changeAr: 'زيادة 25%',
      changeEn: '25% increase',
      trend: 'up'
    },
    {
      icon: Calendar,
      titleAr: 'معدل الإشغال',
      titleEn: 'Occupancy Rate',
      value: '85%',
      changeAr: 'زيادة 10%',
      changeEn: '10% increase',
      trend: 'up'
    },
    {
      icon: DollarSign,
      titleAr: 'متوسط السعر اليومي',
      titleEn: 'Average Daily Rate',
      value: '250',
      changeAr: 'زيادة 15%',
      changeEn: '15% increase',
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
    }
  ];

  const periods = [
    { value: 'day', labelAr: 'اليوم', labelEn: 'Today' },
    { value: 'week', labelAr: 'الأسبوع', labelEn: 'Week' },
    { value: 'month', labelAr: 'الشهر', labelEn: 'Month' },
    { value: 'year', labelAr: 'السنة', labelEn: 'Year' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-primary-600" />
              {language === 'ar' ? 'الإحصائيات والتقارير' : 'Statistics & Reports'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' 
                ? 'تحليل أداء عقارك وتتبع المؤشرات الرئيسية'
                : 'Analyze your property performance and track key metrics'
              }
            </p>
          </div>

          {/* Period Filter */}
          <div className="flex gap-2">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={period.value === 'month' ? 'default' : 'outline'}
              >
                {language === 'ar' ? period.labelAr : period.labelEn}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              {language === 'ar' ? 'الإيرادات' : 'Revenue'}
            </h3>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                {language === 'ar' ? 'الرسم البياني للإيرادات' : 'Revenue Chart'}
              </p>
            </div>
          </div>

          {/* Occupancy Chart */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              {language === 'ar' ? 'معدل الإشغال' : 'Occupancy Rate'}
            </h3>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                {language === 'ar' ? 'الرسم البياني لمعدل الإشغال' : 'Occupancy Chart'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}