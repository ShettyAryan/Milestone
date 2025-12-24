import { GraduationCap, Globe, Heart, Stethoscope, Award, Building } from 'lucide-react';


export function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Meet Dr. Joshi</span>
          </div>
          <h2 className="text-[#3a3a3a] mb-4">Expert Care You Can Trust</h2>
          <p className="text-[#7a7a7a] max-w-2xl mx-auto">
            World-class training, decades of experience, and a deep commitment to every child's health
          </p>
        </div>

        {/* Doctor Profile */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Doctor Photo */}
            <div className="flex">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-[0px_8px_10px_0px_rgba(107,77,124,0.1),0px_20px_25px_0px_rgba(107,77,124,0.1)]">
                <img 
                  src="src/assets/IMAGE3.png" 
                  alt="Dr. Vinay H. Joshi" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Doctor Info */}
            <div className="flex flex-col bg-white rounded-2xl border border-[rgba(107,77,124,0.1)] p-8">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-[#3a3a3a] mb-2">Dr. Vinay H. Joshi</h3>
                <p className="text-[#6B4D7C] mb-3">
                  MBBS, MD (Pediatrics), DM (Neonatology)
                </p>
                <p className="text-sm text-[#7a7a7a]">
                  Fellowships in Neonatal & Perinatal Medicine, Pediatric & Cardiac Critical Care, and Transport Medicine
                </p>
              </div>

              {/* Credentials Badges */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,77,124,0.1)] rounded-full text-xs text-[#6B4D7C]">
                    <GraduationCap className="w-3.5 h-3.5" />
                    KEM Hospital, Mumbai
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,77,124,0.1)] rounded-full text-xs text-[#6B4D7C]">
                    <Globe className="w-3.5 h-3.5" />
                    Australia & Canada
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,77,124,0.1)] rounded-full text-xs text-[#6B4D7C]">
                    <Heart className="w-3.5 h-3.5" />
                    Cardiac Critical Care
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,77,124,0.1)] rounded-full text-xs text-[#6B4D7C]">
                    <Stethoscope className="w-3.5 h-3.5" />
                    25+ Years
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,77,124,0.1)] rounded-full text-xs text-[#6B4D7C]">
                    <Award className="w-3.5 h-3.5" />
                    President-Elect, IAP Mumbai
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(107,77,124,0.1)] rounded-full text-xs text-[#6B4D7C]">
                    <Building className="w-3.5 h-3.5" />
                    Nowrosjee Wadia Hospital
                  </span>
                </div>
              </div>

              {/* Current Positions */}
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] flex-shrink-0 mt-2" />
                  <p className="text-sm text-[#7a7a7a]">
                    <span className="text-[#3a3a3a]">Consultant –</span> Neonatologist, Pediatric and Cardiac Intensivist
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] flex-shrink-0 mt-2" />
                  <p className="text-sm text-[#7a7a7a]">
                    <span className="text-[#3a3a3a]">President-Elect –</span> Indian Academy of Pediatrics (Mumbai Branch)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] flex-shrink-0 mt-2" />
                  <p className="text-sm text-[#7a7a7a]">
                    <span className="text-[#3a3a3a]">Honorary Consultant –</span> Nowrosjee Wadia Hospital, Mumbai
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6 pl-4 border-l-3 border-[#6B4D7C] bg-[#FFF8F9] rounded-r-xl p-4">
                <p className="text-[#3a3a3a] italic leading-relaxed mb-2">
                  "Every child deserves the best start in life - my goal is to make sure they not only survive but thrive."
                </p>
                <p className="text-xs text-[#6B4D7C]">- Dr. Vinay H. Joshi</p>
              </div>

              {/* Areas of Expertise */}
              <div>
                <p className="text-sm text-[#3a3a3a] mb-3">Areas of Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Neonatal Intensive Care',
                    'Pediatric Critical Care',
                    'Cardiac Intensive Care',
                    'Functional Echocardiography',
                    'Ventilation & ECMO',
                    'High-Risk Newborn Care'
                  ].map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white text-[#6B4D7C] rounded-full border border-[rgba(107,77,124,0.2)] text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}