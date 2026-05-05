/**
 * CoffeeCup.jsx — Personality / human touch
 * Procedural geometry with steam effect
 * Bloom: NO, NO strong color — neutral personality object
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useFocusState from '@hooks/useFocusState'

export default function CoffeeCup({ position, config, index }) {
  const groupRef = useRef()
  const steamRef = useRef()

  useFloatingMotion(groupRef, { index, amplitude: 0.15 })

  const { bind, hovered } = useHoverInteraction('coffee', {
    scale: 1.15,
    groupRef,
  })

  useFocusState('coffee', groupRef)

  // Steam animation — opacity pulsing + rising motion, more visible on hover
  useFrame((state) => {
    if (!steamRef.current) return
    const t = state.clock.elapsedTime
    const baseOpacity = hovered ? 0.25 : 0.15
    steamRef.current.material.opacity = baseOpacity + Math.sin(t * 2) * 0.08
    steamRef.current.position.y = 0.85 + Math.sin(t * 1.5) * 0.05
    steamRef.current.scale.x = 1 + Math.sin(t * 0.8) * 0.15
    steamRef.current.scale.z = 1 + Math.cos(t * 0.8) * 0.15
  })

  return (
    <group ref={groupRef} position={position} scale={config.scale} {...bind}>
      {/* Cup body - tapered cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.28, 0.65, 16]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Coffee liquid surface */}
      <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.32, 16]} />
        <meshStandardMaterial color="#3E2723" roughness={0.4} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#D4A574" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Saucer */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.5, 0.48, 0.05, 16]} />
        <meshStandardMaterial color="#E8D5C4" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Steam (subtle sprite) */}
      <mesh ref={steamRef} position={[0, 0.85, 0]}>
        <planeGeometry args={[0.3, 0.5]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
