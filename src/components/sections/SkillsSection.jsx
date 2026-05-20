import { useRef } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';
import SectionHeading from './SectionHeading';
import { skills } from '@data/skills';

export default function SkillsSection() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section
      id="skills"
      style={{
        padding: 'var(--section-padding) var(--content-padding)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <SectionHeading title="Technical Arsenal." subtitle="Core Competencies" />

      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--gap-lg)',
          marginTop: 'var(--gap-xl)',
        }}
      >
        {skills.map((skillGroup, idx) => (
          <div
            key={idx}
            className="animate-stagger"
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--gap-lg)',
              transition: 'border-color var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h3)',
                color: 'var(--color-text)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                }}
              />
              {skillGroup.category}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skillGroup.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
