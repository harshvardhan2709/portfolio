export interface Experience {
  company: string;
  role: string;
  period: string;
  type: 'internship' | 'fulltime' | 'contract';
  description: string;
  achievements: string[];
  technologies: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: 'Climekare Sustainability Private Limited',
    role: 'Full Stack Developer',
    period: 'Aug 2025 — Mar 2026',
    type: 'fulltime',
    description: 'Engineered a scalable full-stack web application using React.js, Node.js, Express.js, and MongoDB supporting 3 user roles, 10+ REST APIs, and end-to-end carbon credit tokenization workflows.',
    achievements: [
      'Engineered a scalable full-stack web application using React.js, Node.js, Express.js, and MongoDB supporting 3 user roles, 10+ REST APIs, and end-to-end carbon credit tokenization workflows.',
      'Architected and secured 10+ RESTful APIs with JWT-based authentication and role-based authorization, improving backend scalability and application performance by 30%.',
      'Designed MongoDB database schemas and optimized queries, reducing query execution time and improving application performance by 30%.',
      'Led frontend-backend integration to deliver scalable production-ready software solutions, ensuring seamless API communication and reliable feature delivery.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT', 'Solidity', 'ERC-1155'],
  },
  {
    company: 'Athena Automation',
    role: 'Front-end Developer',
    period: 'Feb 2024 — Aug 2024',
    type: 'contract',
    description: 'Built a responsive cross-platform mobile application frontend using React Native with role-based access control, reusable UI components, and a shared architecture that reduced development time by 40%.',
    achievements: [
      'Built a responsive cross-platform mobile application frontend using React Native with role-based access control, reusable UI components, and a shared architecture that reduced development time by 40%.',
      'Developed and integrated application features within a 3-member development team, taking ownership of the React Native frontend and delivering scheduled releases on time.',
      'Reduced development time by +40% by architecting a reusable component library, implementing frontend best practices, and improving development efficiency across multiple application modules.',
    ],
    technologies: ['React Native', 'TypeScript', 'JavaScript', 'REST APIs', 'Role-Based Access Control'],
  },
];

