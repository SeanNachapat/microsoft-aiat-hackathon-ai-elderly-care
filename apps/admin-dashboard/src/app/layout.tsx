import type { Metadata } from "next";
import "@healthcare/core/styles/tokens.css";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";

export const metadata: Metadata = {
  title: "AEC Admin · ผู้ดูแลระบบ",
  description: "AI Elderly Care Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased" style={{ backgroundColor: 'var(--cream)', margin: 0 }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: '220px' }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
