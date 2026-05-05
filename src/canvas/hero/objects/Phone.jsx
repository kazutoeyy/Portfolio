/**
 * Phone.jsx — Responsive UX showcase
 * Procedural geometry (no GLB)
 * Screen: glows on hover, bloom on active
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useFocusState from '@hooks/useFocusState'

export default function Phone({ position, config, index }) {
  const groupRef = useRef()
  const screenRef = useRef()

  useFloatingMotion(groupRef, { index, amplitude: 0.2 })

  const { bind, hovered } = useHoverInteraction('phone', {
    scale: 1.2,
    groupRef,
  })

  useFocusState('phone', groupRef)

  // Screen glow animation
  useFrame((state) => {
    if (!screenRef.current) return
    const t = state.clock.elapsedTime
    const baseEmissive = hovered ? 0.6 : 0.15
    screenRef.current.material.emissiveIntensity = baseEmissive + Math.sin(t * 1.5) * 0.08
  })

  return (
    <group
      ref={groupRef}
      position={position}
      scale={config.scale}
      rotation={[0, 0, 0.1]} // Slight tilt
      {...bind}
    >
      {/* Phone body */}
      <RoundedBox args={[0.75, 1.5, 0.08]} radius={0.06}>
        <meshStandardMaterial color="#1A1A2E" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.05, 0.045]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial
          color={hovered ? '#7C5CFC' : '#2A2A3E'}
          emissive={hovered ? '#7C5CFC' : '#22D3EE'}
          emissiveIntensity={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Camera notch */}
      <mesh position={[0, 0.62, 0.045]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#0F0F1A" />
      </mesh>

      {/* Home indicator */}
      <mesh position={[0, -0.58, 0.045]}>
        <planeGeometry args={[0.2, 0.02]} />
        <meshStandardMaterial color="#3A3A4E" />
      </mesh>
    </group>
  )
}
