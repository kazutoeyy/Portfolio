import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import useScrollStore from '@stores/useScrollStore'

export default function ScrollPaper({ position }) {
  const groupRef = useRef(null)
  const paperRef = useRef(null)
  const topCurlRef = useRef(null)
  const bottomCurlRef = useRef(null)
  const hoveredRef = useRef(false)
  const positionRef = useRef(position)
  const emergeCompleteRef = useRef(false)
  const scrollRef = useRef(0)

  // Main paper body — PlaneGeometry với subdivisions để có thể curl
  const paperGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.4, 2.2, 1, 20)
    // Curl top và bottom edges vào phía sau
    const positions = geo.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i)
      const normalizedY = y / 1.1 // -1 to 1
      const absY = Math.abs(normalizedY)
      // Curl mạnh hơn ở edges, không ảnh hưởng center
      if (absY > 0.6) {
        const curlAmount = (absY - 0.6) / 0.4 // 0 to 1
        const zOffset = curlAmount * curlAmount * 0.35
        const yOffset = curlAmount * curlAmount * -0.08
        positions.setZ(i, positions.getZ(i) - zOffset)
        positions.setY(i, y + (normalizedY > 0 ? yOffset : -yOffset))
      }
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      if (!groupRef.current || !paperRef.current) return

      // Initial opacity = 0 đã set trên JSX material
      // Emerge animation tại t = 1.8s
      gsap.fromTo(
        groupRef.current.position,
        { y: positionRef.current[1] - 0.4 },
        { y: positionRef.current[1], duration: 0.8, ease: 'power2.out', delay: 1.8 }
      )
      gsap.to(paperRef.current.material, {
        opacity: 0.65,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.8
      })

      // Set emerge complete after known timing — không count refs
      gsap.to({}, {
        duration: 0.1,
        delay: 2.7,
        onComplete: () => {
          emergeCompleteRef.current = true
        }
      })

      if (topCurlRef.current?.material) {
        gsap.to(topCurlRef.current.material, {
          opacity: 0.4, duration: 0.8, ease: 'power2.out', delay: 1.8
        })
      }
      if (bottomCurlRef.current?.material) {
        gsap.to(bottomCurlRef.current.material, {
          opacity: 0.4, duration: 0.8, ease: 'power2.out', delay: 1.8
        })
      }
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Pre-emerge: idle only
    if (!emergeCompleteRef.current) {
      groupRef.current.position.y =
        positionRef.current[1] + Math.sin(t * 0.35) * 0.1
      groupRef.current.rotation.z = Math.sin(t * 0.25 + 1.2) * 0.04
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.03

      if (paperRef.current?.material) {
        const maxOp = hoveredRef.current ? 0.85 : 0.7
        if (paperRef.current.material.opacity > maxOp) {
          paperRef.current.material.opacity = maxOp
        }
      }
      return
    }

    // ── SCROLL DATA ──
    const sp_raw = useScrollStore.getState().scrollProgress
    scrollRef.current += (sp_raw - scrollRef.current) * 0.05
    const s = scrollRef.current

    // ── TUMBLE POSITION ──
    const driftX = s * -2.5
    const driftY = s * -2.0
    const driftZ = s * -1.5               // Lùi xa vào background

    groupRef.current.position.x = positionRef.current[0] + driftX
    groupRef.current.position.y =
      positionRef.current[1] + Math.sin(t * 0.35) * 0.1 + driftY
    groupRef.current.position.z = positionRef.current[2] + driftZ

    // ── TUMBLE ROTATION (Leaf fall — 3 trục) ──
    groupRef.current.rotation.x = 0.1 + s * Math.PI * 0.5
    groupRef.current.rotation.y = -0.3 + s * Math.PI * 0.8
    groupRef.current.rotation.z = 0.05 + Math.sin(t * 0.25 + 1.2) * 0.04 + s * 0.3

    // ── OPACITY FADE ──
    const targetPaperOp = Math.max(0.1, 0.65 - s * 0.45)
    const targetCurlOp = Math.max(0.05, 0.4 - s * 0.3)

    if (paperRef.current?.material) {
      // Fix: hover thêm +0.2 nhưng cap tại 0.85, thay vì Math.min luôn trả targetPaperOp
      const targetOp = hoveredRef.current
        ? Math.min(0.85, targetPaperOp + 0.2)
        : targetPaperOp
      paperRef.current.material.opacity +=
        (targetOp - paperRef.current.material.opacity) * 0.05
    }
    if (topCurlRef.current?.material) {
      topCurlRef.current.material.opacity +=
        (targetCurlOp - topCurlRef.current.material.opacity) * 0.05
    }
    if (bottomCurlRef.current?.material) {
      bottomCurlRef.current.material.opacity +=
        (targetCurlOp - bottomCurlRef.current.material.opacity) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0.1, -0.3, 0.05]}
      onPointerOver={() => {
        hoveredRef.current = true
        if (paperRef.current?.material) {
          gsap.to(paperRef.current.material, {
            opacity: 0.85,
            duration: 0.3,
            overwrite: 'auto'
          })
        }
      }}
      onPointerOut={() => {
        hoveredRef.current = false
        if (paperRef.current?.material) {
          gsap.to(paperRef.current.material, {
            opacity: 0.65,
            duration: 0.3,
            overwrite: 'auto'
          })
        }
      }}
    >
      {/* Main paper body */}
      <mesh
        ref={paperRef}
        geometry={paperGeometry}
      >
        <meshStandardMaterial
          color="#D4CFC4"
          roughness={0.92}
          metalness={0}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0}
        />
      </mesh>

      {/* Top curl edge — darker shadow line */}
      <mesh
        ref={topCurlRef}
        position={[0, 1.05, -0.18]}
        rotation={[0.55, 0, 0]}
      >
        <planeGeometry args={[1.4, 0.08, 1, 1]} />
        <meshStandardMaterial
          color="#7A7268"
          roughness={1}
          metalness={0}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0}
        />
      </mesh>

      {/* Bottom curl edge */}
      <mesh
        ref={bottomCurlRef}
        position={[0, -1.05, -0.18]}
        rotation={[-0.55, 0, 0]}
      >
        <planeGeometry args={[1.4, 0.08, 1, 1]} />
        <meshStandardMaterial
          color="#7A7268"
          roughness={1}
          metalness={0}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0}
        />
      </mesh>

      {/* Subtle horizontal lines — gợi ý lined paper */}
      {[-0.6, -0.2, 0.2, 0.6].map((yPos, i) => (
        <mesh key={i} position={[0, yPos, 0.001]}>
          <planeGeometry args={[1.1, 0.008]} />
          <meshStandardMaterial
            color="#4A453E"
            roughness={1}
            metalness={0}
            transparent={true}
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  )
}
