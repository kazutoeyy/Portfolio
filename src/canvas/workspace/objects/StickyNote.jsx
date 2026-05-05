/**
 * StickyNote.jsx — Contact section gateway
 * Procedural: Plane with slight tilt (post-it feel)
 * Hover: shake/vibrate animation
 * Click: scale up + "unfold"
 */

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function StickyNote({ position = [-1.8, 1.5, -1.5] }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [opened, setOpened] = useState(false)

  // Shake on hover
  useFrame((state) => {
    if (!groupRef.current) return
    if (hovered && !opened) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.z = -0.1 + Math.sin(t * 15) * 0.02
      groupRef.current.rotation.x = Math.sin(t * 12 + 1) * 0.015
    }
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    if (groupRef.current && !opened) {
      gsap.to(groupRef.current.scale, {
        x: 1.08, y: 1.08, z: 1.08,
        duration: 0.3, ease: 'power2.out',
      })
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (groupRef.current && !opened) {
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.4, ease: 'elastic.out(1, 0.6)',
      })
      gsap.to(groupRef.current.rotation, {
        z: -0.1, x: 0,
        duration: 0.3, ease: 'power2.out',
      })
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    const newOpened = !opened
    setOpened(newOpened)
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: newOpened ? 1.6 : 1,
        y: newOpened ? 1.6 : 1,
        z: newOpened ? 1.6 : 1,
        duration: 0.5, ease: newOpened ? 'back.out(1.7)' : 'power2.inOut',
      })
      gsap.to(groupRef.current.position, {
        z: newOpened ? position[2] + 2 : position[2],
        y: newOpened ? position[1] + 0.5 : position[1],
        duration: 0.5, ease: 'power2.out',
      })
      gsap.to(groupRef.current.rotation, {
        z: newOpened ? 0 : -0.1,
        x: 0,
        duration: 0.4, ease: 'power2.out',
      })
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, 0, -0.1]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* Note body */}
      <mesh>
        <planeGeometry args={[0.7, 0.7]} />
        <meshStandardMaterial
          color="#FFE066"
          emissive="#FFE066"
          emissiveIntensity={hovered ? 0.15 : 0}
          metalness={0}
          roughness={0.95}
          side={2}
        />
      </mesh>

      {/* Fold corner effect */}
      <mesh position={[0.3, 0.3, 0.01]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshStandardMaterial
          color="#E6C84D"
          metalness={0}
          roughness={0.95}
          side={2}
        />
      </mesh>

      {/* "Handwriting" lines when opened */}
      {opened && (
        <group position={[0, 0, 0.01]}>
          {[-0.15, -0.05, 0.05, 0.15].map((y, i) => (
            <mesh key={i} position={[-0.05, y, 0]}>
              <planeGeometry args={[0.35 + i * 0.05, 0.015]} />
              <meshBasicMaterial color="#6B5B2A" transparent opacity={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}
