import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function InkBlobSumi({ position }) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Generate a custom flat blob geometry based on a circle
  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(1.4, 48)
    const positions = geo.attributes.position
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const angle = Math.atan2(y, x)
      const radius = Math.sqrt(x * x + y * y)
      
      // Displace edge vertices — center vertices giữ nguyên
      if (radius > 0.3) {
        const noise = 
          Math.sin(angle * 3.7) * 0.15 +
          Math.sin(angle * 7.2 + 1.3) * 0.08 +
          Math.sin(angle * 11.5 + 2.7) * 0.04
        const newRadius = radius + noise
        positions.setXY(i, Math.cos(angle) * newRadius, Math.sin(angle) * newRadius)
      }
    }
    
    geo.computeVertexNormals()
    return geo
  }, [])

  const positionRef = useRef(position)

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      if (!meshRef.current) return
      
      gsap.fromTo(meshRef.current.position,
        { y: positionRef.current[1] - 0.3 },
        { y: positionRef.current[1], duration: 0.7, ease: 'power2.out', delay: 1.8 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0.85, y: 0.85, z: 0.85 },
        { x: 1, y: 1, z: 1, duration: 0.7, ease: 'power2.out', delay: 1.8 }
      )
      gsap.to(meshRef.current.material, {
        opacity: 0.55, duration: 0.7, ease: 'power2.out', delay: 1.8
      })
    })
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime * 0.15
    const positions = meshRef.current.geometry.attributes.position
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const radius = Math.sqrt(x * x + y * y)
      if (radius > 0.3) {
        const angle = Math.atan2(y, x)
        const noise = Math.sin(angle * 3.7 + time) * 0.02
        const newRadius = radius + noise
        // Clamp để không expand vô tận
        const clampedRadius = Math.min(newRadius, radius * 1.05)
        positions.setXY(i, Math.cos(angle) * clampedRadius, Math.sin(angle) * clampedRadius)
      }
    }
    positions.needsUpdate = true
    
    // Opacity cap
    if (meshRef.current.material) {
      const maxOpacity = hovered ? 0.75 : 0.55
      if (meshRef.current.material.opacity > maxOpacity) {
        meshRef.current.material.opacity = maxOpacity
      }
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    gsap.to(meshRef.current.material, { opacity: 0.75, duration: 0.3, overwrite: 'auto' })
  }
  const handlePointerOut = () => {
    setHovered(false)
    gsap.to(meshRef.current.material, { opacity: 0.55, duration: 0.3, overwrite: 'auto' })
  }

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      rotation={[-Math.PI/2 + 0.3, 0, 0.4]}
      geometry={geometry}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        color="#0A0806"
        roughness={1.0}
        metalness={0}
        transparent={true}
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
