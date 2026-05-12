import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  labelTh: string;
  labelEn: string;
  value: string | number;
  subTextTh: string;
  subTextEn: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon, labelTh, labelEn, value, subTextTh, subTextEn 
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--warm-white)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minHeight: '130px',
      transition: 'all 0.2s ease'
    }}>
      {/* Icon placed top-right */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        backgroundColor: 'var(--sage-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--sage)',
        flexShrink: 0
      }}>
        {React.isValidElement(icon) ? React.cloneElement(icon as any, { size: 18 }) : icon}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, marginTop: '0' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>{labelTh}</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>{labelEn}</span>
      </div>
      
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        color: 'var(--text-primary)',
        marginTop: '8px'
      }}>
        {value}
      </div>
      
      <div style={{ 
        fontSize: '11px', 
        color: 'var(--text-muted)',
        marginTop: '4px',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.1
      }}>
        <span>{subTextTh}</span>
        <span>{subTextEn}</span>
      </div>
    </div>
  );
};
