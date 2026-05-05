import { useRef } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';

export default function SectionHeading({ title, subtitle }) {
  const ref = useRef(null);
  useScrollAnimation(ref, { yOffset: 30, duration: 0.8 });

  return (
    <div ref={ref} className="section-heading" style={{ marginBottom: 'var(--spacing-2xl)', textAlign: 'center' }}>
      <h2 style={{ 
        fontFamily: "'Clash Display', sans-serif", 
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 600,
        color: 'var(--color-text)',
        margin: '0 0 0.5rem 0',
        letterSpacing: '-0.02em'
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ 
          fontFamily: "'Satoshi', sans-serif",
          color: 'var(--color-primary)',
          fontSize: '1.1rem',
          margin: 0,
          fontWeight: 500
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
