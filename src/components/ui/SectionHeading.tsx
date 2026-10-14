import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="mb-14 sm:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-baseline gap-4 mb-4"
      >
        <span className="font-mono text-label text-accent-mint">{index}</span>
        <span className="font-mono text-label uppercase tracking-[0.2em] text-text-muted">
          {label}
        </span>
        <span className="rule flex-1 hidden sm:block" aria-hidden="true" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="font-serif text-display-sm sm:text-display text-text-primary"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 text-body sm:text-body-lg text-text-secondary max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
