import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import useSceneStore from '@stores/useSceneStore'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/resume' },
]

export default function Header() {
  const currentScene = useSceneStore((s) => s.currentScene)
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(false)
  const lastYRef = useRef(0)

  useEffect(() => {
    if (currentScene !== 'loading') {
      // Delay showing the header so it doesn't pop in immediately before the hero animation
      const timer = setTimeout(() => setMounted(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [currentScene])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    lastYRef.current = latest
  })

  if (currentScene === 'loading' || !mounted) return null

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '-150%', opacity: 0 }
      }}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.6 }} // Custom cubic-bezier for fluid feel
      className="fixed top-6 left-0 right-0 z-[50] mx-auto w-max"
    >
      <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-surface/20 backdrop-blur-xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        
        {/* Logo Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif italic text-xl font-medium text-primary hover:text-rust transition-colors duration-300 pointer-events-auto"
        >
          GH.
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs text-muted hover:text-primary transition-colors duration-300 tracking-[0.05em] uppercase pointer-events-auto"
              onClick={(e) => {
                if (item.href === '/resume') return
                e.preventDefault()
                const el = document.querySelector(item.href)
                if (el) {
                  // Wait for Lenis smooth scroll or native smooth scroll
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
