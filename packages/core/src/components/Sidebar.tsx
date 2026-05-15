"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Bell, Settings, 
  ChevronRight, LogOut, Hospital, TrendingUp, MessageSquare,
  ShieldCheck, Activity
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps {
  role: 'admin' | 'caregiver';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const adminNav = [
    { icon: <LayoutDashboard size={20} />, label: 'System Overview', path: '/' },
    { icon: <Users size={20} />, label: 'User Management', path: '/users' },
    { icon: <Activity size={20} />, label: 'Device Management', path: '/devices' },
    { icon: <Bell size={20} />, label: 'Alert Center', path: '/alerts' },
    { icon: <TrendingUp size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <ShieldCheck size={20} />, label: 'Security', path: '/security' },
    { icon: <Settings size={20} />, label: 'Configuration', path: '/settings' },
  ];

  const caregiverNav = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Users size={20} />, label: 'My Patients', path: '/patients' },
    { icon: <Bell size={20} />, label: 'Active Alerts', path: '/alerts', badge: 3 },
    { icon: <Hospital size={20} />, label: 'Visit Schedule', path: '/schedule' },
    { icon: <TrendingUp size={20} />, label: 'Reports', path: '/reports' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/messages' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const navItems = role === 'admin' ? adminNav : caregiverNav;

  return (
    <aside style={{
      width: '280px',
      height: '100vh',
      backgroundColor: 'var(--aec-surface)',
      borderRight: '1px solid var(--aec-border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }} className="aec-shadow">
      
      {/* Brand Header with Actual Logo */}
      <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '12px', 
          backgroundColor: 'white', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid var(--aec-border)'
        }}>
          <img src="/logo.png" alt="AEC Logo" style={{ width: '32px' }} />
        </div>
        <div>
          <span style={{ fontWeight: 900, fontSize: '18px', color: 'var(--aec-green)', display: 'block', letterSpacing: '-0.02em' }}>AEC Platform</span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--aec-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {role} portal
          </span>
        </div>
      </div>

      <nav style={{ padding: '0 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const isHovered = hoveredPath === item.path;
          
          return (
            <Link 
              key={item.path}
              href={item.path}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: '52px',
                padding: '0 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(27, 77, 62, 0.05)' : isHovered ? 'var(--aec-bg)' : 'transparent',
                color: isActive ? 'var(--aec-green)' : 'var(--aec-text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ color: isActive ? 'var(--aec-green)' : 'inherit' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '14px', fontWeight: isActive ? 700 : 600, flex: 1 }}>
                {item.label}
              </span>
              {item.badge && (
                <span style={{ 
                  backgroundColor: 'var(--aec-alert)', color: 'white', 
                  fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' 
                }}>
                  {item.badge}
                </span>
              )}
              {isActive && <div style={{ width: '4px', height: '16px', backgroundColor: 'var(--aec-green)', borderRadius: '2px' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--aec-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '44px', height: '44px', borderRadius: '50%', 
            backgroundColor: 'var(--aec-green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '14px'
          }}>
            {role === 'admin' ? 'AD' : 'CG'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--aec-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {role === 'admin' ? 'Admin User' : 'Caregiver User'}
            </span>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--aec-text-muted)', fontWeight: 600 }}>
              {role === 'admin' ? 'System Master' : 'Assigned Facility A'}
            </span>
          </div>
          <LogOut size={18} color="var(--aec-text-muted)" style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  );
};
