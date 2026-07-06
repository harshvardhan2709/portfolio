import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { EXPERIENCES } from '../data/experience';

const Experience = () => {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section id="experience" className="relative py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="Experience"
          title="Work"
          description="Shipping production code across internships and collaborative projects."
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                className="relative pl-8 md:pl-22"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                  <div className="w-3 h-3 rounded-full border-2 border-accent bg-bg-primary" />
                </div>

                {/* Content */}
                <div className="p-6 bg-bg-surface rounded-xl border border-border hover:border-border-hover transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-heading-sm text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-body text-accent-mint font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-text-muted font-mono">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-body text-text-secondary mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-5">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-caption text-text-secondary"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-mint mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
