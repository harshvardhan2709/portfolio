export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'terminal',
    skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'SQL'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'MVC Architecture'],
  },
  {
    title: 'Frontend & Mobile',
    icon: 'layout',
    skills: ['React.js', 'React Native', 'HTML5', 'CSS3', 'Tailwind CSS', 'NativeWind', 'Material UI'],
  },
  {
    title: 'AI / GenAI',
    icon: 'cpu',
    skills: ['LLM API Integration', 'Groq', 'Llama 3.3', 'Prompt Engineering'],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: ['MongoDB', 'MySQL', 'SQLite', 'Oracle'],
  },
  {
    title: 'Blockchain & Web3',
    icon: 'link',
    skills: ['Solidity (ERC-1155)', 'Hardhat', 'IPFS'],
  },
  {
    title: 'Tools & Platforms',
    icon: 'wrench',
    skills: ['Git', 'GitHub', 'Postman', 'Expo'],
  },
  {
    title: 'Core Concepts',
    icon: 'blocks',
    skills: ['OOP', 'DBMS', 'Database Design', 'SDLC', 'Agile', 'DSA'],
  },
];

