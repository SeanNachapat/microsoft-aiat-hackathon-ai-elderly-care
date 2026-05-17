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
      title: 'Overview',
      items: [
        { id: 'overview', icon: <LayoutDashboard />, labelEn: 'Overview Dashboard', path: '/' },
        { id: 'patients', icon: <Users />, labelEn: 'Patient List', path: '/patients', badge: 12 },
        { id: 'alerts', icon: <Bell />, labelEn: 'System Alerts', path: '/alerts', badge: 4 },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'infra', icon: <Zap />, labelEn: 'Cloud Status', path: '/infra' },
        { id: 'pdpa', icon: <Lock />, labelEn: 'Data Privacy', path: '/pdpa' },
        { id: 'ai', icon: <Activity />, labelEn: 'AI Analysis', path: '/ai' },
        { id: 'settings', icon: <Settings />, labelEn: 'Preferences', path: '/settings' },
      ]
    }
  ];

  return (
    <aside style={{
      width: '240px',
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
              fontWeight: 800, 
              color: 'var(--bark)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              padding: '12px 12px 8px'
            }}>
              {section.title}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                      height: '48px',
                      padding: '0 16px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      backgroundColor: isActive ? 'var(--admin-accent-light)' : isHovered ? 'var(--sand)' : 'transparent',
                      color: isActive ? 'var(--admin-accent)' : 'var(--bark)',
                      fontWeight: isActive ? 800 : 500,
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                    }}
                  >
                    <div style={{
                      color: isActive ? 'var(--admin-accent)' : 'var(--bark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {React.cloneElement(item.icon as any, { size: 18 })}
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.1, minWidth: 0 }}>
                      <span style={{ fontSize: '13.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.labelEn}</span>
                    </div>

                    {item.badge && !isHovered && !isActive && (
                      <span style={{
                        backgroundColor: 'var(--coral)',
                        color: 'white',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}>
                        {item.badge}
                      </span>
                    )}

                    {isHovered && !isActive && (
                      <ChevronRight size={14} style={{ opacity: 0.5 }} />
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
              border: '2px solid #1B4D3E',
              backgroundColor: 'rgba(27, 77, 62, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1B4D3E',
              fontSize: '14px',
              fontWeight: 800
            }}>
              AP
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--earth)' }}>Dr. Apinya</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>System Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
