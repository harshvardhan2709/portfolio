import { GraduationCap, Award, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';

const ACHIEVEMENTS = [
  {
    title: 'Runner-up — TechSpark 2K26',
    description: 'Awarded ₹1,000 cash prize out of 30+ competing developer teams.',
    link: 'https://linkd.so/3DJi',
    linkLabel: 'Event link',
  },
  {
    title: 'ExcelR Full-Stack Developer Certification',
    description: 'Comprehensive certification in full-stack web development methodologies and technologies.',
    link: 'https://gogl.to/4KGo',
    linkLabel: 'Certificate link',
  },
];

const COURSEWORK = ['Data Structures', 'DBMS', 'OOP', 'SDLC', 'Database Design', 'Agile', 'Web Engineering'];

const Education = () => {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="05"
          label="Education"
          title="Academic foundation"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Degree Card */}
          <AnimatedSection delay={0.1} className="lg:col-span-7">
            <article className="p-6 sm:p-8 rounded-2xl bg-bg-surface/50 border border-border hover:border-border-hover transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-xl border border-accent/30 bg-accent/10 text-accent-mint flex-shrink-0">
                    <GraduationCap size={22} />
                  </span>
                  <div>
                    <h3 className="font-serif text-heading-sm sm:text-heading text-text-primary">
                      B.E. Information Technology
                    </h3>
                    <p className="font-mono text-caption text-accent-mint mt-1">
                      Marathwada Mitra Mandal's College of Engineering, Pune
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <span className="font-mono text-caption text-text-muted">
                    Oct 2022 — July 2026
                  </span>
                  <span className="font-mono text-caption px-2.5 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-accent-mint font-medium">
                    CGPA: 7.09
                  </span>
                </div>
              </div>

              <p className="text-body text-text-secondary leading-relaxed mb-6">
                Undergraduate degree with a focus on scalable full-stack web and mobile
                development, REST API architecture, and blockchain engineering.
              </p>

              <div>
                <p className="font-mono text-label uppercase tracking-wider text-text-muted mb-2.5">
                  Core Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="font-mono text-caption px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </AnimatedSection>

          {/* Achievements Card */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.2} direction="left">
              <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface/50 border border-border hover:border-border-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/60">
                  <span className="p-2.5 rounded-xl border border-accent/30 bg-accent/10 text-accent-mint">
                    <Award size={20} />
                  </span>
                  <h3 className="font-serif text-heading-sm text-text-primary">
                    Honors & Certifications
                  </h3>
                </div>

                <div className="space-y-6">
                  {ACHIEVEMENTS.map((item) => (
                    <div key={item.title} className="group/item pb-5 last:pb-0 border-b last:border-b-0 border-border/40">
                      <h4 className="font-serif text-body-lg text-text-primary mb-1.5 group-hover/item:text-accent-mint transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-caption text-text-secondary leading-relaxed mb-2.5">
                        {item.description}
                      </p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-caption text-accent-mint hover:underline underline-offset-4"
                        aria-label={`${item.title} — ${item.linkLabel}`}
                      >
                        <span>{item.linkLabel}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
