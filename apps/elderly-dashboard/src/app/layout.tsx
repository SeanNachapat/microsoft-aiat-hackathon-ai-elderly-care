import type { Metadata } from "next";
import "@healthcare/core/styles/tokens.css";
import "./globals.css";
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';

export const metadata: Metadata = {
  title: "AEC Elderly · Wellness Companion",
  description: "AI Elderly Care Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased theme-elderly" style={{ 
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundColor: '#0F172A', // Deep dark backdrop for focus
        overflow: 'hidden'
      }} suppressHydrationWarning>
        
        {/* Fixed Mobile Container */}
        <div style={{
          width: '100%',
          maxWidth: '430px',
          height: '100%',
          maxHeight: '932px', // iPhone 14 Pro Max height
          backgroundColor: 'var(--aec-bg)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 0 100px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          borderRadius: '40px', // Device-like curvature
          border: '8px solid #1e293b' // Subtle frame
        }}>
          
          <TopBar />
          
          <main style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '40px 24px 140px', // Added 40px top padding
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {children}
          </main>
          
          {/* Sticky Bottom Navigation */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: 'none' // Allow clicks through to content if needed, but BottomNav will catch its own
          }}>
            <BottomNav />
          </div>

        </div>
      </body>
    </html>
  );
}
