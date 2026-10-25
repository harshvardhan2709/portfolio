import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionHeading } from './ui/SectionHeading';
import { PROJECTS, type Project } from '../data/projects';

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-accent-mint/50 bg-bg-surface hover:bg-bg-elevated font-mono text-label uppercase text-text-secondary hover:text-accent-mint transition-all duration-300"
      >
        <Github size={14} />
        <span>Source</span>
        <ArrowUpRight size={13} />
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 hover:border-accent-mint bg-accent/10 hover:bg-accent/20 font-mono text-label uppercase text-accent-mint transition-all duration-300"
        >
          <span>Live Demo</span>
          <ArrowUpRight size={13} />
        </a>
      )}
    </div>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-caption px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-accent-mint/40 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2.5">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-caption text-text-secondary leading-relaxed">
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent-mint/70 flex-shrink-0" aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

/* Featured Project Card */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative p-6 sm:p-10 rounded-2xl bg-bg-surface/50 border border-border hover:border-border-hover hover:bg-bg-surface transition-all duration-300"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Summary & Meta */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl text-accent-mint/40 group-hover:text-accent-mint transition-colors duration-300 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-label uppercase tracking-wider text-accent-mint px-2.5 py-0.5 rounded-full border border-accent/25 bg-accent/10">
              {project.category}
            </span>
            <span className="font-mono text-caption text-text-muted ml-auto">
              {project.year}
            </span>
          </div>

          <div>
            <h3 className="font-serif text-heading sm:text-display-sm text-text-primary leading-tight group-hover:text-accent-mint transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-mono text-caption text-accent-mint/80 mt-2">
              {project.subtitle}
            </p>
          </div>

          <p className="text-body text-text-secondary leading-relaxed">
            {project.description}
          </p>

          <ProjectLinks project={project} />
        </div>

        {/* Right column: Key Highlights & Stack */}
        <div className="lg:col-span-5 w-full space-y-6 pt-2 lg:pt-0 lg:border-l lg:border-border lg:pl-8">
          <div>
            <p className="font-mono text-label uppercase tracking-wider text-text-muted mb-3">
              Key Architecture & Features
            </p>
            <FeatureList features={project.features} />
          </div>

          <div>
            <p className="font-mono text-label uppercase tracking-wider text-text-muted mb-3">
              Technologies & Stack
            </p>
            <TagList tags={project.tags} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* Compact archive row for remaining projects */
function ArchiveRow({
  project,
  index,
  startIndex = 4,
}: {
  project: Project;
  index: number;
  startIndex?: number;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative border-t border-border last:border-b"
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_auto_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6 px-3 -mx-3 rounded-xl hover:bg-bg-surface/70 transition-all duration-300"
        aria-label={`${project.title} — view repository`}
      >
        <span className="font-mono text-caption text-accent-mint/50 group-hover:text-accent-mint transition-colors">
          {String(index + startIndex).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <span className="block font-serif text-heading-sm sm:text-heading text-text-primary group-hover:text-accent-mint transition-colors duration-300 truncate">
            {project.title}
          </span>
          <span className="block font-mono text-caption text-text-muted mt-0.5 truncate">
            {project.subtitle}
          </span>
        </div>
        <span className="hidden sm:block font-mono text-caption text-text-muted whitespace-nowrap">
          {project.year}
        </span>
        <span className="font-mono text-label uppercase text-text-muted group-hover:text-accent-mint transition-colors duration-300 flex items-center gap-1.5 flex-shrink-0">
          <Github size={13} className="sm:hidden" />
          <span className="hidden sm:inline">Code</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </a>
    </motion.div>
  );
}

const Projects = () => {
  const featured = PROJECTS.filter((p) => p.featured);
  const archive = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          index="03"
          label="Selected Work"
          title="Projects"
          description="Production-grade applications across mobile, full-stack web, and blockchain — each built end-to-end with a focus on performance and reliability."
        />

        {/* Featured Projects Stack */}
        <div className="space-y-8 sm:space-y-12">
          {featured.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Additional Archive Projects */}
        <div className="mt-20 sm:mt-24">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-label uppercase tracking-[0.2em] text-text-muted">
              More Projects & Experiments
            </span>
            <span className="rule flex-1 hidden sm:block" aria-hidden="true" />
          </div>
          <div className="border-t border-border">
            {archive.map((project, i) => (
              <ArchiveRow
                key={project.title}
                project={project}
                index={i}
                startIndex={featured.length + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
