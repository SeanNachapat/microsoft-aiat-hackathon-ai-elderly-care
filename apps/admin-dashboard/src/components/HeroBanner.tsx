import React from 'react';

interface HeroBannerProps {
  titleEn: string;
  subtitleEn: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  titleEn, subtitleEn 
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--admin-accent)',
      borderRadius: '24px',
      padding: '32px 40px',
      minHeight: '140px',
      marginBottom: '24px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxShadow: '0 10px 30px -5px rgba(27, 77, 62, 0.3)'
    }}>
      {/* Decorative SVG Rings */}
      <svg width="220" height="220" viewBox="0 0 220 220" style={{
        position: 'absolute',
        right: '-30px',
        top: '-30px',
        opacity: 0.1,
        zIndex: 0
      }}>
        <circle cx="180" cy="40" r="100" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="180" cy="40" r="130" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="180" cy="40" r="160" fill="none" stroke="white" strokeWidth="1"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          padding: '4px 12px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '20px',
          color: 'white',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          ADMINISTRATOR
        </div>
        
        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: 'white',
          margin: '0 0 4px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}>
          {titleEn}
        </h1>
        
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
          fontWeight: 400
        }}>
          {subtitleEn}
        </p>
      </div>
    </div>
  );
};
