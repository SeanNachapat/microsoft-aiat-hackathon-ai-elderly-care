import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  padding = '24px', 
  className = '', 
  style 
}) => {
  const baseStyle: React.CSSProperties = {
    borderRadius: 'var(--radius)',
    padding,
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s ease',
    ...style
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--aec-surface)',
      border: '1px solid var(--aec-border)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '2px dashed var(--aec-border)',
      boxShadow: 'none',
    }
  };

  return (
    <div 
      className={className}
      style={{ ...variantStyles[variant], ...baseStyle }}
    >
      {children}
    </div>
  );
};
