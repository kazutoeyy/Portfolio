/**
 * constants.js — Single source of truth for all magic numbers
 * Referenced by both R3F (3D) and DOM (2D) layers
 */

// ─── Colors (hex) — Editorial Dark ──────────────────────────
export const COLORS = {
  primary: '#E54B2D',
  neon: '#3B82F6',
  bg: '#0A0A0A',
  text: '#E8E8E8',
  textMuted: '#6B6B6B',
  surface: '#141414',
  surfaceHover: '#1E1E1E',
}

// Three.js needs numeric hex
export const COLORS_HEX = {
  primary: 0xE54B2D,
  neon: 0x3B82F6,
  bg: 0x0A0A0A,
  text: 0xE8E8E8,
  surface: 0x141414,
}

// ─── Camera Positions ───────────────────────────────────────
export const CAMERA = {
  hero: { position: [0, 0, 12], target: [0, 0, 0] },
  preZoom: { position: [0, 0, 14], target: [0, 0, 0] },
  zoomIn: { position: [0, 0, 2], target: [0, 0, 0] },
  workspace: { position: [0, 2, 8], target: [0, 1, 0] },
  exit: { position: [0, 5, 15], target: [0, 0, 0] },
}

// ─── Camera Transition Timing ───────────────────────────────
export const CAMERA_TRANSITIONS = {
  heroToPreZoom: { duration: 0.3, ease: 'power2.in' },
  preZoomToZoomIn: { duration: 1.2, ease: 'power3.inOut' },
  zoomInToWorkspace: { duration: 0.8, ease: 'power2.out' },
  workspaceToHero: { duration: 1.0, ease: 'power2.inOut' },
  workspaceToExit: { duration: 0.6, ease: 'power2.in' },
}

// ─── Floating Objects Config ────────────────────────────────
// Removed — Hero scene now only uses single Laptop component

// ─── Bloom Settings ─────────────────────────────────────────
export const BLOOM = {
  layer: 1,
  threshold: 0.8,
  strength: 0.25,          // Reduced from 0.4
  strengthMax: 0.4,        // Reduced from 0.6
  radius: 0.2,             // Reduced from 0.3
  maxSimultaneous: 3,
}

// ─── Post-Processing ────────────────────────────────────────
export const POST_PROCESSING = {
  vignette: {
    offset: 0.3,
    darkness: 0.4,
  },
  chromaticAberration: {
    offset: [0.002, 0.002],
  },
}

// ─── Timing (ms) ────────────────────────────────────────────
export const TIMING = {
  loadingMax: 3000,
  heroTextDelay: 200,       // tagline appears after name
  ctaHintDelay: 1000,       // invisible CTA hint
  guidedHintDelay: 2000,    // workspace hints
  magneticCollapse: 800,
  transitionTotal: 2600,    // full transition hero → workspace
}

// ─── Interaction ────────────────────────────────────────────
export const INTERACTION = {
  hoverScale: 1.2,
  focusFadeOpacity: 0.6,
  focusLerpSpeed: 0.08,     // lerp speed for opacity transitions
}

// ─── Quality Tiers ──────────────────────────────────────────
export const QUALITY = {
  high: { minFPS: 55, bloom: true, shadowQuality: 'high', particleCount: 1.0 },
  medium: { minFPS: 40, bloom: true, shadowQuality: 'low', particleCount: 0.7 },
  low: { minFPS: 0, bloom: false, shadowQuality: 'low', particleCount: 0.3 },
}

// ─── Lighting ───────────────────────────────────────────────
export const LIGHTING = {
  hero: {
    key: { color: 0xffffff, intensity: 1.2, position: [5, 5, 5] },
    rim: { color: 0x22D3EE, intensity: 0.8, position: [-3, 2, -3] },
    fill: { color: 0xFF6B9D, intensity: 0.3, position: [2, -1, 3] },
    ambient: { intensity: 0.2 },
  },
  workspace: {
    key: { color: 0xffffff, intensity: 1.0, position: [3, 5, 3] },
    deskLamp: { color: 0xFFE4B5, intensity: 0.8, angle: Math.PI / 4 },
    rim: { color: 0x22D3EE, intensity: 0.5, position: [-4, 3, -2] },
    monitorGlow: { color: 0x7C5CFC, intensity: 0.3 },
    windowLight: { color: 0x87CEEB, intensity: 0.4 },
    ambient: { intensity: 0.15 },
  },
}
