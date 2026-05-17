"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Bell, Settings, 
  ChevronRight, ChevronLeft, LogOut, Hospital, TrendingUp, MessageSquare,
  ShieldCheck, Activity, Radio, PanelLeftClose, PanelLeft
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps {
  role: 'admin' | 'caregiver';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

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
    { icon: <Radio size={20} />, label: 'Live Monitoring', path: '/live', badge: undefined },
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
      width: collapsed ? '72px' : '280px',
      height: '100vh',
      backgroundColor: 'var(--aec-surface)',
      borderRight: '1px solid var(--aec-border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'width 0.25s ease',
      overflow: 'hidden',
    }} className="aec-shadow">
      
      {/* Brand Header */}
      <div style={{ 
        padding: collapsed ? '24px 0' : '32px 24px', 
        display: 'flex', alignItems: 'center', gap: '16px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        minHeight: '96px'
      }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '12px', 
          backgroundColor: 'white', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid var(--aec-border)',
          flexShrink: 0
        }}>
          <img src="/logo.png" alt="AEC Logo" style={{ width: '28px' }} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 900, fontSize: '18px', color: 'var(--aec-green)', display: 'block', letterSpacing: '-0.02em' }}>AEC Platform</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--aec-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {role} portal
            </span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <div style={{ padding: collapsed ? '0 0 8px' : '0 16px 8px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
        <button
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--aec-border)',
            backgroundColor: 'var(--aec-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--aec-text-muted)', transition: 'all 0.2s ease',
          }}
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav style={{ padding: collapsed ? '0 8px' : '0 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const isHovered = hoveredPath === item.path;
          
          return (
            <Link 
              key={item.path}
              href={item.path}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: '48px',
                padding: collapsed ? '0' : '0 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(27, 77, 62, 0.05)' : isHovered ? 'var(--aec-bg)' : 'transparent',
                color: isActive ? 'var(--aec-green)' : 'var(--aec-text-muted)',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              <div style={{ color: isActive ? 'var(--aec-green)' : 'inherit', flexShrink: 0 }}>
                {item.icon}
              </div>
              {!collapsed && (
                <span style={{ fontSize: '14px', fontWeight: isActive ? 700 : 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span style={{ 
                  backgroundColor: 'var(--aec-alert)', color: 'white', 
                  fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px' 
                }}>
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span style={{
                  position: 'absolute', top: '6px', right: '6px',
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: 'var(--aec-alert)'
                }} />
              )}
              {!collapsed && isActive && <div style={{ width: '4px', height: '16px', backgroundColor: 'var(--aec-green)', borderRadius: '2px' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div style={{ padding: collapsed ? '16px 8px' : '24px', borderTop: '1px solid var(--aec-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', 
            backgroundColor: 'var(--aec-green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '13px', flexShrink: 0
          }}>
            {role === 'admin' ? 'AD' : 'CG'}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--aec-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {role === 'admin' ? 'Admin User' : 'Caregiver User'}
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--aec-text-muted)', fontWeight: 600 }}>
                  {role === 'admin' ? 'System Master' : 'Assigned Facility A'}
                </span>
              </div>
              <LogOut size={18} color="var(--aec-text-muted)" style={{ cursor: 'pointer' }} />
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
