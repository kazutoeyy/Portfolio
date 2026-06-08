import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function SectionHeading({ number, title, disableAnimation = false }) {
  const headingRef = useRef(null)
  
  useGSAP(() => {
    if (disableAnimation) return;
    // Breathing reveal: letter spacing tight to normal, opacity fade in
    gsap.fromTo(headingRef.current,
      { letterSpacing: '-0.03em', opacity: 0, y: 20 },
      { 
        letterSpacing: '0.05em', 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        }
      }
    )
  }, { scope: headingRef, dependencies: [disableAnimation] })

  return (
    <div className="relative mb-16 md:mb-24 flex items-center">
      {/* Vertical Number Label */}
      <div className="absolute -left-10 md:-left-20 top-2 font-mono text-faint text-xs md:text-sm -rotate-90 origin-top-right tracking-widest pointer-events-none">
        {number}
      </div>
      
      {/* Main Title */}
      <h2 
        ref={headingRef}
        className="section-title-text font-serif italic text-4xl md:text-6xl text-primary pr-8"
      >
        {title}
      </h2>
      
      {/* Accent Line */}
      <div className="flex-1 h-[1px] bg-white/5 relative origin-left">
        <div className="absolute left-0 top-0 h-full w-16 bg-rust/60" />
      </div>
    </div>
  )
}
