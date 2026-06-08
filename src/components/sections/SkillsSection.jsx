import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { group: 'Languages', techs: ['Java 17/21', 'C#', 'SQL'] },
  { group: 'Frameworks', techs: ['Spring Boot', 'Spring Security', 'ASP.NET Core', 'EF Core', 'Hibernate'] },
  { group: 'Database', techs: ['SQL Server', 'MySQL', 'MongoDB', 'Redis'] },
  { group: 'Architecture', techs: ['Microservices', 'Clean Architecture', 'CQRS', 'SOLID', 'Modular Monolith'] },
  { group: 'Tools', techs: ['Git', 'Docker', 'RESTful API', 'gRPC', 'Postman', 'AI Tools'] }
]

export default function SkillsSection() {
  const containerRef = useRef(null)
  const lineRef = useRef(null)
  const rowsRef = useRef([])

  useGSAP(() => {
    // Breathing reveal cho heading
    const heading = containerRef.current.querySelector('h2')
    gsap.fromTo(heading,
      { letterSpacing: '-0.03em', opacity: 0, y: 20 },
      { 
        letterSpacing: '0.05em', 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' }
      }
    )

    // Vẽ line dọc từ trên xuống
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )

    // Stagger cho mỗi row
    rowsRef.current.forEach((row, index) => {
      gsap.fromTo(row,
        { opacity: 0, x: -8 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: index * 0.08, // 80ms, 160ms...
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="skills" ref={containerRef} className="relative w-full py-32">
      <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="min-w-[800px] max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Section Heading */}
          <div className="relative mb-24 flex items-center">
            <div className="absolute -left-10 md:-left-20 top-2 font-mono text-ash text-xs -rotate-90 origin-top-right tracking-widest pointer-events-none uppercase">
              02 — Skills
            </div>
            <h2 className="font-serif italic text-4xl md:text-6xl text-rice pr-8">
              Technical Arsenal
            </h2>
          </div>

          {/* Table Container */}
          <div className="relative mt-16 w-full">
            {/* Vertical Line Separator */}
            <div 
              ref={lineRef}
              className="absolute left-[200px] top-0 bottom-0 w-[1px] bg-soot origin-top"
            />
            
            {/* Rows */}
            {SKILLS.map((item, index) => (
              <div 
                key={item.group}
                ref={el => rowsRef.current[index] = el}
                className="grid grid-cols-[200px_1fr] py-[24px] min-h-[64px]"
                style={{ borderTop: '0.5px solid var(--color-ink)' }}
              >
                {/* Group Name */}
                <div className="font-mono text-[10px] tracking-[0.2em] text-ash uppercase pr-6 pt-1">
                  {item.group}
                </div>
                
                {/* Tech List */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 pl-8">
                  {item.techs.map((tech, tIndex) => (
                    <div key={tech} className="flex items-center">
                      <span className="font-mono font-light text-[13px] text-stone hover:text-washi transition-colors duration-200 cursor-default">
                        {tech}
                      </span>
                      {tIndex < item.techs.length - 1 && (
                        <span className="font-mono text-[#2A2520] ml-3 select-none">
                          ·
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Bottom border */}
            <div style={{ borderTop: '0.5px solid var(--color-ink)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}
