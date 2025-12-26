import { Heart, Stethoscope, Syringe, Baby, Shield, Activity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Baby,
    title: 'Newborn Care',
    description: 'Comprehensive care for your newborn, from first checkups to feeding guidance.',
    imageUrl: 'https://images.unsplash.com/photo-1759802147238-5c18d1463bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMGNhcmV8ZW58MXx8fHwxNzY2MTgwNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Stethoscope,
    title: 'Well-Child Visits',
    description: 'Regular checkups to monitor growth, development, and overall health.',
    imageUrl: 'https://images.unsplash.com/photo-1758691462284-9eeec33fb0e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGRvY3RvciUyMGNoZWNrdXB8ZW58MXx8fHwxNzY2MTgwNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    description: 'Complete immunization schedule following CDC guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1632052999485-d748103abf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHZhY2NpbmF0aW9ufGVufDF8fHx8MTc2NjE4MDU4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Activity,
    title: 'Sick Visits',
    description: 'Prompt care for acute illnesses, injuries, and urgent concerns.',
    imageUrl: 'https://images.unsplash.com/photo-1763294905874-504ea922bbc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWNrJTIwY2hpbGQlMjBkb2N0b3J8ZW58MXx8fHwxNzY2MTgwNTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Heart,
    title: 'Developmental Screening',
    description: 'Early detection and support for developmental milestones.',
    imageUrl: 'https://images.unsplash.com/photo-1758691462164-100b5e356169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGRldmVsb3BtZW50JTIwYXNzZXNzbWVudHxlbnwxfHx8fDE3NjYxODA1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    icon: Shield,
    title: 'Chronic Care',
    description: 'Ongoing management of asthma, allergies, and other conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1758654859751-7dfe0c8388a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBtZWRpY2FsJTIwY2FyZXxlbnwxfHx8fDE3NjYxODA1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 px-4 bg-white relative overflow-hidden"
    >
      {/* Background gradient accent */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[rgba(107,77,124,0.08)] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Our Services</span>
          </div>
          <h2 className="text-[#2a2a2a] mb-4">Complete Care for Every Stage</h2>
          <p className="text-[#5a5a5a] max-w-2xl mx-auto text-lg">
            From infancy through adolescence, we provide comprehensive pediatric
            services tailored to your child's unique needs at every milestone.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to="/contact">
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(107,77,124,0.15)] hover:border-[rgba(107,77,124,0.4)] shadow-[0_8px_30px_rgba(107,77,124,0.1)] hover:shadow-[0_16px_50px_rgba(107,77,124,0.2)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300 group-hover:scale-105"
                  />
                  {/* Purple Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(107,77,124,0.35)] via-[rgba(107,77,124,0.25)] to-[rgba(107,77,124,0.45)]" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full bg-gradient-to-b from-white/50 via-white/60 to-white/70">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(107,77,124,0.15)] flex items-center justify-center mb-6 group-hover:bg-[rgba(107,77,124,0.25)] transition-colors shadow-md">
                    <service.icon className="w-7 h-7 text-[#6B4D7C]" />
                  </div>
                  <h3 className="text-[#3a3a3a] mb-3">{service.title}</h3>
                  <p className="text-[#7a7a7a]">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}