/**
 * useFloatingMotion.js — Sin wave + simplex noise for organic floating
 * Used by each floating object in the Hero scene
 * Per-object offset ensures unique movement patterns
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { createNoise2D } from 'simplex-noise'

const noise2D = createNoise2D()

/**
 * @param {import('three').Object3D} ref - mesh/group ref
 * @param {object} options
 * @param {number} options.index - object index for phase offset
 * @param {number} [options.amplitude=0.3] - movement range
 * @param {number} [options.speed=0.3] - base animation speed
 * @param {boolean} [options.enabled=true] - enable/disable motion
 */
export default function useFloatingMotion(ref, { index = 0, amplitude = 0.3, speed = 0.3, enabled = true } = {}) {
  const offset = index * 1.4
  const baseSpeed = speed + index * 0.05
  const initialPos = useRef(null)

  useFrame((state) => {
    if (!enabled || !ref.current) return
    
    // Throttle to ~30fps for floating motion
    if (Math.round(state.clock.elapsedTime * 30) % 2 !== 0) return

    const t = state.clock.elapsedTime

    // Save initial position on first frame
    if (!initialPos.current) {
      initialPos.current = {
        x: ref.current.position.x,
        y: ref.current.position.y,
        z: ref.current.position.z,
      }
    }

    const base = initialPos.current

    // Organic floating motion: sin wave + noise
    const x = base.x + Math.sin(t * baseSpeed + offset) * amplitude
    const y = base.y + Math.sin(t * baseSpeed * 0.7 + offset * 1.3) * (amplitude * 0.65) + noise2D(t * 0.1, index) * (amplitude * 0.3)
    const z = base.z + Math.cos(t * baseSpeed * 0.5 + offset * 0.8) * (amplitude * 0.5)

    ref.current.position.set(x, y, z)

    // Subtle rotation
    ref.current.rotation.x = Math.sin(t * 0.3 + offset) * 0.05
    ref.current.rotation.z = Math.cos(t * 0.25 + offset * 0.5) * 0.03
  })
}
