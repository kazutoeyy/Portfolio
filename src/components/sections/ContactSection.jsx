import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    })

    // Breathing reveal cho heading
    tl.fromTo('.section-title-text',
      { letterSpacing: '-0.03em', opacity: 0, y: 12 },
      { letterSpacing: '0.05em', opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )

    // Cinematic fade-in cho form (delay 400ms sau heading)
    tl.fromTo('.contact-form-element',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
      0.4
    )
  }, { scope: containerRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent. (Demo logic)')
  }

  return (
    <section id="contact" ref={containerRef} className="section relative max-w-4xl mx-auto px-6 md:px-12 py-32 md:py-48">
      <SectionHeading number="05" title="Let's talk" disableAnimation={true} />
      
      <div className="max-w-2xl mx-auto mt-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          
          <div className="contact-form-element relative group">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="w-full bg-transparent border-b border-[#3A3530] py-4 font-mono text-[#C0B8AE] text-lg md:text-xl outline-none focus:border-[#8B3A2A] transition-colors duration-200 placeholder:text-[#4A453E]"
            />
          </div>
          
          <div className="contact-form-element relative group">
            <textarea 
              placeholder="Tell me about your project..." 
              required
              rows={4}
              className="w-full bg-transparent border-b border-[#3A3530] py-4 font-mono text-[#C0B8AE] text-lg md:text-xl outline-none focus:border-[#8B3A2A] transition-colors duration-200 resize-none placeholder:text-[#4A453E]"
            />
          </div>
          
          <div className="contact-form-element flex justify-end">
            <button 
              type="submit"
              className="font-mono text-sm tracking-[0.1em] hover:tracking-[0.11em] text-[#8B3A2A] hover:text-[#C0392B] transition-all duration-200 uppercase py-4 bg-transparent border-none"
            >
              [ SEND MESSAGE ]
            </button>
          </div>
          
        </form>
      </div>
    </section>
  )
}
