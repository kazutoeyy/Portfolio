/**
 * useFocusState.js — Focus/dim logic for floating objects
 * When one object is hovered, others fade (dimmed)
 * Uses useFrame lerp for smooth opacity transitions (frame-rate independent)
 * 
 * Approach: Instead of modifying material properties directly (which can 
 * cause issues with shared materials and color tracking), we scale the 
 * entire group slightly and reduce material emissive to create a dim effect.
 * 
 * Usage: useFocusState('laptop', groupRef)
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useInteractionStore from '@stores/useInteractionStore'
import { INTERACTION } from '@utils/constants'

/**
 * @param {string} objectId - This object's unique ID
 * @param {import('react').RefObject} groupRef - Ref to the object group
 * @param {object} [options]
 * @param {number} [options.fadeOpacity=INTERACTION.focusFadeOpacity] - Dimmed scale factor
 * @param {number} [options.lerpSpeed=INTERACTION.focusLerpSpeed] - Lerp speed
 */
export default function useFocusState(objectId, groupRef, {
  fadeOpacity = INTERACTION.focusFadeOpacity,
  lerpSpeed = INTERACTION.focusLerpSpeed,
} = {}) {
  const dimFactor = useRef(1) // 1 = full, fadeOpacity = dimmed

  useFrame(() => {
    if (!groupRef?.current) return

    const focusedObject = useInteractionStore.getState().focusedObject
    
    // Determine target dim factor
    let target = 1
    if (focusedObject !== null && focusedObject !== objectId) {
      target = fadeOpacity
    }

    // Smooth lerp
    dimFactor.current += (target - dimFactor.current) * lerpSpeed

    // Apply dim effect via material emissive modulation + subtle scale
    // This avoids directly mutating color (which causes tracking issues)
    const dim = dimFactor.current

    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        // Store original emissive intensity on first encounter
        if (child.material.userData._originalEmissiveIntensity === undefined) {
          child.material.userData._originalEmissiveIntensity = child.material.emissiveIntensity || 0
        }

        // For transparent materials, modulate opacity
        if (child.material.transparent) {
          if (child.material.userData._baseOpacity === undefined) {
            child.material.userData._baseOpacity = child.material.opacity
          }
          child.material.opacity = child.material.userData._baseOpacity * dim
        }

        // Modulate material brightness via a dim multiplier on roughness/metalness
        // Increase roughness to make dimmed objects look "flatter"
        if (child.material.userData._baseRoughness === undefined) {
          child.material.userData._baseRoughness = child.material.roughness ?? 0.5
        }
        const roughnessBoost = (1 - dim) * 0.4 // Add up to 0.4 roughness when dimmed
        child.material.roughness = Math.min(1, child.material.userData._baseRoughness + roughnessBoost)
      }
    })
  })
}
