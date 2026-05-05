/**
 * UIToggle.jsx — Micro-interaction quality showcase
 * Procedural R3F geometry: rounded box + toggle handle
 * Bloom: YES on hover
 */

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useFocusState from '@hooks/useFocusState'

export default function UIToggle({ position, config, index }) {
  const groupRef = useRef()
  const handleRef = useRef()
  const [toggled, setToggled] = useState(false)

  useFloatingMotion(groupRef, { index, amplitude: 0.2 })

  const { bind, hovered } = useHoverInteraction('uiToggle', {
    scale: 1.2,
    groupRef,
  })

  useFocusState('uiToggle', groupRef)

  // Spring animation for toggle handle
  useFrame(() => {
    if (!handleRef.current) return
    const targetX = toggled ? 0.25 : -0.25
    handleRef.current.position.x += (targetX - handleRef.current.position.x) * 0.12
  })

  return (
    <group
      ref={groupRef}
      position={position}
      scale={config.scale}
      {...bind}
      onClick={(e) => {
        e.stopPropagation()
        setToggled(!toggled)
      }}
    >
      {/* Track */}
      <RoundedBox args={[1.0, 0.4, 0.2]} radius={0.18}>
        <meshStandardMaterial
          color={toggled ? '#4ECDC4' : '#3A3A4E'}
          emissive={hovered ? (toggled ? '#4ECDC4' : '#7C5CFC') : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          toneMapped={false}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Handle */}
      <mesh ref={handleRef} position={[-0.25, 0, 0.12]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#F0F0F5"
          metalness={0.6}
          roughness={0.2}
          emissive={hovered ? '#F0F0F5' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
