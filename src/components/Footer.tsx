import { ArrowUp } from 'lucide-react';
import { NAV_ITEMS, PERSONAL } from '../data/constants';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-10 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={scrollToTop}
            className="font-serif text-xl text-text-primary hover:text-accent-mint transition-colors duration-300"
            aria-label="Back to top"
          >
            HS<span className="text-accent-mint">.</span>
          </button>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Footer">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-mono text-label uppercase text-text-muted hover:text-text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <p className="font-mono text-caption text-text-muted">
              &copy; {new Date().getFullYear()} {PERSONAL.name}
            </p>
            <button
              onClick={scrollToTop}
              className="group p-2.5 rounded-full border border-border hover:border-border-hover text-text-muted hover:text-accent-mint transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
