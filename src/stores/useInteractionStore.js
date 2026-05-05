/**
 * useInteractionStore — Hover, focus, and cursor state
 * Bridge between R3F raycasting and DOM cursor/UI
 * 
 * Focus State logic:
 * - Hover 1 object → that object = focused → others fade to 0.6 opacity
 * - Leave all objects → focus cleared → all return to 1.0 opacity
 */

import { create } from 'zustand'

const useInteractionStore = create((set, get) => ({
  // ─── State ──────────────────────────────────────────────
  hoveredObject: null,      // string id of hovered object, or null
  focusedObject: null,      // string id of focused object (= hovered for now)
  cursorState: 'default',   // 'default' | 'hover' | 'click' | 'text'
  isInteractionEnabled: true,

  // ─── Actions ────────────────────────────────────────────
  
  /**
   * Set hovered object — called by raycaster
   * Also updates focus and cursor state
   * @param {string | null} objectId
   */
  setHovered: (objectId) => {
    set({
      hoveredObject: objectId,
      focusedObject: objectId,
      cursorState: objectId ? 'hover' : 'default',
    })
  },

  /**
   * Set focused object independently (e.g., click to lock focus)
   * @param {string | null} objectId
   */
  setFocused: (objectId) => {
    set({ focusedObject: objectId })
  },

  /**
   * Set cursor state directly (e.g., hovering DOM text)
   * @param {'default' | 'hover' | 'click' | 'text'} state
   */
  setCursor: (state) => {
    set({ cursorState: state })
  },

  /**
   * Temporarily disable all interactions (during transitions)
   */
  disableInteractions: () => {
    set({
      isInteractionEnabled: false,
      hoveredObject: null,
      focusedObject: null,
      cursorState: 'default',
    })
  },

  /**
   * Re-enable interactions
   */
  enableInteractions: () => {
    set({ isInteractionEnabled: true })
  },

  /**
   * Reset all interaction state
   */
  reset: () => {
    set({
      hoveredObject: null,
      focusedObject: null,
      cursorState: 'default',
      isInteractionEnabled: true,
    })
  },

  // ─── Computed / Helpers ─────────────────────────────────
  
  /**
   * Check if a specific object should be dimmed (focus fade)
   * Returns true if another object is focused
   * @param {string} objectId
   */
  shouldDim: (objectId) => {
    const { focusedObject } = get()
    return focusedObject !== null && focusedObject !== objectId
  },
}))

export default useInteractionStore
