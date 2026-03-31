import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 px-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo added here (cite: WhatsApp Image 2026-03-31 at 8.44.04 AM.jpeg) */}
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Image 
              src="/logo.jpeg" 
              alt="Getsa Logo" 
              width={100} 
              height={32} 
              className="object-contain"
              priority 
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/creator" className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Creators</Link>
          <Link href="/brand" className="text-sm font-semibold hover:text-secondary transition-colors cursor-pointer">Brands</Link>
          <button className="bg-foreground text-background px-6 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all">
            Join Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;