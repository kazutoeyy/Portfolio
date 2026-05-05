/**
 * useHoverInteraction.js — Enhanced hover detection for 3D objects
 * Connects raycasting → InteractionStore → Cursor state
 * Uses GSAP for smooth scale/emissive transitions
 * 
 * Usage: const { bind, hovered } = useHoverInteraction('laptop', { scale: 1.2 })
 */

import { useState, useCallback, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import useInteractionStore from '@stores/useInteractionStore'
import { INTERACTION } from '@utils/constants'
import { lerp } from '@utils/math'

/**
 * @param {string} objectId - Unique object identifier
 * @param {object} options
 * @param {number} [options.scale=INTERACTION.hoverScale] - Target hover scale
 * @param {boolean} [options.emissive=false] - Whether to animate emissive intensity
 * @param {number} [options.emissiveTarget=0.8] - Target emissive intensity on hover
 * @param {import('react').RefObject} [options.meshRef] - Ref to mesh for emissive animation
 * @param {import('react').RefObject} [options.groupRef] - Ref to group for scale animation
 */
export default function useHoverInteraction(objectId, {
  scale: hoverScale = INTERACTION.hoverScale,
  emissive = false,
  emissiveTarget = 0.8,
  meshRef = null,
  groupRef = null,
} = {}) {
  const [hovered, setHovered] = useState(false)
  const isEnabled = useInteractionStore((s) => s.isInteractionEnabled)
  const setHoveredStore = useInteractionStore((s) => s.setHovered)
  const scaleRef = useRef({ current: 1, target: 1 })

  const onPointerEnter = useCallback((e) => {
    if (!isEnabled) return
    e.stopPropagation()
    setHovered(true)
    setHoveredStore(objectId)

    // GSAP scale animation on group
    if (groupRef?.current) {
      gsap.to(groupRef.current.scale, {
        x: hoverScale,
        y: hoverScale,
        z: hoverScale,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
    }

    // GSAP rotation nudge
    if (groupRef?.current) {
      gsap.to(groupRef.current.rotation, {
        y: groupRef.current.rotation.y + 0.1,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }, [isEnabled, objectId, setHoveredStore, hoverScale, groupRef])

  const onPointerLeave = useCallback(() => {
    setHovered(false)
    setHoveredStore(null)

    // Reset scale
    if (groupRef?.current) {
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }
  }, [setHoveredStore, groupRef])

  // Smooth emissive intensity lerp in useFrame
  useFrame((_, delta) => {
    if (!emissive || !meshRef?.current?.material) return
    const mat = meshRef.current.material
    const target = hovered ? emissiveTarget : 0.15
    mat.emissiveIntensity = lerp(mat.emissiveIntensity, target, 1 - Math.pow(0.001, delta))
  })

  // Event handlers bundle
  const bind = {
    onPointerEnter,
    onPointerLeave,
  }

  return { bind, hovered }
}
