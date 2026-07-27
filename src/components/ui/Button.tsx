import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean | string;
  target?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  icon,
  className = '',
  external = false,
  download,
  target,
}: ButtonProps) {
  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-light border border-accent/50 shadow-glow-sm hover:shadow-glow',
    secondary:
      'bg-bg-elevated text-text-primary hover:bg-bg-elevated/80 border border-border hover:border-border-hover',
    ghost:
      'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent',
  };

  const baseStyles = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-caption font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = external || target === '_blank';
    return (
      <a
        href={href}
        className={baseStyles}
        download={download}
        target={target || (external ? '_blank' : undefined)}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
        {icon && <span className="flex-shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}
