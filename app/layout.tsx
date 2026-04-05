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

import { ClerkProvider } from '@clerk/nextjs'
import SyncUser from "@/components/SyncUser";

export const metadata: Metadata = {
  title: "Getsa | Connecting Premium Brands & Creators",
  description: "The next-generation marketplace for elite brand partnerships and creator growth.",
  generator: "Next.js",
  keywords: ["creator economy", "brand marketing", "influencers", "Getsa"],
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <body className="min-h-screen flex flex-col bg-white text-foreground">
          <SyncUser />
          <main className="flex-1">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
