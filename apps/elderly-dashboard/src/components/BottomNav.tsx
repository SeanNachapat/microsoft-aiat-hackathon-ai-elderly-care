"use client";

import React from 'react';
import { Home, Activity, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
  const pathname = usePathname();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'health', icon: Activity, label: 'Health', path: '/health' },
    { id: 'schedule', icon: Calendar, label: 'Schedule', path: '/schedule' },
    { id: 'chat', icon: MessageSquare, label: 'Chat', path: '/chat' },
  ];

  return (
    <div className="absolute bottom-6 left-5 right-5 z-[100] pointer-events-auto animate-slide-up">
      <nav className="h-16 bg-white/90 backdrop-blur-md rounded-[32px] border border-black/5 shadow-xl flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = tab.path === '/' 
            ? pathname === '/' 
            : pathname.startsWith(tab.path);
          const Icon = tab.icon;

          return (
            <Link 
              key={tab.id} 
              href={tab.path}
              className={`
                flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-500 no-underline
                ${isActive ? 'bg-forest text-white shadow-md scale-105' : 'text-gray-400 hover:text-forest/50'}
              `}
            >
              <Icon 
                size={isActive ? 20 : 24} 
                className={isActive ? 'text-white' : 'text-gray-400'} 
                strokeWidth={isActive ? 3 : 2}
              />
              {isActive && (
                <span className="text-[13px] font-bold whitespace-nowrap animate-fade-in">
                  {tab.label === 'Home' ? 'หน้าหลัก' : tab.label === 'Health' ? 'สุขภาพ' : tab.label === 'Schedule' ? 'แผนงาน' : 'แชท'}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
