/**
 * Gear.jsx — Engineering mindset
 * Procedural R3F geometry: custom gear shape
 * Rotation: acceleration on hover (NOT constant speed)
 * Bloom: NO
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useFocusState from '@hooks/useFocusState'

function createGearShape(innerRadius = 0.5, outerRadius = 0.8, teeth = 8) {
  const shape = new THREE.Shape()
  const step = (Math.PI * 2) / teeth

  for (let i = 0; i < teeth; i++) {
    const angle = i * step
    // Tooth base inner
    shape.lineTo(
      Math.cos(angle) * innerRadius,
      Math.sin(angle) * innerRadius
    )
    // Tooth outer start
    shape.lineTo(
      Math.cos(angle + step * 0.15) * outerRadius,
      Math.sin(angle + step * 0.15) * outerRadius
    )
    // Tooth outer end
    shape.lineTo(
      Math.cos(angle + step * 0.35) * outerRadius,
      Math.sin(angle + step * 0.35) * outerRadius
    )
    // Back to inner
    shape.lineTo(
      Math.cos(angle + step * 0.5) * innerRadius,
      Math.sin(angle + step * 0.5) * innerRadius
    )
  }
  shape.closePath()

  // Center hole
  const hole = new THREE.Path()
  const holeSegments = 24
  for (let i = 0; i <= holeSegments; i++) {
    const angle = (i / holeSegments) * Math.PI * 2
    const x = Math.cos(angle) * 0.2
    const y = Math.sin(angle) * 0.2
    if (i === 0) hole.moveTo(x, y)
    else hole.lineTo(x, y)
  }
  shape.holes.push(hole)

  return shape
}

export default function Gear({ position, config, index }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const rotSpeed = useRef(0.3) // Current rotation speed

  useFloatingMotion(groupRef, { index, amplitude: 0.15 })

  const { bind, hovered } = useHoverInteraction('gear', {
    scale: 1.2,
    groupRef,
  })

  useFocusState('gear', groupRef)

  const gearShape = useMemo(() => createGearShape(0.5, 0.75, 10), [])
  const extrudeSettings = useMemo(() => ({
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  }), [])

  // Rotation with acceleration on hover
  useFrame((_, delta) => {
    if (!meshRef.current) return

    const targetSpeed = hovered ? 2.5 : 0.3
    // Smooth lerp to target speed
    rotSpeed.current += (targetSpeed - rotSpeed.current) * 0.06

    meshRef.current.rotation.z += rotSpeed.current * delta
  })

  return (
    <group
      ref={groupRef}
      position={position}
      scale={config.scale}
      {...bind}
    >
      <mesh ref={meshRef}>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#4A4A5E"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}
