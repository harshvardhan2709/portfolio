import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="mb-10 sm:mb-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-block text-label uppercase tracking-widest text-accent-mint mb-3 sm:mb-4 font-mono"
      >
        {label}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-display-sm md:text-display text-text-primary font-bold tracking-tight"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 sm:mt-4 text-body sm:text-body-lg text-text-secondary max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
