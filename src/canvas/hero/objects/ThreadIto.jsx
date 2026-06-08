import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function ThreadIto({ position }) {
  const meshRef = useRef(null)

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

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(meshRef.current.position,
        { y: position[1] - 4 },
        { y: position[1], duration: 3, ease: 'power2.out', delay: 1.2 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 2.5, ease: 'power2.out', delay: 1.2 }
      )
    }
  }, [position])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <meshStandardMaterial 
        color="#C0392B"
        roughness={0.4}
        metalness={0.2}
        emissive="#8B3A2A"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
