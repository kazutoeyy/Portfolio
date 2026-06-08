import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // gsap.quickTo is highly optimized for mouse tracking
    const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3' })
    const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3' })
    
    const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.3, ease: 'power3' })
    const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.3, ease: 'power3' })

    const moveCursor = (e) => {
      xToCursor(e.clientX)
      yToCursor(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor="pointer"]')
      setIsHovering(!!target)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 })
      gsap.to(ringRef.current, { scale: 1.5, borderColor: 'var(--color-rust)', backgroundColor: 'rgba(139, 58, 42, 0.1)', duration: 0.3 })
    } else {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })
      gsap.to(ringRef.current, { scale: 1, borderColor: 'var(--color-faint)', backgroundColor: 'transparent', duration: 0.3 })
    }
  }, [isHovering])

  useEffect(() => {
    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      gsap.to(ringRef.current, { scale: 0.8, duration: 0.1 })
    }
    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: isHovering ? 0.5 : 1, duration: 0.3 })
      gsap.to(ringRef.current, { scale: isHovering ? 1.5 : 1, duration: 0.3 })
      
      // Ink drop ripple effect
      const ripple = document.createElement('div')
      ripple.className = 'fixed w-12 h-12 rounded-full border border-rust pointer-events-none z-[9999]'
      ripple.style.left = `${gsap.getProperty(cursorRef.current, 'x') - 24}px`
      ripple.style.top = `${gsap.getProperty(cursorRef.current, 'y') - 24}px`
      document.body.appendChild(ripple)
      
      gsap.to(ripple, {
        scale: 2.5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      })
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isHovering])

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-rust rounded-full pointer-events-none mix-blend-difference z-[10001] hidden md:block"
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-faint rounded-full pointer-events-none z-[10000] hidden md:block transition-colors"
      />
    </>
  )
}
