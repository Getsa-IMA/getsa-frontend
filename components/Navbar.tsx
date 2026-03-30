import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-neutral/80 backdrop-blur-xl border-b border-foreground/5 py-4 px-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">G</div>
          <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">Getsa</Link>
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
