import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { Select } from '@react-three/postprocessing'
import useScrollStore from '@stores/useScrollStore'

export default function ThreadIto({ position }) {
  const groupRef = useRef(null)
  const meshesRef = useRef([])
  const [hovered, setHovered] = useState(false)
  const emergeCompleteRef = useRef(false)
  const scrollRef = useRef(0)

  // Generate 7 organic curves
  const curves = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const seed = i * 1.618
      const points = Array.from({ length: 6 }, (_, j) => {
        const t = j / 5
        return new THREE.Vector3(
          Math.sin(seed + t * Math.PI * 2.3) * 1.2 + Math.cos(seed * 2 + t) * 0.6,
          (t - 0.5) * 3.5 + Math.sin(seed * 3 + t * 2) * 0.4,
          Math.cos(seed + t * Math.PI * 1.7) * 1.8 + Math.sin(seed * 2 + t * 2.1) * 0.9
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
      let completedCount = 0
      const totalMeshes = meshesRef.current.filter(m => m?.material).length
      meshesRef.current.forEach(mesh => {
        if (mesh?.material) {
          gsap.to(mesh.material, {
            opacity: 0.6,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.2,
            onComplete: () => {
              completedCount++
              if (completedCount >= totalMeshes) {
                setTimeout(() => { emergeCompleteRef.current = true }, 100)
              }
            }
          })
        }
      })
    })
    
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const elapsedTime = state.clock.elapsedTime
    
    // Pre-emerge: idle only
    if (!emergeCompleteRef.current) {
      floatOffsetRef.current = Math.sin(elapsedTime * 0.4) * 0.08
      groupRef.current.position.y = positionRef.current[1] + floatOffsetRef.current
      meshesRef.current.forEach((mesh, index) => {
        if (mesh) {
          mesh.rotation.y = elapsedTime * (0.08 + index * 0.02)
          mesh.rotation.x = Math.sin(elapsedTime * 0.3 + index) * 0.05
        }
      })
      return
    }

    // ── SCROLL DATA ──
    const sp_raw = useScrollStore.getState().scrollProgress
    scrollRef.current += (sp_raw - scrollRef.current) * 0.06
    const s = scrollRef.current

    // ── DRIFT POSITION ──
    const driftX = s * 3.5
    const driftY = s * -3.0
    const driftZ = s * -2.0               // Lùi xa vào background

    groupRef.current.position.x = positionRef.current[0] + driftX
    groupRef.current.position.z = positionRef.current[2] + driftZ
    // Y: idle float + drift gộp tại 1 điểm duy nhất
    groupRef.current.position.y =
      positionRef.current[1] + Math.sin(elapsedTime * 0.4) * 0.08 + driftY

    // ── ROTATION — unravel + tilt ──
    groupRef.current.rotation.y = s * Math.PI * 1.5
    groupRef.current.rotation.x = s * 0.4

    // Scale nhẹ — threads căng ra khi scroll
    const scaleY = 1 + s * 0.3
    groupRef.current.scale.set(1, scaleY, 1)

    // Idle animation for individual meshes + scroll unravel
    meshesRef.current.forEach((mesh, index) => {
      if (mesh) {
        mesh.rotation.y = elapsedTime * (0.08 + index * 0.02) + s * Math.PI * 1.5
        mesh.rotation.x = Math.sin(elapsedTime * 0.3 + index) * 0.05 * (1 - s * 0.5)

        // Opacity fade
        if (mesh.material) {
          const targetOpacity = Math.max(0.1, 0.6 - s * 0.4)
          mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.05
        }
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
                <tubeGeometry args={[curve, 32, radius, 8, false]} />
                <meshStandardMaterial 
                  color="#7A2E1A"
                  roughness={0.95}
                  metalness={0}
                  emissive="#C0392B"
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
            <tubeGeometry args={[curve, 32, radius, 8, false]} />
            <meshStandardMaterial 
              color="#7A2E1A"
              roughness={0.95}
              metalness={0}
              emissive="#3A1A0A"
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
