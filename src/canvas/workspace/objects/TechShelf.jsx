/**
 * TechShelf.jsx — Skills section gateway
 * Procedural: shelf + small tech-like shapes
 * Hover: individual item highlights
 * Click: items spread outward (explode view)
 */

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

const TECH_ITEMS = [
  { shape: 'box', color: '#7C5CFC', size: [0.2, 0.2, 0.2], pos: [-0.4, 0.15, 0] },
  { shape: 'sphere', color: '#FF6B9D', size: [0.12], pos: [-0.1, 0.15, 0] },
  { shape: 'box', color: '#4ECDC4', size: [0.15, 0.25, 0.15], pos: [0.15, 0.17, 0] },
  { shape: 'cylinder', color: '#22D3EE', size: [0.08, 0.08, 0.2, 8], pos: [0.4, 0.15, 0] },
  { shape: 'box', color: '#FFE4B5', size: [0.18, 0.12, 0.18], pos: [-0.25, 0.12, 0.15] },
  { shape: 'sphere', color: '#FF6B9D', size: [0.09], pos: [0.25, 0.12, 0.15] },
]

function TechItem({ shape, color, size, pos, exploded, index }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Subtle idle rotation
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.3 + index * 0.5
  })

  const explodedPos = useMemo(() => [
    pos[0] * 3,
    pos[1] * 2 + 0.5,
    pos[2] + (index % 2 === 0 ? 1.5 : -0.5),
  ], [pos, index])

  // Animate position when exploded
  const targetPos = exploded ? explodedPos : pos

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.position.x += (targetPos[0] - meshRef.current.position.x) * 0.08
    meshRef.current.position.y += (targetPos[1] - meshRef.current.position.y) * 0.08
    meshRef.current.position.z += (targetPos[2] - meshRef.current.position.z) * 0.08
  })

  return (
    <mesh
      ref={meshRef}
      position={pos}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerLeave={() => setHovered(false)}
    >
      {shape === 'box' && <boxGeometry args={size} />}
      {shape === 'sphere' && <sphereGeometry args={size} />}
      {shape === 'cylinder' && <cylinderGeometry args={size} />}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.05}
        metalness={0.4}
        roughness={0.5}
      />
    </mesh>
  )
}

export default function TechShelf({ position = [2.2, 1.2, -1] }) {
  const groupRef = useRef()
  const [exploded, setExploded] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setExploded(!exploded)
  }

  return (
    <group ref={groupRef} position={position} onClick={handleClick}>
      {/* Shelf plank */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.5]} />
        <meshStandardMaterial color="#3D2B1F" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Shelf brackets */}
      <mesh position={[-0.5, -0.15, 0.2]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color="#5A4A3A" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0.5, -0.15, 0.2]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color="#5A4A3A" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Tech items */}
      {TECH_ITEMS.map((item, i) => (
        <TechItem key={i} {...item} exploded={exploded} index={i} />
      ))}
    </group>
  )
}
