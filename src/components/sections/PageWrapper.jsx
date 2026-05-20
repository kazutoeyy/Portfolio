import { useEffect } from 'react';
import useSceneStore from '@stores/useSceneStore';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import Footer from '../layout/Footer';

export default function PageWrapper() {
  const currentScene = useSceneStore((s) => s.currentScene);
  const isTransitioning = useSceneStore((s) => s.isTransitioning);

  const isVisible = currentScene === 'workspace' && !isTransitioning;

  // Reset scroll when workspace appears
  useEffect(() => {
    if (isVisible) {
      window.scrollTo(0, 0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="page-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'auto',
        animation: 'fadeInSections 0.6s ease 0.2s both',
      }}
    >
      {/* Spacer — lets user see the 3D workspace first, then scroll into content */}
      <div style={{ height: '100vh', pointerEvents: 'none' }} />
      
      {/* Content sections with solid background to cover the 3D scene */}
      <div 
        style={{
          background: 'var(--color-bg)',
          position: 'relative',
          paddingTop: 'var(--gap-xl)',
          paddingBottom: 'var(--gap-xl)',
          boxShadow: '0 -40px 80px rgba(0,0,0,0.7)'
        }}
      >
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
