/**
 * DeskLamp.jsx — Theme toggle trigger
 * Procedural: Cylinder base + arm + cone shade
 * Click: toggleTheme() → full scene lighting change
 * SpotLight attached to shade illuminates desk
 */

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import useThemeStore from '@stores/useThemeStore'

export default function DeskLamp({ position = [1.8, 1.0, 0.5] }) {
  const groupRef = useRef()
  const armRef = useRef()
  const shadeRef = useRef()
  const bulbRef = useRef()
  const { theme, toggleTheme } = useThemeStore()
  const [hovered, setHovered] = useState(false)
  const isDark = theme === 'dark'

  // Subtle arm sway (idle life)
  useFrame((state) => {
    if (!armRef.current) return
    const t = state.clock.elapsedTime
    armRef.current.rotation.z = Math.sin(t * 0.5) * 0.02
  })

  // Bulb glow
  useFrame(() => {
    if (!bulbRef.current?.material) return
    bulbRef.current.material.emissiveIntensity = isDark
      ? (hovered ? 1.2 : 0.8)
      : (hovered ? 0.4 : 0.1)
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1.08, y: 1.08, z: 1.08,
        duration: 0.3, ease: 'power2.out',
      })
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.4, ease: 'elastic.out(1, 0.5)',
      })
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    toggleTheme()

    // Visual feedback — quick flash
    if (bulbRef.current?.material) {
      gsap.to(bulbRef.current.material, {
        emissiveIntensity: 2,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
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
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.08, 16]} />
        <meshStandardMaterial color="#2A2A3E" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arm — lower */}
      <group ref={armRef} position={[0, 0.04, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 1.0, 8]} />
          <meshStandardMaterial color="#3A3A4E" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Joint */}
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#3A3A4E" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Arm — upper (angled) */}
        <mesh position={[-0.2, 1.3, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
          <meshStandardMaterial color="#3A3A4E" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Shade */}
        <group ref={shadeRef} position={[-0.45, 1.45, 0]} rotation={[0, 0, 0.3]}>
          <mesh>
            <coneGeometry args={[0.2, 0.25, 16, 1, true]} />
            <meshStandardMaterial
              color={isDark ? '#FFE4B5' : '#C0C0C0'}
              metalness={0.4}
              roughness={0.5}
              side={2}
            />
          </mesh>

          {/* Bulb */}
          <mesh ref={bulbRef} position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#FFFAF0"
              emissive={isDark ? '#FFE4B5' : '#FFFAF0'}
              emissiveIntensity={isDark ? 0.8 : 0.1}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
}
