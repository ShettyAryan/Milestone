import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ImpactSection } from '../components/ImpactSection';
import { VisionMissionSection } from '../components/VisionMissionSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { GallerySection } from '../components/GallerySection';
import { ServicesSection } from '../components/ServicesSection';
import { CTASection } from '../components/CTASection';
import { BlogSection } from '../components/BlogSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <VisionMissionSection />
      <TestimonialsSection />
      <GallerySection />
      <ServicesSection />
      <CTASection />
      <BlogSection />
    </>
  );
}
