import useSceneStore from '@stores/useSceneStore';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';

export default function PageWrapper() {
  const currentScene = useSceneStore((s) => s.currentScene);
  const isTransitioning = useSceneStore((s) => s.isTransitioning);

  const isVisible = currentScene === 'workspace' && !isTransitioning;

  if (!isVisible) return null;

  return (
    <div 
      className="page-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'auto'
      }}
    >
      {/* Spacer — lets user see the 3D workspace first, then scroll into content */}
      <div style={{ height: '100vh', pointerEvents: 'none' }} />
      
      {/* Content sections with solid background to cover the 3D scene */}
      <div 
        style={{
          background: 'var(--color-bg)',
          position: 'relative',
          paddingTop: 'var(--spacing-3xl, 4rem)',
          paddingBottom: 'var(--spacing-3xl, 4rem)',
          boxShadow: '0 -40px 80px rgba(0,0,0,0.7)'
        }}
      >
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  );
}
