import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  style, 
  ...props 
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
  };

  const themes: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--aec-green)',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'var(--aec-gold)',
      color: 'var(--aec-green)',
    },
    danger: {
      backgroundColor: 'var(--aec-alert)',
      color: 'white',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--aec-text-muted)',
      border: '1px solid var(--aec-border)',
    }
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: '0.85em', borderRadius: 'var(--radius-sm)' },
    md: { padding: '12px 24px', fontSize: '1em', borderRadius: 'var(--radius)' },
    lg: { padding: '18px 36px', fontSize: '1.25em', borderRadius: 'var(--radius-lg)' },
  };

  return (
    <button 
      style={{ ...baseStyle, ...themes[variant], ...sizes[size], ...style }} 
      {...props}
    >
      {children}
    </button>
  );
};
