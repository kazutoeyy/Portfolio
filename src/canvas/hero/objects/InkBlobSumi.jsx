import { useRef, useEffect } from 'react'
import { MeshDistortMaterial } from '@react-three/drei'
import gsap from 'gsap'

export default function InkBlobSumi({ position }) {
  const meshRef = useRef(null)

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(meshRef.current.position,
        { y: position[1] - 4 },
        { y: position[1], duration: 2.5, ease: 'power3.out', delay: 1.4 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 2, ease: 'power2.out', delay: 1.4 }
      )
    }
  }, [position])

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <MeshDistortMaterial
        color="#050505"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={0.5}
      />
    </mesh>
  )
}
