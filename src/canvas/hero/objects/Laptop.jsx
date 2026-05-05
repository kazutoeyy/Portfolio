/**
 * Laptop.jsx — Gateway object (CORE)
 * Click → triggers transition to Workspace (Phase 6)
 * Procedural geometry — no GLB needed
 * Bloom: YES (screen emissive)
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useFocusState from '@hooks/useFocusState'
import useSceneStore from '@stores/useSceneStore'
import useInteractionStore from '@stores/useInteractionStore'

export default function Laptop({ position, config, index }) {
  const groupRef = useRef()
  const screenRef = useRef()

  useFloatingMotion(groupRef, { index, amplitude: 0.25 })

  const { bind, hovered } = useHoverInteraction('laptop', {
    scale: 1.15,
    groupRef,
  })

  useFocusState('laptop', groupRef)

  // Screen glow pulse
  useFrame((state) => {
    if (!screenRef.current) return
    const t = state.clock.elapsedTime
    const baseEmissive = hovered ? 0.8 : 0.3
    screenRef.current.material.emissiveIntensity = baseEmissive + Math.sin(t * 2) * 0.1
  })

  // Click → trigger transition to workspace
  const handleClick = (e) => {
    e.stopPropagation()
    const { isInteractionEnabled } = useInteractionStore.getState()
    if (!isInteractionEnabled) return

    const { startTransition, setScene } = useSceneStore.getState()
    const { disableInteractions } = useInteractionStore.getState()

    // Dispatch transition start — Phase 6 CameraChoreography will handle the rest
    disableInteractions()
    startTransition()
    
    // SceneManager will switch to workspace after transition completes
    // For now: immediate switch with transition flag
    window.dispatchEvent(new CustomEvent('hero-to-workspace'))
  }

  return (
    <group
      ref={groupRef}
      position={position}
      scale={config.scale}
      {...bind}
      onClick={handleClick}
    >
      {/* Base / Body */}
      <RoundedBox args={[2.4, 0.08, 1.6]} radius={0.03} position={[0, -0.5, 0]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#2A2A3E" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Screen panel */}
      <group position={[0, 0.3, -0.6]} rotation={[0.3, 0, 0]}>
        {/* Screen bezel */}
        <RoundedBox args={[2.3, 1.5, 0.05]} radius={0.03}>
          <meshStandardMaterial color="#1A1A2E" metalness={0.6} roughness={0.3} />
        </RoundedBox>

        {/* Screen (emissive — bloom target) */}
        <mesh ref={screenRef} position={[0, 0, 0.03]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial
            color={hovered ? '#22D3EE' : '#7C5CFC'}
            emissive={hovered ? '#22D3EE' : '#7C5CFC'}
            emissiveIntensity={0.3}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Hinge */}
      <mesh position={[0, -0.15, -0.72]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 2.2, 8]} />
        <meshStandardMaterial color="#3A3A4E" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
