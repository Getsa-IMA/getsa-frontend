import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-foreground/5 bg-white">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">G</div>
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
