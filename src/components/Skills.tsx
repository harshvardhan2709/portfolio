import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { SectionHeading } from './ui/SectionHeading';

interface SkillGroup {
  index: string;
  title: string;
  skills: string[];
}

const GROUPS: SkillGroup[] = [
  {
    index: '4.1',
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'SQL'],
  },
  {
    index: '4.2',
    title: 'Frontend & Mobile',
    skills: ['React.js', 'React Native', 'NativeWind', 'Zustand', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    index: '4.3',
    title: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'MVC Architecture', 'Java Backend Fundamentals'],
  },
  {
    index: '4.4',
    title: 'AI / GenAI',
    skills: ['LLM API Integration', 'Groq', 'Llama 3.3', 'Prompt Engineering'],
  },
  {
    index: '4.5',
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'SQLite', 'Oracle'],
  },
  {
    index: '4.6',
    title: 'Blockchain & Web3',
    skills: ['Solidity (ERC-1155)', 'Hardhat', 'IPFS'],
  },
  {
    index: '4.7',
    title: 'Core Concepts',
    skills: ['OOP', 'DBMS', 'Database Design', 'SDLC', 'Agile', 'DSA'],
  },
  {
    index: '4.8',
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Postman', 'Expo'],
  },
];

function SkillGroupCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="group p-6 rounded-2xl bg-bg-surface/50 border border-border hover:border-border-hover hover:bg-bg-surface transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-border/60">
          <h3 className="font-serif text-heading-sm text-text-primary group-hover:text-accent-mint transition-colors duration-300">
            {group.title}
          </h3>
          <span className="font-mono text-caption text-accent-mint/60 bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
            {group.index}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-caption px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-accent-mint/40 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="04"
          label="Skills"
          title="Tools of the trade"
          description="The technologies I reach for across the stack — production-tested tools and frameworks."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROUPS.map((group, index) => (
            <SkillGroupCard key={group.title} group={group} delay={index * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
