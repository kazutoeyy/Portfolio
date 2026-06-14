import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Selection } from '@react-three/postprocessing'
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
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <color attach="background" args={['#0A0A0A']} />
        
        {/* Lights ở root level — SelectiveBloom cần detect được */}
        <ambientLight intensity={0.15} color="#E8E0D0" />
        <directionalLight position={[5, 5, -5]} intensity={0.8} color="#5A3028" />
        <directionalLight position={[-5, -2, 5]} intensity={0.8} color="#4A453E" />
        <spotLight position={[0, 10, 0]} intensity={1} color="#E8E0D0" penumbra={1} angle={0.5} />
        
        <Selection>
          <Suspense fallback={null}>
            <AdaptiveQuality />
            <HeroScene />
            <PostProcessing />
          </Suspense>
        </Selection>
      </Canvas>
    </div>
  )
}
