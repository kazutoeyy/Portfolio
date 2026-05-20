import { useRef } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';
import SectionHeading from './SectionHeading';
import { projects } from '@data/projects';

export default function ProjectsSection() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section
      id="projects"
      style={{
        padding: 'var(--section-padding) var(--content-padding)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <SectionHeading title="Selected Works." subtitle="Projects" />

      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--gap-xl)',
          marginTop: 'var(--gap-xl)',
        }}
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className="animate-stagger"
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--gap-xl)',
              transition: 'border-color var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: 'var(--gap-lg)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  color: 'var(--color-text)',
                  margin: '0 0 0.5rem 0',
                  letterSpacing: 'var(--letter-spacing-heading)',
                }}
              >
                {project.title}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <span>{project.role}</span>
                <span style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}>|</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{project.duration}</span>
              </div>
            </div>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--gap-lg)' }}>
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Challenge / Solution / Result */}
            <div
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-body)',
                fontSize: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--gap-md)',
                marginBottom: 'var(--gap-lg)',
              }}
            >
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--color-text)' }}>Challenge:</strong> {project.problem}
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--color-text)' }}>Solution:</strong> {project.solution}
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--color-primary)' }}>Result:</strong> {project.result}
              </p>
            </div>

            {/* Link */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-border)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'border-color var(--transition-fast), background var(--transition-fast)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.background = 'rgba(229, 75, 45, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                View Source →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
