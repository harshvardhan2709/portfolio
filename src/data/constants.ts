// Personal information — single source of truth
export const PERSONAL = {
  name: 'Harshvardhan Sawant',
  firstName: 'Harshvardhan',
  headline: 'Full-Stack & Blockchain Engineer',
  tagline: 'I build web and mobile applications that are fast, accessible, and production-ready.',
  email: 'sawantharsh2022@gmail.com',
  location: 'Pune, Maharashtra, India',
  availability: 'Open to opportunities',
  resumeUrl: '/HARSHVARDHAN_SAWANT_6.pdf',
  currentFocus: 'Carbon credit tokenization with ERC-1155 smart contracts',
} as const;

export const SOCIAL = {
  github: 'https://github.com/harshvardhan2709',
  linkedin: 'https://www.linkedin.com/in/harshvardhan-sawant-86656b266/',
  email: `mailto:${PERSONAL.email}`,
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
