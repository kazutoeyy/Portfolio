import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { Select } from '@react-three/postprocessing'

export default function ThreadIto({ position }) {
  const groupRef = useRef(null)
  const meshesRef = useRef([])
  const [hovered, setHovered] = useState(false)

  // Generate 7 organic curves
  const curves = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const seed = i * 1.618
      const points = Array.from({ length: 6 }, (_, j) => {
        const t = j / 5
        return new THREE.Vector3(
          Math.sin(seed + t * Math.PI * 2.3) * 1.2 + Math.cos(seed * 2 + t) * 0.6,
          (t - 0.5) * 3.5 + Math.sin(seed * 3 + t * 2) * 0.4,
          Math.cos(seed + t * Math.PI * 1.7) * 0.8
        )
      })
      return new THREE.CatmullRomCurve3(points)
    })
  }, [])

  const endPointZero = useMemo(() => curves[0].getPoint(1), [curves])

  const positionRef = useRef(position)
  
  const floatOffsetRef = useRef(0)
  
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      if (!groupRef.current) return
      
      // Set initial state
      meshesRef.current.forEach(mesh => {
        if (mesh?.material) {
          mesh.material.opacity = 0
        }
      })
      
      // Emerge group position
      gsap.fromTo(
        groupRef.current.position,
        { x: positionRef.current[0] - 0.5 },
        { x: positionRef.current[0], duration: 0.8, ease: 'power2.out', delay: 1.2 }
      )
      
      // Emerge opacity — delay đảm bảo refs ready
      meshesRef.current.forEach(mesh => {
        if (mesh?.material) {
          gsap.to(mesh.material, {
            opacity: 0.6,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.2
          })
        }
      })
    })
    
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime
    
    // Idle animation for group
    floatOffsetRef.current = Math.sin(elapsedTime * 0.4) * 0.08
    if (groupRef.current) {
      groupRef.current.position.y = positionRef.current[1] + floatOffsetRef.current
    }

    // Idle animation for individual meshes
    meshesRef.current.forEach((mesh, index) => {
      if (mesh) {
        mesh.rotation.y = elapsedTime * (0.08 + index * 0.02)
        mesh.rotation.x = Math.sin(elapsedTime * 0.3 + index) * 0.05
      }
    })
  })

  const handlePointerOver = () => {
    setHovered(true)
    meshesRef.current.forEach(mesh => {
      if (mesh && mesh.material) {
        gsap.to(mesh.material, { 
          emissiveIntensity: 0.25,
          duration: 0.3, 
          overwrite: 'auto' 
        })
      }
    })
  }
  
  const handlePointerOut = () => {
    setHovered(false)
    meshesRef.current.forEach((mesh, index) => {
      if (mesh && mesh.material) {
        gsap.to(mesh.material, { 
          emissiveIntensity: index === 0 ? 0.15 : 0.1,
          duration: 0.3, 
          overwrite: 'auto' 
        })
      }
    })
  }

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {curves.map((curve, index) => {
        const isFirst = index === 0
        const radius = 0.018 + (index * 0.004)
        
        if (isFirst) {
          return (
            <Select enabled key="tube-0">
              <mesh
                key="tube-0-mesh"
                ref={el => meshesRef.current[index] = el}
              >
                <tubeGeometry args={[curve, 32, radius, 4, false]} />
                <meshStandardMaterial 
                  color="#3A1A12"
                  roughness={0.95}
                  metalness={0}
                  emissive="#8B3A2A"
                  emissiveIntensity={0.15}
                  transparent={true}
                  opacity={0}
                />
                <pointLight 
                  position={endPointZero} 
                  color="#8B3A2A" 
                  intensity={0.3} 
                  distance={1.5} 
                  decay={2} 
                />
              </mesh>
            </Select>
          )
        }
        
        return (
          <mesh 
            key={`tube-${index}`}
            ref={el => meshesRef.current[index] = el}
          >
            <tubeGeometry args={[curve, 32, radius, 4, false]} />
            <meshStandardMaterial 
              color="#3A1A12"
              roughness={0.95}
              metalness={0}
              emissive="#1A0A08"
              emissiveIntensity={0.1}
              transparent={true}
              opacity={0}
            />
          </mesh>
        )
      })}
    </group>
  )
}
