import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.contact-form-element',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    )
  }, { scope: containerRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent. (Demo logic)')
  }

  return (
    <section id="contact" ref={containerRef} className="section relative max-w-4xl mx-auto px-6 md:px-12 py-32 md:py-48">
      <SectionHeading number="05" title="Let's talk" />
      
      <div className="max-w-2xl mx-auto mt-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          
          <div className="contact-form-element relative group">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="w-full bg-transparent border-b border-white/10 py-4 font-mono text-primary text-lg md:text-xl outline-none focus:border-rust transition-colors placeholder:text-muted/30"
            />
          </div>
          
          <div className="contact-form-element relative group">
            <textarea 
              placeholder="Tell me about your project..." 
              required
              rows={4}
              className="w-full bg-transparent border-b border-white/10 py-4 font-mono text-primary text-lg md:text-xl outline-none focus:border-rust transition-colors resize-none placeholder:text-muted/30"
            />
          </div>
          
          <div className="contact-form-element flex justify-end">
            <button 
              type="submit"
              className="font-mono text-sm tracking-widest text-rust hover:text-primary transition-colors uppercase py-4"
            >
              [ Send Message ]
            </button>
          </div>
          
        </form>
      </div>
    </section>
  )
}
