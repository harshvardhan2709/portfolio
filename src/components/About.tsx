import { SectionHeading } from './ui/SectionHeading';
import { AnimatedSection } from './ui/AnimatedSection';
import { PROJECTS } from '../data/projects';

const HIGHLIGHTS = [
  { label: 'Frontend & Mobile', value: 'React.js · React Native · TypeScript' },
  { label: 'Backend', value: 'Node.js · Express.js · REST APIs · JWT / RBAC' },
  { label: 'AI & GenAI', value: 'Groq · Llama 3.3 · LLM API Integration · Prompt Eng.' },
  { label: 'Databases', value: 'MongoDB · MySQL · SQLite · Oracle' },
  { label: 'Web3 & Blockchain', value: 'Solidity (ERC-1155) · Hardhat · IPFS' },
];

const STATS = [
  { value: '12', label: 'Months interned' },
  { value: '2', label: 'Companies' },
  { value: `${PROJECTS.length}`, label: 'Projects shipped' },
  { value: '15+', label: 'Technologies' },
];

const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="01"
          label="About"
          title="Engineering, end to end"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Lead */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <p className="font-serif text-2xl sm:text-3xl leading-[1.4] text-text-primary mb-8">
                I build scalable web and mobile applications — from{' '}
                <span className="italic text-accent-mint">React interfaces</span> to{' '}
                <span className="italic text-accent-mint">Node.js APIs</span>, databases, and{' '}
                <span className="italic text-accent-mint">blockchain smart contracts</span>.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-5 text-body text-text-secondary leading-relaxed max-w-2xl">
                <p>
                  I'm a Software Engineer with 12 months of internship experience across
                  full-stack web and cross-platform mobile development, building production
                  applications using React.js, React Native, Node.js, Express.js, MongoDB, and REST APIs.
                </p>
                <p>
                  At{' '}
                  <span className="text-text-primary">Climekare Sustainability</span> and{' '}
                  <span className="text-text-primary">Athena Automation</span>, I engineered
                  full-stack web and mobile apps, developed 10+ RESTful APIs with secure JWT/RBAC authentication,
                  optimized database queries by 30%, and cut development timelines by 40%
                  through a reusable component architecture.
                </p>
                <p>
                  My work spans an end-to-end blockchain carbon-credit tokenization platform with ERC-1155
                  smart contracts and IPFS storage, and a cross-platform offline music player with SQLite
                  indexing, FlatList virtualization, and AI genre classification via Llama 3.3 70B (Groq API).
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
                {STATS.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-bg-surface/40 border border-border/60">
                    <div className="font-serif text-3xl sm:text-4xl text-text-primary">{stat.value}</div>
                    <div className="font-mono text-label uppercase text-text-muted mt-1.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Technical highlights rail */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.25} direction="left">
              <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface/50 border border-border lg:sticky lg:top-28">
                <p className="font-mono text-label uppercase tracking-[0.2em] text-text-muted mb-5 pb-3 border-b border-border/60">
                  Technical Focus
                </p>
                <dl className="space-y-4">
                  {HIGHLIGHTS.map((item) => (
                    <div key={item.label} className="pb-4 last:pb-0 border-b last:border-b-0 border-border/40 group">
                      <dt className="font-mono text-label uppercase text-accent-mint mb-1">
                        {item.label}
                      </dt>
                      <dd className="text-caption text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
