/**
 * useSceneStore — Scene state management
 * Controls which scene is active and transition state
 * 
 * Flow: loading → hero → workspace → scroll
 * Transitions are one-directional except workspace ↔ hero
 */

import { create } from 'zustand'

const useSceneStore = create((set, get) => ({
  // ─── State ──────────────────────────────────────────────
  currentScene: 'loading',  // 'loading' | 'hero' | 'workspace' | 'scroll'
  previousScene: null,
  isTransitioning: false,
  transitionProgress: 0,    // 0 → 1 during transitions

  // ─── Actions ────────────────────────────────────────────
  
  /**
   * Set the active scene
   * @param {'loading' | 'hero' | 'workspace' | 'scroll'} scene
   */
  setScene: (scene) => {
    const { currentScene } = get()
    if (currentScene === scene) return
    set({
      previousScene: currentScene,
      currentScene: scene,
      isTransitioning: false,
      transitionProgress: 0,
    })
  },

  /**
   * Start a transition — call before animating
   */
  startTransition: () => {
    set({ isTransitioning: true, transitionProgress: 0 })
  },

  /**
   * Update transition progress during animation
   * @param {number} progress - 0 to 1
   */
  setTransitionProgress: (progress) => {
    set({ transitionProgress: Math.min(Math.max(progress, 0), 1) })
  },

  /**
   * End transition — call after animation completes
   */
  endTransition: () => {
    set({ isTransitioning: false, transitionProgress: 1 })
  },

  // ─── Computed / Helpers ─────────────────────────────────
  
  /**
   * Check if a specific scene is active
   */
  isScene: (scene) => get().currentScene === scene,
  
  /**
   * Check if transitioning between two specific scenes
   */
  isTransitioningBetween: (from, to) => {
    const { isTransitioning, previousScene, currentScene } = get()
    return isTransitioning && previousScene === from && currentScene === to
  },
}))

export default useSceneStore
