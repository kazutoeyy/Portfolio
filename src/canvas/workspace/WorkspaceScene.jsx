/**
 * WorkspaceScene.jsx — 3D workspace room
 * Full procedural geometry: desk, floor, walls
 * 7 interactive objects + lighting + idle animations + guided hints
 * 
 * Layout (camera at [0, 2, 8] looking at [0, 1, 0]):
 *   - Desk: center, y=0.8
 *   - Monitor: on desk, center-back
 *   - Bookshelf: back-left wall
 *   - PhotoFrame: back-right wall
 *   - TechShelf: right wall
 *   - StickyNote: left of desk area
 *   - DeskLamp: right side of desk
 *   - Window: back wall, above bookshelf
 */

import { useRef } from 'react'
import useThemeStore from '@stores/useThemeStore'

// Room components
import RoomLighting from './RoomLighting'
import IdleAnimations from './IdleAnimations'
import GuidedHint from './GuidedHint'
import HandoffTransition from '../transitions/HandoffTransition'

// Interactive objects
import Monitor from './objects/Monitor'
import Bookshelf from './objects/Bookshelf'
import PhotoFrame from './objects/PhotoFrame'
import TechShelf from './objects/TechShelf'
import StickyNote from './objects/StickyNote'
import DeskLamp from './objects/DeskLamp'
import RoomWindow from './objects/RoomWindow'

export default function WorkspaceScene() {
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  // Refs for idle animations
  const lampArmRef = useRef()
  const monitorScreenRef = useRef()
  const windowPaneRef = useRef()

  return (
    <group>
      {/* ─── Lighting ─────────────────────────────────── */}
      <RoomLighting lampRef={lampArmRef} />

      {/* ─── Idle Animations ──────────────────────────── */}
      <IdleAnimations
        lampArmRef={lampArmRef}
        monitorScreenRef={monitorScreenRef}
        windowPaneRef={windowPaneRef}
      />

      {/* ─── Handoff Transition ───────────────────────── */}
      <HandoffTransition />

      {/* ─── Room Structure (Procedural) ──────────────── */}

      {/* Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={isDark ? '#1A1A2E' : '#E8E0D0'}
          metalness={0.05}
          roughness={0.9}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -3.5]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color={isDark ? '#151528' : '#F0EBE0'}
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color={isDark ? '#161630' : '#EDE8DE'}
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color={isDark ? '#161630' : '#EDE8DE'}
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* ─── Desk ─────────────────────────────────────── */}

      {/* Desk top */}
      <mesh position={[0, 0.85, -1.2]}>
        <boxGeometry args={[3.5, 0.06, 1.4]} />
        <meshStandardMaterial
          color={isDark ? '#2A2235' : '#C4A882'}
          metalness={0.15}
          roughness={0.75}
        />
      </mesh>

      {/* Desk legs */}
      {[[-1.6, 0.4, -0.5], [1.6, 0.4, -0.5], [-1.6, 0.4, -1.8], [1.6, 0.4, -1.8]].map((pos, i) => (
        <mesh key={`leg-${i}`} position={pos}>
          <boxGeometry args={[0.06, 0.85, 0.06]} />
          <meshStandardMaterial
            color={isDark ? '#222238' : '#A08060'}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Desk front panel */}
      <mesh position={[0, 0.45, -0.52]}>
        <boxGeometry args={[3.3, 0.4, 0.04]} />
        <meshStandardMaterial
          color={isDark ? '#252540' : '#B89870'}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* ─── Interactive Objects ──────────────────────── */}

      {/* Primary: Monitor (on desk, center) */}
      <Monitor position={[0, 2.0, -1.8]} />

      {/* Bookshelf (back-left wall) */}
      <Bookshelf position={[-2.8, 2.2, -3.2]} />

      {/* PhotoFrame (back-right wall) */}
      <PhotoFrame position={[2.8, 2.5, -3.2]} />

      {/* TechShelf (right side) */}
      <TechShelf position={[2.5, 1.5, -0.8]} />

      {/* StickyNote (left desk area) */}
      <StickyNote position={[-1.5, 1.2, -1.0]} />

      {/* DeskLamp (right desk) */}
      <DeskLamp position={[1.5, 0.88, -0.8]} />

      {/* Window (back wall, above) */}
      <RoomWindow position={[0, 3.2, -3.45]} />

      {/* ─── Guided Discovery ─────────────────────────── */}
      <GuidedHint />
    </group>
  )
}
