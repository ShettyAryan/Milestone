import { GallerySection } from '../components/GallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { MapPin, Phone, Clock, Heart, Stethoscope, Syringe, Baby, Shield, Activity } from 'lucide-react';

const services = [
  {
    icon: Baby,
    title: 'Newborn Care',
    description: 'Comprehensive care for your newborn, from first checkups to feeding guidance and developmental monitoring.',
    features: ['First 24-hour checkup', 'Feeding guidance', 'Jaundice screening', 'Growth monitoring']
  },
  {
    icon: Stethoscope,
    title: 'Well-Child Visits',
    description: 'Regular checkups to monitor growth, development, and overall health at every milestone.',
    features: ['Growth tracking', 'Development assessment', 'Health screening', 'Parental guidance']
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    description: 'Complete immunization schedule following international guidelines with proper cold chain storage.',
    features: ['WHO schedule', 'Travel vaccines', 'Catch-up programs', 'Digital records']
  },
  {
    icon: Activity,
    title: 'Sick Visits',
    description: 'Prompt care for acute illnesses, injuries, and urgent concerns with same-day appointments.',
    features: ['Same-day slots', 'Quick diagnosis', 'Treatment plans', 'Follow-up care']
  },
  {
    icon: Heart,
    title: 'Developmental Screening',
    description: 'Early detection and support for developmental milestones and behavioral concerns.',
    features: ['Milestone tracking', 'Speech assessment', 'Behavioral support', 'Early intervention']
  },
  {
    icon: Shield,
    title: 'Chronic Care',
    description: 'Ongoing management of asthma, allergies, and other chronic conditions with personalized care plans.',
    features: ['Asthma management', 'Allergy testing', 'Care coordination', 'Lifestyle guidance']
  }
];

export default function Clinic() {
  return (
    <div className="pt-8">
      <GallerySection />
      {/* About Clinic Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
              <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
              <span className="text-sm text-[#6B4D7C]">About Us</span>
            </div>
            <h2 className="text-[#3a3a3a] mb-4">
              Welcome to Milestones Child Clinic
            </h2>
            <p className="text-[#7a7a7a] max-w-3xl mx-auto">
              A welcoming, child-friendly environment designed to make every
              visit comfortable and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* About the Clinic */}
            <div className="bg-[#FFF8F9] rounded-3xl p-8 border border-[rgba(107,77,124,0.1)]">
              <h3 className="text-[#3a3a3a] mb-6">About Our Clinic</h3>
              <div className="space-y-4 text-[#7a7a7a] text-sm leading-relaxed">
                <p>
                  Milestones Child Clinic is a state-of-the-art pediatric
                  facility located in the heart of Mumbai. Our clinic is
                  designed with children in mind, featuring bright, cheerful
                  spaces that help young patients feel comfortable and at ease.
                </p>
                <p>
                  We maintain the highest standards of hygiene and safety, with
                  modern equipment and a dedicated team of healthcare
                  professionals committed to providing exceptional care for your
                  child.
                </p>
                <div className="pt-4 border-t border-[rgba(107,77,124,0.1)]">
                  <h4 className="text-[#3a3a3a] mb-3">
                    Our Facilities Include:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] mt-2 flex-shrink-0" />
                      <span>
                        Modern examination rooms with child-friendly decor
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] mt-2 flex-shrink-0" />
                      <span>
                        Dedicated vaccination room with proper cold chain
                        storage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] mt-2 flex-shrink-0" />
                      <span>Comfortable waiting area with toys and books</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] mt-2 flex-shrink-0" />
                      <span>
                        Private consultation spaces for sensitive discussions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C] mt-2 flex-shrink-0" />
                      <span>Wheelchair accessible premises</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timings & Contact */}
            <div className="space-y-6">
              <div className="bg-[#FFF8F9] rounded-3xl p-8 border border-[rgba(107,77,124,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#6B4D7C]" />
                  </div>
                  <h3 className="text-[#3a3a3a]">Clinic Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[rgba(107,77,124,0.1)]">
                    <span className="text-[#3a3a3a]">Monday - Friday</span>
                    <div className="text-right">
                      <span className="text-[#6B4D7C] block">
                        7:00 PM - 9:00 PM
                      </span>
                      <span className="text-[#7a7a7a] text-xs font-medium">
                        By Appointment Only
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[rgba(107,77,124,0.1)]">
                    <span className="text-[#3a3a3a]">Saturday</span>
                    <div className="text-right">
                      <span className="text-[#6B4D7C] block">
                        7:00 PM - 9:00 PM
                      </span>
                      <span className="text-[#7a7a7a] text-xs font-medium">
                        By Appointment Only
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[rgba(107,77,124,0.1)]">
                    <span className="text-[#3a3a3a]">Sunday</span>
                    <div className="text-right">
                      <span className="text-[#6B4D7C] block">
                        7:00 PM - 9:00 PM
                      </span>
                      <span className="text-[#7a7a7a] text-xs font-medium">
                        By Appointment Only
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#3a3a3a]">Emergency</span>
                    <span className="text-[#6B4D7C]">24/7 Available</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF8F9] rounded-3xl p-8 border border-[rgba(107,77,124,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#6B4D7C]" />
                  </div>
                  <h3 className="text-[#3a3a3a]">Location</h3>
                </div>
                <p className="text-[#7a7a7a] text-sm leading-relaxed mb-4">
                  Milestones Child Clinic
                  <br />
                  123 Marine Drive, Churchgate
                  <br />
                  Mumbai, Maharashtra 400020
                  <br />
                  India
                </p>
                <a
                  href="https://www.google.com/maps/place/Princeton+building/@19.1151788,72.8297091,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c9dd3461d9c1:0xa3b41636086d822d!8m2!3d19.1151788!4d72.832284!16s%2Fg%2F11c5q8h0wz?entry=ttu&g_ep=EgoyMDI1MDEyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-colors text-sm block text-center"
                >
                  Get Directions
                </a>
              </div>

              <div className="bg-[#FFF8F9] rounded-3xl p-8 border border-[rgba(107,77,124,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[rgba(107,77,124,0.1)] flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#6B4D7C]" />
                  </div>
                  <h3 className="text-[#3a3a3a]">Contact</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#7a7a7a] mb-1">Main Line</p>
                    <a
                      href="tel:+919876543210"
                      className="text-[#6B4D7C] hover:underline"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                  <div>
                    <p className="text-[#7a7a7a] mb-1">Emergency</p>
                    <a
                      href="tel:+919876543211"
                      className="text-[#6B4D7C] hover:underline"
                    >
                      +91 98765 43211
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-[#FFF8F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
              <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
              <span className="text-sm text-[#6B4D7C]">Our Services</span>
            </div>
            <h2 className="text-[#3a3a3a] mb-4">
              Comprehensive Pediatric Care
            </h2>
            <p className="text-[#7a7a7a] max-w-3xl mx-auto">
              From infancy through adolescence, we provide complete care
              tailored to your child's unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-[rgba(107,77,124,0.15)] hover:border-[#6B4D7C] hover:shadow-[0_20px_60px_rgba(107,77,124,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[rgba(107,77,124,0.1)] flex items-center justify-center mb-6 group-hover:bg-[#6B4D7C] group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-[#6B4D7C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-[#3a3a3a] mb-3 group-hover:text-[#6B4D7C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#7a7a7a] text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-4 border-t border-[rgba(107,77,124,0.1)]">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-[#7a7a7a] text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6B4D7C]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
}