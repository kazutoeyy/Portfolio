import { useRef } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';
import SectionHeading from './SectionHeading';
import { experience } from '@data/experience';

export default function ExperienceSection() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section
      id="experience"
      style={{
        padding: 'var(--section-padding) var(--content-padding)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <SectionHeading title="Professional Journey." subtitle="Experience" />

      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--gap-xl)',
          marginTop: 'var(--gap-xl)',
          position: 'relative',
        }}
      >
        {/* Vertical timeline line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'var(--color-border)',
          }}
        />

        {experience.map((exp) => (
          <div
            key={exp.id}
            className="animate-stagger"
            style={{
              display: 'flex',
              gap: 'var(--gap-lg)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Timeline dot */}
            <div
              aria-hidden="true"
              style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: 'var(--color-bg)',
                border: '2px solid var(--color-primary)',
                flexShrink: 0,
                marginTop: '4px',
              }}
            />

            {/* Content card */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--gap-lg)',
                flex: 1,
                transition: 'border-color var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 'var(--gap-md)',
                  marginBottom: 'var(--gap-md)',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem 0',
                      letterSpacing: 'var(--letter-spacing-heading)',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {exp.company}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-border)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {exp.duration}
                </span>
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--gap-md)' }}>
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Bullet points */}
              <ul
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-body)',
                  margin: 0,
                  paddingLeft: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
