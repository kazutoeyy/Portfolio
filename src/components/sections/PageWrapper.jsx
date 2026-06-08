import useSceneStore from '@stores/useSceneStore'
import ScrollContainer from './ScrollContainer'
import AboutSection from './AboutSection'
import SkillsSection from './SkillsSection'
import ProjectsSection from './ProjectsSection'
import ExperienceSection from './ExperienceSection'
import ContactSection from './ContactSection'
import Footer from '../layout/Footer'

export default function PageWrapper() {
  const currentScene = useSceneStore((s) => s.currentScene)

  if (currentScene === 'loading') return null

  return (
    <ScrollContainer>
      {/* Spacer lets user see the 3D hero scene first (100vh) */}
      <div className="h-screen w-full pointer-events-none" />
      
      {/* Content sections with solid background to cover the 3D scene when scrolling down */}
      <div className="relative z-10 bg-void w-full pb-20 shadow-[0_-100px_100px_rgba(10,10,10,1)]">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </ScrollContainer>
  )
}
