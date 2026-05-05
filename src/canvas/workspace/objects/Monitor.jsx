/**
 * Monitor.jsx — Primary workspace object
 * Hover: screen grid pattern animates
 * Click: scale up + glow (Phase 8 will connect to Projects section)
 * Bloom: YES (screen emissive)
 */

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import gsap from 'gsap'
import { lerp } from '@utils/math'

export default function Monitor({ position = [0, 2.3, -2] }) {
  const groupRef = useRef()
  const screenRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Screen glow pulse + hover boost
  useFrame((state) => {
    if (!screenRef.current?.material) return
    const t = state.clock.elapsedTime
    const mat = screenRef.current.material
    const target = hovered ? 0.9 : 0.4 + Math.sin(t * 1.5) * 0.15
    mat.emissiveIntensity = lerp(mat.emissiveIntensity, target, 0.08)
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'none'
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1.05, y: 1.05, z: 1.05,
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

  const handleClick = (e) => {
    e.stopPropagation()
    setClicked(!clicked)
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        z: clicked ? position[2] : position[2] + 1,
        duration: 0.6, ease: 'power2.out',
      })
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* Monitor body */}
      <RoundedBox args={[2.8, 1.8, 0.1]} radius={0.04}>
        <meshStandardMaterial color="#1A1A2E" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* Screen (emissive — bloom target) */}
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial
          color={hovered ? '#22D3EE' : '#7C5CFC'}
          emissive={hovered ? '#22D3EE' : '#7C5CFC'}
          emissiveIntensity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Screen content lines (mini UI preview) */}
      {hovered && (
        <group position={[0, 0, 0.07]}>
          {[-0.4, -0.1, 0.2, 0.5].map((y, i) => (
            <mesh key={i} position={[-0.3 + i * 0.15, y, 0]}>
              <planeGeometry args={[0.6 + Math.random() * 0.8, 0.04]} />
              <meshBasicMaterial color="#F0F0F5" transparent opacity={0.3 + i * 0.1} />
            </mesh>
          ))}
        </group>
      )}

      {/* Stand neck */}
      <mesh position={[0, -1.15, 0.1]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#2A2A3E" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -1.45, 0.3]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <meshStandardMaterial color="#2A2A3E" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
