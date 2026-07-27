import { motion } from 'framer-motion';
import {
  Layout, Smartphone, Server, Blocks, Database, Terminal,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionHeading } from './ui/SectionHeading';
import { SKILL_CATEGORIES } from '../data/skills';

const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout size={20} />,
  smartphone: <Smartphone size={20} />,
  server: <Server size={20} />,
  blocks: <Blocks size={20} />,
  database: <Database size={20} />,
  terminal: <Terminal size={20} />,
};

const Skills = () => {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section id="skills" className="relative py-20 sm:py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="Skills"
          title="Tech Stack"
          description="Technologies and tools I work with across frontend, backend, mobile, and blockchain."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              className="group p-5 sm:p-6 bg-bg-surface rounded-xl border border-border hover:border-border-hover transition-all duration-300"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent-glow text-accent-mint">
                  {iconMap[category.icon]}
                </div>
                <h3 className="text-heading-sm text-text-primary">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-caption text-text-secondary"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
