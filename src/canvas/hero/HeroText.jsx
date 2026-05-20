/**
 * HeroText.jsx — Name + Tagline overlay
 * HTML overlay with parallax effect + GSAP text reveal
 */

import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function HeroText() {
  const groupRef = useRef()
  const nameRef = useRef()
  const taglineRef = useRef()

  // Parallax: subtle movement based on mouse
  useFrame((state) => {
    if (!groupRef.current) return
    const { pointer } = state
    groupRef.current.position.x = pointer.x * 0.3
    groupRef.current.position.y = pointer.y * 0.15
  })

  // Text reveal animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    if (nameRef.current) {
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      )
    }

    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        `-=${0.6}`
      )
    }

    return () => tl.kill()
  }, [])

  return (
    <group ref={groupRef}>
      <Html
        center
        position={[0, 2.5, 0]}
        style={{ pointerEvents: 'none', width: '100vw', textAlign: 'center' }}
        zIndexRange={[50, 0]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <h1
            ref={nameRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 700,
              color: '#E8E8E8',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: 0,
              opacity: 0,
            }}
          >
            Gia Huy<span style={{ color: '#E54B2D' }}>.</span>
          </h1>
          <p
            ref={taglineRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: '#6B6B6B',
              margin: 0,
              opacity: 0,
              letterSpacing: '0.05em',
            }}
          >
            Backend Engineer · Building Scalable Systems
          </p>
        </div>
      </Html>
    </group>
  )
}
