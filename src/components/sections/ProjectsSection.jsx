import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'E-Commerce Microservices',
    desc: 'A scalable backend architecture built with Spring Boot, orchestrating multiple microservices for inventory, payment, and user management.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL'],
    link: '#'
  },
  {
    title: 'Spatial Portfolio',
    desc: 'The cinematic web experience you are currently viewing. Blending React Three Fiber with DOM elements for seamless storytelling.',
    tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    link: '#'
  },
  {
    title: 'Real-time Analytics API',
    desc: 'High-throughput data ingestion API built with ASP.NET Core, utilizing Redis caching and background worker processing.',
    tech: ['C#', '.NET Core', 'Redis', 'SQL Server'],
    link: '#'
  }
]

export default function ProjectsSection() {
  const containerRef = useRef(null)
  const leftColRef = useRef(null)

  useGSAP(() => {
    // Pin the left column while the right column scrolls
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: leftColRef.current,
      pinSpacing: false,
    })

    // Animate cards
    const cards = gsap.utils.toArray('.project-card')
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="projects" ref={containerRef} className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48 min-h-[200vh]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full">
        
        {/* Pinned Left Column */}
        <div ref={leftColRef} className="lg:col-span-5 h-[100dvh] pt-32 hidden lg:block">
          <SectionHeading number="03" title="Projects" />
          <p className="font-mono text-muted mt-8 max-w-md leading-relaxed">
            A selection of my recent engineering work, focusing on performance, scalability, and elegant architecture.
          </p>
        </div>
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden col-span-1">
          <SectionHeading number="03" title="Projects" />
        </div>

        {/* Scrolling Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-24 lg:pt-[40vh] pb-32">
          {PROJECTS.map((p, i) => (
            <div key={i} className="project-card flex flex-col gap-6">
              <div className="aspect-video w-full bg-surface/30 border border-white/5 relative overflow-hidden group flex items-center justify-center">
                <span className="font-serif italic text-muted text-xl lg:text-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 text-center px-4">
                  {p.title}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div>
                <h3 className="font-serif italic text-3xl text-primary mb-4">{p.title}</h3>
                <p className="font-mono text-muted mb-6 leading-relaxed">{p.desc}</p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  {p.tech.map(t => (
                    <span key={t} className="font-mono text-xs text-rust border border-rust/30 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a href={p.link} className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-rust transition-colors uppercase tracking-widest group">
                  View Project 
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
