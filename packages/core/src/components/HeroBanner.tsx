"use client";

import React from 'react';

interface HeroBannerProps {
  titleEn: string;
  subtitleEn: string;
  color?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  titleEn, 
  subtitleEn,
  color = 'var(--forest)'
}) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '140px',
      backgroundColor: color,
      borderRadius: '24px',
      padding: '32px 40px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: 'white',
      marginBottom: '24px',
      boxShadow: '0 10px 30px -5px rgba(45, 66, 57, 0.3)'
    }}>
      {/* Decorative SVG Pattern */}
      <div style={{
        position: 'absolute',
        right: '-40px',
        top: '-40px',
        width: '240px',
        height: '240px',
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="white" />
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '32px', 
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.1
        }}>
          {titleEn}
        </h1>
        <p style={{ 
          fontSize: '14px', 
          marginTop: '8px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 400
        }}>
          {subtitleEn}
        </p>
      </div>
    </div>
  );
};
