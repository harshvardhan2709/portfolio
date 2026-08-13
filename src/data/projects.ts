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
    title: 'FotoOwl Gallery — Cross-Platform Mobile Photo Discovery App',
    subtitle: 'Mobile · React Native · Expo SDK 57 · NativeWind · Zustand',
    problem: 'Mobile gallery applications often face performance bottlenecks with infinite scroll pagination, image state management, multi-user local data isolation, and UI latency during rapid search and filtering.',
    solution: 'Built a high-performance cross-platform mobile gallery app with React Native, Expo SDK 57, and Zustand. Integrated Lorem Picsum REST API with 300ms debounced search, initial-range author filters, alphabetical sorting, per-user scoped favorites persistence via AsyncStorage, high-res lightbox viewer, and native gallery downloading/social sharing.',
    impact: 'Engineered zero-lag search filtering, seamless multi-user session & favorites isolation, infinite scroll batch deduplication, and direct native device media library & social sheet integration.',
    description: 'A production-ready cross-platform mobile image gallery app built with React Native, Expo SDK 57, Expo Router, NativeWind, and Zustand. Features gated session authentication, 2-column grid infinite scrolling using Lorem Picsum REST API, debounced search, author initial filters (A-M, N-Z), per-user scoped favorites persistence, full-screen lightbox, native photo saving, and native social sharing.',
    tags: ['React Native', 'Expo SDK 57', 'Expo Router', 'TypeScript', 'NativeWind', 'Zustand', 'AsyncStorage', 'REST API', 'React Native Reanimated'],
    features: [
      'Implemented persistent session authentication with RFC email validation, multi-user directory storage, and gated tab routing',
      'Engineered a 2-column grid gallery with infinite scrolling, 20-image batch fetch concurrency guards, and Set deduplication',
      'Designed multi-faceted search & filtering: 300ms debounced search, author initial range filters (A-M, N-Z), and A-Z/Z-A sorting',
      'Built a per-user scoped favorites system (@fotowl/favorites_<email>) with instant cross-screen optimistic UI synchronization',
      'Integrated native media library downloads via Expo FileSystem & MediaLibrary and native share sheet via Expo Sharing',
    ],
    github: 'https://github.com/harshvardhan2709/FotoOwlGallery',
    featured: true,
    year: '2026',
  },
  {
    title: 'Blockchain-Based Carbon Credit Tokenization and Carbon Off-Set Platform',
    subtitle: 'Blockchain · Full-Stack · ERC-1155 · Solidity · IPFS · Web3',
    problem: 'Traditional carbon markets lack verifiable ownership, transparent credit retirement, and protection against double counting.',
    solution: 'Engineered a full-stack tokenization platform with 2 ERC-1155 smart contracts, IPFS metadata storage, 10+ RESTful APIs, and automated NFT certificate generation.',
    impact: 'Enables end-to-end verifiable carbon credit ownership, retirement tracking, and QR-based public verification without double counting.',
    description: 'A full-stack blockchain platform supporting 3 user roles and end-to-end carbon credit tokenization workflows. Engineered 2 ERC-1155 smart contracts for token issuance, transfer, and retirement with IPFS metadata storage and QR-based public verification.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Solidity', 'Hardhat', 'IPFS', 'JWT Authentication', 'Material UI'],
    features: [
      'Developed a full-stack blockchain platform supporting 3 user roles and end-to-end carbon credit tokenization workflows',
      'Implemented secure 10+ RESTful APIs and NoSQL database operations supporting complex business workflows, data analysis requirements, and secure communication between frontend and backend systems',
      'Engineered 2 ERC-1155 smart contracts for token issuance, transfer, and retirement, preventing double counting and ensuring verifiable carbon credit ownership',
      'Integrated IPFS-based decentralized metadata storage, automated NFT certificate generation, and QR-based public verification linked to retired carbon credits',
    ],
    github: 'https://github.com/harshvardhan2709',
    featured: true,
    year: '2025 - 2026',
  },
  {
    title: 'Cross-Platform Offline Music Player and Audio Application',
    subtitle: 'Mobile · React Native · Expo · SQLite · NativeWind · Groq AI',
    problem: 'Mobile music audio applications struggle with offline metadata performance, smart offline recommendations, and fast local file sharing.',
    solution: 'Built a local-first React Native app with SQLite metadata indexing for 4000+ songs, Groq API (Llama 3.3 70B) AI genre classification, and TCP socket P2P file transfer.',
    impact: 'Delivered zero-latency offline playback, AI playlist auto-generation with local caching fallback, and high-speed offline peer-to-peer song transfer.',
    description: 'A local-first cross-platform music player supporting offline playback and playlist management for 2000+ song libraries, indexed SQLite metadata storage for 4000+ songs, AI playlist generation via Llama 3.3 70B (Groq API), and TCP socket P2P transfer.',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'NativeWind', 'Groq API', 'Llama 3.3 70B', 'TCP Sockets', 'P2P Sharing'],
    features: [
      'Developed a local-first cross-platform music player supporting offline playback, playlist management, and media indexing for libraries containing 2000+ songs',
      'Designed a SQLite-based metadata management system with indexed storage, caching, and streamlined query execution for large music libraries containing 4000+ songs',
      'Integrated AI-based genre classification using the Llama 3.3 70B model (Groq API) to auto-generate playlists, with local fallback and caching for offline reliability',
      'Built a peer-to-peer music sharing system using TCP sockets and QR-based device pairing for secure high-speed offline file transfer',
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

