/**
 * ResumePage.jsx — Standalone CV page at /resume
 * Light theme, single A4-style card with drop shadow, Download PDF button
 */

import { useEffect } from 'react'

const SECTIONS = {
  summary: `Third-year Software Engineering student at FPT University with hands-on experience in Java Spring Boot and ASP.NET Core. Focused on building secure, scalable backend systems for e-commerce and supply chain domains. Seeking opportunities to contribute to large-scale system architectures.`,

  education: {
    school: 'FPT University',
    degree: 'Bachelor of Software Engineering',
    gpa: '3.2 / 4.0',
    period: '2022 — Present',
    location: 'Ho Chi Minh City, Vietnam',
  },

  skills: [
    { category: 'Languages', items: 'Java, C#, SQL.' },
    { category: 'Frameworks', items: 'Spring Boot, ASP.NET Core, React.' },
    { category: 'Databases & Caching', items: 'PostgreSQL, MySQL, SQL Server, Redis(Caching, Distributed Locking), MongoDB.' },
    { category: 'Architecture & Engineering', items: 'Modular Monolith, REST API, Clean Architecture, CQRS, Microservices, MVC, SOLID, Design Patterns.' },
    { category: 'DevOps & Tools', items: 'Docker, GitHub Actions, Git, Postman, Swagger, Jira, Nginx.' },
    { category: 'Testing', items: 'GJUnit 5, Mockito, Playwright (E2E).' },
  ],

  experience: [
    {
      role: 'Backend Developer Intern',
      company: 'FPT Software',
      period: 'Jan 2025 — Apr 2025',
      bullets: [
        'Developed RESTful APIs using Spring Boot for internal enterprise applications',
        'Implemented JWT authentication and role-based access control (RBAC)',
        'Optimized database queries resulting in 40% improvement in response time',
        'Collaborated with frontend team using Agile/Scrum methodology',
      ],
    },
    {
      role: 'Backend Developer',
      company: 'TCH Company',
      period: 'Sep 2024 — Dec 2024',
      bullets: [
        'Developed end-to-end Cost Estimator module that automates final landed cost calculation for imported goods and optimizes delivery scheduling using Java Spring Boot and RESTful APIs.',
        'High-performance improvements including product API latency reduction from ~203ms to ~89ms,',
        'Designed and documented clean RESTful endpoints with Swagger',
      ],
    },
  ],

  projects: [
    {
      name: 'Ameri Franchise Coffee — E-commerce Platform',
      tech: 'ASP.NET CORE, SQL Server, EF Core, JWT, Cloudinary, Mailkit, Redis',
      description: [
        'Authentication & Security Module: Designed and implemented a secure authentication system with JWT, Google OAuth 2.0, and Email/Password, integrated RBAC for role-based access control (Admin, Manager, Customer, Staff), and managed sessions using Redis for Refresh Token and OTP storage.',
        'Logistics & Delivery Module: Built the core Delivery Engine handling full lifecycle of Online Orders, Returns, and Internal Transfers across 7 complex states, with real-time cross-service communication between Delivery, Stock, and Inventory using EF Core.',
        'Location & ETA Algorithm: Implemented Haversine algorithm for accurate geo-distance calculation (Lat/Lng) and ETA forecasting to optimize delivery routing.',
        'Paperless Logistics Flow: Developed digital POD (Proof of Delivery) system integrated with Cloudinary for image storage and electronic signature, enabling fully paperless delivery confirmation.',
        'Achieved perfect inventory synchronization by tightly coupling delivery status with automatic stock updates, eliminating data discrepancies between physical and system inventory.',
        'Optimized Authentication performance by migrating Refresh Token and OTP operations to Redis In-Memory cache, reducing database queries by 40% on high-traffic APIs.',
        'Successfully digitized the entire logistics process from manual to 100% paperless using Cloudinary and real-time notifications, significantly improving operational efficiency and customer experience.'
      ],
    },
    {
      name: 'EV Battery Trading Platform',
      tech: 'Spring Boot, Hibernate, Spring Security(JWT), SQL Server, VNPay, DocuSeal API, Cloudinary, RESTful API',
      description: 'B2B trading platform for electric vehicle batteries with real-time bidding, supply chain tracking, and automated compliance reporting.',
    },
  ],

  languages: [
    { lang: 'Vietnamese', level: 'Native' },
    { lang: 'English', level: 'B1 (Intermediate)' },
    { lang: 'Japanese', level: 'N5 (Basic)' },
  ],
}

