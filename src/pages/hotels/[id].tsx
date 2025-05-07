import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HotelHeader } from '@/components/hotels/details/header';
import { HotelOverview } from '@/components/hotels/details/overview';
import { HotelRooms } from '@/components/hotels/details/rooms';
import { HotelPolicies } from '@/components/hotels/details/policies';
import { HotelReviews } from '@/components/hotels/details/reviews';
import { HOTELS_DATA } from '@/data/hotels';
import { ROOMS } from '@/data/rooms';

export function HotelDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'rooms' | 'reviews' | 'policies'>('overview');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const hotel = HOTELS_DATA.find((h) => h.id === Number(id));
  if (!hotel) return <div>Hotel not found</div>;

  const images = [hotel.image, ...ROOMS.map((room) => room.image)];

  const handleBookNowClick = () => {
    setSelectedTab('rooms');
    // Set the first room as selected
    if (ROOMS.length > 0) {
      setSelectedRoom(String(ROOMS[0].id));
    }
    // Scroll to rooms section smoothly
    const roomsSection = document.getElementById('rooms-section');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <HotelOverview hotel={hotel} onBookNowClick={handleBookNowClick} />;
      case 'rooms':
        return (
          <div id="rooms-section">
            <HotelRooms selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
          </div>
        );
      case 'reviews':
        return <HotelReviews hotel={hotel} />;
      case 'policies':
        return <HotelPolicies />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HotelHeader
          hotel={hotel}
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