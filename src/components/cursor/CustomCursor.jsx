/**
 * CustomCursor.jsx — 2D Canvas cursor with GSAP animation
 * States: default (dot+ring), hover (ring expand+glow), click (pulse), text (morph)
 * Accessibility: disabled when prefers-reduced-motion
 */

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import useInteractionStore from '../../stores/useInteractionStore'
import useReducedMotion from '../../hooks/useReducedMotion'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const prefersReduced = useReducedMotion()

  const cursorState = useInteractionStore((s) => s.cursorState)

  // Track mouse position
  const handleMouseMove = useCallback((e) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

  // Smooth follow via GSAP quickTo
  useEffect(() => {
    if (prefersReduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' })

    let glowX, glowY
    if (glow) {
      glowX = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power2.out' })
      glowY = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power2.out' })
    }

    const onMove = (e) => {
      handleMouseMove(e)
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      if (glowX) glowX(e.clientX)
      if (glowY) glowY(e.clientY)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [prefersReduced, handleMouseMove])

  // Cursor state animations
  useEffect(() => {
    if (prefersReduced) return
    const ring = ringRef.current
    const glow = glowRef.current
    if (!ring) return

    switch (cursorState) {
      case 'hover':
        gsap.to(ring, { scale: 1.8, borderColor: '#22D3EE', duration: 0.3, ease: 'power2.out' })
        if (glow) gsap.to(glow, { opacity: 0.4, scale: 1.5, duration: 0.3 })
        break
      case 'click':
        gsap.timeline()
          .to(ring, { scale: 0.8, duration: 0.1, ease: 'power2.in' })
          .to(ring, { scale: 1.4, duration: 0.4, ease: 'elastic.out(1, 0.3)' })
        break
      case 'text':
        gsap.to(ring, { scale: 2.2, borderColor: '#7C5CFC', opacity: 0.5, duration: 0.3 })
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.2 })
        break
      default:
        gsap.to(ring, { scale: 1, borderColor: 'rgba(240,240,245,0.4)', opacity: 1, duration: 0.3, ease: 'power2.out' })
        if (glow) gsap.to(glow, { opacity: 0, scale: 1, duration: 0.3 })
        break
    }
  }, [cursorState, prefersReduced])

  // Click pulse effect
  useEffect(() => {
    if (prefersReduced) return
    const ring = ringRef.current
    if (!ring) return

    const handleClick = () => {
      gsap.timeline()
        .to(ring, { scale: 0.6, duration: 0.08 })
        .to(ring, { scale: 1.6, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
        .to(ring, { scale: 1, duration: 0.2 }, '-=0.1')
    }

    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [prefersReduced])

  // Don't render custom cursor when reduced motion preferred
  if (prefersReduced) return null

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Glow effect - behind ring */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(240,240,245,0.4)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#F0F0F5',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
