/**
 * HeroClickHint.jsx — "Click it" text + arrow pointing at laptop
 * Animated pulse (scale 1 ↔ 1.05), appears after short delay
 */

import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import gsap from 'gsap'

export default function HeroClickHint() {
  const containerRef = useRef()
  const arrowRef = useRef()

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ delay: 1.2 })

    // Fade in
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    // Continuous pulse on arrow
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 6,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })
    }

    // Subtle scale pulse on text
    gsap.to(containerRef.current, {
      scale: 1.03,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    })

    return () => tl.kill()
  }, [])

  return (
    <Html
      center
      position={[0, 1.5, 0]}
      style={{ pointerEvents: 'none', textAlign: 'center' }}
      zIndexRange={[50, 0]}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#E8E8E8',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Click it
        </span>
        <svg
          ref={arrowRef}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ opacity: 0.7 }}
        >
          <path
            d="M10 3 L10 15 M5 11 L10 16 L15 11"
            stroke="#E54B2D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Html>
  )
}
