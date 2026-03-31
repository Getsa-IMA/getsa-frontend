import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Getsa | Connecting Premium Brands & Creators",
  description: "The next-generation marketplace for elite brand partnerships and creator growth.",
  generator: "Next.js",
  keywords: ["creator economy", "brand marketing", "influencers", "Getsa"],
};

// layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* 1. Added bg-neutral to the body so the 'bounce' area isn't black */}
      <body className="min-h-screen flex flex-col bg-neutral text-foreground">
        <Navbar />
        {/* 2. Added pt-24 (padding-top) so your logo and "Welcome" aren't hidden */}
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );

}
