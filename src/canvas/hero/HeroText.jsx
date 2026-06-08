import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useSceneStore from '../../stores/useSceneStore'

gsap.registerPlugin(useGSAP)

export default function HeroText() {
  const containerRef = useRef(null)
  const { currentScene } = useSceneStore()

  useGSAP(() => {
    if (currentScene !== 'hero') return

    // Subtle fade in and float up entrance
    gsap.fromTo(containerRef.current.children,
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.5
      }
    )

    // Subtle mouse parallax for the text
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 20
      const y = (e.clientY / innerHeight - 0.5) * 20

      gsap.to(containerRef.current, {
        x,
        y,
        duration: 2,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)

  }, { dependencies: [currentScene], scope: containerRef })

  if (currentScene === 'loading') return null

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none flex flex-col items-center justify-center"
    >
      <div ref={containerRef} className="flex flex-col items-center">
        <h1 className="font-serif italic text-[clamp(4rem,10vw,9rem)] leading-[0.9] text-primary select-none opacity-0">
          Gia Huy
        </h1>
        <p className="font-mono font-normal text-sm md:text-lg text-[#D4CFC4] mt-6 tracking-[0.2em] uppercase select-none opacity-0">
          Backend Developer
        </p>
      </div>
    </div>
  )
}
