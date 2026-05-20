/**
 * Header.jsx — Floating glassmorphism navbar
 * Only visible when currentScene === 'workspace'
 * Smooth scroll to sections, Resume link navigates to /resume
 */

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
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
  const headerRef = useRef(null)
  const currentScene = useSceneStore((s) => s.currentScene)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (currentScene === 'workspace' && !visible) {
      setVisible(true)
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8 }
        )
      }
    } else if (currentScene !== 'workspace' && visible) {
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: -60, opacity: 0, duration: 0.3, ease: 'power2.in',
          onComplete: () => setVisible(false),
        })
      }
    }
  }, [currentScene, visible])

  const handleClick = (e, item) => {
    if (item.href === '/resume') {
      // Navigate to resume page
      window.open('/resume', '_blank')
      e.preventDefault()
      return
    }

    e.preventDefault()
    const el = document.querySelector(item.href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleBack = () => {
    useSceneStore.getState().startTransition()
    window.dispatchEvent(new CustomEvent('workspace-to-hero'))
  }

  if (!visible && currentScene !== 'workspace') return null

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-header)',
        background: 'var(--header-bg, rgba(10, 10, 10, 0.85))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 var(--content-padding)',
        opacity: 0,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        {/* Logo / Name */}
        <button
          onClick={handleBack}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            letterSpacing: 'var(--letter-spacing-heading)',
          }}
        >
          Gia Huy<span style={{ color: 'var(--color-primary)' }}>.</span>
        </button>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
