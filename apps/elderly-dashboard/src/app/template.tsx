"use client";

import React, { useEffect } from 'react';

/**
 * Next.js Template component remounts on every navigation,
 * which is perfect for page-level entrance animations and scroll management.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Because our scrollable area is the <main> tag in layout.tsx,
    // we need to manually reset its scroll position on navigation.
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <div className="animate-fade-in flex flex-col min-h-full">
      {children}
    </div>
  );
}
