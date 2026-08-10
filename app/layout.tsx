import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maple & Pine Command Center",
  description: "Real-time operational overview across Maple & Pine holding-company entities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
