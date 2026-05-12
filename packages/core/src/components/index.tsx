import React from 'react';

interface PatientAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PatientAvatar: React.FC<PatientAvatarProps> = ({ name, size = 'md' }) => {
  const initial = name.charAt(0);
  
  // Deterministic color mapping
  const getColor = (char: string) => {
    if (['ท', 'ส'].includes(char)) return 'var(--amber)';
    if (['ม', 'อ'].includes(char)) return 'var(--sage)';
    if (['ป'].includes(char)) return 'var(--sky)';
    return 'var(--stone)';
  };

  const sizeMap = {
    sm: '28px',
    md: '36px',
    lg: '52px'
  };

  return (
    <div 
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: '50%',
        backgroundColor: getColor(initial),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 600,
        fontSize: size === 'sm' ? '12px' : size === 'lg' ? '20px' : '14px',
        flexShrink: 0
      }}
    >
      {initial}
    </div>
  );
};

interface StatusBadgeProps {
  status: 'critical' | 'warning' | 'normal';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    critical: { th: 'วิกฤต', en: 'Critical', bg: 'var(--coral-light)', text: 'var(--coral)', border: '3px solid var(--coral)' },
    warning: { th: 'เฝ้าระวัง', en: 'Warning', bg: 'var(--amber-light)', text: 'var(--amber)', border: '3px solid var(--amber)' },
    normal: { th: 'ปกติ', en: 'Normal', bg: 'var(--sage-light)', text: 'var(--sage-dark)', border: '3px solid var(--sage)' }
  };

  const { th, en, bg, text, border } = config[status];

  return (
    <div 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: bg,
        color: text,
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '10px',
        fontWeight: 600,
        borderLeft: border
      }}
    >
      <span>{th}</span>
      <span style={{ opacity: 0.7 }}>·</span>
      <span>{en}</span>
    </div>
  );
};

interface VitalPillProps {
  label: string;
  value: string | number;
  unit: string;
  status?: 'critical' | 'warning' | 'normal';
}

export const VitalPill: React.FC<VitalPillProps> = ({ label, value, unit, status = 'normal' }) => {
  const statusColor = {
    critical: 'var(--coral)',
    warning: 'var(--amber)',
    normal: 'var(--text-primary)'
  }[status];

  return (
    <div 
      style={{
        backgroundColor: 'var(--sand)',
        padding: '6px 10px',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '60px'
      }}
    >
      <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: statusColor }}>{value}</span>
        <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{unit}</span>
      </div>
    </div>
  );
};

interface AlertDotProps {
  status: 'critical' | 'warning' | 'normal' | 'inactive';
}

export const AlertDot: React.FC<AlertDotProps> = ({ status }) => {
  const colorMap = {
    critical: 'var(--coral)',
    warning: 'var(--amber)',
    normal: 'var(--sage)',
    inactive: 'var(--stone)'
  };

  return (
    <div 
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: colorMap[status],
        flexShrink: 0
      }}
    />
  );
};

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, actionLabel, onAction }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--earth)' }}>{title}</h3>
      {actionLabel && (
        <button 
          onClick={onAction}
          style={{ 
            fontSize: '12px', 
            color: 'var(--sage)', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: 0,
            fontWeight: 500
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

interface AuditItemProps {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

export const AuditItem: React.FC<AuditItemProps> = ({ title, body, icon }) => {
  return (
    <div 
      style={{
        backgroundColor: 'var(--sand)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        marginBottom: '8px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        {icon}
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>{body}</p>
    </div>
  );
};

interface ProgressTrackProps {
  value: number;
  variant?: 'normal' | 'warning' | 'critical';
}

export const ProgressTrack: React.FC<ProgressTrackProps> = ({ value, variant = 'normal' }) => {
  const colorMap = {
    normal: 'var(--sage)',
    warning: 'var(--amber)',
    critical: 'var(--coral)'
  };

  return (
    <div 
      style={{
        height: '6px',
        width: '100%',
        backgroundColor: 'var(--sand2)',
        borderRadius: '20px',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          height: '100%',
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: colorMap[variant],
          borderRadius: '20px',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
};

export * from './Sidebar';
export * from './HeroBanner';
export * from './Logo';