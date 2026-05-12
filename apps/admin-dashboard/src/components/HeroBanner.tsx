import React from 'react';

interface HeroBannerProps {
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  titleTh, titleEn, subtitleTh, subtitleEn 
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--sage-dark)',
      borderRadius: '20px',
      padding: '24px 32px',
      minHeight: '130px',
      marginBottom: '24px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      {/* Decorative SVG Rings - Fixed rendering */}
      <svg width="180" height="180" viewBox="0 0 180 180" style={{
        position: 'absolute',
        right: '-20px',
        top: '-20px',
        opacity: 0.08,
        zIndex: 0
      }}>
        <circle cx="150" cy="30" r="80" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="150" cy="30" r="110" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="150" cy="30" r="140" fill="none" stroke="white" strokeWidth="1"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          padding: '4px 10px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '20px',
          color: 'white',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          ADMIN · ผู้ดูแลระบบ
        </div>
        
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '26px',
          color: 'white',
          margin: '0 0 2px 0',
          lineHeight: 1.2
        }}>
          {titleEn} · {titleTh}
        </h1>
        
        <p style={{
          fontSize: '13px',
          color: 'white',
          opacity: 0.7,
          margin: 0,
          fontWeight: 500
        }}>
          {subtitleTh} · {subtitleEn}
        </p>
      </div>
    </div>
  );
};
