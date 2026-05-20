/**
 * App.jsx — Root component
 * Integrates Canvas, Cursor, TransitionOverlay, keyboard controls
 */

import CanvasRoot from './canvas/CanvasRoot'
import CustomCursor from './components/cursor/CustomCursor'
import TransitionOverlay from './components/transitions/TransitionOverlay'
import Header from './components/layout/Header'
import ThemeToggle from './components/layout/ThemeToggle'
import useSceneStore from './stores/useSceneStore'
import useKeyboardControls from './hooks/useKeyboardControls'
import { lazy, Suspense, useState, useEffect } from 'react'

const PageWrapper = lazy(() => import('./components/sections/PageWrapper'))

function WebGLFallback() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0A',
      color: '#E8E8E8',
      fontFamily: "'Inter', sans-serif",
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1rem', fontSize: '2rem' }}>WebGL Not Supported</h2>
      <p style={{ color: '#6B6B6B', maxWidth: '500px', lineHeight: 1.6 }}>
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

  // ESC key to return to hero scene
  useKeyboardControls({
    Escape: () => {
      const { currentScene, isTransitioning } = useSceneStore.getState()
      if (currentScene === 'workspace' && !isTransitioning) {
        useSceneStore.getState().startTransition()
        window.dispatchEvent(new CustomEvent('workspace-to-hero'))
      }
    },
  })

  if (!webGLSupported) {
    return <WebGLFallback />
  }

  return (
    <>
      <CustomCursor />
      <CanvasRoot />
      <TransitionOverlay />
      <Header />
      <ThemeToggle />
      <Suspense fallback={null}>
        <PageWrapper />
      </Suspense>
    </>
  )
}

export default App
