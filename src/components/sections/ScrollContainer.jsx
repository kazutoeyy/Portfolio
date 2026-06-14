import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollStore from '@stores/useScrollStore'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollContainer({ children }) {
  const lenisRef = useRef()

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })
    
    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis + feed scroll data to store
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      useScrollStore.getState().setScrollProgress(e.progress)
      useScrollStore.getState().setScrollVelocity(Math.abs(e.velocity))
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      lenis.destroy()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
