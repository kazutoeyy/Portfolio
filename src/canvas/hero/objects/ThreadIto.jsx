import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function ThreadIto({ position }) {
  const meshRef = useRef(null)
  const pointLightRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Generate a smooth curve for the thread
  const curve = useMemo(() => {
    const points = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      points.push(new THREE.Vector3(
        Math.sin(t * Math.PI * 2) * 1.5,
        (t - 0.5) * 4,
        Math.cos(t * Math.PI * 3) * 1.5
      ))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const endPoint = useMemo(() => curve.getPoint(1), [curve])

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.transparent = true
      meshRef.current.material.opacity = 0

      gsap.fromTo(meshRef.current.position,
        { x: position[0] - 0.5 },
        { x: position[0], duration: 0.8, ease: 'power2.out', delay: 1.2 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0.85, y: 0.85, z: 0.85 },
        { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      )
      gsap.to(meshRef.current.material, {
        opacity: 0.6, duration: 0.8, ease: 'power2.out', delay: 1.2
      })
    }
  }, [position])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
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
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <meshStandardMaterial 
        color="#C0392B"
        roughness={0.4}
        metalness={0.2}
        emissive="#8B3A2A"
        emissiveIntensity={0.2}
        transparent={true}
      />
      <pointLight 
        ref={pointLightRef}
        position={endPoint} 
        color="#8B3A2A" 
        intensity={0.4} 
        distance={1.5} 
        decay={2} 
      />
    </mesh>
  )
}
