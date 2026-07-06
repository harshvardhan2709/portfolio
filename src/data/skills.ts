export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'layout',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'Next.js'],
  },
  {
    title: 'Mobile',
    icon: 'smartphone',
    skills: ['React Native', 'Expo', 'AsyncStorage', 'Mobile UI/UX'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Express', 'REST APIs', 'Authentication'],
  },
  {
    title: 'Blockchain',
    icon: 'blocks',
    skills: ['Solidity', 'ERC-1155', 'Ethers.js', 'Smart Contracts', 'Web3'],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: ['MongoDB', 'SQL', 'Mongoose'],
  },
  {
    title: 'Tools & DevOps',
    icon: 'terminal',
    skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Vite', 'npm'],
  },
];
