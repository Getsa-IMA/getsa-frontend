import React from 'react';
import DotGrid from '@/components/ui/DotGrid';

const HeroSection = () => {
  const categories = ["All", "Skincare", "Makeup", "Haircare", "UGC", "Fragrance", "Wellness"];

  return (
    <section className="relative min-h-[calc(100vh-96px)] px-4 md:px-8 flex flex-col items-center text-center space-y-7 overflow-hidden justify-start pt-16 bg-white">

      {/* DotGrid background — fills entire section */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor="#e8e8f0"
          activeColor="#A832A8"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Soft fade overlay so content stays readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-white/40 to-white/70 pointer-events-none" />

      {/* Main Container: We use a wrapper with a smaller max-width to keep things tight */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl animate-fade-in-up mt-8">

        {/* Badge */}
        <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 shadow-sm backdrop-blur-sm">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold text-xs tracking-widest uppercase">
            The #1 Platform for Brands &amp; Creators
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1]">
          Find the perfect <br/>
          <span className="bg-gradient-to-r from-[#D93A85] to-[#A832A8] bg-clip-text text-transparent">
            Creators &amp; Influencers
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed mt-4">
          The elite marketplace for authentic brand partnerships that drive real conversions.
        </p>

        {/* Search Bar Wrapper */}
        <div className="w-full max-w-3xl relative group mt-8" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex items-center bg-white rounded-[2.5rem] shadow-2xl p-1.5 border border-foreground/5">
            <div className="pl-6 w-full flex items-center">
              <svg className="w-5 h-5 text-gray-400 shrink-0 mr-3 hidden md:block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search niche or creator name..." 
                className="w-full bg-transparent outline-none text-base md:text-lg text-foreground placeholder:text-foreground/40 font-medium h-12"
              />
            </div>
            <button className="bg-gradient-to-r from-[#D93A85] to-[#A832A8] text-white px-8 h-12 rounded-[2rem] font-bold text-base md:text-lg shadow-lg hover:shadow-primary/40 transition-all hover:-translate-y-1 ml-2 whitespace-nowrap">
              Find Creators
            </button>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6" style={{ animationDelay: "0.4s" }}>
           {categories.map((tag) => (
             <button
               key={tag}
               className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-foreground/5 text-xs font-bold text-foreground/70 hover:border-primary/50 hover:text-primary transition-all duration-200"
             >
               {tag}
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;