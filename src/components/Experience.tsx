import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { SectionHeading } from './ui/SectionHeading';
import { EXPERIENCES } from '../data/experience';

const TYPE_LABEL: Record<string, string> = {
  internship: 'Internship',
  fulltime: 'Full-time',
  contract: 'Contract',
};

const Experience = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="02"
          label="Experience"
          title="Where I've worked"
          description="12 months of internship experience shipping production software across full-stack web and cross-platform mobile engineering roles."
        />

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Vertical timeline rail */}
          <div
            className="absolute left-3.5 sm:left-5 top-4 bottom-4 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                className="relative pl-10 sm:pl-16 group"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-3.5 sm:left-5 top-2 -translate-x-1/2 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-40 transition-opacity" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-accent-mint bg-bg-primary" />
                  </span>
                </div>

                {/* Content Card */}
                <article className="p-6 sm:p-8 rounded-2xl bg-bg-surface/60 border border-border hover:border-border-hover hover:bg-bg-surface transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-heading-sm sm:text-heading text-text-primary group-hover:text-accent-mint transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-label uppercase text-accent-mint border border-accent/30 bg-accent/10 rounded-full px-2.5 py-0.5">
                        {TYPE_LABEL[exp.type]}
                      </span>
                    </div>
                    <span className="font-mono text-caption text-text-muted whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <p className="font-mono text-caption text-accent-mint mb-4">
                    {exp.company}
                  </p>

                  <p className="text-body text-text-secondary leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Key Contributions */}
                  <div className="space-y-2.5 mb-6">
                    <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                      Key Contributions
                    </p>
                    <ul className="space-y-2.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-caption text-text-secondary leading-relaxed">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent-mint/70 flex-shrink-0" aria-hidden="true" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badge pills */}
                  <div>
                    <p className="font-mono text-label uppercase tracking-wider text-text-muted mb-2.5">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-caption px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-accent-mint/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
