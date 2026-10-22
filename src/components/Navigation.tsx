import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, PERSONAL } from '../data/constants';
import { useTheme } from '../context/ThemeContext';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { CasualPhotoModal } from './CasualPhotoModal';

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Lock body scroll when mobile menu is open
  useLockBodyScroll(isMobileMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -24, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 z-50 glass-nav rounded-full"
        aria-label="Primary"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 py-1.5">
          {/* Monogram / Profile picture trigger */}
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="group flex items-center gap-2 mr-2 sm:mr-3 pl-0.5 py-0.5 rounded-full text-text-primary hover:text-accent-mint transition-colors duration-300 leading-none focus:outline-none cursor-pointer"
            aria-label="View Harshvardhan's casual photo and profile"
            title="Click to view casual photo & profile"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-border group-hover:border-accent-mint ring-1 ring-transparent group-hover:ring-accent-mint/30 transition-all duration-300 shrink-0 shadow-sm">
              <img
                src="/profile.png"
                alt="Harshvardhan Sawant"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <span className="font-serif text-lg leading-none">
              HS<span className="text-accent-mint">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`relative px-3 lg:px-3.5 py-1.5 text-label font-mono uppercase transition-colors duration-300 ${activeSection === item.id
                  ? 'text-accent-mint'
                  : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent-mint"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="hidden md:block h-4 w-px bg-border mx-1" aria-hidden="true" />

          {/* Resume */}
          <a
            href={PERSONAL.resumeUrl}
            download="HARSHVARDHAN_SAWANT.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-label font-mono uppercase text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <Download size={13} />
            Resume
          </a>

          {/* Theme toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full text-text-secondary hover:text-accent-mint hover:bg-bg-elevated/70 border border-transparent hover:border-border transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-accent-mint transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={16} className="text-accent-default transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: index * 0.045, duration: 0.3 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-6 py-2.5 font-serif text-3xl transition-colors duration-300 ${activeSection === item.id
                    ? 'text-accent-mint italic'
                    : 'text-text-muted hover:text-text-primary'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: NAV_ITEMS.length * 0.045, duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8"
              >
                <a
                  href={PERSONAL.resumeUrl}
                  download="HARSHVARDHAN_SAWANT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-label uppercase text-accent-mint border border-accent/30 rounded-full"
                >
                  <Download size={14} />
                  Resume
                </a>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPhotoModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-label uppercase text-accent-mint border border-accent/30 rounded-full hover:bg-bg-elevated transition-colors"
                  aria-label="View photo"
                >
                  <img
                    src="/profile.png"
                    alt="Harshvardhan Sawant"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>View Photo</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-label uppercase text-text-secondary hover:text-text-primary border border-border rounded-full hover:border-border-hover transition-colors"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={14} className="text-accent-mint" /> : <Moon size={14} className="text-accent-mint" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Casual Profile & Photo Modal */}
      <CasualPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onScrollToTop={() => scrollToSection('home')}
      />
    </>
  );
};

export default Navigation;
