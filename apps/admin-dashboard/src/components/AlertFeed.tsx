import React from 'react';

interface AlertItem {
  title: string;
  desc?: string;
  time: string;
  status: 'critical' | 'warning' | 'normal';
}

interface AlertFeedProps {
  alerts: AlertItem[];
}

export const AlertFeed: React.FC<AlertFeedProps> = ({ alerts }) => {
  return (
    <div style={{
      backgroundColor: 'var(--warm-white)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      height: 'fit-content'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 900, color: 'var(--earth)', margin: 0, fontFamily: "'Playfair Display', serif" }}>
          Recent Alerts
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>08:30 AM</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {alerts.map((alert, i) => (
          <div 
            key={i}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: i === alerts.length - 1 ? 'none' : '1px solid var(--border-light)'
            }}
          >
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: alert.status === 'critical' ? 'var(--coral)' : alert.status === 'warning' ? 'var(--amber)' : 'var(--sage)',
              marginTop: '3px',
              flexShrink: 0
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>{alert.title}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>{alert.time} · {alert.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
