import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { PERSONAL, SOCIAL } from '../data/constants';
import { Button } from './ui/Button';

const Hero = () => {
  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid + gradient */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-light/3 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="section-container relative z-10 py-32"
      >
        {/* Availability badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-bg-surface border border-border rounded-full text-caption text-text-muted">
            <span className="w-2 h-2 bg-accent-mint rounded-full animate-pulse-slow" />
            {PERSONAL.availability}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-display-sm md:text-display text-text-primary font-bold mb-4"
        >
          {PERSONAL.name}
        </motion.h1>

        {/* Headline */}
        <motion.p
          variants={fadeUp}
          className="text-heading-sm md:text-heading text-text-muted mb-6"
        >
          {PERSONAL.headline}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-body-lg text-text-secondary max-w-xl mb-4 leading-relaxed"
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* Current focus */}
        <motion.p
          variants={fadeUp}
          className="text-caption text-text-muted mb-10 font-mono"
        >
          Currently building:{' '}
          <span className="text-accent-mint">{PERSONAL.currentFocus}</span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-12">
          <Button
            variant="primary"
            href="#projects"
            icon={<ArrowDown size={14} />}
          >
            View Projects
          </Button>
          <Button
            variant="secondary"
            href={PERSONAL.resumeUrl}
            download="HARSHVARDHAN_SAWANT.pdf"
            target="_blank"
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          {[
            { href: SOCIAL.github, icon: Github, label: 'GitHub' },
            { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: SOCIAL.email, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="group p-3 rounded-lg border border-border hover:border-border-hover hover:bg-bg-elevated transition-all duration-300"
              aria-label={label}
            >
              <Icon
                size={18}
                className="text-text-muted group-hover:text-accent-mint transition-colors duration-300"
              />
            </a>
          ))}

          <span className="h-6 w-px bg-border ml-2" />
          <span className="text-caption text-text-muted">{PERSONAL.location}</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
