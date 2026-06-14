import { create } from 'zustand'

const useScrollStore = create((set) => ({
  scrollProgress: 0,        // 0 = top, 1 = bottom
  scrollVelocity: 0,        // absolute velocity value
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setScrollVelocity: (v) => set({ scrollVelocity: v }),
}))

export default useScrollStore
