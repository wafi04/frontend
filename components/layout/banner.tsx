import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Sample banner data - ganti dengan data banner real kamu
  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop",
      alt: "Promo Agustus",
      link: "https://www.ourastore.com/id-id",
      title: "Promo Agustus Special",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop",
      alt: "Flash Sale",
      link: "https://www.ourastore.com/flash-sale",
      title: "Flash Sale 50% OFF",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=500&fit=crop",
      alt: "New Collection",
      link: "https://www.ourastore.com/new-collection",
      title: "New Collection 2025",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
      alt: "Discount Weekend",
      link: "https://www.ourastore.com/weekend-sale",
      title: "Weekend Special Discount",
    },
  ];

  // Auto slide effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative flex items-center overflow-hidden  py-4 lg:min-h-[553.96px] lg:py-8">
      {/* Main Slider Container */}
      <div
        className="relative aspect-[1080/424] overflow-hidden rounded-3xl group"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={banner.id} className="w-full flex-shrink-0 relative">
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full outline-none"
              >
                <div className="relative h-full overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
