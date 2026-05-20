import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import SceneManager from './SceneManager'
import PostProcessing from './effects/PostProcessing'
import AdaptiveQuality from './effects/AdaptiveQuality'
import EnvironmentSetup from './environment/Environment'
import Lighting from './environment/Lighting'
import { CAMERA } from '../utils/constants'
import useThemeStore from '../stores/useThemeStore'

export default function CanvasRoot() {
  const theme = useThemeStore((s) => s.theme)
  const bg = theme === 'warm' ? '#efe7d2' : '#0A0A0A'

  return (
    <Canvas
      camera={{ position: CAMERA.hero.position, fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 'var(--z-canvas, 1)', background: bg }}
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

