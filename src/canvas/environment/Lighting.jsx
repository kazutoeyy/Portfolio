import { useRef } from 'react'
import useThemeStore from '../../stores/useThemeStore'
import useSceneStore from '../../stores/useSceneStore'
import { LIGHTING } from '../../utils/constants'

export default function Lighting() {
  const { theme } = useThemeStore()
  const { currentScene } = useSceneStore()
  const groupRef = useRef()

  // Base intensity based on theme (Light theme is brighter)
  const intensityMultiplier = theme === 'light' ? 1.3 : 1.0
  const ambientIntensity = theme === 'light' ? 0.5 : LIGHTING.hero.ambient.intensity

  // Hero scene lighting
  // Workspace scene lighting will be handled by WorkspaceScene/RoomLighting
  if (currentScene === 'workspace') {
    return null
  }

  return (
    <group ref={groupRef}>
      {/* Ambient */}
      <ambientLight intensity={ambientIntensity} />
      {/* Key Light */}
      <directionalLight 
        position={LIGHTING.hero.key.position} 
        intensity={LIGHTING.hero.key.intensity * intensityMultiplier} 
        color={LIGHTING.hero.key.color} 
      />
      {/* Rim Light */}
      <pointLight 
        position={LIGHTING.hero.rim.position} 
        intensity={LIGHTING.hero.rim.intensity * intensityMultiplier} 
        color={LIGHTING.hero.rim.color} 
      />
      {/* Fill Light */}
      <pointLight 
        position={LIGHTING.hero.fill.position} 
        intensity={LIGHTING.hero.fill.intensity * intensityMultiplier} 
        color={LIGHTING.hero.fill.color} 
      />
    </group>
  )
}
