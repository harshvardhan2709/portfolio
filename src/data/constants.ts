// Personal information — single source of truth
export const PERSONAL = {
  name: 'Harshvardhan Sawant',
  fullName: 'Harshvardhan Uttam Sawant',
  firstName: 'Harshvardhan',
  headline: 'Software Engineer & Full Stack Developer',
  tagline: 'Software Engineer with experience across full-stack web and cross-platform mobile development.',
  summary: 'Software Engineer with experience across full-stack web and cross-platform mobile development. Built production applications using React.js, React Native, Node.js, Express.js, MongoDB, and REST APIs. Experience with JWT-based authentication, role-based authorization, database schema design, and query optimization. B.E. Information Technology, 2026.',
  email: 'sawantharsh2022@gmail.com',
  phone: '+91 9322758958',
  location: 'Pune, Maharashtra, India',
  availability: 'Open to full-time roles & engineering opportunities',
  resumeUrl: '/HARSHVARDHAN_SAWANT.pdf',
  currentFocus: 'Full-stack Web & Mobile Applications and Blockchain Credit Tokenization',
} as const;

export const SOCIAL = {
  github: 'https://github.com/harshvardhan2709',
  linkedin: 'https://www.linkedin.com/in/harshvardhan-sawant-86656b266/',
  email: `mailto:${PERSONAL.email}`,
  phone: `tel:${PERSONAL.phone.replace(/\s+/g, '')}`,
} as const;

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export const SECTION_IDS = NAV_ITEMS.map(item => item.id);

