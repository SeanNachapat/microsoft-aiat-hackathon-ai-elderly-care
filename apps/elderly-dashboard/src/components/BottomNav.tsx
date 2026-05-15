"use client";

import React, { useState, useRef } from 'react';
import { Home, MessageSquare, Heart, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsHolding(true);
    let start = Date.now();
    holdTimer.current = setInterval(() => {
      let elapsed = Date.now() - start;
      let p = (elapsed / 2000) * 100;
      if (p >= 100) {
        p = 100;
        triggerEmergency();
      }
      setProgress(p);
    }, 30);
  };

  const endHold = () => {
    setIsHolding(false);
    if (holdTimer.current) clearInterval(holdTimer.current);
    setProgress(0);
  };

  const triggerEmergency = () => {
    if (holdTimer.current) clearInterval(holdTimer.current);
    setIsHolding(false);
    setProgress(0);
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100]);
    }
    router.push('/sos?triggered=true');
  };

  return (
    <div style={{ 
      position: 'absolute', bottom: '32px', left: '20px', right: '20px', 
      height: '100px', display: 'flex', alignItems: 'flex-end', zIndex: 1000,
      pointerEvents: 'auto'
    }}>
      {/* Background Bar */}
      <div style={{ 
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '72px',
        backgroundColor: 'rgba(255, 255, 255, 0.98)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        zIndex: 1,
      }} />

      {/* Content Layer */}
      <div style={{ 
        position: 'relative', width: '100%', height: '100%', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2,
        padding: '0 12px',
      }}>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around', paddingTop: '28px' }}>
          <NavIcon icon={<Home size={24} />} path="/" active={pathname === '/'} />
          <NavIcon icon={<MessageSquare size={24} />} path="/chat" active={pathname === '/chat'} />
        </div>

        {/* SOS Button - Size Fixed, Glow Dynamic */}
        <div style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div 
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            style={{ 
              width: '88px', height: '88px', borderRadius: '50%', 
              backgroundColor: 'var(--aec-alert)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              // Glow increases, but size remains fixed at 88px
              boxShadow: isHolding 
                ? `0 0 ${20 + (progress / 100) * 40}px rgba(217, 64, 64, ${0.4 + (progress / 100) * 0.4})` 
                : 'none',
              border: '6px solid white',
              cursor: 'pointer',
              userSelect: 'none',
              transition: isHolding ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: 'translateY(0)', // No scaling anymore
              position: 'relative',
              zIndex: 10
            }}
          >
            {isHolding && (
              <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', zIndex: 11 }} width="88" height="88">
                <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeDasharray="238.76" strokeDashoffset={238.76 - (238.76 * progress) / 100} strokeLinecap="round" />
              </svg>
            )}
            <AlertCircle color="white" size={36} strokeWidth={2.5} style={{ position: 'relative', zIndex: 12 }} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around', paddingTop: '28px' }}>
          <NavIcon icon={<Heart size={24} />} path="/health" active={pathname.startsWith('/health')} />
          <NavIcon icon={<User size={24} />} path="/profile" active={pathname === '/profile'} />
        </div>

      </div>
    </div>
  );
};

const NavIcon = ({ icon, path, active }: any) => (
  <Link href={path} style={{ 
    textDecoration: 'none', width: '56px', height: '56px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: active ? 'var(--aec-green)' : 'transparent',
    color: active ? 'white' : 'var(--aec-text-muted)',
    transition: 'all 0.3s ease'
  }}>
    {icon}
  </Link>
);
