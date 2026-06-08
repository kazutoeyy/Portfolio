import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SectionHeading from './SectionHeading'

const EXPERIENCES = [
  {
    role: 'Backend Engineer',
    company: 'Tech Corp',
    period: '2024 - Present',
    desc: 'Architected and maintained high-performance microservices using Spring Boot and Apache Kafka. Reduced average latency by 40%.'
  },
  {
    role: 'Fullstack Developer',
    company: 'Digital Agency',
    period: '2022 - 2024',
    desc: 'Built scalable web applications using ASP.NET Core and React. Implemented real-time features using SignalR.'
  },
  {
    role: 'Software Intern',
    company: 'Startup Inc',
    period: '2021 - 2022',
    desc: 'Developed internal tooling and REST APIs. Gained hands-on experience with Docker and CI/CD pipelines.'
  }
]

export default function ExperienceSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const items = gsap.utils.toArray('.exp-item')
    
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, filter: 'blur(10px)', y: 50 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="experience" ref={containerRef} className="section relative max-w-4xl mx-auto px-6 md:px-12 py-32 md:py-48">
      <SectionHeading number="04" title="Experience" />
      
      <div className="relative pl-8 md:pl-0 mt-20">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2" />
        
        <div className="flex flex-col gap-24">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className={`exp-item relative w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:self-start md:text-right' : 'md:pl-16 md:self-end'}`}>
              
              {/* Timeline Dot */}
              <div className={`absolute top-2 w-2 h-2 rounded-full bg-rust/50 ${index % 2 === 0 ? 'left-[-36px] md:left-auto md:-right-[4px]' : 'left-[-36px] md:-left-[4px]'}`} />
              
              <span className="font-mono text-rust text-sm tracking-widest">{exp.period}</span>
              <h3 className="font-serif italic text-2xl md:text-3xl text-primary mt-2 mb-1">{exp.role}</h3>
              <h4 className="font-mono text-muted text-sm md:text-base mb-6">{exp.company}</h4>
              <p className="font-mono text-muted leading-relaxed font-light">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
