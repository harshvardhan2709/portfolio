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
    company: 'Climekare',
    role: 'Frontend Developer Intern',
    period: 'Jan 2025 — Present',
    type: 'internship',
    description: 'Contributing to a carbon credit tokenization platform, building the frontend interface and integrating blockchain functionality using ERC-1155 smart contracts.',
    achievements: [
      'Architecting the frontend for a blockchain-based carbon credit marketplace',
      'Integrating ERC-1155 smart contract interactions via Ethers.js',
      'Building responsive UI components with React and TypeScript',
      'Collaborating with the blockchain team on Web3 wallet integration',
    ],
    technologies: ['React', 'TypeScript', 'Ethers.js', 'ERC-1155', 'Tailwind CSS'],
  },
  {
    company: 'Athena Automation',
    role: 'Frontend Developer Intern',
    period: 'Aug 2024 — Nov 2024',
    type: 'internship',
    description: 'Built frontend features and integrated REST APIs for automation software, delivering production-ready components on schedule.',
    achievements: [
      'Developed production frontend components using React',
      'Integrated RESTful API endpoints for automation workflows',
      'Improved UI responsiveness across multiple device breakpoints',
      'Participated in code reviews and agile sprint planning',
    ],
    technologies: ['React', 'REST APIs', 'JavaScript', 'CSS'],
  },
];
