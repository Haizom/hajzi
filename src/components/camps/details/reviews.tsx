import { useState } from 'react';
import { useLanguage } from '@/lib/store/useLanguage';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Send, 
  X, 
  CheckCircle2,
  Calendar,
  Award,
  Smile,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const REVIEWS = [
  {
    id: 1,
    userAr: 'محمد العمري',
    userEn: 'Mohammed Al-Amri',
    rating: 5,
    dateAr: 'قبل 3 أيام',
    dateEn: '3 days ago',
    commentAr: 'طيرمانة رائعة! المكان نظيف جداً والخدمة ممتازة. الإطلالة جميلة والجلسة مريحة.',
    commentEn: 'Amazing Termanah! Very clean place and excellent service. Beautiful view and comfortable seating.',
    helpful: 15,
    notHelpful: 1,
  },
  {
    id: 2,
    userAr: 'سارة الهاشمي',
    userEn: 'Sarah Al-Hashimi',
    rating: 4.5,
    dateAr: 'قبل أسبوع',
    dateEn: '1 week ago',
    commentAr: 'مكان جميل وخدمة ممتازة. الضيافة كانت رائعة والموظفين متعاونين.',
    commentEn: 'Beautiful place and excellent service. The hospitality was great and the staff were cooperative.',
    helpful: 12,
    notHelpful: 2,
  },
  {
    id: 3,
    userAr: 'أحمد السقاف',
    userEn: 'Ahmed Al-Saqqaf',
    rating: 4.8,
    dateAr: 'قبل شهر',
    dateEn: '1 month ago',
    commentAr: 'جلسة لا تنسى! المكان نظيف ومرتب والموظفين متعاونين جداً. سأعود مرة أخرى.',
    commentEn: 'Unforgettable session! Clean and tidy place, very cooperative staff. Will come back again.',
    helpful: 18,
    notHelpful: 0,
  },
];

type ReviewsProps = {
  termanah: any;
};

export function TermanahReviews({ termanah }: ReviewsProps) {
  const { language } = useLanguage();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 0, comment: '' });
  };

  const getRatingLabel = (rating: number) => {
    if (language === 'ar') {
      if (rating >= 4.5) return 'ممتاز';
      if (rating >= 4) return 'جيد جداً';
      if (rating >= 3) return 'جيد';
      if (rating >= 2) return 'مقبول';
      return 'ضعيف';
    } else {
      if (rating >= 4.5) return 'Excellent';
      if (rating >= 4) return 'Very Good';
      if (rating >= 3) return 'Good';
      if (rating >= 2) return 'Fair';
      return 'Poor';
    }
  };

  return (
    <div className="space-y-4">
      {/* Reviews Summary Card */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Overall Score */}
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                <div>
                  <div className="text-3xl font-bold text-primary-600">{termanah.rating}</div>
                  <div className="text-sm font-medium text-primary-800">
                    {getRatingLabel(termanah.rating)}
                  </div>
                </div>
              </div>
              <Award className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(termanah.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-primary-700 mt-1">
                {REVIEWS.length} {language === 'ar' ? 'تقييم' : 'reviews'}
              </div>
            </div>
          </div>

          {/* Rating Categories */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {[
              { 
                icon: Smile, 
                label: { ar: 'رضا الزوار', en: 'Visitor Satisfaction' }, 
                value: 95 
              },
              { 
                icon: CheckCircle2, 
                label: { ar: 'النظافة', en: 'Cleanliness' }, 
                value: 98 
              },
              { 
                icon: Heart, 
                label: { ar: 'الخدمة', en: 'Service' }, 
                value: 92 
              },
              { 
                icon: Star, 
                label: { ar: 'القيمة', en: 'Value' }, 
                value: 88 
              }
            ].map((category) => (
              <div key={category.label.en} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                    <category.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-600 line-clamp-1">
                      {language === 'ar' ? category.label.ar : category.label.en}
                    </div>
                    <div className="text-sm font-bold text-primary-600">
                      {category.value}%
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${category.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review Button */}
        <div className="mt-4 text-center">
          <Button 
            onClick={() => setShowReviewForm(true)}
            className="bg-white text-primary-600 hover:bg-primary-50 gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {language === 'ar' ? 'شارك تجربتك' : 'Share Your Experience'}
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {REVIEWS.map((review) => (
          <div 
            key={review.id} 
            className="bg-white rounded-lg p-4 border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-sm"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-base font-semibold text-primary-600">
                    {(language === 'ar' ? review.userAr : review.userEn).charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">
                    {language === 'ar' ? review.userAr : review.userEn}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{language === 'ar' ? review.dateAr : review.dateEn}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-sm">{review.rating}</span>
                </div>
                <div className="text-xs text-primary-600 mt-1">
                  {getRatingLabel(review.rating)}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mt-3 text-sm text-gray-700 leading-relaxed">
              {language === 'ar' ? review.commentAr : review.commentEn}
            </div>

            {/* Review Actions */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t">
              <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs font-medium">{review.helpful}</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-colors">
                <ThumbsDown className="w-4 h-4" />
                <span className="text-xs font-medium">{review.notHelpful}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary-900">
                {language === 'ar' ? 'شارك تجربتك' : 'Share Your Experience'}
              </h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitReview} className="p-4 space-y-4">
              {/* Rating Selection */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'ما هو تقييمك؟' : 'How would you rate your experience?'}
                </label>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="p-1 transition-transform hover:scale-110"
                      onMouseEnter={() => setHoveredRating(i + 1)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          i < (hoveredRating || newReview.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {(hoveredRating || newReview.rating) > 0 && (
                  <div className="mt-1 text-sm font-medium text-primary-600">
                    {getRatingLabel(hoveredRating || newReview.rating)}
                  </div>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'اكتب تجربتك' : 'Write Your Review'}
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-700"
                  placeholder={language === 'ar' 
                    ? 'شارك تجربتك مع الطيرمانة...'
                    : 'Share your experience with the Termanah...'
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Send className="w-4 h-4" />
                  {language === 'ar' ? 'نشر التقييم' : 'Post Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}