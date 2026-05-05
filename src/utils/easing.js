/**
 * easing.js — Custom easing functions for camera & animation
 * These supplement GSAP's built-in easings for useFrame-based animations
 * 
 * All functions take t in [0, 1] and return [0, 1]
 */

// ─── Standard Easings ───────────────────────────────────────

export function easeInQuad(t) {
  return t * t
}

export function easeOutQuad(t) {
  return t * (2 - t)
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function easeInCubic(t) {
  return t * t * t
}

export function easeOutCubic(t) {
  return (--t) * t * t + 1
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// ─── Elastic & Spring ───────────────────────────────────────

export function easeOutElastic(t) {
  const p = 0.3
  return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1
}

export function easeOutBack(t) {
  const s = 1.70158
  return (t -= 1) * t * ((s + 1) * t + s) + 1
}

// ─── Custom: Anticipation ───────────────────────────────────
// Pull back slightly before moving forward — for camera "wind up"
export function easeAnticipation(t) {
  const s = 2.0
  if (t < 0.3) {
    // Pull back phase
    const localT = t / 0.3
    return -0.1 * easeInQuad(localT)
  }
  // Forward phase
  const localT = (t - 0.3) / 0.7
  return -0.1 + 1.1 * easeOutCubic(localT)
}

// ─── Custom: Cinematic ──────────────────────────────────────
// Slow start, fast middle, gentle settle — like film camera
export function easeCinematic(t) {
  if (t < 0.2) {
    return 0.5 * easeInCubic(t / 0.2) * 0.2
  }
  if (t < 0.8) {
    const mid = (t - 0.2) / 0.6
    return 0.1 + 0.8 * mid
  }
  const end = (t - 0.8) / 0.2
  return 0.9 + 0.1 * easeOutCubic(end)
}

// ─── Spring Physics ─────────────────────────────────────────
/**
 * Simple spring interpolation (no velocity tracking)
 * @param {number} t - Progress [0, 1]
 * @param {number} stiffness - Spring stiffness (default 6)
 * @param {number} damping - Damping factor (default 0.5)
 */
export function spring(t, stiffness = 6, damping = 0.5) {
  return 1 - Math.exp(-stiffness * t) * Math.cos(damping * Math.PI * t)
}
