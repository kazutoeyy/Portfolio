/**
 * Laptop.jsx — Gateway object (CORE)
 * Click → triggers transition to Workspace
 * Procedural geometry — no GLB needed
 * Bloom: YES (screen emissive)
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import useFloatingMotion from '@hooks/useFloatingMotion'
import useHoverInteraction from '@hooks/useHoverInteraction'
import useSceneStore from '@stores/useSceneStore'
import useInteractionStore from '@stores/useInteractionStore'

export default function Laptop({ position = [0, 0, 0] }) {
  const groupRef = useRef()
  const screenRef = useRef()
  const workspaceTexture = useTexture('/workspace-preview.png')

  useFloatingMotion(groupRef, { index: 0, amplitude: 0.2 })

  const { bind, hovered } = useHoverInteraction('laptop', {
    scale: 1.1,
    groupRef,
  })

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

    const { startTransition } = useSceneStore.getState()
    const { disableInteractions } = useInteractionStore.getState()

    disableInteractions()
    startTransition()
    window.dispatchEvent(new CustomEvent('hero-to-workspace'))
  }

  return (
    <group
      ref={groupRef}
      position={position}
      {...bind}
      onClick={handleClick}
    >
      {/* Base / Body */}
      <RoundedBox args={[2.4, 0.08, 1.6]} radius={0.03} position={[0, -0.5, 0]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Screen panel */}
      <group position={[0, 0.3, -0.6]} rotation={[0.3, 0, 0]}>
        {/* Screen bezel */}
        <RoundedBox args={[2.3, 1.5, 0.05]} radius={0.03}>
          <meshStandardMaterial color="#141414" metalness={0.6} roughness={0.3} />
        </RoundedBox>

        {/* Screen — workspace preview texture (portal) */}
        <mesh ref={screenRef} name="laptop-screen" position={[0, 0, 0.03]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial
            map={workspaceTexture}
            //emissive="#ffffff"
            emissiveIntensity={hovered ? 0.3 : 0.1}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Hinge */}
      <mesh position={[0, -0.15, -0.72]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 2.2, 8]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
