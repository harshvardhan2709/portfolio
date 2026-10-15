import { PERSONAL, SOCIAL } from '../data/constants';
import { EXPERIENCES } from '../data/experience';
import { PROJECTS } from '../data/projects';
import { SKILL_CATEGORIES } from '../data/skills';

export const EDUCATION_DATA = {
  degree: 'Bachelor of Engineering (B.E.) in Information Technology',
  college: "Marathwada Mitra Mandal's College of Engineering (MMCOE), Pune",
  period: 'October 2022 — July 2026',
  cgpa: '7.09',
  coursework: [
    'Data Structures & Algorithms',
    'Database Management Systems (DBMS)',
    'Object-Oriented Programming (OOP)',
    'Software Development Life Cycle (SDLC)',
    'Database Design',
    'Agile Methodologies',
    'Web Engineering',
  ],
  achievements: [
    {
      title: 'Runner-up — TechSpark 2K26',
      description: 'Awarded cash prize out of 30+ competing developer teams for technical innovation.',
      link: 'https://linkd.so/3DJi',
    },
    {
      title: 'ExcelR Full-Stack Developer Certification',
      description: 'Comprehensive industry certification in full-stack web development methodologies and engineering practices.',
      link: 'https://gogl.to/4KGo',
    },
  ],
};

export function buildPortfolioSystemPrompt(): string {
  const experiencesText = EXPERIENCES.map(
    (exp) => `- **${exp.role}** at **${exp.company}** (${exp.period}, ${exp.type})
  • Focus: ${exp.description}
  • Achievements: ${exp.achievements.join(' ')}
  • Stack: ${exp.technologies.join(', ')}`
  ).join('\n');

  const projectsText = PROJECTS.map(
    (proj) => `- **${proj.title}** (${proj.year}) [${proj.category || 'Project'}]
  • Solution: ${proj.solution}
  • Impact: ${proj.impact}
  • Stack: ${proj.tags.join(', ')}
  • GitHub: ${proj.github}${proj.demo ? ` | Demo: ${proj.demo}` : ''}`
  ).join('\n');

  const skillsText = SKILL_CATEGORIES.map(
    (cat) => `- **${cat.title}**: ${cat.skills.join(', ')}`
  ).join('\n');

  return `You are Harshvardhan Sawant's AI Portfolio Assistant, powered by Groq.
Your role is to represent Harshvardhan Uttam Sawant to recruiters, hiring managers, and visitors.
Respond concisely, knowledgeably, and professionally using Markdown. Always ground answers strictly in the factual data below.

### PROFILE:
- Name: ${PERSONAL.fullName} (${PERSONAL.name})
- Headline: ${PERSONAL.headline}
- Location: ${PERSONAL.location} | Email: ${PERSONAL.email} | Phone: ${PERSONAL.phone}
- Availability: ${PERSONAL.availability} | Focus: ${PERSONAL.currentFocus}
- GitHub: ${SOCIAL.github} | LinkedIn: ${SOCIAL.linkedin} | Resume: ${PERSONAL.resumeUrl}

### EDUCATION & ACHIEVEMENTS:
- ${EDUCATION_DATA.degree} — ${EDUCATION_DATA.college} (${EDUCATION_DATA.period}, CGPA: ${EDUCATION_DATA.cgpa})
- Achievements: ${EDUCATION_DATA.achievements.map((a) => `${a.title}: ${a.description}`).join('; ')}

### WORK EXPERIENCE:
${experiencesText}

### FEATURED PROJECTS:
${projectsText}

### TECHNICAL SKILLS:
${skillsText}

### RESPONSE INSTRUCTIONS:
1. Ground answers strictly in the facts above. If a query is outside his portfolio, politely suggest emailing him at ${PERSONAL.email}.
2. Keep responses concise, direct, and well-structured with bullet points and bold highlights.
3. Suggest relevant next steps when helpful: view his resume (${PERSONAL.resumeUrl}), GitHub (${SOCIAL.github}), LinkedIn (${SOCIAL.linkedin}), or email (${PERSONAL.email}).
4. Always speak enthusiastically and professionally on Harshvardhan's behalf.`;
}

