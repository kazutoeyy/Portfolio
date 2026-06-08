import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const containerRef = useRef(null)
  const rightColRef = useRef(null)

  useGSAP(() => {
    // Scrubbing text reveal cho đoạn văn bản
    const paragraphs = rightColRef.current.querySelectorAll('.body-text p')
    
    gsap.fromTo(paragraphs,
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="about" ref={containerRef} className="relative w-full pt-[120px] pb-32">
      <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="min-w-[800px] max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-[35%_65%] gap-8">
          
          {/* Cột trái — Ảnh */}
          <div className="flex flex-col items-start pt-[32px]">
            <img 
              src="/ava1.jpg" 
              alt="Gia Huy Portrait"
              className="w-[260px] h-[390px] object-cover grayscale contrast-[1.15] rounded-[2px] mt-[-32px]"
            />
            <span className="font-mono text-[10px] tracking-[0.2em] text-ash mt-4 block uppercase">
              HCM City · FPT University
            </span>
          </div>

          {/* Cột phải — Text block */}
          <div ref={rightColRef} className="flex flex-col items-start pr-8">
            <span className="font-mono text-[9px] tracking-[0.3em] text-ash uppercase mb-[32px] block">
              01 — About
            </span>
            
            <h2 className="font-serif italic text-[clamp(36px,5vw,56px)] text-rice tracking-[-0.02em] leading-[1.05]">
              Nguyễn Bùi Gia Huy
            </h2>
            
            <span className="font-mono font-light text-[13px] tracking-[0.15em] text-rust uppercase mt-[8px] mb-[40px] block">
              Backend Engineer
            </span>
            
            <div className="w-[40px] h-[1.5px] bg-rust mb-[32px]" />
            
            <div className="body-text font-mono font-light text-[13px] leading-[1.9] text-stone max-w-[480px] space-y-6">
              <p>
                I am a Backend Engineer specializing in Java Spring Boot and ASP.NET Core, with a deep appreciation for the architecture of resilient systems.
              </p>
              <p>
                My approach to engineering mirrors the principles of Wabi-sabi: finding beauty in the precise, the imperfect, and the deeply functional. I build scalable backends that remain elegant under the surface.
              </p>
              <p>
                Beyond APIs and databases, I explore the intersections of spatial computing and 3D web experiences, crafting interfaces that feel tactile, weightless, and cinematic.
              </p>
            </div>
            
            {/* Stats block */}
            <div className="flex items-start mt-[48px]">
              <div className="flex flex-col">
                <span className="font-serif text-[32px] text-rice leading-none block">0.5+</span>
                <span className="font-mono font-light text-[10px] tracking-[0.15em] text-ash uppercase mt-2 block">
                  Year Experience
                </span>
              </div>
              
              <span className="font-mono text-[#2A2520] mx-[32px] block text-lg leading-none">/</span>
              
              <div className="flex flex-col">
                <span className="font-serif text-[32px] text-rice leading-none block">3+</span>
                <span className="font-mono font-light text-[10px] tracking-[0.15em] text-ash uppercase mt-2 block">
                  Technical Projects
                </span>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}
