/**
 * TransitionOverlay.jsx — DOM fallback overlay
 *
 * Transition is now handled by the 3D TransitionPortal.
 * This overlay is kept as a minimal safety net (invisible by default).
 */

export default function TransitionOverlay() {
  return (
    <div
      id="transition-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-transition, 5000)',
        pointerEvents: 'none',
        opacity: 0,
        backgroundColor: '#0A0A0A',
        willChange: 'opacity',
      }}
    />
  )
}