/**
 * Intelligent client-side fallback responder when no API key is provided or network is unavailable.
 */
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Contact / Hire / Email / Phone
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('message')) {
    return `You can reach **Harshvardhan Sawant** directly through the following channels:
- 📧 **Email**: [${PERSONAL.email}](mailto:${PERSONAL.email})
- 📱 **Phone**: [${PERSONAL.phone}](tel:${PERSONAL.phone.replace(/\s+/g, '')})
- 💼 **LinkedIn**: [Harshvardhan Sawant](${SOCIAL.linkedin})
- 💻 **GitHub**: [github.com/harshvardhan2709](${SOCIAL.github})
- 📍 **Location**: ${PERSONAL.location}

He is **${PERSONAL.availability.toLowerCase()}**!`;
  }

  // Resume
  if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
    return `📄 You can view and download Harshvardhan's official resume right here:
[**Download Harshvardhan Sawant's Resume (PDF)**](${PERSONAL.resumeUrl})

Key highlights on his resume:
- B.E. in Information Technology (2022–2026, CGPA 7.09)
- Full Stack Developer Intern at Climekare Sustainability (React, Node, Express, MongoDB, Solidity ERC-1155)
- Front-end Developer Intern at Athena Automation (React Native, reusable UI components)
- Multiple production-grade Web3, Mobile, and Full-Stack projects`;
  }

  // Projects
  if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('work')) {
    const list = PROJECTS.map((p, i) => `${i + 1}. **${p.title}** (${p.year})\n   *${p.subtitle}*\n   - ${p.solution}\n   - **GitHub**: [Repository Link](${p.github})`).join('\n\n');
    return `Here are the key projects engineered by Harshvardhan:\n\n${list}\n\nWould you like more details on any specific project, such as the **Blockchain Carbon Credit Platform**, **FotoOwl Gallery**, or the **Offline Music Player**?`;
  }

  // Experience / Internships
  if (q.includes('experience') || q.includes('intern') || q.includes('company') || q.includes('job') || q.includes('climekare') || q.includes('athena')) {
    const list = EXPERIENCES.map((e) => `🏢 **${e.role}** at **${e.company}** (${e.period})\n- ${e.description}\n- **Impact**: ${e.achievements[1] || e.achievements[0]}\n- **Tech**: ${e.technologies.slice(0, 6).join(', ')}`).join('\n\n');
    return `Harshvardhan has valuable industry engineering experience:\n\n${list}`;
  }

  // Skills / Tech stack
  if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('language') || q.includes('react') || q.includes('node') || q.includes('python')) {
    const cats = SKILL_CATEGORIES.map((c) => `- **${c.title}**: ${c.skills.join(', ')}`).join('\n');
    return `Harshvardhan's core technical stack spans full-stack web, cross-platform mobile, and blockchain:\n\n${cats}\n\nHe has deep hands-on expertise building scalable REST APIs, responsive UIs in React & React Native, and Web3 smart contracts.`;
  }

  // Education / College / Degree
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('study')) {
    return `🎓 **Education & Academic Background**:
- **Degree**: ${EDUCATION_DATA.degree}
- **Institution**: ${EDUCATION_DATA.college}
- **Timeline**: ${EDUCATION_DATA.period}
- **CGPA**: **${EDUCATION_DATA.cgpa}**
- **Core Coursework**: ${EDUCATION_DATA.coursework.join(', ')}

🏆 **Honors & Certifications**:
- **Runner-up — TechSpark 2K26**: Cash prize among 30+ developer teams.
- **ExcelR Full-Stack Developer Certification**: Comprehensive full-stack web methodologies.`;
  }

  // Blockchain / Web3 / Carbon
  if (q.includes('blockchain') || q.includes('solidity') || q.includes('carbon') || q.includes('token') || q.includes('web3')) {
    return `⛓️ **Blockchain & Web3 Experience**:
Harshvardhan engineered a **Blockchain-Based Carbon Credit Tokenization Platform**:
- Built **2 ERC-1155 smart contracts** using Solidity & Hardhat for verifiable credit issuance, transfer, and irreversible retirement without double counting.
- Integrated **IPFS** for decentralized metadata storage and QR-based public verification certificates.
- Built **10+ RESTful APIs** in Node.js/Express with MongoDB for multi-role workflows (Issuer, Buyer, Verifier).
- Also contributed to carbon credit workflows during his internship at **Climekare Sustainability**.`;
  }

  // Mobile / React Native
  if (q.includes('mobile') || q.includes('react native') || q.includes('expo') || q.includes('app') || q.includes('android') || q.includes('ios')) {
    return `📱 **Mobile Development Experience**:
Harshvardhan has extensive experience building cross-platform apps with React Native & Expo:
1. **FotoOwl Gallery**: High-performance photo discovery app built with Expo SDK 57, NativeWind, Zustand, 2-column infinite scroll, debounced search, per-user scoped favorites, and native sharing.
2. **Offline Music Player**: Local-first audio player managing 2000+ songs, SQLite indexing for 4000+ files, AI genre classification via Groq API (Llama 3.3 70B), and TCP socket P2P file sharing.
3. **Athena Automation**: Built cross-platform mobile frontend with role-based access control and cut development time by 40% with a modular component library.`;
  }

  // Who is Harshvardhan / About
  if (q.includes('who') || q.includes('about') || q.includes('harshvardhan') || q.includes('intro') || q.includes('summary')) {
    return `👋 **Harshvardhan Sawant** is a ${PERSONAL.headline} based in ${PERSONAL.location}.

${PERSONAL.summary}

Highlights:
- 🚀 **Full-Stack Web**: React.js, Node.js, Express.js, MongoDB, RESTful APIs
- 📱 **Mobile**: React Native, Expo, NativeWind, Zustand
- ⛓️ **Web3**: Solidity, ERC-1155, IPFS, Hardhat
- 🎓 **Education**: B.E. in IT (2022–2026, CGPA 7.09)
- 💼 **Status**: ${PERSONAL.availability}

Feel free to ask about his **projects**, **work experience**, **skills**, or request his **resume**!`;
  }

  // Default fallback response
  return `Harshvardhan Sawant is a Software Engineer & Full Stack Developer specializing in React.js, React Native, Node.js, MongoDB, and Web3/Blockchain.

Here are a few things you can ask me:
- **"Tell me about your top projects"**
- **"What is your work experience at Climekare and Athena?"**
- **"What technologies and skills do you know?"**
- **"What are your education and achievements?"**
- **"How can I contact Harshvardhan or download his resume?"**

*(Tip: You can also configure a live Groq API key via the ⚙️ settings icon to chat with Groq!)*`;
}
