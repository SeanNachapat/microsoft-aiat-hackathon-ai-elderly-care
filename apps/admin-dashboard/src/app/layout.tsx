import type { Metadata } from "next";
import "@healthcare/core/styles/tokens.css";
import "./globals.css";
import { Sidebar } from "@healthcare/core";

export const metadata: Metadata = {
  title: "AEC Admin · Strategic Hub",
  description: "AI Elderly Care Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased theme-admin">
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--aec-bg)' }}>
          <Sidebar role="admin" />
          <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
