import { useRef, useState } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';
import SectionHeading from './SectionHeading';
import { social } from '@data/social';
import emailjs from '@emailjs/browser';

/* Inline SVG icons — no emoji, consistent 20x20 */
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ICON_MAP = { mail: MailIcon, phone: PhoneIcon, location: MapPinIcon };

const contactItems = [
  { icon: 'mail', label: 'Email', value: social.email, href: `mailto:${social.email}` },
  { icon: 'phone', label: 'Phone', value: social.phone },
  { icon: 'location', label: 'Location', value: social.location },
];

export default function ContactSection() {
  const ref = useRef(null);
  const formRef = useRef();
  useScrollAnimation(ref);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // IMPORTANT: Replace these with your actual EmailJS credentials
    // 1. Create an account at https://www.emailjs.com/
    // 2. Add an Email Service (e.g., Gmail)
    // 3. Create an Email Template
    // 4. Fill in the IDs below:
    const SERVICE_ID = 'service_ni4t3uy';
    const TEMPLATE_ID = 'template_bqq3wu3';
    const PUBLIC_KEY = 'ANpieoyoxruIRAT3V';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 3000);
      }, (error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  const iconCircleStyle = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(124, 92, 252, 0.08)',
    border: '1px solid rgba(124, 92, 252, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)',
    flexShrink: 0,
  };

  const inputStyle = {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.85rem 1rem',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-body)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'var(--section-padding) var(--content-padding)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
      }}
    >
      <SectionHeading title="Let's Connect." subtitle="Get In Touch" />

      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--gap-xl)',
          marginTop: 'var(--gap-xl)',
        }}
      >
        {/* Contact Info */}
        <div className="animate-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-height-body)',
              margin: 0,
            }}
          >
            I'm currently looking for new opportunities to contribute to large-scale system
            architectures. Whether you have a question or just want to say hi, I'll try my best
            to get back to you!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
            {contactItems.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const content = (
                <>
                  <div style={iconCircleStyle}>
                    <Icon />
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: 'var(--color-text)',
                        fontWeight: 500,
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--font-size-small)',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </>
              );

              // Only wrap in <a> if there is a href
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--gap-md)',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {content}
                  </a>
                );
              }
              return (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
                  {content}
                </div>
              );
            })}
          </div>

          {/* Social links — clickable, so hover is appropriate */}
          <div style={{ display: 'flex', gap: 'var(--gap-md)', marginTop: 'var(--gap-sm)' }}>
            {social.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 'var(--font-size-small)',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          className="animate-stagger"
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: 'var(--gap-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-md)',
          }}
        >
          {['Name', 'Email'].map((label) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {label}
              </label>
              <input
                required
                name={label.toLowerCase()}
                type={label === 'Email' ? 'email' : 'text'}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
              }}
            >
              Message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            style={{
              background: status === 'success' ? '#10B981' : 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: status === 'idle' ? 'pointer' : 'default',
              transition: 'background 0.2s ease, opacity 0.2s ease',
              marginTop: 'var(--gap-sm)',
            }}
            onMouseEnter={(e) => {
              if (status === 'idle') e.currentTarget.style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {status === 'idle' && 'Send Message'}
            {status === 'sending' && 'Sending...'}
            {status === 'success' && 'Message Sent!'}
          </button>
        </form>
      </div>
    </section>
  );
}
