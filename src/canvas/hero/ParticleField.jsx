/**
 * ParticleField.jsx — Subtle floating particles for depth
 * ~100 small dots drifting slowly, creates "space" feel behind laptop
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 80 }) {
  const pointsRef = useRef()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20     // x: spread wide
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14 // y: spread tall
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // z: depth
      speeds[i] = 0.1 + Math.random() * 0.3
    }

    return { positions, speeds }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime
    const posArray = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Gentle drift using sin/cos
      posArray[i3] += Math.sin(time * speeds[i] + i) * 0.001
      posArray[i3 + 1] += Math.cos(time * speeds[i] * 0.7 + i) * 0.0008
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#E8E8E8"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
