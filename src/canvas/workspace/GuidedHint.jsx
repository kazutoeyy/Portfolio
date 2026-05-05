/**
 * GuidedHint.jsx — HTML overlay discovery hints
 * Appears 3s after component mounts (workspace scene active)
 * Auto-dismiss after 5s or on any click/hover
 * "Đừng để user tự mò" — subtle guided discovery
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { Html } from '@react-three/drei'

export default function GuidedHint() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const showTimerRef = useRef(null)
  const hideTimerRef = useRef(null)

  // Show hint 3s after mount (WorkspaceScene is already active when this mounts)
  useEffect(() => {
    if (dismissed) return

    showTimerRef.current = setTimeout(() => {
      setVisible(true)

      // Auto-dismiss after 5s
      hideTimerRef.current = setTimeout(() => {
        setVisible(false)
        setDismissed(true)
      }, 5000)
    }, 3000)

    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [dismissed])

  // Dismiss on any pointer interaction in the 3D scene
  const dismiss = useCallback(() => {
    if (visible) {
      setVisible(false)
      setDismissed(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const handleInteraction = () => dismiss()
    // Small delay to avoid catching the transition click
    const timer = setTimeout(() => {
      window.addEventListener('pointerdown', handleInteraction)
    }, 200)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointerdown', handleInteraction)
    }
  }, [visible, dismiss])

  if (!visible) return null

  return (
    <Html
      position={[0, 3.8, -1]}
      center
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div style={{
        fontFamily: "'Satoshi', sans-serif",
        fontSize: '14px',
        color: '#F0F0F5',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        animation: 'guidedHintPulse 2s ease-in-out infinite',
        textShadow: '0 0 10px rgba(124, 92, 252, 0.3)',
      }}>
        ✨ Click the objects to explore
        <style>{`
          @keyframes guidedHintPulse {
            0%, 100% { opacity: 0.4; transform: translateY(0); }
            50% { opacity: 0.7; transform: translateY(-3px); }
          }
        `}</style>
      </div>
    </Html>
  )
}
