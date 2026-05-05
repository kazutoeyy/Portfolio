/**
 * RoomWindow.jsx — Background element
 * Procedural: Box frame + Plane "glass"
 * Dynamic day/night appearance based on theme
 * Subtle color shift animation (idle)
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useThemeStore from '@stores/useThemeStore'

export default function RoomWindow({ position = [0, 2.8, -3.4] }) {
  const groupRef = useRef()
  const glassRef = useRef()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  // Subtle sky color shift
  useFrame((state) => {
    if (!glassRef.current?.material) return
    const t = state.clock.elapsedTime
    const mat = glassRef.current.material
    mat.emissiveIntensity = isDark
      ? 0.2 + Math.sin(t * 0.4) * 0.08
      : 0.5 + Math.sin(t * 0.3) * 0.1
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Window frame — outer */}
      <mesh>
        <boxGeometry args={[2.0, 1.6, 0.1]} />
        <meshStandardMaterial color="#4A3728" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Frame cross — vertical */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.05, 1.5, 0.08]} />
        <meshStandardMaterial color="#5A4A3A" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Frame cross — horizontal */}
      <mesh position={[0, 0.1, 0.02]}>
        <boxGeometry args={[1.9, 0.05, 0.08]} />
        <meshStandardMaterial color="#5A4A3A" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Glass pane — top left */}
      <mesh ref={glassRef} position={[-0.47, 0.45, 0.04]}>
        <planeGeometry args={[0.85, 0.6]} />
        <meshStandardMaterial
          color={isDark ? '#0A0A2E' : '#87CEEB'}
          emissive={isDark ? '#1A1A4E' : '#B0D8F0'}
          emissiveIntensity={isDark ? 0.2 : 0.5}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>

      {/* Glass pane — top right */}
      <mesh position={[0.47, 0.45, 0.04]}>
        <planeGeometry args={[0.85, 0.6]} />
        <meshStandardMaterial
          color={isDark ? '#0D0D35' : '#90C8E0'}
          emissive={isDark ? '#181848' : '#A5D0E8'}
          emissiveIntensity={isDark ? 0.15 : 0.4}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>

      {/* Glass pane — bottom left */}
      <mesh position={[-0.47, -0.35, 0.04]}>
        <planeGeometry args={[0.85, 0.6]} />
        <meshStandardMaterial
          color={isDark ? '#0A0A2E' : '#78B8D8'}
          emissive={isDark ? '#151540' : '#98C8E0'}
          emissiveIntensity={isDark ? 0.18 : 0.45}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>

      {/* Glass pane — bottom right */}
      <mesh position={[0.47, -0.35, 0.04]}>
        <planeGeometry args={[0.85, 0.6]} />
        <meshStandardMaterial
          color={isDark ? '#0B0B30' : '#85C0E0'}
          emissive={isDark ? '#161650' : '#A0D0E5'}
          emissiveIntensity={isDark ? 0.16 : 0.42}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
