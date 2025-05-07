import { useLanguage } from '@/lib/store/useLanguage';

export function ChaletsHero() {
  const { language } = useLanguage();

  return (
    <div className="relative h-[40vh] min-h-[300px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center text-white z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {language === 'ar' ? 'شاليهات واستراحات مميزة' : 'Premium Chalets & Resorts'}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {language === 'ar'
              ? 'اكتشف أجمل الشاليهات والاستراحات في أفضل المواقع'
              : 'Discover beautiful chalets and resorts in prime locations'
            }
          </p>
        </div>
      </div>
    </div>
  );
}