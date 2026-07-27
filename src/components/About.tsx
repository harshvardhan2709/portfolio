import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';

const About = () => {
  const stats = [
    { value: '3+', label: 'Years Coding' },
    { value: '2', label: 'Companies' },
    { value: '5+', label: 'Projects Shipped' },
    { value: '15+', label: 'Tech Stack' },
  ];

  return (
    <section id="about" className="relative py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="About"
          title="Background"
          description="Building scalable software — from full-stack web & mobile applications to blockchain smart contracts."
        />

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Story */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatedSection delay={0.1}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                I am a Full Stack Developer and Software Engineer with experience building scalable web and mobile applications using React.js, React Native, Node.js, Express.js, MySQL, MongoDB, and REST APIs.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                Across software development roles — at <span className="text-text-primary font-medium">Climekare Sustainability Private Limited</span> and <span className="text-text-primary font-medium">Athena Automation</span> — I've engineered production full-stack Web & Mobile apps, architected secure JWT/RBAC authentication systems, optimized database queries by 30%, and reduced development timelines by 40%.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                My projects range from a <span className="text-text-primary font-medium">Blockchain-Based Carbon Credit Tokenization Platform</span> utilizing ERC-1155 smart contracts and IPFS decentralized storage, to a <span className="text-text-primary font-medium">Local-First AI Music Player</span> with SQLite indexing and Groq API (Llama 3.3 70B) playlist generation.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="text-body-lg text-text-secondary leading-relaxed">
                I prioritize clean architecture, performant APIs, and dependable user experiences. My goal is simple: solve complex problems with reliable, well-tested code and modern technology stacks.
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
                    <span className="text-text-muted">Degree College</span>
                    <span className="text-text-secondary">MMCOE, Pune</span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between">
                    <span className="text-text-muted">Location</span>
                    <span className="text-text-secondary">Pune, India</span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between">
                    <span className="text-text-muted">Primary Stack</span>
                    <span className="text-accent-mint font-mono">React · Node · React Native · Web3</span>
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

