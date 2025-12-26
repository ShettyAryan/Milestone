import { Award, BookOpen, Newspaper, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const achievements = [
  {
    icon: Award,
    category: "International Research",
    title: "Critical Care Medicine (USA, 2011)",
    description: "Co-authored groundbreaking research on APRV improving pulmonary blood flow in infants after cardiac surgery",
    color: "#6B4D7C"
  },
  {
    icon: BookOpen,
    category: "Publications",
    title: "Canadian Respiratory Journal (2013)",
    description: "Published comprehensive neonatal case series and review on Airway Pressure Release Ventilation",
    color: "#6B4D7C"
  },
  {
    icon: Award,
    category: "Medical Innovation",
    title: "iNICU - AI-Enabled Neonatal Care",
    description: "Pioneered India's first AI and IoT integrated neonatal monitoring platform, published in Journal of Medical Systems (2017)",
    color: "#6B4D7C"
  },
  {
    icon: BookOpen,
    category: "Research Contribution",
    title: "Annals of Pediatric Cardiology (2019)",
    description: "Published significant research on Adrenal Insufficiency in CHD Surgery, advancing pediatric cardiac care",
    color: "#6B4D7C"
  },
  {
    icon: Globe,
    category: "International Speaker",
    title: "Global Conference Participation",
    description: "Featured speaker at international conferences in Canada, Australia, Italy, Geneva, and South Africa",
    color: "#6B4D7C"
  },
  {
    icon: BookOpen,
    category: "Academic Contributions",
    title: "Medical Literature Author",
    description: "Authored chapters in Handbook of Neonatology, IAP Intensive Care Book, and Protocols in Neonatology",
    color: "#6B4D7C"
  },
  {
    icon: Award,
    category: "Research Excellence",
    title: "Cochrane Review Contributor (2009)",
    description: "Contributed to the prestigious Cochrane Review, setting standards in evidence-based medicine",
    color: "#6B4D7C"
  },
  {
    icon: Newspaper,
    category: "Media Recognition",
    title: "National Health Expert",
    description: "Featured in Parents India, Grehlaxmi, Divya Bhaskar, and Prahaar for expertise on child health and nutrition",
    color: "#6B4D7C"
  }
];

export function AchievementsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % achievements.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const getVisibleAchievements = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(achievements[(currentIndex + i) % achievements.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Recognition & Excellence</span>
          </div>
          <h2 className="text-[#3a3a3a] mb-4">Achievements & Recognitions</h2>
          <p className="text-[#7a7a7a] max-w-3xl mx-auto">
            International recognition for contributions to pediatric and neonatal medicine
          </p>
        </div>

        {/* Achievements Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop View - 3 Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
            {getVisibleAchievements().map((achievement, index) => {
              const Icon = achievement.icon;
              const isCenter = index === 1;
              return (
                <div
                  key={`${achievement.title}-${index}`}
                  className={`bg-[#FFF8F9] rounded-3xl p-6 border border-[rgba(107,77,124,0.1)] transition-all duration-500 ${
                    isCenter ? 'transform scale-105 shadow-lg' : 'opacity-80'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-4 ${
                    isCenter ? 'ring-2 ring-[#6B4D7C] ring-offset-2' : ''
                  }`}>
                    <Icon className="w-6 h-6 text-[#6B4D7C]" />
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-white rounded-full text-xs text-[#6B4D7C] border border-[rgba(107,77,124,0.2)]">
                      {achievement.category}
                    </span>
                  </div>
                  <h4 className="text-[#3a3a3a] mb-2 min-h-[48px]">{achievement.title}</h4>
                  <p className="text-[#7a7a7a] text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile View - 1 Card */}
          <div className="md:hidden mb-8">
            {getVisibleAchievements().slice(0, 1).map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={`${achievement.title}-mobile`}
                  className="bg-[#FFF8F9] rounded-3xl p-6 border border-[rgba(107,77,124,0.1)] shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-4 ring-2 ring-[#6B4D7C] ring-offset-2">
                    <Icon className="w-6 h-6 text-[#6B4D7C]" />
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-white rounded-full text-xs text-[#6B4D7C] border border-[rgba(107,77,124,0.2)]">
                      {achievement.category}
                    </span>
                  </div>
                  <h4 className="text-[#3a3a3a] mb-2">{achievement.title}</h4>
                  <p className="text-[#7a7a7a] text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#6B4D7C] text-[#6B4D7C] flex items-center justify-center hover:bg-[#6B4D7C] hover:text-white transition-colors"
              aria-label="Previous achievement"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#6B4D7C] w-8'
                      : 'bg-[rgba(107,77,124,0.3)] hover:bg-[rgba(107,77,124,0.5)]'
                  }`}
                  aria-label={`Go to achievement ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border-2 border-[#6B4D7C] text-[#6B4D7C] flex items-center justify-center hover:bg-[#6B4D7C] hover:text-white transition-colors"
              aria-label="Next achievement"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="text-center mt-4">
            <p className="text-xs text-[#7a7a7a]">
              {isPaused ? 'Paused - Hover to pause auto-scroll' : 'Auto-scrolling • Hover to pause'}
            </p>
          </div>
        </div>

        {/* Additional Credentials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FFF8F9] rounded-2xl p-6 border border-[rgba(107,77,124,0.1)]">
            <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-[#6B4D7C]" />
            </div>
            <h4 className="text-[#3a3a3a] mb-2">Advanced Training</h4>
            <p className="text-[#7a7a7a] text-sm">
              ECMO, CRRT, Functional Echocardiography, High-Frequency Ventilation
            </p>
          </div>

          <div className="bg-[#FFF8F9] rounded-2xl p-6 border border-[rgba(107,77,124,0.1)]">
            <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-[#6B4D7C]" />
            </div>
            <h4 className="text-[#3a3a3a] mb-2">International Fellowships</h4>
            <p className="text-[#7a7a7a] text-sm">
              Neonatal Medicine (Australia), Cardiac Critical Care, Transport Medicine (Canada)
            </p>
          </div>

          <div className="bg-[#FFF8F9] rounded-2xl p-6 border border-[rgba(107,77,124,0.1)]">
            <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-[#6B4D7C]" />
            </div>
            <h4 className="text-[#3a3a3a] mb-2">Publications</h4>
            <p className="text-[#7a7a7a] text-sm">
              5+ peer-reviewed publications in international medical journals
            </p>
          </div>

          <div className="bg-[#FFF8F9] rounded-2xl p-6 border border-[rgba(107,77,124,0.1)]">
            <div className="w-10 h-10 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-3">
              <Newspaper className="w-5 h-5 text-[#6B4D7C]" />
            </div>
            <h4 className="text-[#3a3a3a] mb-2">Media Features</h4>
            <p className="text-[#7a7a7a] text-sm">
              Expert quoted in leading newspapers and health magazines across India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
