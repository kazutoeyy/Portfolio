/**
 * useThemeStore — Theme management (dark / warm)
 * Syncs with DOM data-theme attribute on document.documentElement
 * dark = editorial minimalism | warm = thủy mặc (ink wash)
 */

import { create } from 'zustand'

const useThemeStore = create((set, get) => ({
  // ─── State ──────────────────────────────────────────────
  theme: 'dark',  // 'dark' | 'warm'

  // ─── Actions ────────────────────────────────────────────
  
  /**
   * Toggle between dark and warm theme
   */
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'warm' : 'dark'
    
    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
    
    set({ theme: newTheme })
  },

  /**
   * Set theme directly
   * @param {'dark' | 'warm'} theme
   */
  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
    set({ theme })
  },

  // ─── Computed ───────────────────────────────────────────
  
  isDark: () => get().theme === 'dark',
}))

export default useThemeStore
