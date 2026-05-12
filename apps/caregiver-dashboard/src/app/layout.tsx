import type { Metadata } from "next";
import "@healthcare/core/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEC Caregiver · ผู้ช่วยพยาบาล",
  description: "AI Elderly Care Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased" style={{ backgroundColor: 'var(--cream)' }}>
        {children}
      </body>
    </html>
  );
}
