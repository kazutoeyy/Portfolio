import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import useScrollStore from '@stores/useScrollStore'

export default function OrigamiOri({ position }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const hoveredRef = useRef(false)
  const edgesRef = useRef(null)
  const emergeCompleteRef = useRef(false)
  const scrollRef = useRef(0)

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

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry])

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

      // Set emerge complete after known timing — không count refs
      gsap.to({}, {
        duration: 0.1,
        delay: 3.4,
        onComplete: () => {
          emergeCompleteRef.current = true
        }
      })
    })
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return
    const t = state.clock.elapsedTime

    // Pre-emerge: idle breathing only
    if (!emergeCompleteRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15
      meshRef.current.rotation.z = Math.sin(t * 0.2 + 1) * 0.05
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.12
      return
    }

    // ── SCROLL DATA (read from store, no React re-render) ──
    const sp_raw = useScrollStore.getState().scrollProgress
    const sv = useScrollStore.getState().scrollVelocity

    // Smooth scroll progress — tránh jitter
    scrollRef.current += (sp_raw - scrollRef.current) * 0.08
    const sp = scrollRef.current  // 0 → 1

    // ── VORTEX POSITION ──
    const vortexAngle = sp * Math.PI * 4  // 2 vòng xoắn full page
    const vortexRadius = 1.5 + sp * 2.5   // Bán kính mở rộng dần
    // Guard: khi sp = 0, cos(0)=1 sẽ đẩy object khỏi vị trí ban đầu
    const vortexX = sp > 0 ? Math.cos(vortexAngle) * vortexRadius : 0
    const vortexZ = sp > 0 ? Math.sin(vortexAngle) * vortexRadius * 0.4 : 0
    const vortexY = sp * -8               // Đi xuống theo scroll

    // Idle float nhẹ chồng lên vortex, giảm dần theo scroll
    const idleFloat = Math.sin(t * 0.5) * 0.12 * (1 - sp * 0.5)

    groupRef.current.position.x = position[0] + vortexX
    groupRef.current.position.y = position[1] + vortexY + idleFloat
    groupRef.current.position.z = position[2] + vortexZ

    // ── BODY ORIENTATION ──
    // Hạc luôn "nhìn" theo hướng đang bay
    const tangentAngle = sp > 0 ? vortexAngle + Math.PI / 2 : 0
    groupRef.current.rotation.y = tangentAngle

    // Pitch lên xuống — lao theo vortex + idle bob
    const scrollPitch = sp * 0.3
    const idlePitch = Math.sin(t * 0.4) * 0.08
    groupRef.current.rotation.x = scrollPitch + idlePitch

    // Bank (nghiêng ngang) khi đổi hướng
    groupRef.current.rotation.z = sp > 0 ? Math.sin(vortexAngle) * 0.15 : 0

    // ── WING FLAP ──
    const flapSpeed = 2.5 + sv * 0.8
    const flapAmplitude = 0.25 + sv * 0.15

    // Scale Y/X của mesh — simulate cánh vỗ
    meshRef.current.scale.y = 1 + Math.abs(Math.sin(t * flapSpeed)) * 0.08
    meshRef.current.scale.x = 1 - Math.abs(Math.sin(t * flapSpeed)) * 0.04

    // Breathing rotation chồng lên scroll
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 * (1 - sp * 0.5)
    meshRef.current.rotation.z = Math.sin(t * 0.2 + 1) * 0.05

    // Opacity giảm nhẹ khi scroll xa
    if (meshRef.current.material) {
      const targetOpacity = Math.max(0.2, 0.6 - sp * 0.3)
      meshRef.current.material.opacity +=
        (targetOpacity - meshRef.current.material.opacity) * 0.05
    }

    // Edges opacity lerp for hover
    if (edgesRef.current?.material) {
      const targetOp = hoveredRef.current ? 0.3 : 0
      edgesRef.current.material.opacity +=
        (targetOp - edgesRef.current.material.opacity) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh 
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => hoveredRef.current = true}
        onPointerOut={() => hoveredRef.current = false}
      >
        <meshStandardMaterial
          color="#D4CFC4"
          roughness={0.9}
          metalness={0}
          flatShading={true}
          transparent={true}
          opacity={0}
        />
        <lineSegments ref={edgesRef}>
          <primitive object={edgesGeo} attach="geometry" />
          <lineBasicMaterial color="#8B3A2A" transparent opacity={0} />
        </lineSegments>
      </mesh>
    </group>
  )
}
