import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChaletOverview } from '@/components/chalets/details/overview';
import { ChaletSections } from '@/components/chalets/details/sections';
import { ChaletPolicies } from '@/components/chalets/details/policies';
import { ChaletReviews } from '@/components/chalets/details/reviews';
import { Star, MapPin } from 'lucide-react';
import { CHALETS_DATA } from '@/data/chalets';
import { CHALET_REVIEWS } from '@/data/chalet-reviews';
import { SECTIONS } from '@/data/sections';

export function ChaletDetailsPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'sections' | 'reviews' | 'policies'>('overview');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const chalet = CHALETS_DATA.find((c) => c.id === Number(id));
  if (!chalet) return <div>Chalet not found</div>;

  const images = [chalet.image, ...SECTIONS.map((section) => section.image)];

  const handleBookNowClick = () => {
    setSelectedTab('sections');
    // Set the first section as selected
    if (SECTIONS.length > 0) {
      setSelectedSection(SECTIONS[0].id);
    }
    // Scroll to sections section smoothly
    const sectionsSection = document.getElementById('sections-section');
    if (sectionsSection) {
      sectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setSelectedImage(selectedImage === null ? 1 : selectedImage < images.length - 1 ? selectedImage + 1 : 0);
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      setSelectedImage(selectedImage === null ? images.length - 1 : selectedImage > 0 ? selectedImage - 1 : images.length - 1);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <ChaletOverview chalet={chalet} onBookNowClick={handleBookNowClick} />;
      case 'sections':
        return (
          <div id="sections-section">
            <ChaletSections
              sections={SECTIONS}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        );
      case 'reviews':
        return <ChaletReviews reviews={CHALET_REVIEWS} rating={chalet.rating} />;
      case 'policies':
        return <ChaletPolicies />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Image Gallery */}
        <div className="container mx-auto px-4 py-8">
          {/* Main Image */}
          <div className="relative">
            <div 
              className="aspect-[16/9] overflow-hidden rounded-lg"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[selectedImage ?? 0]}
                alt="Chalet"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedImage === index
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4">
          {/* Title and Rating */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {language === 'ar' ? chalet.titleAr : chalet.titleEn}
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-primary-600 fill-current" />
                  <span className="font-medium">{chalet.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{language === 'ar' ? chalet.locationAr : chalet.locationEn}</span>
                </div>
              </div>
              <div className="text-gray-600">
                {language === 'ar' ? chalet.addressAr : chalet.addressEn}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex overflow-x-auto whitespace-nowrap gap-2">
              {[
                { id: 'overview', labelAr: 'نظرة عامة', labelEn: 'Overview' },
                { id: 'sections', labelAr: 'الأقسام', labelEn: 'Sections' },
                { id: 'reviews', labelAr: 'التقييمات', labelEn: 'Reviews' },
                { id: 'policies', labelAr: 'السياسات', labelEn: 'Policies' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {language === 'ar' ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">{renderTabContent()}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}