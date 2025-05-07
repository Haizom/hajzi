import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ApartmentHeader } from '@/components/apartments/details/header';
import { ApartmentOverview } from '@/components/apartments/details/overview';
import { ApartmentSections } from '@/components/apartments/details/sections';
import { ApartmentPolicies } from '@/components/apartments/details/policies';
import { ApartmentReviews } from '@/components/apartments/details/reviews';
import { APARTMENTS_DATA } from '@/data/apartments';

export function ApartmentDetailsPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'sections' | 'reviews' | 'policies'>('overview');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const apartment = APARTMENTS_DATA.find((a) => a.id === Number(id));
  if (!apartment) return <div>Apartment not found</div>;

  const images = [
    apartment.image,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
  ];

  const handleBookNowClick = () => {
    setSelectedTab('sections');
    // Scroll to sections section smoothly
    const sectionsSection = document.getElementById('sections-section');
    if (sectionsSection) {
      sectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <ApartmentOverview apartment={apartment} onBookNowClick={handleBookNowClick} />;
      case 'sections':
        return (
          <div id="sections-section">
            <ApartmentSections
              apartment={apartment}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        );
      case 'reviews':
        return <ApartmentReviews apartment={apartment} />;
      case 'policies':
        return <ApartmentPolicies />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ApartmentHeader
          apartment={apartment}
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