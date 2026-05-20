export const experience = [
  {
    id: 'fpt-software',
    company: 'FPT Software',
    role: 'Backend Intern',
    duration: 'Dec 2025 - Apr 2026',
    tech: ['C# ASP.NET', 'SQL Server', 'Redis', 'Clean Architecture', 'JWT'],
    description: 'Developed production-ready modules for e-commerce and supply chain systems.',
    bullets: [
      'Architected Delivery Engine managing full lifecycle of logistics orders across 7 complex states.',
      'Optimized high-traffic authentication flows by migrating Refresh Token and OTP operations to Redis In-Memory cache, significantly reducing database load.',
      'Built real-time inventory synchronization between Delivery, Stock, and Inventory services using EF Core.',
      'Designed and implemented secure Authentication & RBAC system using JWT + Google OAuth 2.0.'
    ]
  },
  {
    id: 'tch-company',
    company: 'TCH Company',
    role: 'Backend Developer',
    duration: 'Sep 2025 - Dec 2025',
    tech: ['Java 17', 'Spring Boot', 'MySQL', 'RESTful API'],
    description: 'Engineered backend solutions focusing on secure architectures and performance optimizations.',
    bullets: [
      'Developed end-to-end Cost Estimator module automating final landed cost calculation and optimizing delivery scheduling.',
      'Engineered high-performance improvements reducing product API latency from ~203ms to ~89ms.',
      'Achieved 40% faster cost estimation processing and ~30% reduction in database query response time through refined JPA/Hibernate queries.',
      'Designed and documented clean RESTful endpoints with Swagger for cross-team collaboration.'
    ]
  }
];
