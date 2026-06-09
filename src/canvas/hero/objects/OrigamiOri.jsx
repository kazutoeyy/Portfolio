import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function OrigamiOri({ position }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Custom origami crane shape
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    
    // Simplified origami crane — 20 faces
    // Body vertices
    const vertices = new Float32Array([
      // Body (center mass)
       0,    0.8,  0,      // apex top
      -0.6,  0,    0.3,   // left wing front
       0.6,  0,    0.3,   // right wing front
      -0.6,  0,   -0.3,   // left wing back
       0.6,  0,   -0.3,   // right wing back
       0,   -0.4,  0,     // body bottom
      // Head/tail
       0.1,  0.7,  0.5,   // head point
      -0.1,  0.7,  0.5,   // head base
       0,   -0.8,  0.2,   // tail point
       0,    0.4,  0.6,   // neck
      // Wing tips
      -1.4,  0.2,  0.1,   // left wing tip
       1.4,  0.2,  0.1,   // right wing tip
      -1.2, -0.1, -0.2,   // left wing lower
       1.2, -0.1, -0.2,   // right wing lower
    ])
    
    const indices = new Uint16Array([
      // Body faces
      0, 1, 2,   0, 2, 4,   0, 4, 3,   0, 3, 1,
      5, 2, 1,   5, 4, 2,   5, 3, 4,   5, 1, 3,
      // Wing faces  
      1, 10, 5,  10, 12, 5,
      2, 5, 11,  5, 13, 11,
      0, 9, 7,   9, 6, 7,   6, 9, 0,
      5, 8, 9,   8, 5, 9,
    ])
    
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.setIndex(new THREE.BufferAttribute(indices, 1))
    geo.computeVertexNormals()
    
    return geo
  }, [])

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      if (!groupRef.current || !meshRef.current) return
      
      gsap.fromTo(groupRef.current.rotation,
        { z: -0.14 },
        { z: 0, duration: 0.9, ease: 'power2.out', delay: 2.4 }
      )
      gsap.to(meshRef.current.material, {
        opacity: 0.6, duration: 0.9, ease: 'power2.out', delay: 2.4
      })
    })
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.elapsedTime
      // Breathing rotation
      meshRef.current.rotation.y = Math.sin(elapsedTime * 0.3) * 0.15
      meshRef.current.rotation.z = Math.sin(elapsedTime * 0.2 + 1) * 0.05
      meshRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Lighting cho origami để đảm bảo mỗi face có tone riêng */}
      <directionalLight position={[2, 3, 1]} intensity={0.8} color="#E8E2D9" />
      <directionalLight position={[-1, -1, 2]} intensity={0.3} color="#8B3A2A" />
      
      <mesh 
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#D4CFC4"
          roughness={0.9}
          metalness={0}
          flatShading={true}
          transparent={true}
          opacity={0}
        />
        {hovered && (
          <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color="#8B3A2A" transparent opacity={0.3} />
          </lineSegments>
        )}
      </mesh>
    </group>
  )
}
