/**
 * useOrbitalSystem.js — Position objects in orbital pattern around center
 * Returns initial positions based on orbit radius and angle
 */

import { useMemo } from 'react'
import { FLOATING_OBJECTS } from '../utils/constants'

/**
 * Calculate orbital positions for floating objects
 * @returns {Array<{id: string, position: [number, number, number], config: object}>}
 */
export default function useOrbitalSystem() {
  const orbitalPositions = useMemo(() => {
    return FLOATING_OBJECTS.map((obj, i) => {
      // Laptop stays at center
      if (obj.orbitRadius === 0) {
        return { id: obj.id, position: [0, 0, 0], config: obj }
      }

      // Distribute objects evenly around the orbit
      const angle = (i / (FLOATING_OBJECTS.length - 1)) * Math.PI * 2
      const x = Math.cos(angle) * obj.orbitRadius
      const y = Math.sin(angle * 0.5) * (obj.orbitRadius * 0.3) // Slight vertical variance
      const z = Math.sin(angle) * (obj.orbitRadius * 0.4) // Depth variance

      return { id: obj.id, position: [x, y, z], config: obj }
    })
  }, [])

  return orbitalPositions
}
