/**
 * RoomLighting.jsx — Workspace scene lighting
 * Theme-aware: dark = warm lamp dominant, light = window dominant
 * 
 * Lights:
 * - Desk Lamp SpotLight (warm yellow, illuminates desk)
 * - Monitor glow PointLight (purple, near screen)
 * - Window RectAreaLight (cool blue, from window)
 * - Key DirectionalLight + Ambient
 */

import { useRef } from 'react'
import useThemeStore from '@stores/useThemeStore'
import { LIGHTING } from '@utils/constants'

export default function RoomLighting({ lampRef }) {
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const intensityMultiplier = isDark ? 1.0 : 1.3
  const ambientIntensity = isDark ? LIGHTING.workspace.ambient.intensity : 0.5

  return (
    <group>
      {/* Ambient */}
      <ambientLight intensity={ambientIntensity} />

      {/* Key Light — overall scene illumination */}
      <directionalLight
        position={LIGHTING.workspace.key.position}
        intensity={LIGHTING.workspace.key.intensity * intensityMultiplier}
        color={LIGHTING.workspace.key.color}
        castShadow={false}
      />

      {/* Desk Lamp SpotLight — warm, illuminates desk area */}
      <spotLight
        ref={lampRef}
        position={[1.8, 3.5, 1.5]}
        target-position={[0, 1, 0]}
        intensity={isDark ? LIGHTING.workspace.deskLamp.intensity : 0.2}
        color={LIGHTING.workspace.deskLamp.color}
        angle={LIGHTING.workspace.deskLamp.angle}
        penumbra={0.5}
        distance={10}
        decay={2}
      />

      {/* Monitor Glow — purple ambient near screen */}
      <pointLight
        position={[0, 2.5, -1.5]}
        intensity={LIGHTING.workspace.monitorGlow.intensity * intensityMultiplier}
        color={LIGHTING.workspace.monitorGlow.color}
        distance={5}
        decay={2}
      />

      {/* Rim Light — cyan accent from behind */}
      <pointLight
        position={LIGHTING.workspace.rim.position}
        intensity={LIGHTING.workspace.rim.intensity * intensityMultiplier}
        color={LIGHTING.workspace.rim.color}
        distance={8}
        decay={2}
      />

      {/* Window Light — cool blue, simulates outside light */}
      <pointLight
        position={[0, 3.5, -3]}
        intensity={isDark ? LIGHTING.workspace.windowLight.intensity : LIGHTING.workspace.windowLight.intensity * 2}
        color={isDark ? 0x4466AA : 0x87CEEB}
        distance={8}
        decay={2}
      />
    </group>
  )
}
