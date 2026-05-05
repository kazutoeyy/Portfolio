/**
 * useKeyboardControls — Keyboard event handler
 * 
 * Primary use: ESC key to exit workspace (FR-10.1)
 * Extensible for other keyboard shortcuts
 */

import { useEffect, useCallback } from 'react'

/**
 * @param {Object} keyMap - Map of key names to callbacks
 * @param {boolean} enabled - Whether keyboard controls are active
 * 
 * @example
 * useKeyboardControls({
 *   Escape: () => goBackToHero(),
 *   ' ': () => togglePause(),
 * })
 */
export default function useKeyboardControls(keyMap = {}, enabled = true) {
  const handleKeyDown = useCallback((event) => {
    if (!enabled) return

    const handler = keyMap[event.key]
    if (handler) {
      event.preventDefault()
      handler(event)
    }
  }, [keyMap, enabled])

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, enabled])
}
