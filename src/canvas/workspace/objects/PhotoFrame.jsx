/**
 * PhotoFrame.jsx — About section gateway
 * Hover: parallax breathing (subtle position oscillation)
 * Click: frame scales up + floats forward
 */

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function PhotoFrame({ position = [2.5, 2.2, -2] }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Parallax breathing on hover
  useFrame((state) => {
    if (!groupRef.current || !hovered || expanded) return
    const t = state.clock.elapsedTime
    groupRef.current.position.x = position[0] + Math.sin(t * 1.2) * 0.03
    groupRef.current.position.y = position[1] + Math.sin(t * 0.8 + 1) * 0.02
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    if (groupRef.current && !expanded) {
      gsap.to(groupRef.current.scale, {
        x: 1.05, y: 1.05, z: 1.05,
        duration: 0.4, ease: 'power2.out',
      })
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (groupRef.current && !expanded) {
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.5, ease: 'elastic.out(1, 0.6)',
      })
      gsap.to(groupRef.current.position, {
        x: position[0], y: position[1],
        duration: 0.4, ease: 'power2.out',
      })
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    const newExpanded = !expanded
    setExpanded(newExpanded)
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: newExpanded ? 1.4 : 1,
        y: newExpanded ? 1.4 : 1,
        z: newExpanded ? 1.4 : 1,
        duration: 0.6, ease: newExpanded ? 'back.out(1.7)' : 'power2.inOut',
      })
      gsap.to(groupRef.current.position, {
        z: newExpanded ? position[2] + 2 : position[2],
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
      {/* Frame border */}
      <mesh>
        <boxGeometry args={[1.0, 1.2, 0.06]} />
        <meshStandardMaterial color="#8B7355" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Photo area (inner) */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.8, 1.0]} />
        <meshStandardMaterial
          color="#4ECDC4"
          emissive="#4ECDC4"
          emissiveIntensity={hovered ? 0.15 : 0.05}
          metalness={0}
          roughness={0.9}
        />
      </mesh>

      {/* Inner frame accent line */}
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.85, 1.05]} />
        <meshStandardMaterial color="#6B5B45" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  )
}
