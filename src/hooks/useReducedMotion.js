/**
 * useReducedMotion — Detect prefers-reduced-motion
 * 
 * Returns true if user prefers reduced motion.
 * Used to:
 * - Disable cursor animations (FR-02.7)
 * - Disable scroll animations
 * - Simplify 3D transitions
 * - Restore default cursor (NFR-04.1)
 */

import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export default function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    // SSR-safe: check if window exists
    if (typeof window === 'undefined') return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)

    const handleChange = (event) => {
      setPrefersReduced(event.matches)
    }

    // Modern API
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReduced
}
