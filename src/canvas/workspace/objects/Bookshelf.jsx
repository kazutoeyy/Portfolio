/**
 * Bookshelf.jsx — Experience section gateway
 * Procedural: Box frame + individual book meshes
 * Hover: hovered book spine highlights
 * Click: book slides out
 */

import { useRef, useState } from 'react'
import gsap from 'gsap'

const BOOK_COLORS = ['#7C5CFC', '#FF6B9D', '#4ECDC4', '#22D3EE', '#FFE4B5', '#8B7355']

function Book({ position, size, color, index }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [pulledOut, setPulledOut] = useState(false)

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        z: 0.15,
        duration: 0.3, ease: 'power2.out',
      })
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (!pulledOut && meshRef.current) {
      gsap.to(meshRef.current.position, {
        z: 0,
        duration: 0.4, ease: 'elastic.out(1, 0.6)',
      })
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    const newState = !pulledOut
    setPulledOut(newState)
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        z: newState ? 0.5 : 0,
        duration: 0.5,
        ease: newState ? 'back.out(1.7)' : 'power2.inOut',
      })
      gsap.to(meshRef.current.rotation, {
        y: newState ? 0.2 : 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.3 : 0}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  )
}

export default function Bookshelf({ position = [-2.5, 2.2, -2.5] }) {
  const groupRef = useRef()

  // Generate books with varying sizes
  const books = BOOK_COLORS.map((color, i) => ({
    color,
    position: [-0.5 + i * 0.22, 0, 0],
    size: [0.12, 0.6 + Math.random() * 0.3, 0.4],
  }))

  return (
    <group ref={groupRef} position={position}>
      {/* Shelf frame — back */}
      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#3D2B1F" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Shelf — top */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.8, 0.05, 0.5]} />
        <meshStandardMaterial color="#4A3728" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Shelf — bottom */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.8, 0.05, 0.5]} />
        <meshStandardMaterial color="#4A3728" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Shelf — middle */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.04, 0.5]} />
        <meshStandardMaterial color="#4A3728" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Side — left */}
      <mesh position={[-0.9, 0, 0]}>
        <boxGeometry args={[0.05, 1.25, 0.5]} />
        <meshStandardMaterial color="#4A3728" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Side — right */}
      <mesh position={[0.9, 0, 0]}>
        <boxGeometry args={[0.05, 1.25, 0.5]} />
        <meshStandardMaterial color="#4A3728" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Books — top row */}
      <group position={[0, 0.3, 0]}>
        {books.slice(0, 3).map((book, i) => (
          <Book key={`top-${i}`} {...book} index={i} />
        ))}
      </group>

      {/* Books — bottom row */}
      <group position={[0, -0.3, 0]}>
        {books.slice(3).map((book, i) => (
          <Book key={`bot-${i}`} {...book} index={i + 3} />
        ))}
      </group>
    </group>
  )
}
