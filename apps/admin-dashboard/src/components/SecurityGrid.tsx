import React from 'react';
import { Shield } from 'lucide-react';

interface InfraItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  active?: boolean;
}

interface SecurityGridProps {
  items: InfraItem[];
}

export const SecurityGrid: React.FC<SecurityGridProps> = ({ items }) => {
  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '16px',
        color: 'var(--bark)'
      }}>
        <Shield size={14} />
        <h3 style={{ 
          fontSize: '11px', 
          fontWeight: 800, 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          margin: 0
        }}>
          SECURITY & INFRASTRUCTURE
        </h3>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '12px' 
      }}>
        {items.map((item, i) => (
          <div 
            key={i}
            style={{
              backgroundColor: 'var(--warm-white)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(27, 77, 62, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1B4D3E',
              flexShrink: 0
            }}>
              {React.isValidElement(item.icon) ? React.cloneElement(item.icon as any, { size: 16 }) : item.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '11px', color: 'var(--bark)', opacity: 0.6, fontWeight: 800, textTransform: 'uppercase' }}>
                {item.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.value}
                </span>
                {item.active && (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1B4D3E' }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
