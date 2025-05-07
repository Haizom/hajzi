import { useLanguage } from '@/lib/store/useLanguage';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Star, Search, Filter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DashboardReviewsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const reviews = [
    {
      id: 1,
      userAr: 'أحمد محمد',
      userEn: 'Ahmed Mohammed',
      dateAr: '15 مارس 2024',
      dateEn: 'March 15, 2024',
      rating: 5,
      commentAr: 'فندق رائع! الخدمة ممتازة والغرف نظيفة جداً',
      commentEn: 'Amazing hotel! Excellent service and very clean rooms',
      roomAr: 'غرفة ديلوكس',
      roomEn: 'Deluxe Room',
      responseAr: 'شكراً لك على تقييمك الإيجابي! نتطلع لاستضافتك مرة أخرى',
      responseEn: 'Thank you for your positive review! We look forward to hosting you again'
    },
    {
      id: 2,
      userAr: 'سارة علي',
      userEn: 'Sarah Ali',
      dateAr: '18 مارس 2024',
      dateEn: 'March 18, 2024',
      rating: 4,
      commentAr: 'تجربة جيدة بشكل عام. الموقع ممتاز والخدمة جيدة',
      commentEn: 'Good experience overall. Great location and good service',
      roomAr: 'جناح جونيور',
      roomEn: 'Junior Suite',
      responseAr: null,
      responseEn: null
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchTerm === '' || 
      (language === 'ar' ? review.userAr : review.userEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'ar' ? review.commentAr : review.commentEn).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === null || review.rating === filterRating;

    return matchesSearch && matchesRating;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-7 h-7 text-primary-600" />
              {language === 'ar' ? 'التقييمات والمراجعات' : 'Reviews & Ratings'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' 
                ? 'عرض وإدارة تقييمات الضيوف'
                : 'View and manage guest reviews'
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
                placeholder={language === 'ar' ? 'البحث في التقييمات...' : 'Search reviews...'}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Rating Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterRating === null ? 'default' : 'outline'}
                onClick={() => setFilterRating(null)}
              >
                {language === 'ar' ? 'الكل' : 'All'}
              </Button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={filterRating === rating ? 'default' : 'outline'}
                  onClick={() => setFilterRating(rating)}
                  className="gap-1"
                >
                  {rating}
                  <Star className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {(language === 'ar' ? review.userAr : review.userEn).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {language === 'ar' ? review.userAr : review.userEn}
                    </h3>
                    <div className="text-sm text-gray-500">
                      {language === 'ar' ? review.dateAr : review.dateEn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{review.rating}</span>
                </div>
              </div>

              {/* Room Info */}
              <div className="text-sm text-gray-500 mb-3">
                {language === 'ar' ? review.roomAr : review.roomEn}
              </div>

              {/* Review Content */}
              <p className="text-gray-700 mb-4">
                {language === 'ar' ? review.commentAr : review.commentEn}
              </p>

              {/* Response Section */}
              {review.responseAr || review.responseEn ? (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium mb-2">
                    {language === 'ar' ? 'ردك:' : 'Your Response:'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'ar' ? review.responseAr : review.responseEn}
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <Button>
                    {language === 'ar' ? 'الرد على التقييم' : 'Respond to Review'}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}