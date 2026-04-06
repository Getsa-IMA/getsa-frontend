import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

import { ClerkProvider } from '@clerk/nextjs'
import SyncUser from "@/components/SyncUser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en" className={`${poppins.variable} font-sans antialiased`}>
      {/* 1. Added bg-neutral to the body so the 'bounce' area isn't black */}
      <body className="min-h-screen flex flex-col bg-neutral text-foreground">
        <ClerkProvider>
          <Navbar />
          <SyncUser />
          {/* 2. Added pt-24 (padding-top) so your logo and "Welcome" aren't hidden */}
          <main className="flex-1 pt-24">
            {children}
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
