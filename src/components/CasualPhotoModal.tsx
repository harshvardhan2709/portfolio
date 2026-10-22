import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

interface CasualPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToTop?: () => void;
}

export const CasualPhotoModal = ({ isOpen, onClose }: CasualPhotoModalProps) => {
  useLockBodyScroll(isOpen);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Harshvardhan Sawant Photo"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
        >
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-w-sm sm:max-w-md w-auto max-h-[88vh] flex flex-col items-center cursor-default select-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-20 p-2 rounded-full bg-black/80 hover:bg-black text-white/80 hover:text-white border border-white/20 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105"
              aria-label="Close photo"
            >
              <X size={18} />
            </button>

            {/* Photo Only */}
            <img
              src="/profile.png"
              alt="Harshvardhan Sawant"
              className="w-auto h-auto max-h-[82vh] max-w-[88vw] sm:max-w-md rounded-2xl sm:rounded-3xl object-contain shadow-2xl border border-white/10 ring-1 ring-black/40"
              loading="eager"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
