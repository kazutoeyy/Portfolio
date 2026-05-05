/**
 * LoadingScreen.jsx — Creative loading experience
 * Features: progress tracking, text reveal animation, smooth fade to hero
 * Target: < 3 seconds, no boring progress bar
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useSceneStore from '../../stores/useSceneStore'

export default function LoadingScreen() {
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const textRefs = useRef([])
  const lineRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const { currentScene, setScene } = useSceneStore()

  // Simulate loading progress (will be replaced with useProgress from Drei later)
  useEffect(() => {
    if (currentScene !== 'loading') return

    let frame
    let start = null
    const duration = 2200 // ms

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const p = Math.min(elapsed / duration, 1)
      // Eased progress curve
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))

      if (p < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [currentScene])

  // Text reveal animation on mount
  useEffect(() => {
    if (currentScene !== 'loading') return

    const tl = gsap.timeline()

    // Stagger reveal text lines
    tl.fromTo(
      textRefs.current,
      { y: 40, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    )

    // Animate progress line
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: 'power2.inOut' },
        0.3
      )
    }

    return () => tl.kill()
  }, [currentScene])

  // Transition out when progress reaches 100
  useEffect(() => {
    if (progress < 100) return

    const timer = setTimeout(() => {
      const container = containerRef.current
      if (!container) return

      gsap.to(container, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setScene('hero')
        },
      })
    }, 400) // Small delay after 100% before transitioning

    return () => clearTimeout(timer)
  }, [progress, setScene])

  // Don't render if not in loading state
  if (currentScene !== 'loading') return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-loading, 10000)',
        background: '#0F0F1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Text Reveal */}
      <div style={{ textAlign: 'center' }}>
        <p
          ref={(el) => { textRefs.current[0] = el }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-small)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Crafting experience
        </p>
        <h1
          ref={(el) => { textRefs.current[1] = el }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Portfolio
        </h1>
        <p
          ref={(el) => { textRefs.current[2] = el }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-primary)',
            marginTop: '0.5rem',
          }}
        >
          Interactive 3D Experience
        </p>
      </div>

      {/* Progress Line */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'var(--color-surface)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-neon))',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Progress Number */}
      <p
        ref={(el) => { textRefs.current[3] = el }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-small)',
          color: 'var(--color-text-muted)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {progress}%
      </p>
    </div>
  )
}
