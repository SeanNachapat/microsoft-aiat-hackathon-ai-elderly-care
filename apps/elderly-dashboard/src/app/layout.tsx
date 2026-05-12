import type { Metadata } from "next";
import "@healthcare/core/styles/tokens.css";
import "./globals.css";
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';

export const metadata: Metadata = {
  title: "AEC Home · ระบบดูแลที่บ้าน",
  description: "AI Elderly Care Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ 
        backgroundColor: '#F9FAFB', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        overflow: 'hidden' // Prevent body scroll
      }}>
        {/* Responsive Mobile Container */}
        <div style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: 'white',
          height: '100vh', // Force viewport height
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 40px rgba(0,0,0,0.03)',
          position: 'relative'
        }}>
          {/* Scrollable Content Area */}
          <main style={{ 
            flex: 1, 
            overflowY: 'auto', 
            paddingBottom: '80px', 
            scrollbarWidth: 'none', // Hide scrollbar for cleaner look
            msOverflowStyle: 'none'
          }}>
            <TopBar />
            {children}
          </main>
          
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
