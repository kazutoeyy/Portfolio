/**
 * HeroHint.jsx — Invisible CTA hint
 * Appears after ~1s delay, subtle pulse animation
 * Guides user to click laptop
 */

import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import gsap from 'gsap'
import { TIMING } from '@utils/constants'

export default function HeroHint() {
  const hintRef = useRef()

  useEffect(() => {
    if (!hintRef.current) return

    const tl = gsap.timeline({ delay: TIMING.ctaHintDelay / 1000 })

    // Fade in
    tl.fromTo(
      hintRef.current,
      { opacity: 0, y: 10 },
      { opacity: 0.5, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    // Subtle continuous pulse
    tl.to(hintRef.current, {
      opacity: 0.35,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => tl.kill()
  }, [])

  return (
    <Html
      center
      position={[0, -1.8, 0]}
      style={{ pointerEvents: 'none', textAlign: 'center' }}
      zIndexRange={[50, 0]}
    >
      <p
        ref={hintRef}
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '0.85rem',
          color: '#8B8BA3',
          opacity: 0,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Click the laptop to explore
      </p>
    </Html>
  )
}
