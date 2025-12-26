import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584201/ENTRANCE_chuuxk.png",
    caption: "Clinic",
    category: "Clinic",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584176/examination_couch_awup8t.png",
    caption: "Modern pediatric examination room",
    category: "Facilities",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584193/RECEPTIONIST_AREA_e5ihoc.png",
    caption: "Welcoming reception area",
    category: "Facilities",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584204/FEEDIND_AND_WAITING_AREA_m2xti0.png",
    caption: "Feeding and Waiting area",
    category: "Facilities",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584317/IMAGE1_bkqhnu.png",
    caption: "Caring for newborns",
    category: "Care",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584317/IMAGE4_hlg4gt.png",
    caption: "Vaccinations",
    category: "Services",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584199/ACHIVEMENTS_SECTION_jp80b7.png",
    caption: "Acheivements",
    category: "Acheivemnets",
  },
  {
    url: "https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584181/Credential_Wall_hi7ijz.png",
    caption: "Credentials",
    category: "Credentials",
  },
];

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section id="gallery" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Our Clinic</span>
          </div>
          <h2 className="text-[#3a3a3a] mb-4">Our Clinic & Care</h2>
          <p className="text-[#7a7a7a] max-w-2xl mx-auto">
            Take a look inside our modern, child-friendly facility and see the compassionate care we provide
          </p>
        </div>

        {/* Slideshow */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Image Container */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-[#FFF8F9]">
            <ImageWithFallback
              src={galleryImages[currentIndex].url}
              alt={galleryImages[currentIndex].caption}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(107,77,124,0.95)] via-[rgba(107,77,124,0.7)] to-transparent p-8">
              <span className="inline-block px-3 py-1 bg-[#6B4D7C] text-white text-xs rounded-full mb-3">
                {galleryImages[currentIndex].category}
              </span>
              <p className="text-white text-xl">
                {galleryImages[currentIndex].caption}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-[#6B4D7C]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-[#6B4D7C]" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-4 ring-[#6B4D7C] scale-105'
                    : 'ring-2 ring-transparent hover:ring-[rgba(107,77,124,0.3)] opacity-60 hover:opacity-100'
                }`}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-[#6B4D7C]'
                    : 'w-2 h-2 bg-[rgba(107,77,124,0.3)] hover:bg-[rgba(107,77,124,0.5)]'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}