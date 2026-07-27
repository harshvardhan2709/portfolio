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
    title: 'Blockchain-Based Carbon Credit Tokenization Platform',
    subtitle: 'Blockchain · Full-Stack · ERC-1155 · Web3',
    problem: 'Traditional carbon markets lack verifiable ownership, transparent credit retirement, and protection against double counting.',
    solution: 'Engineered a full-stack tokenization platform with 2 ERC-1155 smart contracts, IPFS metadata storage, 10+ REST APIs, and automated NFT certificate generation.',
    impact: 'Enables end-to-end verifiable carbon credit ownership, retirement tracking, and QR-based public verification without double counting.',
    description: 'A full-stack blockchain platform supporting 3 user roles and end-to-end carbon credit tokenization workflows. Engineered 2 ERC-1155 smart contracts for token issuance, transfer, and retirement with IPFS metadata storage and QR-based public verification.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Solidity', 'Hardhat', 'IPFS', 'JWT', 'Material UI'],
    features: [
      'Engineered 2 ERC-1155 smart contracts for token issuance, transfer, and retirement, preventing double counting',
      'Developed a full-stack platform supporting 3 user roles and end-to-end carbon credit tokenization workflows',
      'Implemented secure 10+ RESTful APIs and NoSQL database operations for complex business workflows',
      'Integrated IPFS-based decentralized metadata storage, automated NFT certificate generation, and QR public verification',
    ],
    github: 'https://github.com/harshvardhan2709',
    featured: true,
    year: '2025 - 2026',
  },
  {
    title: 'Cross-Platform Offline Music Player & Audio App',
    subtitle: 'Mobile · React Native · AI · Local-First',
    problem: 'Mobile music audio applications struggle with offline metadata performance, smart offline recommendations, and fast local file sharing.',
    solution: 'Built a local-first React Native app with SQLite metadata indexing for 4000+ songs, Groq API (Llama 3.3 70B) AI genre classification, and TCP socket P2P file transfer.',
    impact: 'Delivered zero-latency offline playback, AI playlist auto-generation with local caching fallback, and high-speed offline peer-to-peer song transfer.',
    description: 'A local-first cross-platform music player supporting offline playback and playlist management for 2000+ song libraries, indexed SQLite metadata storage for 4000+ songs, AI playlist generation via Llama 3.3 70B (Groq API), and TCP socket P2P transfer.',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'NativeWind', 'Groq API', 'Llama 3.3', 'TCP Sockets'],
    features: [
      'Local-first music player supporting offline playback, playlist management, and indexing for 2000+ song libraries',
      'SQLite-based metadata management system with indexed storage and optimized query execution for 4000+ songs',
      'Integrated AI genre classification using Llama 3.3 70B model (Groq API) for automated playlist generation with offline fallback',
      'Built a peer-to-peer music sharing system using TCP sockets and QR-based device pairing for high-speed offline transfer',
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

