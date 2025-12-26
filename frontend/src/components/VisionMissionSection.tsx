import { Target, CheckCircle } from 'lucide-react';

const missionPoints = [
  'To provide early, accurate, and ethical medical guidance for infants and children',
  'To empower parents through education and personalized follow-up care',
  'To uphold the highest standards of neonatal and pediatric critical care in India',
  'To create an ecosystem of trust where families feel supported through every stage of their child\'s growth'
];

export function VisionMissionSection() {
  return (
    <section className="py-16 px-4 bg-[#FFF8F9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Our Purpose</span>
          </div>
          <h2 className="text-[#3a3a3a] mb-4">Vision & Mission</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Vision */}
          <div className="bg-gradient-to-br from-[#6B4D7C] to-[#8B6D9C] rounded-3xl p-10 text-white shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.15)] backdrop-blur-sm flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-6">Vision</h3>
            <p className="text-white text-lg leading-relaxed opacity-95">
              To ensure every child — regardless of their size, condition, or
              circumstance — receives care that is compassionate,
              evidence-based, and globally benchmarked. We are committed to
              combining advanced medical expertise with a gentle, child-centric
              approach that prioritizes comfort, safety, and trust.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-10 border border-[rgba(107,77,124,0.15)] shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-[#6B4D7C]" />
            </div>
            <h3 className="text-[#3a3a3a] mb-6">Mission</h3>
            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6B4D7C]" />
                  </div>
                  <p className="text-[#7a7a7a] leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-12 text-center max-w-4xl mx-auto bg-[#FFF8F9] rounded-3xl p-10 border border-[rgba(107,77,124,0.1)]">
          <p className="text-xl text-[#3a3a3a] italic leading-relaxed mb-4">
            "The goal is not just to treat illness, but to nurture a lifetime of
            health and confidence."
          </p>
          <p className="text-[#6B4D7C]">- Dr. Vinay H. Joshi</p>
        </div>
      </div>
    </section>
  );
}