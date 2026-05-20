/**
 * Footer.jsx — Minimal footer with social links
 * Sits at bottom of PageWrapper content
 */

import { social } from '@data/social'

export default function Footer() {
  return (
    <footer
      style={{
        padding: 'var(--gap-xl) var(--content-padding)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--gap-md)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-small)',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}
      >
        © 2026 Nguyễn Bùi Gia Huy
      </p>

      <div style={{ display: 'flex', gap: 'var(--gap-lg)', alignItems: 'center' }}>
        {social.links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-small)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  )
}
