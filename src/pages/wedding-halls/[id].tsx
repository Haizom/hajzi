import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/lib/store/useLanguage';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HallHeader } from '@/components/wedding-halls/details/header';
import { HallOverview } from '@/components/wedding-halls/details/overview';
import { HallBooking } from '@/components/wedding-halls/details/booking';
import { HallPolicies } from '@/components/wedding-halls/details/policies';
import { HallReviews } from '@/components/wedding-halls/details/reviews';
import { HALLS_DATA } from '@/data/wedding-halls';

export function WeddingHallDetailsPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'booking' | 'reviews' | 'policies'>('overview');
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);

  const hall = HALLS_DATA.find((h) => h.id === Number(id));
  if (!hall) return <div>Hall not found</div>;

  const images = [
    hall.image,
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  ];

  const handleBookNowClick = () => {
    setSelectedTab('booking');
    // Scroll to booking section smoothly
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <HallOverview hall={hall} onBookNowClick={handleBookNowClick} />;
      case 'booking':
        return (
          <div id="booking-section">
            <HallBooking
              hall={hall}
              selectedPurpose={selectedPurpose}
              setSelectedPurpose={setSelectedPurpose}
            />
          </div>
        );
      case 'reviews':
        return <HallReviews hall={hall} />;
      case 'policies':
        return <HallPolicies />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HallHeader
          hall={hall}
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