import { Star, Quote } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    name: 'Parent of a Preterm Baby',
    location: 'Mumbai',
    rating: 5,
    text: 'Our baby was born weighing just 500 grams. Dr. Joshi and his team gave us hope when everyone else gave up. Today, she\'s healthy and playful - a miracle made possible at Milestones.'
  },
  {
    name: 'Ritika M.',
    location: 'Andheri (W)',
    rating: 5,
    text: 'Dr. Joshi\'s calm and compassionate nature made every visit easier. He listens, explains, and truly cares. We couldn\'t ask for a better pediatrician for our children.'
  },
  {
    name: 'Khanna Family',
    location: 'Mumbai',
    rating: 5,
    text: 'World-class care, right in our neighborhood. From vaccines to developmental milestones - everything under one roof. Dr. Joshi\'s expertise gives us complete peace of mind.'
  },
  {
    name: 'Sharma Family',
    location: 'Juhu',
    rating: 5,
    text: 'After our son\'s heart surgery, Dr. Joshi\'s post-operative care was exceptional. His expertise in cardiac critical care saved our child\'s life.'
  },
  {
    name: 'Priya & Rahul',
    location: 'Bandra',
    rating: 5,
    text: 'Dr. Joshi combines global expertise with local warmth. He explains everything in detail and is always available when we need him.'
  }
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(1);
  const autoScrollRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false); // Changed back to false to enable auto-scroll

  // Initialize scroll position to center the first card on desktop
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.clientWidth;
      const cardWidth = 380;
      const gap = 32;
      
      // Center the first card on desktop (if screen is wide enough)
      if (containerWidth > 768) {
        const scrollPosition = (cardWidth + gap) - (containerWidth / 2) + (cardWidth / 2);
        container.scrollLeft = Math.max(0, scrollPosition);
      }
    }
  }, []);

  // Continuous auto-scroll effect
  useEffect(() => {
    let lastTime = Date.now();
    
    const scroll = () => {
      if (scrollRef.current && !isPaused) {
        const container = scrollRef.current;
        const now = Date.now();
        const delta = now - lastTime;
        lastTime = now;
        
        // Scroll speed: pixels per frame (adjusted for 60fps)
        const scrollSpeed = 0.5 * (delta / 16.67); // Smooth consistent speed
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 1) {
          // Reset to start when reaching the end
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      
      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    // Start auto-scroll immediately
    autoScrollRef.current = requestAnimationFrame(scroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isPaused]);

  // Calculate which card is in the center
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const centerPosition = scrollLeft + (containerWidth / 2);
      
      const cardWidth = 380;
      const gap = 32;
      const cardWithGap = cardWidth + gap;
      
      // Calculate which card is closest to center
      let newCenterIndex = Math.floor((centerPosition + gap / 2) / cardWithGap);
      
      // Clamp to valid range
      newCenterIndex = Math.max(0, Math.min(testimonials.length - 1, newCenterIndex));
      
      if (newCenterIndex !== centerIndex) {
        setCenterIndex(newCenterIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // Initial calculation
      handleScroll();
      
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [centerIndex]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="py-16 px-4 bg-[#FFF8F9] relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[rgba(207,237,234,0.2)] rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-[rgba(107,77,124,0.2)] mb-4 shadow-sm backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Patient Stories</span>
          </div>
          <h2 className="text-[#2a2a2a] mb-4">What Families Say</h2>
          <p className="text-[#5a5a5a] max-w-3xl mx-auto text-lg">
            Real stories from real families who've experienced our care
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => {
            const isCenter = index === centerIndex;
            return (
              <div
                key={index}
                className={`flex-shrink-0 w-[380px] transition-all duration-500 ${
                  isCenter ? 'md:scale-105 md:opacity-100 opacity-100' : 'md:scale-95 md:opacity-70 opacity-100'
                }`}
              >
                <div className="bg-white rounded-3xl p-8 border border-[rgba(107,77,124,0.15)] shadow-[0_12px_40px_rgba(107,77,124,0.12)] hover:shadow-[0_16px_50px_rgba(107,77,124,0.18)] transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-6 shadow-sm">
                    <Quote className="w-6 h-6 text-[#6B4D7C]" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#6B4D7C] text-[#6B4D7C]" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[#3a3a3a] mb-8 leading-relaxed text-base">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="pt-6 border-t border-[rgba(107,77,124,0.15)]">
                    <p className="text-[#2a2a2a]">{testimonial.name}</p>
                    <p className="text-sm text-[#5a5a5a]">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}