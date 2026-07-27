import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, PERSONAL } from '../data/constants';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <button
              onClick={() => scrollToSection('home')}
              className="text-text-primary font-semibold text-body tracking-tight hover:text-accent-mint transition-colors duration-300"
              aria-label="Go to top"
            >
              HS<span className="text-accent-mint">.</span>
            </button>

            {/* Desktop Nav — Floating pill */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full transition-all duration-500 ${
                isScrolled ? 'bg-bg-surface/80 border border-border/50' : ''
              }`}>
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3.5 py-1.5 text-caption font-medium rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-text-primary'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-bg-elevated rounded-full border border-border"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side — Theme toggle + Resume + Mobile menu button */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border hover:border-border-hover bg-bg-surface text-text-muted hover:text-text-primary transition-all duration-300 flex items-center justify-center"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <motion.div
                  key={theme}
                  initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? (
                    <Sun size={18} className="text-amber-400" />
                  ) : (
                    <Moon size={18} className="text-indigo-600" />
                  )}
                </motion.div>
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download="HARSHVARDHAN_SAWANT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-caption font-medium text-text-secondary hover:text-text-primary border border-border hover:border-border-hover rounded-lg transition-all duration-300 bg-bg-surface"
              >
                <Download size={14} />
                Resume
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-6 py-3 text-heading-sm font-medium rounded-xl transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-accent-mint'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                className="flex items-center gap-4 mt-6"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-5 py-3 text-body font-medium text-text-primary border border-border rounded-xl bg-bg-surface"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={18} className="text-amber-400" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={18} className="text-indigo-600" /> Dark Mode
                    </>
                  )}
                </button>

                <a
                  href={PERSONAL.resumeUrl}
                  download="HARSHVARDHAN_SAWANT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-body font-medium text-accent-mint border border-accent/30 rounded-xl bg-bg-surface"
                >
                  <Download size={16} />
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
