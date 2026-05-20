import { useRef } from 'react';
import useScrollAnimation from '@hooks/useScrollAnimation';

export default function AboutSection() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section
      id="about"
      style={{
        padding: 'var(--section-padding) var(--content-padding)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
      }}
    >
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 'var(--gap-xl)',
          alignItems: 'start',
        }}
      >
        {/* ─── Portrait ─────────────────────────────── */}
        <div className="animate-stagger" style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '-12px',
              bottom: '-12px',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', overflow: 'visible' }}>
            <img
              src="/ava1.jpg"
              alt="Nguyễn Bùi Gia Huy"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: '12px',
                display: 'block',
                marginTop: '-16px',
                position: 'relative',
                zIndex: 1,
                filter: 'grayscale(20%) contrast(1.05)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '35%',
                background: 'linear-gradient(to top, var(--color-bg), transparent)',
                borderRadius: '0 0 12px 12px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* ─── Content ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
          {/* Label + Name */}
          <div className="animate-stagger">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-primary)',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              About Me
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-h1)',
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: 'var(--line-height-heading)',
                letterSpacing: 'var(--letter-spacing-heading)',
                margin: 0,
              }}
            >
              Nguyễn Bùi
              <br />
              Gia Huy<span style={{ color: 'var(--color-primary)' }}>.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.5rem',
              }}
            >
              Backend Engineer · FPT University · HCM City
            </p>
          </div>

          {/* Bio */}
          <p
            className="animate-stagger"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body)',
              lineHeight: 'var(--line-height-body)',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: 0,
            }}
          >
            Third-year Software Engineering student specializing in{' '}
            <strong style={{ color: 'var(--color-text)' }}>Java Spring Boot</strong> and{' '}
            <strong style={{ color: 'var(--color-text)' }}>ASP.NET Core</strong>. I build
            production-ready backend systems focused on secure architectures, real-time
            features, and scalable designs for e-commerce and supply chain domains.
          </p>

          {/* Stats */}
          <div
            className="animate-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--gap-md)',
              maxWidth: '360px',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                0.5+
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                Year
                <br />
                Experience
              </p>
            </div>
            <div
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                3+
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-small)',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                Technical
                <br />
                Projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
