import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';

const Education = () => {
  const achievements = [
    {
      title: 'Runner-up Position, TechSpark 2K26',
      description: 'Awarded ₹1,000 cash prize out of 30+ competing developer teams.',
      link: 'https://linkd.so/3DJi',
    },
    {
      title: 'Excelr Full-Stack Developer Certification',
      description: 'Comprehensive certification in full-stack web development methodologies and technologies.',
      link: 'https://gogl.to/4KGo',
    },
  ];

  return (
    <section id="education" className="relative py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="Education & Achievements"
          title="Academic & Certifications"
          description="Academic background in Information Technology alongside technical achievements and certifications."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education Card */}
          <AnimatedSection delay={0.1}>
            <div className="p-8 bg-bg-surface rounded-xl border border-border h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-5 mb-6">
                  <div className="p-3 rounded-xl bg-accent-glow text-accent-mint flex-shrink-0">
                    <GraduationCap size={24} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-heading-sm text-text-primary">
                        B.E. Information Technology
                      </h3>
                      <span className="text-caption text-text-muted font-mono">
                        Oct 2022 — July 2026
                      </span>
                    </div>
                    <p className="text-body text-accent-mint font-medium mb-1">
                      Marathwada Mitra Mandal's College of Engineering (MMCOE), Pune
                    </p>
                    <p className="text-caption text-text-secondary font-mono">
                      CGPA: <span className="text-text-primary font-bold">7.09</span>
                    </p>
                  </div>
                </div>

                <p className="text-body text-text-secondary leading-relaxed mb-6">
                  Undergraduate pursuing Information Technology with a focus on scalable full-stack web & mobile development, REST API architecture, and blockchain engineering.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                {['Data Structures', 'DBMS', 'OOP', 'SDLC', 'Database Design', 'Agile', 'Web Engineering'].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 text-caption font-mono text-text-muted bg-bg-elevated rounded-full border border-border"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Achievements & Certifications */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="p-8 bg-bg-surface rounded-xl border border-border h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-accent-glow text-accent-mint flex-shrink-0">
                    <Award size={24} />
                  </div>
                  <h3 className="text-heading-sm text-text-primary">
                    Achievements & Certifications
                  </h3>
                </div>

                <div className="space-y-6">
                  {achievements.map((item, index) => (
                    <div key={index} className="p-4 bg-bg-elevated rounded-lg border border-border/70 hover:border-border-hover transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-body font-medium text-text-primary">
                          {item.title}
                        </h4>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-mint hover:underline inline-flex items-center gap-1 text-caption font-mono"
                          >
                            Link <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-caption text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Education;

