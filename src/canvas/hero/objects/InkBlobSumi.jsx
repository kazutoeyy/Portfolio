import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import gsap from 'gsap'

export default function InkBlobSumi({ position }) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.transparent = true
      meshRef.current.material.opacity = 0

      gsap.fromTo(meshRef.current.position,
        { y: position[1] - 0.3 },
        { y: position[1], duration: 0.7, ease: 'power2.out', delay: 1.8 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0.9, y: 0.9, z: 0.9 },
        { x: 1, y: 1, z: 1, duration: 0.7, ease: 'power2.out', delay: 1.8 }
      )
      gsap.to(meshRef.current.material, {
        opacity: 0.55, duration: 0.7, ease: 'power2.out', delay: 1.8
      })
    }
  }, [position])

  useFrame(() => {
    if (meshRef.current?.material) {
      const maxOpacity = hovered ? 0.85 : 0.7
      if (meshRef.current.material.opacity > maxOpacity) {
        meshRef.current.material.opacity = maxOpacity
      }
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    gsap.to(meshRef.current.material, { opacity: 0.85, duration: 0.3, overwrite: 'auto' })
  }
  const handlePointerOut = () => {
    setHovered(false)
    gsap.to(meshRef.current.material, { opacity: 0.55, duration: 0.3, overwrite: 'auto' })
  }

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[1.2, 64, 64]} />
      <MeshDistortMaterial
        color="#050505"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={0.5}
        transparent={true}
      />
    </mesh>
  )
}
