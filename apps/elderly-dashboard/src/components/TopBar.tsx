"use client";

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const TopBar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time and date in Thai
  const timeString = time.toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  const dateString = time.toLocaleDateString('th-TH', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <header className={`
      bg-forest px-5 pt-5 pb-6 flex items-center justify-between text-white z-50
      animate-flow-down
      ${isHome ? 'rounded-none mb-[-2px] shadow-none' : 'rounded-b-[30px] shadow-lg'}
    `}>
      {/* Time & Date Display (Left) */}
      <div className="flex flex-col leading-tight">
        <span className="text-[22px] font-extrabold tracking-tight">
          {mounted ? `${timeString} น.` : '--:-- น.'}
        </span>
        <span className="text-[13px] opacity-80 font-normal">
          {mounted ? dateString : '...'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Bell (Left of Avatar) */}
        <div className="relative cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors">
            <Bell size={20} />
          </div>
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-coral rounded-full border-2 border-forest" />
        </div>

        {/* Avatar (Right) */}
        <Link href="/profile">
          <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white/30 overflow-hidden cursor-pointer hover:border-white/50 transition-all shadow-md active:scale-90">
             <img 
               src="/elderly-avatar.png" 
               alt="avatar" 
               className="w-full h-full object-cover"
             />
          </div>
        </Link>
      </div>
    </header>
  );
};
