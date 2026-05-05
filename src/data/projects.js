export const projects = [
  {
    id: 'ameri-coffee',
    title: 'Ameri Franchise Coffee',
    role: 'Backend Developer',
    duration: 'Jan 2026 - Apr 2026',
    tech: ['ASP.NET Core', 'SQL Server', 'EF Core', 'Redis', 'Cloudinary', 'Mailkit'],
    description: 'Designed and implemented secure authentication and logistics delivery modules for a coffee franchise.',
    problem: 'Manual logistics process causing delays and inventory discrepancies.',
    solution: 'Built a core Delivery Engine handling 7 complex states, implemented Haversine geo-routing for accurate ETA, and a digital POD system using Cloudinary.',
    result: 'Digitized logistics to 100% paperless, optimized high-traffic APIs by 40% using Redis caching, and achieved perfect inventory synchronization.',
    github: 'https://github.com/kazutoeyy/Ameri-Cohi-backend.git',
    live: null
  },
  {
    id: 'ev-battery',
    title: 'Second Hand EV Battery Trading',
    role: 'Backend Developer',
    duration: 'Sep 2025 - Dec 2025',
    tech: ['Java 17', 'Spring Boot 3.x', 'Hibernate', 'JWT', 'SQL Server', 'VNPay', 'WebSocket'],
    description: 'Architected backend infrastructure for an EV battery trading platform with secure escrow payment and real-time features.',
    problem: 'Need for a secure, transparent trading platform with complex order life-cycles and real-time negotiation.',
    solution: 'Engineered a secure escrow system with VNPay, real-time chat with WebSocket (STOMP), and automated contract generation via DocuSeal API.',
    result: 'Delivered a robust platform supporting 5 distinct actor types and an intelligent price suggestion engine using Google Gemini AI.',
    github: 'https://github.com/kazutoeyy/Second-hand-EV-Battery-Trading-BE.git',
    live: null
  }
];
