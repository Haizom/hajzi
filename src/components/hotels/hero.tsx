import { useLanguage } from '@/lib/store/useLanguage';

export function HotelsHero() {
  const { language } = useLanguage();

  return (
    <div className="relative h-[40vh] min-h-[300px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center text-white z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {language === 'ar' ? 'اكتشف أفضل الفنادق' : 'Discover the Best Hotels'}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {language === 'ar'
              ? 'احجز إقامتك في أفضل الفنادق بأفضل الأسعار'
              : 'Book your stay at the best hotels with the best prices'
            }
          </p>
        </div>
      </div>
    </div>
  );
}