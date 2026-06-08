import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function OrigamiOri({ position }) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.transparent = true
      meshRef.current.material.opacity = 0

      // Only animate rotation Z based on requirements
      gsap.fromTo(meshRef.current.rotation,
        { z: -0.14 },
        { z: 0, duration: 0.9, ease: 'power2.out', delay: 2.4 }
      )
      
      gsap.to(meshRef.current.material, {
        opacity: 0.6, duration: 0.9, ease: 'power2.out', delay: 2.4
      })
    }
  }, [position])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      
      if (meshRef.current.material) {
        const maxOpacity = hovered ? 0.85 : 0.7
        if (meshRef.current.material.opacity > maxOpacity) {
          meshRef.current.material.opacity = maxOpacity
        }
      }
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    gsap.to(meshRef.current.material, { opacity: 0.85, duration: 0.3, overwrite: 'auto' })
  }
  const handlePointerOut = () => {
    setHovered(false)
    gsap.to(meshRef.current.material, { opacity: 0.6, duration: 0.3, overwrite: 'auto' })
  }

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      castShadow 
      receiveShadow
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <icosahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial 
        color="#E8E0D0" 
        roughness={0.8}
        metalness={0.1}
        flatShading={true}
        transparent={true}
      />
    </mesh>
  )
}
