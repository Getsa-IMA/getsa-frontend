import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-foreground/5 bg-white">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
        <div className="flex items-center gap-2">
          {/* Logo added here (cite: WhatsApp Image 2026-03-31 at 8.44.04 AM.jpeg) */}
          <Image 
            src="/logo.jpeg" 
            alt="Getsa Logo" 
            width={80} 
            height={24} 
            className="object-contain"
            style={{ height: 'auto', width: 'auto' }}
          />
          <span className="text-sm font-bold">Getsa &copy; 2026</span>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
          <Link href="#" className="hover:text-primary">Twitter</Link>
          <Link href="#" className="hover:text-secondary">Instagram</Link>
          <Link href="#" className="hover:text-tertiary">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;