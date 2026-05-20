/**
 * MagneticCollapse.jsx — Objects attracted toward laptop center
 * "Signature moment" animation: all floating objects are magnetically
 * pulled toward the laptop (center) during hero→workspace transition
 * 
 * Uses GSAP for orchestrated multi-object animation with
 * per-object trajectories and timing offsets.
 */

import { useRef, useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useSceneStore from '@stores/useSceneStore'
import { TIMING } from '@utils/constants'

export default function MagneticCollapse() {
  const { scene } = useThree()
  const timelineRef = useRef(null)
  const savedPositions = useRef(new Map())

  /**
   * Find all floating objects in the scene by traversing
   * the scene graph and matching object names/userData
   */
  const getFloatingObjects = useCallback(() => {
    // No floating objects in current hero scene (laptop only)
    return []
  }, [scene])

  /**
   * Collapse animation: pull all objects toward center [0,0,0]
   * Each object has unique trajectory arc and timing
   */
  const startCollapse = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill()

    // Find the HeroScene group — it should be the first group child of the scene
    let heroGroup = null
    scene.traverse((child) => {
      if (child.isGroup && child.children.length > 0) {
        // Look for the FloatingSystem group (has 6 child groups)
        const floatingGroup = child.children.find(c => 
          c.isGroup && c.children.length >= 5
        )
        if (floatingGroup && !heroGroup) {
          heroGroup = floatingGroup
        }
      }
    })

    if (!heroGroup) return

    // Save original positions and animate each object
    const tl = gsap.timeline()
    timelineRef.current = tl

    heroGroup.children.forEach((objectGroup, i) => {
      if (!objectGroup.isGroup) return

      // Save original position for reverse
      savedPositions.current.set(i, {
        x: objectGroup.position.x,
        y: objectGroup.position.y,
        z: objectGroup.position.z,
        scaleX: objectGroup.scale.x,
        scaleY: objectGroup.scale.y,
        scaleZ: objectGroup.scale.z,
      })

      // Staggered delay per object
      const delay = i * 0.06

      // Magnetic pull toward center with slight arc
      tl.to(objectGroup.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: TIMING.magneticCollapse / 1000,
        ease: 'power3.in',
      }, delay)

      // Scale down as they approach
      tl.to(objectGroup.scale, {
        x: 0.1,
        y: 0.1,
        z: 0.1,
        duration: TIMING.magneticCollapse / 1000,
        ease: 'power2.in',
      }, delay)

      // Spin during collapse
      tl.to(objectGroup.rotation, {
        x: objectGroup.rotation.x + Math.PI * (1 + Math.random()),
        y: objectGroup.rotation.y + Math.PI * 2 * (0.5 + Math.random()),
        duration: TIMING.magneticCollapse / 1000,
        ease: 'power2.in',
      }, delay)
    })
  }, [scene])

  /**
   * Reverse collapse: objects fly back to original orbital positions
   */
  const reverseCollapse = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill()

    let heroGroup = null
    scene.traverse((child) => {
      if (child.isGroup && child.children.length > 0) {
        const floatingGroup = child.children.find(c => 
          c.isGroup && c.children.length >= 5
        )
        if (floatingGroup && !heroGroup) {
          heroGroup = floatingGroup
        }
      }
    })

    if (!heroGroup) return

    const tl = gsap.timeline()
    timelineRef.current = tl

    heroGroup.children.forEach((objectGroup, i) => {
      if (!objectGroup.isGroup) return

      const saved = savedPositions.current.get(i)
      if (!saved) return

      const delay = i * 0.05

      // Fly back to original position
      tl.to(objectGroup.position, {
        x: saved.x,
        y: saved.y,
        z: saved.z,
        duration: 0.8,
        ease: 'elastic.out(1, 0.6)',
      }, delay)

      // Restore scale
      tl.to(objectGroup.scale, {
        x: saved.scaleX,
        y: saved.scaleY,
        z: saved.scaleZ,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, delay)

      // Reset rotation smoothly
      tl.to(objectGroup.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, delay)
    })
  }, [scene])

  // Listen for transition events
  useEffect(() => {
    const handleCollapse = () => startCollapse()
    const handleReverse = () => reverseCollapse()

    window.addEventListener('hero-to-workspace', handleCollapse)
    window.addEventListener('workspace-to-hero', handleReverse)

    return () => {
      window.removeEventListener('hero-to-workspace', handleCollapse)
      window.removeEventListener('workspace-to-hero', handleReverse)
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [startCollapse, reverseCollapse])

  return null // Visual-only through scene manipulation
}
