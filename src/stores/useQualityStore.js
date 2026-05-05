/**
 * useQualityStore — Adaptive quality management
 * Monitors FPS and adjusts rendering quality in tiers
 * 
 * Tiers (from PORTFOLIO_CONCEPT):
 *   high:   ≥ 55 FPS → full quality
 *   medium: 40-55 FPS → reduce shadow + bloom intensity
 *   low:    < 40 FPS → disable bloom + simplify shaders
 */

import { create } from 'zustand'
import { QUALITY } from '@utils/constants'

const useQualityStore = create((set, get) => ({
  // ─── State ──────────────────────────────────────────────
  tier: 'high',              // 'high' | 'medium' | 'low'
  fps: 60,                   // Current measured FPS
  bloomEnabled: true,
  shadowQuality: 'high',     // 'high' | 'low'
  particleMultiplier: 1.0,   // 0.3 to 1.0

  // FPS history for smoothing (avoid flickering between tiers)
  _fpsHistory: [],
  _historySize: 30,          // ~0.5s at 60fps

  // ─── Actions ────────────────────────────────────────────
  
  /**
   * Update FPS measurement — call every frame from AdaptiveQuality
   * Uses rolling average to prevent tier flickering
   * @param {number} currentFps
   */
  updateFPS: (currentFps) => {
    const { _fpsHistory, _historySize } = get()
    
    // Rolling window
    const newHistory = [..._fpsHistory, currentFps]
    if (newHistory.length > _historySize) {
      newHistory.shift()
    }
    
    // Average FPS
    const avgFps = newHistory.reduce((sum, f) => sum + f, 0) / newHistory.length

    set({ fps: Math.round(avgFps), _fpsHistory: newHistory })

    // Only adjust after we have enough samples
    if (newHistory.length >= _historySize) {
      get().adjustQuality(avgFps)
    }
  },

  /**
   * Adjust quality tier based on average FPS
   * @param {number} avgFps
   */
  adjustQuality: (avgFps) => {
    const { tier: currentTier } = get()
    let newTier = currentTier

    if (avgFps >= QUALITY.high.minFPS) {
      newTier = 'high'
    } else if (avgFps >= QUALITY.medium.minFPS) {
      newTier = 'medium'
    } else {
      newTier = 'low'
    }

    // Only update if tier actually changed (prevent unnecessary re-renders)
    if (newTier !== currentTier) {
      const settings = QUALITY[newTier]
      set({
        tier: newTier,
        bloomEnabled: settings.bloom,
        shadowQuality: settings.shadowQuality,
        particleMultiplier: settings.particleCount,
      })
    }
  },

  /**
   * Force a specific quality tier (for testing/debug)
   * @param {'high' | 'medium' | 'low'} tier
   */
  forceQuality: (tier) => {
    const settings = QUALITY[tier]
    set({
      tier,
      bloomEnabled: settings.bloom,
      shadowQuality: settings.shadowQuality,
      particleMultiplier: settings.particleCount,
      _fpsHistory: [],
    })
  },
}))

export default useQualityStore
