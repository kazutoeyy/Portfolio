/**
 * Monitor.jsx — Primary workspace object
 * Shows "SCROLL ↓ DOWN" hint on screen
 * Hover: screen glow increases
 */

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import gsap from 'gsap'
import { lerp } from '@utils/math'

export default function Monitor({ position = [0, 1.85, -1.8] }) {
  const groupRef = useRef()
  const screenRef = useRef()
  const arrowRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Screen glow pulse + arrow bounce
  useFrame((state) => {
    if (screenRef.current?.material) {
      const t = state.clock.elapsedTime
      const target = hovered ? 0.7 : 0.3 + Math.sin(t * 1.5) * 0.1
      screenRef.current.material.emissiveIntensity = lerp(
        screenRef.current.material.emissiveIntensity, target, 0.08
      )
    }
    // Arrow bounce
    if (arrowRef.current) {
      const t = state.clock.elapsedTime
      arrowRef.current.position.y = -0.05 + Math.sin(t * 2) * 0.06
    }
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1.03, y: 1.03, z: 1.03,
        duration: 0.4, ease: 'back.out(1.7)',
      })
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.5, ease: 'elastic.out(1, 0.5)',
      })
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Monitor body */}
      <RoundedBox args={[2.8, 1.8, 0.1]} radius={0.04}>
        <meshStandardMaterial color="#141414" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* Screen (emissive — bloom target) */}
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial
          color={hovered ? '#3B82F6' : '#E54B2D'}
          emissive={hovered ? '#3B82F6' : '#E54B2D'}
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Scroll hint: bouncing arrow (mesh only — no font dependency) */}
      <group position={[0, 0, 0.07]}>
        {/* Arrow (triangle mesh pointing down) */}
        <group ref={arrowRef} position={[0, -0.05, 0]}>
          <mesh rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.08, 0.15, 3]} />
            <meshBasicMaterial color="#E8E8E8" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Decorative lines flanking the arrow */}
        <mesh position={[-0.25, 0, 0]}>
          <planeGeometry args={[0.2, 0.02]} />
          <meshBasicMaterial color="#E8E8E8" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <planeGeometry args={[0.2, 0.02]} />
          <meshBasicMaterial color="#E8E8E8" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Stand neck */}
      <mesh position={[0, -1.15, 0.1]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -1.45, 0.3]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
