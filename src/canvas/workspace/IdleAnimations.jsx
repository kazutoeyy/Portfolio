/**
 * IdleAnimations.jsx — Workspace idle life
 * "Room phải sống" — objects có subtle motion khi không interact
 * 
 * Uses useFrame (R3F responsibility for continuous animation)
 * Receives refs from WorkspaceScene and animates them
 */

import { useFrame } from '@react-three/fiber'

/**
 * @param {object} refs - Object containing refs to animated elements
 * @param {import('react').RefObject} refs.lampArm - Desk lamp arm group
 * @param {import('react').RefObject} refs.monitorScreen - Monitor screen mesh
 * @param {import('react').RefObject} refs.windowPane - Window pane mesh
 */
export default function IdleAnimations({ lampArmRef, monitorScreenRef, windowPaneRef }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Lamp arm sway — subtle pendulum oscillation
    if (lampArmRef?.current) {
      lampArmRef.current.rotation.z = Math.sin(t * 0.5) * 0.02
      lampArmRef.current.rotation.x = Math.sin(t * 0.3 + 1) * 0.015
    }

    // Monitor screen glow pulse — breathing emissive
    if (monitorScreenRef?.current?.material) {
      const mat = monitorScreenRef.current.material
      mat.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.15
    }

    // Window light subtle flicker
    if (windowPaneRef?.current?.material) {
      const mat = windowPaneRef.current.material
      mat.emissiveIntensity = 0.3 + Math.sin(t * 0.8 + 2) * 0.1
    }
  })

  return null // Pure animation logic — no visual output
}
