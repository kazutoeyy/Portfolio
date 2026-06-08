import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HeroScene from './hero/HeroScene'
import PostProcessing from './effects/PostProcessing'
import AdaptiveQuality from './effects/AdaptiveQuality'

export default function CanvasRoot() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <color attach="background" args={['#0A0A0A']} />
        <Suspense fallback={null}>
          <AdaptiveQuality />
          <HeroScene />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  )
}
