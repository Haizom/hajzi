import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Advertisement images with their corresponding links
const ADS_CONTENT = [
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80',
    link: '/hotels',
  },
  {
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80',
    link: '/chalets-resorts',
  },
  {
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80',
    link: '/wedding-halls',
  },
  {
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=80',
    link: '/apartments',
  }
];

export function Hero() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ADS_CONTENT.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    navigate(ADS_CONTENT[currentImageIndex].link);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      {/* Image Carousel Section */}
      <div className="relative w-full max-w-[1280px] mx-auto">
        {/* Aspect ratio container */}
        <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
          {/* Image container */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            {ADS_CONTENT.map((content, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${
                  currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleImageClick}
              >
                <img
                  src={content.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 hover:from-black/40 hover:to-black/40 transition-colors" />
              </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
              {ADS_CONTENT.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}