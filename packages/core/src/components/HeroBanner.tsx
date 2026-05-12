"use client";

import React from 'react';

interface HeroBannerProps {
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  color?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  titleTh, 
  titleEn, 
  subtitleTh, 
  subtitleEn,
  color = 'var(--sage-dark)'
}) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '120px',
      backgroundColor: color,
      borderRadius: '20px',
      padding: '28px 32px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: 'white',
      marginBottom: '24px',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
    }}>
      {/* Decorative SVG Pattern */}
      <div style={{
        position: 'absolute',
        right: '-40px',
        top: '-40px',
        width: '240px',
        height: '240px',
        opacity: 0.08,
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
          fontFamily: "'DM Serif Display', serif", 
          fontSize: '28px', 
          margin: 0,
          lineHeight: 1.2
        }}>
          {titleTh} · {titleEn}
        </h1>
        <p style={{ 
          fontFamily: "'Sarabun', sans-serif", 
          fontSize: '13px', 
          marginTop: '6px',
          color: 'rgba(255, 255, 255, 0.75)',
          fontWeight: 400
        }}>
          {subtitleTh} · {subtitleEn}
        </p>
      </div>
    </div>
  );
};
