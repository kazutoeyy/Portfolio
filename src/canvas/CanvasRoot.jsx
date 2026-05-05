import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import SceneManager from './SceneManager'
import PostProcessing from './effects/PostProcessing'
import AdaptiveQuality from './effects/AdaptiveQuality'
import EnvironmentSetup from './environment/Environment'
import Lighting from './environment/Lighting'
import { CAMERA } from '../utils/constants'

export default function CanvasRoot() {
  return (
    <Canvas
      camera={{ position: CAMERA.hero.position, fov: 45 }}
      dpr={[1, 2]} // Performance optimization
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 'var(--z-canvas, 1)', background: '#0F0F1A' }}
    >
      <Suspense fallback={null}>
        <AdaptiveQuality />
        <Lighting />
        <EnvironmentSetup />
        <SceneManager />
        <PostProcessing />
      </Suspense>
    </Canvas>
  )
}
