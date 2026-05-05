/**
 * math.js — Utility math functions for 3D animations
 * Used throughout canvas components for smooth motion
 */

import { createNoise2D, createNoise3D } from 'simplex-noise'

// ─── Noise Generators (singleton) ───────────────────────────
const _noise2D = createNoise2D()
const _noise3D = createNoise3D()

/**
 * 2D simplex noise — returns value in [-1, 1]
 */
export function noise2D(x, y) {
  return _noise2D(x, y)
}

/**
 * 3D simplex noise — returns value in [-1, 1]
 */
export function noise3D(x, y, z) {
  return _noise3D(x, y, z)
}

/**
 * Linear interpolation
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor [0, 1]
 */
export function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Clamp value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map a value from one range to another
 * @param {number} value - Input value
 * @param {number} inMin - Input range minimum
 * @param {number} inMax - Input range maximum
 * @param {number} outMin - Output range minimum
 * @param {number} outMax - Output range maximum
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

/**
 * Smooth dampening — like lerp but frame-rate independent
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @param {number} smoothing - Smoothing factor (0 = instant, 1 = never)
 * @param {number} dt - Delta time in seconds
 */
export function damp(current, target, smoothing, dt) {
  return lerp(current, target, 1 - Math.pow(smoothing, dt))
}

/**
 * Oscillate between 0 and 1 using sine wave
 * @param {number} time - Current time
 * @param {number} frequency - Oscillation frequency
 * @param {number} phase - Phase offset
 */
export function oscillate(time, frequency = 1, phase = 0) {
  return (Math.sin(time * frequency + phase) + 1) * 0.5
}

/**
 * Distance between two 3D points
 */
export function distance3D(a, b) {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/**
 * Degrees to radians
 */
export function degToRad(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Radians to degrees
 */
export function radToDeg(radians) {
  return radians * (180 / Math.PI)
}
