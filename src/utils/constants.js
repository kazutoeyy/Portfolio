/**
 * constants.js — Single source of truth for all magic numbers
 * Referenced by both R3F (3D) and DOM (2D) layers
 */

// ─── Colors (hex) ───────────────────────────────────────────
export const COLORS = {
  primary: '#7C5CFC',
  accent1: '#FF6B9D',
  accent2: '#4ECDC4',
  neon: '#22D3EE',
  bg: '#0F0F1A',
  text: '#F0F0F5',
  textMuted: '#8B8BA3',
  surface: '#1A1A2E',
  surfaceHover: '#252540',
}

// Three.js needs numeric hex
export const COLORS_HEX = {
  primary: 0x7C5CFC,
  accent1: 0xFF6B9D,
  accent2: 0x4ECDC4,
  neon: 0x22D3EE,
  bg: 0x0F0F1A,
  text: 0xF0F0F5,
  surface: 0x1A1A2E,
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
export const FLOATING_OBJECTS = [
  { id: 'laptop',    name: 'Laptop',    orbitRadius: 0,   orbitSpeed: 0,    scale: 1.0,  bloom: true  },
  { id: 'uiToggle',  name: 'UI Toggle', orbitRadius: 3.0, orbitSpeed: 0.15, scale: 0.6,  bloom: true  },
  { id: 'colorBlob', name: 'Color Blob',orbitRadius: 3.5, orbitSpeed: 0.12, scale: 0.8,  bloom: false },
  { id: 'gear',      name: 'Gear',      orbitRadius: 4.0, orbitSpeed: 0.10, scale: 0.7,  bloom: false },
  { id: 'phone',     name: 'Phone',     orbitRadius: 3.2, orbitSpeed: 0.13, scale: 0.7,  bloom: true  },
  { id: 'coffee',    name: 'Coffee',    orbitRadius: 3.8, orbitSpeed: 0.11, scale: 0.6,  bloom: false },
]

// ─── Bloom Settings ─────────────────────────────────────────
export const BLOOM = {
  layer: 1,                // THREE.Layers index for selective bloom
  threshold: 0.8,
  strength: 0.4,
  strengthMax: 0.6,        // clamp max — "bloom = privilege"
  radius: 0.3,
  maxSimultaneous: 3,      // max objects blooming at once
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
