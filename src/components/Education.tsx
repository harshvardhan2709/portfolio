import { GraduationCap } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';

const Education = () => {
  return (
    <section id="education" className="relative py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="Education"
          title="Academic"
        />

        <AnimatedSection delay={0.1}>
          <div className="p-8 bg-bg-surface rounded-xl border border-border max-w-2xl">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-xl bg-accent-glow text-accent-mint flex-shrink-0">
                <GraduationCap size={24} />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-heading-sm text-text-primary">
                      B.E. Information Technology
                    </h3>
                    <p className="text-body text-accent-mint font-medium">
                      MMCOE, Pune
                    </p>
                  </div>
                  <span className="text-caption text-text-muted font-mono">
                    2022 — 2026
                  </span>
                </div>

                <p className="text-body text-text-secondary leading-relaxed mb-4">
                  Final-year undergraduate pursuing Information Technology with a focus
                  on full-stack development and blockchain engineering. Applying
                  classroom fundamentals to production software through internships
                  and hands-on projects.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Data Structures', 'Algorithms', 'DBMS', 'OS', 'Computer Networks', 'Blockchain'].map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 text-caption font-mono text-text-muted bg-bg-elevated rounded-full border border-border"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education;
