"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Bell, Settings, ShieldCheck, 
  ChevronRight, Lock, Zap, Activity
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from '@healthcare/core';

export const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const sections = [
    {
      title: 'ภาพรวม · Overview',
      items: [
        { id: 'overview', icon: <LayoutDashboard />, labelTh: 'ภาพรวม Dashboard', labelEn: 'Overview Dashboard', path: '/' },
        { id: 'patients', icon: <Users />, labelTh: 'ผู้ป่วย Patients', labelEn: 'Patient List', path: '/patients', badge: 12 },
        { id: 'alerts', icon: <Bell />, labelTh: 'การแจ้งเตือน Alerts', labelEn: 'System Alerts', path: '/alerts', badge: 4 },
      ]
    },
    {
      title: 'ระบบ · System',
      items: [
        { id: 'infra', icon: <Zap />, labelTh: 'Infrastructure', labelEn: 'Cloud Status', path: '/infra' },
        { id: 'pdpa', icon: <Lock />, labelTh: 'PDPA Compliance', labelEn: 'Data Privacy', path: '/pdpa' },
        { id: 'ai', icon: <Activity />, labelTh: 'AI วิเคราะห์', labelEn: 'AI Analysis', path: '/ai' },
        { id: 'settings', icon: <Settings />, labelTh: 'ตั้งค่า Settings', labelEn: 'Preferences', path: '/settings' },
      ]
    }
  ];

  return (
    <aside style={{
      width: '220px',
      height: '100vh',
      backgroundColor: 'var(--warm-white)',
      borderRight: '1.5px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      padding: '24px 0'
    }}>
      {/* Brand Mark */}
      <div style={{ padding: '0 20px 24px', display: 'flex', alignItems: 'center' }}>
        <Logo width={160} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
        {sections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '24px' }}>
            <p style={{ 
              fontSize: '10px', 
              fontWeight: 700, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em',
              padding: '12px 12px 4px'
            }}>
              {section.title}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {section.items.map((item) => {
                const isActive = pathname === item.path;
                const isHovered = hoveredItem === item.id;
                
                return (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: isActive ? 'var(--sage-light)' : isHovered ? 'rgba(0,0,0,0.02)' : 'transparent',
                      color: isActive ? 'var(--sage-dark)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'all 0.2s ease',
                      borderLeft: isActive ? '2px solid var(--sage)' : '2px solid transparent',
                      position: 'relative'
                    }}
                  >
                    {/* Icon Square Treatment */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'var(--sage-mid)' : 'var(--sage-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? 'var(--sage-dark)' : 'var(--sage)',
                      flexShrink: 0
                    }}>
                      {React.cloneElement(item.icon as any, { size: 16 })}
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.1, minWidth: 0 }}>
                      <span style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.labelTh}</span>
                    </div>

                    {item.badge && !isHovered && !isActive && (
                      <span style={{
                        backgroundColor: 'var(--coral-light)',
                        color: 'var(--coral)',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '10px',
                        marginLeft: '4px'
                      }}>
                        {item.badge}
                      </span>
                    )}

                    {(isHovered || isActive) && (
                      <ChevronRight size={12} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom User Section - Tighter Row */}
      <div style={{ 
        padding: '16px 20px', 
        borderTop: '1.5px solid var(--border-light)',
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Bell and Avatar on same tight row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Bell size={22} style={{ color: 'var(--text-muted)' }} />
            <div style={{ 
              position: 'absolute', 
              top: '0', 
              right: '0', 
              width: '8px', 
              height: '8px', 
              backgroundColor: 'var(--coral)', 
              borderRadius: '50%',
              border: '1.5px solid var(--warm-white)'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              border: '2px solid var(--sage-mid)',
              backgroundColor: 'var(--sage-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--sage-dark)',
              fontSize: '14px',
              fontWeight: 700
            }}>
              AP
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--earth)' }}>Dr. Apinya</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>ผู้ดูแลระบบ · Admin</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
