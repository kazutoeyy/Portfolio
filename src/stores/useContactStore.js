/**
 * useContactStore — Contact form state machine
 * 
 * States: idle → loading → success | error
 * EmailJS integration handled in utils/email.js
 */

import { create } from 'zustand'

const useContactStore = create((set, get) => ({
  // ─── State ──────────────────────────────────────────────
  formState: 'idle',      // 'idle' | 'loading' | 'success' | 'error'
  email: '',
  message: '',
  errorMessage: '',

  // ─── Actions ────────────────────────────────────────────
  
  /**
   * Update a form field
   * @param {'email' | 'message'} key
   * @param {string} value
   */
  setField: (key, value) => {
    set({ [key]: value })
  },

  /**
   * Submit the contact form
   * Uses dynamic import to load email utility only when needed
   */
  submit: async () => {
    const { email, message, formState } = get()
    
    // Prevent double submit
    if (formState === 'loading') return

    // Basic validation
    if (!email.trim() || !message.trim()) {
      set({ formState: 'error', errorMessage: 'Please fill in all fields.' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      set({ formState: 'error', errorMessage: 'Please enter a valid email.' })
      return
    }

    set({ formState: 'loading', errorMessage: '' })

    try {
      // Dynamic import — email utility only loaded when user actually submits
      const { sendEmail } = await import('@utils/email.js')
      await sendEmail({ email, message })
      
      set({ formState: 'success', email: '', message: '' })
    } catch (error) {
      set({
        formState: 'error',
        errorMessage: error.message || 'Something went wrong. Please try again.',
      })
    }
  },

  /**
   * Reset form to initial state
   */
  reset: () => {
    set({
      formState: 'idle',
      email: '',
      message: '',
      errorMessage: '',
    })
  },

  /**
   * Clear error and go back to idle
   */
  clearError: () => {
    set({ formState: 'idle', errorMessage: '' })
  },
}))

export default useContactStore
