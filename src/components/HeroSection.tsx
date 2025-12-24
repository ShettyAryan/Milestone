import { Play, Star } from 'lucide-react';

import svgPaths from "../imports/svg-v6tm062ua4";
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section id="home" className="relative bg-[#FFF8F9] overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute bg-[rgba(207,237,234,0.3)] rounded-full w-[500px] h-[500px] top-10 right-[5%] blur-3xl" />
      <div className="absolute bg-[rgba(107,77,124,0.15)] rounded-full w-[400px] h-[400px] top-[360px] left-[5%] blur-3xl" />
      <div className="absolute bg-gradient-to-t from-[rgba(255,255,255,0.6)] to-transparent h-32 left-0 bottom-0 w-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 border border-[rgba(107,77,124,0.25)] rounded-full backdrop-blur-sm shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-[#6B4D7C] animate-pulse" />
              <span className="text-base text-[#4a4a4a]">
                Trusted by 10,000+ families
              </span>
            </div>

            {/* Heading with underline */}
            <div>
              <h1 className="text-[#2a2a2a] mb-4 leading-tight">
                Because every milestone in your child's journey matters
              </h1>
              {/* Decorative underline */}
              <div className="w-[300px] h-4 relative -mt-2">
                <svg className="w-full h-full" viewBox="0 0 300 12" fill="none">
                  <path
                    d={svgPaths.p124a4580}
                    stroke="#6B4D7C"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#5a5a5a] text-lg leading-relaxed max-w-xl">
              World-class neonatal and pediatric intensive care, now in Mumbai.
              From high-risk newborns to cardiac critical care - every child
              receives compassionate, evidence-based treatment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/contact">
                <button className="px-8 py-4 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-all shadow-[0_8px_30px_rgba(107,77,124,0.3)] hover:shadow-[0_12px_40px_rgba(107,77,124,0.4)] hover:-translate-y-0.5 text-center">
                  Schedule Appointment
                </button>
              </Link>
              {/* <button className="px-8 py-4 bg-white text-[#3a3a3a] rounded-full border-2 border-[rgba(107,77,124,0.3)] hover:border-[rgba(107,77,124,0.5)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] flex items-center justify-center -ml-2">
                  <Play className="w-5 h-5 text-[#6B4D7C] fill-[#6B4D7C] ml-0.5" />
                </div>
                Take a tour
              </button> */}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4 border-t-2 border-[rgba(107,77,124,0.15)]">
              {/* Avatar group */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img
                    src="https://res.cloudinary.com/dzq2acoyj/image/upload/v1766586676/f578f9c2a181ef669150341163e63e6e9da01878_bvo505.jpg"
                    alt=""
                    className="w-11 h-11 rounded-full border-3 border-white object-cover shadow-md"
                  />
                  <img
                    src="https://res.cloudinary.com/dzq2acoyj/image/upload/v1766586676/ec901f1c0d6bdc3abb3b7f2578c96a444ee001e2_wtplqk.jpg"
                    alt=""
                    className="w-11 h-11 rounded-full border-3 border-white object-cover shadow-md"
                  />
                  <img
                    src="https://res.cloudinary.com/dzq2acoyj/image/upload/v1766586676/410c340aa057242400c608368f918307cdd72438_caa5d1.jpg"
                    alt=""
                    className="w-11 h-11 rounded-full border-3 border-white object-cover shadow-md"
                  />
                  <div className="w-11 h-11 rounded-full border-3 border-white bg-[rgba(107,77,124,0.2)] flex items-center justify-center text-[#6B4D7C] text-sm shadow-md">
                    +50
                  </div>
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#6B4D7C] text-[#6B4D7C]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#5a5a5a]">
                    5.0 from happy parents
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-[rgba(107,77,124,0.2)]" />

              {/* Years stat */}
              <div>
                <p className="text-2xl text-[#2a2a2a] mb-1">15+</p>
                <p className="text-sm text-[#5a5a5a]">Years of care</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image with Cards */}
          <div className="relative">
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(107,77,124,0.25)] hover:shadow-[0_25px_70px_rgba(107,77,124,0.35)] transition-shadow duration-500">
              <img
                src="https://res.cloudinary.com/dzq2acoyj/image/upload/v1766584317/IMAGE1_bkqhnu.png"
                alt="Doctor with child"
                className="w-full h-[480px] object-cover"
              />
            </div>

            {/* Floating Card - Next Available */}
            {/* <div className="absolute bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-[0_12px_40px_rgba(107,77,124,0.2)] hover:shadow-[0_16px_50px_rgba(107,77,124,0.3)] border border-[rgba(107,77,124,0.1)] max-w-[260px] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(207,237,234,0.4)] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                      stroke="#6B4D7C"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329"
                      stroke="#6B4D7C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#2a2a2a] mb-1">Next Available</p>
                  <p className="text-xs text-[#5a5a5a] mb-2">
                    Tomorrow, 9:00 AM
                  </p>
                  <button className="text-xs text-[#6B4D7C] hover:underline">
                    Quick book →
                  </button>
                </div>
              </div>
            </div> */}

            {/* Floating Card - Board Certified */}
            <div className="absolute -top-4 right-8 bg-white rounded-2xl px-5 py-4 shadow-[0_12px_40px_rgba(107,77,124,0.2)] hover:shadow-[0_16px_50px_rgba(107,77,124,0.3)] border border-[rgba(107,77,124,0.1)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.25)] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z"
                      stroke="#6B4D7C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.45831 10L8.81665 12.3584L13.5416 7.64169"
                      stroke="#6B4D7C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#2a2a2a]">Board Certified</p>
                  <p className="text-xs text-[#5a5a5a]">
                    Pediatric Specialists
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}