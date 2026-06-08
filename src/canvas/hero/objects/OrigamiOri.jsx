import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function OrigamiOri({ position }) {
  const meshRef = useRef(null)

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(meshRef.current.position,
        { y: position[1] - 4 },
        { y: position[1], duration: 3.5, ease: 'power3.out', delay: 1.6 }
      )
      gsap.fromTo(meshRef.current.rotation,
        { x: Math.PI, y: 0, z: 0 },
        { x: 0, y: Math.PI * 2, duration: 4, ease: 'power2.out', delay: 1.6 }
      )
      gsap.fromTo(meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 2, ease: 'elastic.out(1, 0.7)', delay: 1.6 }
      )
    }
  }, [position])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial 
        color="#E8E0D0" 
        roughness={0.8}
        metalness={0.1}
        flatShading={true}
      />
    </mesh>
  )
}
