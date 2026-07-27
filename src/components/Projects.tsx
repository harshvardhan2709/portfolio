import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { PROJECTS, Project } from '../data/projects';

// Featured project — large layout
function FeaturedProject({ project }: { project: Project }) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative p-5 sm:p-8 md:p-10 bg-bg-surface rounded-2xl border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-glow mb-8 sm:mb-12"
    >
      {/* Featured label */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <span className="text-label uppercase tracking-widest text-accent-mint font-mono">
          Featured Project
        </span>
        <span className="text-caption text-text-muted font-mono">{project.year}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div>
          <h3 className="text-heading-sm sm:text-heading text-text-primary mb-2 group-hover:text-accent-mint transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-caption text-text-muted font-mono mb-6">
            {project.subtitle}
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <span className="text-label uppercase tracking-widest text-text-muted block mb-1">
                Problem
              </span>
              <p className="text-caption sm:text-body text-text-secondary">{project.problem}</p>
            </div>
            <div>
              <span className="text-label uppercase tracking-widest text-text-muted block mb-1">
                Solution
              </span>
              <p className="text-caption sm:text-body text-text-secondary">{project.solution}</p>
            </div>
            <div>
              <span className="text-label uppercase tracking-widest text-text-muted block mb-1">
                Impact
              </span>
              <p className="text-caption sm:text-body text-text-secondary">{project.impact}</p>
            </div>
          </div>
        </div>

        <div>
          {/* Features */}
          <div className="mb-6">
            <span className="text-label uppercase tracking-widest text-text-muted block mb-3">
              Key Features
            </span>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 sm:gap-3 text-caption text-text-secondary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mint mt-1.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-caption font-medium text-text-secondary hover:text-text-primary border border-border hover:border-border-hover rounded-lg transition-all duration-300 bg-bg-elevated"
            >
              <Github size={14} />
              Source Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-caption font-medium text-accent-mint hover:text-accent-mint/80 border border-accent/20 hover:border-accent/40 rounded-lg transition-all duration-300 bg-bg-elevated"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Regular project card
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative p-5 sm:p-6 bg-bg-surface rounded-xl border border-border hover:border-border-hover transition-all duration-300 hover:shadow-card-hover flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2 mb-4">
        <div className="flex-1">
          <h3 className="text-body-lg sm:text-heading-sm font-bold text-text-primary group-hover:text-accent-mint transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-caption text-text-muted font-mono mt-1">
            {project.subtitle}
          </p>
        </div>
        <span className="text-caption text-text-muted font-mono self-start sm:self-auto">{project.year}</span>
      </div>

      {/* Description */}
      <p className="text-caption text-text-secondary leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5">
        {project.features.slice(0, 3).map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-caption text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-caption font-mono text-text-muted">
            {tag}
            {tag !== project.tags[project.tags.length - 1] && (
              <span className="ml-1.5 text-border">·</span>
            )}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-caption text-text-muted hover:text-text-primary transition-colors duration-300"
        >
          <Github size={14} />
          Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-caption text-text-muted hover:text-accent-mint transition-colors duration-300"
          >
            <ArrowUpRight size={14} />
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const featured = PROJECTS.filter((p) => p.featured);
  const regular = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 sm:py-32 border-t border-border/30">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="Selected Work"
          description="A selection of projects I've built — from blockchain platforms to full-stack web applications."
        />

        {/* Featured projects */}
        {featured.map((project) => (
          <FeaturedProject key={project.title} project={project} />
        ))}

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {regular.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
