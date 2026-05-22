import React from 'react';

// Re-exports
export * from './Button';
export * from './Card';
export * from './Sidebar';
export * from './Logo';

// AEC Status Badge
export const StatusBadge: React.FC<{ status: 'normal' | 'warning' | 'critical' | 'success', label?: string }> = ({ status, label }) => {
  const config = {
    normal: { color: 'var(--aec-green)', bg: 'rgba(27, 77, 62, 0.1)', text: 'All Normal' },
    success: { color: 'var(--aec-success)', bg: 'rgba(22, 163, 74, 0.1)', text: 'Resolved' },
    warning: { color: 'var(--aec-amber)', bg: 'rgba(232, 156, 47, 0.1)', text: 'Warning' },
    critical: { color: 'var(--aec-alert)', bg: 'rgba(217, 64, 64, 0.1)', text: 'Critical Alert' },
  };

  const { color, bg, text } = config[status];

  return (
    <div style={{ 
      display: 'inline-flex', alignItems: 'center', gap: '8px', 
      backgroundColor: bg, color: color, padding: '8px 16px', 
      borderRadius: '40px', fontWeight: 700, fontSize: '0.85em'
    }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
      {label || text}
    </div>
  );
};

// AEC Sensor Reading Card
export const SensorCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, unit?: string, status?: 'normal' | 'warning' | 'critical' }> = ({ icon, label, value, unit, status = 'normal' }) => {
  const colorMap = {
    normal: 'var(--aec-green)',
    warning: 'var(--aec-amber)',
    critical: 'var(--aec-alert)',
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--aec-surface)', padding: '20px', 
      borderRadius: 'var(--radius)', border: '1px solid var(--aec-border)',
      display: 'flex', flexDirection: 'column', gap: '12px'
    }} className="aec-shadow">
      <div style={{ color: 'var(--aec-text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        <span style={{ fontSize: '0.8em', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: 800, color: colorMap[status] }}>{value}</span>
        {unit && <span style={{ fontSize: '0.9em', color: 'var(--aec-text-muted)' }}>{unit}</span>}
      </div>
    </div>
  );
};

// AEC Typography
export const AppTypography: React.FC<{ variant: 'h1' | 'h2' | 'body' | 'caps' | 'mono', children: React.ReactNode, style?: React.CSSProperties, className?: string }> = ({ variant, children, style, className }) => {
  const styles: Record<string, React.CSSProperties> = {
    h1: { fontSize: '1.75em', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, fontFamily: 'var(--font-sans)' },
    h2: { fontSize: '1.25em', fontWeight: 700, margin: 0, fontFamily: 'var(--font-sans)' },
    body: { fontSize: '1em', lineHeight: 1.5, fontFamily: 'var(--font-sans)' },
    caps: { fontSize: '0.7em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--aec-text-muted)', fontFamily: 'var(--font-sans)' },
    mono: { fontSize: '0.9em', fontFamily: 'var(--font-mono)', opacity: 0.8 },
  };

  const Tag = (variant === 'h1' || variant === 'h2' ? variant : 'p') as keyof JSX.IntrinsicElements;

  return <Tag className={className} style={{ ...styles[variant], ...style }}>{children}</Tag>;
};

// AEC Patient Avatar
export const PatientAvatar: React.FC<{ name: string; size?: 'sm' | 'md' | 'lg'; imageUrl?: string }> = ({ name, size = 'md', imageUrl }) => {
  const sizeMap = { sm: '40px', md: '56px', lg: '80px' };
  const defaultUrl = "/avatar-elderly.png";

  return (
    <div style={{ 
      width: sizeMap[size], height: sizeMap[size], borderRadius: '50%', 
      background: 'var(--aec-green)', color: 'white', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      fontWeight: 800, fontSize: size === 'lg' ? '2em' : '1.2em',
      overflow: 'hidden',
      border: '2px solid white'
    }} className="aec-shadow">
      <img 
        src={imageUrl || defaultUrl} 
        alt={name} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
  );
};