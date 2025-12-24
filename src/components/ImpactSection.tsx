import { Users, Heart, Award, Building2, Stethoscope, TrendingUp } from 'lucide-react';

const impactStats = [
  {
    icon: Users,
    number: '30+',
    label: 'Years of Excellence',
    sublabel: 'Neonatal & Pediatric Care'
  },
  {
    icon: Heart,
    number: '10,000+',
    label: 'Lives Touched',
    sublabel: 'Successful Outcomes'
  },
  {
    icon: Award,
    number: '3',
    label: 'International Fellowships',
    sublabel: 'Australia & Canada'
  },
  {
    icon: Building2,
    number: '5+',
    label: 'Major Hospitals',
    sublabel: 'Consultant Across Mumbai'
  },
  {
    icon: Stethoscope,
    number: '100+',
    label: 'Critical Care Cases',
    sublabel: 'Handled Annually'
  },
  {
    icon: TrendingUp,
    number: '95%+',
    label: 'Success Rate',
    sublabel: 'High-Risk Newborn Care'
  }
];

const milestones = [
  {
    headline: 'Advanced NICU Setup',
    description: 'Established one of Mumbai\'s most advanced NICUs and Pediatric Cardiac ICUs at Kokilaben Dhirubhai Ambani Hospital'
  },
  {
    headline: 'Pioneering Technology',
    description: 'Pioneered ECMO, CRRT, and advanced ventilation protocols in pediatric critical care'
  },
  {
    headline: 'Training Excellence',
    description: 'Led training initiatives that have set new benchmarks in clinical excellence and survival outcomes'
  }
];

export function ImpactSection() {
  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[rgba(207,237,234,0.15)] rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Impact & Achievements</span>
          </div>
          <h2 className="text-[#2a2a2a] mb-4">Making a Difference</h2>
        </div>

        {/* Impact Stats Grid - 2x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[rgba(107,77,124,0.15)] hover:border-[#6B4D7C] shadow-[0_8px_30px_rgba(107,77,124,0.08)] hover:shadow-[0_12px_40px_rgba(107,77,124,0.15)] transition-all duration-300 group text-center hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-5 group-hover:bg-[#6B4D7C] transition-colors mx-auto shadow-sm">
                <stat.icon className="w-7 h-7 text-[#6B4D7C] group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl text-[#6B4D7C] mb-2">{stat.number}</div>
              <div className="text-[#2a2a2a] mb-2 text-lg">{stat.label}</div>
              {stat.sublabel && (
                <div className="text-sm text-[#5a5a5a]">{stat.sublabel}</div>
              )}
            </div>
          ))}
        </div>

        {/* Notable Milestones */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-[#2a2a2a] mb-12">Notable Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="p-8 bg-[#FFF8F9] rounded-2xl border border-[rgba(107,77,124,0.15)] shadow-[0_8px_30px_rgba(107,77,124,0.08)] hover:shadow-[0_12px_40px_rgba(107,77,124,0.15)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(107,77,124,0.15)] flex items-center justify-center shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-[#6B4D7C]" />
                  </div>
                  <h4 className="text-[#2a2a2a] text-lg">{milestone.headline}</h4>
                </div>
                <p className="text-[#5a5a5a] text-sm leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}