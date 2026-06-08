import { useRef, useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useSceneStore from '../../stores/useSceneStore'
import BrushStrokePath from './BrushStrokePath'

gsap.registerPlugin(useGSAP)

export default function LoadingScreen() {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const { currentScene, setScene } = useSceneStore()
  
  // Real progress from Three.js + fake progress to ensure it moves
  const { progress: r3fProgress } = useProgress()
  const [visualProgress, setVisualProgress] = useState(0)
  
  // We want visual progress to smoothly catch up to r3fProgress, and definitely reach 100
  useEffect(() => {
    if (currentScene !== 'loading') return
    
    // Give an initial bump so the user sees something happening
    const targetProgress = Math.max(r3fProgress, 10)
    
    gsap.to({ val: visualProgress }, {
      val: targetProgress,
      duration: 0.5,
      onUpdate: function() {
        setVisualProgress(Math.round(this.targets()[0].val))
      }
    })
    
    // Simulate progress if R3F loading is too fast or stuck
    const timer = setInterval(() => {
      setVisualProgress(p => {
        if (p >= 99 && r3fProgress < 100) return p // Wait at 99% for real loading
        return Math.min(100, p + 1)
      })
    }, 100)
    
    return () => clearInterval(timer)
  }, [r3fProgress, currentScene])

  useGSAP(() => {
    if (currentScene !== 'loading') return
    
    const textEl = svgRef.current?.querySelector('text')
    if (!textEl) return

    // 1. Initialize stroke
    if (visualProgress === 0) {
      gsap.set(textEl, { 
        strokeDashoffset: 400,
        stroke: 'var(--color-rust)' 
      })
    }
    
    // 2. Animate drawing as progress increases
    gsap.to(textEl, {
      strokeDashoffset: 400 - (visualProgress / 100) * 400,
      duration: 0.3,
      ease: 'power1.out'
    })
    
    // 3. When 100%, trigger the drying & fade out sequence
    if (visualProgress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          setScene('hero')
        }
      })
      
      tl.to(textEl, {
        fill: 'var(--color-rust)', // Fill in wet ink
        duration: 0.6,
        ease: 'power2.inOut'
      })
      .to(textEl, {
        stroke: 'var(--color-ash)', // Dries to ash
        fill: 'var(--color-ash)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, "+=0.2") // Wait slightly
      .to(containerRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.05,
        duration: 1.2,
        ease: 'power3.inOut'
      }, "+=0.4")
    }
    
  }, { dependencies: [visualProgress, currentScene], scope: containerRef })

  if (currentScene !== 'loading') return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="w-full max-w-md px-8 opacity-90 flex flex-col items-center">
        <BrushStrokePath ref={svgRef} />
        
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="font-mono text-faint text-[10px] tracking-[0.2em] uppercase">
            Loading Experience
          </p>
          <p className="font-mono text-muted text-sm tracking-widest tabular-nums">
            {visualProgress.toString().padStart(3, '0')}%
          </p>
        </div>
      </div>
    </div>
  )
}
