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
          gridTemplateColumns: '300px 1fr',
          gap: 'var(--gap-xl)',
          alignItems: 'start',
        }}
      >
        {/* ─── Portrait ─────────────────────────────── */}
        <div className="animate-stagger" style={{ position: 'relative' }}>
          {/* Decorative offset frame */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              right: '-14px',
              bottom: '-14px',
              borderRadius: '20px',
              border: '1.5px solid rgba(124, 92, 252, 0.2)',
              pointerEvents: 'none',
            }}
          />
          {/* Photo — overflow: visible so portrait can break out of frame */}
          <div style={{ position: 'relative', overflow: 'visible' }}>
            <img
              src="/ava1.jpg"
              alt="Nguyễn Bùi Gia Huy"
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: '20px',
                display: 'block',
                marginTop: '-20px',
                position: 'relative',
                zIndex: 1,
                filter: 'grayscale(15%) contrast(1.05)',
              }}
            />
            {/* Bottom gradient fade */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '35%',
                background: 'linear-gradient(to top, var(--color-bg), transparent)',
                borderRadius: '0 0 20px 20px',
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
                letterSpacing: '0.08em',
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
                fontWeight: 600,
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
        </div>
      </div>
    </section>
  );
}
