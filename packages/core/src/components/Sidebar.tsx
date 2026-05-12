"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Bell, Settings, ShieldCheck, Heart, Sparkles, 
  ChevronRight, LogOut 
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

interface SidebarProps {
  appName: string;
  appLabelTh: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ appName, appLabelTh }) => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const navItems = [
    { icon: <LayoutDashboard size={18} />, labelTh: 'ภาพรวม', labelEn: 'Overview', path: '/' },
    { icon: <Users size={18} />, labelTh: 'ผู้ป่วย', labelEn: 'Patients', path: '/patients' },
    { icon: <Bell size={18} />, labelTh: 'การแจ้งเตือน', labelEn: 'Alerts', path: '/alerts', badge: 4 },
    { icon: <Sparkles size={18} />, labelTh: 'AI วิเคราะห์', labelEn: 'AI Analysis', path: '/ai' },
    { icon: <Settings size={18} />, labelTh: 'ตั้งค่า', labelEn: 'Settings', path: '/settings' },
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
      zIndex: 10
    }}>
      {/* Brand Mark */}
      <div style={{ padding: '16px 20px 24px', display: 'flex', alignItems: 'center' }}>
        <Logo width={160} />
      </div>

      <div style={{ padding: '0 12px', flex: 1 }}>
        <p style={{ 
          fontSize: '10px', 
          fontWeight: 700, 
          color: 'var(--text-muted)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          padding: '16px 8px 8px'
        }}>
          Main Navigation
        </p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const isHovered = hoveredPath === item.path;
            
            return (
              <div 
                key={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  height: '44px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--sage-light)' : isHovered ? 'var(--sand)' : 'transparent',
                  color: isActive ? 'var(--sage-dark)' : 'var(--text-primary)',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
              >
                {/* Icon Background */}
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'var(--sage)' : 'var(--sage-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? 'white' : 'var(--sage)',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, flex: 1 }}>
                  <span style={{ fontSize: '12.5px' }}>{item.labelTh}</span>
                  <span style={{ fontSize: '9px', opacity: 0.6, fontWeight: 500 }}>{item.labelEn}</span>
                </div>

                {item.badge && !isHovered && (
                  <span style={{
                    backgroundColor: 'var(--coral)',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '10px'
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

      {/* User Section at Bottom */}
      <div style={{ 
        padding: '20px 16px', 
        borderTop: '1.5px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
             <Bell size={20} color="var(--text-muted)" />
             <div style={{
               position: 'absolute',
               top: '-2px',
               right: '-2px',
               width: '8px',
               height: '8px',
               backgroundColor: 'var(--coral)',
               borderRadius: '50%',
               border: '2px solid var(--warm-white)'
             }} />
          </div>
          <LogOut size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>

        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
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
            fontWeight: 700,
            overflow: 'hidden'
          }}>
            SN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--earth)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sean N.</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>Chief Nurse</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
