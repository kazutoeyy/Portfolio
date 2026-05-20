import { useRef } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';

export default function SectionHeading({ title, subtitle }) {
  const ref = useRef(null);
  useScrollAnimation(ref, { yOffset: 20, duration: 0.8 });

  return (
    <div ref={ref} style={{ marginBottom: 'var(--gap-xl)' }}>
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-small)',
          color: 'var(--color-primary)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          {subtitle}
        </p>
      )}
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-h1)',
        fontWeight: 700,
        color: 'var(--color-text)',
        margin: 0,
        letterSpacing: 'var(--letter-spacing-heading)',
        lineHeight: 'var(--line-height-heading)',
      }}>
        {title}
      </h2>
    </div>
  );
}
