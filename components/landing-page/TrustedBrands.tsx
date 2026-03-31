import React from 'react';

const TrustedBrands = () => {
  return (
      <div className="py-20 flex flex-col items-center gap-8 relative z-10 animate-fade-in-up">
        <div className="flex items-center gap-4 w-full max-w-4xl px-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
          <p className="text-foreground/40 font-bold text-sm tracking-widest uppercase">Trusted by 1000+ Brands</p>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <span className="font-black text-2xl tracking-tight hover:text-primary transition-colors cursor-pointer transform hover:scale-105">L&apos;OREAL</span>
           <span className="font-black text-2xl tracking-widest hover:text-secondary transition-colors cursor-pointer transform hover:scale-105">SEPHORA</span>
           <span className="font-black text-3xl font-serif italic hover:text-primary transition-colors cursor-pointer transform hover:scale-105">Glossier.</span>
           <span className="font-black text-2xl tracking-widest uppercase hover:text-secondary transition-colors cursor-pointer transform hover:scale-105">CHANEL</span>
        </div>
      </div>
  );
};

export default TrustedBrands;
