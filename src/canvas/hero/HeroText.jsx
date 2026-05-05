/**
 * HeroText.jsx — Name + Tagline overlay
 * HTML overlay with parallax effect
 * GSAP text reveal animation
 */

import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { TIMING } from '@utils/constants'

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
    const tl = gsap.timeline({ delay: 0.5 })

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
        `-=${0.6}` // overlap with name
      )
    }

    return () => tl.kill()
  }, [])

  return (
    <group ref={groupRef}>
      <Html
        center
        position={[0, 1.8, 0]}
        style={{ pointerEvents: 'none', width: '100vw', textAlign: 'center' }}
        zIndexRange={[50, 0]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <h1
            ref={nameRef}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 600,
              color: '#F0F0F5',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
              opacity: 0,
            }}
          >
            Your Name
          </h1>
          <p
            ref={taglineRef}
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: '#8B8BA3',
              margin: 0,
              opacity: 0,
            }}
          >
            I craft interactive web experiences
          </p>
        </div>
      </Html>
    </group>
  )
}
