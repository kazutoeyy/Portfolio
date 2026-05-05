/**
 * useThemeStore — Dark/Light theme management
 * Syncs with DOM data-theme attribute on document.documentElement
 * Triggered by DeskLamp click in Workspace
 */

import { create } from 'zustand'

const useThemeStore = create((set, get) => ({
  // ─── State ──────────────────────────────────────────────
  theme: 'dark',  // 'dark' | 'light'

  // ─── Actions ────────────────────────────────────────────
  
  /**
   * Toggle between dark and light theme
   * Updates both Zustand state AND DOM attribute
   */
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    
    // Update DOM for CSS variable switching
    document.documentElement.setAttribute('data-theme', newTheme)
    
    set({ theme: newTheme })
  },

  /**
   * Set theme directly
   * @param {'dark' | 'light'} theme
   */
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    set({ theme })
  },

  // ─── Computed ───────────────────────────────────────────
  
  isDark: () => get().theme === 'dark',
  isLight: () => get().theme === 'light',
}))

export default useThemeStore
