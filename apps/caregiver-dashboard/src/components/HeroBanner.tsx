import React from 'react';

interface HeroBannerProps {
  label: string;
  title: string;
  subtitle: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  label, title, subtitle 
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--forest)',
      borderRadius: '24px',
      padding: '40px 48px',
      minHeight: '160px',
      marginBottom: '32px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxShadow: '0 10px 40px -10px rgba(27, 77, 62, 0.4)'
    }}>
      {/* Decorative SVG Rings */}
      <svg width="260" height="260" viewBox="0 0 260 260" style={{
        position: 'absolute',
        right: '-40px',
        top: '-40px',
        opacity: 0.15,
        zIndex: 0
      }}>
        <circle cx="220" cy="40" r="120" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="220" cy="40" r="160" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="220" cy="40" r="200" fill="none" stroke="white" strokeWidth="1"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          padding: '6px 14px',
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: '20px',
          color: 'white',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '14px',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {label}
        </div>
        
        <h1 style={{
          fontSize: '42px',
          fontWeight: 800,
          color: 'white',
          margin: '0 0 6px 0',
          lineHeight: 1,
          letterSpacing: '-0.04em'
        }}>
          {title}
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.9)',
          margin: 0,
          fontWeight: 500,
          opacity: 0.8
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};
