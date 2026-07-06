export interface Project {
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  impact: string;
  description: string;
  tags: string[];
  features: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Carbon Credit Tokenization',
    subtitle: 'Blockchain · Smart Contracts · Web3',
    problem: 'Carbon credit markets lack transparency and accessibility for smaller participants.',
    solution: 'Building a tokenization platform using ERC-1155 smart contracts that enables fractional ownership and transparent trading of carbon credits on the blockchain.',
    impact: 'Enabling verifiable, decentralized carbon credit trading with immutable audit trails.',
    description: 'Architecting a blockchain-based platform for tokenizing carbon credits using the ERC-1155 multi-token standard. Integrating smart contract logic with a React frontend and Node.js backend for seamless Web3 interactions.',
    tags: ['Solidity', 'ERC-1155', 'React', 'Node.js', 'Ethers.js', 'Web3'],
    features: [
      'ERC-1155 multi-token smart contracts',
      'Fractional carbon credit ownership',
      'Blockchain-verified transaction history',
      'Web3 wallet integration',
    ],
    github: 'https://github.com/harshvardhan2709',
    featured: true,
    year: '2025',
  },
  {
    title: 'Movies Website',
    subtitle: 'Full-Stack · MERN · API Integration',
    problem: 'Users needed a streamlined way to discover, search, and save movies with personalized watchlists.',
    solution: 'Built a full-stack movie discovery platform with TMDB API integration, user authentication, and a persistent watchlist system backed by MongoDB.',
    impact: 'Handled API rate limiting, implemented caching strategies, and delivered a responsive, performant UI.',
    description: 'A full-stack movie discovery application integrating the TMDB API with a custom Node.js backend for authentication and user data persistence. Features include search, filtering, and a personalized watchlist system.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'TMDB API'],
    features: [
      'TMDB API integration with smart caching',
      'User authentication and authorization',
      'Persistent watchlist with MongoDB',
      'Responsive search and filtering',
    ],
    github: 'https://github.com/harshvardhan2709/Movies-Website',
    demo: 'https://github.com/harshvardhan2709/Movies-Website',
    year: '2024',
  },
  {
    title: 'Getlancer',
    subtitle: 'Marketplace · Role-Based · Team Project',
    problem: 'Freelancers and clients needed a platform with clear role separation and streamlined workflows.',
    solution: 'Developed a freelance marketplace with role-based dashboards for clients and freelancers, complete with authentication and project management flows.',
    impact: 'Designed the client-side dashboard architecture and authentication system, managing state across multiple user roles.',
    description: 'A freelance marketplace platform featuring role-based dashboards, secure authentication, and project management capabilities. Built collaboratively with a team — led frontend development for the client dashboard and auth flows.',
    tags: ['React', 'Tailwind CSS', 'MongoDB', 'Express', 'Auth'],
    features: [
      'Role-based dashboards (client/freelancer)',
      'Secure authentication flow',
      'Project management interface',
      'Responsive Tailwind CSS design',
    ],
    github: 'https://github.com/prathmesh796/getlancer',
    year: '2024',
  },
  {
    title: 'IoT Gate Control App',
    subtitle: 'Mobile · React Native · IoT',
    problem: 'Managing physical access control for IoT-connected gates required a mobile solution with multi-level permissions.',
    solution: 'Built a React Native mobile application with three-tier role-based access (Super Admin, Admin, User) and REST API integration for real-time gate control.',
    impact: 'Implemented secure token-based authentication with AsyncStorage and role-based permission handling across the mobile app.',
    description: 'A React Native mobile application for controlling IoT-connected gates with three-tier access control. Features include real-time gate status, role-based permissions, and secure API token management.',
    tags: ['React Native', 'IoT', 'REST API', 'AsyncStorage'],
    features: [
      'Three-tier role-based access control',
      'Real-time IoT gate status monitoring',
      'Secure token-based authentication',
      'Cross-platform mobile deployment',
    ],
    github: 'https://github.com/vishu-2004/IoT-Gate-Control-and-Access-management-app',
    year: '2024',
  },
];