export default function ResumePage() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    return () => document.documentElement.removeAttribute('data-theme')
  }, [])

  return (
    <div style={s.page}>
      {/* Fixed download button */}
      <a
        href="/Nguyen-Bui-Gia-Huy.pdf"
        download
        style={s.downloadBtn}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#D43D22' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#E54B2D' }}
      >
        ↓ Download PDF
      </a>

      {/* Back link */}
      <a href="/" style={s.backLink}>← Back to Portfolio</a>

      {/* Single A4-style card */}
      <div style={s.card}>
        {/* Header */}
        <header style={s.header}>
          <h1 style={s.name}>Nguyễn Bùi Gia Huy</h1>
          <p style={s.role}>Backend Engineer</p>
          <div style={s.contactRow}>
            <span>Ho Chi Minh City, Vietnam</span>
            <span style={s.dot}>·</span>
            <a href="mailto:nguyenbuigiahuy2507@gmail.com" style={s.link}>nguyenbuigiahuy2507@gmail.com</a>
            <span style={s.dot}>·</span>
            <a href="https://github.com/kazutoeyy" target="_blank" rel="noreferrer" style={s.link}>github.com/kazutoeyy</a>
          </div>
        </header>

        <hr style={s.hr} />

        {/* Summary */}
        <section>
          <h2 style={s.h2}>Summary</h2>
          <p style={s.body}>{SECTIONS.summary}</p>
        </section>

        <hr style={s.hr} />

        {/* Education */}
        <section>
          <h2 style={s.h2}>Education</h2>
          <div style={s.row}>
            <div>
              <strong style={s.strong}>{SECTIONS.education.school}</strong>
              <p style={s.sub}>{SECTIONS.education.degree}</p>
            </div>
            <div style={s.period}>
              <div>{SECTIONS.education.period}</div>
              <div style={s.sub}>{SECTIONS.education.location}</div>
            </div>
          </div>
          <p style={s.body}>GPA: {SECTIONS.education.gpa}</p>
        </section>

        <hr style={s.hr} />

        {/* Technical Skills */}
        <section>
          <h2 style={s.h2}>Technical Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {SECTIONS.skills.map((sk) => (
              <div key={sk.category} style={s.skillRow}>
                <span style={s.skillCat}>{sk.category}</span>
                <span style={s.body}>{sk.items}</span>
              </div>
            ))}
          </div>
        </section>

        <hr style={s.hr} />

        {/* Work Experience */}
        <section>
          <h2 style={s.h2}>Work Experience</h2>
          {SECTIONS.experience.map((exp) => (
            <div key={exp.role} style={{ marginBottom: '1.5rem' }}>
              <div style={s.row}>
                <div>
                  <strong style={s.strong}>{exp.role}</strong>
                  <p style={s.sub}>{exp.company}</p>
                </div>
                <span style={s.period}>{exp.period}</span>
              </div>
              <ul style={s.ul}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={s.li}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr style={s.hr} />

        {/* Projects */}
        <section>
          <h2 style={s.h2}>Projects</h2>
          {SECTIONS.projects.map((p) => (
            <div key={p.name} style={{ marginBottom: '1.25rem' }}>
              <strong style={s.strong}>{p.name}</strong>
              <p style={{ ...s.sub, margin: '0.2rem 0' }}>{p.tech}</p>
              <p style={s.body}>{p.description}</p>
            </div>
          ))}
        </section>

        <hr style={s.hr} />

        {/* Languages */}
        <section>
          <h2 style={s.h2}>Languages</h2>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {SECTIONS.languages.map((l) => (
              <span key={l.lang} style={s.body}>
                <strong>{l.lang}</strong> — {l.level}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Styles ────────────────────────────────────────────── */
const s = {
  page: {
    minHeight: '100vh',
    background: '#EBEBEB',
    padding: '2rem 1.5rem 4rem',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '3rem 3.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.08), 0 24px 56px rgba(0,0,0,0.06)',
    position: 'relative',
  },
  downloadBtn: {
    position: 'fixed',
    top: '1.5rem',
    right: '2rem',
    background: '#E54B2D',
    color: '#fff',
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: '0.875rem',
    zIndex: 100,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    boxShadow: '0 2px 8px rgba(229,75,45,0.3)',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '1.5rem',
    color: '#888',
    textDecoration: 'none',
    fontSize: '0.875rem',
    cursor: 'pointer',
    maxWidth: '800px',
    margin: '0 auto 1rem',
  },
  header: { marginBottom: '0.25rem' },
  name: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: '0 0 0.25rem 0',
    letterSpacing: '-0.025em',
    lineHeight: 1.1,
    color: '#111',
  },
  role: {
    fontSize: '1.1rem',
    color: '#555',
    margin: '0 0 0.75rem 0',
  },
  contactRow: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    fontSize: '0.875rem',
    color: '#666',
  },
  dot: { color: '#ccc' },
  link: { color: '#E54B2D', textDecoration: 'none' },
  hr: {
    border: 'none',
    borderTop: '1px solid #E8E8E8',
    margin: '1.5rem 0',
  },
  h2: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#111',
    marginBottom: '1rem',
  },
  body: {
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#444',
    margin: 0,
  },
  strong: { fontSize: '1rem', color: '#111' },
  sub: { fontSize: '0.85rem', color: '#777', margin: '0.1rem 0 0 0' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },
  period: {
    fontSize: '0.875rem',
    color: '#888',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  skillRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: '1rem',
    fontSize: '0.95rem',
  },
  skillCat: { fontWeight: 600, color: '#111' },
  ul: {
    margin: 0,
    paddingLeft: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  li: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    color: '#444',
  },
}
