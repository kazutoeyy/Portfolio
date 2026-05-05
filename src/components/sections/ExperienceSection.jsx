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
      }}
    >
      <SectionHeading title="Professional Journey." subtitle="Work Experience" />

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
            left: '20px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
            opacity: 0.3,
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
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--color-bg)',
                border: '2px solid var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 15px rgba(124, 92, 252, 0.3)',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                }}
              />
            </div>

            {/* Content card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: 'var(--gap-lg)',
                flex: 1,
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
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {exp.company}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-small)',
                    color: 'var(--color-primary)',
                    background: 'rgba(124, 92, 252, 0.1)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(124, 92, 252, 0.2)',
                  }}
                >
                  {exp.duration}
                </div>
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
                      background: 'rgba(0, 0, 0, 0.2)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255,255,255,0.05)',
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
