import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';

const About = () => {
  const stats = [
    { value: '3+', label: 'Years Coding' },
    { value: '2', label: 'Internships' },
    { value: '4+', label: 'Projects Shipped' },
    { value: '10+', label: 'Technologies' },
  ];

  return (
    <section id="about" className="relative py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="About"
          title="Background"
          description="Building software with care — from frontend interfaces to blockchain integrations."
        />

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Story */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatedSection delay={0.1}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                I started writing code three years ago, drawn to the immediacy of building
                something and seeing it work. What began with simple HTML pages quickly
                evolved into building full-stack applications with React, Node.js, and MongoDB.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                Across two engineering internships — at <span className="text-text-primary font-medium">Climekare</span> and <span className="text-text-primary font-medium">Athena Automation</span> — I've shipped
                production frontend features, integrated RESTful APIs, and worked alongside
                experienced teams in agile environments.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                Right now, I'm deep into blockchain development — architecting a carbon credit
                tokenization platform using ERC-1155 smart contracts. It's a space where
                frontend engineering meets decentralized systems, and it's sharpening how I
                think about architecture, security, and scalability.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                I care about clean code, thoughtful interfaces, and building software that
                works reliably. My approach is straightforward: understand the problem deeply,
                choose the right tools, and ship quality work.
              </p>
            </AnimatedSection>
          </div>

          {/* Stats + Quick Facts */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.3} direction="right">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 bg-bg-surface rounded-xl border border-border"
                  >
                    <div className="text-heading text-text-primary font-bold">
                      {stat.value}
                    </div>
                    <div className="text-caption text-text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick facts */}
              <div className="p-6 bg-bg-surface rounded-xl border border-border space-y-4">
                <h3 className="text-label uppercase tracking-widest text-text-muted font-mono">
                  Quick Facts
                </h3>
                <div className="space-y-3 text-caption">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Education</span>
                    <span className="text-text-secondary">B.E. Information Technology</span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between">
                    <span className="text-text-muted">Graduating</span>
                    <span className="text-text-secondary">2026</span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between">
                    <span className="text-text-muted">Location</span>
                    <span className="text-text-secondary">Pune, India</span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between">
                    <span className="text-text-muted">Stack</span>
                    <span className="text-accent-mint font-mono">MERN + TypeScript</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
