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
      }}
    >
      <SectionHeading title="Technical Arsenal." subtitle="Core Competencies & Technologies" />

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
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: 'var(--gap-lg)',
              backdropFilter: 'blur(10px)',
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
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: skillGroup.color,
                  boxShadow: `0 0 10px ${skillGroup.color}`,
                }}
              />
              {skillGroup.category}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skillGroup.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-text-muted)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.03)',
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
