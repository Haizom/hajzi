import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { TermanahHeader } from '@/components/camps/details/header';
import { TermanahOverview } from '@/components/camps/details/overview';
import { TermanahSections } from '@/components/camps/details/sections';
import { TermanahPolicies } from '@/components/camps/details/policies';
import { TermanahReviews } from '@/components/camps/details/reviews';
import { TERMANAT_DATA } from '@/data/termanat';

export function TermanahDetailsPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'sections' | 'reviews' | 'policies'>('overview');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const termanah = TERMANAT_DATA.find((t) => t.id === Number(id));
  if (!termanah) return <div>Termanah not found</div>;

  const images = [
    termanah.image,
    'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
  ];

  const handleBookNowClick = () => {
    setSelectedTab('sections');
    // Set the first section as selected
    setSelectedSection('qat');
    // Scroll to sections section smoothly
    const sectionsSection = document.getElementById('sections-section');
    if (sectionsSection) {
      sectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <TermanahOverview termanah={termanah} onBookNowClick={handleBookNowClick} />;
      case 'sections':
        return (
          <div id="sections-section">
            <TermanahSections
              termanah={termanah}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        );
      case 'reviews':
        return <TermanahReviews termanah={termanah} />;
      case 'policies':
        return <TermanahPolicies />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <TermanahHeader
          termanah={termanah}
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        
        {/* Tab Content */}
        <div className="container mx-auto px-4 py-8">
          {renderTabContent()}
        </div>
      </main>
      <Footer />
    </>
  );
}