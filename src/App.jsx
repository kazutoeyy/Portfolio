/**
 * App.jsx — Root component
 * Integrates Canvas, Cursor, Loading, keyboard controls, and workspace back button
 */

import CanvasRoot from './canvas/CanvasRoot'
import CustomCursor from './components/cursor/CustomCursor'
import LoadingScreen from './components/loading/LoadingScreen'
import useSceneStore from './stores/useSceneStore'
import useKeyboardControls from './hooks/useKeyboardControls'
import { lazy, Suspense } from 'react'

const PageWrapper = lazy(() => import('./components/sections/PageWrapper'))

function BackButton() {
  const currentScene = useSceneStore((s) => s.currentScene)
  const isTransitioning = useSceneStore((s) => s.isTransitioning)

  if (currentScene !== 'workspace' || isTransitioning) return null

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('workspace-to-hero'))
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Back to hero"
      style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 100,
        padding: '10px 20px',
        background: 'rgba(26, 26, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(124, 92, 252, 0.25)',
        borderRadius: '8px',
        color: '#F0F0F5',
        fontFamily: "'Satoshi', sans-serif",
        fontSize: '14px',
        letterSpacing: '0.02em',
        cursor: 'none',
        transition: 'all 0.3s ease',
        opacity: 0.7,
      }}
      onMouseEnter={(e) => {
        e.target.style.opacity = '1'
        e.target.style.borderColor = 'rgba(124, 92, 252, 0.5)'
        e.target.style.background = 'rgba(26, 26, 46, 0.8)'
      }}
      onMouseLeave={(e) => {
        e.target.style.opacity = '0.7'
        e.target.style.borderColor = 'rgba(124, 92, 252, 0.25)'
        e.target.style.background = 'rgba(26, 26, 46, 0.6)'
      }}
    >
      ← Back
    </button>
  )
}

import { useState, useEffect } from 'react'

function WebGLFallback() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0F0F1A',
      color: '#F0F0F5',
      fontFamily: "'Satoshi', sans-serif",
      padding: '2rem',
      textAlign: 'center',
      zIndex: 99999,
      position: 'relative'
    }}>
      <h2 style={{ fontFamily: "'Clash Display', sans-serif", marginBottom: '1rem', fontSize: '2rem' }}>WebGL Not Supported</h2>
      <p style={{ color: '#8B8BA3', maxWidth: '500px', lineHeight: 1.6 }}>
        Your browser or device doesn't seem to support WebGL, which is required for the 3D experiences on this site. 
        Please try updating your browser, enabling hardware acceleration, or using a different device.
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
      if (!gl) {
        setWebGLSupported(false)
      }
    } catch (e) {
      setWebGLSupported(false)
    }
  }, [])

  // ESC key to return to hero scene (triggers reverse transition)
  useKeyboardControls({
    Escape: () => {
      const { currentScene, isTransitioning } = useSceneStore.getState()
      if (currentScene === 'workspace' && !isTransitioning) {
        window.dispatchEvent(new CustomEvent('workspace-to-hero'))
      }
    },
  })

  if (!webGLSupported) {
    return <WebGLFallback />
  }

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <CanvasRoot />
      <BackButton />
      <Suspense fallback={null}>
        <PageWrapper />
      </Suspense>
    </>
  )
}

export default App
