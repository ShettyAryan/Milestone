import { AboutSection } from '../components/AboutSection';
import { ImpactSection } from '../components/ImpactSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { VisionMissionSection } from '../components/VisionMissionSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

export default function About() {
  return (
    <div className="pt-8">
      <AboutSection />
      <ImpactSection />
      <AchievementsSection />
      <VisionMissionSection />
      <TestimonialsSection />
    </div>
  );
}