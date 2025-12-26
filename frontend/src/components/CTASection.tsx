import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-16 px-4 bg-[#FFF8F9] relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[rgba(107,77,124,0.1)] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center bg-white rounded-3xl p-16 border border-[rgba(107,77,124,0.15)] shadow-[0_20px_60px_rgba(107,77,124,0.15)] hover:shadow-[0_25px_70px_rgba(107,77,124,0.2)] transition-shadow duration-300">
          <h3 className="text-[#2a2a2a] mb-6">Ready to Get Started?</h3>
          <p className="text-[#5a5a5a] mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            We'd love to welcome you and your family to Milestones. Schedule an
            appointment today to meet Dr. Joshi and experience our compassionate
            care.
          </p>
          <Link to="/book-appointment">
            <button className="px-12 py-5 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-all shadow-[0_8px_30px_rgba(107,77,124,0.3)] hover:shadow-[0_12px_40px_rgba(107,77,124,0.4)] hover:-translate-y-0.5 text-lg">
              Schedule Appointment
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}