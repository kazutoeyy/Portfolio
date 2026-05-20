/**
 * WorkspaceScene.jsx — 3D workspace room
 * Procedural geometry: desk, floor, walls
 * Objects: Monitor, Keyboard, MousePad, Bookshelf, PhotoFrame, StickyNote, DeskLamp, Window
 */

import { useRef } from 'react'
import useThemeStore from '@stores/useThemeStore'

import RoomLighting from './RoomLighting'
import IdleAnimations from './IdleAnimations'
import GuidedHint from './GuidedHint'
import HandoffTransition from '../transitions/HandoffTransition'

import Monitor from './objects/Monitor'
import Keyboard from './objects/Keyboard'
import MousePad from './objects/MousePad'
import Bookshelf from './objects/Bookshelf'
import PhotoFrame from './objects/PhotoFrame'
import StickyNote from './objects/StickyNote'
import DeskLamp from './objects/DeskLamp'
import RoomWindow from './objects/RoomWindow'

export default function WorkspaceScene() {
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const lampArmRef = useRef()
  const monitorScreenRef = useRef()
  const windowPaneRef = useRef()

  return (
    <group name="workspace-scene">
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

      {/* ─── Room Structure ───────────────────────────── */}

      {/* Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={isDark ? '#0E0E0E' : '#E8E0D0'}
          metalness={0.05}
          roughness={0.9}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -3.5]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color={isDark ? '#0C0C0C' : '#F0EBE0'}
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color={isDark ? '#0D0D0D' : '#EDE8DE'}
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color={isDark ? '#0D0D0D' : '#EDE8DE'}
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* ─── Desk ─────────────────────────────────────── */}

      {/* Desk top */}
      <mesh position={[0, 0.85, -1.2]}>
        <boxGeometry args={[3.5, 0.06, 1.4]} />
        <meshStandardMaterial
          color={isDark ? '#1A1A1A' : '#C4A882'}
          metalness={0.15}
          roughness={0.75}
        />
      </mesh>

      {/* Desk legs */}
      {[[-1.6, 0.4, -0.5], [1.6, 0.4, -0.5], [-1.6, 0.4, -1.8], [1.6, 0.4, -1.8]].map((pos, i) => (
        <mesh key={`leg-${i}`} position={pos}>
          <boxGeometry args={[0.06, 0.85, 0.06]} />
          <meshStandardMaterial
            color={isDark ? '#161616' : '#A08060'}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Desk front panel */}
      <mesh position={[0, 0.45, -0.52]}>
        <boxGeometry args={[3.3, 0.4, 0.04]} />
        <meshStandardMaterial
          color={isDark ? '#181818' : '#B89870'}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* ─── Interactive Objects ──────────────────────── */}

      {/* Monitor (on desk, center) */}
      <Monitor position={[0, 1.85, -1.8]} />

      {/* Keyboard (on desk, center-front) */}
      <Keyboard position={[0, 0.89, -0.9]} />

      {/* Mouse + Pad (on desk, right of keyboard) */}
      <MousePad position={[0.9, 0.89, -0.9]} />

      {/* Bookshelf (back-left wall) */}
      <Bookshelf position={[-2.8, 2.2, -3.2]} />

      {/* PhotoFrame (back-right wall) */}
      <PhotoFrame position={[2.8, 2.5, -3.2]} />

      {/* StickyNote (back wall, left of monitor) */}
      <StickyNote position={[-1.8, 1.8, -3.3]} />

      {/* DeskLamp (right desk) */}
      <DeskLamp position={[1.5, 0.88, -0.8]} />

      {/* Window (back wall, above) */}
      <RoomWindow position={[0, 3.2, -3.45]} />

      {/* ─── Guided Discovery ─────────────────────────── */}
      <GuidedHint />
    </group>
  )
}
