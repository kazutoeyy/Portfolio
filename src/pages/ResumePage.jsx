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
      description: ['B2B trading platform for electric vehicle batteries with real-time bidding, supply chain tracking, and automated compliance reporting.',
        'Architected entire backend infrastructure from scratch and designed a normalized SQL Server database with 17 tables supporting complex order life-cycles and RBAC for 5 distinct actor types.',
        'Engineered a secure escrow payment system integrated with VNPay, implementing state-machine flows for automated dispute resolution and refunds.',
        'Integrated DocuSeal API via webhooks to automate legally-binding electronic contract generation upon checkout.',
        'Implemented intelligent price suggestion engine using Google Gemini AI to assist sellers based on vehicle conditions.',
        'Built real-time chat and notification system with WebSocket (STOMP) for seamless buyer-seller communication.',
        'Designed and secured 100+ RESTful APIs using Spring Security (JWT) and Hibernate, optimized complex product filtering queries while mitigating common security vulnerabilities'
      ],
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
      {/* Dynamic CSS Stylesheet for print and responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html, #root {
            background: #ffffff !important;
            color: #111111 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-card {
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            background: transparent !important;
          }
          .cv-section {
            page-break-inside: avoid;
            margin-bottom: 1.2rem !important;
          }
          .cv-hr {
            margin: 1rem 0 !important;
          }
        }

        @media (max-width: 640px) {
          .cv-card {
            padding: 2rem 1.5rem !important;
          }
          .cv-name {
            font-size: 2rem !important;
          }
          .cv-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.2rem;
          }
          .cv-period {
            text-align: left !important;
          }
          .cv-skill-row {
            grid-template-columns: 1fr !important;
            gap: 0.2rem !important;
          }
          .cv-contact {
            flex-direction: column;
            gap: 0.25rem !important;
          }
          .cv-contact span {
            display: none !important;
          }
        }
      `}} />

      {/* Fixed download button */}
      <a
        href="/Nguyen-Bui-Gia-Huy.pdf"
        download
        className="no-print"
        style={s.downloadBtn}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#D43D22' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#E54B2D' }}
      >
        ↓ Download PDF
      </a>

      {/* Back link */}
      <a href="/" className="no-print" style={s.backLink}>← Back to Portfolio</a>

      {/* Single A4-style card */}
      <div className="print-card cv-card" style={s.card}>
        {/* Header */}
        <header style={s.header}>
          <h1 className="cv-name" style={s.name}>Nguyễn Bùi Gia Huy</h1>
          <p style={s.role}>Backend Engineer</p>
          <div className="cv-contact" style={s.contactRow}>
            <span>Ho Chi Minh City, Vietnam</span>
            <span style={s.dot}>·</span>
            <a href="mailto:nguyenbuigiahuy2507@gmail.com" style={s.link}>nguyenbuigiahuy2507@gmail.com</a>
            <span style={s.dot}>·</span>
            <a href="https://github.com/kazutoeyy" target="_blank" rel="noreferrer" style={s.link}>github.com/kazutoeyy</a>
          </div>
        </header>

        <hr className="cv-hr" style={s.hr} />

        {/* Summary */}
        <section className="cv-section" style={s.section}>
          <h2 style={s.h2}>Summary</h2>
          <p style={s.body}>{SECTIONS.summary}</p>
        </section>

        <hr className="cv-hr" style={s.hr} />

        {/* Education */}
        <section className="cv-section" style={s.section}>
          <h2 style={s.h2}>Education</h2>
          <div className="cv-row" style={s.row}>
            <div>
              <strong style={s.strong}>{SECTIONS.education.school}</strong>
              <p style={s.sub}>{SECTIONS.education.degree}</p>
            </div>
            <div className="cv-period" style={s.period}>
              <div style={s.dateText}>{SECTIONS.education.period}</div>
              <div style={s.sub}>{SECTIONS.education.location}</div>
            </div>
          </div>
          <p style={{ ...s.body, marginTop: '0.4rem', fontSize: '0.9rem' }}>
            <strong>GPA:</strong> {SECTIONS.education.gpa}
          </p>
        </section>

        <hr className="cv-hr" style={s.hr} />

        {/* Technical Skills */}
        <section className="cv-section" style={s.section}>
          <h2 style={s.h2}>Technical Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SECTIONS.skills.map((sk) => (
              <div key={sk.category} className="cv-skill-row" style={s.skillRow}>
                <span style={s.skillCat}>{sk.category}</span>
                <span style={s.body}>{sk.items}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="cv-hr" style={s.hr} />

        {/* Work Experience */}
        <section className="cv-section" style={s.section}>
          <h2 style={s.h2}>Work Experience</h2>
          {SECTIONS.experience.map((exp, idx) => (
            <div key={exp.role} style={{ marginBottom: idx === SECTIONS.experience.length - 1 ? 0 : '1.25rem' }}>
              <div className="cv-row" style={s.row}>
                <div>
                  <strong style={s.strong}>{exp.role}</strong>
                  <p style={s.sub}>{exp.company}</p>
                </div>
                <div className="cv-period" style={s.period}>
                  <span style={s.dateText}>{exp.period}</span>
                </div>
              </div>
              <ul style={s.ul}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={s.li}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="cv-hr" style={s.hr} />

        {/* Projects */}
        <section className="cv-section" style={s.section}>
          <h2 style={s.h2}>Projects</h2>
          {SECTIONS.projects.map((p, idx) => (
            <div key={p.name} style={{ marginBottom: idx === SECTIONS.projects.length - 1 ? 0 : '1.5rem' }}>
              <div className="cv-row" style={s.row}>
                <div>
                  <strong style={s.strong}>{p.name}</strong>
                </div>
              </div>
              <p style={s.tech}>{p.tech}</p>
              <ul style={s.ul}>
                {p.description.map((desc, i) => (
                  <li key={i} style={s.li}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <hr className="cv-hr" style={s.hr} />

        {/* Languages */}
        <section className="cv-section" style={s.section}>
          <h2 style={s.h2}>Languages</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {SECTIONS.languages.map((l) => (
              <span key={l.lang} style={s.body}>
                <strong style={{ color: '#111' }}>{l.lang}</strong> — {l.level}
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
    background: '#F1F5F9', // Subtle, professional slate background
    padding: '2.5rem 1.5rem 5rem',
    fontFamily: "'Inter', sans-serif",
    color: '#334155',
  },
  card: {
    maxWidth: '820px',
    margin: '0 auto',
    background: '#FFFFFF',
    borderRadius: '8px', // More professional CV style border radius
    padding: '3.5rem 4rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.04)',
    position: 'relative',
  },
  downloadBtn: {
    position: 'fixed',
    top: '1.5rem',
    right: '2rem',
    background: '#E54B2D',
    color: '#fff',
    padding: '0.6rem 1.4rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: '0.875rem',
    zIndex: 100,
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.1s ease',
    boxShadow: '0 4px 12px rgba(229,75,45,0.2)',
  },
  backLink: {
    display: 'block',
    color: '#64748B',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    maxWidth: '820px',
    margin: '0 auto 1.5rem',
    transition: 'color 0.2s ease',
  },
  header: { marginBottom: '0.5rem' },
  name: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '2.25rem',
    fontWeight: 700,
    margin: '0 0 0.2rem 0',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    color: '#0F172A',
  },
  role: {
    fontSize: '1.05rem',
    fontWeight: 500,
    color: '#E54B2D', // Use primary branding color for role
    margin: '0 0 0.5rem 0',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  contactRow: {
    display: 'flex',
    gap: '0.6rem',
    flexWrap: 'wrap',
    fontSize: '0.85rem',
    color: '#64748B',
    alignItems: 'center',
  },
  dot: { color: '#CBD5E1' },
  link: { 
    color: '#64748B', 
    textDecoration: 'none', 
    borderBottom: '1px solid transparent',
    transition: 'color 0.2s ease, border-color 0.2s ease',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #E2E8F0',
    margin: '1.25rem 0',
  },
  h2: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#0F172A',
    marginBottom: '0.75rem',
  },
  body: {
    fontSize: '0.925rem',
    lineHeight: 1.55,
    color: '#334155',
    margin: 0,
  },
  strong: { 
    fontSize: '0.975rem', 
    fontWeight: 600,
    color: '#0F172A' 
  },
  sub: { 
    fontSize: '0.875rem', 
    fontWeight: 500,
    color: '#64748B', 
    margin: '0.15rem 0 0 0' 
  },
  tech: {
    fontSize: '0.825rem',
    fontWeight: 600,
    fontFamily: 'monospace',
    color: '#64748B',
    background: '#F8FAFC',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    display: 'inline-block',
    margin: '0.25rem 0 0.5rem 0',
    border: '1px solid #F1F5F9',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.25rem',
  },
  period: {
    fontSize: '0.85rem',
    color: '#64748B',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  dateText: {
    fontWeight: 600,
    color: '#475569',
  },
  skillRow: {
    display: 'grid',
    gridTemplateColumns: '170px 1fr',
    gap: '1.25rem',
    fontSize: '0.925rem',
    alignItems: 'baseline',
  },
  skillCat: { 
    fontWeight: 600, 
    color: '#334155',
  },
  ul: {
    margin: '0.5rem 0 0 0',
    paddingLeft: '1.15rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  li: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    color: '#475569',
  },
  section: {
    margin: 0,
  }
}
