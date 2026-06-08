import CanvasRoot from './canvas/CanvasRoot'
import CustomCursor from './components/cursor/CustomCursor'
import Header from './components/layout/Header'
import LoadingScreen from './components/loading/LoadingScreen'
import HeroText from './canvas/hero/HeroText'
import { lazy, Suspense, useState, useEffect } from 'react'

const PageWrapper = lazy(() => import('./components/sections/PageWrapper'))

function WebGLFallback() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-void text-primary font-mono p-8 text-center">
      <h2 className="font-serif italic text-3xl mb-4">WebGL Not Supported</h2>
      <p className="text-muted max-w-lg leading-relaxed">
        Your browser or device doesn't support WebGL, which is required for the 3D experience.
        Please try updating your browser or enabling hardware acceleration.
      </p>
    </div>
  )
}

function App() {
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebGLSupported(false)
    } catch (e) {
      setWebGLSupported(false)
    }
  }, [])

  if (!webGLSupported) {
    return <WebGLFallback />
  }

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      
      {/* 3D Canvas Layer */}
      <CanvasRoot />
      
      {/* Hero Text DOM Layer */}
      <HeroText />
      
      {/* Navigation */}
      <Header />
      
      {/* Scroll Sections */}
      <Suspense fallback={null}>
        <PageWrapper />
      </Suspense>
    </>
  )
}

export default App
