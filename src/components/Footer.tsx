import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL, SOCIAL } from '../data/constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-caption text-text-muted">
              &copy; {currentYear} {PERSONAL.name}
            </p>
            <p className="text-caption text-text-muted/60">
              Built with React, TypeScript &amp; Tailwind CSS
            </p>
          </div>

          {/* Center — Social links */}
          <div className="flex items-center gap-3">
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
                className="p-2 text-text-muted hover:text-accent-mint transition-colors duration-300"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Right — Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-caption text-text-muted hover:text-text-secondary transition-colors duration-300"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
