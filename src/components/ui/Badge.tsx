interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-bg-elevated text-text-secondary border-border',
    accent: 'bg-accent-glow text-accent-mint border-accent/20',
    outline: 'bg-transparent text-text-muted border-border',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-caption font-mono border rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
