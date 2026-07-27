// Personal information — single source of truth
export const PERSONAL = {
  name: 'Harshvardhan Sawant',
  firstName: 'Harshvardhan',
  headline: 'Full Stack Developer & Software Engineer',
  tagline: 'Building scalable web & mobile applications with React, React Native, Node.js, and Blockchain technology.',
  email: 'sawantharsh2022@gmail.com',
  phone: '+91 9322758958',
  location: 'Pune, Maharashtra, India',
  availability: 'Open to full-time roles & engineering opportunities',
  resumeUrl: '/HARSHVARDHAN_SAWANT_6.pdf',
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

