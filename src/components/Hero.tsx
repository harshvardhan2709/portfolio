import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, ArrowUpRight } from 'lucide-react';
import { PERSONAL, SOCIAL } from '../data/constants';
import SculptureFallback from './three/SculptureFallback';

const HeroScene = lazy(() => import('./three/HeroScene'));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.25 + i * 0.1, ease: 'easeOut' as const },
  }),
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-[560px] h-[560px] bg-accent/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-accent-light/4 rounded-full blur-[120px]" />
      </div>

      {/* 3D sculpture — full-width & full-height container so rings/animation are never clipped */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Suspense fallback={<SculptureFallback />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Editorial side label */}
      <div
        className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-10"
        aria-hidden="true"
      >
        <span className="h-16 w-px bg-border" />
        <span className="font-mono text-label uppercase text-text-muted [writing-mode:vertical-rl] tracking-[0.2em]">
          Full-stack engineer — Pune, India
        </span>
        <span className="h-16 w-px bg-border" />
      </div>

      <div className="section-container relative z-10 w-full py-28 sm:py-32">
        <div className="max-w-2xl">
          {/* Availability */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-border rounded-full text-label font-mono uppercase text-text-muted bg-bg-surface/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-slow absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint" />
              </span>
              {PERSONAL.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-display-xl text-text-primary mb-6"
          >
            {PERSONAL.firstName}
            <br />
            <span className="italic text-gradient pr-3">Sawant</span>
          </motion.h1>

          {/* Headline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-heading-sm sm:text-heading text-text-secondary mb-5 leading-snug"
          >
            {PERSONAL.headline}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-body sm:text-body-lg text-text-muted max-w-lg mb-4 leading-relaxed"
          >
            {PERSONAL.tagline}
          </motion.p>

          {/* Current focus */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="font-mono text-caption text-text-muted mb-10 sm:mb-12 leading-relaxed"
          >
            <span className="text-accent-mint">&gt;_</span> currently:{' '}
            <span className="text-text-secondary">{PERSONAL.currentFocus}</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent text-white text-label font-mono uppercase tracking-wider border border-accent/60 hover:bg-accent-light transition-all duration-300 shadow-glow-sm hover:shadow-glow"
            >
              View Selected Work
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="HARSHVARDHAN_SAWANT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-border-hover text-label font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all duration-300"
            >
              Resume
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Socials + location */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <div className="flex items-center gap-2.5">
              {[
                { href: SOCIAL.github, icon: Github, label: 'GitHub profile' },
                { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn profile' },
                { href: SOCIAL.email, icon: Mail, label: `Email ${PERSONAL.email}` },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label.startsWith('Email') ? undefined : '_blank'}
                  rel={label.startsWith('Email') ? undefined : 'noopener noreferrer'}
                  className="group p-2.5 rounded-full border border-border hover:border-border-hover hover:bg-bg-elevated transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={16} className="text-text-muted group-hover:text-accent-mint transition-colors duration-300" />
                </a>
              ))}
            </div>
            <span className="hidden sm:block h-5 w-px bg-border" aria-hidden="true" />
            <span className="font-mono text-caption text-text-muted">{PERSONAL.location}</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 font-mono text-label uppercase text-text-muted hover:text-accent-mint transition-colors"
        aria-label="Scroll to about section"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-accent-mint/60 to-transparent" aria-hidden="true" />
      </motion.a>
    </section>
  );
};

export default Hero;
