export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'terminal',
    skills: ['JavaScript', 'TypeScript', 'Java', 'SQL'],
  },
  {
    title: 'Frontend & Mobile',
    icon: 'layout',
    skills: ['React.js', 'React Native', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Backend & Web3',
    icon: 'server',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'MVC Architecture', 'Solidity (ERC-1155)'],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: ['MySQL', 'MongoDB', 'Oracle', 'SQLite'],
  },
  {
    title: 'Tools & Platforms',
    icon: 'smartphone',
    skills: ['Git', 'GitHub', 'Postman', 'Expo', 'Hardhat', 'IPFS'],
  },
  {
    title: 'Core Concepts',
    icon: 'blocks',
    skills: ['Object-Oriented Programming (OOP)', 'DBMS', 'Database Design', 'SDLC', 'Agile Methodology'],
  },
];

