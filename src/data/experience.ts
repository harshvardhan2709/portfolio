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
    role: 'Full Stack Developer Intern',
    period: 'Aug 2025 — Mar 2026',
    type: 'internship',
    description: 'Built a full-stack web application using React.js, Node.js, Express.js, and MongoDB supporting three user roles and end-to-end carbon credit tokenization workflows.',
    achievements: [
      'Built a full-stack web application using React.js, Node.js, Express.js, and MongoDB supporting three user roles and end-to-end carbon credit tokenization workflows.',
      'Developed 10+ RESTful APIs with JWT-based authentication and role-based authorization for secure multi-role access control.',
      'Designed MongoDB schemas and optimized queries, reducing query execution time and improving application response times by 30%.',
      'Owned frontend–backend integration across the application, ensuring consistent API contracts and reliable feature delivery.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'JWT Authentication', 'Role-Based Authorization', 'Solidity', 'ERC-1155'],
  },
  {
    company: 'Athena Automation',
    role: 'Front-end Developer Intern',
    period: 'Feb 2024 — Aug 2024',
    type: 'internship',
    description: 'Built a responsive cross-platform mobile frontend in React Native with role-based access control and a shared component architecture.',
    achievements: [
      'Built a responsive cross-platform mobile frontend in React Native with role-based access control and a shared component architecture.',
      'Architected a reusable component library that cut development time by 40% across multiple application modules.',
      'Delivered the complete React Native frontend across scheduled releases with zero delays, collaborating in a 3-member team and owning all UI modules end-to-end.',
    ],
    technologies: ['React Native', 'TypeScript', 'JavaScript', 'REST APIs', 'Role-Based Access Control', 'UI Component Library'],
  },
];

